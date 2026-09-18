import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { isDeepStrictEqual } from 'node:util';
import { prepareNarrativeAudit, applyNarrativeAudit } from '../../../scripts/narrative-audit.js';

// Reuses the September 12 study's API, isolation, export, and audit boundaries.
const root = process.cwd();
const out = resolve('evals/results/2026-09-13-predictability');
const prior = resolve('evals/results/2026-09-12-audit-stage');
const fixtures = resolve('evals/results/2026-09-09-audit-stage/fixtures');
const temp = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode';
const raw = resolve('.evals/predictability');
const archive = join(temp, 'skill-predictability-evidence-20260913');
const hash = (text: string) => new Bun.CryptoHasher('sha256').update(text).digest('hex');
const text = (path: string) => readFileSync(path, 'utf8');
const json = (path: string, value: unknown) => writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
type Model = { providerID: string; id: string; variant: string };
type Trial = { id: string; part: 'grade' | 'edit'; arm: 'baseline' | 'candidate'; repeat: number; packet: string; fixture: string; kind: string; model: Model; work: string; prompt: string; promptSha256: string; inputSha256: string };
type Manifest = { sections: unknown[]; [key: string]: unknown };
type Export = { data: { info: { model: Model; location: { directory: string }; outcome: string; tokens?: unknown; cost?: unknown }; messages: {type: string; content?: { type: string; text?: string; name?: string; state?: unknown }[]}[] } };
function command(args: string[], cwd = root, timeout = 600_000): Promise<string> {
  return new Promise((accept, reject) => {
    const child = spawn(args[0]!, args.slice(1), { cwd, timeout });
    let stdout = ''; let stderr = '';
    child.stdout.on('data', chunk => { stdout += String(chunk); });
    child.stderr.on('data', chunk => { stderr += String(chunk); });
    child.on('error', reject);
    child.on('close', status => status === 0 ? accept(stdout) : reject(new Error(JSON.stringify({ args: args.slice(0, 4), status, stdout, stderr }))));
  });
}
const api = (method: string, path: string, data: unknown, cwd: string) => command(['opencode2', 'api', method, path, ...(data === undefined ? [] : ['--data', JSON.stringify(data)])], cwd);
const readManifest = (path: string) => JSON.parse(text(path)) as Manifest;
function freeze() {
  if (existsSync(join(out, 'freeze.json'))) throw new Error('Freeze already exists');
  mkdirSync(join(out, 'packets'), { recursive: true });
  const section = (path: string, index: number) => JSON.stringify({ sections: [readManifest(path).sections[index]] }, null, 2) + '\n';
  const packetDefs = [
    { id: 'a', fixture: 'retry', kind: 'supported-attribution', path: join(prior, 'controls/retry-correct.json'), section: 2, expected: false, reason: 'The source body asserts exactly once; contracts 1 and 3 and duplicate probe support the explicit distinction. Natural attribution is permitted.' },
    { id: 'b', fixture: 'transaction', kind: 'supported-context', path: join(prior, 'artifacts/03d6ccb4-72e2-4207-b33b-1774c49b3e54/initial-manifest.json'), section: 2, expected: false, reason: 'The next sentence expressly excludes write or commit rejection before publication. Contract 0 and after function support successful continuation after commit. Parent review lines 24–26 accept the contextual reading.' },
    { id: 'c', fixture: 'retry', kind: 'supported-fragment', path: join(prior, 'artifacts/565820d5-0074-4c19-baa5-7d4ed5a07626/initial-manifest.json'), section: 2, expected: false, reason: 'The visible elision and adjacent catch faithfully show the after function. All requested delays and sleep rejection match source and probes. Standalone parsing is not the artifact contract.' },
    ...['retry', 'transaction', 'cache'].map((fixture, index) => ({ id: ['d', 'e', 'f'][index]!, fixture, kind: 'false-title', path: join(prior, `controls/${fixture}-flawed.json`), section: -1, expected: true, reason: ['Exactly once is refuted by the duplicate probe and rejection-after-effect contract.', 'Atomicity is refuted by after.publish-before and external publication contract.', 'All stale reads is refuted by lateSnapshot and unchanged read snapshot contract.'][index]! })),
  ];
  const packets = packetDefs.map(p => {
    const value = p.section < 0 ? text(p.path) : section(p.path, p.section);
    writeFileSync(join(out, 'packets', `${p.id}.json`), value);
    return { ...p, path: p.path.slice(root.length + 1), sha256: hash(value) };
  });
  const generic = text(resolve('evals/results/2026-09-09-audit-stage/reviewer/CRITERIA.md')).split('## Generic masked grading request\n')[1]!.split('## Reference facts')[0]!;
  const adapter = '\nThe manifest contains saved excerpts, not a whole walkthrough. Review the included fields in their supplied surrounding context. Read manifest.json, fields.json, source.json, functions.mjs, probe.mjs and probe-results.json in this directory. Use these supplied files directly. Save grade.json. Do not invoke skills or delegate.';
  writeFileSync(join(out, 'GENERIC.md'), generic + adapter);
  const protocol = text(resolve('evals/protocols/FINAL-NARRATIVE-AUDIT.md'));
  const candidate = text(join(out, 'CANDIDATE.md')).trim();
  writeFileSync(join(out, 'FINAL-NARRATIVE-AUDIT-CANDIDATE.md'), protocol + '\n' + candidate + '\n');
  const trials: Trial[] = [];
  const add = (part: Trial['part'], arm: Trial['arm'], repeat: number, packet: string, fixture: string, kind: string, input: string) => {
    const id = randomUUID(); const work = join(temp, `predictability-${id}`);
    let prompt = part === 'grade' ? generic + adapter + (arm === 'candidate' ? '\n\n' + text(join(out, 'GRADER-CANDIDATE.md')) : '') : protocol + (arm === 'candidate' ? '\n' + candidate + '\n' : '');
    for (const [key, value] of Object.entries({ '<SOURCE>': join(work, 'source.json'), '<VERIFICATION>': join(work, 'verification.json'), '<PROBE>': join(work, 'probe-results.json'), '<PROBE_CODE>': join(work, 'probe.mjs'), '<MANIFEST>': join(work, 'manifest.json'), '<FIELDS>': join(work, 'fields.json'), '<MANIFEST_SHA>': hash(input), '<WORK>': work })) prompt = prompt.replaceAll(key, value);
    trials.push({ id, part, arm, repeat, packet, fixture, kind, model: part === 'grade' ? { providerID: 'xai', id: 'grok-4.6', variant: 'high' } : { providerID: 'openai', id: 'gpt-6-astra', variant: 'medium' }, work, prompt, promptSha256: hash(prompt), inputSha256: hash(input) });
  };
  for (let repeat = 1; repeat <= 2; repeat++) for (const p of packets) for (const arm of ['baseline', 'candidate'] as const) add('grade', arm, repeat, p.id, p.fixture, p.kind, text(join(out, 'packets', `${p.id}.json`)));
  for (const fixture of ['retry', 'transaction', 'cache']) for (const kind of ['correct', 'flawed']) for (const arm of ['baseline', 'candidate'] as const) add('edit', arm, 1, `${fixture}-${kind}`, fixture, kind, text(join(prior, `controls/${fixture}-${kind}.json`)));
  json(join(out, 'reference.json'), packets);
  json(join(out, 'freeze.json'), { frozenAt: new Date().toISOString(), sourceRevision: '4b6de454', protocolSha256: hash(protocol), candidateSha256: hash(text(join(out, 'CANDIDATE.md'))), graderSha256: hash(text(join(out, 'GRADER-CANDIDATE.md'))), trials });
}
async function run(trial: Trial) {
  const evidence = join(out, 'runs', trial.id); mkdirSync(evidence, { recursive: true });
  const attempts: unknown[] = []; const record: Record<string, unknown> = { id: trial.id, sessionID: '', location: trial.work, attempts };
  const save = () => json(join(evidence, 'execution.json'), record);
  const input = text(trial.part === 'grade' ? join(out, 'packets', `${trial.packet}.json`) : join(prior, `controls/${trial.packet}.json`));
  if (hash(input) !== trial.inputSha256 || hash(trial.prompt) !== trial.promptSha256) throw new Error('Frozen input mismatch');
  await command(['jj', 'git', 'clone', root, trial.work]);
  for (const entry of readdirSync(trial.work)) if (!['.git', '.jj'].includes(entry)) rmSync(join(trial.work, entry), { recursive: true, force: true });
  for (const file of ['source.json', 'verification.json', 'functions.mjs', 'probe.mjs', 'probe-results.json']) cpSync(join(fixtures, trial.fixture, file), join(trial.work, file));
  writeFileSync(join(trial.work, 'manifest.json'), input);
  json(join(trial.work, 'fields.json'), prepareNarrativeAudit(input).fields);
  const immutable = Object.fromEntries(readdirSync(trial.work).filter(f => !f.startsWith('.')).map(f => [f, hash(text(join(trial.work, f)))]));
  record.inputHashes = immutable;
  let sessionID = '';
  async function respond(prompt: string, phase: string) {
    const start = Date.now(); let error: string | undefined;
    try {
      await api('post', `/api/session/${sessionID}/prompt`, { text: prompt }, trial.work);
      await api('post', `/api/session/${sessionID}/wait`, undefined, trial.work);
    } catch (caught) { error = String(caught); await api('post', `/api/session/${sessionID}/interrupt`, undefined, trial.work); }
    const exported = await api('get', `/api/session/${sessionID}/export`, undefined, trial.work);
    writeFileSync(join(raw, `${trial.id}-${phase}.json`), exported);
    const { data } = JSON.parse(exported) as Export;
    const visible = data.messages.filter(m => m.type === 'assistant').flatMap(m => (m.content ?? []).filter(c => ['text', 'tool'].includes(c.type)).map(c => c.type === 'text' ? { type: c.type, text: c.text } : { type: c.type, name: c.name, state: c.state }));
    json(join(evidence, `${phase}-visible.json`), visible);
    attempts.push({ phase, startedAt: new Date(start).toISOString(), elapsedMs: Date.now() - start, error, info: data.info, rawSha256: hash(exported), promptSha256: hash(prompt) }); save();
    if (data.info.location.directory !== trial.work || !isDeepStrictEqual(data.info.model, trial.model)) throw new Error('Session identity mismatch');
    for (const [file, expected] of Object.entries(immutable)) if (hash(text(join(trial.work, file))) !== expected) throw new Error(`Input changed: ${file}`);
    for (const file of ['audit.json', 'grade.json']) if (existsSync(join(trial.work, file))) cpSync(join(trial.work, file), join(evidence, `${phase}-${file}`));
    if (data.info.outcome !== 'succeeded') throw new Error(`Session outcome ${data.info.outcome}: ${error}`);
  }
  try {
    sessionID = (JSON.parse(await api('post', '/api/session', { title: 'component judgment', agent: 'build', model: trial.model, location: { directory: trial.work } }, trial.work)) as {data: {id: string}}).data.id;
    record.sessionID = sessionID; save();
    await respond(trial.prompt, 'initial');
    if (trial.part === 'edit') {
      const sources = { source: JSON.parse(text(join(trial.work, 'source.json'))), verification: JSON.parse(text(join(trial.work, 'verification.json'))), probe: JSON.parse(text(join(trial.work, 'probe-results.json'))) };
      let revised = '';
      for (let repair = 0; repair < 2; repair++) {
        try { revised = applyNarrativeAudit(input, JSON.parse(text(join(trial.work, 'audit.json'))), sources); break; }
        catch (error) {
          if (repair || text(join(trial.work, 'audit.json')).includes('"blocked"')) throw error;
          const prompt = `Mechanical validation failed: ${String(error)}. Repair audit.json according to the existing schema. Preserve every input. This feedback contains no semantic grade.`;
          writeFileSync(join(evidence, 'repair-prompt.md'), prompt); await respond(prompt, 'repair');
        }
      }
      writeFileSync(join(evidence, 'revised.json'), revised);
      record.changedFields = prepareNarrativeAudit(revised).fields.filter((f, i) => f.value !== prepareNarrativeAudit(input).fields[i]!.value).map(f => f.pointer);
      record.bytePreserved = revised === input;
      record.revisedSha256 = hash(revised);
      const html = join(raw, `${trial.id}.html`);
      record.build = await command(['node', 'skills/pr-walkthrough/scripts/build.mjs', '--manifest', join(evidence, 'revised.json'), '--output', html]);
      record.htmlSha256 = hash(text(html));
    } else if (!existsSync(join(evidence, 'initial-grade.json'))) throw new Error('Missing grade.json');
  } catch (error) { record.error = String(error); }
  save();
  mkdirSync(join(archive, '.evals'), { recursive: true });
  for (const f of readdirSync(raw)) if (f.startsWith(trial.id)) cpSync(join(raw, f), join(archive, '.evals', f));
  cpSync(evidence, join(archive, 'runs', trial.id), { recursive: true });
  rmSync(trial.work, { recursive: true, force: true });
  console.log(JSON.stringify({ id: trial.id, part: trial.part, error: record.error ?? null }));
}
if (process.argv[2] === 'freeze') freeze();
if (process.argv[2] === 'witness') {
  const witnesses = [];
  for (const fixture of ['retry', 'transaction', 'cache']) {
    const observed = await command(['node', join(fixtures, fixture, 'probe.mjs')]);
    const saved = text(join(fixtures, fixture, 'probe-results.json'));
    const matchesSaved = isDeepStrictEqual(JSON.parse(observed), JSON.parse(saved));
    if (!matchesSaved) throw new Error(`Probe changed: ${fixture}`);
    witnesses.push({ fixture, matchesSaved, checkedAt: new Date().toISOString(), observedSha256: hash(observed), sourceHashes: Object.fromEntries(['source.json', 'functions.mjs', 'probe.mjs', 'probe-results.json'].map(file => [file, hash(text(join(fixtures, fixture, file)))])) });
  }
  json(join(out, 'witnesses.json'), witnesses);
}
if (process.argv[2] === 'run') {
  mkdirSync(raw, { recursive: true });
  const frozen = JSON.parse(text(join(out, 'freeze.json'))) as {trials: Trial[]};
  if (frozen.trials.some(trial => existsSync(join(out, 'runs', trial.id, 'execution.json')))) throw new Error('This frozen batch has execution records. Refusing to duplicate its sessions.');
  const queue = [...frozen.trials];
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (queue.length) { const trial = queue.shift()!; await run(trial); }
  }));
}
