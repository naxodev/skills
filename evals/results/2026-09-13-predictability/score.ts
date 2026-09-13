import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const out = resolve('evals/results/2026-09-13-predictability');
const read = <T>(file: string): T => JSON.parse(readFileSync(join(out, file), 'utf8')) as T;
type Trial = { id: string; part: string; arm: string; packet: string; fixture: string; kind: string; repeat: number };
type Decision = { id: string; detectsSeed?: boolean; falseAllegation?: boolean; leakageFalsePositive?: boolean; seedRepaired?: boolean; introducedError?: boolean; rationale: string };
type Attempt = { elapsedMs: number; startedAt: string; info: { cost?: number; tokens?: unknown } };
type Execution = { error?: string; changedFields?: string[]; bytePreserved?: boolean; htmlSha256?: string; attempts: Attempt[] };
const trials = read<{ trials: Trial[] }>('freeze.json').trials;
const decisions = read<Decision[]>('adjudication.json');
if (new Set(decisions.map(d => d.id)).size !== decisions.length || decisions.length !== trials.length) throw new Error('One adjudication per frozen trial is required');
const rows = trials.map(trial => {
  const decision = decisions.find(d => d.id === trial.id);
  if (!decision?.rationale) throw new Error(`Missing adjudication: ${trial.id}`);
  const execution = read<Execution>(`runs/${trial.id}/execution.json`);
  const last = execution.attempts.at(-1);
  return { ...trial, decision, execution, elapsedMs: execution.attempts.reduce((sum, a) => sum + a.elapsedMs, 0), serviceCost: last?.info.cost ?? null, tokens: last?.info.tokens ?? null };
});
const summaries = ['baseline', 'candidate'].map(arm => {
  const grades = rows.filter(r => r.arm === arm && r.part === 'grade');
  const edits = rows.filter(r => r.arm === arm && r.part === 'edit');
  const supported = grades.filter(r => r.kind !== 'false-title');
  const falseTitles = grades.filter(r => r.kind === 'false-title');
  const correct = edits.filter(r => r.kind === 'correct');
  const flawed = edits.filter(r => r.kind === 'flawed');
  const classification = (row: typeof rows[number]) => row.execution.error ? 'blocked' : row.decision.detectsSeed || row.decision.falseAllegation ? 'defect' : 'supported';
  const agreements = [...new Set(grades.map(r => r.packet))].map(packet => {
    const pair = grades.filter(r => r.packet === packet);
    return { packet, agree: pair.length === 2 && classification(pair[0]!) === classification(pair[1]!) };
  });
  return {
    arm,
    grader: {
      planned: 12, completed: grades.filter(r => !r.execution.error).length,
      accuratePackets: grades.filter(r => !r.execution.error && !r.decision.falseAllegation && (r.kind !== 'false-title' || r.decision.detectsSeed)).length,
      correctDefectPresence: grades.filter(r => !r.execution.error && (r.kind === 'false-title' ? r.decision.detectsSeed : !r.decision.falseAllegation)).length,
      supportedFalsePositives: supported.filter(r => r.decision.falseAllegation).length,
      falseTitleDetections: falseTitles.filter(r => r.decision.detectsSeed).length,
      missedTitles: falseTitles.filter(r => !r.decision.detectsSeed).length,
      allJudgmentsWithFalseAllegations: grades.filter(r => r.decision.falseAllegation).length,
      separateLeakageFalsePositives: grades.filter(r => r.decision.leakageFalsePositive).length,
      reviewsWithoutAnyFalseAllegation: grades.filter(r => !r.execution.error && !r.decision.falseAllegation && !r.decision.leakageFalsePositive && (r.kind !== 'false-title' || r.decision.detectsSeed)).length,
      agreements,
    },
    editing: {
      planned: 6, completed: edits.filter(r => !r.execution.error).length,
      seedRepairs: flawed.filter(r => r.decision.seedRepaired && !r.execution.error).length,
      introducedErrors: edits.filter(r => r.decision.introducedError).length,
      correctBytePreserved: correct.filter(r => r.execution.bytePreserved).length,
      correctFieldsPreserved: correct.filter(r => r.execution.changedFields?.length === 0).length,
      unnecessaryCorrectControlEdits: correct.reduce((sum, r) => sum + (r.execution.changedFields?.length ?? 0), 0),
      builds: edits.filter(r => r.execution.htmlSha256).length,
      repairs: edits.reduce((sum, r) => sum + Math.max(0, r.execution.attempts.length - 1), 0),
    },
  };
});
const usage = ['grade', 'edit'].flatMap(part => ['baseline', 'candidate'].map(arm => {
  const selected = rows.filter(r => r.part === part && r.arm === arm);
  const times = selected.map(r => r.elapsedMs).sort((a, b) => a - b);
  return { part, arm, sessions: selected.length, elapsedMs: { sum: times.reduce((a, b) => a + b, 0), min: times[0], median: (times[Math.floor((times.length - 1) / 2)]! + times[Math.ceil((times.length - 1) / 2)]!) / 2, max: times.at(-1) }, serviceCost: selected.every(r => r.serviceCost !== null) ? selected.reduce((sum, r) => sum + r.serviceCost!, 0) : null };
}));
const attempts = rows.flatMap(r => r.execution.attempts);
const observedPromptIntervalMs = Math.max(...attempts.map(a => Date.parse(a.startedAt) + a.elapsedMs)) - Math.min(...attempts.map(a => Date.parse(a.startedAt)));
writeFileSync(join(out, 'scores.json'), JSON.stringify({ summaries, usage, observedPromptIntervalMs, rows }, null, 2) + '\n');
console.log(JSON.stringify({ summaries, usage, observedPromptIntervalMs }, null, 2));
