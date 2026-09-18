## Results

| Item | Mechanics | Evidence | Guarantees | Reader-facing | Artifact |
|---|---|---|---|---|---|
| item-01 | Pass | Pass | Pass | Pass | Pass |
| item-02 | Pass | Fail | Fail | Pass | Pass |
| item-03 | Pass | Fail | Fail | Pass | Pass |
| item-04 | Pass | Pass | Pass | Pass | Pass |
| item-05 | Fail | Fail | Fail | Pass | Pass |
| item-06 | Pass | Fail | Fail | Pass | Pass |
| item-07 | Fail | Fail | Fail | Pass | Pass |
| item-08 | Pass | Fail | Fail | Pass | Pass |
| item-09 | Pass | Pass | Pass | Pass | Pass |

Locations below are relative to `/Users/nachovazquez/work/1-projects/naxodev/skills/.evals/final-audit-review-pack/locks/`.

### Semantic baseline

The source and saved probes support these conclusions:

- Acquisition remains outside `try/finally`. Acquisition rejection skips both task and release.
- After acquisition fulfills and the task fulfills or rejects, `finally` invokes release. Invocation does not depend on release subsequently fulfilling.
- If release fulfills, the task result or rejection passes through.
- If both task and release reject, the new function rejects with the release error. The old function rejects with the task error without invoking release.
- Release invocation or rejection does not establish successful unlocking or actual ownership state.
- The probes model calls and errors. In items 01, 05, and 06, `released = true` executes **before** the stub can reject (`counterexample.mjs:13–18`). That flag is not evidence of successful cleanup.
- These conditional control-flow rules follow from the shown code. Missing production implementations do not make them unknowable.

## Per-item findings

### item-01 — all criteria pass

`document.html:332–347` correctly explains acquisition placement, release invocation, the stub flag, and replacement of a task rejection. The recap at line 356 explicitly separates invocation from successful cleanup and rejects both unsupported author guarantees.

Batch-job statements remain attributed. Title, subtitle, metadata, footer, and recap do not contradict the explanation.

### item-02

**Evidence — Fail**

- `document.html:326`, heading: **“Task failure left the lock acquired”**
- `document.html:327`: **“When task rejected, the lock stayed held.”**

The shown code establishes a skipped release call, not actual ownership state. The source supplies no lock or task implementation. The walkthrough also does not identify the author's two absolute assertions as assertions; its recap narrows the behavior without explaining that source discrepancy.

**Guarantees — Fail**

- `document.html:317`, subtitle: **“acquire failure and release failure each keep their original exit behavior.”**
- `document.html:341`, heading: **“Paths the change leaves untouched”**

Release failure after task rejection changes the observed error from the task error to the release error. The correct paragraph at line 343 does not cancel these contradictory summaries. The document also never clearly explains that a rejected release does not establish successful unlocking.

**Mechanics — Pass:** Lines 330, 339, and 347 establish acquisition outside `try` and release attempts after either task outcome.

### item-03

**Evidence — Fail**

- `document.html:326`, heading: **“Task failure left the lock held”**
- `document.html:348`, recap: **“Batch jobs remain on a separate path.”**

The heading asserts unsupported ownership state. The recap presents the batch path as established rather than retaining the attribution used at line 344. No batch source is supplied.

**Guarantees — Fail**

- `document.html:348`, recap: **“Acquisition failures and release rejections keep their prior semantics.”**

The combined task/release rejection path changes: release was previously skipped, but now its rejection replaces the task rejection. Lines 340 and 345 correctly explain error precedence, but the recap contradicts them. The document also lacks a clear distinction between release rejection and successful cleanup.

**Mechanics — Pass:** Line 340 correctly makes release invocation conditional on successful acquisition, not on release fulfillment.

### item-04 — all criteria pass

`document.html:331–341` explicitly distinguishes release invocation, fulfillment, rejection, and actual unlocking. Lines 344–349 cover acquisition rejection and the changed combined-failure outcome.

The modeled evidence is labeled as stub observations. Batch behavior remains attributed. The recap preserves the qualifications rather than contradicting them.

### item-05

**Mechanics — Fail**

- `document.html:356`, recap: **“release is called once when the task succeeds or fails, provided the release promise itself fulfills.”**

This incorrectly makes the invocation guarantee depend on subsequent fulfillment. Release is also called when its promise rejects. The correct control-flow paragraph at line 333 does not repair the recap.

**Evidence — Fail**

- `document.html:327`, heading: **“Task errors left the lock acquired”**
- `document.html:345`: **“an acquire rejection still leaves the lock un-released — the same outcome as the prior code.”**
- `document.html:349`: **“Batch jobs travel a separate code path that this diff leaves unchanged.”**

These statements promote skipped calls into ownership conclusions and promote an author-reported batch path into established implementation behavior. The modeled observation at line 346 proves only that release was not called.

**Guarantees — Fail**

- `document.html:317`, subtitle: **“ensures release after task completion or failure”**

The document does not clearly explain that release rejection fails to establish successful cleanup. Its ownership language and fulfillment-conditioned recap further blur invocation versus unlocking. Error replacement is correctly explained at line 347, but that satisfies only part of this criterion.

### item-06

**Evidence — Fail**

- `document.html:327`: **“Task errors left the lock acquired”**
- `document.html:345`: **“an acquire rejection still leaves the lock un-released — the same outcome as the prior code.”**
- `document.html:349`: **“Batch jobs travel a separate code path that this diff leaves unchanged.”**

These are the same unsupported ownership and batch-implementation claims described for item-05.

**Guarantees — Fail**

- `document.html:317`: **“ensures release after task completion or failure”**

The recap correctly explains invocation and error replacement, but neither it nor the body clearly states that a rejected release does not establish successful cleanup. The subtitle and ownership claims leave that distinction unresolved.

**Mechanics — Pass:** Unlike item-05, the recap at line 356 correctly states that release is called after either task outcome without requiring release fulfillment.

### item-07

**Mechanics — Fail**

- `document.html:340`: **“Release therefore runs after task completion or rejection whenever acquire has already succeeded and the release promise itself fulfills.”**
- `document.html:348`: **“task failure no longer bypasses release when release fulfills.”**

These qualifications wrongly restrict the release-invocation guarantee to fulfillment paths.

**Evidence — Fail**

- `document.html:324`: **“leaving the lock held for subsequent callers.”**
- `document.html:326`: **“Task failure left the lock held”**
- `document.html:348`: **“Batch jobs remain on a separate path.”**

Actual ownership and effects on subsequent callers are not established. The recap also drops the attribution for the unshown batch path.

**Guarantees — Fail**

- `document.html:317`, subtitle: **“to keep the lock from staying held when the task rejects.”**
- `document.html:348`, recap: **“Acquisition failures and release rejections keep their prior semantics.”**

The subtitle presents an unlocking outcome that release rejection cannot guarantee. The recap incorrectly describes the combined-failure behavior as unchanged. The correct modeled error-precedence paragraph at line 345 does not cancel these claims.

### item-08

**Evidence — Fail**

- `document.html:326`: **“Task failure left the lock acquired”**
- `document.html:327`: **“When task rejected, the lock stayed held.”**

These assert ownership state beyond the source. As in item-02, the walkthrough does not distinguish the author's two absolute assertions explicitly from its narrower conclusions.

**Guarantees — Fail**

- `document.html:317`: **“acquire failure and release failure each keep their original exit behavior.”**
- `document.html:341`: **“Paths the change leaves untouched”**

Both conflict with the changed combined-failure outcome explained at line 343. Successful unlocking after release rejection is also not clearly addressed.

**Mechanics — Pass:** Lines 330, 339, and 347 correctly explain acquisition placement and release attempts after both task outcomes.

### item-09 — all criteria pass

`document.html:330` explains why returning a fulfilled task result requires release fulfillment. Lines 343–345 explicitly reject the author's absolute guarantees, explain both-reject precedence, and distinguish invocation from successful unlocking.

The subtitle and recap remain consistent. Ownership uncertainty is limited to actual lock state, not language-level control flow.

## Reader-facing and artifact checks

All nine pass the reader-facing criterion. None exposes internal fact IDs, approval labels, or reviewer directives. Natural source attribution and labeled modeled evidence are acceptable.

All nine saved HTML documents reflect their final manifests, including titles, subtitles, metadata/footer, headings, body, recap, and displayed code. They contain readable text and code without unresolved manifest placeholders or embedded media. Artifact passes use the permitted saved-HTML basis; no scripts were executed.

Output paths are:

- `item-01/document.html`
- `item-02/document.html`
- `item-03/document.html`
- `item-04/document.html`
- `item-05/document.html`
- `item-06/document.html`
- `item-07/document.html`
- `item-08/document.html`
- `item-09/document.html`

## Separate editorial observations

These do not add rubric failures:

- **Items 01, 05, 06:** The batch follow-up repeats in adjacent sections and the recap. The sentence at `document.html:353` about “other boundaries” narrowing conclusions is vague and adds little.
- **Items 01 and 04:** The recaps repeat nearly every boundary already explained. They could be shorter without losing the central guarantees.
- **Items 02, 08, 09:** Acquisition's early exit repeats in the implementation section, trade-offs, and recap.
- **Unjustified edits:** The allowed materials contain final manifests, not drafting histories. No separate edit-history judgment is supported. Unsupported final claims are identified above.
