import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { isDeepStrictEqual } from 'node:util';

const root = process.cwd();
const out = resolve('evals/results/2026-09-17-community-plan');
const temp = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode';
const archive = join(temp, 'community-plan-evidence-20260917');
const raw = resolve('.evals/community-plan');
const model = { providerID: 'openai', id: 'gpt-6-astra', variant: 'medium' };
const skill = 'skills/discord-community-server';
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
type Trial = { id: string; arm: string; fixture: string; work: string; prompt: string };
type Part = { type: string; text?: string; name?: string; state?: unknown };
type Export = { data: { info: { model: typeof model; agent: string; location: { directory: string }; outcome: string }; messages: { type: string; content?: Part[] }[] } };

mkdirSync(archive, { recursive: true }); mkdirSync(raw, { recursive: true });
if (process.argv[2] === 'preflight') {
  const schema = JSON.parse(await api('get', '/openapi.json', undefined)) as { paths: Record<string, unknown> };
  for (const p of ['/api/session', '/api/experimental/session/{sessionID}/wait', '/api/experimental/session/{sessionID}/export']) if (!schema.paths[p]) throw new Error(`Missing ${p}`);
  json(join(archive, 'openapi.json'), schema);
  const work = join(archive, 'neutral'); mkdirSync(work, { recursive: true });
  const created = JSON.parse(await api('post', '/api/session', { title: 'neutral API preflight', agent: 'build', model, location: { directory: work } }, work)) as { data: { id: string } };
  const id = created.data.id;
  await api('post', `/api/session/${id}/prompt`, { text: 'Reply only READY. Do not use tools or read files.' }, work);
  await api('post', `/api/experimental/session/${id}/wait`, undefined, work, 120_000);
  const exported = await api('get', `/api/experimental/session/${id}/export`, undefined, work);
  writeFileSync(join(archive, 'preflight-export.json'), exported);
  const { data } = JSON.parse(exported) as Export;
  if (data.info.outcome !== 'succeeded' || !isDeepStrictEqual(data.info.model, model)) throw new Error('Preflight failed');
  json(join(out, 'preflight.json'), { sessionID: id, info: data.info, verifiedPaths: true });
}
if (process.argv[2] === 'freeze') {
  if (existsSync(join(out, 'freeze.json'))) throw new Error('Already frozen');
  if (!existsSync(join(out, 'preflight.json'))) throw new Error('Preflight required');
  const hashes: Record<string, string> = {};
  for (const arm of ['baseline', 'candidate']) {
    mkdirSync(join(archive, arm), { recursive: true });
    for (const file of readdirSync(skill)) {
      const content = arm === 'baseline' ? await command(['jj', 'file', 'show', '-r', 'ef6f9456', `${skill}/${file}`]) : text(`${skill}/${file}`);
      writeFileSync(join(archive, arm, file), content); hashes[`${arm}/${file}`] = hash(content);
    }
  }
  const trials: Trial[] = [];
  for (const fixture of ['beta', 'growing']) {
    cpSync(join(out, 'inputs', `${fixture}.md`), join(archive, `${fixture}.md`));
    hashes[`${fixture}.md`] = hash(text(join(archive, `${fixture}.md`)));
    const prompt = `Read skills/discord-community-server/SKILL.md directly and follow its local references, not an installed skill. Using only packet.md, draft a sustainable ${fixture === 'beta' ? 'new community' : 'community improvement'} operating plan for this fictional project. Members need to find their way, get help, and participate without overloading the team. This is a DRAFT ONLY request: leave it unapproved and stop before any configuration. Work offline; no live services, browsers, network research, delegation, other skills, or files outside this workspace. Keep inputs unchanged. A .gitignore already excludes .community/; confirm the exclusion before saving private operating state there. Also save plan.md as a sanitized public draft, using fictional role jobs rather than operator identities or private operational details. State evidence limits. No server configuration or live action is authorized.`;
    for (let repeat = 1; repeat <= 3; repeat++) for (const arm of ['baseline', 'candidate']) {
      const id = `${fixture}-${arm}-${repeat}`;
      trials.push({ id, arm, fixture, work: join(temp, `community-plan-trial-${id}-20260917`), prompt });
    }
  }
  cpSync(join(out, 'PLAN.md'), join(archive, 'PLAN.md')); hashes['PLAN.md'] = hash(text(join(archive, 'PLAN.md')));
  hashes['run.ts'] = hash(text(join(out, 'run.ts'))); cpSync(join(out, 'run.ts'), join(archive, 'run.ts'));
  json(join(out, 'freeze.json'), { frozenAt: new Date().toISOString(), baseline: 'ef6f9456', model, hashes, trials: trials.map(t => ({ ...t, promptSha256: hash(t.prompt) })) });
  cpSync(join(out, 'freeze.json'), join(archive, 'freeze.json'));
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
      for (const [key, expected] of Object.entries(frozen.hashes)) if (hash(text(join(archive, key))) !== expected) throw new Error('Frozen input mismatch');
      await command(['jj', 'git', 'clone', root, t.work]);
      for (const file of readdirSync(t.work)) rmSync(join(t.work, file), { recursive: true, force: true });
      cpSync(join(archive, t.arm), join(t.work, skill), { recursive: true });
      cpSync(join(archive, `${t.fixture}.md`), join(t.work, 'packet.md'));
      writeFileSync(join(t.work, '.gitignore'), '.community/\n');
      record.packetEntries = readdirSync(t.work);
      const immutable = Object.fromEntries(['packet.md', '.gitignore', ...readdirSync(join(t.work, skill)).map(f => `${skill}/${f}`)].map(f => [f, hash(text(join(t.work, f)))]));
      record.inputHashes = immutable;
      session = (JSON.parse(await api('post', '/api/session', { title: 'offline community plan', agent: 'build', model, location: { directory: t.work } }, t.work)) as { data: { id: string } }).data.id;
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
      cpSync(join(t.work, 'plan.md'), join(published, 'plan.md'));
      record.planSha256 = hash(text(join(published, 'plan.md')));
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
