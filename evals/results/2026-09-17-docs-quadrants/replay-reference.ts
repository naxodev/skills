import { strict as assert } from "node:assert";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const result = join(process.cwd(), "evals/results/2026-09-17-docs-quadrants");
const temp = "/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode";
const archive = join(temp, "docs-quadrants-evidence-20260917");
const id = process.argv[2];
assert.ok(id && /^docs-reference-(baseline|candidate)-[123]$/.test(id), "Supply a reviewed reference ID");
const page = readFileSync(join(result, "runs", id, "reference.md"), "utf8");
const examples = page.split(/## Examples?\n/)[1];
assert.ok(examples, "Inspect a new reference shape before replaying");
const blocks = [...examples.matchAll(/^```(ts|sh|text)\n([\s\S]*?)^```/gm)].map(m => ({ language: m[1]!, body: m[2]! }));
const work = mkdtempSync(join(temp, "quadrants-reference-replay-"));
cpSync(join(archive, "fixture"), work, { recursive: true });
const observations: unknown[] = [];
function observe(call: string, expected: string) {
  const probe = Bun.spawnSync(["bun", "--eval", `import { releaseLabel } from './index.ts'; try { console.log(JSON.stringify(${call})); } catch (e) { console.log(e.name + ': ' + e.message); }`], { cwd: work });
  const actual = probe.stdout.toString().trim();
  assert.equal(probe.exitCode, 0); assert.equal(actual, expected);
  observations.push({ action: "Observe the documented return/error without changing the expression", expression: call, actual, expected });
}
try {
  for (const block of blocks.filter(b => b.language !== "text")) {
    let code = block.body;
    if (block.language === "sh") {
      const match = /^bun --eval '\n([\s\S]*)\n'\n$/.exec(code);
      assert.ok(match, "Review unexpected command");
      code = match[1]!;
    }
    assert.match(code, /import \{ releaseLabel \} from ['"]\.\/index\.ts['"]/);
    const p = Bun.spawnSync(["bun", "--eval", code], { cwd: work });
    const stdout = p.stdout.toString(); const stderr = p.stderr.toString();
    observations.push({ action: "Execute the published example unchanged via Bun --eval from the stated package root", source: code, exit: p.exitCode, stdout, stderr });
    if (["docs-reference-baseline-1", "docs-reference-baseline-3"].includes(id)) {
      if (id === "docs-reference-baseline-1") {
        assert.equal(p.exitCode, 1); assert.match(stderr, /error: version must not be blank/);
      } else {
        assert.equal(p.exitCode, 0); assert.equal(stderr, ""); assert.equal(stdout, "version must not be blank\n");
      }
      const calls = code.split("\n").filter(line => /^releaseLabel\(/.test(line));
      assert.equal(calls.length, 7);
      for (const line of calls) {
        const [call, comment] = line.split(/;\s*\/\/\s*/);
        assert.ok(call && comment);
        const expected = comment.startsWith("throws ") ? comment.slice(7) : JSON.stringify(comment.slice(1, -1));
        observe(call, expected);
      }
    } else {
      assert.equal(p.exitCode, 0); assert.equal(stderr, "", "An assertion diagnostic is a failure even with exit zero");
      const output = blocks.find(b => b.language === "text");
      if (output) assert.equal(stdout, output.body);
    }
  }
  if (id === "docs-reference-candidate-2") {
    const rows = [...examples.matchAll(/^\| `(releaseLabel\(.*?\))` \| (.*?) \|/gm)];
    assert.equal(rows.length, 10);
    for (const row of rows) {
      const expected = row[2]!.startsWith("Throws ") ? "Error: version must not be blank" : JSON.stringify(row[2]!.slice(2, -2));
      observe(row[1]!, expected);
    }
  }
  const record = { id, status: "passed", startingContext: "Fresh four-file fixture, Bun available, package-root working directory", notationExcluded: "Import/signature sections are lookup notation, not runnable examples", observations };
  mkdirSync(join(archive, "replays"), { recursive: true });
  await Bun.write(join(archive, "replays", `${id}.json`), JSON.stringify(record, null, 2) + "\n");
  await Bun.write(join(result, "runs", id, "replay.json"), JSON.stringify(record, null, 2) + "\n");
  console.log(`${id}: passed`);
} finally { rmSync(work, { recursive: true, force: true }); }
