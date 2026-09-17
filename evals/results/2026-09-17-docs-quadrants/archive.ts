import { strict as assert } from "node:assert";
import { cpSync, existsSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = process.cwd();
const result = join(root, "evals/results/2026-09-17-docs-quadrants");
const archive = "/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/docs-quadrants-evidence-20260917";
function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)]);
}
async function hash(path: string) { return new Bun.CryptoHasher("sha256").update(await Bun.file(path).arrayBuffer()).digest("hex"); }
const frozen = await Bun.file(join(result, "freeze.json")).json() as { trials: { id: string; work: string; output: string }[]; hashes: Record<string, string> };
for (const file of ["SKILL.md", "STYLE.md", "HOW-TO-TEMPLATE.md"]) assert.equal(await hash(join(root, "skills/writing-technical-docs", file)), frozen.hashes[`candidate/${file}`], "Candidate changed after freeze");
for (const trial of frozen.trials) {
  assert.equal(existsSync(trial.work), false, "Author clone was not cleaned up");
  for (const file of [trial.output, "README.md"]) {
    const published = join(result, "runs", trial.id, file);
    assert.equal(await hash(published), await hash(join(archive, "runs", trial.id, "after", file)), "Published artifact changed");
    for (const m of (await Bun.file(published).text()).matchAll(/\]\(([^)]+)\)/g)) {
      const [path, anchor] = m[1]!.split("#");
      const destination = resolve(dirname(published), path!);
      assert.ok(existsSync(destination), `Broken published link: ${trial.id}/${m[1]}`);
      if (anchor) assert.ok((await Bun.file(destination).text()).split("\n").some(l => l.startsWith("#") && l.replace(/^#+\s*/, "").toLowerCase().replace(/ /g, "-") === anchor));
    }
  }
  const visible = await Bun.file(join(archive, "runs", trial.id, "visible.json")).text();
  assert.ok(!visible.includes('"type": "reasoning"') && !visible.includes("reasoningEncryptedContent"), "Visible transcript leaked reasoning");
}
const manifest = Object.fromEntries(await Promise.all(files(result).filter(p => !p.endsWith("output-hashes.json")).map(async p => [p.slice(result.length + 1), await hash(p)])));
await Bun.write(join(result, "output-hashes.json"), JSON.stringify(manifest, null, 2) + "\n");
cpSync(result, join(archive, "public-results"), { recursive: true });
console.log("Frozen candidate unchanged; 12 author clones removed; published pages match snapshots; links resolve; visible transcripts exclude reasoning; result archive synchronized.");
