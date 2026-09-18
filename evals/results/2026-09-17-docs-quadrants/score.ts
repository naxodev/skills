import { strict as assert } from "node:assert";
import { join } from "node:path";

const result = join(process.cwd(), "evals/results/2026-09-17-docs-quadrants");
const archive = "/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/docs-quadrants-evidence-20260917";
interface Trial { id: string; case: string; arm: string; output: string }
interface Execution { id: string; status: string; changedInputs: string[]; readmePreserved: boolean; sessionID: string }
interface Result { id: string; arm: string; case: string; sessionID: string; readerOutcome: string; independentReplay: string; fullWorkflow: string; criteria: { id: string; status: string; evidence: string; reason?: string }[]; qualifications: string[] }
const { trials } = await Bun.file(join(result, "freeze.json")).json() as { trials: Trial[] };
const executions = await Bun.file(join(result, "executions.json")).json() as Execution[];
// These assessments record the review of the complete pages and visible transcripts.
// The script checks evidence availability; it does not grade prose by matching words.
const notes: Record<string, string> = {
  "docs-tutorial-baseline-1": "Page lines 9–17 establish the start; lines 19–73 teach default then custom prefix. Visible transcript lines 117–121 record both checkpoints and the Build exercise; lines 123–197 contain rendered output.",
  "docs-tutorial-baseline-2": "Page lines 9–14 establish the start; lines 44–45 and 78–79 explain the two observations. Transcript lines 123–126 record both checkpoints and Build practice; lines 129–227 contain page and README rendering.",
  "docs-tutorial-baseline-3": "Page lines 9–11 establish the start; lines 33 and 57 give observable labels and explain the changed input. Transcript lines 118–121 record both labels and Preview practice; lines 123–188 contain rendered output.",
  "docs-tutorial-candidate-1": "Page lines 7–17 establish the start; lines 45 and 73 explain observations. Transcript lines 124–128 record clean-copy checkpoints/navigation; lines 130–220 contain page and README rendering.",
  "docs-tutorial-candidate-2": "Page lines 8–22 establish the start; lines 51 and 80 explain the default and custom prefix. Transcript lines 117–192 contain rendered output; lines 204–209 record ordered clean-copy execution and navigation.",
  "docs-tutorial-candidate-3": "Page lines 8–22 establish the start, including an unused filename; lines 53–54 and 84–85 explain observations. Transcript lines 117–120 record clean-copy checkpoints; lines 132–210 contain rendered output.",
  "docs-reference-baseline-1": "Page lines 14–43 provide scoped signature, exact defaults, empty prefix, trim and unconditional blank-version error. Transcript lines 153–154 record successful contract probes after two failed commands; lines 166–233 contain rendering. Author probes ran in the drafting workspace, not a clean secondary copy.",
  "docs-reference-baseline-2": "Page lines 25–51 give exact defaults, empty prefix, null/runtime distinction and the blank-version invariant. Transcript line 207 records 9 output cases, 4 errors and clean-copy snippets; lines 128–195 contain rendering.",
  "docs-reference-baseline-3": "Page lines 25–43 give defaults, empty prefix, trim, null/runtime distinction and unconditional blank-version error. Transcript line 116 records contract/snippet checks; lines 128–205 contain rendering. Author snippets ran with cwd: process.cwd(), not a clean secondary copy.",
  "docs-reference-candidate-1": "Page lines 15–38 give exact types/defaults, empty prefix, effects, error ordering and runtime/type distinction. Transcript lines 117–195 contain rendering; lines 207–210 record clean-copy example and source probes.",
  "docs-reference-candidate-2": "Page lines 19–47 document exact contract and error ordering; lines 51–71 explicitly scope lookup expressions. Transcript line 156 records all ten table calls after fixing a probe parser; lines 178–259 contain rendering. No runnable recipe is promised.",
  "docs-reference-candidate-3": "Page lines 15–31 give exact defaults, empty prefix, effects, type/runtime distinction and error ordering. Transcript lines 116–118 record clean-copy output and source probes; lines 120–187 contain rendering.",
};
const results: Result[] = [];
for (const t of trials) {
  const e = executions.find(e => e.id === t.id)!;
  assert.equal(e.status, "completed"); assert.deepEqual(e.changedInputs, []); assert.equal(e.readmePreserved, true);
  const replay = await Bun.file(join(result, "runs", t.id, "replay.json")).json() as { status: string };
  assert.equal(replay.status, "passed"); assert.ok(notes[t.id]);
  const gap = ["docs-reference-baseline-1", "docs-reference-baseline-3"].includes(t.id);
  const criteria = t.case === "docs-tutorial" ? ["learning", "replay", "grounding", "verification"] : ["lookup", "contract", "grounding", "verification"];
  results.push({
    id: t.id, arm: t.arm, case: t.case, sessionID: e.sessionID,
    readerOutcome: "passed", independentReplay: "passed", fullWorkflow: gap ? "failed" : "passed",
    criteria: criteria.map(id => ({ id, status: id === "verification" && gap ? "failed" : "passed", evidence: `${notes[t.id]} See runs/${t.id}/${t.output}, replay.json, and archived runs/${t.id}/transcript.md.`, ...(id === "verification" && gap ? { reason: "Step 5 requires runnable snippets in a clean copy. The author used its drafting workspace. The independent reviewer's later fresh-copy pass does not repair author workflow compliance." } : {}) })),
    qualifications: t.id === "docs-reference-baseline-1" ? ["Two author verification commands failed before a successful corrected probe."] : t.id === "docs-reference-candidate-2" ? ["An initial lookup-table parser failed and was corrected. Ad hoc Markdown lint first failed line lengths, then passed with MD013 excluded and non-table lengths checked separately; no project lint configuration existed."] : [],
  });
}
const summary = ["docs-tutorial", "docs-reference"].flatMap(c => ["baseline", "candidate"].map(arm => {
  const matching = results.filter(r => r.case === c && r.arm === arm);
  return { case: c, arm, attempts: matching.length, readerPasses: matching.filter(r => r.readerOutcome === "passed").length, fullWorkflowPasses: matching.filter(r => r.fullWorkflow === "passed").length, criteria: Object.fromEntries(matching[0]!.criteria.map(criterion => [criterion.id, matching.filter(r => r.criteria.find(x => x.id === criterion.id)!.status === "passed").length])) };
}));
const report = { method: "Manual source/page/visible-transcript review; independent fresh-copy replays; conservative clean-copy workflow adjudication", summary, results };
await Bun.write(join(result, "scores.json"), JSON.stringify(report, null, 2) + "\n");
await Bun.write(join(archive, "scores.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(summary, null, 2));
