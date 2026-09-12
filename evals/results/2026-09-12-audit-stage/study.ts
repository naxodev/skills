import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { randomUUID, randomInt } from 'node:crypto';
import { isDeepStrictEqual } from 'node:util';
import { prepareNarrativeAudit, applyNarrativeAudit } from '../../../scripts/narrative-audit.js';

const root = process.cwd();
const output = resolve('evals/results/2026-09-12-audit-stage');
const prior = resolve('evals/results/2026-09-09-audit-stage');
const raw = resolve('.evals/resumed');
const temp = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode';
const grader = { providerID: 'xai', id: 'grok-4.6', variant: 'high' };
const astra = { providerID: 'openai', id: 'gpt-6-astra', variant: 'medium' };
const hash = (text: string) => new Bun.CryptoHasher('sha256').update(text).digest('hex');
const json = (path: string, value: unknown) => writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
function command(args: string[], cwd = root, timeout = 60_000) {
  const r = spawnSync(args[0]!, args.slice(1), { cwd, encoding: 'utf8', timeout, maxBuffer: 64 * 1024 * 1024 });
  if (r.status !== 0) throw new Error(JSON.stringify({ args, status: r.status, error: String(r.error ?? ''), stdout: r.stdout, stderr: r.stderr }));
  return r.stdout;
}
function api(method: string, path: string, data?: unknown, cwd = root) {
  return command(['opencode2', 'api', method, path, ...(data ? ['--data', JSON.stringify(data)] : [])], cwd);
}
type Model = typeof grader;
type Info = { model: Model; location: { directory: string }; outcome: string; tokens?: unknown; cost?: number };
type Part = { type: string; text?: string; [key: string]: unknown };
type Export = { data: { info: Info; messages: { type: string; content?: Part[] }[] } };
type Trial = { label: string; fixture: string; kind: string; work: string; evidence: string; model: Model; sessionID: string; immutable: Record<string, string>; attempts: unknown[] };
function create(fixture: string, kind: string, model: Model, manifest?: string): Trial {
  const label = randomUUID();
  const work = join(temp, `audit-trial-${label}`);
  const evidence = join(output, 'artifacts', label);
  mkdirSync(evidence, { recursive: true });
  command(['jj', 'git', 'clone', root, work]);
  for (const entry of readdirSync(work)) if (!['.git', '.jj'].includes(entry)) rmSync(join(work, entry), { recursive: true, force: true });
  for (const file of ['source.json', 'verification.json', 'functions.mjs', 'probe.mjs', 'probe-results.json']) cpSync(join(prior, 'fixtures', fixture, file), join(work, file));
  cpSync(join(root, 'skills/pr-walkthrough/STYLE.md'), join(work, 'STYLE.md'));
  cpSync(join(prior, 'MANIFEST.md'), join(work, 'MANIFEST.md'));
  if (manifest) {
    writeFileSync(join(work, 'manifest.json'), manifest);
    json(join(work, 'fields.json'), prepareNarrativeAudit(manifest).fields);
  }
  const immutable: Record<string, string> = {};
  for (const file of readdirSync(work)) if (!file.startsWith('.')) immutable[file] = hash(readFileSync(join(work, file), 'utf8'));
  const sessionID = (JSON.parse(api('post', '/api/session', { title: 'component trial', agent: 'build', model, location: { directory: work } }, work)) as {data: {id: string}}).data.id;
  const trial: Trial = { label, fixture, kind, work, evidence, model, sessionID, immutable, attempts: [] };
  json(join(evidence, 'execution.json'), trial);
  return trial;
}
function respond(trial: Trial, prompt: string, phase = 'initial') {
  writeFileSync(join(trial.evidence, `${phase}-prompt.md`), prompt);
  const start = Date.now();
  json(join(trial.evidence, `${phase}-submission.json`), {startedAt: new Date(start).toISOString(), sessionID: trial.sessionID});
  let error: string | null = null;
  try {
    api('post', `/api/session/${trial.sessionID}/prompt`, { text: prompt }, trial.work);
    command(['opencode2', 'api', 'post', `/api/session/${trial.sessionID}/wait`], trial.work, 600_000);
  } catch (caught) {
    error = String(caught);
    api('post', `/api/session/${trial.sessionID}/interrupt`, undefined, trial.work);
  }
  const exported = api('get', `/api/session/${trial.sessionID}/export`, undefined, trial.work);
  writeFileSync(join(raw, `${trial.label}-${phase}.json`), exported);
  const { data } = JSON.parse(exported) as Export;
  const visible = data.messages.filter(m => m.type === 'assistant').map(m => ({ type: m.type, content: m.content?.filter(c => ['text', 'tool'].includes(c.type)).map(c => c.type === 'text' ? { type: c.type, text: c.text } : { type: c.type, name: c.name, state: c.state, time: c.time }) }));
  json(join(trial.evidence, `${phase}-transcript.json`), visible);
  const attempt = { phase, startedAt: new Date(start).toISOString(), elapsedMs: Date.now() - start, error, info: data.info, rawSha256: hash(exported) };
  trial.attempts.push(attempt);
  for (const file of readdirSync(trial.work)) if (!file.startsWith('.')) cpSync(join(trial.work, file), join(trial.evidence, `${phase}-${file}`), { recursive: true });
  json(join(trial.evidence, 'execution.json'), trial);
  if (!isDeepStrictEqual(data.info.model, trial.model) || data.info.location.directory !== trial.work) throw new Error('Execution identity mismatch');
  for (const [file, expected] of Object.entries(trial.immutable)) if (hash(readFileSync(join(trial.work, file), 'utf8')) !== expected) throw new Error(`Modified immutable input: ${file}`);
  if (data.info.outcome !== 'succeeded') throw new Error(`Session ${data.info.outcome}: ${error}`);
}
function gradePrompt() {
  return readFileSync(join(prior, 'reviewer/CRITERIA.md'), 'utf8').split('## Generic masked grading request\n')[1]!.split('## Reference facts')[0]! + '\nRead manifest.json, fields.json, source.json, functions.mjs, probe.mjs and probe-results.json in this directory. Use these supplied files directly. Save grade.json. Do not invoke skills or delegate.';
}
function finish(trial: Trial) {
  const archive = join(temp, 'audit-stage-resumed-evidence-20260912');
  mkdirSync(join(archive, '.evals/resumed'), { recursive: true });
  for (const file of readdirSync(raw)) if (file.startsWith(trial.label)) cpSync(join(raw, file), join(archive, '.evals/resumed', file));
  cpSync(trial.evidence, join(archive, 'public/artifacts', trial.label), { recursive: true });
  rmSync(trial.work, { recursive: true, force: true });
}
const mode = process.argv[2];
const revisedControls = process.argv.includes('--revised-controls');
const fixtures = ['retry', 'transaction', 'cache'];
if (mode === 'accept') {
  const records = [];
  for (const fixture of fixtures) {
    const trial = create(fixture, 'accept', grader, readFileSync(revisedControls ? join(output, `controls/${fixture}-correct.json`) : join(prior, `reviewer/${fixture}-correct.json`), 'utf8'));
    try { respond(trial, gradePrompt()); } catch (error) { json(join(trial.evidence, 'failure.json'), { error: String(error) }); }
    records.push(trial);
    json(join(output, revisedControls ? 'revised-acceptance-runs.json' : 'acceptance-runs.json'), records);
    finish(trial);
    console.log(`accept ${fixture}: ${trial.label}`);
  }
}
if (mode === 'main') {
  if (!JSON.parse(readFileSync(join(output, 'control-acceptance.json'), 'utf8')).accepted) throw new Error('Control acceptance required');
  const records: {fixture: string; original: string; revised?: string; writer?: string; audit?: string; error?: string; kind: string}[] = [];
  for (let replicate = 1; replicate <= 3; replicate++) for (const fixture of fixtures) {
    const trial = create(fixture, `writer-${replicate}`, astra);
    const record = { fixture, original: '', writer: trial.label, kind: `main-${replicate}` } as typeof records[number];
    try {
      respond(trial, readFileSync(join(prior, 'WRITER.md'), 'utf8'));
      record.original = join(trial.evidence, 'initial-manifest.json');
      prepareNarrativeAudit(readFileSync(record.original, 'utf8'));
    } catch (error) { record.error = String(error); }
    records.push(record); json(join(output, 'pairs.json'), records); finish(trial);
    console.log(`writer ${fixture} ${replicate}: ${trial.label} ${record.error ?? 'saved'}`);
  }
  for (const fixture of fixtures) for (const kind of ['correct', 'flawed']) records.push({ fixture, kind, original: join(output, `controls/${fixture}-${kind}.json`) });
  for (const record of records) {
    if (!record.original) continue;
    const manifest = readFileSync(record.original, 'utf8');
    const trial = create(record.fixture, `audit-${record.kind}`, astra, manifest);
    record.audit = trial.label;
    let prompt = readFileSync(join(root, 'evals/protocols/FINAL-NARRATIVE-AUDIT.md'), 'utf8');
    const replacements = { '<SOURCE>': join(trial.work, 'source.json'), '<VERIFICATION>': join(trial.work, 'verification.json'), '<PROBE>': join(trial.work, 'probe-results.json'), '<PROBE_CODE>': join(trial.work, 'probe.mjs'), '<MANIFEST>': join(trial.work, 'manifest.json'), '<FIELDS>': join(trial.work, 'fields.json'), '<MANIFEST_SHA>': hash(manifest), '<WORK>': trial.work };
    for (const [key, value] of Object.entries(replacements)) prompt = prompt.replaceAll(key, value);
    try {
      respond(trial, prompt);
      const sources = { source: JSON.parse(readFileSync(join(trial.work, 'source.json'), 'utf8')), verification: JSON.parse(readFileSync(join(trial.work, 'verification.json'), 'utf8')), probe: JSON.parse(readFileSync(join(trial.work, 'probe-results.json'), 'utf8')) };
      let revised = '';
      for (let repair = 0; repair < 2; repair++) {
        try { revised = applyNarrativeAudit(manifest, JSON.parse(readFileSync(join(trial.work, 'audit.json'), 'utf8')), sources); break; }
        catch (error) {
          if (repair || readFileSync(join(trial.work, 'audit.json'), 'utf8').includes('"blocked"')) throw error;
          respond(trial, `Mechanical validation failed: ${String(error)}. Repair audit.json according to the existing schema. Preserve every input. This feedback contains no semantic grade.`, 'repair');
        }
      }
      record.revised = join(trial.evidence, 'revised.json'); writeFileSync(record.revised, revised);
    } catch (error) { record.error = String(error); }
    json(join(output, 'pairs.json'), records); finish(trial);
    console.log(`audit ${record.fixture} ${record.kind}: ${record.error ?? 'saved'}`);
  }
}
if (mode === 'grade') {
  const pairs = JSON.parse(readFileSync(join(output, 'pairs.json'), 'utf8')) as {fixture: string; kind: string; original: string; revised?: string}[];
  const artifacts = pairs.flatMap((pair, index) => ['original', 'revised'].flatMap(stage => {
    const path = stage === 'original' ? pair.original : pair.revised;
    return path ? [{pair: index, fixture: pair.fixture, kind: pair.kind, stage, path}] : [];
  }));
  for (let i = artifacts.length - 1; i > 0; i--) { const j = randomInt(i + 1); [artifacts[i], artifacts[j]] = [artifacts[j]!, artifacts[i]!]; }
  const mappingPath = join(temp, 'audit-stage-resumed-evidence-20260912/masked-mapping.json');
  const resume = process.argv.includes('--resume');
  const mapping = resume ? JSON.parse(readFileSync(mappingPath, 'utf8')) as (typeof artifacts[number] & {opaque: string})[] : artifacts.map(artifact => ({...artifact, opaque: randomUUID()}));
  if (!resume) json(mappingPath, mapping);
  const records: {opaque: string; label: string; error?: string}[] = resume ? JSON.parse(readFileSync(join(output, 'masked-grades.json'), 'utf8')) : [];
  const batchLimit = Number(process.argv.find(arg => arg.startsWith('--batch='))?.slice(8) ?? Infinity);
  let launched = 0;
  for (const item of mapping) {
    if (records.some(record => record.opaque === item.opaque)) continue;
    if (launched++ >= batchLimit) break;
    const trial = create(item.fixture, item.opaque, grader, readFileSync(item.path, 'utf8'));
    let error: string | undefined;
    try { respond(trial, gradePrompt()); } catch (caught) { error = String(caught); }
    records.push({opaque: item.opaque, label: trial.label, error});
    json(join(output, 'masked-grades.json'), records);
    finish(trial);
    console.log(`grade ${records.length}/${mapping.length}: ${trial.label} ${error ?? 'saved'}`);
  }
  if (records.length === mapping.length) json(join(output, 'unmasked-mapping.json'), mapping);
}
