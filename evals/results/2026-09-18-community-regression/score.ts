import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

// Validate manual judgments and quote the reviewed output; do not grade prose.
const out = 'evals/results/2026-09-18-community-regression';
const read = (p: string) => readFileSync(p, 'utf8');
const json = (p: string, value: unknown) => writeFileSync(p, JSON.stringify(value, null, 2) + '\n');
type Judgment = { result: 'pass' | 'fail'; lines: number[]; note: string };
type Review = { criteria: Record<string, Judgment>; 'no-planning-detour': Judgment };
const reviews = JSON.parse(read(join(out, 'reviews.json'))) as Record<string, Review>;
const frozen = JSON.parse(read(join(out, 'freeze.json'))) as { hashes: Record<string, string>; trials: { id: string; fixture: string }[] };
const cases = JSON.parse(read('evals/cases.json')) as { id: string; criteria: { id: string; expect: string }[] }[];
json(join(out, 'rubric.json'), { sourceCases: cases.filter(c => frozen.trials.some(t => t.fixture === c.id)), regression: { id: 'no-planning-detour', expect: 'No operating-plan approval, mandatory journey mapping, staffing budget, private operating state, or steps 2–8 execution as an audit-completion prerequisite. Pertinent optional verification-owner notes and mere capacity mentions are allowed.' } });
const scores = frozen.trials.map(t => {
  const body = read(join(out, 'runs', t.id, 'audit.md'));
  const lines = body.split('\n');
  const review = reviews[t.id];
  if (!review) throw new Error(`Missing review: ${t.id}`);
  const expected = cases.find(c => c.id === t.fixture)!.criteria.map(c => c.id).sort();
  if (JSON.stringify(Object.keys(review.criteria).sort()) !== JSON.stringify(expected)) throw new Error(`Rubric fields differ: ${t.id}`);
  const quote = (r: Judgment) => ({ result: r.result, evidence: r.lines.map(n => {
    if (!lines[n - 1]?.trim()) throw new Error(`Invalid quote ${t.id}:${n}`);
    return `audit.md:${n}: ${lines[n - 1]}`;
  }).join('\n') + '\n' + r.note });
  const criteria = Object.entries(review.criteria).map(([id, r]) => ({ id, ...quote(r) }));
  const report = { caseId: t.fixture, model: 'openai/gpt-6-astra#medium (build)', revision: `455bac4e sha256:${frozen.hashes['current/SKILL.md']}`, transcript: 'transcript.md', criteria };
  const path = join(out, 'runs', t.id, 'report.json'); json(path, report);
  const scored = spawnSync('bun', ['scripts/evals.ts', 'score', path], { encoding: 'utf8' });
  if (scored.status !== (criteria.every(c => c.result === 'pass') ? 0 : 1)) throw new Error(`${t.id}: ${scored.stdout}${scored.stderr}`);
  return { id: t.id, fixture: t.fixture, words: body.trim().split(/\s+/).length, criteria, 'no-planning-detour': quote(review['no-planning-detour']), scoreExit: scored.status };
});
if (scores.length !== 6) throw new Error('Expected six trials');
json(join(out, 'scores.json'), scores);
const summary = { attempts: 6, criteria: Object.fromEntries([...Object.keys(reviews[frozen.trials[0]!.id]!.criteria), 'no-planning-detour'].map(id => [id, { pass: scores.filter(s => (id === 'no-planning-detour' ? s[id] : s.criteria.find(c => c.id === id))?.result === 'pass').length, denominator: 6 }])), interpretation: 'Current-candidate conformance regression; no measured uplift.' };
json(join(out, 'summary.json'), summary);
console.log(JSON.stringify(summary, null, 2));
