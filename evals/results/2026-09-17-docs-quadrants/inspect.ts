import { mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const result = join(root, "evals/results/2026-09-17-docs-quadrants");
const archive = "/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/docs-quadrants-evidence-20260917";
interface Part { type: string; text?: string; name?: string; state?: { input?: Record<string, unknown>; content?: { type: string; text?: string }[]; status?: string } }
interface Message { id: string; type: string; text?: string; content?: Part[] }
interface Export { info: unknown; messages: Message[] }
const { trials } = await Bun.file(join(result, "freeze.json")).json() as { trials: { id: string; output: string }[] };
for (const t of trials.filter(t => !process.argv[2] || t.id === process.argv[2])) {
  const path = join(archive, "runs", t.id, "export.raw.json");
  if (!await Bun.file(path).exists()) continue;
  const exported = await Bun.file(path).json() as Export;
  const visible = exported.messages.map(m => ({ id: m.id, type: m.type, text: m.text, content: (m.content ?? []).filter(p => ["text", "tool"].includes(p.type)).map(p => p.type === "text" ? { type: p.type, text: p.text } : { type: p.type, name: p.name, state: p.state }) }));
  await Bun.write(join(archive, "runs", t.id, "visible.json"), JSON.stringify({ info: exported.info, messages: visible }, null, 2) + "\n");
  const lines = [`# ${t.id}: visible review`, ""];
  for (const m of visible) {
    for (const p of m.content) {
      if (p.type === "text") lines.push(`## ${m.id}: text`, p.text ?? "", "");
      else {
        lines.push(`## ${m.id}: ${p.name}`, "```json", JSON.stringify(p.state?.input, null, 2), "```", "");
        if (p.name !== "read" && p.name !== "patch") lines.push(...(p.state?.content ?? []).filter(c => c.type === "text").map(c => c.text ?? ""), "");
      }
    }
  }
  mkdirSync(join(root, ".evals/docs-quadrants/reviews"), { recursive: true });
  await Bun.write(join(root, ".evals/docs-quadrants/reviews", `${t.id}.md`), lines.join("\n"));
  await Bun.write(join(archive, "runs", t.id, "transcript.md"), lines.join("\n"));
  console.log(`${t.id}: ${visible.length} messages; ${lines.join("\n").length} visible review characters`);
}
