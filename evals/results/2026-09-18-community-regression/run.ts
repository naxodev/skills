import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { isDeepStrictEqual } from 'node:util';

const root = process.cwd();
const out = resolve('evals/results/2026-09-18-community-regression');
const temp = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode';
const archive = join(temp, 'community-review-evidence-20260918');
const raw = resolve('.evals/community-regression');
const skill = 'skills/discord-community-server';
const prior = 'evals/results/2026-09-17-discord-concise';
const model = { providerID: 'openai', id: 'gpt-6-astra', variant: 'medium' };
const text = (p: string) => readFileSync(p, 'utf8');
const hash = (s: string) => new Bun.CryptoHasher('sha256').update(s).digest('hex');
const json = (p: string, value: unknown) => writeFileSync(p, JSON.stringify(value, null, 2) + '\n');
async function command(args: string[], cwd = root, timeout = 900_000): Promise<string> {
  return await new Promise((accept, reject) => {
    const child = spawn(args[0]!, args.slice(1), { cwd, timeout });
    let stdout = ''; let stderr = '';
    child.stdout.on('data', chunk => { stdout += String(chunk); });
    child.stderr.on('data', chunk => { stderr += String(chunk); });
    child.on('error', reject);
    child.on('close', code => code === 0 ? accept(stdout) : reject(new Error(JSON.stringify({ code, stdout, stderr }))));
  });
}
const api = (method: string, path: string, data: unknown, cwd = root, timeout = 900_000) => command(['opencode2', 'api', method, path, ...(data === undefined ? [] : ['--data', JSON.stringify(data)])], cwd, timeout);
type Trial = { id: string; fixture: string; work: string; prompt: string };
type Export = { data: { info: { model: typeof model; agent: string; location: { directory: string }; outcome: string } } };
mkdirSync(archive, { recursive: true }); mkdirSync(raw, { recursive: true });
if (process.argv[2] === 'freeze') {
  if (existsSync(join(out, 'freeze.json'))) throw new Error('Already frozen');
  const schema = JSON.parse(await api('get', '/openapi.json', undefined)) as { paths: Record<string, unknown> };
  const paths = ['/api/session', '/api/session/{sessionID}/prompt', '/api/experimental/session/{sessionID}/wait', '/api/experimental/session/{sessionID}/export', '/api/session/{sessionID}/interrupt'];
  for (const p of paths) if (!schema.paths[p]) throw new Error(`Missing ${p}`);
  json(join(archive, 'openapi.json'), schema);
  json(join(out, 'api-contract.json'), Object.fromEntries(paths.map(p => [p, schema.paths[p]])));
  const hashes: Record<string, string> = {};
  mkdirSync(join(out, 'inputs/current'), { recursive: true });
  for (const file of readdirSync(skill)) {
    const content = text(`${skill}/${file}`);
    const revision = await command(['jj', 'file', 'show', '-r', '455bac4e', `${skill}/${file}`]);
    if (content !== revision) throw new Error(`Revision mismatch: ${file}`);
    writeFileSync(join(out, 'inputs/current', file), content); hashes[`current/${file}`] = hash(content);
  }
  const previous = JSON.parse(text(join(prior, 'freeze.json'))) as { trials: Trial[]; hashes: Record<string, string> };
  const prompt = previous.trials[0]!.prompt;
  const trials: Trial[] = [];
  for (const fixture of ['discord-audit', 'discord-audit-incomplete']) {
    const content = text(join(prior, 'inputs', `${fixture}.md`));
    if (hash(content) !== previous.hashes[`${fixture}.md`]) throw new Error('Fixture changed');
    writeFileSync(join(out, 'inputs', `${fixture}.md`), content); hashes[`${fixture}.md`] = hash(content);
    for (let repeat = 1; repeat <= 3; repeat++) {
      const id = `${fixture}-${repeat}`;
      trials.push({ id, fixture, work: join(temp, `community-review-trial-${id}-20260918`), prompt });
    }
  }
  json(join(out, 'freeze.json'), { frozenAt: new Date().toISOString(), revision: '455bac4e', model, hashes, planSha256: hash(text(join(out, 'PLAN.md'))), runnerSha256: hash(text(join(out, 'run.ts'))), trials: trials.map(t => ({ ...t, promptSha256: hash(t.prompt) })) });
  cpSync(join(out, 'inputs'), join(archive, 'inputs'), { recursive: true });
  for (const file of ['freeze.json', 'PLAN.md', 'run.ts']) cpSync(join(out, file), join(archive, file));
}
if (process.argv[2] === 'run') {
  if (existsSync(join(out, 'executions.json'))) throw new Error('Execution already started');
  const frozen = JSON.parse(text(join(out, 'freeze.json'))) as { trials: Trial[]; hashes: Record<string, string> };
  const executions: Record<string, unknown>[] = []; json(join(out, 'executions.json'), executions);
  async function run(t: Trial) {
    const record: Record<string, unknown> = { id: t.id, status: 'unrun' }; executions.push(record);
    const save = () => json(join(out, 'executions.json'), executions);
    const dest = join(raw, t.id); const published = join(out, 'runs', t.id);
    mkdirSync(dest, { recursive: true }); mkdirSync(published, { recursive: true });
    let session = '';
    try {
      for (const [key, expected] of Object.entries(frozen.hashes)) if (hash(text(join(archive, 'inputs', key))) !== expected) throw new Error('Frozen input mismatch');
      await command(['jj', 'git', 'clone', root, t.work]);
      for (const file of readdirSync(t.work)) rmSync(join(t.work, file), { recursive: true, force: true });
      cpSync(join(archive, 'inputs/current'), join(t.work, skill), { recursive: true });
      cpSync(join(archive, 'inputs', `${t.fixture}.md`), join(t.work, 'snapshot.md'));
      record.packetEntries = readdirSync(t.work);
      const immutable = Object.fromEntries(['snapshot.md', ...readdirSync(join(t.work, skill)).map(f => `${skill}/${f}`)].map(f => [f, hash(text(join(t.work, f)))]));
      record.inputHashes = immutable;
      session = (JSON.parse(await api('post', '/api/session', { title: 'offline Discord audit', agent: 'build', model, location: { directory: t.work } }, t.work)) as { data: { id: string } }).data.id;
      record.sessionID = session; record.status = 'started'; save();
      const deadline = Date.now() + 900_000;
      await api('post', `/api/session/${session}/prompt`, { text: t.prompt }, t.work);
      await api('post', `/api/experimental/session/${session}/wait`, undefined, t.work, Math.max(1, deadline - Date.now()));
      const exported = await api('get', `/api/experimental/session/${session}/export`, undefined, t.work);
      writeFileSync(join(dest, 'export.json'), exported);
      const { data } = JSON.parse(exported) as Export; record.info = data.info;
      if (data.info.location.directory !== t.work || data.info.agent !== 'build' || !isDeepStrictEqual(data.info.model, model)) throw new Error('Session identity mismatch');
      for (const [file, expected] of Object.entries(immutable)) if (hash(text(join(t.work, file))) !== expected) throw new Error(`Input changed: ${file}`);
      record.inputsUnchanged = true;
      cpSync(t.work, join(dest, 'workspace'), { recursive: true });
      if (data.info.outcome !== 'succeeded') throw new Error(`Session outcome ${data.info.outcome}`);
      cpSync(join(t.work, 'audit.md'), join(published, 'audit.md'));
      record.auditSha256 = hash(text(join(published, 'audit.md')));
      record.outputEntries = readdirSync(t.work); record.status = 'completed';
    } catch (error) {
      record.status = 'failed'; record.error = String(error);
      if (session) {
        await api('post', `/api/session/${session}/interrupt`, undefined, t.work).catch(() => undefined);
        const exported = await api('get', `/api/experimental/session/${session}/export`, undefined, t.work).catch(() => '');
        if (exported) writeFileSync(join(dest, 'failure-export.json'), exported);
      }
      if (existsSync(t.work)) cpSync(t.work, join(dest, 'workspace'), { recursive: true });
    }
    save(); cpSync(dest, join(archive, 'raw', t.id), { recursive: true });
    cpSync(published, join(archive, 'runs', t.id), { recursive: true });
    rmSync(t.work, { recursive: true, force: true });
    console.log(JSON.stringify({ id: t.id, status: record.status, error: record.error }));
  }
  const queue = [...frozen.trials];
  await Promise.all(Array.from({ length: 3 }, async () => { while (queue.length) await run(queue.shift()!); }));
  cpSync(join(out, 'executions.json'), join(archive, 'executions.json'));
}
