# Final narrative audit: paired recovery study

**Result: the Astra audit proposals repaired all six saved drafts under masked review. Grok's proposals repaired none to the full rubric.**

This is a paired recovery experiment on known drafts, not a new-draft or held-out reliability estimate.
The same six original manifests, source fixtures, prior verification, and modeled probes were supplied to both audit models.
The audit prompt was held fixed. Accepted replacements were applied mechanically, followed by the existing builder; there was no additional generative rewriting stage.

## Method

- Inputs: the six revised-protocol walkthroughs from the [counterexample experiment](../2026-09-08-challenged-walkthrough/README.md).
- Auditors: `xai/grok-4.3#high` and `openai/gpt-6-astra#medium`.
- One fresh auditor session and sibling clone per draft and model.
- Inputs included the original PR JSON, the prior verification JSON, probe results, probe code, and exact final manifest.
- The [frozen prompt](../../protocols/FINAL-NARRATIVE-AUDIT.md) required coverage of every editable text field, including metadata and footer, source-linked findings, and bounded whole-field replacements.
- The controller checked input hashes, coverage, quotations or exact values, edit/finding links, and preserved code placeholders before applying replacements to a copy.
- No original input or code entry was changed.

The two model arms were run sequentially, with the Astra comparison added after observing Grok's misses. The prompt and input bytes did not change between arms.
Both arms allowed one mechanical validation-feedback repair. Grok used it twice for quotations pointed at array-valued evidence; Astra needed none.
All twelve audits eventually passed structural validation and all twelve HTML builds succeeded.

## Masked review

Reviewers received shuffled item IDs containing the six before/after pairs for each case: original, Grok-audited, and Astra-audited outputs.
They were not given the model labels, mapping key, audit findings, or historical scores.
Fresh read-only review sessions scored all visible fields against the same case criteria and source/probe evidence.
The reviewers used `openai/gpt-6-astra#medium`, the same model family as one audit arm; context separation and masking do not remove that limitation.

See [credential review](credentials-review.md), [cleanup review](locks-review.md), and [runs.json](runs.json) for the complete item mapping, judgments, quotations, identities, and hashes.

| Criterion | Original drafts | After Grok audit | After Astra audit |
| --- | --- | --- | --- |
| Causality or mechanics | 2/6 | 5/6 | 6/6 |
| Evidence | 0/6 | 0/6 | 6/6 |
| Guarantees | 2/6 | 2/6 | 6/6 |
| Reader-facing prose | 6/6 | 6/6 | 6/6 |
| HTML artifact | 6/6 | 6/6 | 6/6 |
| All criteria | 0/6 | 0/6 | 6/6 |

The current masked review found additional defects in the original drafts, including metadata claims and whole-document inconsistencies.
The historical experiment reported one complete pass; that score remains recorded there. This table uses the same current review pass for every arm rather than mixing historical and new judgments.
All originals failed at least one current criterion, so this study does not estimate unnecessary edits or regressions on fully correct drafts.

## What the Grok audit missed

Two Grok audits declared `pass`, but both outputs still failed the rubric.
Other audits repaired individual sentences while leaving contradictory summaries in place.

One lock recap still said:

> Acquisition failures and release rejections keep their prior semantics.

On the combined task-rejection and release-rejection path, the old function never calls release and propagates the task error. The new function reaches release and propagates its rejection.
The recap remained false even after the audit inserted a correct explanation earlier in the same field.

One credential correction replaced an unsupported extra-read claim with:

> Both versions execute exactly one Date.now() per request invocation.

That is also false: an old send rejection skips the helper's expiry check. Counting the expression in the source does not establish execution count on every path.

## What the Astra audit corrected

The Astra proposals consistently distinguished:

- An invoked operation from one that fulfills successfully.
- One source expression from path-dependent runtime evaluation and unknown client-internal work.
- An author-reported failure or scope boundary from demonstrated behavior.
- A probe's measured observable from state it did not measure.

For the lock case, the audit identified that a probe's `released` flag was set on entry to the stub before a possible rejection.
It therefore described that flag as evidence of entering the stub, not of successful cleanup.

For the credential case, the audit preserved a further nuance: the author's reference to an extra read cannot be dismissed solely by counting source expressions.
The moved check can execute on a send-error path where the old check was skipped. The source alone does not establish a per-request cost increase or total clock work inside client methods.

The masked reviewers found substantial repetition in some corrected drafts, especially long recaps repeating caveats from the body.
The factual recovery score therefore does not establish that the drafts are optimally concise or meet every style preference.

## Reusable tooling

The experiment's mechanical boundary is now available as the [local audit command](../../protocols/AUDIT-TOOL.md):

```text
bun run audit prepare --manifest <file> --output <fields.json>
bun run audit apply --manifest <file> --audit <audit.json> --source <source.json> --output <revised.json>
```

Optional verification and probe inputs support their corresponding evidence references.
The public helper and CLI reproduced all twelve recorded applications. Tests cover stale inputs, field coverage, evidence mismatch, unsupported paths, placeholder loss, blocked verdicts, and preserving input files.

Mechanical validation is useful even when semantic review fails. It accepted both model arms because their final audit records were structurally valid; the independent review determined factual quality.

## Retained evidence and next decision

The committed record contains the prompt, masked review reports, mapping and per-item scores, source hashes, audit verdicts, edit counts, timing, and local evidence paths.
Full visible transcripts, raw exports, first-pass failures, repair prompts, audit JSON, original and revised manifests, and HTML remain under `.evals/narrative-audit-*`.

Keep this as an experimental final-review workflow. The next evaluation should include new drafts and deliberately correct controls, and should measure both factual repair and unnecessary rewriting.
Use a reviewer with demonstrated source-level reasoning for this stage; extra rounds with the drafting model did not substitute for that capability in this sample.
