import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const out = resolve('evals/results/2026-09-13-docs-reader');
const archive = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/docs-reader-evidence-20260913';
const text = (p: string) => readFileSync(p, 'utf8');
type Part = { type: string; text?: string; name?: string; state?: {
  status: string; input: Record<string, unknown>; content?: { type: string; text?: string }[];
} };
type Trial = { id: string; arm: string; fixture: string };
const { trials } = JSON.parse(text(join(out, 'freeze.json'))) as { trials: Trial[] };
const summaries = trials.filter(t => !process.argv[2] || t.id === process.argv[2]).map(t => {
  const exported = JSON.parse(text(join(archive, 'raw', t.id, 'export.json'))) as {
    data: { messages: { type: string; content?: Part[] }[] };
  };
  const parts = exported.data.messages.filter(m => m.type === 'assistant').flatMap(m => m.content ?? []);
  const tools = parts.filter(p => p.type === 'tool');
  const required = t.fixture === 'docs-reader-start' ? ['SKILL.md', 'STYLE.md', 'HOW-TO-TEMPLATE.md'] : ['SKILL.md', 'STYLE.md'];
  const exactReads = Object.fromEntries(required.map(file => {
    const expected = text(join(archive, t.arm, file)).trimEnd();
    const matching = tools.filter(p => p.name === 'read' && String(p.state?.input.path).endsWith(`skills/writing-technical-docs/${file}`));
    const contents = matching.flatMap(p => p.state?.content ?? []).filter(c => c.type === 'text').map(c => (c.text ?? '').split('\n').filter(line => /^\d+: /.test(line)).map(line => line.replace(/^\d+: /, '')).join('\n').trimEnd());
    return [file, contents.includes(expected)];
  }));
  return {
    id: t.id, exactReads, installedSkillCalls: tools.filter(p => p.name === 'skill').map(p => p.state?.input),
    toolNames: tools.map(p => p.name),
    readPaths: tools.filter(p => p.name === 'read').map(p => p.state?.input.path),
    commands: tools.filter(p => p.name === 'shell').map(p => ({ status: p.state?.status, input: p.state?.input, output: p.state?.content })),
    prose: parts.filter(p => p.type === 'text').map(p => p.text),
  };
});
writeFileSync(join(archive, process.argv[2] ? `inspection-${process.argv[2]}.json` : 'inspection.json'), JSON.stringify(summaries, null, 2) + '\n');
console.log(JSON.stringify(summaries.map(({ id, exactReads, installedSkillCalls, toolNames }) => ({ id, exactReads, installedSkillCalls, toolNames })), null, 2));
