import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { isDeepStrictEqual } from 'node:util';
import { cases } from './qualification.js';

const root = process.cwd();
const output = resolve('evals/results/2026-09-12-audit-stage');
const raw = resolve('.evals/resumed');
const temp = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode';
const candidates = [
  { providerID: 'xai', id: 'grok-4.6', variant: 'high' },
  { providerID: 'xai', id: 'grok-4.5', variant: 'high' },
  { providerID: 'opencode', id: 'mimo-v2.5-free' },
];
function command(args: string[], cwd = root, timeout = 60_000) {
  const result = spawnSync(args[0]!, args.slice(1), { cwd, encoding: 'utf8', timeout, maxBuffer: 64 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(JSON.stringify({ args, status: result.status, error: String(result.error ?? ''), stdout: result.stdout, stderr: result.stderr }));
  return result.stdout;
}
function api(method: string, path: string, data?: unknown, cwd = root) {
  return command(['opencode2', 'api', method, path, ...(data ? ['--data', JSON.stringify(data)] : [])], cwd);
}
mkdirSync(raw, { recursive: true });
const catalog = JSON.parse(api('get', '/api/model')) as { data: { id: string; providerID: string; enabled: boolean; variants: { id: string }[]; cost: unknown; family: string }[] };
writeFileSync(join(output, 'catalog.json'), JSON.stringify(catalog.data.filter(m => candidates.some(c => c.id === m.id && c.providerID === m.providerID)), null, 2));
const records: unknown[] = [];
const qualification = process.argv.includes('--qualification');
for (const model of candidates) {
  if (qualification && model.id !== 'grok-4.6') continue;
  const listed = catalog.data.find(m => m.id === model.id && m.providerID === model.providerID);
  if (!listed?.enabled || (model.variant && !listed.variants.some(v => v.id === model.variant))) throw new Error('Frozen candidate unavailable in catalog');
  for (let attempt = 1; attempt <= (qualification ? 6 : 2); attempt++) {
    const label = randomUUID();
    const work = join(temp, `audit-screen-${label}`);
    command(['jj', 'git', 'clone', root, work]);
    for (const entry of readdirSync(work)) if (!['.git', '.jj'].includes(entry)) rmSync(join(work, entry), { recursive: true, force: true });
    const example = cases[attempt - 1];
    const prompt = qualification ? `${await Bun.file(join(output, 'QUALIFICATION.md')).text()}\n\n${JSON.stringify({ label, claim: example!.claim, source: example!.source, observed: example!.result })}` : 'Reply with exactly READY. Do not use tools or read files. This is a neutral availability check.';
    writeFileSync(join(output, `${label}-prompt.md`), prompt);
    const created = JSON.parse(api('post', '/api/session', { title: 'availability check', agent: 'build', model, location: { directory: work } }, work)) as { data: { id: string } };
    const sessionID = created.data.id;
    const start = Date.now();
    let error: string | null = null;
    try {
      api('post', `/api/session/${sessionID}/prompt`, { text: prompt }, work);
      command(['opencode2', 'api', 'post', `/api/session/${sessionID}/wait`], work, 300_000);
    } catch (caught) {
      error = String(caught);
      api('post', `/api/session/${sessionID}/interrupt`, undefined, work);
    }
    const exported = api('get', `/api/session/${sessionID}/export`, undefined, work);
    writeFileSync(join(raw, `${label}.json`), exported);
    const data = JSON.parse(exported).data as { info: { model: unknown; location: { directory: string }; outcome: string }; messages: Record<string, unknown>[] };
    // Keep only visible assistant text/tool records; provider state and reasoning stay in ignored raw exports.
    const visible = data.messages.filter(m => m.type === 'assistant').flatMap(m => (m.content as {type: string; text?: string}[]).filter(c => ['text', 'tool'].includes(c.type)).map(c => ({type: c.type, text: c.text})));
    writeFileSync(join(output, `${label}-summary.json`), JSON.stringify({ info: data.info, visible }, null, 2));
    const record = { model, attempt, label, sessionID, location: work, elapsedMs: Date.now() - start, error, info: data.info, rawSha256: new Bun.CryptoHasher('sha256').update(exported).digest('hex') };
    records.push(record);
    writeFileSync(join(output, qualification ? 'qualification-runs.json' : 'availability.json'), JSON.stringify(records, null, 2));
    console.log(JSON.stringify(record));
    if (data.info.location.directory !== work || !isDeepStrictEqual(data.info.model, model)) throw new Error('Export identity mismatch');
    if (!qualification && data.info.outcome === 'succeeded') {
      console.log('Availability succeeded. Inspect visible READY before qualification.');
      process.exit(0);
    }
    rmSync(work, { recursive: true, force: true });
  }
}
