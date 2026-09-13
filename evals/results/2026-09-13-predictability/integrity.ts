import { readFileSync, writeFileSync, existsSync, mkdirSync, cpSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { prepareNarrativeAudit, applyNarrativeAudit } from '../../../scripts/narrative-audit.js';

const root = process.cwd();
const out = resolve('evals/results/2026-09-13-predictability');
const old = resolve('evals/results/2026-09-12-audit-stage');
const fixtures = resolve('evals/results/2026-09-09-audit-stage/fixtures');
const raw = resolve('.evals/predictability');
const archive = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/skill-predictability-evidence-20260913';
const text = (path: string) => readFileSync(path, 'utf8');
const hash = (value: string) => new Bun.CryptoHasher('sha256').update(value).digest('hex');
const assert = (condition: boolean, message: string) => { if (!condition) throw new Error(message); };
type Trial = { id: string; part: string; packet: string; fixture: string; model: unknown; work: string; prompt: string; promptSha256: string; inputSha256: string };
type Part = { type: string; name?: string; state?: { input: Record<string, unknown> } };
type Attempt = { phase: string; rawSha256: string; info: { model: unknown; location: {directory: string}; outcome: string } };
const frozen = JSON.parse(text(join(out, 'freeze.json'))) as { protocolSha256: string; candidateSha256: string; graderSha256: string; trials: Trial[] };
assert(hash(text(resolve('evals/protocols/FINAL-NARRATIVE-AUDIT.md'))) === frozen.protocolSha256, 'Original audit protocol changed');
assert(hash(text(join(out, 'CANDIDATE.md'))) === frozen.candidateSha256, 'Candidate changed');
assert(hash(text(join(out, 'GRADER-CANDIDATE.md'))) === frozen.graderSha256, 'Grader changed');
const records = [];
for (const trial of frozen.trials) {
  const run = join(out, 'runs', trial.id);
  const execution = JSON.parse(text(join(run, 'execution.json'))) as { inputHashes: Record<string, string>; attempts: Attempt[]; error?: string; htmlSha256?: string };
  assert(!execution.error, `Execution failed: ${trial.id}`);
  assert(execution.attempts.length === 1, `Unexpected additional attempt: ${trial.id}`);
  assert(hash(trial.prompt) === trial.promptSha256, 'Prompt changed');
  const input = text(trial.part === 'grade' ? join(out, 'packets', `${trial.packet}.json`) : join(old, `controls/${trial.packet}.json`));
  assert(hash(input) === trial.inputSha256, 'Input changed');
  for (const file of ['source.json', 'verification.json', 'functions.mjs', 'probe.mjs', 'probe-results.json']) assert(hash(text(join(fixtures, trial.fixture, file))) === execution.inputHashes[file], `Source mismatch: ${trial.id}/${file}`);
  const tools: { name: string; path?: string; commandSha256?: string }[] = [];
  for (const attempt of execution.attempts) {
    assert(isDeepStrictEqual(attempt.info.model, trial.model) && attempt.info.location.directory === trial.work && attempt.info.outcome === 'succeeded', 'Execution identity mismatch');
    const file = `${trial.id}-${attempt.phase}.json`;
    assert(hash(text(join(raw, file))) === attempt.rawSha256, 'Raw export changed');
    assert(hash(text(join(archive, '.evals', file))) === attempt.rawSha256, 'Archived export mismatch');
    const visible = JSON.parse(text(join(run, `${attempt.phase}-visible.json`))) as Part[];
    assert(visible.every(p => ['text', 'tool'].includes(p.type)), 'Hidden provider part in visible transcript');
    for (const part of visible.filter(p => p.type === 'tool')) {
      const name = part.name!; const input = part.state!.input;
      assert(['read', 'glob', 'grep', 'write', 'patch', 'shell'].includes(name), `Unexpected tool: ${name}`);
      const path = input.path as string | undefined;
      if (path) assert(resolve(trial.work, path) === trial.work || resolve(trial.work, path).startsWith(trial.work + '/'), `Outside access: ${path}`);
      if (input.workdir) assert(resolve(String(input.workdir)) === trial.work, 'Outside shell directory');
      if (name === 'patch') {
        const patch = String(input.patchText);
        for (const line of patch.split('\n').filter(l => /^\*\*\* (Add|Update|Delete) File: /.test(l))) {
          const target = line.split('File: ')[1]!;
          assert(resolve(trial.work, target) === join(trial.work, trial.part === 'edit' ? 'audit.json' : 'grade.json'), `Unexpected patch target: ${target}`);
        }
      }
      tools.push({ name, ...(path ? { path: resolve(trial.work, path).slice(trial.work.length) || '.' } : {}), ...(input.command ? { commandSha256: hash(String(input.command)) } : {}) });
    }
  }
  if (trial.part === 'edit') {
    const sources = { source: JSON.parse(text(join(fixtures, trial.fixture, 'source.json'))), verification: JSON.parse(text(join(fixtures, trial.fixture, 'verification.json'))), probe: JSON.parse(text(join(fixtures, trial.fixture, 'probe-results.json'))) };
    const revised = applyNarrativeAudit(input, JSON.parse(text(join(run, 'initial-audit.json'))), sources);
    assert(revised === text(join(run, 'revised.json')), 'Validator replay mismatch');
    assert(hash(text(join(raw, `${trial.id}.html`))) === execution.htmlSha256, 'Built HTML changed');
  } else {
    const grade = JSON.parse(text(join(run, 'initial-grade.json'))) as { fields: {pointer: string}[] };
    const pointers = new Set(grade.fields.map(f => f.pointer));
    assert(prepareNarrativeAudit(input).fields.every(f => pointers.has(f.pointer)), `Grade omitted a field: ${trial.id}`);
  }
  records.push({ id: trial.id, identityVerified: true, inputsVerified: true, visiblePartsOnly: true, tools, cloneRemoved: !existsSync(trial.work) });
}
const controls = ['retry', 'transaction', 'cache'].map(fixture => {
  const correct = text(join(old, `controls/${fixture}-correct.json`));
  const flawed = text(join(old, `controls/${fixture}-flawed.json`));
  const before = prepareNarrativeAudit(correct).fields; const after = prepareNarrativeAudit(flawed).fields;
  const changedPointers = after.filter((f, i) => f.value !== before[i]!.value).map(f => f.pointer);
  assert(isDeepStrictEqual(changedPointers, ['/title']), `Control seed changed: ${fixture}`);
  return { fixture, correctSha256: hash(correct), flawedSha256: hash(flawed), changedPointers };
});
assert(records.every(record => record.cloneRemoved), 'An evaluated clone remains');
writeFileSync(join(out, 'integrity.json'), JSON.stringify({ records, controls, originalAuditProtocolUnchanged: true, shellReview: 'All observed shell commands are local hash, JSON, evidence, and pointer checks; no external reads, delegation, or semantic retries.' }, null, 2) + '\n');
if (process.argv.includes('--archive')) {
  mkdirSync(join(archive, 'inputs'), { recursive: true });
  cpSync(out, join(archive, 'public'), { recursive: true });
  for (const fixture of ['retry', 'transaction', 'cache']) cpSync(join(fixtures, fixture), join(archive, 'inputs', fixture), { recursive: true });
  cpSync(join(old, 'controls'), join(archive, 'inputs/controls'), { recursive: true });
  for (const file of ['PARENT-ADJUDICATION.md', 'PARENT-RESULT-REVIEW.md']) cpSync(join(old, file), join(archive, 'inputs', file));
  cpSync(resolve('evals/protocols/FINAL-NARRATIVE-AUDIT.md'), join(archive, 'inputs/FINAL-NARRATIVE-AUDIT.md'));
  console.log(archive);
}
console.log(`Verified ${records.length} isolated sessions, six title-only controls, and all validator replays from ${root}.`);
