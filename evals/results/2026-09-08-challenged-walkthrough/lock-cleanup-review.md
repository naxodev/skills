**No walkthrough passes all five criteria.** All six describe the main control-flow change and provide matching HTML artifacts. Every run fails `guarantees`.

### Scoring matrix

**P = pass; F = fail.** V2 run 2 uses the `mATGKT` replacement. The blocked `GoaIMZ` run 2 is excluded.

| Run | mechanics | evidence | guarantees | reader-facing | artifact | Total |
|---|---|---|---|---|---|---|
| V1–1 | P | F | F | F | P | 2/5 |
| V1–2 | P | F | F | F | P | 2/5 |
| V1–3 | P | P | F | F | P | 3/5 |
| V2–1 | P | F | F | P | P | 3/5 |
| V2–2 replacement | P | F | F | P | P | 3/5 |
| V2–3 | P | P | F | P | P | 4/5 |

### Concrete evidence and failure quotes

References below are to each writer’s `work/walkthrough.html`. The corresponding manifest contains the same prose.

**V1–1**
- **Mechanics P:** Line 334 explicitly places acquire outside `try` and release after task fulfillment or rejection, provided acquisition succeeded.
- **Evidence F / guarantees F:** The recap says, **“Task error preservation follows from finally semantics but lacks supplied tests.”** (356). This incorrectly endorses preservation. A release rejection replaces the task rejection. The text also never explains that a rejected release does not establish cleanup.
- **Reader-facing F:** **“attribution reports the body text without endorsing the assertion”** (348) describes the writing treatment rather than the code.
- **Artifact P:** HTML contains the manifest’s title, dek, six sections, recap, and expanded code block.

**V1–2**
- **Mechanics P:** Line 330 describes acquire before the block and release in `finally` after either task outcome.
- **Evidence F / guarantees F:** The body correctly describes error replacement, but the recap contradicts it: **“whether a rejecting release would mask a task error cannot be determined because the release implementation is not provided.”** (350). Once both rejections are stipulated, the propagated error is determined.
- **Reader-facing F:** **“approved observation V1, V2”** (324), **“rejected input F5”** (342), and **“approved facts V1–V10”** (350) expose internal IDs and approval labels.
- **Artifact P:** HTML matches the manifest, including all six sections and the problematic recap.

**V1–3**
- **Mechanics P:** Acquisition precedes `try/finally` (333); release is attempted whether the task succeeds or fails (342).
- **Evidence P:** Both assertions are attributed to the author and challenged using acquire placement and possible release rejection (345–349). No batch implementation or production results are invented.
- **Guarantees F:** **“this does not demonstrate that the original task error is guaranteed to be preserved (e.g., if release rejects)”** (349) only weakens the guarantee. It never explains that the release rejection replaces the task rejection or that rejected release does not establish cleanup. Acquisition failure is likewise framed as a guarantee “not shown” (346).
- **Reader-facing F:** **“This conflict between the author account and the code structure must be preserved.”** (349) is a drafting directive.
- **Artifact P:** HTML matches all five manifest sections. The missing recap is not itself a rubric failure.

**V2–1**
- **Mechanics P:** Lines 331–343 explain the move to `finally` and acquisition failure leaving release uncalled.
- **Evidence F / guarantees F:** The dek promises **“to keep the lock from staying held when the task rejects”** (317), and the body asserts **“leaving the lock held for subsequent callers”** (324). Neither ownership outcome follows from the supplied contract.
- **Guarantees F, independently:** The recap says **“Acquisition failures and release rejections keep their prior semantics.”** (348). This is false for task-reject plus release-reject: old code propagates the task error; new code propagates the release error. The correct body explanation at 345 does not cancel this summary.
- **Reader-facing P:** Developer-oriented prose without internal IDs, approval labels, or drafting directives. The modeled case is presented as evidence.
- **Artifact P:** HTML matches the title, dek, five sections, recap, and code in the manifest.

**V2–2 replacement**
- **Mechanics P:** The recap explicitly says release is attempted after either task outcome when acquire succeeds (347); acquisition rejection exits before release (339).
- **Evidence F:** The walkthrough never identifies the author’s two false assertions as author claims. It also asserts **“When task rejected, the lock stayed held.”** (327), which exceeds the supplied ownership evidence.
- **Guarantees F:** The dek says **“acquire failure and release failure each keep their original exit behavior.”** (317). The combined rejection path changes the propagated error. The correct explanation at 343 does not cancel the false dek. Successful cleanup after rejected release is not addressed.
- **Reader-facing P:** No internal IDs, approval labels, or drafting commentary.
- **Artifact P:** HTML matches all five manifest sections and the recap.

**V2–3**
- **Mechanics P:** Lines 332–333 clearly explain acquire before `try` and `finally` execution after either task settlement.
- **Evidence P:** The recap explicitly identifies and refutes the author’s release-on-acquire-failure and unconditional error-preservation assertions (356). Batch follow-up is attributed (352); modeled cases are not presented as production results.
- **Guarantees F:** **“an acquire rejection still leaves the lock un-released”** (345) turns an uncalled release into an ownership-state conclusion. The text never explains that release rejection does not establish successful cleanup. It correctly explains error replacement (347), but that satisfies only part of this criterion.
- **Reader-facing P:** The modeled-probe discussion reports evidence limits; it contains no internal IDs, approval labels, or explicit drafting directives.
- **Artifact P:** HTML matches the manifest’s six sections, recap, and code.

### Artifact locations

All paths are relative to the repository root:

- V1–1/2/3: `.evals/challenged-v1-pr-lock-cleanup-FyZaei/run-{1,2,3}/write/work/walkthrough.html`
- V2–1/3: `.evals/challenged-v2-pr-lock-cleanup-GoaIMZ/run-{1,3}/write/work/walkthrough.html`
- V2–2 replacement: `.evals/challenged-v2-pr-lock-cleanup-mATGKT/run-2/write/work/walkthrough.html`

Artifact passes reflect static inspection of the existing HTML and manifest, with paths supplied by writer-stage evidence. I did not execute builds or browser scripts. No current-trial score summaries were read.