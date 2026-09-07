# PR walkthrough evidence experiment

**Result: neither prompt revision improved the evidence criterion. Both revisions were reverted.**

The current skill, a claim-ledger revision, and a before/after-comparison revision each passed that criterion in **0 of 3** fresh runs.
This is a narrow result for one fixture and one model. It does not establish how other models or PRs behave.

## Method

- Case: `pr-grounding` from [cases.json](../../cases.json).
- Model: `xai/grok-4.3#high`, verified from each exported session.
- Three fresh sessions per variant, each with its own sibling Jujutsu clone.
- Same task prompt, fixture, model, and tool configuration across the comparison groups.
- Repository-installed script dependencies from the frozen lockfile; text-only output, no GitHub requests or audio synthesis.
- Explicit session locations, verified against the requested fixture workspace after execution.
- Rubrics, reviewer reports, and reference examples removed from the evaluated clones before admitting the prompt.
- Loaded skill text checked against each tested snapshot. Some sessions activated the installed skill by name; its returned text matched the tested snapshot.
- Review used the final manifests, HTML files, ledgers where present, and recorded tool results. A successful model session alone did not count as a pass.

The retained variants are [ledger.patch](ledger.patch) and [comparison.patch](comparison.patch), both relative to baseline `1d50b0fc`.
See [runs.json](runs.json) for source hashes, trial timing, tool counts, criterion results, and evidence excerpts.

## Results

| Variant | Causality | Evidence | HTML artifact | Proportion | Ledger produced | Median seconds |
| --- | --- | --- | --- | --- | --- | --- |
| Baseline | 3/3 | 0/3 | 3/3 | 0/3 | 0/3 | 100.6 |
| Claim ledger | 3/3 | 0/3 | 3/3 | 0/3 | 3/3 | 116.6 |
| Comparison plus ledger | 3/3 | 0/3 | 3/3 | 0/3 | 3/3 | 109.3 |

The proportion criterion failed because unsupported cost claims were developed and repeated in the narrative and recap.
Section count alone was not a failure: the skill's five-section small-PR arc conflicts with its mandatory closing-summary guidance.

All nine runs built HTML successfully. None recorded the four native subagent calls prescribed by the skill.
The runs therefore do not demonstrate full workflow compliance, regardless of the successful builds.
Elapsed times describe these runs only; this was not a controlled performance benchmark.

## What failed

### The author statement became a code fact

The fixture's author accepts an “extra clock read.” The diff moves an existing `Date.now()` check from after `send` to before it.
An added read on every request does not follow from that relocation. Runtime differences would require an execution-path argument.

Baseline run 2 wrote:

> An additional Date.now() call occurs on every request.

Ledger run 3 wrote:

> The net effect is one extra Date.now() read on every request in exchange for eliminating the guaranteed first-failure case.

Comparison run 3 wrote:

> The fix accepts an extra clock read on every request to prevent that initial failure.

All three variants failed to preserve the distinction between the author's claim and the code observation.

### Correct notes did not constrain the final prose

Comparison run 1 correctly marked streaming implementation and behavior unknown in its ledger.
Its final essay nevertheless asserted:

> They still refresh after dispatch and will need their own follow-up change.

The fixture contains no streaming implementation. A statement in a ledger did not prevent its contradiction in the essay.

### Producing the requested artifact was easier than meeting its purpose

Every candidate run wrote a ledger. Every comparison run reconstructed the old and new code.
Those outputs did not improve the evidence score. Checking that an artifact exists would have produced a misleading success signal.

## Excluded setup attempts

Three Copilot attempts stopped with “The requested model is not supported.” They produced no evaluated output.
An initial xAI group ran in the parent workspace because the CLI did not use the requested shell directory as its session location.
One of those runs also read its rubric. That entire group was excluded and rerun after correcting the setup.
One clone setup failed before creating a model session because the remote bookmark needed an explicit `@origin` suffix.

These attempts are not included in the nine-run comparison or its pass rates.

## Retained evidence

The committed record contains both candidate patches and per-run results with quotations from the generated artifacts.
Complete visible conversation and tool-result transcripts, raw session exports, manifests, HTML, ledgers, and scorer output remain locally under:

- `.evals/pr-grounding-baseline-isolated-wq4Q6r/run-{1,2,3}/`
- `.evals/pr-grounding-candidate-isolated-ZCcWUN/run-{1,2,3}/`
- `.evals/pr-grounding-comparison-isolated-fEl1aU/run-{1,2,3}/`

Each directory includes `transcript.md`, `report.json`, `score.txt`, `tested-skill.md`, and `work/` artifacts.
The scorer rejected all nine reports as expected because their evidence and proportion criteria failed.
Raw exports remain local; reasoning and provider-internal state are not part of this published report.

## Next experiment

Test **independent verification before synthesis** rather than adding more instructions to the same writing pass:

1. Extract a bounded set of facts from the code and author text with source locators.
2. Have a separate, tool-observed review reject unsupported facts and distinguish execution order from success guarantees.
3. Give the writer the approved facts and source material, then check whether the essay preserves those constraints.

Keep the existing fixture as a regression case and add a held-out conflict in a different domain.
Count actual review calls and compare the final prose, not only the existence of intermediate files.
The extra review stage must earn its cost before becoming part of the published skill.
