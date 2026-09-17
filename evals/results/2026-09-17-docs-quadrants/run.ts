import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { isDeepStrictEqual } from "node:util";
import { releaseLabel } from "../../fixtures/docs-package/index.ts";

const owner = process.cwd();
const result = join(owner, "evals/results/2026-09-17-docs-quadrants");
const raw = join(owner, ".evals/docs-quadrants");
const temp = "/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode";
const archive = join(temp, "docs-quadrants-evidence-20260917");
const skill = "skills/writing-technical-docs";
const model = { providerID: "openai", id: "gpt-6-astra", variant: "medium" };
interface Info { id: string; agent: string; model: typeof model; location: { directory: string }; outcome?: string; tokens: { input: number; output: number } }
interface Part { type: string; text?: string; name?: string; state?: unknown }
interface Export { info: Info; messages: { type: string; content?: Part[]; [key: string]: unknown }[] }
interface Trial { id: string; arm: string; case: string; work: string; prompt: string; output: string; hashes: Record<string, string> }
interface Case { id: string; prompt: string }
async function command(args: string[], cwd = owner): Promise<string> {
  const p = Bun.spawn(args, { cwd, stdout: "pipe", stderr: "pipe" });
  const [stdout, stderr, exit] = await Promise.all([new Response(p.stdout).text(), new Response(p.stderr).text(), p.exited]);
  if (exit !== 0) throw new Error(`${args.join(" ")}: ${exit}\n${stdout}\n${stderr}`);
  return stdout;
}
async function api<T>(method: string, path: string, body?: unknown): Promise<T> {
  return JSON.parse(await command(["opencode", "api", method, path, ...(body === undefined ? [] : ["--data", JSON.stringify(body)])])) as T;
}
async function json(path: string, value: unknown) { await Bun.write(path, JSON.stringify(value, null, 2) + "\n"); }
async function hash(path: string) { return new Bun.CryptoHasher("sha256").update(await Bun.file(path).arrayBuffer()).digest("hex"); }
function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e => [".git", ".jj", "node_modules"].includes(e.name) ? [] : e.isDirectory() ? files(join(dir, e.name)).map(f => `${e.name}/${f}`) : [e.name]);
}
async function hashes(dir: string) { return Object.fromEntries(await Promise.all(files(dir).map(async f => [f, await hash(join(dir, f))]))); }
function snapshot(from: string, to: string) {
  mkdirSync(to, { recursive: true });
  for (const f of files(from)) {
    mkdirSync(dirname(join(to, f)), { recursive: true });
    cpSync(join(from, f), join(to, f));
  }
}
async function prepare() {
  if (existsSync(join(result, "freeze.json"))) throw new Error("Already frozen");
  mkdirSync(archive, { recursive: true });
  const observations = [
    ["default", releaseLabel("2.4.0"), "v2.4.0"],
    ["custom", releaseLabel("2.4.0", { prefix: "Release " }), "Release 2.4.0"],
    ["empty prefix", releaseLabel("2.4.0", { prefix: "" }), "2.4.0"],
    ["trimmed", releaseLabel(" \t2.4.0\n"), "v2.4.0"],
    ["undefined options", releaseLabel("2.4.0", undefined), "v2.4.0"],
    ["empty options", releaseLabel("2.4.0", {}), "v2.4.0"],
    ["undefined prefix", releaseLabel("2.4.0", { prefix: undefined }), "v2.4.0"],
    ["prefix preserved", releaseLabel("2.4.0", { prefix: " x " }), " x 2.4.0"],
    ["no semver validation", releaseLabel("label"), "vlabel"],
  ];
  for (const version of ["", " \t\n"]) for (const prefix of ["", "Release "]) {
    let actual = "did not throw";
    try { releaseLabel(version, { prefix }); } catch (error) { actual = error instanceof Error ? `${error.name}: ${error.message}` : String(error); }
    observations.push([`blank ${JSON.stringify({ version, prefix })}`, actual, "Error: version must not be blank"]);
  }
  if (observations.some(([, actual, expected]) => actual !== expected)) throw new Error("Source probe failed");
  await json(join(result, "source-probe.json"), { observations, bun: await command(["bun", "--version"]), renderer: await command(["glow", "--version"]) });
  for (const arm of ["baseline", "candidate"]) {
    mkdirSync(join(archive, arm), { recursive: true });
    for (const f of readdirSync(join(owner, skill))) await Bun.write(join(archive, arm, f), arm === "baseline" ? await command(["jj", "file", "show", "-r", "a00d2525", `${skill}/${f}`]) : await Bun.file(join(owner, skill, f)).text());
  }
  cpSync(join(owner, "evals/fixtures/docs-package"), join(archive, "fixture"), { recursive: true });
  cpSync(join(owner, "evals/cases.json"), join(archive, "cases.json"));
  cpSync(join(result, "PLAN.md"), join(archive, "PLAN.md"));
  cpSync(import.meta.path, join(archive, "run.ts"));
  const cases = await Bun.file(join(owner, "evals/cases.json")).json() as Case[];
  const trials: Trial[] = [];
  for (const caseID of ["docs-tutorial", "docs-reference"]) for (let n = 1; n <= 3; n++) for (const arm of ["baseline", "candidate"]) {
    const id = `${caseID}-${arm}-${n}`;
    const work = join(temp, `quadrants-${id}-20260917`);
    await command(["jj", "git", "clone", owner, work]);
    for (const name of readdirSync(work)) if (![".git", ".jj"].includes(name)) rmSync(join(work, name), { recursive: true, force: true });
    cpSync(join(archive, arm), join(work, skill), { recursive: true });
    cpSync(join(archive, "fixture"), work, { recursive: true });
    await Bun.write(join(work, "AGENTS.md"), "# Documentation workspace\n\nUse the supplied local documentation skill and source evidence. This workspace has Bun available, plain Markdown, no docs build, and no sidebar. Preserve source and skill files. Add the new page's link to README.md without rewriting its existing content. Use jj for version control when needed.\n");
    const prompt = `Read skills/writing-technical-docs/SKILL.md directly and follow its local reference files, not an installed skill. ${cases.find(c => c.id === caseID)!.prompt} Work offline using the supplied source files and local skill. Bun is available. You may run local fixture commands for verification, save the page, and add its README entry point. Keep source, existing README content, and skill files unchanged. Do not use live services, other skills, delegation, repository history, or files outside this workspace.`;
    snapshot(work, join(archive, "runs", id, "before"));
    trials.push({ id, arm, case: caseID, work, prompt, output: caseID === "docs-tutorial" ? "tutorial.md" : "reference.md", hashes: await hashes(work) });
  }
  await json(join(result, "freeze.json"), { frozenAt: new Date().toISOString(), baseline: "a00d2525", model, agent: "build", hashes: await hashes(archive), trials });
  cpSync(join(result, "freeze.json"), join(archive, "freeze.json"));
  cpSync(join(result, "source-probe.json"), join(archive, "source-probe.json"));
}
async function run() {
  const frozen = await Bun.file(join(result, "freeze.json")).json() as { trials: Trial[]; hashes: Record<string, string> };
  if (existsSync(join(result, "executions.json"))) throw new Error("Already started; do not resample");
  for (const [f, expected] of Object.entries(frozen.hashes)) if (await hash(join(archive, f)) !== expected) throw new Error(`Changed freeze: ${f}`);
  const executions: Record<string, unknown>[] = [];
  const save = () => json(join(result, "executions.json"), executions);
  async function trial(t: Trial) {
    const record: Record<string, unknown> = { id: t.id, status: "started" };
    executions.push(record); await save();
    const dir = join(raw, t.id); mkdirSync(dir, { recursive: true });
    let session = "";
    try {
      const created = await api<{ data: Info }>("post", "/api/session", { title: `Documentation quadrant ${t.id}`, agent: "build", model, location: { directory: t.work }, permissions: [{ action: "*", resource: "*", effect: "allow" }] });
      session = created.data.id; record.sessionID = session; await save();
      await json(join(dir, "create.json"), created);
      await Bun.write(join(dir, "prompt.md"), t.prompt);
      await api("post", `/api/session/${session}/prompt`, { text: t.prompt });
      const deadline = Date.now() + 15 * 60_000;
      for (;;) {
        await Bun.sleep(10_000);
        const info = (await api<{ data: Info }>("get", `/api/session/${session}`)).data;
        if (info.outcome !== undefined) break;
        if (Date.now() >= deadline) { await api("post", `/api/session/${session}/interrupt`, {}); record.timeout = true; break; }
      }
      const exported = JSON.parse(await command(["opencode", "session", "export", session])) as Export;
      await json(join(dir, "export.raw.json"), exported);
      await json(join(dir, "visible.json"), { info: exported.info, messages: exported.messages.filter(m => m.type !== "provider-state").map(m => ({ ...m, content: (m.content ?? []).filter(p => ["text", "tool"].includes(p.type)) })) });
      record.info = exported.info;
      if (exported.info.agent !== "build" || exported.info.location.directory !== t.work || !isDeepStrictEqual(exported.info.model, model)) throw new Error("Identity mismatch");
      record.changedInputs = [];
      for (const [f, expected] of Object.entries(t.hashes)) if (f !== "README.md" && await hash(join(t.work, f)) !== expected) (record.changedInputs as string[]).push(f);
      record.readmePreserved = (await Bun.file(join(t.work, "README.md")).text()).includes(await Bun.file(join(archive, "fixture/README.md")).text());
      record.status = exported.info.outcome === "succeeded" ? "completed" : "failed";
      const published = join(result, "runs", t.id); mkdirSync(published, { recursive: true });
      for (const f of [t.output, "README.md"]) if (existsSync(join(t.work, f))) cpSync(join(t.work, f), join(published, f));
    } catch (error) {
      record.status = "failed"; record.error = String(error);
      if (session) await api("post", `/api/session/${session}/interrupt`, {}).catch(() => undefined);
    }
    snapshot(t.work, join(dir, "after"));
    cpSync(dir, join(archive, "runs", t.id), { recursive: true });
    await save();
    rmSync(t.work, { recursive: true, force: true });
    console.log(`${t.id}: ${String(record.status)}`);
  }
  const queue = [...frozen.trials];
  await Promise.all(Array.from({ length: 3 }, async () => { while (queue.length) await trial(queue.shift()!); }));
  cpSync(join(result, "executions.json"), join(archive, "executions.json"));
}
if (process.argv[2] === "prepare") await prepare();
else if (process.argv[2] === "run") await run();
else throw new Error("Use prepare or run");
