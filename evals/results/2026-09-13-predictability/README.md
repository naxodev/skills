# Bounded walkthrough predictability comparison

**Decision: adopt the grader rubric as evaluation guidance; reject the skill-editing candidate.**

All 36 planned sessions completed once: 24 Grok grades and 12 Astra revisions.
There were no exclusions, semantic retries, mechanical repair requests, or additional model batches.
The active walkthrough instructions retain their existing reader voice and workflow.

## Useful outcome

The [context-sensitive rubric](GRADER-CANDIDATE.md) reduced unnecessary material-omission findings while retaining every seeded-title detection.
Use it when evaluating walkthrough prose against source evidence. Its adoption is limited to evaluation guidance.
The grading results still need source-based adjudication: both arms demanded extra caveats from supported mechanism excerpts.

The [factual-editing candidate](CANDIDATE.md) repaired the same three titles as the baseline.
Both arms still rewrote the admitted correct retry control. One fewer changed field did not improve whole-control preservation.
The result does not meet the frozen adoption gate: preservation neither improved beyond 2/3 nor matched a perfect baseline.
No new style rule or step-4 requirement is adopted. The existing final-audit protocol remains byte-identical.

## Frozen design and source reference

[PLAN.md](PLAN.md), [freeze.json](freeze.json), and [reference.json](reference.json) were fixed before the first submission.
The historical generic request remains unchanged inside a common excerpt/file adapter.
The rubric is the only prompt difference in Part A. The exact candidate rule is the only instructional difference in Part B.
Source files, models, variants, and tool access match within each comparison.
Runs used four concurrent workers with frozen submission order; completion order varied.

| Packet | Saved input | Frozen source judgment |
| --- | --- | --- |
| a | Retry control's boundary section | Natural author/contract attribution and an existential duplicate-effect claim are supported |
| b | Transaction pair 7's mechanism section, including both adjacent rejection sentences and code | The await wording describes successful continuation in context |
| c | Retry pair 6's mechanism section, including visible elision and adjacent catch | The excerpts faithfully show the source; standalone parsing is not their contract |
| d | Retry title-corrupted control with its complete body | Exactly-once delivery is false: the duplicate witness records two effects |
| e | Transaction title-corrupted control with its complete body | Atomic commitment is false: publication can fail after payment commits |
| f | Cache title-corrupted control with its complete body | Elimination of all stale reads is false: a late old snapshot refills the cache |

Supported packets retain entire selected sections, with their original code and surrounding prose.
False-title packets retain all four control sections so body qualifications cannot silently excuse a false headline.
This deliberately selected set tests the previously disputed cases; it is not a random sample of walkthroughs.
It uses false guarantees instead of the disputed returned-error wording.

The source contracts and local probes determine truth, rather than a second grading model.
[witnesses.json](witnesses.json) records three successful probe replays matching saved results.
The [completed parent review](../2026-09-12-audit-stage/PARENT-RESULT-REVIEW.md) governs the earlier contextual and control judgments.
The six admitted controls keep that status throughout this comparison.

## A. Grader calibration — Grok 4.6, high

Each arm contains two fresh judgments of each of the six packets.
Counts below concern judgments, not the number of sentences or findings within a judgment.

| Measure | Generic baseline | With rubric |
| --- | ---: | ---: |
| Completed/planned | 12/12 | 12/12 |
| Correct factual/material defect-presence classification | 7/12 | 8/12 |
| Supported-packet false positives | 5/6 | 4/6 |
| Seeded false-title detections | 6/6 | 6/6 |
| Missed seeded titles | 0/6 | 0/6 |
| Judgments with any spurious factual/material allegation, including accepted body prose | 9/12 | 4/12 |
| Reviews without those spurious allegations | 3/12 | 8/12 |
| Repeat agreement on factual/material defect presence | 5/6 packets | 6/6 packets |
| Separate false reviewer-language leakage allegations | 9/12 | 6/12 |
| Reviews without either kind of false allegation | 1/12 | 2/12 |

The last row keeps the remaining prose-grading problem visible.
Factual/material counts separate optional register judgments, as specified in the plan.
False leakage labels are still errors against the accepted reader-facing prose; they are not evidence of factual defects.

Both arms accepted contextual await completion and visibly elided source code.
The improvement comes from fewer demands to enumerate extra mechanisms, rather than better handling of those two statements.
For example, baseline cache grades requested TTL, cancellation, and extra scheduling disclaimers despite an explicit late-snapshot explanation.
The rubric grades correctly treated those names as unnecessary to that explanation.

Both rubric repeats still called crash and duplicate-delivery details material omissions from packet b.
Both did the same for duplicate effects in packet c, reading a uniqueness implication into retry eligibility.
Those excerpts promise neither exhaustive failure coverage nor safe/unique delivery.
Several grades also mislabeled ordinary contract and modeled-example attribution as reviewer leakage.
One cache grade used one-based contract numbers in JSON-array notation; its direct probe evidence still established the title defect.

**Adopt:** the rubric lowers factual/material errors and improves repeat agreement without missing a real seed.
Its limited result supports a branch-specific evaluation reference, rather than an automatic acceptance score.
No grader tuning or further batch followed these results.

## B. Final factual editing — Astra, medium

The existing final-audit prompt and the same prompt plus the exact candidate each received all six admitted controls.
The public `prepareNarrativeAudit` and `applyNarrativeAudit` functions bound edits to source-linked text replacements.
The existing HTML builder processed every revised manifest.

| Measure | Baseline | Candidate |
| --- | ---: | ---: |
| Completed/planned | 6/6 | 6/6 |
| Semantically repaired title seeds | 3/3 | 3/3 |
| Introduced factual errors, source-reviewed | 0 | 0 |
| Correct controls preserving every field | 2/3 | 2/3 |
| Correct controls preserving exact bytes | 2/3 | 2/3 |
| Unnecessary changed fields on correct controls | 3 | 2 |
| Extra body edits on title-corrupted controls | 3 | 3 |
| Successful builds | 6/6 | 6/6 |
| Mechanical repair requests | 0 | 0 |

| Fixture | Correct control | Seed repair |
| --- | --- | --- |
| Retry | Both arms rewrote the old-loop heading and paragraph; baseline also rewrote the delay paragraph | Both changed the title to “Retry filtering does not guarantee exactly-once delivery” |
| Transaction | Both retained exact bytes | Both replaced atomic commitment with commit-before-notification ordering and a delivery gap |
| Cache | Both retained exact bytes | Both changed the title to “Post-write invalidation closes one stale-fill window” |

The new titles are supported by the duplicate-effects, external-publication, and late-snapshot contracts and witnesses.
The additional retry qualifications are source-supported, but the prior accepted control status makes them unnecessary edits.
They do not count as newly discovered defects or improved correctness.

**Reject:** one saved field is a small directional result, but neither arm preserves the retry control.
The candidate fails the whole-control preservation gate and adds no demonstrated title-repair benefit.

## Isolation, evidence, and verification

Each judgment had an opaque ID and its own fresh sibling `jj git clone`.
Every API creation included `location.directory`; exports confirm the requested model, variant, directory, and successful outcome.
Reference answers, arm labels, control status, and previous judgments stayed outside evaluated working files.
Recorded file accesses remained inside the supplied workspace. Local shell commands checked JSON, hashes, and references.
Four graders searched locally for grading text, but the stripped workspaces contained no reviewer reference material.
All 36 evaluation clones were removed after archival. The owner clone remains available for integration.

- [adjudication.json](adjudication.json): source-reviewed decisions for all 36 sessions, including rejected allegations.
- [scores.json](scores.json): machine-computed counts, individual durations, service usage, and transitions.
- [integrity.json](integrity.json): explicit identity checks, input hashes, tool summaries, field coverage, and title-only seed checks.
- `runs/<opaque-id>/initial-grade.json` or `initial-audit.json`: original model outputs.
- `runs/<opaque-id>/initial-visible.json`: visible text and tool records, excluding hidden provider reasoning.
- `runs/<opaque-id>/execution.json`: session ID, explicit directory, model, input hashes, timing, and raw-export/HTML hashes.
- `runs/<opaque-id>/revised.json`: mechanically applied output, separate from the source control.

The runner follows the existing September 12 API and isolation patterns and reuses the public audit validator and builder.
The older executable study harness has fixed paths and top-level model dispatch, so importing it would launch unrelated work.
This bounded runner records its own frozen inputs instead of changing that historical experiment.

Verified: root and nested frozen installs; `bun run check` (type-check, lint, 40 tests, and validation);
explicit strict TypeScript checking for this result directory; three probe replays; all 12 validator replays and HTML builds.
The integrity checker initially omitted `grep` from its tool allowlist; inspection confirmed four workspace-local searches, and the checker was corrected.
That local reporting error caused no new model sessions or changes to grading inputs.

**Unrun:** skill invocation, fresh-draft generation, full four-agent walkthrough workflow, narration, and browser rendering.
Component builds and control repairs do not verify these behaviors.
The selected six-packet sample is too small to establish general reliability or predict success on other models.

## Observed duration and usage

The first submission through the final export spanned **1,530.950 seconds (25.52 minutes)** with four workers.
This is the observed prompt interval, not a sum of concurrently running session durations.

| Stage and arm | Median seconds | Range seconds | Service-reported USD total |
| --- | ---: | ---: | ---: |
| Grok baseline | 213.436 | 172.091–332.282 | 2.278374 |
| Grok rubric | 210.733 | 175.595–244.503 | 2.316262 |
| Astra baseline | 64.282 | 40.151–91.674 | 0 |
| Astra candidate | 62.824 | 41.191–91.198 | 0 |

Grok's reported total is **$4.594636**. Astra exports report zero; that is a service value, not proof of free inference.
Per-session token and cache counters are retained in `scores.json` and execution records. No catalog-based price estimate is used.

## Reproduce the saved checks

Run from the repository root:

```bash
bun evals/results/2026-09-13-predictability/score.ts
bun evals/results/2026-09-13-predictability/run.ts witness
bunx tsc --noEmit -p evals/results/2026-09-13-predictability/tsconfig.json
```

`integrity.ts` additionally needs the ignored raw exports and generated HTML retained by the owner clone.
The frozen `run` mode is the historical execution entrypoint; it is not part of saved-result verification.

External archive: `/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/skill-predictability-evidence-20260913`.
It contains the public evidence, one copy of reused source/control inputs, raw exports under `.evals`, and generated HTML.
