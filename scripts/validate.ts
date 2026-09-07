import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { catalogErrors, skillDirectories } from './catalog.js';

const root = process.cwd();
const errors = catalogErrors(root);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const temporary = mkdtempSync(join(tmpdir(), 'skills-validation-'));
try {
  for (const directory of skillDirectories(root)) {
    const source = readFileSync(join(directory, 'SKILL.md'), 'utf8');
    // The catalog checks the host-specific flag before portable metadata validation omits it.
    const portable = source.replace(/^(---\r?\n)([\s\S]*?)(\r?\n---)/, (_match, start, yaml, end) =>
      start + yaml.replace(/^disable-model-invocation:.*(?:\r?\n|$)/m, '') + end);
    const target = join(temporary, basename(directory));
    mkdirSync(target);
    writeFileSync(join(target, 'SKILL.md'), portable);
    const result = spawnSync('skills-ref', ['validate', target], { stdio: 'inherit' });
    if (result.error) throw result.error;
    if (result.status !== 0) process.exitCode = 1;
  }
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
if (!process.exitCode) console.log('Catalog, local Markdown links, and skill metadata passed.');
