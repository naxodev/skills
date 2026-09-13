import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { isDeepStrictEqual } from 'node:util';

const root = process.cwd();
const out = resolve('evals/results/2026-09-13-docs-e2e');
const temp = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode';
const archive = join(temp, 'docs-e2e-evidence-20260913');
const original = join(temp, 'docs-reader-evidence-20260913');
const raw = resolve('.evals/docs-e2e');
const model = { providerID: 'openai', id: 'gpt-6-astra', variant: 'medium' };
const skill = 'skills/writing-technical-docs';
const text = (p: string) => readFileSync(p, 'utf8');
const hash = (s: string) => new Bun.CryptoHasher('sha256').update(s).digest('hex');
const json = (p: string, v: unknown) => writeFileSync(p, JSON.stringify(v, null, 2) + '\n');
async function command(args: string[], cwd = root): Promise<string> {
  return await new Promise((accept, reject) => {
    const child = spawn(args[0]!, args.slice(1), { cwd, timeout: 900_000 });
    let stdout = ''; let stderr = '';
    child.stdout.on('data', c => { stdout += String(c); });
    child.stderr.on('data', c => { stderr += String(c); });
    child.on('error', reject);
    child.on('close', code => code === 0 ? accept(stdout) : reject(new Error(JSON.stringify({ code, stdout, stderr }))));
  });
}
const api = (method: string, path: string, data: unknown, cwd: string) => command(['opencode2', 'api', method, path, ...(data === undefined ? [] : ['--data', JSON.stringify(data)])], cwd);
type Trial = { id: string; arm: string; fixture: string; work: string; prompt: string; output: string };
type Part = { type: string; text?: string; name?: string; state?: unknown };
type Export = { data: { info: { model: typeof model; agent: string; location: { directory: string }; outcome: string }; messages: { type: string; content?: Part[] }[] } };
function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? files(join(dir, e.name)).map(f => `${e.name}/${f}`) : [e.name]);
}
if (process.argv[2] === 'freeze') {
  if (existsSync(join(out, 'freeze.json'))) throw new Error('Already frozen');
  mkdirSync(archive, { recursive: true }); mkdirSync(raw, { recursive: true });
  writeFileSync(join(archive, 'runtime.txt'), await command(['zsh', '-c', 'command -v glow\nglow --version\nglow --help']));
  const old = JSON.parse(text(join(original, 'freeze.json'))) as { hashes: Record<string, string>; trials: Trial[] };
  for (const arm of ['baseline', 'candidate']) {
    mkdirSync(join(archive, arm), { recursive: true });
    for (const file of readdirSync(skill)) writeFileSync(join(archive, arm, file), await command(['jj', 'file', 'show', '-r', arm === 'baseline' ? '9ea67e23' : '9b131265', `${skill}/${file}`]));
  }
  for (const fixture of ['docs-reader-start', 'docs-concept']) {
    cpSync(join(original, fixture), join(archive, fixture), { recursive: true });
    for (const file of files(join(archive, fixture))) {
      const key = `${fixture}/${file}`;
      if (hash(text(join(archive, key))) !== old.hashes[key]) throw new Error(`Original mismatch: ${key}`);
      if (fixture === 'docs-reader-start' && hash(text(join('evals/fixtures/docs-reader', file))) !== old.hashes[key]) throw new Error(`Repository mismatch: ${file}`);
    }
  }
  const trials = old.trials.map(t => ({ ...t, work: join(temp, `e2e-model-${t.id}-20260913`), promptSha256: hash(t.prompt) }));
  cpSync(join(out, 'PLAN.md'), join(archive, 'PLAN.md'));
  cpSync(join(out, 'run.ts'), join(archive, 'executed-run.ts'));
  const hashes = Object.fromEntries(files(archive).map(f => [f, hash(text(join(archive, f)))]));
  json(join(out, 'freeze.json'), { frozenAt: new Date().toISOString(), baseline: '9ea67e23', candidate: '9b131265', model, agent: 'build', concurrency: 3, timeoutMs: 900000, hashes, trials });
  cpSync(join(out, 'freeze.json'), join(archive, 'freeze.json'));
}
if (process.argv[2] === 'run') {
  const frozen = JSON.parse(text(join(out, 'freeze.json'))) as { trials: Trial[]; hashes: Record<string, string> };
  if (existsSync(join(out, 'executions.json'))) throw new Error('Already started; recover owned sessions');
  const executions: Record<string, unknown>[] = []; json(join(out, 'executions.json'), executions);
  async function run(t: Trial) {
    const record: Record<string, unknown> = { id: t.id, startedAt: new Date().toISOString() }; executions.push(record);
    const save = () => json(join(out, 'executions.json'), executions);
    const dest = join(raw, t.id); mkdirSync(dest, { recursive: true });
    let session = '';
    try {
      for (const [key, expected] of Object.entries(frozen.hashes)) if (hash(text(join(archive, key))) !== expected) throw new Error(`Frozen mismatch: ${key}`);
      await command(['jj', 'git', 'clone', root, t.work]);
      for (const file of readdirSync(t.work)) rmSync(join(t.work, file), { recursive: true, force: true });
      cpSync(join(archive, t.arm), join(t.work, skill), { recursive: true });
      cpSync(join(archive, t.fixture), t.work, { recursive: true });
      record.packetEntries = readdirSync(t.work);
      const immutable = Object.fromEntries(files(t.work).filter(f => f !== 'README.md').map(f => [f, hash(text(join(t.work, f)))]));
      record.inputHashes = immutable;
      session = (JSON.parse(await api('post', '/api/session', { title: 'offline reader documentation', agent: 'build', model, location: { directory: t.work } }, t.work)) as { data: { id: string } }).data.id;
      record.sessionID = session; record.status = 'started'; save();
      await api('post', `/api/session/${session}/prompt`, { text: t.prompt }, t.work);
      await api('post', `/api/session/${session}/wait`, undefined, t.work);
      const exported = await api('get', `/api/session/${session}/export`, undefined, t.work);
      writeFileSync(join(dest, 'export.json'), exported);
      const { data } = JSON.parse(exported) as Export; record.info = data.info;
      const visible = data.messages.filter(m => m.type === 'assistant').map(m => ({ type: m.type, content: (m.content ?? []).filter(c => ['text', 'tool'].includes(c.type)) }));
      json(join(dest, 'visible.json'), visible);
      if (data.info.location.directory !== t.work || data.info.agent !== 'build' || !isDeepStrictEqual(data.info.model, model)) throw new Error('Identity mismatch');
      for (const [file, expected] of Object.entries(immutable)) if (hash(text(join(t.work, file))) !== expected) throw new Error(`Input changed: ${file}`);
      record.inputsUnchanged = true;
      record.generatedFiles = files(t.work).filter(f => !(f in immutable));
      if (data.info.outcome !== 'succeeded') throw new Error(`Outcome: ${data.info.outcome}`);
      record.status = 'completed';
    } catch (error) {
      record.status = 'failed'; record.error = String(error);
      if (session) {
        await api('post', `/api/session/${session}/interrupt`, undefined, t.work).catch(() => undefined);
        const exported = await api('get', `/api/session/${session}/export`, undefined, t.work).catch(() => '');
        if (exported) writeFileSync(join(dest, 'failure-export.json'), exported);
      }
    }
    if (existsSync(t.work)) cpSync(t.work, join(dest, 'workspace'), { recursive: true });
    record.endedAt = new Date().toISOString(); save();
    cpSync(dest, join(archive, 'raw', t.id), { recursive: true });
    rmSync(t.work, { recursive: true, force: true });
    console.log(JSON.stringify({ id: t.id, status: record.status, error: record.error }));
  }
  const queue = [...frozen.trials];
  await Promise.all(Array.from({ length: 3 }, async () => { while (queue.length) await run(queue.shift()!); }));
  cpSync(join(out, 'executions.json'), join(archive, 'executions.json'));
}
