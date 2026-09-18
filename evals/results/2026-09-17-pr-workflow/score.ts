import { join } from "node:path";

// Manual source judgments for these six saved outputs, not an automatic grader.
const out = "evals/results/2026-09-17-pr-workflow";
type Criterion = { id: string; expect: string };
type Execution = {
  id: string;
  parent: { id: string; location: { directory: string } };
  children: { id: string; time: { idle: number } }[];
  dispatches: { time: { ran: number } }[];
  firstArtifactWriteTime: { created: number };
  reads: { matches: boolean }[];
  sourceDrift: string[];
  parentVisibleText: string[];
  artifact: { words: number; sections: number; identicalRebuild: boolean; sidecarExists: boolean };
};
const executions = await Bun.file(join(out, "executions.json")).json() as Execution[];
const cases = await Bun.file("evals/cases.json").json() as { id: string; criteria: Criterion[] }[];
const quotes: Record<string, Record<string, string>> = {
  "pr-grounding-quality-1": {
    causality: 'sections[1]: "The author reports that the first request after credential expiry failed"; sections[2] moves the guard before send.',
    evidence: 'sections[2]: "It demonstrates a moved clock read, not an additional one" and "That path is absent from the supplied diff".',
    guarantees: 'sections[2] scopes the count to "The supplied diff"; recap says "no tests establishing its runtime result". The before report says send implementation and failure representation are unshown. No exact per-call count or request-success promise.',
    "reader-facing": 'Title "Refresh before the request leaves" and final recap explain the ordering story. No reviewer IDs, drafting directives, or approval labels in the title, dek, footer, prose, or code.',
  },
  "pr-grounding-quality-2": {
    causality: 'sections[1]: "The author reports that the first request after credential expiry failed"; implementation makes refresh a prerequisite.',
    evidence: 'sections[2]: "the supplied diff, however, relocates the existing Date.now() call"; streaming implementation and proposed follow-up implementation remain absent.',
    guarantees: 'sections[2]: "If refresh rejects, the helper does not reach dispatch"; clock count is explicitly a diff observation, not a runtime guarantee. The before report leaves send internals unknown.',
    "reader-facing": 'Title "Refresh before the request leaves", code introductions, and final "same check" recap form one explanation without internal review material.',
  },
  "pr-grounding-quality-3": {
    causality: 'sections[1]: "The author reports that the first request after expiry failed"; sections[2] explains refresh before send.',
    evidence: 'sections[2]: "it establishes a moved read, not an increased count"; the absent streaming path does not establish a streaming fix.',
    guarantees: 'sections[1] does not assume a failed send reached the old refresh step; sections[2]: "If refresh rejects, execution does not reach the send". Title and dek are scoped by the article, not request-success promises.',
    "reader-facing": 'Title "Before the first expired request leaves" and recap "Make refresh a prerequisite" preserve the story without fact IDs, review directions, or drafting instructions.',
  },
  "pr-batch-limit-1": {
    causality: 'sections[2] follows config.ts validation → queue.ts splice prefix → worker.ts configured drain; "the tick does not loop through the remaining queue".',
    evidence: 'Default 100 and positive-integer rejection are explicit. Recap: "not bounded memory, processing time, or tenant-aware scheduling". Missing tenant key is the reason; no invented alternatives or plans.',
    proportion: 'Four explanatory beats in order, with final "One send gets a batch; the queue keeps the rest" recap. The 250/100/150 example is source-derived, not a benchmark. No optional padding.',
  },
  "pr-batch-limit-2": {
    causality: 'sections[2]: "The three modified files form the complete path from the setting to bounded removal"; the worker supplies the configured limit, leaving excess queued.',
    evidence: 'Default 100, Number conversion, integer check, and lower bound appear in prose and exact code. sections[1]: "a count limit, not a resource budget". Missing tenant key explains scope; no fabricated follow-ups.',
    proportion: 'Four distinct beats end with "Take a bounded batch and retain the rest". Configuration, prefix removal, and caller explain one behavior. No optional sections or minimum-length padding.',
  },
  "pr-batch-limit-3": {
    causality: 'sections[2]: "the three modified files carry the setting from startup validation to bounded removal and then to the outgoing send"; later drains handle the remainder.',
    evidence: 'Default 100 and invalid positive-integer cases appear beside source code. Recap: "The guarantee stops at batch size". Tenant scheduling is excluded because the queue has no tenant key; no invented plans or measured outcomes.',
    proportion: 'Four distinct sections finish with "Send a bounded batch; retain the rest". Three introduced and explained code excerpts support the single configuration-to-drain story.',
  },
};
const trials = [];
for (const x of executions) {
  const caseId = x.id.replace(/-[123]$/, "");
  const scenario = cases.find((c) => c.id === caseId);
  if (!scenario) throw new Error(caseId);
  const small = caseId === "pr-grounding-quality";
  const source = small ? "sources/pr.json" : "sources/pr-batch-limit.json";
  const criteria = scenario.criteria.map((c) => ({
    id: c.id, result: "pass" as const,
    evidence: `${source}; manifests/${x.id}.json. ${c.id === "artifact" ? "executions.json records the actual --audio build, real-path handoff, and byte-identical independent rebuild." : quotes[x.id]?.[c.id] ?? "MISSING"}`,
  }));
  if (criteria.some((c) => c.evidence.includes("MISSING"))) throw new Error(`Missing source judgment: ${x.id}`);
  const parallel = Math.max(...x.dispatches.map((d) => d.time.ran)) < Math.min(...x.children.map((c) => c.time.idle));
  const beforeWrite = Math.max(...x.children.map((c) => c.time.idle)) < x.firstArtifactWriteTime.created;
  if (x.children.length !== 4 || !parallel || !beforeWrite || x.sourceDrift.length || !x.reads.every((r) => r.matches) || !x.artifact.identicalRebuild || x.artifact.sidecarExists) throw new Error(`Review invariant: ${x.id}`);
  const routeDeviation = ["pr-grounding-quality-3", "pr-batch-limit-2"].includes(x.id);
  const explicitThroughLine = ["pr-grounding-quality-1", "pr-batch-limit-2", "pr-batch-limit-3"].includes(x.id);
  const workflow = [
    { id: "local-version", result: "pass", evidence: "Both actual local instruction reads hash-match the frozen files; no source drift." },
    { id: "local-only-route", result: routeDeviation ? "fail" : "pass", evidence: x.id === "pr-grounding-quality-3" ? "Diff-tour child loaded installed pr-walkthrough and STYLE.md. installed-skill-check.json verifies matching body/style, but the path constraint was not preserved." : x.id === "pr-batch-limit-2" ? "Parent loaded installed writing-technical-docs and its STYLE.md. Retain as an additional-instruction qualification, not a pure local-only result." : "Parent and children used local evidence; no installed skill tool call observed." },
    { id: "native-parallel-reports", result: "pass", evidence: "Four subagent calls started before the first child completed; all child completions precede manifest-write creation. Actual charters, inputs, models, and timing are retained." },
    { id: "report-shape", result: small ? "fail" : "pass", evidence: small ? x.id.endsWith("-1") ? "One genuine source hunk plus two excerpts; not 2–4 distinct hunks. Before report meets 200–400 words; other named reports returned." : x.id.endsWith("-2") ? "Diff-tour explicitly returns one tiny hunk, not the requested 2–4. Before report meets 200–400 words; other named reports returned." : "Diff-tour returns two contiguous excerpts from one hunk. This adapts rather than literally satisfies the requested hunk count. Before report meets 200–400 words." : "Before report is 200–400 words; diff-tour covers all three files in 2–4 sentences each, summaries and three verbatim hunks; limitations distinguish absent reasons; alternatives says none documented." },
    { id: "through-line-visible", result: explicitThroughLine ? "pass" : "untested", evidence: explicitThroughLine ? `Pre-write visible summary: ${x.parentVisibleText[0]}` : "A pre-write scope summary is visible, but no unambiguous private through-line sentence is preserved. Hidden reasoning was not inspected. Coherent final focus is reviewed separately." },
    { id: "arc-and-focus", result: "pass", evidence: `Four distinct explanatory sections: setting, concrete gap, implementation, final recap. ${x.artifact.words} HTMLRewriter-counted words, below ${small ? 900 : 1800}. No invented optional sections; title/dek/footer/recap/code reviewed against source.` },
    { id: "audio-noop", result: "pass", evidence: "Actual generate-audio.mjs invocation exited 0 with no-narration warning. The seeded stale sidecar is absent. The command was executed, not skipped." },
    { id: "build-and-handoff", result: "pass", evidence: "Actual build.mjs invocation includes --audio; missing sidecar gives text-only output. Independent output is byte-identical. Final path exists. No desktop open or live source fetch observed." },
    { id: "browser-and-audio-playback", result: "untested", evidence: "No browser or audio playback tool was used." },
  ];
  const report = { caseId, model: "openai/gpt-6-astra#medium", revision: "ba48b5c1", transcript: `exports/${x.parent.id}.visible.json`, criteria };
  await Bun.write(join(".evals/pr-workflow/runs", x.id, "report.json"), JSON.stringify(report, null, 2) + "\n");
  trials.push({ id: x.id, caseId, criteria, workflow });
}
await Bun.write(join(out, "scores.json"), JSON.stringify({
  method: "Manual source adjudication; mechanical observations are not semantic grades. Additional installed-skill reads qualify attribution for two trials.",
  criteria: Object.fromEntries(cases.filter((c) => ["pr-grounding-quality", "pr-batch-limit"].includes(c.id)).map((c) => [c.id, c.criteria])),
  counts: { parents: { planned: 6, started: 6, completed: 6, blocked: 0, unrun: 0 }, nativeReports: { planned: 24, started: 24, completed: 24, blocked: 0, unrun: 0 }, smokeParents: 1, smokeReports: 2, retries: 0 },
  trials,
}, null, 2) + "\n");
