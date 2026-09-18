import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = 'evals/results/2026-09-17-discord-concise';
const read = (path: string) => readFileSync(path, 'utf8');
const hash = (body: string) => new Bun.CryptoHasher('sha256').update(body).digest('hex');
const baseline = read(join(root, 'inputs/baseline/SKILL.md'));
const candidate = read(join(root, 'inputs/candidate/SKILL.md'));
const blocks = [
  ['frontmatter-discovery-guards', (s: string) => s.split('### A1.')[0]!],
  ['setup-2-through-8-and-handoff', (s: string) => s.split('### 2.')[1]!],
  ['audit-handoff-and-exclusions-pointer', (s: string) => s.split('### A3.')[1]!.split('### 2.')[0]!],
] as const;
const evidence: Record<string, unknown> = {};
for (const [name, select] of blocks) {
  const before = hash(select(baseline)); const after = hash(select(candidate));
  if (before !== after) throw new Error(`Protected block changed: ${name}`);
  evidence[name] = { baseline: before, candidate: after, identical: true };
}
for (const name of readdirSync(join(root, 'inputs/baseline')).filter(n => n !== 'SKILL.md')) {
  const before = hash(read(join(root, 'inputs/baseline', name)));
  const after = hash(read(join(root, 'inputs/candidate', name)));
  if (before !== after) throw new Error(`Reference changed: ${name}`);
  evidence[name] = { baseline: before, candidate: after, identical: true };
}
const prior = JSON.parse(read('evals/results/2026-09-13-discord-audit/freeze.json')) as { trials: { prompt: string }[] };
const frozen = JSON.parse(read(join(root, 'freeze.json'))) as { trials: { prompt: string }[] };
if (!frozen.trials.every(t => t.prompt === prior.trials[0]!.prompt)) throw new Error('Neutral task prompt changed');
evidence.prompt = { identicalToPrior: true, sha256: hash(prior.trials[0]!.prompt) };
writeFileSync(join(root, 'guard-evidence.json'), JSON.stringify(evidence, null, 2) + '\n');
console.log(JSON.stringify(evidence, null, 2));
