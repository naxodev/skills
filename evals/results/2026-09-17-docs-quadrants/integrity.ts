import { strict as assert } from "node:assert";
import { join } from "node:path";

const root = process.cwd();
const result = join(root, "evals/results/2026-09-17-docs-quadrants");
const archive = "/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/docs-quadrants-evidence-20260917";
interface Part { type: string; name?: string; state?: { input?: { path?: string; command?: string }; content?: { type: string; text?: string }[] } }
interface Export { messages: { type: string; content?: Part[] }[] }
const frozen = await Bun.file(join(result, "freeze.json")).json() as { trials: { id: string; arm: string; work: string }[] };
const results = [];
for (const trial of frozen.trials) {
  const path = join(archive, "runs", trial.id, "export.raw.json");
  if (!await Bun.file(path).exists()) continue;
  const exported = await Bun.file(path).json() as Export;
  const tools = exported.messages.flatMap(m => m.content ?? []).filter(p => p.type === "tool");
  assert.ok(!tools.some(t => t.name === "skill"), `Installed skill in ${trial.id}`);
  const required = ["skills/writing-technical-docs/SKILL.md", "skills/writing-technical-docs/STYLE.md", "package.json", "index.ts", "release-label.ts", "README.md"];
  const reads = [];
  for (const file of required) {
    const tool = tools.find(t => t.name === "read" && [file, join(trial.work, file)].includes(t.state?.input?.path ?? ""));
    assert.ok(tool, `Missing source read: ${trial.id}/${file}`);
    const text = tool.state?.content?.filter(c => c.type === "text").map(c => c.text).join("\n") ?? "";
    const source = text.split("\n").filter(l => /^\d+: /.test(l)).map(l => l.replace(/^\d+: /, "")).join("\n");
    const expected = (await Bun.file(join(archive, "runs", trial.id, "before", file)).text()).trimEnd();
    assert.equal(source.trimEnd(), expected, `Read content mismatch: ${trial.id}/${file}`);
    reads.push({ file, status: "exact frozen content read" });
  }
  const commands = tools.filter(t => t.name === "shell").map(t => t.state?.input?.command ?? "");
  assert.ok(!commands.some(c => /\b(?:git|jj)\s+(?:log|show|file\s+show)\b/.test(c)), "History consulted");
  results.push({ id: trial.id, reads, toolNames: [...new Set(tools.map(t => t.name))], installedSkillsLoaded: false, historyConsulted: false });
}
await Bun.write(join(result, "integrity.json"), JSON.stringify(results, null, 2) + "\n");
console.log(`${results.length} sessions: exact local skill/source reads; no installed skill loads or history commands`);
