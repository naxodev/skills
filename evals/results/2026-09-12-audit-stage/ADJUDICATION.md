# Source-level review of the paired results

These judgments are the study operator's source review, separate from the 30 masked Grok grades.
The parent supplied factual admission of controls before writers, but has not yet independently accepted these main-result judgments.
All disputed findings and raw grades remain available. The experiment does not establish an all-pass revised batch.

## Confirmed text repairs

The unit below is one distinct semantic defect within one pair. Occurrences count fields containing that defect.
Two different defects in one field are separate defects; a repeated delay claim in two fields is two occurrences.

| Pair | Defect and exact original quote | Source rationale | Outcome |
| --- | --- | --- | --- |
| 0, retry 1 | `/dek`: “exponential delays space later attempts” | Sleep contract establishes requested milliseconds only; modeled sleep resolves immediately. | Removed |
| 0, retry 1 | `/sections/1/content`: “returns the permanent error” | `throw error` rejects the async function; the permanent probe records error with null result. | Removed |
| 0, retry 1 | `/sections/1/content`: “the caller's failure classification” | The contract defines the rejected object's boolean; it does not identify the classifier as the caller. | Removed |
| 2, cache 1 | `/title`: “with a concurrency limit” | No concurrency limiting mechanism exists. The code leaves a reader race. | Removed; title now names the remaining reader race |
| 3, retry 2 | `/dek`: “delays spread out further attempts”; `/sections/3/content`: “increases waits” | Requested delay values do not establish elapsed waits. | Removed, two field occurrences |
| 3, retry 2 | `/sections/0/content`: “request a 10-millisecond wait, then try again unless the budget was exhausted” | The old function checks exhaustion before requesting sleep. The sentence places the guard after the request. | Removed |
| 3, retry 2 | `/sections/1/content`: “the error contract says should not happen” | The contract supplies a boolean, not a prohibition. Avoiding permanent-error retries is the author's intent and changed code's policy. | Removed; attribution repaired |
| 6, retry 3 | `/dek`: “exponential delays space out further attempts” | Requested-delay contract and immediate modeled sleeps do not entail elapsed spacing. | Removed |
| 6, retry 3 | `/sections/1/content`: “returns that error” | The changed function rejects with that error. | Removed |
| 6, retry 3 | `/sections/1/content`: “the caller has already classified the failure” | The supplier of the rejection flag is not identified. | Removed |

This gives **10 distinct text defects and 11 field occurrences removed across four of nine pairs** under this review.
No confirmed new text defect was found. That is not a claim that every revised artifact is correct: code presentation and transaction
scope judgments remain unresolved below. The supporting original/revised text and raw audit rationales are in paired-results.json.

## Ambiguous corrections and retained concerns

1. **Retry code fragments, pairs 0 and 6:** each contains an explicitly elided `try` block in a structured code entry.
   Pair 0 closes `try` without a catch before an ellipsis; pair 6 ends mid-function with an ellipsis. They are not runnable JavaScript.
   They are visibly fragments, and the adjacent block shows the catch. Their pedagogical correctness remains uncertain.
   Code entries are immutable across audit application. Grok flagged pair 0's original fragment but accepted the identical revised code.
   This discrepancy must not count as a repaired code defect. Parent review should decide whether the fragment presentation fails the code criterion.
2. **Transaction scope, pair 4:** the original says the function “left the payment unpaid but sent one notification”, then identifies
   that exact probe sequence. The model starts unpaid; the source permits other prior payment states.
   The audit explicitly scopes the count/state to the probe and refers to rolling back staged writes. This is a useful clarification;
   whether the initial adjacent probe attribution already scoped the sentence is uncertain, so it is not in the confirmed repair count.
3. **Transaction await language, pairs 4 and 7:** “await completes [only] after commit” can mean successful continuation, which the
   adjacent rejection sentence explains. Literally, an await also completes abruptly on rejection before commit.
   Pair 4 added “successfully”; pair 7 remained unchanged. Treat these as the same ambiguity, not an inconsistent automatic pass/fail.
4. **Retry extra qualifiers:** the source contract says no lock/cross-call exclusion is supplied. In that scope, saying separate calls
   share no lock does not establish unshown send internals. Audit additions about those internals are conservative wording, not counted repairs.
5. **Cache warm-hit window:** `after` leaves a pre-existing entry readable until the write fulfills. Grok correctly derives that additional
   stale-read path. The articles already deny guaranteed fresh concurrent reads and show the late-snapshot counterexample.
   Describing every additional stale path is not required by the frozen rubric. Reject material-omission failure based only on that absent example.

## Whole-field provenance and prose review

All nine writers include a fictional/component-study label. The unchanged writer request explicitly says “this fictional change”.
Some masked grades call those labels unsupported; others accept identical labels. The writer request was withheld from the grader,
so these findings expose a packet boundary, not a fabricated production provenance. The provenance statement is true in the study record.
This operator treats it as supported framing, with the source-only grade disagreement retained for parent review.

The explicit verification input is `{status: "none", findings: []}` in every workspace. Some graders did not read it and claim no such
file was supplied. The saved input bytes refute that factual finding. Its mention in a reader footer or recap may still be poor prose.
Separate those two judgments: **supported fact, possible workflow-language leakage**.

Apply the parent's control ruling consistently: author attribution, contract wording, and modeled examples alone do not fail prose.
Reject allegations that “concurrent stale reads disappear” changes the author's meaning: the source says stale reads, including concurrent
readers, are removed. The paraphrase preserves that claim. The title-only flawed controls really do endorse unsupported guarantees;
those are attribution failures until the audit changes each title.

Prose concerns that remain substantive are repeated verification-inventory sentences and increasingly dense caveat paragraphs.
Pairs 0, 2, 3, 4, 5, 6, and 8 contain such inventory language in a footer or body; the audit generally preserves it.
Retry revisions make qualifiers more explicit but longer. Reader-facing quality needs parent judgment; raw prose ratings are not
promoted to a causal score because several untouched pairs receive different grades in fresh contexts.

## Control outcomes

- **Flawed controls:** all three false titles were replaced with source-supported, qualified titles. Factual/attribution defect transition:
  fail → pass for the seeded defect, 3/3. The correct body remains supported. Raw model omission/prose disagreements remain separate.
- **Correct controls:** transaction and cache retain exact bytes. Retry changes `/sections/0/title`, `/sections/0/content`,
  and `/sections/1/content`. Under the parent's pre-run admission, those are three unnecessary qualification edits, not rescues of a bad control.
  Preservation is therefore **2/3**, not 3/3. The revised retry statements match the loop's conditions; no new factual defect was found.
- The flawed retry audit also makes the same three additional qualification edits, beyond repairing `/title`.

## Provisional factual transitions for parent review

| Pair | Fixture/run | Original → revised | Remaining question |
| --- | --- | --- | --- |
| 0 | Retry 1 | Fail → uncertain | Unchanged elided code presentation |
| 1 | Transaction 1 | Pass → pass | Provenance packet disagreement; prose separate |
| 2 | Cache 1 | Fail → pass | Title repair; no new supported defect found |
| 3 | Retry 2 | Fail → pass | Delay/order/contract-attribution repairs |
| 4 | Transaction 2 | Uncertain → pass | Original probe scope and successful-await reading |
| 5 | Cache 2 | Pass → pass | Unchanged; prose and nonmaterial omissions separate |
| 6 | Retry 3 | Fail → uncertain | Unchanged incomplete code fragment |
| 7 | Transaction 3 | Uncertain → uncertain | Unchanged successful-await interpretation |
| 8 | Cache 3 | Pass → pass | Unchanged; prose separate |

Original: 3 pass, 4 fail, 2 uncertain. Revised: 6 pass, 0 confirmed fail, 3 uncertain.
These are provisional source-level assessments, **not Grok's artifact acceptance and not final parent sign-off**.
Do not interpret the absence of confirmed revised failures as a nine-of-nine pass.
