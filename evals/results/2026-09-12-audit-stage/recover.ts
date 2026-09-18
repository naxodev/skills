import { cpSync, readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import assert from 'node:assert/strict';

const output = resolve('evals/results/2026-09-12-audit-stage');
const temp = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode';
const archive = join(temp, 'audit-stage-resumed-evidence-20260912');
const label = process.argv[2] ?? 'c9bb4141-8429-4fcc-b125-331c8e66fbc6';
const sessionID = process.argv[3] ?? 'ses_f69dedb4affetxj2pBWOb2GWQH';
const evidence = join(output, 'artifacts', label);
const work = join(temp, `audit-trial-${label}`);
const exported = await Bun.$`opencode2 api get /api/session/${sessionID}/export`.text();
const {data} = JSON.parse(exported) as {data: {info: {model: unknown; location: {directory: string}; outcome: string; time: {created: number; idle: number}}; messages: {type: string; content?: {type: string; text?: string; name?: string; state?: unknown; time?: unknown}[]}[]}};
assert.equal(data.info.outcome, 'succeeded');
assert.equal(data.info.location.directory, work);
assert.deepEqual(data.info.model, {providerID: 'xai', id: 'grok-4.6', variant: 'high'});
const mapping = JSON.parse(readFileSync(join(archive, 'masked-mapping.json'), 'utf8')) as {opaque: string; fixture: string; path: string}[];
const records = JSON.parse(readFileSync(join(output, 'masked-grades.json'), 'utf8')) as {opaque: string; label: string}[];
assert(!records.some(r => r.label === label), 'Already recovered');
const item = mapping[records.length]!;
assert.equal(readFileSync(join(work, 'manifest.json'), 'utf8'), readFileSync(item.path, 'utf8'));
const hash = (text: string) => new Bun.CryptoHasher('sha256').update(text).digest('hex');
const immutable: {[key: string]: string} = {};
for (const file of readdirSync(work)) if (!file.startsWith('.')) {
  cpSync(join(work, file), join(evidence, `initial-${file}`));
  if (file !== 'grade.json') immutable[file] = hash(readFileSync(join(work, file), 'utf8'));
}
const rawPath = resolve('.evals/resumed', `${label}-initial.json`);
writeFileSync(rawPath, exported);
const json = (path: string, value: unknown) => writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
json(join(evidence, 'initial-transcript.json'), data.messages.filter(m => m.type === 'assistant').map(m => ({type: m.type, content: m.content?.filter(p => ['text', 'tool'].includes(p.type)).map(p => p.type === 'text' ? {type: p.type, text: p.text} : {type: p.type, name: p.name, state: p.state, time: p.time})})));
json(join(evidence, 'execution.json'), {label, fixture: item.fixture, kind: item.opaque, work, evidence, model: data.info.model, sessionID, immutable, attempts: [{phase: 'initial', elapsedMs: null, serviceCreatedToIdleMs: data.info.time.idle - data.info.time.created, recoveredAt: new Date().toISOString(), interruption: 'Host foreground command interrupted. Model completed normally. No prompt was resent. Exact prompt-through-export latency unavailable.', info: data.info, rawSha256: hash(exported)}]});
records.push({opaque: item.opaque, label});
json(join(output, 'masked-grades.json'), records);
mkdirSync(join(archive, '.evals/resumed'), {recursive: true});
cpSync(rawPath, join(archive, '.evals/resumed', `${label}-initial.json`));
cpSync(evidence, join(archive, 'public/artifacts', label), {recursive: true});
rmSync(work, {recursive: true});
console.log(`Recovered completed grade ${records.length} without another prompt. End-to-end latency remains unavailable.`);
