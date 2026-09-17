import { cpSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const privateRoot = join(root, ".evals/pr-evidence");
const out = join(root, "evals/results/2026-09-17-pr-evidence");
const temp = "/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode";
const archive = join(temp, "pr-evidence-evidence-20260917");
const freeze = await Bun.file(join(out, "trial-freeze.json")).json() as { trials: { id: string; clone: string; number: number }[] };
async function digest(path: string): Promise<string> { return new Bun.CryptoHasher("sha256").update(await Bun.file(path).arrayBuffer()).digest("hex"); }
function copySource(from: string, to: string): void {
  mkdirSync(to, { recursive: true });
  for (const entry of readdirSync(from, { withFileTypes: true })) {
    if (entry.name === "node_modules") continue;
    if (entry.isDirectory()) copySource(join(from, entry.name), join(to, entry.name));
    else cpSync(join(from, entry.name), join(to, entry.name));
  }
}
const cleanup = [];
for (const trial of freeze.trials) {
  const expected = join(temp, `pr-evidence-${trial.id}-20260917`);
  if (trial.clone !== expected) throw new Error(`Unexpected clone path: ${trial.clone}`);
  const run = join(privateRoot, "runs", trial.id);
  const identities = await Bun.file(join(run, "identities.json")).json() as { id: string; outcome?: string }[];
  if (identities.length !== 5 || identities.some((x) => x.outcome === undefined)) throw new Error(`Incomplete owned sessions: ${trial.id}`);
  const handoff = join(trial.clone, "work", `pr-${trial.number}-walkthrough.html`);
  const snapshot = join(run, "artifacts", `pr-${trial.number}-walkthrough.html`);
  if (await digest(handoff) !== await digest(snapshot)) throw new Error(`Handoff differs: ${trial.id}`);
  cpSync(run, join(archive, "runs", trial.id), { recursive: true });
  copySource(join(trial.clone, "skills/pr-walkthrough"), join(archive, "inputs", trial.id, "skills/pr-walkthrough"));
  for (const name of ["AGENTS.md", "package.json", "bun.lock", "tsconfig.json", "eslint.config.mjs"]) cpSync(join(trial.clone, name), join(archive, "inputs", trial.id, name));
  cleanup.push({ id: trial.id, clone: trial.clone, handoff, savedHandoff: join(archive, "runs", trial.id, "artifacts", `pr-${trial.number}-walkthrough.html`), sha256: await digest(snapshot), sessions: identities.map((x) => x.id) });
}
copySource(out, join(archive, "published"));
cpSync(join(privateRoot, "trials.json"), join(archive, "trials.json"));
for (const entry of readdirSync(privateRoot, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith(".log")) cpSync(join(privateRoot, entry.name), join(archive, entry.name));
}
for (const entry of cleanup) rmSync(entry.clone, { recursive: true, force: false });
await Bun.write(join(out, "cleanup.json"), JSON.stringify({ at: new Date().toISOString(), archive, clones: cleanup }, null, 2) + "\n");
cpSync(join(out, "cleanup.json"), join(archive, "published/cleanup.json"));
console.log(`Archived evidence and removed ${cleanup.length} owned trial clones. Owner clone retained.`);
