import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { isDeepStrictEqual } from 'node:util';

const root = process.cwd();
const out = resolve('evals/results/2026-09-17-discord-concise');
const temp = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode';
const archive = join(temp, 'discord-concise-evidence-20260917');
const raw = resolve('.evals/discord-concise');
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
const api = (method: string, path: string, data: unknown, cwd: string, timeout = 900_000) => command(['opencode2', 'api', method, path, ...(data === undefined ? [] : ['--data', JSON.stringify(data)])], cwd, timeout);
type Trial = { id: string; arm: string; fixture: string; work: string; prompt: string };
type Part = { type: string; text?: string; name?: string; state?: unknown };
type Export = { data: { info: { model: typeof model; agent: string; location: { directory: string }; outcome: string }; messages: { type: string; content?: Part[] }[] } };
const skillPath = 'skills/discord-community-server';
if (process.argv[2] === 'freeze') {
  if (existsSync(join(out, 'freeze.json'))) throw new Error('Already frozen');
  mkdirSync(archive, { recursive: true }); mkdirSync(raw, { recursive: true });
  const files = readdirSync(skillPath);
  for (const arm of ['baseline', 'candidate']) {
    mkdirSync(join(archive, arm), { recursive: true });
    for (const file of files) writeFileSync(join(archive, arm, file), arm === 'baseline' ? await command(['jj', 'file', 'show', '-r', '2d31f953', `${skillPath}/${file}`]) : text(`${skillPath}/${file}`));
    cpSync(join(archive, arm), join(out, 'inputs', arm), { recursive: true });
  }
  const trials: Trial[] = [];
  const prompt = 'Read skills/discord-community-server/SKILL.md directly and follow its local reference files, not an installed skill. Audit this fictional server using only snapshot.md. Work offline, record gaps, and report the verification limits. No server changes are authorized. Save audit.md in this directory. Keep the supplied input files unchanged. Do not use live services, other skills, delegation, or files outside this workspace.';
  for (const fixture of ['discord-audit', 'discord-audit-incomplete']) {
    cpSync(`evals/fixtures/${fixture}.md`, join(archive, `${fixture}.md`));
    cpSync(`evals/fixtures/${fixture}.md`, join(out, 'inputs', `${fixture}.md`));
    for (let repeat = 1; repeat <= 3; repeat++) for (const arm of ['baseline', 'candidate']) {
      const id = `${fixture}-${arm}-${repeat}`;
      trials.push({ id, fixture, arm, work: join(temp, `concise-model-${id}-20260917`), prompt });
    }
  }
  cpSync('evals/cases.json', join(archive, 'reviewer-cases.json'));
  cpSync(join(out, 'PLAN.md'), join(archive, 'PLAN.md'));
  const hashes: Record<string, string> = {};
  for (const arm of ['baseline', 'candidate']) for (const file of files) hashes[`${arm}/${file}`] = hash(text(join(archive, arm, file)));
  for (const file of ['discord-audit.md', 'discord-audit-incomplete.md', 'reviewer-cases.json', 'PLAN.md']) hashes[file] = hash(text(join(archive, file)));
  json(join(out, 'freeze.json'), { frozenAt: new Date().toISOString(), baseline: '2d31f953', model, hashes, trials: trials.map(t => ({ ...t, promptSha256: hash(t.prompt) })) });
  cpSync(join(out, 'freeze.json'), join(archive, 'freeze.json'));
}
if (process.argv[2] === 'run' || process.argv[2] === 'retry-zero-token') {
  const frozen = JSON.parse(text(join(out, 'freeze.json'))) as { trials: Trial[]; hashes: Record<string, string> };
  if (process.argv[2] === 'retry-zero-token') {
    if (existsSync(join(out, 'infrastructure-attempts.json'))) throw new Error('Retry already used');
    const attempts = JSON.parse(text(join(out, 'executions.json'))) as { id: string; sessionID: string }[];
    const eligible = new Set<string>();
    for (const attempt of attempts) {
      const exported = await api('get', `/api/experimental/session/${attempt.sessionID}/export`, undefined, root);
      for (const base of [raw, join(archive, 'raw')]) writeFileSync(join(base, attempt.id, 'infrastructure-export.json'), exported);
      const { data } = JSON.parse(exported) as { data: { info: { tokens: { input: number; output: number; reasoning: number; cache: { read: number; write: number } } }; messages: { type: string; content?: Part[] }[] } };
      const tokens = data.info.tokens;
      if ([tokens.input, tokens.output, tokens.reasoning, tokens.cache.read, tokens.cache.write].every(n => n === 0) && data.messages.every(m => !(m.content?.length))) eligible.add(attempt.id);
    }
    cpSync(join(out, 'executions.json'), join(out, 'infrastructure-attempts.json'));
    cpSync(join(out, 'infrastructure-attempts.json'), join(archive, 'infrastructure-attempts.json'));
    if (eligible.size !== frozen.trials.length) throw new Error('Not all attempts are zero-token; preserve failures');
    rmSync(join(out, 'executions.json'));
  }
  if (existsSync(join(out, 'executions.json'))) throw new Error('Execution already started');
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
      // Remove history and reviewer material before the model receives its packet.
      for (const file of readdirSync(t.work)) rmSync(join(t.work, file), { recursive: true, force: true });
      cpSync(join(archive, t.arm), join(t.work, skillPath), { recursive: true });
      cpSync(join(archive, `${t.fixture}.md`), join(t.work, 'snapshot.md'));
      record.packetEntries = readdirSync(t.work);
      const immutable = Object.fromEntries(['snapshot.md', ...readdirSync(join(t.work, skillPath)).map(f => `${skillPath}/${f}`)].map(f => [f, hash(text(join(t.work, f)))]));
      record.inputHashes = immutable;
      session = (JSON.parse(await api('post', '/api/session', { title: 'offline Discord audit', agent: 'build', model, location: { directory: t.work } }, t.work)) as { data: { id: string } }).data.id;
      record.sessionID = session; record.status = 'started'; save();
      const deadline = Date.now() + 900_000;
      await api('post', `/api/session/${session}/prompt`, { text: t.prompt }, t.work);
      await api('post', `/api/experimental/session/${session}/wait`, undefined, t.work, Math.max(1, deadline - Date.now()));
      const exported = await api('get', `/api/experimental/session/${session}/export`, undefined, t.work);
      writeFileSync(join(dest, 'export.json'), exported);
      const { data } = JSON.parse(exported) as Export;
      record.info = data.info;
      const visible = data.messages.filter(m => m.type === 'assistant').map(m => ({ type: m.type, content: (m.content ?? []).filter(c => ['text', 'tool'].includes(c.type)) }));
      writeFileSync(join(published, 'transcript.md'), `# Visible transcript\n\n## User prompt\n\n${t.prompt}\n\n## Assistant text and tool results\n\n\`\`\`json\n${JSON.stringify(visible, null, 2)}\n\`\`\`\n`);
      if (data.info.location.directory !== t.work || data.info.agent !== 'build' || !isDeepStrictEqual(data.info.model, model)) throw new Error('Session identity mismatch');
      for (const [file, expected] of Object.entries(immutable)) if (hash(text(join(t.work, file))) !== expected) throw new Error(`Input changed: ${file}`);
      record.inputsUnchanged = true;
      if (data.info.outcome !== 'succeeded') throw new Error(`Session outcome ${data.info.outcome}`);
      cpSync(join(t.work, 'audit.md'), join(published, 'audit.md'));
      record.outputEntries = readdirSync(t.work);
      record.status = 'completed';
    } catch (error) {
      record.status = 'failed'; record.error = String(error);
      if (session) {
        await api('post', `/api/session/${session}/interrupt`, undefined, t.work).catch(() => undefined);
        const exported = await api('get', `/api/experimental/session/${session}/export`, undefined, t.work).catch(() => '');
        if (exported) writeFileSync(join(dest, 'failure-export.json'), exported);
      }
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
