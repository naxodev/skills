import { strict as assert } from 'node:assert';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const parent = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode';
const archive = join(parent, 'docs-reader-evidence-20260913');
mkdirSync(archive, { recursive: true });
const work = mkdtempSync(join(parent, 'docs-reader-probe-'));
const observations: unknown[] = [];
cpSync(resolve('evals/fixtures/docs-reader'), work, { recursive: true });
function run(args: string[], cwd = work) {
  const result = Bun.spawnSync(['bun', ...args], { cwd });
  const observed = { args, cwd: cwd === work ? 'root' : 'configs', exit: result.exitCode,
    stdout: result.stdout.toString(), stderr: result.stderr.toString() };
  observations.push(observed);
  return observed;
}
try {
  assert.notEqual(run(['card.ts', 'generate', '--config', 'configs/release.json', '--write']).exit, 0);
  cpSync(join(work, 'configs/release.example.json'), join(work, 'configs/release.json'));
  assert.notEqual(run(['../card.ts', 'generate', '--config', 'configs/release.json', '--write'], join(work, 'configs')).exit, 0);
  assert.equal(run(['card.ts', 'generate', '--config', 'configs/release.json']).stdout, 'dry run generated/release.txt: release-2.4.0\n');
  assert.equal(existsSync(join(work, 'generated/release.txt')), false);
  assert.notEqual(run(['card.ts', 'verify', '--config', 'configs/release.json']).exit, 0);
  assert.equal(run(['card.ts', 'generate', '--config', 'configs/preview.json', '--write']).exit, 0);
  assert.equal(existsSync(join(work, 'generated/release.txt')), false);
  assert.equal(run(['card.ts', 'generate', '--config', 'configs/release.json', '--write']).exit, 0);
  assert.equal(readFileSync(join(work, 'generated/release.txt'), 'utf8'), 'release-2.4.0\n');
  assert.equal(run(['card.ts', 'verify', '--config', 'configs/release.json']).stdout, 'verified generated/release.txt: release-2.4.0\n');
  writeFileSync(join(work, 'generated/release.txt'), 'preview-2.4.0\n');
  assert.notEqual(run(['card.ts', 'verify', '--config', 'configs/release.json']).exit, 0);
  writeFileSync(join(archive, 'probe.json'), JSON.stringify(observations, null, 2) + '\n');
  console.log('Verified missing config, wrong directory, dry-run non-write, wrong selection, persisted release, and mismatch rejection.');
} finally { rmSync(work, { recursive: true, force: true }); }
