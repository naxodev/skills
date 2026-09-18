import { strict as assert } from 'node:assert';
import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const out = resolve('evals/results/2026-09-13-docs-e2e');
const archive = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/docs-e2e-evidence-20260913';
const text = (p: string) => readFileSync(p, 'utf8');
type Part = { type: string; text?: string; name?: string; state?: {
  status: string; input: Record<string, unknown>; content?: { type: string; text?: string }[];
} };
type Trial = { id: string; arm: string; fixture: string; output: string; prompt: string };
const { trials } = JSON.parse(text(join(out, 'freeze.json'))) as { trials: Trial[] };
const summaries = trials.filter(t => !process.argv[2] || t.id === process.argv[2]).map(t => {
  const exported = JSON.parse(text(join(archive, 'raw', t.id, 'export.json'))) as {
    data: { messages: { type: string; text?: string; content?: Part[] }[] };
  };
  assert.deepEqual(exported.data.messages.filter(m => m.type === 'user').map(m => m.text), [t.prompt]);
  const parts = exported.data.messages.filter(m => m.type === 'assistant').flatMap(m => m.content ?? []);
  const tools = parts.filter(p => p.type === 'tool');
  const required = t.fixture === 'docs-reader-start' ? ['SKILL.md', 'STYLE.md', 'HOW-TO-TEMPLATE.md'] : ['SKILL.md', 'STYLE.md'];
  const exactReads = Object.fromEntries(required.map(file => {
    const expected = text(join(archive, t.arm, file)).trimEnd();
    const matching = tools.filter(p => p.name === 'read' && String(p.state?.input.path).endsWith(`skills/writing-technical-docs/${file}`));
    const contents = matching.flatMap(p => p.state?.content ?? []).filter(c => c.type === 'text').map(c => (c.text ?? '').split('\n').filter(line => /^\d+: /.test(line)).map(line => line.replace(/^\d+: /, '')).join('\n').trimEnd());
    return [file, contents.includes(expected)];
  }));
  const dest = join(out, 'runs', t.id); mkdirSync(dest, { recursive: true });
  cpSync(join(archive, t.fixture), dest, { recursive: true });
  for (const file of [t.output, 'README.md']) cpSync(join(archive, 'raw', t.id, 'workspace', file), join(dest, file));
  const result = {
    id: t.id, exactReads, exactPrompt: true, toolNames: tools.map(p => p.name), installedSkillCalls: tools.filter(p => p.name === 'skill').map(p => p.state?.input),
    readPaths: tools.filter(p => p.name === 'read').map(p => p.state?.input.path),
    commands: tools.filter(p => p.name === 'shell').map(p => ({ status: p.state?.status, input: p.state?.input, output: p.state?.content })),
    prose: parts.filter(p => p.type === 'text').map(p => p.text),
  };
  writeFileSync(join(archive, `inspection-${t.id}.json`), JSON.stringify(result, null, 2) + '\n');
  return result;
});
writeFileSync(join(out, 'read-checks.json'), JSON.stringify(summaries.map(({ id, exactReads, exactPrompt, toolNames, installedSkillCalls, readPaths }) => ({ id, exactReads, exactPrompt, toolNames, installedSkillCalls, readPaths })), null, 2) + '\n');
console.log(JSON.stringify(summaries.map(({ id, exactReads, installedSkillCalls }) => ({ id, exactReads, installedSkillCalls })), null, 2));
