# Grader qualification passed; control acceptance remains blocked

`xai/grok-4.6#high` passed the frozen six-case screening test. It did not independently accept the three control narratives,
even after a documented control revision. The audit-effectiveness study stopped at that prerequisite.
**No Astra writer or audit ran. There is no paired effectiveness result.**

This resumes the [September 9 study](../2026-09-09-audit-stage/README.md) at revision `1c11e03c`.
That historical blocked record retains its bytes. The active skills and [final audit protocol](../../protocols/FINAL-NARRATIVE-AUDIT.md) also retain their bytes.

## What ran

| Stage | Completed / planned | Result |
| --- | --- | --- |
| Neutral Grok 4.6 availability | 1 / 1 | Exact `READY`; exported model and location match |
| Qualification examples | 6 / 6 | Six correct statuses and source-grounded rationales; no false positives |
| Initial correct-control reviews | 3 / 3 | No artifact accepted; metadata evidence gap and disputed findings |
| Revised correct-control reviews | 3 / 3 | All 51 fields supported/nonfactual; completeness and prose remain disputed |
| Astra writers | 0 / 9 | Untested: control acceptance prerequisite failed |
| Paired Astra audits | 0 / 9 | Untested |
| Separate control audits | 0 / 6 | Untested |
| Masked primary artifact grades | 0 / 30 potential artifacts | Untested; no primary artifacts exist |
| Available control HTML builds | 12 / 12 | Initial/revised, correct/flawed; text-only builds passed |

Control acceptance reviews are prerequisite reviews, not the six control audits in the study denominator.
The 12 control builds do not establish factual correctness or browser rendering.

## Qualification was frozen before answers

The [amendment](AMENDMENT.md), [prompt](QUALIFICATION.md), and [executable examples and reference answers](qualification.ts)
were hashed in [freeze.json](freeze.json) before the first model response. All six local witnesses passed first.
Subjects were Promise.all rejection, shallow-copy aliasing, pagination, nullish fallback, sort mutation, and Unicode length.
Three claims were supported and three contradicted. Each model context received exactly one anonymous case, without its answer key.

The [catalog snapshot](catalog.json) confirms the fixed order: Grok 4.6 high, Grok 4.5 high, then MiMo V2.5 Free without a variant.
MiMo was enabled and listed zero prices. The first candidate passed, so later candidates were not reached or scored.
There was no threshold adjustment, prompt tuning, format repair, or semantic retry.
The [qualification assessment](qualification-assessment.json) keeps each result and its reference comparison.
Raw visible answers are linked by opaque label through [qualification-runs.json](qualification-runs.json).

The passing rationales contain unnecessary “not a universal guarantee” boilerplate.
It did not change the six claim judgments. This small screen does not establish reliable full-document grading.

## Why control acceptance failed

Initial grades rejected “Fictional source change” because fictionality was absent from the masked source packets.
That was a real packet mismatch: the withheld study documentation establishes fictionality, but the grader could not see it.
The retry grade also read a general 10/20/40 delay sequence as applying to the adjacent two-retry example.

The [investigation](CONTROL-INVESTIGATION.md) separates those issues from disputed false positives.
A [local witness](investigate.mjs) confirms 10/20 for budget two and 10/20/40 for budget three.
[Recorded results](investigation-results.jsonl) preserve the send/sleep order.

Before any writer, all controls received a supported metadata label. The retry example now states its budget explicitly.
[Revised hashes](control-revision-lock.json) were recorded before three fresh reviews with the unchanged grading request.
Each flawed counterpart still differs only at `/title`. No criterion or grader changed.

| Revised control | Field judgments | Grader omission findings | Grader prose |
| --- | --- | --- | --- |
| Retry | 17 supported/nonfactual | Wall-clock warning; explicit labeling of unchanged behavior | Uncertain |
| Transaction | 17 supported/nonfactual | Missing words “cross-call lock”, despite stated duplicate publication | Fail |
| Cache | 17 supported/nonfactual | TTL, cancellation, synchronous cache operations | Uncertain |

All six grades preserve correct attribution of the author's overclaims. All nevertheless flag some attribution or evidence wording as prose leakage.
For example, the revised transaction grade calls “The author calls payment and notification atomic” reviewer language.
The frozen criteria require meaningful author/source distinctions; that wording alone does not establish leakage.
The cache grade acknowledges that omitted TTL/cancellation may be acceptable shortening. The retry control already says “requested delays”.

These findings are not all demonstrably false. An explicit unchanged-behavior label or a less dense transaction paragraph could help readers.
Their materiality remains unresolved, so field support is not promoted into an artifact-level pass.
The [adjudicated acceptance decision](control-acceptance.json) remains separate from the original model grades.
The selected grader was frozen after screening. Replacing it after seeing control outcomes would change the selection procedure.
The run therefore stops at independent control acceptance rather than overriding it or repeatedly rewriting controls until they pass.

## Inspect the evidence

| Fixture | Initial grade | Revised grade |
| --- | --- | --- |
| Retry | [Grade](artifacts/e35fc47c-d9b7-4340-960f-4c12b305e908/initial-grade.json) | [Grade](artifacts/f298cd5a-5977-4fc3-8ec5-1ae1aa7f92db/initial-grade.json) |
| Transaction | [Grade](artifacts/9ed5f86a-1100-4d6f-a976-0e2d2b40469a/initial-grade.json) | [Grade](artifacts/33f79ff4-8f54-456a-a403-737b383d4988/initial-grade.json) |
| Cache | [Grade](artifacts/bb6f9fca-a7f1-44fe-b614-36f3e61d3a25/initial-grade.json) | [Grade](artifacts/aa1d754e-a1a2-449d-a509-c2e7fa474a08/initial-grade.json) |

Each grade directory contains its exact prompt, visible text/tool transcript, immutable inputs, field inventory, manifest, and execution record.
Transcripts retain tool inputs and outputs and exclude hidden reasoning and provider state.
[Evidence hashes](evidence-hashes.json) cover the public artifacts. Raw export hashes are in the execution records.
The [build records](builds.json) link all 12 HTML files and preserve command output and warnings.
[Input comparisons](input-comparisons.json) verify exact fixture bytes, complete pointer coverage, and verbatim field quotes for all six control grades.

All 13 sessions used fresh stripped sibling jj clones and explicit API locations. No session invoked a skill, delegated,
or read outside its supplied workspace in the recorded tools. Exported model and location identities were checked structurally.
Controls received the local style/schema alongside their source/probes; some graders read these files and some did not.
The grader saw neither the answer key nor the control identities, prior reviews, or benchmark criteria beyond the generic request.

The smoke runner initially compared JSON object strings and incorrectly flagged a property-order mismatch after a successful response.
Structural comparison fixed that host-side check; the original READY response was retained without a model rerun.
The control runner used a 600-second foreground bound; the screening runner used 300 seconds. No session reached either bound.
Session clones were removed after local exports and artifact snapshots were saved. The stable external archive was copied afterward.
The owner clone remains available for integration.

## Metrics and limits

[Usage](usage.json) records prompt-through-wait/export latency, service tokens including cache counts, and service-reported cost for all 13 sessions.
These are service-reported charges, not price-list estimates. No temperature or seed was invented.
No infrastructure exclusion, zero-token rerun, or model repair occurred.

| Stage | Median seconds | Range seconds | Service-reported cost (USD) |
| --- | --- | --- | --- |
| Availability | 5.349 | 5.349–5.349 | 0.026624 |
| Qualification | 8.787 | 7.808–16.721 | 0.178546 |
| Initial acceptance | 245.804 | 216.421–270.625 | 0.658212 |
| Revised acceptance | 275.313 | 239.634–338.463 | 0.650286 |

Total recorded service cost was USD 1.513668. These stage measurements include submission, waiting, and export, but exclude clone creation.

[Control growth](control-growth.json) records exact changed fields, UTF-8 bytes, Unicode code points, word counts, and extracted text.
HTMLRewriter parses content fields; plain fields are measured directly. No code entries exist in these controls.
The changes are pre-writer control corrections, not audit edits or paired effectiveness outcomes.
Needless audit edits, factual repair transitions, prose transitions, primary build transitions, and original/revised draft growth remain untested.

| Correct control | Changed fields | UTF-8 bytes, initial → revised | Growth | Text code points | Words |
| --- | --- | --- | --- | --- | --- |
| Retry | `/meta`, `/sections/1/content` | 1693 → 1667 | −26 (−1.54%) | 1264 → 1238 | 186 → 182 |
| Transaction | `/meta` | 1760 → 1732 | −28 (−1.59%) | 1331 → 1303 | 193 → 189 |
| Cache | `/meta` | 1850 → 1822 | −28 (−1.51%) | 1421 → 1393 | 229 → 225 |

Median control byte change was −28, ranging from −28 to −26. These corrections addressed an evidence gap and an ambiguous example.
All other fields retain their exact strings; the title-corrupted counterparts preserve the one-field defect.

The [screening runner](run.ts) and [study runner](study.ts) retain the executed API patterns.
Only screening and control acceptance paths were exercised. The main-study path is untested and gated by the failed acceptance record.
The [summary script](summarize.ts) validates identity, tool scope, title-only control differences, frozen hashes, builds, and measurements.
Its archive contains raw exports under `.evals/resumed` and a public evidence snapshot for parent integration.

## Verification

- Frozen root and nested walkthrough dependencies installed successfully.
- The original preparation script passed three probe suites and six control builds without changing historical bytes.
- Six screening witnesses and both retry-investigation witnesses passed locally.
- All 12 available original/revised control HTML builds passed.
- Explicit strict study-script type checking passed with `bun x tsc --noEmit -p evals/results/2026-09-12-audit-stage/tsconfig.json`.
- Repository `bun run check` passed: type checking, lint, 40 tests, and catalog/link/skill/plugin validation.
- Main writer/audit/grading model evaluations and browser rendering are explicitly unrun.
