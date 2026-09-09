import { afterEach, expect, test } from 'bun:test';
import { linkSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { applyNarrativeAudit, prepareNarrativeAudit } from './narrative-audit.js';

const original = JSON.stringify({
  title: 'Refresh before send', eyebrow: 'Example PR', dek: 'Refresh always succeeds.',
  sections: [{
    title: 'The change', content: '<p>Refresh always succeeds.</p>{{CODE:0}}',
    code: [{ lang: 'js', source: 'await client.refresh();' }],
  }],
});
const sources = { source: { diff: 'await client.refresh();\nawait client.send();', 'a/b': 'reported motivation' }, probe: { reads: 0 } };

function audit() {
  const prepared = prepareNarrativeAudit(original);
  return {
    inputSha256: prepared.inputSha256, verdict: 'revise',
    reviewedPointers: prepared.fields.map((field) => field.pointer), blockers: [],
    findings: [{ id: 'A1', pointer: '/dek', problem: 'An awaited operation can reject.', evidence: [{ file: 'source', pointer: '/diff', quote: 'await client.refresh();' }] }],
    edits: [{ pointer: '/dek', findingIds: ['A1'], value: 'The helper awaits refresh before send.' }],
  };
}

test('preparation covers visible summaries and body while leaving code outside the edit boundary', () => {
  const prepared = prepareNarrativeAudit(original);
  expect(prepared.inputSha256).toHaveLength(64);
  expect(prepared.fields.map((field) => field.pointer)).toEqual(['/title', '/eyebrow', '/dek', '/sections/0/title', '/sections/0/content']);
});

test('a supported correction changes only its addressed text field', () => {
  const result = JSON.parse(applyNarrativeAudit(original, audit(), sources));
  expect(result.dek).toBe('The helper awaits refresh before send.');
  expect(result.sections).toEqual(JSON.parse(original).sections);
  expect(result.title).toBe(JSON.parse(original).title);
});

test('an audit cannot be applied to a different revision of the narrative', () => {
  const newer = original.replace('Refresh before send', 'Revised story');
  expect(() => applyNarrativeAudit(newer, audit(), sources)).toThrow('inputSha256');
});

test.each(['omitted', 'duplicated'])('a declared review cannot skip a field or hide a duplicate: %s', (kind) => {
  const value = audit();
  if (kind === 'omitted') value.reviewedPointers.pop();
  else value.reviewedPointers.push('/title');
  expect(() => applyNarrativeAudit(original, value, sources)).toThrow('exactly once');
});

test('invented and noncontiguous quotes fail instead of becoming evidence', () => {
  const value = audit();
  value.findings[0].evidence[0].quote = 'refresh guarantees success';
  expect(() => applyNarrativeAudit(original, value, sources)).toThrow('verbatim');
  value.findings[0].evidence[0].quote = 'refresh();\nawait client.send';
  expect(() => applyNarrativeAudit(original, value, { source: { diff: 'refresh();\nintervening line\nawait client.send();' } })).toThrow('verbatim');
});

test('upstream approval alone cannot stand in for primary evidence', () => {
  const value = audit();
  value.findings[0].evidence[0].file = 'verification';
  expect(() => applyNarrativeAudit(original, value, { ...sources, verification: sources.source })).toThrow('original source or probe');
});

test('numeric observations must match and JSON Pointer escaping preserves source keys', () => {
  const value = audit();
  const numeric = { ...value, findings: [{ ...value.findings[0], evidence: [{ file: 'probe', pointer: '/reads', value: 0 }] }] };
  expect(JSON.parse(applyNarrativeAudit(original, numeric, sources)).dek).toBe(value.edits[0].value);
  numeric.findings[0].evidence[0].value = 1;
  expect(() => applyNarrativeAudit(original, numeric, sources)).toThrow('value mismatch');
  value.findings[0].evidence[0] = { file: 'source', pointer: '/a~1b', quote: 'reported motivation' };
  expect(JSON.parse(applyNarrativeAudit(original, value, sources)).dek).toBe(value.edits[0].value);
});

test('an edit cannot use an unrelated finding as authorization', () => {
  const value = audit();
  value.edits[0].pointer = '/title';
  expect(() => applyNarrativeAudit(original, value, sources)).toThrow('another field');
});

test('evidence pointers address JSON values rather than array implementation properties', () => {
  const value = audit();
  const referenced = { ...value, findings: [{ ...value.findings[0], evidence: [{ file: 'probe', pointer: '/length', value: 1 }] }] };
  expect(() => applyNarrativeAudit(original, referenced, { source: {}, probe: ['one case'] })).toThrow('invalid array index');
  referenced.findings[0].evidence[0].pointer = '/00';
  expect(() => applyNarrativeAudit(original, referenced, { source: {}, probe: [1] })).toThrow('invalid array index');
});

test('code and diagram evidence cannot be dropped during prose correction', () => {
  const value = audit();
  value.findings[0].pointer = '/sections/0/content';
  value.edits[0].pointer = '/sections/0/content';
  expect(() => applyNarrativeAudit(original, value, sources)).toThrow('preserve structured placeholders');
  value.edits[0].value = '<p>The helper awaits refresh.</p>{{CODE:0}}';
  expect(JSON.parse(applyNarrativeAudit(original, value, sources)).sections[0].code).toEqual(JSON.parse(original).sections[0].code);
  value.edits[0].value += '{{CODE:0}}';
  expect(() => applyNarrativeAudit(original, value, sources)).toThrow('preserve structured placeholders');
});

test.each(['/sections/0/code/0/source', '/__proto__/polluted'])('audits cannot change code or arbitrary object paths: %s', (path) => {
  const value = audit();
  value.findings[0].pointer = path;
  value.edits[0].pointer = path;
  expect(() => applyNarrativeAudit(original, value, sources)).toThrow('non-editable');
});

test('a pass preserves the original bytes and cannot conceal requested changes', () => {
  const value = { ...audit(), verdict: 'pass', findings: [], edits: [] };
  expect(applyNarrativeAudit(original, value, sources)).toBe(original);
  expect(() => applyNarrativeAudit(original, { ...audit(), verdict: 'pass' }, sources)).toThrow('no findings or edits');
});

test('blocked audits cannot produce a corrected document', () => {
  const value = { ...audit(), verdict: 'blocked', edits: [], blockers: ['Code excerpt needs a separate correction.'] };
  expect(() => applyNarrativeAudit(original, value, sources)).toThrow('audit blocked');
});

const temporary: string[] = [];
afterEach(() => temporary.splice(0).forEach((directory) => rmSync(directory, { recursive: true, force: true })));
function cliFixture() {
  const directory = mkdtempSync(join(tmpdir(), 'narrative-audit-test-'));
  temporary.push(directory);
  const work = join(directory, 'files with spaces');
  mkdirSync(work);
  const manifest = join(work, 'manifest.json'), report = join(work, 'audit.json'), source = join(work, 'source.json');
  writeFileSync(manifest, original); writeFileSync(report, JSON.stringify(audit())); writeFileSync(source, JSON.stringify(sources.source));
  const cli = (...args: string[]) => spawnSync(process.execPath, [resolve('scripts/narrative-audit.ts'), ...args], { encoding: 'utf8' });
  return { work, manifest, report, source, cli };
}

test('the CLI prepares fields and applies edits to a separate output file', () => {
  const { work, manifest, report, source, cli } = cliFixture();
  const fields = join(work, 'fields.json'), output = join(work, 'audited.json');
  const prepared = cli('prepare', '--manifest', manifest, '--output', fields);
  expect(prepared.status).toBe(0);
  expect(JSON.parse(prepared.stdout).inputSha256).toBe(audit().inputSha256);
  expect(JSON.parse(readFileSync(fields, 'utf8'))).toEqual(prepareNarrativeAudit(original).fields);
  const applied = cli('apply', '--manifest', manifest, '--audit', report, '--source', source, '--output', output);
  expect(applied.status).toBe(0);
  expect(readFileSync(manifest, 'utf8')).toBe(original);
  expect(JSON.parse(readFileSync(output, 'utf8')).dek).toBe(audit().edits[0].value);
});

test('the CLI preserves inputs and an existing output when validation fails', () => {
  const { work, manifest, report, source, cli } = cliFixture();
  const output = join(work, 'audited.json');
  writeFileSync(output, 'earlier valid output');
  writeFileSync(report, JSON.stringify({ ...audit(), inputSha256: 'stale' }));
  const failed = cli('apply', '--manifest', manifest, '--audit', report, '--source', source, '--output', output);
  expect(failed.status).toBe(2);
  expect(readFileSync(output, 'utf8')).toBe('earlier valid output');
  const alias = join(work, 'alias.json');
  linkSync(manifest, alias);
  const aliased = cli('prepare', '--manifest', manifest, '--output', alias);
  expect(aliased.status).toBe(2);
  expect(aliased.stderr).toContain('aliases an input');
  expect(readFileSync(manifest, 'utf8')).toBe(original);
});
