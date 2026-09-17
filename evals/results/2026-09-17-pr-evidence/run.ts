import { cpSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const owner = process.cwd();
const result = join(owner, "evals/results/2026-09-17-pr-evidence");
const privateRoot = join(owner, ".evals/pr-evidence");
const temp = "/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode";
const archive = join(temp, "pr-evidence-evidence-20260917");
const model = { providerID: "openai", id: "gpt-6-astra", variant: "medium" };
interface Info {
  id: string; parentID?: string; agent?: string; model?: typeof model; outcome?: string;
  location: { directory: string }; time: { created: number; updated: number; idle?: number };
  tokens: { input: number; output: number };
}
interface Part { type: string; text?: string; name?: string; time?: unknown; state?: unknown }
interface Export { info: Info; messages: { id: string; type: string; time: unknown; text?: string; content?: Part[] }[] }
interface Trial { id: string; case: string; clone: string; fixture: string; number: number; prompt: string }
async function command(args: string[], cwd = owner): Promise<string> {
  const p = Bun.spawn(args, { cwd, stdout: "pipe", stderr: "pipe" });
  const [stdout, stderr, exit] = await Promise.all([new Response(p.stdout).text(), new Response(p.stderr).text(), p.exited]);
  if (exit !== 0) throw new Error(`${args.join(" ")}: ${exit}\n${stderr}\n${stdout}`);
  return stdout;
}
async function api<T>(method: string, path: string, body?: unknown): Promise<T> {
  const args = ["opencode", "api", method, path];
  if (body !== undefined) args.push("--data", JSON.stringify(body));
  return JSON.parse(await command(args)) as T;
}
async function save(path: string, value: unknown): Promise<void> { await Bun.write(path, JSON.stringify(value, null, 2) + "\n"); }
async function hash(path: string): Promise<string> { return new Bun.CryptoHasher("sha256").update(await Bun.file(path).arrayBuffer()).digest("hex"); }
function walk(path: string): string[] {
  return readdirSync(path, { withFileTypes: true }).flatMap((e) => e.name === "node_modules" ? [] : e.isDirectory() ? walk(join(path, e.name)) : [join(path, e.name)]);
}
async function exportTree(id: string, dir: string): Promise<Info[]> {
  mkdirSync(dir, { recursive: true });
  const raw = JSON.parse(await command(["opencode", "session", "export", id])) as Export;
  await save(join(dir, `${id}.raw.json`), raw);
  await save(join(dir, `${id}.visible.json`), {
    info: raw.info,
    messages: raw.messages.map((m) => ({ ...m, content: (m.content ?? []).filter((p) => p.type === "text" || p.type === "tool") })),
  });
  const children = await api<{ data: Info[] }>("get", `/api/session?parentID=${id}&limit=100`);
  const infos = [raw.info];
  for (const child of children.data) infos.push(...await exportTree(child.id, dir));
  return infos;
}
async function prepare(): Promise<void> {
  const base = (await command(["jj", "log", "-r", "@", "--no-graph", "-T", "commit_id"])).trim();
  const trials: Trial[] = [];
  for (const [caseID, fixture, number] of [["pr-grounding-quality", "pr.json", 42], ["pr-batch-limit", "pr-batch-limit.json", 108]] as const) {
    for (let n = 1; n <= 3; n++) {
      const id = `${caseID}-${n}`;
      const clone = join(temp, `pr-evidence-${id}-20260917`);
      await command(["jj", "git", "clone", owner, clone]);
      await command(["jj", "new", base], clone);
      for (const name of readdirSync(clone)) {
        if (![".git", ".jj", "AGENTS.md", "package.json", "bun.lock", "tsconfig.json", "eslint.config.mjs", "skills"].includes(name)) rmSync(join(clone, name), { recursive: true, force: true });
      }
      for (const name of readdirSync(join(clone, "skills"))) if (name !== "pr-walkthrough") rmSync(join(clone, "skills", name), { recursive: true, force: true });
      const pkg = await Bun.file(join(clone, "package.json")).json() as { scripts: Record<string, string> };
      pkg.scripts = { typecheck: "tsc --noEmit", lint: "eslint .", test: "bun test skills/pr-walkthrough/scripts", check: "bun run typecheck && bun run lint && bun run test" };
      await save(join(clone, "package.json"), pkg);
      const work = join(clone, "work");
      mkdirSync(work, { recursive: true });
      cpSync(join(owner, "evals/fixtures", fixture), join(work, "pr.json"));
      await save(join(work, `pr-${number}-audio.json`), { stale: true });
      const small = number === 42 ? " I want the full walkthrough despite its small size." : "";
      const prompt = `Use the local skill at ${clone}/skills/pr-walkthrough/SKILL.md to produce a full text-only walkthrough of fixture PR #${number}.${small} Read that local skill and its linked style instructions. Use local-file instruction sources only, for you and all report agents; do not load installed skills or guides, or consult repository history. For this offline task, ${work}/pr.json replaces fetching in step 2 only; do not call GitHub or other network sources. Keep all remaining workflow stages, including its native parallel reports. Report agents are read-only and may share this evidence path; they should return reports rather than write files. Only you own this clone for writes. Use ${work}/pr-${number}-manifest.json, ${work}/pr-${number}-audio.json, and ${work}/pr-${number}-walkthrough.html instead of the skill's temporary/Desktop paths. Produce the file and return its real path. Do not open a desktop application.`;
      await Bun.write(join(work, "request.md"), prompt);
      const dir = join(privateRoot, "runs", id);
      mkdirSync(dir, { recursive: true });
      await Bun.write(join(dir, "prompt.md"), prompt);
      const rootInstall = await command(["bun", "install", "--frozen-lockfile"], clone);
      const nestedInstall = await command(["bun", "install", "--frozen-lockfile"], join(clone, "skills/pr-walkthrough/scripts"));
      await Bun.write(join(dir, "installs.log"), `${rootInstall}\n${nestedInstall}`);
      const hashes: Record<string, string> = {};
      for (const path of [...walk(join(clone, "skills/pr-walkthrough")), ...["AGENTS.md", "package.json", "bun.lock", "tsconfig.json", "eslint.config.mjs", "work/pr.json", "work/request.md"].map((p) => join(clone, p))]) hashes[path.slice(clone.length + 1)] = await hash(path);
      await save(join(dir, "inputs.json"), hashes);
      trials.push({ id, case: caseID, clone, fixture: join(work, "pr.json"), number, prompt });
    }
  }
  await save(join(privateRoot, "trials.json"), trials);
  await save(join(result, "trial-freeze.json"), {
    recordedAt: new Date().toISOString(), model, agent: "build", base,
    planHash: await hash(join(result, "PLAN.md")), runnerHash: await hash(import.meta.path),
    originalCriteriaHash: await hash(join(owner, "evals/cases.json")),
    trials: await Promise.all(trials.map(async (trial) => ({ ...trial, hashes: await Bun.file(join(privateRoot, "runs", trial.id, "inputs.json")).json() as unknown }))),
  });
}
async function runTrial(trial: Trial): Promise<void> {
  const dir = join(privateRoot, "runs", trial.id);
  const created = await api<{ data: Info }>("post", "/api/session", {
    title: `Walkthrough evidence ${trial.id}`, agent: "build", model, location: { directory: trial.clone },
    permissions: [{ action: "*", resource: "*", effect: "allow" }],
  });
  const id = created.data.id;
  await save(join(dir, "create.json"), created);
  if (created.data.agent !== "build" || created.data.location.directory !== trial.clone) throw new Error("Identity mismatch");
  await save(join(dir, "prompt-response.json"), await api("post", `/api/session/${id}/prompt`, { text: trial.prompt }));
  console.log(`Started ${trial.id}: ${id}`);
  const deadline = Date.now() + 15 * 60_000;
  let stable = 0;
  let previousIdle: number | undefined;
  const observations: unknown[] = [];
  for (;;) {
    await Bun.sleep(10_000);
    const parent = (await api<{ data: Info }>("get", `/api/session/${id}`)).data;
    const children = (await api<{ data: Info[] }>("get", `/api/session?parentID=${id}&limit=100`)).data;
    observations.push({ at: Date.now(), parent, children });
    await save(join(dir, "observations.json"), observations);
    const idle = parent.outcome !== undefined && children.every((child) => child.outcome !== undefined);
    stable = idle && parent.time.idle === previousIdle ? stable + 1 : 0;
    previousIdle = parent.time.idle;
    if (idle && stable >= 2) break;
    if (Date.now() >= deadline) {
      await save(join(dir, "timeout.json"), { id, at: Date.now(), parent, children });
      await exportTree(id, join(dir, "timeout-snapshot"));
      for (const session of [parent, ...children]) if (session.outcome === undefined) {
        await save(join(dir, `interrupt-${session.id}.json`), await api("post", `/api/session/${session.id}/interrupt`, {}));
      }
      break;
    }
  }
  await save(join(dir, "identities.json"), await exportTree(id, join(dir, "exports")));
  cpSync(join(trial.clone, "work"), join(dir, "artifacts"), { recursive: true });
  await Bun.write(join(dir, "owner-diff.txt"), await command(["jj", "diff", "--stat"], trial.clone));
  cpSync(dir, join(archive, "runs", trial.id), { recursive: true });
  console.log(`Completed ${trial.id}`);
}
if (process.argv[2] === "prepare") await prepare();
else if (process.argv[2] === "run") {
  const trials = await Bun.file(join(privateRoot, "trials.json")).json() as Trial[];
  for (let i = 0; i < trials.length; i += 2) await Promise.all(trials.slice(i, i + 2).map(async (trial) => {
    try { await runTrial(trial); } catch (error) {
      await save(join(privateRoot, "runs", trial.id, "controller-error.json"), { error: String(error), at: new Date().toISOString() });
      console.error(trial.id, error);
    }
  }));
} else throw new Error("Use prepare or run");
