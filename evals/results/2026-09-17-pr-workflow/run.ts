import { cpSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

// The controller creates only walkthrough parents. Reports use their native tools.
const owner = process.cwd();
const result = join(owner, "evals/results/2026-09-17-pr-workflow");
const privateRoot = join(owner, ".evals/pr-workflow");
const temp = "/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode";
const archive = join(temp, "pr-workflow-evidence-20260917");
const model = { providerID: "openai", id: "gpt-6-astra", variant: "medium" };

interface Info {
  id: string;
  parentID?: string;
  agent?: string;
  model?: typeof model;
  outcome?: string;
  location: { directory: string };
  time: { created: number; updated: number; idle?: number };
  tokens: { input: number; output: number };
}
interface Part {
  type: string;
  text?: string;
  name?: string;
  time?: Record<string, number>;
  state?: { status: string; input?: unknown; content?: unknown; metadata?: unknown };
}
interface Export {
  info: Info;
  messages: Array<{ id: string; type: string; time: unknown; text?: string; content?: Part[] }>;
}
interface Trial {
  id: string;
  case: string;
  clone: string;
  fixture: string;
  number: number;
  prompt: string;
}

async function command(args: string[], cwd = owner): Promise<string> {
  const p = Bun.spawn(args, { cwd, stdout: "pipe", stderr: "pipe" });
  const [stdout, stderr, exit] = await Promise.all([
    new Response(p.stdout).text(), new Response(p.stderr).text(), p.exited,
  ]);
  if (exit !== 0) throw new Error(`${args.join(" ")}: ${exit}\n${stderr}\n${stdout}`);
  return stdout;
}
async function api<T>(method: string, path: string, body?: unknown): Promise<T> {
  const args = ["opencode", "api", method, path];
  if (body !== undefined) args.push("--data", JSON.stringify(body));
  return JSON.parse(await command(args)) as T;
}
async function save(path: string, value: unknown): Promise<void> {
  await Bun.write(path, JSON.stringify(value, null, 2) + "\n");
}
async function hash(path: string): Promise<string> {
  return new Bun.CryptoHasher("sha256").update(await Bun.file(path).arrayBuffer()).digest("hex");
}
function walk(path: string): string[] {
  return readdirSync(path, { withFileTypes: true }).flatMap((e) =>
    e.name === "node_modules" ? [] : e.isDirectory() ? walk(join(path, e.name)) : [join(path, e.name)]);
}
function visible(raw: Export): unknown {
  return {
    info: raw.info,
    messages: raw.messages.map((m) => ({
      id: m.id, type: m.type, time: m.time,
      ...(m.text === undefined ? {} : { text: m.text }),
      content: (m.content ?? []).filter((p) => p.type === "text" || p.type === "tool").map((p) =>
        p.type === "text" ? { type: p.type, text: p.text } : {
          type: p.type, name: p.name, time: p.time, state: p.state,
        }),
    })),
  };
}
async function exportTree(id: string, dir: string): Promise<Info[]> {
  mkdirSync(dir, { recursive: true });
  const raw = JSON.parse(await command(["opencode", "session", "export", id])) as Export;
  await save(join(dir, `${id}.raw.json`), raw);
  await save(join(dir, `${id}.visible.json`), visible(raw));
  const children = await api<{ data: Info[] }>("get", `/api/session?parentID=${id}&limit=100`);
  const infos = [raw.info];
  for (const child of children.data) infos.push(...await exportTree(child.id, dir));
  return infos;
}

async function prepare(): Promise<void> {
  const trials: Trial[] = [];
  for (const [caseID, fixture, number] of [
    ["pr-grounding-quality", "pr.json", 42], ["pr-batch-limit", "pr-batch-limit.json", 108],
  ] as const) {
    for (let n = 1; n <= 3; n++) {
      const id = `${caseID}-${n}`;
      const clone = join(temp, `pr-workflow-${id}-20260917`);
      await command(["jj", "git", "clone", owner, clone]);
      await command(["jj", "new", "ba48b5c1"], clone);
      for (const name of readdirSync(clone)) {
        if (![".git", ".jj", "AGENTS.md", "package.json", "bun.lock", "skills"].includes(name)) {
          rmSync(join(clone, name), { recursive: true, force: true });
        }
      }
      for (const name of readdirSync(join(clone, "skills"))) {
        if (name !== "pr-walkthrough") rmSync(join(clone, "skills", name), { recursive: true, force: true });
      }
      const work = join(clone, "work");
      mkdirSync(work, { recursive: true });
      cpSync(join(owner, "evals/fixtures", fixture), join(work, "pr.json"));
      // This stale fixture checks the current text-only audio step's cleanup.
      await save(join(work, `pr-${number}-audio.json`), { stale: true });
      const small = number === 42 ? " I want the full walkthrough despite its small size." : "";
      const prompt = `Use the local skill at ${clone}/skills/pr-walkthrough/SKILL.md to produce a full text-only walkthrough of fixture PR #${number}.${small} Read that local skill and its linked style instructions. For this offline task, ${work}/pr.json replaces fetching in step 2 only; do not call GitHub or other network sources. Keep all remaining workflow stages, including its native parallel reports. Report agents are read-only and may share this evidence path; they should return reports rather than write files. Only you own this clone for writes. Use ${work}/pr-${number}-manifest.json, ${work}/pr-${number}-audio.json, and ${work}/pr-${number}-walkthrough.html instead of the skill's temporary/Desktop paths. Produce the file and return its real path. Do not open a desktop application.`;
      await Bun.write(join(work, "request.md"), prompt);
      const dir = join(privateRoot, "runs", id);
      mkdirSync(dir, { recursive: true });
      await Bun.write(join(dir, "prompt.md"), prompt);
      const rootInstall = await command(["bun", "install", "--frozen-lockfile"], clone);
      const nestedInstall = await command(["bun", "install", "--frozen-lockfile"], join(clone, "skills/pr-walkthrough/scripts"));
      await Bun.write(join(dir, "installs.log"), `${rootInstall}\n${nestedInstall}`);
      const hashes: Record<string, string> = {};
      for (const path of [...walk(join(clone, "skills/pr-walkthrough")), join(clone, "bun.lock"), join(work, "pr.json"), join(work, "request.md")]) {
        hashes[path.slice(clone.length + 1)] = await hash(path);
      }
      await save(join(dir, "inputs.json"), hashes);
      trials.push({ id, case: caseID, clone, fixture: join(work, "pr.json"), number, prompt });
    }
  }
  await save(join(privateRoot, "trials.json"), trials);
  await save(join(result, "trial-freeze.json"), {
    recordedAt: new Date().toISOString(), model, agent: "build", base: "ba48b5c1",
    amendmentHash: await hash(join(result, "AMENDMENT.md")),
    runnerHash: await hash(resolve(import.meta.path)),
    trials: await Promise.all(trials.map(async (trial) => ({
      ...trial, hashes: await Bun.file(join(privateRoot, "runs", trial.id, "inputs.json")).json() as unknown,
    }))),
  });
}

async function runTrial(trial: Trial): Promise<void> {
  const dir = join(privateRoot, "runs", trial.id);
  const created = await api<{ data: Info }>("post", "/api/session", {
    title: `Walkthrough workflow ${trial.id}`, agent: "build", model,
    location: { directory: trial.clone },
    permissions: [{ action: "*", resource: "*", effect: "allow" }],
  });
  const id = created.data.id;
  await save(join(dir, "create.json"), created);
  if (created.data.agent !== "build" || created.data.location.directory !== trial.clone) throw new Error("Identity mismatch");
  await save(join(dir, "prompt-response.json"), await api("post", `/api/session/${id}/prompt`, { text: trial.prompt }));
  console.log(`Started ${trial.id}: ${id}`);
  const started = Date.now();
  let deadline = started + 15 * 60_000;
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
      await exportTree(id, join(dir, "timeout-snapshot"));
      if (parent.tokens.output > 0 && !idle && Date.now() - started < 45 * 60_000) {
        observations.push({ extensionAt: Date.now(), reason: "Parent or native children remain active", minutes: 15 });
        deadline += 15 * 60_000;
        await save(join(dir, "observations.json"), observations);
      } else throw new Error(`Bounded wait reached for ${id}; preserve live clone and inspect before any retry`);
    }
  }
  const infos = await exportTree(id, join(dir, "exports"));
  await save(join(dir, "identities.json"), infos);
  cpSync(join(trial.clone, "work"), join(dir, "artifacts"), { recursive: true });
  await Bun.write(join(dir, "owner-diff.txt"), await command(["jj", "diff", "--stat"], trial.clone));
  cpSync(dir, join(archive, "runs", trial.id), { recursive: true });
  console.log(`Completed ${trial.id}: ${infos.length - 1} children`);
}

const mode = process.argv[2];
if (mode === "prepare") await prepare();
else if (mode === "run") {
  const trials = await Bun.file(join(privateRoot, "trials.json")).json() as Trial[];
  for (let i = 0; i < trials.length; i += 2) await Promise.all(trials.slice(i, i + 2).map(runTrial));
} else if (mode === "smoke-export") {
  await save(join(privateRoot, "smoke", "identities.json"), await exportTree("ses_f502a4cd3ffewbYj5pAgSEzS4Z", join(privateRoot, "smoke", "exports")));
  cpSync(join(privateRoot, "smoke"), join(archive, "smoke"), { recursive: true });
} else throw new Error("Use prepare, run, or smoke-export");
