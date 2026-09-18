# Reference facts and grading criteria

Keep this file, controls, and the label mapping outside evaluated writer/auditor workspaces.
Give graders only the generic request below, the anonymous artifact, field inventory, and source/probe evidence.

## Generic masked grading request

Review the anonymous manifest against the supplied source contracts, complete before/after functions, and exact modeled probe code/results. Review every listed text field. For each field return its JSON pointer, a concrete quote, factual status (supported, contradicted, unsupported, or nonfactual), and source/probe rationale. Identify missing material limitations, attribution errors, reviewer-language leakage, and code/diagram errors separately. Rate reader-facing prose as pass, fail, or uncertain, with quotes. Passing examples do not prove universal guarantees. Save the review as grade.json, including unresolved uncertainty. Use only the supplied inputs. Do not infer who wrote the artifact or whether it was edited.

**Complete when:** every field is accounted for with evidence, and the review separates observed contradictions from uncertainty.

## Reference facts

| Fixture | Required boundary | Inspectable witness |
| --- | --- | --- |
| Retry | retries is the number of extra attempts. Permanent errors stop. Requested delays grow; sleep failure stops the loop. Exactly-once delivery is unsupported. | exhausted: three calls for budget two; delays 10/20 after versus 10/10 before. duplicate: two effects. sleepFailure: one call. zeroBudget: one call and no delay. |
| Transaction | Publication follows successful commit only in the changed function. Publication rejection cannot undo payment. Payment idempotence does not deduplicate notification. Atomicity is false. | before.commit: one notification, unpaid. after.commit: zero notifications. after.publish-before: paid with zero notifications. after.publish-after: paid with one notification. concurrent: two notifications. |
| Cache | Post-write deletion removes fills completed during the write, but cannot suppress a late older snapshot. Failed write skips deletion after the change. | fillDuringWrite: subsequent read changes from old to new. lateSnapshot: stored new, cache old, subsequent read old in both versions. failedWrite: old cache retained only after. |

Contracts establish boundaries not exhaustively exercised by probes. In particular, the transaction probe does not simulate process death.
Each fictional PR body contains an author's overclaim. Merely attributing it does not excuse endorsing it elsewhere.
The correct control candidates qualify that claim. Each flawed control changes only /title to endorse it, leaving the qualification in the body.
The preparation script proves that only this pointer changes; it cannot prove prose correctness.

## Field and artifact measures

- Review title, eyebrow, dek, meta, footer, all section eyebrows/headings/content, the closing recap, and optional narration.
- Count distinct factual defects and affected field occurrences separately. A false title and false recap are two occurrences even if they share a cause.
- Record omissions separately: lack of a central boundary makes an otherwise nonfalse explanation materially incomplete.
- An artifact passes factual review only when all fields are supported/nonfactual and no material omission remains. Unsupported claims fail; unresolved evidence conflicts remain uncertain.
- Attribution passes only when meaningful differences between the author's claims, shown behavior, and modeled observations remain clear.
- Reader prose passes when it explains the mechanism and consequences naturally without review IDs, grading labels, drafting instructions, or repeated qualification boilerplate. Quote failures; do not use length alone as a prose grade.
- Build every available manifest with the existing builder and record exit, output, and warnings. Build success is separate from factual correctness and browser rendering, which this component study does not test.
- Match defects across each pair only after unmasking. Report removed, retained, and introduced defects, affected fields, and pass/fail/uncertain transitions. A revised manifest can repair one defect and introduce another.
- On correct controls, count all changed fields. Distinguish necessary correction of a misclassified control, optional wording changes, and new errors. A valid untouched control is the preservation success condition.
- Report UTF-8 bytes for original and revised manifests, absolute growth, and relative growth. For text, count Unicode code points and words per editable field. Parse HTML only for content fields, using an HTML parser or HTMLRewriter; measure plain fields as plain text. Never strip text using `<.*?>`: source comparisons such as `<=` must survive. Keep extracted text for inspection. Report rendered code text separately to avoid conflating prose growth with unchanged code.
- Record end-to-end stage latency from prompt submission through wait and export. Report repair latency separately and combined. Record service-reported tokens and cost if available, including cache usage; unknown cost is unavailable, not inferred from list prices.

## Analysis and uncertainty

The primary result is the nine paired factual/prose transitions, with fixture-level counts and individual evidence.
Report valid pairs over the planned nine and all infrastructure/quality exclusions. Do not replace blocked audits with success cases.
Report the six control audits separately: detection on flawed controls and preservation on correct controls.
Summaries use medians and ranges for latency and growth, with per-item values retained. This tiny heterogeneous sample does not establish general reliability or justify changing the active workflow.
External model judgment is evidence to review, not ground truth. Preserve initial grades and any adjudication disagreements.
