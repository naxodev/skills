import { readFileSync, writeFileSync, cpSync } from 'node:fs';
import { join, resolve } from 'node:path';

const out = resolve('evals/results/2026-09-18-community-regression');
const archive = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/community-review-evidence-20260918';
const text = (p: string) => readFileSync(p, 'utf8');
const hash = (s: string) => new Bun.CryptoHasher('sha256').update(s).digest('hex');
type Part = { type: string; name?: string; text?: string; state?: { status: string; input: Record<string, unknown>; content?: { type: string; text?: string }[] } };
const frozen = JSON.parse(text(join(out, 'freeze.json'))) as { trials: { id: string; work: string; prompt: string; fixture: string }[]; hashes: Record<string, string> };
const evidence = [];
for (const t of frozen.trials) {
  const exported = JSON.parse(text(resolve('.evals/community-regression', t.id, 'export.json'))) as { data: { messages: { type: string; content?: Part[] }[] } };
  const visible = exported.data.messages.filter(m => m.type === 'assistant').map(m => ({ type: m.type, content: (m.content ?? []).filter(p => ['text', 'tool'].includes(p.type)).map(p => p.type === 'text' ? { type: p.type, text: p.text } : { type: p.type, name: p.name, state: p.state }) }));
  writeFileSync(join(out, 'runs', t.id, 'transcript.md'), `# Visible transcript\n\n## User prompt\n\n${t.prompt}\n\n## Assistant text and tool results\n\n\`\`\`json\n${JSON.stringify(visible, null, 2)}\n\`\`\`\n`);
  const tools = exported.data.messages.flatMap(m => m.content ?? []).filter(p => p.type === 'tool');
  const reads: Record<string, string> = {};
  const calls = tools.map(p => {
    const input = p.state?.input ?? {};
    if (p.name === 'read' && p.state?.status === 'completed') {
      const path = String(input.path);
      if (path.includes('skills/discord-community-server/') || path.endsWith('snapshot.md')) {
        const file = path.split('/').at(-1)!;
        const result = p.state.content?.filter(c => c.type === 'text').map(c => c.text).join('\n') ?? '';
        const lines = result.split('\n').filter(line => /^\d+: /.test(line)).map(line => line.replace(/^\d+: /, ''));
        const value = lines.join('\n') + '\n';
        const key = file === 'snapshot.md' ? `${t.fixture}.md` : `current/${file}`;
        if (hash(value) === frozen.hashes[key]) reads[file] = hash(value);
      }
    }
    return { name: p.name, status: p.state?.status, input: p.name === 'patch' ? { targets: String(input.patchText).split('\n').filter(line => /^\*\*\* (Add|Update|Delete) File:/.test(line)) } : input };
  });
  for (const file of ['snapshot.md', 'SKILL.md', 'REFERENCE.md', 'OPERATIONS.md', 'VERIFICATION.md']) if (!reads[file]) throw new Error(`No complete hash-matched read: ${t.id}/${file}`);
  const item = { id: t.id, exactReads: reads, calls };
  evidence.push(item);
  console.log(JSON.stringify(item));
}
writeFileSync(join(out, 'tool-evidence.json'), JSON.stringify(evidence, null, 2) + '\n');
cpSync(join(out, 'runs'), join(archive, 'runs'), { recursive: true });
cpSync(join(out, 'tool-evidence.json'), join(archive, 'tool-evidence.json'));
