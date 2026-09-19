import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const out = 'evals/results/2026-09-18-community-regression';
const skill = 'skills/discord-community-server';
const hash = (s: string) => new Bun.CryptoHasher('sha256').update(s).digest('hex');
const show = (rev: string, file: string) => execFileSync('jj', ['file', 'show', '-r', rev, `${skill}/${file}`], { encoding: 'utf8' });
const before = show('ef6f9456', 'SKILL.md');
const after = show('455bac4e', 'SKILL.md');
const selectors = {
  'frontmatter-mode-hook-guards': (s: string) => s.split('## Workflow')[0]!,
  'operating-modes': (s: string) => s.split('Choose an operating mode:')[1]!.split('\n\n').slice(0, 2).join('\n\n'),
  'audit-A1-through-A3': (s: string) => s.split('### A1.')[1]!.split('### 2.')[0]!,
  'configuration-3-through-8-and-handoff': (s: string) => s.split('### 3.')[1]!,
};
const checks: Record<string, unknown> = {};
for (const [name, select] of Object.entries(selectors)) {
  const baseline = hash(select(before)); const current = hash(select(after));
  if (baseline !== current) throw new Error(`Protected block differs: ${name}`);
  checks[name] = { baseline, current, byteIdentical: true };
}
for (const file of ['REFERENCE.md', 'OPERATIONS.md', 'VERIFICATION.md']) {
  const baseline = hash(show('ef6f9456', file)); const current = hash(show('455bac4e', file));
  if (baseline !== current) throw new Error(`Protected reference differs: ${file}`);
  checks[file] = { baseline, current, byteIdentical: true };
}
const discovery = after.split('### 1.')[1]!.split('### A1.')[0]!;
checks.conditionalPlanning = discovery.split('\n').filter(l => l.includes('For greenfield or improvement work,'));
const frozen = JSON.parse(readFileSync(join(out, 'freeze.json'), 'utf8')) as { trials: { prompt: string }[] };
const previous = JSON.parse(readFileSync('evals/results/2026-09-17-discord-concise/freeze.json', 'utf8')) as typeof frozen;
if (!frozen.trials.every(t => t.prompt === previous.trials[0]!.prompt)) throw new Error('Prompt changed');
checks.prompt = { byteIdentical: true, sha256: hash(previous.trials[0]!.prompt) };
writeFileSync(join(out, 'guard-evidence.json'), JSON.stringify(checks, null, 2) + '\n');
console.log(JSON.stringify(checks, null, 2));
