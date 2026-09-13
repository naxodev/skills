import { strict as assert } from 'node:assert';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const out = resolve('evals/results/2026-09-13-docs-reader');
const temp = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode';
const archive = join(temp, 'docs-reader-evidence-20260913');
const { trials } = JSON.parse(readFileSync(join(out, 'freeze.json'), 'utf8')) as { trials: { id: string; fixture: string }[] };
const allowed = new Set([
  'cp configs/release.example.json configs/release.json',
  'bun card.ts generate --config configs/release.json --write',
  'bun card.ts verify --config configs/release.json',
]);
for (const trial of trials.filter(t => t.fixture === 'docs-reader-start' && (!process.argv[2] || t.id === process.argv[2]))) {
  const evidence = join(archive, 'replays', `${trial.id}.json`);
  if (existsSync(evidence)) continue;
  const page = readFileSync(join(out, 'runs', trial.id, 'guide.md'), 'utf8');
  const commands = [...page.matchAll(/^\s*```(?:sh|bash|shell)\n([\s\S]*?)^\s*```/gm)].flatMap(m => m[1]!.trim().split('\n').map(s => s.trim()));
  // The reviewer reads each page before invoking this allowlisted replay.
  assert.equal(commands.length, 3, `Inspect unexpected recipe for ${trial.id}`);
  for (const command of commands) assert.ok(allowed.has(command), `Unreviewed command: ${command}`);
  const work = mkdtempSync(join(temp, 'docs-reader-replay-'));
  cpSync(join(archive, 'docs-reader-start'), work, { recursive: true });
  const observations: unknown[] = [];
  try {
    assert.equal(existsSync(join(work, 'configs/release.json')), false);
    assert.equal(existsSync(join(work, 'generated/release.txt')), false);
    for (const command of commands) {
      const result = Bun.spawnSync(command.split(' '), { cwd: work });
      observations.push({ command, exit: result.exitCode, stdout: result.stdout.toString(), stderr: result.stderr.toString() });
      assert.equal(result.exitCode, 0);
    }
    const actual = readFileSync(join(work, 'generated/release.txt'), 'utf8');
    assert.equal(actual, 'release-2.4.0\n');
    mkdirSync(join(archive, 'replays'), { recursive: true });
    writeFileSync(evidence, JSON.stringify({ id: trial.id, startingContext: 'Bun available; fresh fixture root containing card.ts and configs; no selected release config or generated card', missingSteps: [], observations, savedBytes: actual, outcome: 'passed' }, null, 2) + '\n');
    console.log(`${trial.id}: passed from declared root with no hidden setup`);
  } finally { rmSync(work, { recursive: true, force: true }); }
}
