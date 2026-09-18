import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

// Extract observable tool evidence. Prose criteria still require source review.
const out = resolve('evals/results/2026-09-17-community-plan');
const archive = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/community-plan-evidence-20260917';
const text = (p: string) => readFileSync(p, 'utf8');
const hash = (s: string) => new Bun.CryptoHasher('sha256').update(s).digest('hex');
type Tool = { type: string; name?: string; state?: { status: string; input?: Record<string, unknown>; content?: { type: string; text?: string }[] } };
type Export = { data: { messages: { type: string; content?: Tool[] }[] } };
const trials = (JSON.parse(text(join(out, 'freeze.json'))) as { trials: { id: string; arm: string; work: string }[] }).trials;
const all = [];
for (const trial of trials) {
  const base = join(archive, 'raw', trial.id);
  const file = join(base, 'export.json');
  if (!existsSync(file)) throw new Error(`Missing export: ${trial.id}`);
  const exported = JSON.parse(text(file)) as Export;
  const tools = exported.data.messages.flatMap(m => m.content ?? []).filter(p => p.type === 'tool');
  const ledger = tools.map((p, index) => {
    const input = p.state?.input ?? {};
    const path = typeof input.path === 'string' ? input.path.replace(trial.work + '/', '') : undefined;
    const output = (p.state?.content ?? []).filter(c => c.type === 'text').map(c => c.text ?? '').join('\n');
    return { index, name: p.name, status: p.state?.status, path, commandSha256: typeof input.command === 'string' ? hash(input.command) : undefined, outputSha256: hash(output) };
  });
  const reads = readdirSync(join(archive, trial.arm)).map(f => {
    const path = `skills/discord-community-server/${f}`;
    const calls = tools.filter(p => p.name === 'read' && typeof p.state?.input?.path === 'string' && (p.state.input.path as string).replace(trial.work + '/', '') === path);
    const source = text(join(archive, trial.arm, f));
    const lines = source.split('\n');
    const seen = new Set<number>();
    for (const call of calls) for (const chunk of call.state?.content ?? []) {
      for (const line of (chunk.text ?? '').split('\n')) {
        const match = /^(\d+): ?(.*)$/.exec(line);
        if (!match) continue;
        const n = Number(match[1]);
        if (lines[n - 1] !== match[2]) throw new Error(`Read mismatch ${trial.id} ${path}:${n}`);
        seen.add(n);
      }
    }
    const expectedLines = source.endsWith('\n') ? lines.length - 1 : lines.length;
    return { path, sha256: hash(source), calls: calls.length, observedLines: seen.size, expectedLines, completeRead: seen.size >= expectedLines };
  });
  const plan = text(join(out, 'runs', trial.id, 'plan.md'));
  all.push({ id: trial.id, exportSha256: hash(text(file)), tools: ledger, reads, publicPlanWords: plan.trim().split(/\s+/).length, publicPlanSha256: hash(plan) });
  // Keep tool arguments/results and private state outside the public repository.
  writeFileSync(join(base, 'visible-tools.json'), JSON.stringify(tools, null, 2) + '\n');
}
writeFileSync(join(out, 'tool-evidence.json'), JSON.stringify(all, null, 2) + '\n');
