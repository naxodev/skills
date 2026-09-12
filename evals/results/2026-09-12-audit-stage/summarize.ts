import assert from 'node:assert/strict';
import { cpSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { isDeepStrictEqual } from 'node:util';
import { prepareNarrativeAudit } from '../../../scripts/narrative-audit.js';

const directory = resolve('evals/results/2026-09-12-audit-stage');
const prior = resolve('evals/results/2026-09-09-audit-stage');
const raw = resolve('.evals/resumed');
const json = (path: string, value: unknown) => writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
const hash = (text: string) => new Bun.CryptoHasher('sha256').update(text).digest('hex');
type Part = { type: string; text?: string; name?: string; time?: unknown; state?: { input?: { path?: string; [key: string]: unknown }; [key: string]: unknown } };
type Export = { data: { info: { model: unknown; location: {directory: string}; outcome: string; cost: number; tokens: {input: number; output: number; reasoning: number; cache: {read: number; write: number}} }; messages: {type: string; content?: Part[]}[] } };
type Record = { label: string; fixture?: string; location?: string; work?: string; evidence?: string; elapsedMs?: number; attempts?: {elapsedMs: number}[]; model: unknown };
const records = ['availability.json', 'qualification-runs.json', 'acceptance-runs.json', 'revised-acceptance-runs.json'].flatMap(file => (JSON.parse(readFileSync(join(directory, file), 'utf8')) as Record[]).map(record => ({ ...record, stage: file.replace('.json', '') })));
const usage = [];
const inputComparisons = [];
for (const record of records) {
  const suffix = record.evidence ? '-initial' : '';
  const exported = JSON.parse(readFileSync(join(raw, `${record.label}${suffix}.json`), 'utf8')) as Export;
  const info = exported.data.info;
  assert.deepEqual(info.model, record.model);
  assert.equal(info.location.directory, record.work ?? record.location);
  const visible = exported.data.messages.filter(m => m.type === 'assistant').flatMap(m => m.content ?? []).filter(p => ['text', 'tool'].includes(p.type)).map(p => p.type === 'text' ? {type: p.type, text: p.text} : {type: p.type, name: p.name, state: p.state, time: p.time});
  json(record.evidence ? join(record.evidence, 'initial-transcript.json') : join(directory, `${record.label}-summary.json`), {info, visible});
  const tools = visible.filter(p => p.type === 'tool');
  assert(tools.every(p => ['glob', 'read', 'write', 'patch'].includes(p.name ?? '')), 'Unexpected tool requires investigation');
  assert(tools.every(p => !p.state?.input?.path || p.state.input.path.startsWith(`${info.location.directory}/`)), 'Outside-workspace tool access');
  if (record.evidence && record.fixture) {
    const inputs = [];
    for (const file of ['source.json', 'verification.json', 'functions.mjs', 'probe.mjs', 'probe-results.json']) {
      const supplied: string = readFileSync(join(record.evidence, `initial-${file}`), 'utf8');
      const expected: string = readFileSync(join(prior, `fixtures/${record.fixture}/${file}`), 'utf8');
      assert.equal(supplied, expected, file);
      inputs.push({file, sha256: hash(supplied), byteIdentical: true});
    }
    const manifest = readFileSync(join(record.evidence, 'initial-manifest.json'), 'utf8');
    const fields = prepareNarrativeAudit(manifest).fields;
    const grade = JSON.parse(readFileSync(join(record.evidence, 'initial-grade.json'), 'utf8')) as {fields: {pointer: string; quote: string; status: string; rationale: string}[]};
    assert.deepEqual(grade.fields.map(f => f.pointer).sort(), fields.map(f => f.pointer).sort());
    for (const field of fields) {
      const rating = grade.fields.find(r => r.pointer === field.pointer)!;
      assert(field.value.includes(rating.quote), `Non-verbatim quote: ${field.pointer}`);
      assert(rating.rationale.length > 0);
    }
    inputComparisons.push({label: record.label, inputs, manifestSha256: hash(manifest), fieldsCovered: fields.length, exactQuotes: true, semanticAcceptance: 'see control-acceptance.json; mechanical coverage is not acceptance'});
  }
  usage.push({label: record.label, stage: record.stage, fixture: record.fixture, elapsedMs: record.elapsedMs ?? record.attempts!.reduce((sum, a) => sum + a.elapsedMs, 0), cost: info.cost, tokens: info.tokens, identityVerified: true, toolNames: tools.map(p => p.name), outsideReads: 0});
}
json(join(directory, 'usage.json'), usage);
json(join(directory, 'input-comparisons.json'), inputComparisons);

async function textFields(manifest: string) {
  const fields = [];
  for (const field of prepareNarrativeAudit(manifest).fields) {
    let text = field.value;
    if (field.pointer.endsWith('/content')) {
      text = '';
      await new HTMLRewriter().on('*', { element(element) { if (['p', 'div', 'li', 'br', 'h1', 'h2', 'h3'].includes(element.tagName)) text += '\n'; } }).onDocument({ text(chunk) { text += chunk.text; } }).transform(new Response(field.value)).text();
    }
    fields.push({pointer: field.pointer, text, codepoints: [...text].length, words: text.match(/\S+/gu)?.length ?? 0});
  }
  return fields;
}
const builds = [];
const comparisons = [];
mkdirSync(join(directory, 'builds'), {recursive: true});
for (const fixture of ['retry', 'transaction', 'cache']) {
  for (const version of ['initial', 'revised']) for (const kind of ['correct', 'flawed']) {
    const path = version === 'initial' ? join(prior, `reviewer/${fixture}-${kind}.json`) : join(directory, `controls/${fixture}-${kind}.json`);
    const target = join(directory, `builds/${fixture}-${version}-${kind}.html`);
    const result = spawnSync('node', [resolve('skills/pr-walkthrough/scripts/build.mjs'), '--manifest', path, '--output', target], {encoding: 'utf8', timeout: 60_000});
    builds.push({fixture, version, kind, manifest: relative(directory, path), html: relative(directory, target), exit: result.status, stdout: result.stdout, stderr: result.stderr});
    assert.equal(result.status, 0, result.stderr);
  }
  const initial = readFileSync(join(prior, `reviewer/${fixture}-correct.json`), 'utf8');
  const revised = readFileSync(join(directory, `controls/${fixture}-correct.json`), 'utf8');
  const left = prepareNarrativeAudit(initial).fields;
  const right = prepareNarrativeAudit(revised).fields;
  const flawed = prepareNarrativeAudit(readFileSync(join(directory, `controls/${fixture}-flawed.json`), 'utf8')).fields;
  assert.deepEqual(right.filter((f, i) => !isDeepStrictEqual(f, flawed[i])).map(f => f.pointer), ['/title']);
  const changed = left.filter((f, i) => !isDeepStrictEqual(f, right[i])).map(f => f.pointer);
  assert.deepEqual(changed, fixture === 'retry' ? ['/meta', '/sections/1/content'] : ['/meta']);
  const initialBytes = Buffer.byteLength(initial);
  const revisedBytes = Buffer.byteLength(revised);
  comparisons.push({fixture, changed, initialBytes, revisedBytes, byteGrowth: revisedBytes - initialBytes, relativeGrowth: (revisedBytes - initialBytes) / initialBytes, initial: await textFields(initial), revised: await textFields(revised), renderedCode: [], auditEdits: 'not run; these are pre-writer control revisions', needlessEdits: 'not measured; no audit ran'});
}
json(join(directory, 'builds.json'), builds);
json(join(directory, 'control-growth.json'), comparisons);
const lock = JSON.parse(readFileSync(join(directory, 'freeze.json'), 'utf8')) as {hashes: {[path: string]: string}};
for (const [path, expected] of Object.entries(lock.hashes)) assert.equal(hash(readFileSync(path, 'utf8')), expected, path);
const inventory: {[path: string]: string} = {};
function inventoryTree(path: string) {
  for (const entry of readdirSync(path, {withFileTypes: true})) {
    const file = join(path, entry.name);
    if (entry.isDirectory()) inventoryTree(file);
    else if (!['evidence-hashes.json'].includes(entry.name)) inventory[relative(directory, file)] = hash(readFileSync(file, 'utf8'));
  }
}
inventoryTree(directory);
json(join(directory, 'evidence-hashes.json'), inventory);
const archive = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/audit-stage-resumed-evidence-20260912';
mkdirSync(archive, {recursive: true});
cpSync(raw, join(archive, '.evals/resumed'), {recursive: true});
cpSync(directory, join(archive, 'public'), {recursive: true});
console.log(JSON.stringify({sessions: usage.length, builds: builds.length, archived: archive}));
