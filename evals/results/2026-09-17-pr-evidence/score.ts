import { join } from "node:path";

// Source judgments are written after inspecting saved public outputs, not model-graded.
const out = "evals/results/2026-09-17-pr-evidence";
type Judgment = { result: "pass" | "fail" | "untested"; evidence: string };
type Execution = {
  id: string; parent: { id: string; outcome: string; model: unknown };
  children: { id: string; outcome: string; model: unknown; time: { idle: number } }[];
  dispatches: { time: { ran: number; completed: number }; metadata: { sessionID: string } }[]; firstArtifactWriteTime: { created: number };
  errors: unknown[];
  reads: { matches: boolean }[]; sourceDrift: string[]; parentReadPaths: string[];
  otherTools: { name: string }[]; parentVisibleText: string[];
  shellCalls: { input: { command: string }; output: string }[];
  artifact: { words: number; sections: number; codeBlocks: number; identicalRebuild: boolean; sidecarExists: boolean; handoffExists: boolean; codeSources: { contiguousAfterState: boolean }[] };
};
type Report = { identity: { id: string }; charter: string[]; reads: { path: string; matchesFrozen: boolean; matchesFixture: boolean }[]; tools: { name: string; input: unknown }[]; returnedText: string[]; diffExcerpts: { source: string; contiguousVerbatim: boolean }[] };
const executions = await Bun.file(join(out, "executions.json")).json() as Execution[];
const cases = await Bun.file("evals/cases.json").json() as { id: string; criteria: { id: string; expect: string }[] }[];
const manual = await Bun.file(join(out, "judgments.json")).json() as Record<string, { criteria: Record<string, Judgment>; reportShape: Judgment; throughLine: Judgment }>;
const freeze = await Bun.file(join(out, "trial-freeze.json")).json() as { base: string };
const trials = [];
for (const x of executions) {
  const caseId = x.id.replace(/-[123]$/, "");
  const scenario = cases.find((c) => c.id === caseId);
  const judgment = manual[x.id];
  if (!scenario || !judgment) throw new Error(`Missing manual source judgment: ${x.id}`);
  const reports = await Bun.file(join(out, "reports", `${x.id}.json`)).json() as Report[];
  const criteria = scenario.criteria.map((c) => {
    const j = judgment.criteria[c.id];
    if (!j) throw new Error(`Missing ${x.id}/${c.id}`);
    return { id: c.id, ...j };
  });
  const initialDispatches = x.dispatches.filter((d, i, all) => all.findIndex((other) => other.metadata.sessionID === d.metadata.sessionID) === i);
  const parallel = initialDispatches.length === 4 && Math.max(...initialDispatches.map((d) => d.time.ran)) < Math.min(...initialDispatches.map((d) => d.time.completed));
  const beforeWrite = Math.max(...x.children.map((c) => c.time.idle)) < x.firstArtifactWriteTime.created;
  const localOnly = !x.otherTools.some((t) => t.name === "skill") && reports.every((r) => r.tools.every((t) => t.name === "read") && r.reads.every((r) => r.matchesFrozen));
  const audio = x.shellCalls.some((c) => /generate-audio\.mjs/.test(c.input.command) && /manifest has no narration/.test(c.output));
  const build = x.shellCalls.some((c) => /build\.mjs/.test(c.input.command) && /--audio/.test(c.input.command));
  const check = x.shellCalls.some((c) => /bun run check/.test(c.input.command) && /13 pass/.test(c.output));
  const excerpts = reports.flatMap((r) => r.diffExcerpts);
  const observed = (id: string, pass: boolean, evidence: string) => ({ id, result: pass ? "pass" : "fail", evidence });
  const workflow = [
    observed("local-version", x.reads.every((r) => r.matches) && !x.sourceDrift.length, "Actual parent SKILL/STYLE reads match frozen hashes; executions.json records source drift."),
    observed("local-only-read-only-children", localOnly, "Child tools and actual reads are retained in reports; parent tool calls and read paths are retained in executions.json. Manual review also checks parent external reads."),
    observed("native-parallel-reports", x.children.length === 4 && parallel && beforeWrite, "Four native starts precede the first child completion; all four completions precede manifest-write creation."),
    { id: "report-shape", ...judgment.reportShape },
    observed("uninterrupted-delivery", x.errors.length === 0 && x.dispatches.length === 4, x.errors.length === 0 ? "Four native deliveries completed without a recorded transport error or parent completion request." : "Batch-limit run 2 had a provider.transport WebSocket inbound queue overflow after partial output. The host automatically resumed it (retry.attempt=2), and the native parent requested missing file-tour material from the same child. Retained as a protocol qualification, not a fresh trial or controller repair."),
    observed("verbatim-excerpts", excerpts.length > 0 && excerpts.length <= 4 && excerpts.every((e) => e.contiguousVerbatim), `${excerpts.length} fenced diff excerpts match contiguous source bytes after removing fence wrappers only. File context and sufficiency are manually judged under code-evidence.`),
    observed("after-state-code", x.artifact.codeBlocks > 0 && x.artifact.codeBlocks <= 4 && x.artifact.codeSources.every((c) => c.contiguousAfterState), `${x.artifact.codeBlocks} blocks match contiguous after-state source. Self-contained mechanism coverage and fragmentation are manually judged under code-evidence.`),
    { id: "through-line-visible", ...judgment.throughLine },
    observed("audio-noop", audio && !x.artifact.sidecarExists, "Actual audio command emitted the no-narration warning and removed the seeded stale sidecar."),
    observed("build-and-handoff", build && x.artifact.identicalRebuild && x.artifact.handoffExists, "Build used --audio; independent rebuild bytes match; the handed-off file existed before archival cleanup."),
    observed("fixture-check", check, "Actual fixture-specific bun run check ran type-check, lint, and all 13 builder tests. Catalog checks were excluded because their input files were withheld."),
    { id: "unexercised-branches", result: "untested", evidence: "No live GitHub, browser rendering, audio synthesis/playback, automatic routing, or content-only no-code rendering." },
  ];
  await Bun.write(join(".evals/pr-evidence/runs", x.id, "report.json"), JSON.stringify({ caseId, model: "openai/gpt-6-astra#medium", revision: freeze.base, transcript: `exports/${x.parent.id}.visible.json`, criteria }, null, 2) + "\n");
  trials.push({ id: x.id, caseId, criteria, workflow, words: x.artifact.words, codeBlocks: x.artifact.codeBlocks });
}
await Bun.write(join(out, "scores.json"), JSON.stringify({
  method: "Current-candidate conformance, manual source adjudication. Historical outputs are context, not a paired effect estimate. Mechanical source checks do not grade explanatory quality.",
  criteria: Object.fromEntries(cases.filter((c) => ["pr-grounding-quality", "pr-batch-limit"].includes(c.id)).map((c) => [c.id, c.criteria])),
  counts: { parents: { planned: 6, completed: executions.filter((x) => x.parent.outcome === "succeeded").length }, nativeReports: { planned: 24, completed: executions.flatMap((x) => x.children).filter((x) => x.outcome === "succeeded").length }, controllerModelRetries: 0, controllerExtraPrompts: 0, recordedHostRetryEvents: executions.reduce((n, x) => n + x.errors.length, 0), nativeParentFollowups: executions.reduce((n, x) => n + Math.max(0, x.dispatches.length - 4), 0) }, trials,
}, null, 2) + "\n");
