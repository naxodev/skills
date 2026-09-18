import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { decodeNamedCharacterReference } from 'decode-named-character-reference';
import { prepareNarrativeAudit, applyNarrativeAudit } from '../../../scripts/narrative-audit.js';

const directory = resolve('evals/results/2026-09-12-audit-stage');
const prior = resolve('evals/results/2026-09-09-audit-stage');
const json = (path: string, value: unknown) => writeFileSync(join(directory, path), JSON.stringify(value, null, 2) + '\n');
const load = <T>(path: string): T => JSON.parse(readFileSync(path, 'utf8')) as T;
const hash = (text: string) => new Bun.CryptoHasher('sha256').update(text).digest('hex');
type Pair = {fixture: string; kind: string; original: string; revised: string; writer?: string; audit: string; error?: string};
type Mapping = {pair: number; fixture: string; kind: string; stage: string; path: string; opaque: string};
type Rating = {pointer: string; quote: string; status?: string; factualStatus?: string; factual_status?: string; rationale?: string; [key: string]: unknown};
type Grade = {fields: Rating[]; [key: string]: unknown};
type Part = {type: string; name?: string; state?: {input?: {path?: string; workdir?: string; command?: string; [key: string]: unknown}; [key: string]: unknown}; [key: string]: unknown};
type Info = {model: unknown; location: {directory: string}; outcome: string; cost: number; tokens: {input: number; output: number; reasoning: number; cache: {read: number; write: number}}};
type Attempt = {phase: string; elapsedMs: number | null; serviceCreatedToIdleMs?: number; info: Info; rawSha256: string};
type Execution = {label: string; fixture: string; kind: string; work: string; model: unknown; immutable: {[key: string]: string}; attempts: Attempt[]};
const pairs = load<Pair[]>(join(directory, 'pairs.json'));
const mapping = load<Mapping[]>(join(directory, 'unmasked-mapping.json'));
const grades = load<{opaque: string; label: string; error?: string}[]>(join(directory, 'masked-grades.json'));
assert.equal(pairs.length, 15);
assert.equal(grades.length, 30);
assert.equal(new Set(mapping.map(m => m.opaque)).size, 30);

async function htmlText(html: string) {
  let text = '';
  await new HTMLRewriter().on('*', {element(element) {
    if (['p', 'div', 'li', 'br', 'h1', 'h2', 'h3'].includes(element.tagName)) text += '\n';
  }}).onDocument({text(chunk) { text += chunk.text; }}).transform(new Response(html)).text();
  return text.replace(/&(#x[\da-f]+|#\d+|[a-z][\da-z]+);/gi, (whole: string, entity: string) => {
    if (!entity.startsWith('#')) return decodeNamedCharacterReference(entity) || whole;
    const point = parseInt(entity.slice(entity[1]?.toLowerCase() === 'x' ? 2 : 1), entity[1]?.toLowerCase() === 'x' ? 16 : 10);
    return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : '\ufffd';
  });
}
assert.equal(await htmlText('<p>a &lt;= b &amp; c</p>'), '\na <= b & c');
async function measure(manifest: string) {
  const fields = [];
  for (const field of prepareNarrativeAudit(manifest).fields) {
    const text = field.pointer.endsWith('/content') ? await htmlText(field.value.replace(/\{\{(?:CODE|DIAGRAM):\d+\}\}/g, ' ')) : field.value;
    fields.push({...field, text, codepoints: [...text].length, words: text.match(/\S+/gu)?.length ?? 0});
  }
  const m = JSON.parse(manifest) as {sections: {code?: {source: string}[]; diagrams?: string[]}[]};
  const code = m.sections.flatMap((section, s) => (section.code ?? []).map((c, i) => ({pointer: `/sections/${s}/code/${i}/source`, text: c.source, codepoints: [...c.source].length, words: c.source.match(/\S+/gu)?.length ?? 0})));
  return {bytes: Buffer.byteLength(manifest), fields, code, codepoints: fields.reduce((sum, f) => sum + f.codepoints, 0), words: fields.reduce((sum, f) => sum + f.words, 0)};
}
const pick = (grade: Grade, snake: string, camel: string) => grade[snake] ?? grade[camel] ?? [];
const reviews = [];
for (const item of mapping) {
  const run = grades.find(g => g.opaque === item.opaque)!;
  const folder = join(directory, 'artifacts', run.label);
  const grade = load<Grade>(join(folder, 'initial-grade.json'));
  const manifest = readFileSync(item.path, 'utf8');
  assert.equal(readFileSync(join(folder, 'initial-manifest.json'), 'utf8'), manifest);
  const fields = prepareNarrativeAudit(manifest).fields;
  assert.deepEqual(grade.fields.map(f => f.pointer).sort(), fields.map(f => f.pointer).sort());
  const fieldChecks = [];
  for (const field of fields) {
    const rating = grade.fields.find(f => f.pointer === field.pointer)!;
    const status = rating.status ?? rating.factualStatus ?? rating.factual_status;
    assert(['supported', 'nonfactual', 'unsupported', 'contradicted'].includes(status ?? ''), `${run.label} ${field.pointer}`);
    const rendered = field.pointer.endsWith('/content') ? await htmlText(field.value) : field.value;
    const normalize = (text: string) => text.replace(/\{\{(?:CODE|DIAGRAM):\d+\}\}/g, ' ').replace(/\s+/g, ' ').trim();
    fieldChecks.push({pointer: field.pointer, status, quote: rating.quote, exactRawQuote: field.value.includes(rating.quote), renderedQuote: rendered.includes(rating.quote), normalizedRenderedQuote: normalize(rendered).includes(normalize(rating.quote))});
  }
  const prose = pick(grade, 'reader_facing_prose', 'readerFacingProse') as {rating?: string};
  reviews.push({...item, path: relative(directory, item.path), label: run.label, grade: relative(directory, join(folder, 'initial-grade.json')), fields: fieldChecks, fieldDefects: fieldChecks.filter(f => ['unsupported', 'contradicted'].includes(f.status!)), omissions: pick(grade, 'missing_material_limitations', 'missingMaterialLimitations'), attribution: pick(grade, 'attribution_errors', 'attributionErrors'), code: pick(grade, 'code_diagram_errors', 'codeDiagramErrors'), prose: prose.rating ?? 'uncertain', uncertainty: pick(grade, 'unresolved_uncertainty', 'unresolvedUncertainty')});
}
json('normalized-model-grades.json', reviews);

const executions: {label: string; fixture: string; kind: string; model: unknown; immutable: {file: string; sha256: string; unchanged: boolean}[]; elapsedMs: number | null; serviceCreatedToIdleMs?: number; cost: number; tokens: Info['tokens']; rawSha256: string; tools: (string | undefined)[]; identityVerified: boolean; hostRepairs: number; toolScope: string}[] = [];
const shellReview = [];
for (const label of readdirSync(join(directory, 'artifacts'))) {
  const evidence = join(directory, 'artifacts', label);
  const execution = load<Execution>(join(evidence, 'execution.json'));
  const raw = load<{data: {info: Info; messages: {type: string; content?: Part[]}[]}}>(resolve('.evals/resumed', `${label}-initial.json`));
  assert.deepEqual(raw.data.info.model, execution.model);
  assert.equal(raw.data.info.location.directory, execution.work);
  assert.equal(raw.data.info.outcome, 'succeeded');
  const immutable = [];
  for (const [file, expected] of Object.entries(execution.immutable)) {
    const content = readFileSync(join(evidence, `initial-${file}`), 'utf8');
    assert.equal(hash(content), expected);
    immutable.push({file, sha256: expected, unchanged: true});
  }
  for (const file of ['source.json', 'verification.json', 'functions.mjs', 'probe.mjs', 'probe-results.json']) assert.equal(readFileSync(join(evidence, `initial-${file}`), 'utf8'), readFileSync(join(prior, `fixtures/${execution.fixture}/${file}`), 'utf8'));
  const tools = raw.data.messages.filter(m => m.type === 'assistant').flatMap(m => m.content ?? []).filter(p => p.type === 'tool');
  for (const tool of tools) {
    assert(['read', 'write', 'edit', 'patch', 'glob', 'grep', 'shell'].includes(tool.name ?? ''), `Unexpected tool: ${tool.name}`);
    const path = resolve(execution.work, tool.state?.input?.path ?? '.');
    assert(path === execution.work || path.startsWith(execution.work + '/'), 'Outside-workspace path');
    if (tool.name === 'shell') {
      const cwd = resolve(execution.work, tool.state?.input?.workdir ?? '.');
      assert.equal(cwd, execution.work);
      shellReview.push({label, command: tool.state?.input?.command, adjudication: 'Local artifact validation; no external source, history, or skill read. Reviewed in visible transcript.'});
    }
  }
  const attempt = execution.attempts[0]!;
  executions.push({label, fixture: execution.fixture, kind: execution.kind, model: execution.model, immutable, elapsedMs: attempt.elapsedMs, serviceCreatedToIdleMs: attempt.serviceCreatedToIdleMs, cost: raw.data.info.cost, tokens: raw.data.info.tokens, rawSha256: attempt.rawSha256, tools: tools.map(t => t.name), identityVerified: true, hostRepairs: execution.attempts.length - 1, toolScope: 'local supplied workspace only'});
}
json('study-executions.json', executions);
json('shell-review.json', shellReview);

mkdirSync(join(directory, 'main-builds'), {recursive: true});
const measurements = [];
for (const [index, pair] of pairs.entries()) {
  const original = readFileSync(pair.original, 'utf8');
  const revised = readFileSync(pair.revised, 'utf8');
  const auditFolder = join(directory, 'artifacts', pair.audit);
  assert.equal(readFileSync(join(auditFolder, 'initial-manifest.json'), 'utf8'), original);
  const audit = load<{verdict: string; edits: {pointer: string}[]; findings: unknown[]}>(join(auditFolder, 'initial-audit.json'));
  const sources = {source: load(join(auditFolder, 'initial-source.json')), verification: load(join(auditFolder, 'initial-verification.json')), probe: load(join(auditFolder, 'initial-probe-results.json'))};
  assert.equal(applyNarrativeAudit(original, audit, sources), revised);
  const originalMeasure = await measure(original), revisedMeasure = await measure(revised);
  assert.deepEqual(originalMeasure.code, revisedMeasure.code);
  const changed = originalMeasure.fields.filter((f, i) => f.value !== revisedMeasure.fields[i]!.value).map(f => f.pointer);
  assert.deepEqual(changed.slice().sort(), audit.edits.map(e => e.pointer).sort());
  const builds = [];
  for (const stage of ['original', 'revised']) {
    const path = stage === 'original' ? pair.original : pair.revised;
    const target = join(directory, `main-builds/${index}-${pair.fixture}-${pair.kind}-${stage}.html`);
    const result = spawnSync('node', [resolve('skills/pr-walkthrough/scripts/build.mjs'), '--manifest', path, '--output', target], {encoding: 'utf8', timeout: 60_000});
    builds.push({stage, html: relative(directory, target), exit: result.status, stdout: result.stdout, stderr: result.stderr});
    assert.equal(result.status, 0, result.stderr);
  }
  measurements.push({pair: index, fixture: pair.fixture, kind: pair.kind, original: relative(directory, pair.original), revised: relative(directory, pair.revised), writer: pair.writer, audit: pair.audit, originalSha256: hash(original), revisedSha256: hash(revised), verdict: audit.verdict, findings: audit.findings.length, changed, byteGrowth: revisedMeasure.bytes - originalMeasure.bytes, relativeGrowth: (revisedMeasure.bytes - originalMeasure.bytes) / originalMeasure.bytes, wordGrowth: revisedMeasure.words - originalMeasure.words, codepointGrowth: revisedMeasure.codepoints - originalMeasure.codepoints, originalMeasure, revisedMeasure, builds, modelOriginal: reviews.find(r => r.pair === index && r.stage === 'original'), modelRevised: reviews.find(r => r.pair === index && r.stage === 'revised')});
}
json('paired-results.json', measurements);
function stats(values: number[]) {
  const sorted = values.slice().sort((a, b) => a - b);
  return {n: sorted.length, median: sorted.length % 2 ? sorted[Math.floor(sorted.length / 2)] : (sorted[sorted.length / 2 - 1]! + sorted[sorted.length / 2]!) / 2, min: sorted[0], max: sorted.at(-1)};
}
const groups = [
  {stage: 'writers', labels: pairs.flatMap(p => p.writer ? [p.writer] : [])},
  {stage: 'main audits', labels: pairs.slice(0, 9).map(p => p.audit)},
  {stage: 'control audits', labels: pairs.slice(9).map(p => p.audit)},
  {stage: 'masked grading', labels: grades.map(g => g.label)},
].map(group => {
  const selected = executions.filter(e => group.labels.includes(e.label));
  return {stage: group.stage, n: selected.length, latencySeconds: stats(selected.flatMap(e => e.elapsedMs === null ? [] : [e.elapsedMs / 1000])), unavailableLatency: selected.filter(e => e.elapsedMs === null).map(e => e.label), cost: selected.reduce((s, e) => s + e.cost, 0), inputTokens: selected.reduce((s,e) => s+e.tokens.input,0), outputTokens: selected.reduce((s,e) => s+e.tokens.output,0), reasoningTokens: selected.reduce((s,e) => s+e.tokens.reasoning,0), cachedReadTokens: selected.reduce((s,e) => s+e.tokens.cache.read,0), cachedWriteTokens: selected.reduce((s,e) => s+e.tokens.cache.write,0)};
});
json('study-summary.json', {completedAt: new Date().toISOString(), groups, mainGrowth: {bytes: stats(measurements.slice(0,9).map(m => m.byteGrowth)), relative: stats(measurements.slice(0,9).map(m => m.relativeGrowth)), words: stats(measurements.slice(0,9).map(m => m.wordGrowth)), codepoints: stats(measurements.slice(0,9).map(m => m.codepointGrowth))}, mechanical: {writers:9, audits:15, grades:30, builds:30, fieldsGraded:510, repairs:executions.reduce((s,e) => s+e.hostRepairs,0)}, unchangedPairs: measurements.filter(m => !m.changed.length).map(m => m.pair)});
console.log('Validated 15 exact audit applications, 30 masked grade inventories, source/input identity, and 30 text-only builds.');
