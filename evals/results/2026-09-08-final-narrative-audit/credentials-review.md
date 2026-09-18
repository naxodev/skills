## Matrix

**Pass/Fail applies to the complete saved reader-facing content.** Locations below are relative to `.evals/final-audit-review-pack/credentials/`.

| Item | Causality | Evidence | Guarantees | Reader-facing | Artifact |
|---|---|---|---|---|---|
| item-01 | Pass | Pass | Pass | Pass | Pass |
| item-02 | Pass | **Fail** | Pass | Pass | Pass |
| item-03 | Pass | **Fail** | Pass | Pass | Pass |
| item-04 | Pass | Pass | Pass | Pass | Pass |
| item-05 | **Fail** | **Fail** | **Fail** | Pass | Pass |
| item-06 | **Fail** | **Fail** | **Fail** | Pass | Pass |
| item-07 | **Fail** | **Fail** | Pass | Pass | Pass |
| item-08 | Pass | **Fail** | Pass | Pass | Pass |
| item-09 | Pass | Pass | Pass | Pass | Pass |

### item-01

- **Causality:** `document.html:323–329` correctly explains the awaited ordering, attributes the reported failure, and distinguishes rejected send from a later refresh.
- **Evidence:** Lines 326, 329, and 336 distinguish the author’s extra-read claim from the moved expression. Streaming separation remains explicitly unverified.
- **Guarantees:** Lines 317, 329, 336, and 342 qualify modeled success with fixed time, renewal, and expiry-only send failure. Clock-expression execution is conditional on reaching it; total client-internal reads remain unknown.
- The saved cases support the explanation: `probe-results.json:37–117`; modeled clock and client behavior appear in `counterexample.mjs:10–39`.

### item-02

- **Evidence failure:** The meta and footer assert **“streaming path unchanged”** (`document.html:318,342`). The body also asserts **“This applies only to the non-streaming request path present in the source”** (line 329). The source contains neither streaming implementation nor callers. The correctly attributed statement at line 336 does not establish those stronger summaries.
- **Causality passes:** Lines 326 and 329 attribute the failure and explain relocation. However, **“client.send received them in that state”** adds credential-propagation detail absent from the source.
- **Guarantees passes:** Lines 333, 336, and 339 scope the modeled conclusion and acknowledge unrelated failures. The clock statement concerns what the source introduces, rather than guaranteeing exactly one runtime read per invocation.
- Additional imprecision: **“on paths where send throws, the new code executes the refresh”** (line 336) needs the expired-condition qualification. Its particular modeled unrelated-error fixture does start expired (`counterexample.mjs:70–72`).

### item-03

- **Evidence failure:** The walkthrough omits the author’s **extra-clock-read claim** while stating **“No net addition of a clock read occurs”** (`document.html:336`). It also asserts **“Streaming requests are untouched”** in the recap (line 342), although streaming implementation and callers are absent.
- **Causality passes:** Line 326 explicitly attributes the failure and correctly says the modeled old send rejects without reaching refresh.
- **Guarantees passes:** The clock-condition count is expressly limited to **“success paths”** (line 336). That is valid for the shown helper expression; it is not an every-invocation guarantee. Lines 336 and 342 label client behavior as modeled and reject universal success.
- Precision concern: The recap’s **“same number of Date.now evaluations”** should explicitly say *the helper expression*. Total reads inside unknown client methods are not established. Likewise, “No net addition” should name source expressions.

### item-04

- **Causality:** `document.html:323–329` correctly explains both await boundaries and explicitly distinguishes a skipped refresh from one completed too late.
- **Evidence:** Line 336 preserves the author’s extra-read claim while distinguishing expression count, early-exit execution, and unknown total cost. Streaming remains attributed.
- **Guarantees:** Lines 329, 336, and 342 state that refresh fulfillment alone does not establish credential renewal or request success.
- The timing-sensitive explanation matches `probe-results.json:68–87` and `counterexample.mjs:142–150`: the old helper’s post-send refresh fails; the new helper returns without that refresh.

### item-05

- **Causality failure:** **“an expired client would attempt the send with stale credentials and only then refresh”** (`document.html:326`) incorrectly describes the failing path. In the saved expired fixture, send rejects and refresh is never reached (`probe-results.json:37–47`; `counterexample.mjs:48–51`).
- **Evidence and guarantees failure:** **“one more Date.now() read on every call that reaches the function, even when credentials are still valid”** (line 329) is false. Both versions contain one helper expression. On ordinary successful not-expired paths, each evaluates it once. The recap repeats **“an extra clock read on every invocation”** (line 342).
- **Additional guarantee overstatement:** The subtitle says the change **“succeeds when refresh completes without error”** (line 317). The modeled successful refresh also extends expiry by 5,000 milliseconds; fixed time and expiry-only send failure are additional assumptions (`counterexample.mjs:10–39`). Mere fulfillment is insufficient.
- Line 323 also omits the possibility that post-send refresh rejection prevents returning the response.

### item-06

- **Causality failure:** The same unsupported **“only then refresh”** account remains at `document.html:326`. The expired old fixture never reaches refresh.
- **Guarantees failure:** **“Both versions execute exactly one Date.now() per request invocation”** (line 329) is false even when restricted to the helper expression. A rejected old send skips that expression. Client methods also contain clock reads (`counterexample.mjs:32,36`).
- **Evidence failure:** Although line 326 contrasts the author’s extra-read statement with relocation, line 329 changes the author’s stated trade-off to **“accepts the repositioned clock read.”** The recap repeats that reinterpretation at line 342. The source says *extra*; it does not establish this replacement explanation.
- The subtitle retains item-05’s insufficient **“succeeds when refresh completes without error”** qualification (line 317).

### item-07

- **Causality failure:** **“only then attempt a refresh that came too late for that call”** (`document.html:326`) is false for the modeled expired failure. The saved result has `refreshCalls: 0` (`probe-results.json:31–38`). Later discussion of different errors does not correct this account.
- **Evidence failure:** Line 336 omits the author’s extra-read claim and substitutes **“No net addition of a clock read occurs.”** The recap asserts **“Streaming requests are untouched”** (line 342), which the absent implementation and callers cannot establish.
- **Guarantees passes:** As in item-03, the explicit condition-count statement is qualified to successful paths, and modeled success is labeled assumption-dependent. The recap should still distinguish helper-expression evaluations from total clock reads.

### item-08

- **Evidence failure:** **“streaming path unchanged”** appears in both meta and footer (`document.html:318,342`), while line 329 asserts exclusive non-streaming scope. Neither follows from the supplied diff.
- **Causality and guarantees pass:** Lines 326–339 attribute the reported failure, explain relocation, qualify the modeled conclusion, and acknowledge unrelated failures.
- The same precision issues as item-02 remain: unshown credential propagation at line 326 and insufficiently qualified refresh-on-send-error wording at line 336.
- The probe uses wall time (`counterexample.mjs:6,15,18`); the walkthrough’s **“no time elapses”** wording at line 333 is an added condition, not something that execution enforces.

### item-09

- **Causality:** `document.html:323–329` attributes the reported cause and correctly explains skipped refresh after rejected send.
- **Evidence:** Line 336 distinguishes the unchanged expression count from path-dependent runtime execution. It preserves the author’s extra-read claim and leaves client internals unknown.
- **Guarantees:** Lines 333, 336, and 339 qualify success with the renewal stub and explain refresh rejection and unrelated send failure.
- The boundary qualification is accurate: `counterexample.mjs:6,66–68` initializes expiry from run-start wall time, rather than freezing time at the later check.
- “Non-streaming” in the subtitle and recap is shorthand; line 329 explicitly attributes that identification to the author’s account. The document does not claim verified streaming behavior.

## Reader-facing and artifact findings

- **All reader-facing criteria pass.** No internal fact IDs, approval labels, reviewer instructions, or drafting-process narration appear in the saved walkthroughs. Named probe cases and source-attribution language are legitimate explanation, not internal directives.
- **All artifact criteria pass under the permitted saved-artifact standard.** Each `item-01/document.html` through `item-09/document.html` contains readable text and the code corresponding to its final manifest, including title, subtitle, headings, recap, and footer.
- The literal `<=` prose in items 05 and 06 was inspected directly at `document.html:336`; it was not removed through tag-stripping.
- Builder exits and historical output-path reporting were not independently rechecked.

## Supplementary observations

- **Item-01 has substantial duplication:** the subtitle, change section, trade-offs, and three-paragraph recap repeat modeled assumptions and limits. Streaming scope is repeated across three sections.
- **Item-04 also repeats substantial material:** the recap reproduces most of the detailed trade-off discussion, and the streaming follow-up appears repeatedly.
- Items 03 and 07 use **“preemptive refresh when the credentials are due to expire”** (`document.html:329`). The actual `<=` check has no advance-refresh margin.
- No broader claim about unjustified revision edits is supported by this final-only pack.
