import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawn } from 'node:child_process';
import { isDeepStrictEqual } from 'node:util';

const root = process.cwd();
const out = resolve('evals/results/2026-09-13-structure');
const temp = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode';
const archive = join(temp, 'walkthrough-structure-evidence-20260913');
const raw = resolve('.evals/structure');
const model = { providerID: 'openai', id: 'gpt-6-astra', variant: 'medium' };
const text = (p: string) => readFileSync(p, 'utf8');
const hash = (s: string) => new Bun.CryptoHasher('sha256').update(s).digest('hex');
const json = (p: string, v: unknown) => writeFileSync(p, JSON.stringify(v, null, 2) + '\n');
async function command(args: string[], cwd = root, timeout = 300_000): Promise<string> {
  return await new Promise((accept, reject) => {
    const p = spawn(args[0]!, args.slice(1), { cwd, timeout });
    let stdout = ''; let stderr = '';
    p.stdout.on('data', c => { stdout += String(c); });
    p.stderr.on('data', c => { stderr += String(c); });
    p.on('error', reject);
    p.on('close', code => code === 0 ? accept(stdout) : reject(new Error(JSON.stringify({ code, stdout, stderr }))));
  });
}
const api = (method: string, path: string, data: unknown, cwd: string) => command(['opencode2', 'api', method, path, ...(data === undefined ? [] : ['--data', JSON.stringify(data)])], cwd);
type Trial = { id: string; arm: string; fixture: string; work: string; prompt: string };
type Export = { data: { info: { model: typeof model; agent: string; location: { directory: string }; outcome: string }; messages: { type: string; content?: { type: string; text?: string; name?: string; state?: unknown }[] }[] } };
if (process.argv[2] === 'freeze') {
  if (existsSync(join(out, 'freeze.json'))) throw new Error('Already frozen');
  mkdirSync(archive, { recursive: true }); mkdirSync(raw, { recursive: true });
  for (const arm of ['baseline', 'candidate']) {
    mkdirSync(join(archive, arm), { recursive: true });
    for (const file of ['SKILL.md', 'STYLE.md']) writeFileSync(join(archive, arm, file), arm === 'baseline' ? await command(['jj', 'file', 'show', '-r', 'c9b5afa3', `skills/pr-walkthrough/${file}`]) : text(`skills/pr-walkthrough/${file}`));
  }
  const reports = {
    small: {
      before: 'PR #42 describes the first request after expiry failing because refresh ran after dispatch. The diff shows send before the expiry check in the old function. The new function checks expiry and awaits refresh before send. The body calls an extra clock read an accepted cost, but the diff moves the existing Date.now check; it does not add a second clock read. Streaming requests use a separate path according to the body and need a follow-up.',
      'diff-tour': [{ file: 'client.ts', status: 'modified', summary: 'The request function awaits any needed credential refresh before dispatch.', code: "export async function request(client, payload) {\n  if (client.expiresAt <= Date.now()) await client.refresh();\n  const response = await client.send(payload);\n  return response;\n}", explanation: 'The expiry check moves ahead of send; the function still returns its response.' }],
      tradeoffs: 'The body accepts what it calls an extra clock read to avoid the initial failed request; the diff instead moves an existing check. The body says streaming requests remain on a separate path and need a follow-up. No follow-up issue number or priority is supplied.',
      alternatives: 'none documented',
    },
    multi: {
      before: 'PR #108 previously drained the entire pending queue into each send. It introduces a configured per-send job limit and keeps remaining jobs queued for later drains. The stated purpose is to bound batch size. It does not establish a memory or processing-time bound.',
      'diff-tour': [
        { file: 'config.ts', status: 'modified', summary: 'Startup parses the batch limit and rejects values that are not positive integers.', code: "export const batchLimit = Number(process.env.BATCH_LIMIT ?? 100);\nif (!Number.isInteger(batchLimit) || batchLimit < 1) {\n  throw new Error('BATCH_LIMIT must be a positive integer');\n}", explanation: 'The default is 100; validation runs when the module loads.' },
        { file: 'queue.ts', status: 'modified', summary: 'Drain removes only the first limit jobs and leaves the rest pending.', code: 'export function drain(pending, limit) {\n  return pending.splice(0, limit);\n}', explanation: 'The delete count limits removal from the pending array.' },
        { file: 'worker.ts', status: 'modified', summary: 'The worker passes the configured limit into drain before sending.', code: 'export async function tick(pending, send) {\n  await send(endpoint, drain(pending, batchLimit));\n}', explanation: 'The worker uses the bounded drain result for this send.' },
      ],
      tradeoffs: 'The body limits its guarantee to batch size, not job memory or processing time. It leaves per-tenant scheduling out of scope because the queue has no tenant key. No follow-up issue or priority is supplied.',
      alternatives: 'none documented',
    },
  };
  for (const fixture of ['small', 'multi'] as const) {
    mkdirSync(join(archive, fixture), { recursive: true });
    cpSync(fixture === 'small' ? 'evals/fixtures/pr.json' : 'evals/fixtures/pr-batch-limit.json', join(archive, fixture, 'pr.json'));
    json(join(archive, fixture, 'reports.json'), reports[fixture]);
  }
  const trials: Trial[] = [];
  for (const fixture of ['small', 'multi']) for (let repeat = 1; repeat <= 3; repeat++) for (const arm of ['baseline', 'candidate']) {
    const id = `${fixture}-${arm}-${repeat}`; const work = join(temp, `structure-${id}-20260913`);
    const prompt = 'Read skills/pr-walkthrough/SKILL.md and its local STYLE.md directly, not an installed skill. Use step 4 with pr.json and reports.json, which supply the original PR and the four completed evidence reports. Produce a text-only manifest and run the supplied build script, saving manifest.json and walkthrough.html in this directory. This is a synthesis component evaluation: fetching and four-agent dispatch are already supplied, so do not repeat them. I want a full walkthrough even if this PR is small. Keep all input files unchanged. Do not invoke other skills, delegate, or use GitHub. Use the local manifest schema and build instructions; override only their output paths to this directory.';
    trials.push({ id, fixture, arm, work, prompt });
  }
  const hashes: Record<string, string> = {};
  for (const dir of ['baseline', 'candidate', 'small', 'multi']) for (const f of readdirSync(join(archive, dir))) hashes[`${dir}/${f}`] = hash(text(join(archive, dir, f)));
  hashes['PLAN.md'] = hash(text(join(out, 'PLAN.md')));
  json(join(out, 'freeze.json'), { frozenAt: new Date().toISOString(), baseline: 'c9b5afa3', model, hashes, trials: trials.map(t => ({ ...t, promptSha256: hash(t.prompt) })) });
  cpSync(join(out, 'freeze.json'), join(archive, 'freeze.json')); cpSync(join(out, 'PLAN.md'), join(archive, 'PLAN.md'));
}
if (process.argv[2] === 'run') {
  const frozen = JSON.parse(text(join(out, 'freeze.json'))) as { trials: Trial[]; hashes: Record<string, string> };
  if (existsSync(join(out, 'executions.json'))) throw new Error('Execution already started; refusing duplicates');
  const executions: Record<string, unknown>[] = []; json(join(out, 'executions.json'), executions);
  let infrastructureBlocked = false;
  async function run(t: Trial) {
    const record: Record<string, unknown> = { id: t.id, status: 'unrun' }; executions.push(record);
    const save = () => json(join(out, 'executions.json'), executions);
    if (infrastructureBlocked) { record.reason = 'Prior infrastructure failure; no further model attempts'; save(); return; }
    let session = '';
    const dest = join(raw, t.id); mkdirSync(dest, { recursive: true });
    try {
      await command(['jj', 'git', 'clone', root, t.work]);
      for (const f of readdirSync(t.work)) if (!['.git', '.jj'].includes(f)) rmSync(join(t.work, f), { recursive: true, force: true });
      cpSync('skills/pr-walkthrough', join(t.work, 'skills/pr-walkthrough'), { recursive: true });
      for (const f of ['SKILL.md', 'STYLE.md']) cpSync(join(archive, t.arm, f), join(t.work, 'skills/pr-walkthrough', f));
      for (const f of ['pr.json', 'reports.json']) cpSync(join(archive, t.fixture, f), join(t.work, f));
      const immutable = Object.fromEntries(['skills/pr-walkthrough/SKILL.md', 'skills/pr-walkthrough/STYLE.md', 'pr.json', 'reports.json'].map(f => [f, hash(text(join(t.work, f)))]));
      for (const [key, expected] of Object.entries(frozen.hashes)) if (key !== 'PLAN.md' && hash(text(join(archive, key))) !== expected) throw new Error('Frozen input mismatch');
      session = (JSON.parse(await api('post', '/api/session', { title: 'structure synthesis component', agent: 'build', model, location: { directory: t.work } }, t.work)) as { data: { id: string } }).data.id;
      record.sessionID = session; record.status = 'started'; save();
      await api('post', `/api/session/${session}/prompt`, { text: t.prompt }, t.work);
      await api('post', `/api/session/${session}/wait`, undefined, t.work);
      const exported = await api('get', `/api/session/${session}/export`, undefined, t.work);
      writeFileSync(join(dest, 'export.json'), exported);
      const { data } = JSON.parse(exported) as Export;
      record.info = data.info;
      json(join(dest, 'visible.json'), data.messages.map(m => ({ type: m.type, content: (m.content ?? []).filter(c => ['text', 'tool'].includes(c.type)) })));
      if (data.info.location.directory !== t.work || data.info.agent !== 'build' || !isDeepStrictEqual(data.info.model, model)) throw new Error('Session identity mismatch');
      for (const [f, expected] of Object.entries(immutable)) if (hash(text(join(t.work, f))) !== expected) throw new Error(`Input changed: ${f}`);
      if (data.info.outcome !== 'succeeded') { infrastructureBlocked = true; throw new Error(`Session outcome ${data.info.outcome}`); }
      cpSync(join(t.work, 'manifest.json'), join(dest, 'manifest.json'));
      record.build = await command(['node', 'skills/pr-walkthrough/scripts/build.mjs', '--manifest', join(dest, 'manifest.json'), '--output', join(dest, 'walkthrough.html')]);
      mkdirSync(join(out, 'manifests'), { recursive: true }); cpSync(join(dest, 'manifest.json'), join(out, 'manifests', `${t.id}.json`));
      record.status = 'completed';
    } catch (error) {
      record.status = 'failed'; record.error = String(error);
      if (!session || /ENOTFOUND|timed out|SIGTERM/i.test(String(error))) infrastructureBlocked = true;
      if (session) {
        await api('post', `/api/session/${session}/interrupt`, undefined, t.work).catch(() => undefined);
        const exported = await api('get', `/api/session/${session}/export`, undefined, t.work).catch(() => '');
        if (exported) writeFileSync(join(dest, 'failure-export.json'), exported);
      }
    }
    save(); cpSync(dest, join(archive, 'runs', t.id), { recursive: true });
    rmSync(t.work, { recursive: true, force: true });
    console.log(JSON.stringify({ id: t.id, status: record.status, error: record.error }));
  }
  const queue = [...frozen.trials];
  await Promise.all(Array.from({ length: 3 }, async () => { while (queue.length) await run(queue.shift()!); }));
  cpSync(join(out, 'executions.json'), join(archive, 'executions.json'));
}
