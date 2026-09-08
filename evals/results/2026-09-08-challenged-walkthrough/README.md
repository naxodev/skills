# Counterexamples and reader-facing prose

**Decision: adopt the focused reader-facing style rules. Keep the counterexample workflow experimental.**

The revised writer prompt improved the reader-facing score from 1/6 to 6/6 on the two evaluated cases.
A writer-only comparison then reused the previous verification inputs unchanged and also scored 6/6.
That supports the focused change to the skill's style guide; it does not establish factual correctness of the resulting prose.

## Changes under test

The earlier three-stage protocol is V1. The [challenged protocol](../../protocols/challenged-walkthrough.json) is V2.
V2 keeps the extractor prompt unchanged and adds:

- A verifier-written, executed counterexample program with recorded assumptions and observations.
- An independent replay of that program before admitting the writer.
- Instructions to challenge guarantees and carry the resulting qualifications into approved facts.
- A writer pass that translates evidence into developer-facing prose and removes internal review material.

The protocol text was frozen before the new fixture was run. It was not tuned after inspecting those outputs.
The [protocol guide](../../protocols/CHALLENGED-WALKTHROUGH.md) describes execution and recovery.

## Cases and scoring

- `pr-grounding-quality` reuses the credential-refresh fixture but adds explicit guarantee and reader-facing criteria. The older `pr-grounding` case remains unchanged.
- `pr-lock-cleanup` is the new control-flow fixture. Acquisition precedes `try/finally`; task rejection now triggers a release attempt, but release rejection can replace the task error.
- Three model trials per case and protocol, with `xai/grok-4.3#high` for generation.
- Fresh sibling clones and distinct extractor, verifier, and writer sessions. Rubrics and reference outputs were withheld.
- Independent, read-only scoring sessions inspected the complete saved manifests and HTML, including titles and recaps.
- Reviewers used `openai/gpt-6-astra#medium`. The orchestration review checked their failure reasons against the saved artifacts.

See [runs.json](runs.json) for per-trial judgments, quotations, source and protocol hashes, session identities, gate outcomes, and timing.
The criteria are defined in [cases.json](../../cases.json). Reader-facing quality is scored separately from factual correctness.

Independent review records: [credential outputs](credentials-review.md), [lock-cleanup outputs](lock-cleanup-review.md), and [writer-only outputs](writer-ablation-review.md).

## Main comparison

| Check | V1 | V2 |
| --- | --- | --- |
| First-pass handoff completion | 5/6 | 4/6 |
| Completion after bounded quotation repair | 6/6 | 6/6 |
| Source-conflict/evidence criterion | 2/6 | 2/6 |
| Complete guarantee criterion | 0/6 | 2/6 |
| Reader-facing prose | 1/6 | 6/6 |
| All case criteria | 0/6 | 1/6 |

The guarantee score requires the entire explanation to preserve the relevant limits. A correct body paragraph does not cancel a contradictory title or recap.
All six V2 verifiers executed probes, and all six saved results matched an independent local replay.
Execution evidence alone did not make their conclusions or the final prose correct.

### The probes found real counterexamples

The lock probes exercised acquisition failure, task failure, and release failure.
They demonstrated that acquisition rejection bypasses `finally`, and that a release rejection after a task rejection becomes the propagated error.
The credential probes demonstrated that refreshing before dispatch does not make every request succeed.

These are modeled witnesses under recorded assumptions, not production tests or exhaustive proofs.

### Qualifiers still disappeared or contradicted one another

One revised credential walkthrough claimed:

> The new ordering performs one more Date.now() read on every call that reaches the function, even when credentials are still valid.

The diff relocates the existing check. A probe focused on request success did not prevent this separate false count claim.

A revised lock walkthrough correctly explained the combined rejection path, then summarized:

> Acquisition failures and release rejections keep their prior semantics.

That summary is false for task rejection followed by release rejection: the old code propagates the task error, while the new code reaches release and propagates its rejection.
Another output made the same overstatement in its subtitle.

The lock outputs also failed to consistently distinguish a release invocation from successful cleanup. Observing `releaseCalled` does not establish that the lock was released.

## Isolating the writer change

The main comparison changed both verifier and writer behavior. To isolate the writer contribution, six additional fresh writer sessions used the V2 writer prompt with the exact V1 source and verification files.
Input hashes were checked against the V1 writers' inputs.

| Reader-facing check | Original V1 writers | V2 writer with unchanged V1 inputs |
| --- | --- | --- |
| Credential case | 1/3 | 3/3 |
| Lock case | 0/3 | 3/3 |
| Total | 1/6 | 6/6 |

The independent reader-facing review accepted natural source attribution and labeled modeled evidence. It rejected internal fact IDs, approval labels, reviewer directions, and accounts of the drafting process.
The writer-only outputs still inherited factual defects from the older verification artifacts. Other case criteria were not rescored in this isolation check.

The active skill now incorporates the focused reader-facing and natural-attribution rules in `STYLE.md`, with a completion check in `SKILL.md`.
The exact integrated wording was not rerun through a new model batch; the evidence supports the corresponding writer instructions tested here.

## Quotation repair and infrastructure

Three first-pass handoffs failed because a reconstructed-code quotation was not a contiguous substring of the raw diff.
One occurred in V1 verification, one in V2 extraction, and one in V2 verification.
The claims could be plausible while the citations were still invalid; the gate correctly withheld the writer.

After preserving those failures, a recovery experiment allowed one mechanical validator-feedback response per affected stage for both versions.
The feedback explained contiguous quotations and separate evidence items. It supplied neither the semantic answers nor the grading rubric.
All three repairs passed the same validator, after which the downstream stages ran.
This recovery policy was added after the first-pass failures, so the table reports first-pass and recovered completion separately.

One V2 extractor admission timed out with no assistant response and zero recorded model tokens. It was interrupted and rerun fresh without changing the protocol.
That infrastructure attempt is retained separately and excluded from the model-quality comparison.

There were 36 completed stage sessions in the main comparison and six additional writer-only sessions, plus the excluded admission.
Three completed stages also received a repair response in the same session; those were not new independent verifier sessions.

## Inspection correction

An early text-extraction helper used a broad tag-stripping regex. A literal `<=` comparison caused it to swallow text up to a later `>` and falsely suggest an unfinished paragraph.
Inspection of the actual manifest and HTML confirmed the paragraph was complete. It was not counted as an output failure.
Review saved artifacts or use an HTML-aware parser rather than treating every angle-bracket span as a tag.

## Retained evidence and next decision

Full visible transcripts, raw exports, first-pass artifacts, repair prompts, probes, replay results, verified facts, manifests, and HTML remain under the local `.evals/` paths recorded in [runs.json](runs.json).
The committed record retains the frozen protocol, new fixtures and criteria, independent scores, evidence quotations, and artifact hashes.

The next factual-control experiment should focus on the final narrative: check every guarantee in the title, body, and recap against the source and probe results.
The checker must distinguish source expression count from runtime invocation count, and operation invocation from successful completion.
Measure whether those checks prevent new assertions introduced during writing; more probes alone did not do that here.
