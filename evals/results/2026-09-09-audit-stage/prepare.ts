import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { prepareNarrativeAudit } from '../../../scripts/narrative-audit.js';

const directory = dirname(fileURLToPath(import.meta.url));
const root = resolve(directory, '../../..');
const hash = (text: string) => createHash('sha256').update(text).digest('hex');
const controls = JSON.parse(readFileSync(resolve(directory, 'reviewer/controls.json'), 'utf8')) as Record<string, {
  corruptedTitle: string;
  manifest: { title: string; sections: { content: string }[] };
}>;
const inventory: Record<string, string> = {};
function record(path: string, text: string) {
  const file = resolve(directory, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, text);
  inventory[path] = hash(text);
}
function json(path: string, value: unknown) { record(path, JSON.stringify(value, null, 2) + '\n'); }
for (const [id, control] of Object.entries(controls)) {
  const fixture = resolve(directory, `fixtures/${id}`);
  const functions = readFileSync(resolve(fixture, 'functions.mjs'), 'utf8');
  const contracts = JSON.parse(readFileSync(resolve(fixture, 'contracts.json'), 'utf8')) as object;
  const boundary = functions.indexOf('export async function after(');
  assert.ok(boundary > 0);
  const probe = spawnSync('node', [resolve(fixture, 'probe.mjs')], { encoding: 'utf8', timeout: 10000 });
  assert.equal(probe.status, 0, probe.stderr);
  json(`fixtures/${id}/source.json`, { ...contracts, before: functions.slice(functions.indexOf('export async function before('), boundary).trim(), after: functions.slice(boundary).trim(), unchanged: id === 'cache' ? functions.slice(0, functions.indexOf('export async function before(')).trim() : 'none' });
  json(`fixtures/${id}/verification.json`, { status: 'none', findings: [] });
  json(`fixtures/${id}/probe-results.json`, JSON.parse(probe.stdout));
  const original = JSON.stringify(control.manifest, null, 2) + '\n';
  const corrupted = JSON.stringify({ ...control.manifest, title: control.corruptedTitle }, null, 2) + '\n';
  const left = prepareNarrativeAudit(original).fields;
  const right = prepareNarrativeAudit(corrupted).fields;
  assert.deepEqual(left.filter((field, index) => field.value !== right[index].value).map((field) => field.pointer), ['/title']);
  for (const [kind, text] of [['correct', original], ['flawed', corrupted]]) {
    const relative = `reviewer/${id}-${kind}.json`;
    record(relative, text);
    const output = resolve(root, `.evals/audit-stage/builds/${id}-${kind}.html`);
    mkdirSync(dirname(output), { recursive: true });
    const built = spawnSync('node', [resolve(root, 'skills/pr-walkthrough/scripts/build.mjs'), '--manifest', resolve(directory, relative), '--output', output], { encoding: 'utf8' });
    assert.equal(built.status, 0, built.stderr);
    writeFileSync(output.replace('.html', '-build.json'), JSON.stringify({ exit: built.status, stdout: built.stdout, stderr: built.stderr }, null, 2));
  }
  for (const file of ['functions.mjs', 'contracts.json', 'probe.mjs']) inventory[`fixtures/${id}/${file}`] = hash(readFileSync(resolve(fixture, file), 'utf8'));
}
for (const path of ['PROTOCOL.md', 'WRITER.md', 'MANIFEST.md', 'reviewer/CRITERIA.md', 'reviewer/controls.json']) inventory[path] = hash(readFileSync(resolve(directory, path), 'utf8'));
inventory['../../../skills/pr-walkthrough/STYLE.md'] = hash(readFileSync(resolve(root, 'skills/pr-walkthrough/STYLE.md'), 'utf8'));
inventory['../../protocols/FINAL-NARRATIVE-AUDIT.md'] = hash(readFileSync(resolve(root, 'evals/protocols/FINAL-NARRATIVE-AUDIT.md'), 'utf8'));
json('design-lock.json', { status: 'pre-result design snapshot; external control acceptance pending', sha256: inventory });
console.log('Three deterministic probe suites and six control builds passed. Only /title differs in each control pair.');
