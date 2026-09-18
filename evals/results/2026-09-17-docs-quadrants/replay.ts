import { strict as assert } from "node:assert";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const result = join(root, "evals/results/2026-09-17-docs-quadrants");
const temp = "/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode";
const archive = join(temp, "docs-quadrants-evidence-20260917");
const id = process.argv[2];
assert.ok(id && /^docs-tutorial-(baseline|candidate)-[123]$/.test(id), "Supply a reviewed tutorial ID");
const page = readFileSync(join(result, "runs", id, "tutorial.md"), "utf8");
const blocks = [...page.matchAll(/^```(ts|sh|bash|text)\n([\s\S]*?)^```/gm)].map(m => ({ language: m[1]!, body: m[2]! }));
const commands = blocks.filter(b => ["sh", "bash"].includes(b.language)).map(b => b.body.trim());
const runCommands = commands.filter(c => c !== "bun --version");
assert.equal(runCommands.length, 2, "Review changed procedure");
assert.equal(runCommands[0], runCommands[1]);
const match = /^bun (?:run )?([a-z-]+\.ts)$/.exec(runCommands[0]!);
assert.ok(match, "Only reviewed local Bun commands are allowed");
const filename = match[1]!;
assert.ok(page.includes(`\`${filename}\``));
const work = mkdtempSync(join(temp, "quadrants-replay-"));
cpSync(join(archive, "fixture"), work, { recursive: true });
const observations: unknown[] = [];
let actual = "";
let checkpoints = 0;
const inlineCheckpoints = id === "docs-tutorial-baseline-3" ? ["v2.4.0", "Release 2.4.0"] : [];
try {
  for (const block of blocks) {
    if (block.language === "ts") {
      assert.ok(block.body.includes("import { releaseLabel } from './index.ts';"), "Inspect a fragment before replaying");
      writeFileSync(join(work, filename), block.body);
      observations.push({ action: `Save ${filename}`, source: block.body });
    } else if (["sh", "bash"].includes(block.language)) {
      assert.ok(commands.includes(block.body.trim()));
      const p = Bun.spawnSync(block.body.trim().split(" "), { cwd: work });
      actual = p.stdout.toString();
      observations.push({ command: block.body.trim(), exit: p.exitCode, stdout: actual, stderr: p.stderr.toString() });
      assert.equal(p.exitCode, 0);
      if (inlineCheckpoints.length && block.body.trim() !== "bun --version") {
        const expected = inlineCheckpoints[checkpoints]!;
        assert.ok(page.includes(`see \`${expected}\``));
        assert.equal(actual, `${expected}\n`);
        checkpoints++;
      }
    } else {
      assert.equal(actual, block.body, "Actual result differs from the page's checkpoint");
      checkpoints++;
    }
  }
  assert.equal(checkpoints, 2);
  const practice = page.includes("Build 2.4.0") ? "Build" : page.includes("Preview 2.4.0") ? "Preview" : undefined;
  if (practice) {
    const script = readFileSync(join(work, filename), "utf8");
    writeFileSync(join(work, filename), script.replace("Release ", `${practice} `));
    const p = Bun.spawnSync(runCommands[0]!.split(" "), { cwd: work });
    assert.equal(p.exitCode, 0); assert.equal(p.stdout.toString(), `${practice} 2.4.0\n`);
    observations.push({ action: `Follow the page's ${practice}-prefix practice`, stdout: p.stdout.toString(), exit: p.exitCode });
  }
  mkdirSync(join(archive, "replays"), { recursive: true });
  const record = { id, status: "passed", startingContext: "Fresh four-file fixture; Bun available; terminal in fixture root; no installed dependencies or pre-created example", observations };
  writeFileSync(join(archive, "replays", `${id}.json`), JSON.stringify(record, null, 2) + "\n");
  await Bun.write(join(result, "runs", id, "replay.json"), JSON.stringify(record, null, 2) + "\n");
  console.log(`${id}: passed; ${checkpoints} checkpoints`);
} finally { rmSync(work, { recursive: true, force: true }); }
