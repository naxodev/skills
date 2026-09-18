import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { isDeepStrictEqual } from 'node:util';

const root = process.cwd();
const out = resolve('evals/results/2026-09-13-docs-render');
const temp = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode';
const archive = join(temp, 'docs-render-evidence-20260913');
const raw = resolve('.evals/docs-render');
const model = { providerID: 'openai', id: 'gpt-6-astra', variant: 'medium' };
const skillPath = 'skills/writing-technical-docs';
const text = (p: string) => readFileSync(p, 'utf8');
const hash = (s: string) => new Bun.CryptoHasher('sha256').update(s).digest('hex');
const json = (p: string, value: unknown) => writeFileSync(p, JSON.stringify(value, null, 2) + '\n');
async function command(args: string[], cwd = root, timeout = 600_000): Promise<string> {
  return await new Promise((accept, reject) => {
    const child = spawn(args[0]!, args.slice(1), { cwd, timeout });
    let stdout = ''; let stderr = '';
    child.stdout.on('data', chunk => { stdout += String(chunk); });
    child.stderr.on('data', chunk => { stderr += String(chunk); });
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
  mkdirSync(raw, { recursive: true });
  mkdirSync(archive, { recursive: true });
  writeFileSync(join(archive, 'runtime.txt'), await command(['zsh', '-c', 'command -v glow\nglow --help']));
  for (const arm of ['baseline', 'candidate']) {
    mkdirSync(join(archive, arm), { recursive: true });
    for (const file of readdirSync(skillPath)) writeFileSync(join(archive, arm, file), arm === 'baseline' ? await command(['jj', 'file', 'show', '-r', '9ea67e23', `${skillPath}/${file}`]) : text(`${skillPath}/${file}`));
  }
  for (const fixture of ['markdown', 'mdx']) cpSync(`evals/fixtures/docs-render/${fixture}`, join(archive, fixture), { recursive: true });
  const trials: Trial[] = [];
  for (const fixture of ['markdown', 'mdx']) {
    const output = fixture === 'markdown' ? 'page.md' : 'page.mdx';
    const prompt = `Read skills/writing-technical-docs/SKILL.md directly and its applicable local reference files, not an installed skill. Perform step 5 verification only of the existing ${output}, using the supplied source files and README environment constraints. Report your verification findings and handoff status. Keep all supplied files unchanged. Do not draft a new page, use other skills, delegate, or read files outside this workspace. You may run installed local commands.`;
    for (let repeat = 1; repeat <= 3; repeat++) for (const arm of ['baseline', 'candidate']) {
      const id = `${fixture}-${arm}-${repeat}`;
      trials.push({ id, fixture, arm, work: join(temp, `render-model-${id}-20260913`), prompt, output });
    }
  }
  cpSync(join(out, 'PLAN.md'), join(archive, 'PLAN.md'));
  const hashes = Object.fromEntries(files(archive).filter(f => !f.startsWith('raw/') && !f.startsWith('runs/')).map(f => [f, hash(text(join(archive, f)))]));
  json(join(out, 'freeze.json'), { frozenAt: new Date().toISOString(), baseline: '9ea67e23', model, hashes, trials: trials.map(t => ({ ...t, promptSha256: hash(t.prompt) })) });
  cpSync(join(out, 'freeze.json'), join(archive, 'freeze.json'));
}
if (process.argv[2] === 'run') {
  const frozen = JSON.parse(text(join(out, 'freeze.json'))) as { trials: Trial[]; hashes: Record<string, string> };
  if (existsSync(join(out, 'executions.json'))) throw new Error('Execution already started; recover owned sessions instead of resampling');
  const executions: Record<string, unknown>[] = []; json(join(out, 'executions.json'), executions);
  async function run(t: Trial) {
    const record: Record<string, unknown> = { id: t.id, status: 'unrun' }; executions.push(record);
    const save = () => json(join(out, 'executions.json'), executions);
    const dest = join(raw, t.id);
    mkdirSync(dest, { recursive: true });
    let session = '';
    try {
      for (const [key, expected] of Object.entries(frozen.hashes)) if (hash(text(join(archive, key))) !== expected) throw new Error('Frozen input mismatch');
      await command(['jj', 'git', 'clone', root, t.work]);
      for (const file of readdirSync(t.work)) rmSync(join(t.work, file), { recursive: true, force: true });
      cpSync(join(archive, t.arm), join(t.work, skillPath), { recursive: true });
      cpSync(join(archive, t.fixture), t.work, { recursive: true });
      record.packetEntries = readdirSync(t.work);
      const immutable = Object.fromEntries(files(t.work).map(f => [f, hash(text(join(t.work, f)))]));
      record.inputHashes = immutable;
      session = (JSON.parse(await api('post', '/api/session', { title: 'offline documentation verification', agent: 'build', model, location: { directory: t.work } }, t.work)) as { data: { id: string } }).data.id;
      record.sessionID = session; record.status = 'started'; save();
      await api('post', `/api/session/${session}/prompt`, { text: t.prompt }, t.work);
      await api('post', `/api/session/${session}/wait`, undefined, t.work);
      const exported = await api('get', `/api/session/${session}/export`, undefined, t.work);
      writeFileSync(join(dest, 'export.json'), exported);
      const { data } = JSON.parse(exported) as Export;
      record.info = data.info;
      const visible = data.messages.filter(m => m.type === 'assistant').map(m => ({ type: m.type, content: (m.content ?? []).filter(c => ['text', 'tool'].includes(c.type)) }));
      writeFileSync(join(dest, 'transcript.md'), `# Visible transcript\n\n## User prompt\n\n${t.prompt}\n\n## Assistant text and tool results\n\n\`\`\`json\n${JSON.stringify(visible, null, 2)}\n\`\`\`\n`);
      if (data.info.location.directory !== t.work || data.info.agent !== 'build' || !isDeepStrictEqual(data.info.model, model)) throw new Error('Session identity mismatch');
      for (const [file, expected] of Object.entries(immutable)) if (hash(text(join(t.work, file))) !== expected) throw new Error(`Input changed: ${file}`);
      record.inputsUnchanged = true;
      if (data.info.outcome !== 'succeeded') throw new Error(`Session outcome ${data.info.outcome}`);
      cpSync(t.work, join(dest, 'workspace'), { recursive: true });
      record.status = 'completed';
    } catch (error) {
      record.status = 'failed'; record.error = String(error);
      if (session) {
        await api('post', `/api/session/${session}/interrupt`, undefined, t.work).catch(() => undefined);
        const exported = await api('get', `/api/session/${session}/export`, undefined, t.work).catch(() => '');
        if (exported) writeFileSync(join(dest, 'failure-export.json'), exported);
      }
      if (existsSync(t.work)) cpSync(t.work, join(dest, 'workspace'), { recursive: true });
    }
    save(); cpSync(dest, join(archive, 'raw', t.id), { recursive: true });
    rmSync(t.work, { recursive: true, force: true });
    console.log(JSON.stringify({ id: t.id, status: record.status, error: record.error }));
  }
  const queue = [...frozen.trials];
  await Promise.all(Array.from({ length: 3 }, async () => { while (queue.length) await run(queue.shift()!); }));
  cpSync(join(out, 'executions.json'), join(archive, 'executions.json'));
}
