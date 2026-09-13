# Reader starting points and outcomes

**The change clarifies the instructions; this comparison did not demonstrate
better reader outcomes.** Both arms produced usable how-to pages and
source-grounded explanations in all three repeats. Rendered-review completion
remained inconsistent in both arms.

## What changed

The existing first step now defines the intended reader, starting context,
question or task, and success condition before drafting. Evidence gathering
checks prerequisites against sources. Final verification replays procedures
from the stated start and checks conceptual claims against the promised
distinction. Drafting notes need no separate file or visible contract template.

The skill and style guide now allow brief, source-backed rationale needed to
choose or perform a how-to step. The how-to template permits demonstrably
required runtime and configuration prerequisites and pairs verification actions
with observable outcomes.

## Frozen comparison

- Baseline: `640ac4aa`; candidate: the exact three skill-file hashes in
  [freeze.json](freeze.json).
- Model: `openai/gpt-6-astra#medium`, build agent, for all twelve sessions.
- Two cases, three repeats per arm, at most three concurrent. No discarded
  sessions, infrastructure retries, semantic resampling, or follow-up batch.
- Each session used a fresh sibling clone with repository files, history,
  evaluation cases, and reviewer material removed. Only its source packet and
  local skill remained. API creation specified its directory explicitly.
- Direct, complete local skill/reference reads matched the frozen contents in
  12/12 sessions. No session invoked an installed skill. All immutable inputs
  remained unchanged. Owned evaluation clones were archived, then removed.

The [plan](PLAN.md), prompts, source contents, and criteria were frozen before
dispatch. The [source grounds](SOURCE-GROUNDS.md) explain the independent
judgments. The procedural fixture's meaningful failure/success probe ran before
the model sessions. No grader model was used.

## Results

| Check | Baseline | Candidate |
| --- | --- | --- |
| How-to: required starting context and prerequisites | 3/3 | 3/3 |
| How-to: saved-result check and task-critical rationale | 3/3 | 3/3 |
| How-to: independent fresh-copy replay, no missing steps | 3/3 | 3/3 |
| How-to: actual author recipe execution and saved-content check | 3/3 | 3/3 |
| Explanation: intended distinction, source accuracy, no forced setup | 3/3 | 3/3 |
| Author rendered review, how-to | 0/3 | 0/3 |
| Author rendered review, explanation | 1/3 | 1/3 |

All twelve authors checked navigation. Ten handed off drafts with rendered
inspection untested. Two concept runs discovered Glow and completed that check.
The other runs' unavailable-viewer claims were too broad: the same environment
had Glow. This is a verification-discovery limitation, not evidence of uplift.
The owner independently checked the saved artifacts, replayed all six recipes,
and inspected all pages and README entry points rendered with Glow. These
additional checks do not change the model scores. The terminal view wraps long
local links and joins two adjacent paragraphs in baseline how-to runs 1 and 2;
the commands and expected outcomes remain readable. No docs-site browser check
was applicable.

| Case/run | Baseline page | Candidate page | Author render status (base/candidate) |
| --- | --- | --- | --- |
| Release card 1 | [Page](runs/docs-reader-start-baseline-1/guide.md) | [Page](runs/docs-reader-start-candidate-1/guide.md) | Untested / untested |
| Release card 2 | [Page](runs/docs-reader-start-baseline-2/guide.md) | [Page](runs/docs-reader-start-candidate-2/guide.md) | Untested / untested |
| Release card 3 | [Page](runs/docs-reader-start-baseline-3/guide.md) | [Page](runs/docs-reader-start-candidate-3/guide.md) | Untested / untested |
| Incident history 1 | [Page](runs/docs-concept-baseline-1/explanation.md) | [Page](runs/docs-concept-candidate-1/explanation.md) | Untested / untested |
| Incident history 2 | [Page](runs/docs-concept-baseline-2/explanation.md) | [Page](runs/docs-concept-candidate-2/explanation.md) | Passed / untested |
| Incident history 3 | [Page](runs/docs-concept-baseline-3/explanation.md) | [Page](runs/docs-concept-candidate-3/explanation.md) | Untested / passed |

Each run directory contains `evidence.json` with criterion statuses, author
command evidence, final handoff, and independent replay observations.
[executions.json](executions.json) records session IDs and isolation checks.
Generated pages are retained unchanged, including their local README entry
points and decision-record links. Public evidence excludes hidden reasoning.

## Scope and evidence storage

This is an offline writing-and-verification comparison with explicit skill
invocation. Automatic routing, live external APIs, and tutorial/reference-specific
outputs remain unrun. The older `docs-local-api` case was not rerun; the new
fixture adds the starting-directory, missing-config, and dry-run facts needed
for this comparison. The explanation reuses `docs-concept` evidence unchanged.

The small, explicit source contract creates a ceiling effect: baseline pages
already include the targeted requirements. Adoption resolves instruction
contradictions and states the intended process; it is not a measured reliability
improvement. No model stage or release version was added.

Raw exports, visible text/tool transcripts, exact skill snapshots, frozen
fixtures, deterministic probe output, replay logs, and rendered outputs are
archived at:

`/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/docs-reader-evidence-20260913`

Ignored `.evals/docs-reader/` also retains the raw session exports and workspaces.
`probe.ts`, `run.ts`, `inspect.ts`, `replay.ts`, and `review.ts` record the protocol.
The dispatcher is a top-level command script; importing it is not a safe way to
reuse helpers. The frozen study is complete; do not rerun its dispatch command.

## Repository verification

- Root and nested walkthrough-script `bun install --frozen-lockfile`: passed.
- `bun run check`: passed type-check, lint, all 40 tests, and catalog/link/plugin validation.
- Explicit strict TypeScript check for all five new evaluation scripts and
  `evals/fixtures/docs-reader/card.ts`: passed. These paths are outside the root
  TypeScript configuration.
- The deterministic fixture probe passed before dispatch. No prose-mirroring
  tests were added.
