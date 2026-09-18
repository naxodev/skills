import { strict as assert } from 'node:assert';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const out = resolve('evals/results/2026-09-13-docs-e2e');
const temp = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode';
const archive = join(temp, 'docs-e2e-evidence-20260913');
const { trials } = JSON.parse(readFileSync(join(out, 'freeze.json'), 'utf8')) as { trials: { id: string; fixture: string; output: string }[] };
const allowed = new Set([
  'bun --version',
  'cp configs/release.example.json configs/release.json',
  'bun card.ts generate --config configs/release.json --write',
  'bun card.ts verify --config configs/release.json',
  'cat generated/release.txt',
]);
for (const t of trials.filter(t => !process.argv[3] || t.id === process.argv[3])) {
  const dest = join(archive, 'review', t.id); mkdirSync(dest, { recursive: true });
  const published = join(out, 'runs', t.id);
  if (process.argv[2] === 'render') {
    for (const file of [t.output, 'README.md']) {
      const result = Bun.spawnSync(['glow', '-s', 'dark', '-w', '100', file], { cwd: published, env: { ...process.env, GLAMOUR_STYLE: 'dark' } });
      writeFileSync(join(dest, `${file}.render.txt`), result.stdout);
      assert.equal(result.exitCode, 0, result.stderr.toString());
    }
  }
  if (process.argv[2] === 'replay' && t.fixture === 'docs-reader-start') {
    const page = readFileSync(join(published, t.output), 'utf8');
    const commands = [...page.matchAll(/^\s*```(?:sh|bash|shell)\n([\s\S]*?)^\s*```/gm)].flatMap(m => m[1]!.trim().split('\n').map(s => s.trim())).filter(s => s && !s.startsWith('#'));
    // Run only after the reviewer inspects the page and its declared starting context.
    for (const command of commands) assert.ok(allowed.has(command), `Unreviewed command: ${command}`);
    assert.ok(commands.includes('cp configs/release.example.json configs/release.json'));
    assert.ok(commands.includes('bun card.ts generate --config configs/release.json --write'));
    assert.ok(commands.includes('bun card.ts verify --config configs/release.json'));
    const work = mkdtempSync(join(temp, 'docs-e2e-replay-'));
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
      const savedBytes = readFileSync(join(work, 'generated/release.txt'), 'utf8');
      assert.equal(savedBytes, 'release-2.4.0\n');
      writeFileSync(join(dest, 'replay.json'), JSON.stringify({ startingContext: 'Bun available; fresh fixture root; no release.json or generated card', observations, savedBytes }, null, 2) + '\n');
    } finally { rmSync(work, { recursive: true, force: true }); }
  }
}
