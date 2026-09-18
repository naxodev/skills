import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

// Manual source judgments live in reviews.json; this validates and quotes them.
const root = 'evals/results/2026-09-17-discord-concise';
const read = (path: string) => readFileSync(path, 'utf8');
type Review = { criteria: Record<string, { result: 'pass' | 'fail'; lines: number[]; note: string }>; compression: { result: 'pass' | 'fail'; lines: number[]; note: string } };
const reviews = JSON.parse(read(join(root, 'reviews.json'))) as Record<string, Review>;
const frozen = JSON.parse(read(join(root, 'freeze.json'))) as { hashes: Record<string, string>; trials: { id: string; fixture: string; arm: string }[] };
const scores = frozen.trials.map(t => {
  const body = read(join(root, 'runs', t.id, 'audit.md'));
  const lines = body.split('\n');
  const review = reviews[t.id];
  if (!review) throw new Error(`Missing source review: ${t.id}`);
  const quote = (selected: number[]) => selected.map(n => {
    if (!lines[n - 1]?.trim()) throw new Error(`Invalid quote line ${t.id}:${n}`);
    return `audit.md:${n}: ${lines[n - 1]}`;
  }).join('\n');
  const criteria = Object.entries(review.criteria).map(([id, r]) => ({ id, result: r.result, evidence: quote(r.lines) + '\n' + r.note }));
  const report = { caseId: t.fixture, model: 'openai/gpt-6-astra#medium (build)', revision: `${t.arm} sha256:${frozen.hashes[`${t.arm}/SKILL.md`]}`, transcript: 'transcript.md', criteria };
  const path = join(root, 'runs', t.id, 'report.json');
  writeFileSync(path, JSON.stringify(report, null, 2) + '\n');
  const result = spawnSync('bun', ['scripts/evals.ts', 'score', path], { encoding: 'utf8' });
  const expected = criteria.every(c => c.result === 'pass') ? 0 : 1;
  if (result.status !== expected) throw new Error(`${t.id}: scorer ${result.stdout}${result.stderr}`);
  return { id: t.id, arm: t.arm, fixture: t.fixture, words: body.trim().split(/\s+/).length, results: Object.fromEntries(criteria.map(c => [c.id, c.result])), compression: { ...review.compression, evidence: quote(review.compression.lines) }, reportScoreExit: result.status, scoreOutput: result.stdout + result.stderr };
});
const median = (values: number[]) => { const v = [...values].sort((a, b) => a - b); return (v[Math.floor((v.length - 1) / 2)]! + v[Math.floor(v.length / 2)]!) / 2; };
const stats = (arm: string, fixture?: string) => {
  const selected = scores.filter(s => s.arm === arm && (!fixture || s.fixture === fixture));
  const words = selected.map(s => s.words);
  return { median: median(words), min: Math.min(...words), max: Math.max(...words), words };
};
const baseline = stats('baseline'); const candidate = stats('candidate');
const reduction = 1 - candidate.median / baseline.median;
const sourcePass = scores.filter(s => s.arm === 'candidate').every(s => Object.values(s.results).every(r => r === 'pass') && s.compression.result === 'pass');
writeFileSync(join(root, 'scores.json'), JSON.stringify(scores, null, 2) + '\n');
const summary = { baseline, candidate, reduction, candidateSourcePass: sourcePass, adopt: sourcePass && reduction >= 0.25, fixtures: Object.fromEntries(['discord-audit', 'discord-audit-incomplete'].map(f => [f, { baseline: stats('baseline', f), candidate: stats('candidate', f) }])) };
writeFileSync(join(root, 'summary.json'), JSON.stringify(summary, null, 2) + '\n');
console.log(JSON.stringify(summary, null, 2));
