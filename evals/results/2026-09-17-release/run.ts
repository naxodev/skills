import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { parse } from 'yaml';

const root = process.cwd();
const out = join(root, 'evals/results/2026-09-17-release');
const temp = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode';
const archive = join(temp, 'release-prep-evidence-20260917');
const model = { providerID: 'openai', id: 'gpt-6-astra', variant: 'medium' };
const text = (p: string) => readFileSync(p, 'utf8');
const hash = (s: string) => new Bun.CryptoHasher('sha256').update(s).digest('hex');
const save = (p: string, value: unknown) => { mkdirSync(join(p, '..'), { recursive: true }); writeFileSync(p, JSON.stringify(value, null, 2) + '\n'); };
async function command(args: string[], cwd = root): Promise<string> {
  const p = Bun.spawn(args, { cwd, stdout: 'pipe', stderr: 'pipe' });
  const [stdout, stderr, code] = await Promise.all([new Response(p.stdout).text(), new Response(p.stderr).text(), p.exited]);
  if (code) throw new Error(`${args.join(' ')} (${code}): ${stderr}\n${stdout}`);
  return stdout;
}
async function api<T>(method: string, path: string, body?: unknown): Promise<T> {
  const result = await command(['opencode2', 'api', method, path, ...(body === undefined ? [] : ['--data', JSON.stringify(body)])]);
  return (result.trim() ? JSON.parse(result) : undefined) as T;
}
type Part = { type: string; text?: string; name?: string; state?: unknown };
type Info = { id: string; agent: string; model: typeof model; location: { directory: string }; outcome?: string };
type Export = { info: Info; messages: { type: string; text?: string; content?: Part[] }[] };
type Case = { id: string; kind: string; skill: string | null; prompt: string; criteria: unknown[] };
type Trial = { id: string; kind: string; work: string; prompt: string; expected?: string | null; criteria?: unknown[]; hashes: Record<string, string> };
function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.name === 'node_modules' ? [] : e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]);
}
async function exportTree(id: string, label: string): Promise<Info[]> {
  const { data } = await api<{ data: Export }>('get', `/api/experimental/session/${id}/export`);
  save(join(root, '.evals/release', label, `${id}.json`), data);
  save(join(archive, 'raw', label, `${id}.json`), data);
  save(join(out, 'runs', label, `${id}.visible.json`), { info: data.info, messages: data.messages.map(m => ({ type: m.type, text: m.text, content: (m.content ?? []).filter(p => ['text', 'tool'].includes(p.type)) })) });
  const children = await api<{ data: Info[] }>('get', `/api/session?parentID=${id}&limit=100`);
  const infos = [data.info];
  for (const child of children.data) infos.push(...await exportTree(child.id, label));
  return infos;
}
const mode = process.argv[2];
if (mode === 'prepare') {
  if (existsSync(join(out, 'freeze.json'))) throw new Error('Already frozen');
  mkdirSync(archive, { recursive: true });
  const schema = await api<{ paths: Record<string, unknown> }>('get', '/openapi.json');
  for (const path of ['/api/session', '/api/experimental/session/{sessionID}/wait', '/api/experimental/session/{sessionID}/export']) if (!schema.paths[path]) throw new Error(`Missing endpoint ${path}`);
  save(join(archive, 'openapi.json'), schema);
  const models = await api<{ data: { id: string; providerID: string; enabled: boolean; variants: { id: string }[] }[] }>('get', '/api/model');
  const selected = models.data.find(m => m.id === model.id && m.providerID === model.providerID);
  if (!selected?.enabled || !selected.variants.some(v => v.id === 'medium')) throw new Error('Configured Astra medium missing');
  save(join(out, 'model.json'), { id: selected.id, providerID: selected.providerID, enabled: selected.enabled, variants: selected.variants.map(v => v.id) });
  const probe = await api<{ data: Info }>('post', '/api/session', { agent: 'build', model, title: 'neutral API endpoint preflight', location: { directory: root } });
  await api('post', `/api/experimental/session/${probe.data.id}/wait`);
  const probeExport = await api<{ data: Export }>('get', `/api/experimental/session/${probe.data.id}/export`);
  save(join(out, 'preflight.json'), { session: probeExport.data.info, endpoints: 'create/wait/export succeeded without a model prompt' });
  const cases = JSON.parse(text(join(root, 'evals/cases.json'))) as Case[];
  const catalog = readdirSync(join(root, 'skills')).map(name => {
    const source = text(join(root, 'skills', name, 'SKILL.md'));
    const metadata = parse(source.split('---')[1]!) as Record<string, unknown>;
    return { name, metadata, invocation: name === 'pr-walkthrough' ? 'Explicit request only; Codex allow_implicit_invocation: false' : 'Automatic when relevant' };
  });
  save(join(out, 'catalog.json'), catalog);
  const routes = [...cases.filter(c => c.kind === 'routing'), { id: 'route-pr-positive', kind: 'routing', skill: 'pr-walkthrough', prompt: 'Use pr-walkthrough for PR #42. Make it text-only and explain the trade-offs.', criteria: [] }];
  const trials: Trial[] = [];
  for (const c of routes) for (let i = 1; i <= 2; i++) {
    const prompt = `Simulate skill selection using only this three-skill catalog. This is a selection judgment, not host automatic invocation. Do not execute the task, call tools, read files, or load installed skills. Return JSON with choice (one catalog name or null) and one brief reason.\nCatalog:\n${JSON.stringify(catalog)}\nTask:\n${c.prompt}`;
    trials.push({ id: `${c.id}-${i}`, kind: 'routing', work: root, prompt, expected: c.skill, hashes: {} });
  }
  for (const id of ['discord-audit', 'docs-reader-start', 'pr-grounding-quality']) {
    const c = cases.find(c => c.id === id)!;
    const work = join(temp, `release-smoke-${id}-20260917`);
    await command(['jj', 'git', 'clone', root, work]);
    for (const f of readdirSync(work)) if (!['.git', '.jj'].includes(f)) rmSync(join(work, f), { force: true, recursive: true });
    const skill = `skills/${c.skill}`;
    cpSync(join(root, skill), join(work, skill), { recursive: true, filter: p => !p.includes('node_modules') });
    let prompt = `Read ${skill}/SKILL.md directly and follow its local reference files, not an installed skill. ${c.prompt} Keep skill files and supplied evidence unchanged. Work offline and use only this workspace. `;
    if (id === 'discord-audit') {
      cpSync(join(root, 'evals/fixtures/discord-audit.md'), join(work, 'snapshot.md'));
      prompt += 'Use snapshot.md. Do not use live services, other skills, or delegation.';
    } else if (id === 'docs-reader-start') {
      cpSync(join(root, 'evals/fixtures/docs-reader'), work, { recursive: true });
      prompt += 'Do not use other skills or delegation. You may add the page entry point to README.md.';
    } else {
      cpSync(join(root, 'evals/fixtures/pr.json'), join(work, 'pr.json'));
      cpSync(join(root, 'package.json'), join(work, 'package.json'));
      cpSync(join(root, 'bun.lock'), join(work, 'bun.lock'));
      await command(['bun', 'install', '--frozen-lockfile'], work);
      await command(['bun', 'install', '--frozen-lockfile'], join(work, skill, 'scripts'));
      save(join(work, 'pr-42-audio.json'), { stale: true });
      prompt += `Use pr.json as evidence. Keep all remaining workflow stages, including the four native parallel reports. Report agents are read-only and may share this evidence path; they return reports rather than write files. Every report must read the local skill and linked local style instructions, not installed skills. Only you own this clone for writes. Use ${work}/pr-42-manifest.json, ${work}/pr-42-audio.json, and ${work}/pr-42-walkthrough.html instead of temporary/Desktop paths. Do not open a desktop application.`;
    }
    const files = [...walk(join(work, skill)), ...(id === 'discord-audit' ? [join(work, 'snapshot.md')] : id === 'pr-grounding-quality' ? [join(work, 'pr.json')] : walk(join(root, 'evals/fixtures/docs-reader')).map(p => join(work, p.split('/docs-reader/')[1]!)))];
    const hashes = Object.fromEntries(files.map(p => [p.slice(work.length + 1), hash(text(p))]));
    cpSync(work, join(archive, 'inputs', id), { recursive: true, filter: p => !p.includes('/node_modules') && !p.includes('/.git') && !p.includes('/.jj') });
    trials.push({ id, kind: 'workflow', work, prompt, criteria: c.criteria, hashes });
  }
  save(join(out, 'freeze.json'), { frozenAt: new Date().toISOString(), source: 'f7b19c08', model, trials: trials.map(t => ({ ...t, promptSha256: hash(t.prompt) })), limits: '12 selection simulations; 3 workflow parents; 4 native PR reports planned. No resampling or model grading.' });
  cpSync(join(out, 'freeze.json'), join(archive, 'freeze.json'));
} else if (mode === 'run') {
  if (existsSync(join(out, 'executions.json'))) throw new Error('Already run');
  const frozen = JSON.parse(text(join(out, 'freeze.json'))) as { trials: Trial[] };
  const executions: Record<string, unknown>[] = [];
  async function run(t: Trial) {
    const record: Record<string, unknown> = { id: t.id };
    executions.push(record);
    const persist = () => save(join(out, 'executions.json'), executions);
    try {
      const created = await api<{ data: Info }>('post', '/api/session', { title: `Release smoke ${t.id}`, agent: 'build', model, location: { directory: t.work }, permissions: [{ action: '*', resource: '*', effect: 'allow' }] });
      const id = created.data.id; record.sessionID = id; persist();
      await api('post', `/api/session/${id}/prompt`, { text: t.prompt });
      await api('post', `/api/experimental/session/${id}/wait`);
      record.identities = await exportTree(id, t.id);
      const infos = record.identities as Info[];
      if (infos[0]!.outcome !== 'succeeded' || infos[0]!.agent !== 'build' || infos[0]!.location.directory !== t.work || !isDeepStrictEqual(infos[0]!.model, model)) throw new Error('Outcome or identity mismatch');
      record.inputChanges = Object.entries(t.hashes).filter(([p, h]) => hash(text(join(t.work, p))) !== h).map(([p]) => p);
      if (t.kind === 'workflow') {
        for (const p of readdirSync(t.work)) if (/\.(md|json|html)$/.test(p) && !['package.json', 'pr.json', 'snapshot.md'].includes(p)) cpSync(join(t.work, p), join(out, 'runs', t.id, p));
        cpSync(t.work, join(archive, 'outputs', t.id), { recursive: true, filter: p => !p.includes('/node_modules') && !p.includes('/.git') && !p.includes('/.jj') });
      }
      record.status = 'completed';
    } catch (error) { record.status = 'failed'; record.error = String(error); }
    persist(); console.log(JSON.stringify(record));
  }
  for (const [kind, concurrency] of [['routing', 3], ['workflow', 2]] as const) {
    const queue = frozen.trials.filter(t => t.kind === kind);
    await Promise.all(Array.from({ length: concurrency }, async () => { while (queue.length) await run(queue.shift()!); }));
  }
  cpSync(out, join(archive, 'public'), { recursive: true });
} else throw new Error('Use prepare or run');
