# Independently verified walkthrough experiment

**Result: separate verification improved source-conflict handling on both fixtures. The protocol remains experimental.**

Six completed pipeline trials consistently resolved the central source conflict, compared with none of the six direct-writing baselines.
That narrow improvement did not eliminate factual mistakes or produce consistently good prose.

## What changed

The previous experiment added instructions inside one writing session and found no improvement.
This experiment used actual separate sessions with recorded handoffs:

1. An extractor produced bounded, source-linked candidate facts.
2. A fresh verifier checked them against the original fixture and produced approved facts with caveats and writer constraints.
3. A fresh writer received that artifact and the source, then produced a manifest and ran the existing builder.

The runner checked fact shape, unique IDs, exact source quotes, and input-fact coverage before admitting the next stage.
These gates validate the handoff format, not the truth of its claims.
The writer could not replace a missing verifier with its own internal review.

The exact prompts are preserved in the [frozen protocol](../../protocols/verified-walkthrough.json).
The active PR walkthrough skill was not changed by this experiment.

## Fixtures and method

- **Regression case:** `pr-grounding`, the credential-refresh ordering fixture used in the previous experiment.
- **Held-out case:** `pr-cache-units`, a cache constant changing from `60` seconds multiplied by `1000` to `60000` milliseconds. Its author claims a doubled lifetime and halved upstream traffic.
- Model for every stage: `xai/grok-4.3#high`.
- Three completed direct-writing trials and three completed pipeline trials per case, using fresh sessions and sibling clones.
- Explicit session locations and isolated source copies. Evaluation rubrics and reference outputs were withheld.
- The same protocol text was used for both cases. It was not revised after inspecting held-out outputs.
- Final manifests and exported tool results were reviewed independently of the generating sessions.

See [runs.json](runs.json) for per-trial criteria, supplementary findings, timing, source hashes, and stage identities.

## Results

| Case | Method | Central conflict preserved | HTML built | Separate verifier observed |
| --- | --- | --- | --- | --- |
| Credential refresh | Direct writing | 0/3 | 3/3 | 0/3 |
| Credential refresh | Three-stage pipeline | 3/3 | 3/3 | 3/3 |
| Cache units | Direct writing | 0/3 | 3/3 | 0/3 |
| Cache units | Three-stage pipeline | 3/3 | 3/3 | 3/3 |

This table reports the central conflict check, not a claim that every pipeline sentence was correct.
The frozen evidence criteria passed in all six completed pipeline trials; broader factual review still found defects described below.
Four pipeline trials passed all of their case criteria. Two failed the proportion criterion because they added unsupported assertions.
One cache baseline partially noticed the mismatch, but repeated the prior thirty-second account without consistently resolving it against the unchanged TTL. It was scored as a failure rather than credited for isolated correct sentences.
The small sample supports another experiment, not a general reliability estimate or a production release.

## What improved

### The verifier challenged the author account

In the credential case, verified facts distinguished a relocated clock check from the author's claim of an added read.
Writers preserved that distinction instead of automatically treating the author description as implementation evidence.

In the cache case, all three verifiers reconstructed the old and new argument as `60000` milliseconds.
All three writers explained that the effective lifetime was unchanged under the supplied contract and that the claimed traffic reduction had no measurements.

One held-out writer stated:

> The diff records a prior constant of 60 seconds whose multiplied value already equalled 60000 milliseconds; the new constant is also 60000 and is passed directly, so the value reaching cache.set remains identical.

### Stage execution was observable

Each completed pipeline trial had distinct extractor, verifier, and writer session IDs.
Source reads, structured artifacts, and the final build command appear in the exported tool records.
This addresses the earlier experiment's missing native-subagent calls without accepting a writer's claim that it reviewed itself.

## What still failed

### An approved fact introduced a new false guarantee

Credential pipeline run 3's verifier stated that both code versions perform exactly one clock read per request call.
The writer repeated:

> Both the before and after versions execute exactly one Date.now() read per request; the diff relocates rather than duplicates the check.

This is false when `send` rejects. A local counterexample reproduced the shown ordering with a throwing sender:

```text
before: 0 clock reads when send rejects
after: 1 clock reads when send rejects
```

The source contains one clock-call expression in each version, but expression count does not establish runtime invocation count on every path.
This supplementary defect was recorded separately from the frozen conflict criterion rather than hidden behind its passing score.

### Reviewer instructions appeared in the essay

Credential pipeline run 1 copied a writer directive into the HTML:

> The writer must preserve the distinction between the author's reported cause and the observed diff change, and must not treat the relocation as a demonstrated cost increase or performance improvement.

Five of the six pipeline outputs exposed identifiers such as `V1`, reviewer constraints, or writer directives.
The reader received parts of the drafting procedure instead of a finished explanation.

### A writer extended a correct finding into an unsupported conclusion

Cache pipeline run 1 correctly explained the unchanged TTL, then claimed that any future measurement of request reduction would require a different modification.
The fixture does not support that universal prediction: measured traffic can vary for reasons beyond this code change.
The supported conclusion is narrower: the supplied patch and evidence do not establish the claimed reduction.

## Infrastructure exclusions

Three initial pipeline attempts stopped at a verifier admission/wait timeout with no assistant response and zero recorded model tokens in that stage.
The pending sessions were interrupted. Those attempts were retained as infrastructure failures and rerun in fresh sessions without changing the prompts.
They are excluded from the completed-trial quality table; they still count as operational failures of the experimental runner.

There were 24 completed model sessions in the comparison: six direct-writing sessions and eighteen pipeline-stage sessions.
The three excluded attempts added three completed extractors and three verifier admissions that produced no response.
Timing data describes these runs only and excludes clone/dependency setup. No throughput or cost-efficiency claim is made.

## Evidence and next decision

Full visible transcripts, raw exports, input artifacts, verified facts, manifests, HTML, and scorer output remain in the local `.evals/verified-*` directories named in [runs.json](runs.json).
The committed result retains the frozen prompts, fixture, protocol hash, trial findings, stage IDs, and evidence quotations.

Keep the three-stage workflow as an evaluation protocol while addressing two separate problems:

1. **Verifier correctness:** test proposed guarantees with counterexamples before approving them. Add an unseen control-flow case to the next comparison.
2. **Writer quality:** preserve the meaning of qualifications without copying reviewer instructions or internal fact identifiers. Evaluate reader-facing prose separately from evidence compliance.

Any revised protocol should be tested on new held-out material. The cache fixture is now a regression case, not an unseen test for later revisions.
