import { cpSync, mkdirSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const root = process.cwd();
const out = join(root, "evals/results/2026-09-17-pr-workflow");
const evidence = join(root, ".evals/pr-workflow");
type Tool = {
  type: string; name?: string; text?: string;
  time?: { created: number; ran?: number; completed?: number };
  state?: {
    status: string;
    input: { path?: string; command?: string; patchText?: string; prompt?: string; description?: string; agent?: string; background?: boolean };
    content?: { type: string; text?: string }[];
    metadata?: { sessionID?: string };
  };
};
type Raw = {
  info: { id: string; parentID?: string; agent: string; model: unknown; location: unknown; outcome?: string; time: { created: number; idle?: number } };
  messages: { id: string; type: string; text?: string; content?: Tool[] }[];
};
type Section = { eyebrow: string; title: string; content: string; narration?: string; code?: { source: string; file?: string; lang?: string }[]; diagrams?: string[] };
type Manifest = { title: string; dek: string; eyebrow: string; meta: string; footer: string; narrationIntro?: string; sections: Section[] };
type Trial = { id: string; clone: string; number: number; fixture: string; hashes: Record<string, string> };
const freeze = await Bun.file(join(out, "trial-freeze.json")).json() as { trials: Trial[] };
const hash = (text: string) => new Bun.CryptoHasher("sha256").update(text).digest("hex");
const toolText = (tool: Tool) => tool.state?.content?.map((p) => p.text ?? "").join("\n") ?? "";
const tools = (raw: Raw) => raw.messages.flatMap((m) => m.content ?? []).filter((p) => p.type === "tool");
const texts = (raw: Raw) => raw.messages.flatMap((m) => (m.content ?? []).filter((p) => p.type === "text").map((p) => p.text ?? ""));
async function proseText(content: string): Promise<string> {
  const chunks: string[] = [];
  await new HTMLRewriter()
    .on("body", { text(chunk) { chunks.push(chunk.text); } })
    .on("p, div, h1, h2, h3, li, tr, td, th, br", { element() { chunks.push(" "); } })
    .transform(new Response(`<body>${content}</body>`)).text();
  return chunks.join("").replace(/\{\{(?:CODE|DIAGRAM):\d+\}\}/g, "").replace(/&nbsp;|&#160;|&#xA0;/gi, " ");
}
async function save(path: string, data: unknown): Promise<void> {
  await Bun.write(path, JSON.stringify(data, null, 2) + "\n");
}
for (const dir of ["manifests", "reports", "sources"]) mkdirSync(join(out, dir), { recursive: true });
for (const fixture of ["pr.json", "pr-batch-limit.json"]) cpSync(join(root, "evals/fixtures", fixture), join(out, "sources", fixture));
const records = [];
for (const trial of freeze.trials) {
  const dir = join(evidence, "runs", trial.id);
  const exports = await Promise.all(readdirSync(join(dir, "exports")).filter((p) => p.endsWith(".raw.json"))
    .map(async (p) => await Bun.file(join(dir, "exports", p)).json() as Raw));
  const parent = exports.find((e) => !e.info.parentID);
  if (!parent) throw new Error(`No parent for ${trial.id}`);
  const children = exports.filter((e) => e.info.parentID === parent.info.id);
  const parentTools = tools(parent);
  const dispatches = parentTools.filter((t) => t.name === "subagent");
  const reads = ["SKILL.md", "STYLE.md"].map((name) => {
    const matching = parentTools.filter((t) => t.name === "read" && t.state?.input.path !== undefined && resolve(trial.clone, t.state.input.path) === join(trial.clone, "skills/pr-walkthrough", name));
    const lines = new Map<number, string>();
    for (const read of matching) for (const line of toolText(read).split("\n")) {
      const match = /^(\d+): (.*)$/.exec(line);
      if (match) lines.set(Number(match[1]), match[2] ?? "");
    }
    const recovered = [...lines.entries()].sort(([a], [b]) => a - b).map(([, text]) => text).join("\n") + "\n";
    return { file: name, actualReadSha256: hash(recovered), frozenSha256: trial.hashes[`skills/pr-walkthrough/${name}`], matches: hash(recovered) === trial.hashes[`skills/pr-walkthrough/${name}`] };
  });
  const sourceDrift: string[] = [];
  for (const [path, frozenHash] of Object.entries(trial.hashes)) {
    if (hash(await Bun.file(join(trial.clone, path)).text()) !== frozenHash) sourceDrift.push(path);
  }
  const childReports = children.map((child) => ({
    identity: child.info,
    charter: child.messages.filter((m) => m.type === "user").map((m) => m.text),
    reads: tools(child).filter((t) => t.name === "read").map((t) => {
      const recovered = toolText(t).split("\n").filter((line) => /^\d+: /.test(line)).map((line) => line.replace(/^\d+: /, "")).join("\n") + "\n";
      return { path: t.state?.input.path, time: t.time, sourceText: toolText(t), recoveredSha256: hash(recovered), matchesFixture: hash(recovered) === trial.hashes["work/pr.json"] };
    }),
    tools: tools(child).map((t) => ({ name: t.name, time: t.time, input: t.state?.input, status: t.state?.status })),
    returnedText: texts(child),
  }));
  await save(join(out, "reports", `${trial.id}.json`), childReports);
  const manifestPath = join(dir, "artifacts", `pr-${trial.number}-manifest.json`);
  let artifact: unknown = { status: "missing" };
  if (await Bun.file(manifestPath).exists()) {
    const manifestText = await Bun.file(manifestPath).text();
    const manifest = JSON.parse(manifestText) as Manifest;
    cpSync(manifestPath, join(out, "manifests", `${trial.id}.json`));
    const content = await Promise.all(manifest.sections.map((s) => proseText(s.content)));
    const prose = [manifest.title, manifest.dek, manifest.eyebrow, manifest.meta, manifest.footer,
      ...manifest.sections.flatMap((s, i) => [s.eyebrow, s.title, content[i]])].join(" ");
    const rebuilt = join(dir, "reviewer-build.html");
    const proc = Bun.spawn(["node", join(root, "skills/pr-walkthrough/scripts/build.mjs"),
      "--manifest", manifestPath, "--audio", join(dir, "reviewer-missing-audio.json"), "--output", rebuilt], { stdout: "pipe", stderr: "pipe" });
    const [stdout, stderr, exit] = await Promise.all([new Response(proc.stdout).text(), new Response(proc.stderr).text(), proc.exited]);
    await Bun.write(join(dir, "reviewer-build.log"), `${stdout}\n${stderr}\nexit=${exit}`);
    const actualHTML = join(dir, "artifacts", `pr-${trial.number}-walkthrough.html`);
    const builtHash = exit === 0 ? hash(await Bun.file(rebuilt).text()) : null;
    const actualHash = await Bun.file(actualHTML).exists() ? hash(await Bun.file(actualHTML).text()) : null;
    artifact = {
      manifestSha256: hash(manifestText), sections: manifest.sections.length,
      sectionHeadings: manifest.sections.map((s) => ({ eyebrow: s.eyebrow, title: s.title })),
      words: prose.trim().split(/\s+/).length,
      codeBlocks: manifest.sections.reduce((n, s) => n + (s.code?.length ?? 0), 0),
      narrationPresent: !!manifest.narrationIntro || manifest.sections.some((s) => s.narration !== undefined),
      sidecarExists: await Bun.file(join(dir, "artifacts", `pr-${trial.number}-audio.json`)).exists(),
      reviewerBuildExit: exit, originalHTMLSha256: actualHash, rebuiltHTMLSha256: builtHash,
      identicalRebuild: actualHash !== null && actualHash === builtHash,
    };
  }
  const firstArtifactWrite = parentTools.find((t) => ["patch", "shell"].includes(t.name ?? "") &&
    /manifest\.json/.test(JSON.stringify(t.state?.input)) && !/build\.mjs|generate-audio\.mjs/.test(JSON.stringify(t.state?.input)));
  records.push({
    id: trial.id, parent: parent.info, children: children.map((c) => c.info), reads, sourceDrift,
    dispatches: dispatches.map((t) => ({ name: t.name, time: t.time, input: t.state?.input, metadata: t.state?.metadata })),
    childCompletionTimes: children.map((c) => c.info.time.idle),
    firstArtifactWriteTime: firstArtifactWrite?.time,
    shellCalls: parentTools.filter((t) => t.name === "shell").map((t) => {
      const output = toolText(t);
      return { time: t.time, input: t.state?.input, output: output.length > 1800 ? `${output.slice(0, 250)}\n[Full output retained in visible export.]\n${output.slice(-650)}` : output, fullOutputSha256: hash(output) };
    }),
    otherTools: parentTools.filter((t) => !["read", "shell", "subagent", "patch"].includes(t.name ?? "")).map((t) => ({ name: t.name, input: t.state?.input })),
    parentVisibleText: texts(parent), artifact,
  });
}
await save(join(out, "executions.json"), records);
console.log(JSON.stringify(records.map((r) => ({ id: r.id, children: r.children.length, reads: r.reads, artifact: r.artifact })), null, 2));
