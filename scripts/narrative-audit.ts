import { createHash } from 'node:crypto';
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { isDeepStrictEqual } from 'node:util';

export interface AuditField {
  pointer: string;
  value: string;
}

export interface AuditInput {
  inputSha256: string;
  fields: AuditField[];
}

export interface AuditSources {
  source: unknown;
  verification?: unknown;
  probe?: unknown;
}

function object(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object`);
  return value as Record<string, unknown>;
}

function array(value: unknown, label: string): unknown[] {
  if (!Array.isArray(value)) throw new Error(`${label} must be an array`);
  return value;
}

function text(value: unknown, label: string): string {
  if (typeof value !== 'string' || !value) throw new Error(`${label} must be a non-empty string`);
  return value;
}

function atPointer(value: unknown, pointer: string): unknown {
  if (pointer === '') return value;
  if (!pointer.startsWith('/') || /~(?:[^01]|$)/.test(pointer)) throw new Error(`invalid JSON Pointer: ${pointer}`);
  for (const token of pointer.slice(1).split('/').map((key) => key.replace(/~1/g, '/').replace(/~0/g, '~'))) {
    if (Array.isArray(value) && !/^(0|[1-9]\d*)$/.test(token)) throw new Error(`invalid array index in JSON Pointer: ${pointer}`);
    if (!value || typeof value !== 'object' || !Object.hasOwn(value, token)) throw new Error(`missing JSON Pointer: ${pointer}`);
    value = (value as Record<string, unknown>)[token];
  }
  return value;
}

function fields(manifest: Record<string, unknown>): AuditField[] {
  const result: AuditField[] = [];
  for (const key of ['title', 'eyebrow', 'dek', 'meta', 'footer', 'narrationIntro']) {
    if (typeof manifest[key] === 'string') result.push({ pointer: `/${key}`, value: manifest[key] });
  }
  const sections = array(manifest.sections, 'manifest.sections');
  if (!sections.length) throw new Error('manifest.sections must not be empty');
  sections.forEach((value, index) => {
    const section = object(value, `section ${index}`);
    for (const key of ['eyebrow', 'title', 'content', 'narration']) {
      if (typeof section[key] === 'string') result.push({ pointer: `/sections/${index}/${key}`, value: section[key] });
    }
  });
  return result;
}

/** Bind an audit to the exact input bytes and enumerate its editable text fields. */
export function prepareNarrativeAudit(manifestText: string): AuditInput {
  const manifest = object(JSON.parse(manifestText), 'manifest');
  return {
    inputSha256: createHash('sha256').update(manifestText).digest('hex'),
    fields: fields(manifest),
  };
}

function evidence(value: unknown, sources: AuditSources): void {
  let hasPrimary = false;
  const items = array(value, 'finding.evidence');
  if (!items.length) throw new Error('finding requires evidence');
  for (const item of items) {
    const ref = object(item, 'evidence');
    const file = text(ref.file, 'evidence.file');
    if (!['source', 'verification', 'probe'].includes(file) || !Object.hasOwn(sources, file)) throw new Error(`unavailable evidence file: ${file}`);
    if (typeof ref.pointer !== 'string') throw new Error('evidence.pointer must be a string');
    const actual = atPointer(sources[file as keyof AuditSources], ref.pointer);
    const hasQuote = Object.hasOwn(ref, 'quote');
    if (hasQuote === Object.hasOwn(ref, 'value')) throw new Error('evidence requires exactly one quote or value');
    if (hasQuote) {
      const quote = text(ref.quote, 'evidence.quote');
      if (typeof actual !== 'string' || !actual.includes(quote)) throw new Error(`evidence quote does not occur verbatim: ${file}${ref.pointer}`);
    } else if (!isDeepStrictEqual(actual, ref.value)) {
      throw new Error(`evidence value mismatch: ${file}${ref.pointer}`);
    }
    if (file !== 'verification') hasPrimary = true;
  }
  if (!hasPrimary) throw new Error('finding requires original source or probe evidence');
}

/** Validate the audit boundary and apply text replacements without judging their factual truth. */
export function applyNarrativeAudit(manifestText: string, input: unknown, sources: AuditSources): string {
  if (!Object.hasOwn(sources, 'source')) throw new Error('original source evidence is required');
  const prepared = prepareNarrativeAudit(manifestText);
  const audit = object(input, 'audit');
  if (audit.inputSha256 !== prepared.inputSha256) throw new Error('audit inputSha256 does not match the manifest');
  const reviewed = array(audit.reviewedPointers, 'reviewedPointers');
  if (reviewed.some((item) => typeof item !== 'string') || !isDeepStrictEqual([...reviewed].sort(), prepared.fields.map((field) => field.pointer).sort())) {
    throw new Error('reviewedPointers must list every editable field exactly once');
  }
  const findings = array(audit.findings, 'findings');
  const edits = array(audit.edits, 'edits');
  const blockers = array(audit.blockers, 'blockers').map((item) => text(item, 'blocker'));
  if (audit.verdict === 'blocked') {
    if (!blockers.length || edits.length) throw new Error('blocked audit requires blockers and no edits');
    throw new Error(`audit blocked: ${blockers.join('; ')}`);
  }
  if (blockers.length) throw new Error('non-blocked audit has blockers');
  if (audit.verdict === 'pass') {
    if (findings.length || edits.length) throw new Error('pass audit must have no findings or edits');
    return manifestText;
  }
  if (audit.verdict !== 'revise' || !findings.length || !edits.length) throw new Error('revise audit requires findings and edits');

  const allowed = new Map(prepared.fields.map((field) => [field.pointer, field.value]));
  const ids = new Map<string, string>();
  for (const value of findings) {
    const finding = object(value, 'finding');
    const id = text(finding.id, 'finding.id');
    const pointer = text(finding.pointer, 'finding.pointer');
    text(finding.problem, 'finding.problem');
    if (ids.has(id) || !allowed.has(pointer)) throw new Error('duplicate finding ID or non-editable finding pointer');
    ids.set(id, pointer);
    evidence(finding.evidence, sources);
  }

  const replacements: AuditField[] = [];
  const addressed = new Set<string>();
  const touched = new Set<string>();
  const placeholders = (value: string) => (value.match(/\{\{(?:CODE|DIAGRAM):\d+\}\}/g) ?? []).sort();
  for (const item of edits) {
    const edit = object(item, 'edit');
    const pointer = text(edit.pointer, 'edit.pointer');
    if (!allowed.has(pointer) || touched.has(pointer)) throw new Error('duplicate or non-editable edit pointer');
    if (typeof edit.value !== 'string') throw new Error('edit.value must be a string');
    if (!isDeepStrictEqual(placeholders(allowed.get(pointer)!), placeholders(edit.value))) throw new Error(`edit must preserve structured placeholders: ${pointer}`);
    const links = array(edit.findingIds, 'edit.findingIds').map((id) => text(id, 'finding ID'));
    if (!links.length) throw new Error('edit must address a finding');
    for (const id of links) {
      if (ids.get(id) !== pointer) throw new Error('edit refers to a missing finding or another field');
      addressed.add(id);
    }
    touched.add(pointer);
    replacements.push({ pointer, value: edit.value });
  }
  if ([...ids.keys()].some((id) => !addressed.has(id))) throw new Error('every finding must be addressed');

  const manifest = object(JSON.parse(manifestText), 'manifest');
  for (const edit of replacements) {
    const tokens = edit.pointer.slice(1).split('/');
    const key = tokens.pop()!;
    const parentPointer = tokens.length ? `/${tokens.join('/')}` : '';
    object(atPointer(manifest, parentPointer), 'edit parent')[key] = edit.value;
  }
  return JSON.stringify(manifest, null, 2) + '\n';
}

function argumentsFor(argv: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  const allowed = new Set(['manifest', 'audit', 'source', 'verification', 'probe', 'output']);
  for (let index = 0; index < argv.length; index += 2) {
    const flag = argv[index];
    const key = flag?.slice(2);
    const value = argv[index + 1];
    if (!flag?.startsWith('--') || !allowed.has(key) || Object.hasOwn(result, key) || !value || value.startsWith('--')) throw new Error(`invalid or duplicate flag/value: ${flag}`);
    result[key] = resolve(value);
  }
  return result;
}

function protectInputs(output: string, inputs: string[]): void {
  if (inputs.includes(output)) throw new Error('output must differ from every input');
  if (!existsSync(output)) return;
  const target = statSync(output);
  if (inputs.some((input) => {
    const source = statSync(input);
    return source.dev === target.dev && source.ino === target.ino;
  })) throw new Error('output aliases an input file');
}

if (import.meta.main) {
  try {
    const [command, ...argv] = process.argv.slice(2);
    if (!['prepare', 'apply'].includes(command)) throw new Error('usage: bun run audit <prepare|apply> --manifest <file> --output <file> [--audit <file> --source <file> --verification <file> --probe <file>]');
    const args = argumentsFor(argv);
    if (!args.manifest || !args.output) throw new Error('--manifest and --output are required');
    if (command === 'prepare' && Object.keys(args).some((key) => !['manifest', 'output'].includes(key))) throw new Error('prepare accepts only --manifest and --output');
    if (command === 'apply' && (!args.audit || !args.source)) throw new Error('apply requires --audit and --source');
    protectInputs(args.output, Object.entries(args).filter(([key]) => key !== 'output').map(([, path]) => path));
    const manifestText = readFileSync(args.manifest, 'utf8');
    if (command === 'prepare') {
      const prepared = prepareNarrativeAudit(manifestText);
      writeFileSync(args.output, JSON.stringify(prepared.fields, null, 2) + '\n');
      console.log(JSON.stringify({ inputSha256: prepared.inputSha256, fieldsPath: args.output }));
    } else {
      const sources: AuditSources = { source: JSON.parse(readFileSync(args.source, 'utf8')) };
      for (const key of ['verification', 'probe'] as const) if (args[key]) sources[key] = JSON.parse(readFileSync(args[key], 'utf8'));
      const result = applyNarrativeAudit(manifestText, JSON.parse(readFileSync(args.audit, 'utf8')), sources);
      writeFileSync(args.output, result);
      console.log(args.output);
    }
  } catch (error) {
    console.error(`audit: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 2;
  }
}
