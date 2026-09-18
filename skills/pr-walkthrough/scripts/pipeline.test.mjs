import { afterEach, expect, test } from 'bun:test';
import { which } from 'bun';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scripts = dirname(fileURLToPath(import.meta.url));
const nodePath = which('node');
if (!nodePath) throw new Error('Node.js is required for CLI integration tests');
const node = nodePath;
/** @type {string[]} */
const temporary = [];
function workspace() {
  const directory = mkdtempSync(join(tmpdir(), 'walkthrough-test-'));
  temporary.push(directory);
  return directory;
}
afterEach(() => {
  for (const directory of temporary.splice(0)) rmSync(directory, { recursive: true, force: true });
});

/** @returns {import('./types.js').Manifest} */
function manifest() {
  return {
    title: 'Keep <code> & "quotes" and $& literal', eyebrow: 'Example', dek: 'A reader can follow the change.',
    sections: [{ title: 'The change', content: '<p class="lead">A grounded explanation.</p>' }],
  };
}

/** @param {string} script
 * @param {string[]} args
 * @param {NodeJS.ProcessEnv} [env]
 */
function run(script, args, env = process.env) {
  return spawnSync(node, [join(scripts, script), ...args], { encoding: 'utf8', env });
}

/** @param {import('./types.js').Manifest} input */
function build(input) {
  const directory = workspace();
  const source = join(directory, 'manifest.json');
  const output = join(directory, 'walkthrough.html');
  writeFileSync(source, JSON.stringify(input));
  const result = run('build.mjs', ['--manifest', source, '--output', output]);
  return { result, source, output, directory };
}

test('a text-only walkthrough is readable without audio and escapes its plain-text title', () => {
  const { result, output } = build(manifest());
  expect(result.status).toBe(0);
  const html = readFileSync(output, 'utf8');
  expect(html).toContain('Keep &lt;code&gt; &amp; &quot;quotes&quot; and $&amp; literal');
  expect(html).toContain('<p class="lead">A grounded explanation.</p>');
  expect(html).not.toContain('<audio');
  expect(html).not.toMatch(/\{\{(?:TITLE|SECTIONS|PLAYALL)\}\}/);
});

test('code copied from a PR remains visible text rather than executable HTML', () => {
  const input = manifest();
  input.sections[0].content += '{{CODE:0}}';
  input.sections[0].code = [{ lang: 'text', source: '<script>alert("example")</script>' }];
  const { result, output } = build(input);
  expect(result.status).toBe(0);
  const html = readFileSync(output, 'utf8');
  expect(html).toMatch(/(?:&lt;|&#x3[cC];)script(?:&gt;|>)/);
  expect(html).not.toContain('<script>alert("example")</script>');
});

test.each([
  ['{{CODE:1}}', [{ lang: 'text', source: 'important' }], 'does not exist'],
  ['<p>No reference</p>', [{ lang: 'text', source: 'important' }], 'never referenced'],
  ['{{CODE:0}}{{CODE:0}}', [{ lang: 'text', source: 'important' }], 'more than once'],
])('a placeholder mismatch fails rather than dropping evidence: %s', (content, code, message) => {
  const input = manifest();
  input.sections[0].content = content;
  input.sections[0].code = code;
  const { result, output } = build(input);
  expect(result.status).toBe(2);
  expect(result.stderr).toContain(message);
  expect(existsSync(output)).toBe(false);
});

test('a missing audio sidecar produces the same text document', () => {
  const { result, source, output, directory } = build(manifest());
  expect(result.status).toBe(0);
  const original = readFileSync(output, 'utf8');
  const rerun = run('build.mjs', ['--manifest', source, '--output', output, '--audio', join(directory, 'missing.json')]);
  expect(rerun.status).toBe(0);
  expect(readFileSync(output, 'utf8')).toBe(original);
  expect(rerun.stderr).toContain('text-only HTML');
});

test('failed audio preflight removes old narration before the next build', () => {
  const input = manifest();
  input.sections[0].narration = 'This is the revised explanation.';
  const { source, output, directory } = build(input);
  const audio = join(directory, 'audio.json');
  writeFileSync(audio, JSON.stringify({ intro: null, sections: ['data:audio/mpeg;base64,T0xE'] }));
  const bin = join(directory, 'bin');
  mkdirSync(bin);
  writeFileSync(join(bin, 'ffmpeg'), '#!/bin/sh\nexit 0\n', { mode: 0o755 });
  const narration = run('generate-audio.mjs', ['--manifest', source, '--output', audio], { ...process.env, PATH: bin });
  expect(narration.status).toBe(0);
  expect(narration.stderr).toContain('lacks the libmp3lame');
  expect(existsSync(audio)).toBe(false);
  const result = run('build.mjs', ['--manifest', source, '--output', output, '--audio', audio]);
  expect(result.status).toBe(0);
  expect(readFileSync(output, 'utf8')).not.toContain('<audio');
});

test('text-only manifests skip the audio toolchain and discard earlier clips', () => {
  const { source, directory } = build(manifest());
  const audio = join(directory, 'audio.json');
  writeFileSync(audio, '{}');
  const result = run('generate-audio.mjs', ['--manifest', source, '--output', audio], { ...process.env, PATH: '' });
  expect(result.status).toBe(0);
  expect(result.stderr).toContain('manifest has no narration');
  expect(existsSync(audio)).toBe(false);
});

test('fetch passes shell syntax literally to gh without running it', () => {
  const directory = workspace();
  const marker = join(directory, 'should-not-exist');
  const log = join(directory, 'arguments.jsonl');
  const out = join(directory, 'pr.json');
  const pr = `$(touch ${marker})`;
  const mock = join(directory, 'gh');
  writeFileSync(mock, `#!${node}
const fs = require('node:fs');
const args = process.argv.slice(2);
fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify(args) + '\\n');
if (args[1] === 'view') console.log(JSON.stringify({ number: 42, title: 'Fixture PR' }));
if (args[1] === 'diff') console.log('fixture diff');
`, { mode: 0o755 });
  const result = run('fetch-pr.mjs', [pr, '--out', out], { ...process.env, PATH: directory });
  expect(result.status).toBe(0);
  expect(existsSync(marker)).toBe(false);
  const calls = readFileSync(log, 'utf8').trim().split('\n').map((line) => JSON.parse(line));
  expect(calls.find((args) => args[1] === 'view')[2]).toBe(pr);
  expect(calls.find((args) => args[1] === 'diff')[2]).toBe(pr);
  expect(JSON.parse(readFileSync(out, 'utf8')).diff).toContain('fixture diff');
});
