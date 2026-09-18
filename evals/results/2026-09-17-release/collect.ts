import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { isDeepStrictEqual } from 'node:util';

// Recover artifact collection after an order-sensitive controller comparison.
// This script never prompts a model or changes the original execution record.
const root = process.cwd();
const out = join(root, 'evals/results/2026-09-17-release');
const archive = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/release-prep-evidence-20260917';
const read = (p: string): unknown => JSON.parse(readFileSync(p, 'utf8'));
const hash = (p: string) => new Bun.CryptoHasher('sha256').update(readFileSync(p)).digest('hex');
const save = (p: string, value: unknown) => writeFileSync(p, JSON.stringify(value, null, 2) + '\n');
type Info = { id: string; agent: string; model: unknown; outcome: string; location: { directory: string } };
type Part = { type: string; text?: string; name?: string; state?: unknown };
type Export = { info: Info; messages: { type: string; text?: string; content?: Part[] }[] };
const frozen = read(join(out, 'freeze.json')) as { model: unknown; trials: { id: string; kind: string; work: string; expected?: string | null; hashes: Record<string, string> }[] };
const executions = read(join(out, 'executions.json')) as { id: string; sessionID: string; identities?: Info[]; status: string }[];
const results: unknown[] = [];
for (const trial of frozen.trials) {
  const execution = executions.find(e => e.id === trial.id)!;
  const dir = join(out, 'runs', trial.id);
  const exported = read(join(dir, `${execution.sessionID}.visible.json`)) as Export;
  const info = exported.info;
  const identity = info.outcome === 'succeeded' && info.agent === 'build' && info.location.directory === trial.work && isDeepStrictEqual(info.model, frozen.model);
  const parts = exported.messages.filter(m => m.type === 'assistant').flatMap(m => m.content ?? []);
  const toolCalls = parts.filter(p => p.type === 'tool');
  const record: Record<string, unknown> = { id: trial.id, sessionID: info.id, identity, originalControllerStatus: execution.status };
  if (trial.kind === 'routing') {
    const response = parts.filter(p => p.type === 'text').at(-1)?.text ?? '';
    const parsed = JSON.parse(response) as { choice: string | null; reason: string };
    Object.assign(record, { ...parsed, expected: trial.expected, matches: parsed.choice === trial.expected, toolCalls: toolCalls.length });
  } else {
    record.inputChanges = Object.entries(trial.hashes).filter(([p, h]) => !existsSync(join(trial.work, p)) || hash(join(trial.work, p)) !== h).map(([p]) => p);
    record.nativeChildren = (execution.identities?.length ?? 1) - 1;
    for (const file of readdirSync(trial.work)) if (/\.(md|json|html)$/.test(file) && !['package.json', 'pr.json', 'snapshot.md'].includes(file)) cpSync(join(trial.work, file), join(dir, file));
    cpSync(trial.work, join(archive, 'outputs', trial.id), { recursive: true, filter: p => !p.includes('/node_modules') && !p.includes('/.git') && !p.includes('/.jj') });
    record.visibleExports = readdirSync(dir).filter(f => f.endsWith('.visible.json'));
  }
  results.push(record);
}
mkdirSync(archive, { recursive: true });
save(join(out, 'collection.json'), { explanation: 'Controller compared model objects by JSON key order. Recovered existing outputs with structural equality; no repeated model calls.', results, finalTemplateSha256: hash(join(root, 'skills/writing-technical-docs/HOW-TO-TEMPLATE.md')) });
cpSync(out, join(archive, 'public'), { recursive: true });
