# Tutorial and reference quadrant comparison

**Both arms met every sampled reader need. No reader-outcome uplift was measured.**
Six tutorials replayed successfully from fresh copies. Six reference pages gave
the supported API contract, and all their examples or lookup calls passed
independent replay. The candidate removes contradictory style instructions.

Two baseline reference authors omitted the skill's clean-copy execution step.
Their examples passed independent replay, but reviewer execution does not count
as author compliance. This report separates reader outcomes from full workflow.

## Method

- Baseline: documentation skill files at `a00d2525`.
- Candidate: exact three-file instruction snapshot in [freeze.json](freeze.json).
- Model: `openai/gpt-6-astra#medium`; agent: `build` for all twelve sessions.
- Three tutorial and three reference sessions per arm, at most three concurrent.
- One fresh sibling jj clone per author, with an explicit API location.
  Rubrics, evaluation history, unrelated skills, and reference outputs were absent.
- Both arms received identical prompts and the same four-file package fixture.
  The prompt supplied Bun availability and permission to add the README link.
- One frozen batch; no prompt tuning, resampling, timeout, or infrastructure retry.
  Corrections to commands within an existing session remained part of that session.
- Manual source/page/visible-transcript review, followed by independent replay.
  Signatures and explicitly scoped lookup notation were not treated as recipes.

The [plan](PLAN.md), [source grounds](SOURCE-GROUNDS.md), [pre-session probe](source-probe.json),
[identity records](executions.json), [exact local-read audit](integrity.json), and
[criterion scores](scores.json) retain the evidence and qualifications.
All twelve exported model/agent/location identities matched. All protected input
hashes matched, and each README retained its original content with an added link.
Every author read the frozen local SKILL/STYLE and all four source files.
No installed skill load, history consultation, delegation, or live API call occurred.

## Results

| Case and arm | Reader outcomes | Independent replay | Full author workflow |
| --- | --- | --- | --- |
| Tutorial baseline | 3/3 | 3/3 | 3/3 |
| Tutorial candidate | 3/3 | 3/3 | 3/3 |
| Reference baseline | 3/3 | 3/3 | 1/3 |
| Reference candidate | 3/3 | 3/3 | 3/3 |

All tutorial learning, replay, and grounding criteria passed. All reference lookup,
contract, and grounding criteria passed. Verification passed in 3/3 tutorials per
arm, 1/3 baseline references, and 3/3 candidate references under the conservative
clean-copy reading of step 5. This small secondary workflow difference does not
establish a general reliability improvement or a causal effect of scoped style.

All authors discovered Glow and received the actual rendered page output in their
tool results. Review included the rendered headings, code blocks, and reference
tables, not only exit status. All authors checked README navigation and reported
the absent docs build/sidebar accurately. Terminal review does not test browser
layout, site CSS, MDX components, or interactions.

### Qualifications and failures

- Baseline references 1 and 3 ran checks in the author workspace, without a
  separate clean copy. Baseline 1 used equivalent contract calls rather than
  replaying the published block. Both fail full author verification here.
- Baseline reference 1 recovered from a shell quotation error and a malformed
  assertion-array command before its successful checks. These were not new sessions.
- Candidate reference 2 corrected a greedy table parser after a failed check.
  Its optional Markdown lint initially failed table line lengths. It then passed
  with MD013 excluded and non-table lengths checked separately. No project lint
  configuration was changed or present. Its examples are explicitly lookup
  expressions, so no procedural clean-copy recipe was required.
- Baseline reference 1's last example deliberately throws the documented error.
  Independent replay checked that error and each preceding return value; an exit
  code of one is the expected outcome for that block, not a replay failure.

## Static changes and observed behavior

The shared style previously forced how-to voice, task titles, runnable snippets,
and a `Next steps` ending on every quadrant. It also discouraged reference type
contracts and exact error lists. The candidate defers voice to the existing
quadrant table and scopes those rules to the actual reader need. Step 3 now gives
short branch shapes; it retains the how-to template and task-critical rationale.

The baseline already produced learning sequences, observable checkpoints, lookup
tables, signatures, exact defaults, and errors. It did not demonstrate the feared
quadrant failure on this fixture. Both arms distinguished runtime nullish behavior
from the declared types wherever they discussed it. All six references accepted
an empty prefix and rejected blank versions without inventing semantic-version
validation. The candidate stated effects and error ordering more consistently,
but the baseline's contracts were already usable.

All three baseline tutorials ended with another practice exercise under `Next steps`;
the candidate tutorials ended at the completed lesson. The exercises were useful
and passed replay, so their presence is not counted as a reader failure.
Two baseline references ended with a README link; all candidate references ended
with their answer or examples. This is an observed shape difference, not a quality
score based on heading names or pronoun counts.

## Saved pages and entry points

| Run | Page | Entry point |
| --- | --- | --- |
| Tutorial baseline 1 | [Tutorial](runs/docs-tutorial-baseline-1/tutorial.md) | [README](runs/docs-tutorial-baseline-1/README.md) |
| Tutorial baseline 2 | [Tutorial](runs/docs-tutorial-baseline-2/tutorial.md) | [README](runs/docs-tutorial-baseline-2/README.md) |
| Tutorial baseline 3 | [Tutorial](runs/docs-tutorial-baseline-3/tutorial.md) | [README](runs/docs-tutorial-baseline-3/README.md) |
| Tutorial candidate 1 | [Tutorial](runs/docs-tutorial-candidate-1/tutorial.md) | [README](runs/docs-tutorial-candidate-1/README.md) |
| Tutorial candidate 2 | [Tutorial](runs/docs-tutorial-candidate-2/tutorial.md) | [README](runs/docs-tutorial-candidate-2/README.md) |
| Tutorial candidate 3 | [Tutorial](runs/docs-tutorial-candidate-3/tutorial.md) | [README](runs/docs-tutorial-candidate-3/README.md) |
| Reference baseline 1 | [Reference](runs/docs-reference-baseline-1/reference.md) | [README](runs/docs-reference-baseline-1/README.md) |
| Reference baseline 2 | [Reference](runs/docs-reference-baseline-2/reference.md) | [README](runs/docs-reference-baseline-2/README.md) |
| Reference baseline 3 | [Reference](runs/docs-reference-baseline-3/reference.md) | [README](runs/docs-reference-baseline-3/README.md) |
| Reference candidate 1 | [Reference](runs/docs-reference-candidate-1/reference.md) | [README](runs/docs-reference-candidate-1/README.md) |
| Reference candidate 2 | [Reference](runs/docs-reference-candidate-2/reference.md) | [README](runs/docs-reference-candidate-2/README.md) |
| Reference candidate 3 | [Reference](runs/docs-reference-candidate-3/reference.md) | [README](runs/docs-reference-candidate-3/README.md) |

Each run also has a `replay.json`. Baseline reference 3 includes its three linked
source files so its original links remain usable in this report.

## Archive and limits

Owner verification passed: frozen root and nested walkthrough dependency installs,
`bun run check` (type-check, lint, 40 tests, catalog/link/manifest validation), and
an explicit strict TypeScript check of the result scripts outside the root tsconfig.
The first explicit check found an untyped result array in the scoring script;
adding its result type resolved the error. No permanent prose-mirroring tests were added.

The external archive is
`/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/docs-quadrants-evidence-20260917`.
It contains before/after workspace snapshots, instruction snapshots, prompts,
raw exports, visible-only JSON and readable tool/text transcripts, and replays.
The [output hash manifest](output-hashes.json) covers the published report files.
Raw exports also remain under ignored `.evals/docs-quadrants/` in the owner.
Author clones were removed only after snapshotting; the owner clone is retained.

Automatic routing, live external APIs, browser rendering, MDX, how-to, and
explanation were not rerun. The existing `docs-local-api` case was not added to
this batch. These twelve results cover two prompts, one small local API, one
model configuration, and a terminal Markdown environment.
