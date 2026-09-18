# Same-model final audit: completed pairs with mixed review results

All **nine Astra writers, nine paired Astra audits, six control audits, and 30 masked Grok grades completed**.
Audits changed five of nine drafts and repaired all three seeded false titles. They also made three unnecessary edits to an admitted
correct retry control. The operator's source review identifies ten distinct text defects removed, but retains three uncertain revised
artifacts. The [parent integration review](PARENT-RESULT-REVIEW.md) confirms the control outcomes and retains the main-result limitations.
**This is not a nine-of-nine factual or prose pass.**

This study isolates adding one fresh audit to an exact original draft. Both stages used `openai/gpt-6-astra#medium`, the build agent,
and inherited provider settings. Grading used `xai/grok-4.6#high` in fresh masked contexts. Execution began September 12 and final grading
finished September 13. The result directory retains the start date.

## Admission and chronology

The [September 9 design](../2026-09-09-audit-stage/PROTOCOL.md) and its blocked historical record remain byte-identical.
The active skills and [final audit protocol](../../protocols/FINAL-NARRATIVE-AUDIT.md) also remain byte-identical.

The [grader amendment](AMENDMENT.md), [qualification prompt](QUALIFICATION.md), and [six executable cases with answer key](qualification.ts)
were locked in [freeze.json](freeze.json) before any model answer. Grok 4.6 answered exactly READY and passed **6/6**, with exact quotes,
correct statuses, and source-consistent rationales. No false positives or prompt repairs occurred on that screen.
[Catalog evidence](catalog.json) establishes the fixed candidate order and valid variants. Grok 4.5 and the free MiMo fallback were not reached.
The [qualification assessment](qualification-assessment.json) is a small screening result, not a reliability guarantee.

Three initial control reviews found a real metadata packet gap and disputed completeness/prose findings.
The [investigation](CONTROL-INVESTIGATION.md) documented limited control corrections and a deterministic retry witness.
[Revised control hashes](control-revision-lock.json) preceded three fresh reviews. All 51 revised control fields were supported/nonfactual,
but Grok still disputed omissions and prose. The operator initially stopped too strictly; that [interim report](INTERIM-REPORT.md) and
[interim decision](interim-control-acceptance.json) remain available.

Before any writer, the parent reviewed source/probes, grades, and style rules and admitted **3/3 revised controls as factually correct**.
[Parent adjudication](PARENT-ADJUDICATION.md) rejects mandatory keyword inventories and leakage findings based only on natural attribution.
The [timestamped admission](control-acceptance.json) hashes that decision and the unchanged revised controls.
**Admission was parent source-level adjudication, not Grok's unqualified artifact acceptance.** No further control, prompt, rubric,
or candidate-selection change occurred. Main judgments below remain the operator's assessments; the parent performed a targeted integration review.

## Full denominators and execution results

| Stage | Completed / planned | Result |
| --- | --- | --- |
| Writers | 9 / 9 | All original manifests saved |
| Exact-original audits | 9 / 9 | Five revise, four pass |
| Correct-control audits | 3 / 3 | Retry revised; transaction/cache preserved |
| Flawed-control audits | 3 / 3 | All three false titles revised |
| Masked primary grades | 30 / 30 | Every artifact received a fresh grade |
| Primary text-only HTML builds | 30 / 30 | All passed |

No slot was replaced or excluded. No audit blocked, no provider admission failure occurred, and no caller-requested mechanical repair
or semantic retry occurred. Models sometimes checked or edited their own output during their initial turn; those tool actions remain
in the transcripts. The 12 preparatory control builds are separate from the 30 primary artifact builds.

Two foreground grading calls were interrupted. The currently running owned model finished normally each time.
The operator recovered those existing sessions without resending a prompt, then resumed the original saved shuffle.
Exact end-to-end latency is unavailable for those two recovered grades; service timestamps and all tokens/cost remain recorded.

## Paired factual and prose results

The [source-level adjudication](ADJUDICATION.md) separates confirmed text repairs, ambiguous corrections, retained concerns, and
rejected model findings. The [machine-readable adjudication](adjudicated-results.json) is separate from
[normalized raw grades](normalized-model-grades.json). Neither normalization nor a build decides factual truth.

| Pair | Fixture/run | Edited fields | Operator factual judgment | Raw Grok prose |
| --- | --- | --- | --- | --- |
| 0 | Retry 1 | 5 | Fail → uncertain | Uncertain → pass |
| 1 | Transaction 1 | 0 | Pass → pass | Pass → pass |
| 2 | Cache 1 | 1 | Fail → pass | Fail → uncertain |
| 3 | Retry 2 | 4 | Fail → pass | Uncertain → uncertain |
| 4 | Transaction 2 | 2 | Uncertain → pass | Fail → uncertain |
| 5 | Cache 2 | 0 | Pass → pass | Uncertain → fail |
| 6 | Retry 3 | 3 | Fail → uncertain | Pass → fail |
| 7 | Transaction 3 | 0 | Uncertain → uncertain | Pass → pass |
| 8 | Cache 3 | 0 | Pass → pass | Fail → fail |

The operator identifies **10 distinct text defects, across 11 field occurrences in four pairs, removed**:
elapsed-time claims not entailed by requested sleeps; returned-error versus promise-rejection wording; unsupported caller classification;
a misplaced exhaustion guard; a contract-attribution error; and the unsupported cache “concurrency limit” headline.
No confirmed introduced text defect was found. Two retry code fragments remain unchanged and visibly elided; their presentation may fail
the code criterion. Transaction scope and successful-await wording also need consistent parent judgment.

Provisional totals are 3 pass / 4 fail / 2 uncertain originals and 6 pass / 0 confirmed fail / 3 uncertain revisions.
This is an operator assessment, not external model consensus or a parent-certified whole-artifact pass rate.
Attribution improves in the three retry drafts under that review; the other six already distinguish author claims from shown behavior.
Structured code is byte-identical across every pair. A Grok code concern disappearing after an unrelated text edit is not a code repair.

Raw judgments vary on identical artifacts. Cache 2 was untouched yet its prose changed from uncertain to fail.
The untouched correct cache control changed from pass to uncertain. Transaction 1's unchanged metadata was unsupported in one grade
and accepted in the other. These differences are grading variation, not audit effects.

Some graders said `verification.json` was not supplied, although the saved workspace contains its explicit empty findings.
Some rejected fictional framing while others accepted identical wording; the writer prompt explicitly establishes that framing but was
withheld from the grader. Those packet/read disagreements are preserved rather than counted as new behavioral defects.
Verification-inventory language in reader prose remains a separate editorial concern. Repeated attribution, denser caveats, and prose
quality require parent judgment; the report makes no overall prose-improvement claim.

## Controls: detection and preservation are different outcomes

| Fixture | Flawed title | Correct-control preservation | Extra correct-control edits |
| --- | --- | --- | --- |
| Retry | Repaired | Failed byte-preservation | Three qualification edits |
| Transaction | Repaired | Preserved exact bytes | None |
| Cache | Repaired | Preserved exact bytes | None |

All **3/3 seeded factual/attribution title defects were repaired**. The raw grader also marks all three original false titles contradicted
and their replacements supported. Completeness/prose disputes are reported separately.
Correct-control byte preservation was **2/3**. Retry changed `/sections/0/title`, `/sections/0/content`, and `/sections/1/content`.
Under the parent's pre-run admission, these are unnecessary qualification edits. They added 365 bytes and 58 words without a confirmed
new factual error. The flawed retry audit made the same three extra edits beyond repairing its title.

## Growth, latency, and service usage

[Paired results](paired-results.json) retain every field, extracted text, code block, manifest hash, change list, raw rating, and build output.
HTMLRewriter parses content; named/numeric references are decoded and structured placeholders are excluded from prose counts.
Plain fields and code entries are measured directly. No HTML-stripping regex supplies the reported measurements.

| Pair | UTF-8 bytes, original → revised | Byte growth | Prose words | Text code points |
| --- | --- | --- | --- | --- |
| 0 | 3435 → 3752 | +317 (+9.23%) | 358 → 405 | 2451 → 2768 |
| 1 | 3433 → 3433 | 0 | 380 → 380 | 2605 → 2605 |
| 2 | 3471 → 3491 | +20 (+0.58%) | 363 → 365 | 2320 → 2340 |
| 3 | 3490 → 3879 | +389 (+11.15%) | 394 → 442 | 2589 → 2965 |
| 4 | 3680 → 3877 | +197 (+5.35%) | 377 → 407 | 2634 → 2831 |
| 5 | 3466 → 3466 | 0 | 368 → 368 | 2346 → 2346 |
| 6 | 3664 → 3977 | +313 (+8.54%) | 396 → 439 | 2611 → 2924 |
| 7 | 3231 → 3231 | 0 | 343 → 343 | 2415 → 2415 |
| 8 | 3508 → 3508 | 0 | 363 → 363 | 2363 → 2363 |

Main-pair median growth was **20 bytes / 0.58%**, ranging from 0 to 389 bytes / 0 to 11.15%.
Median prose growth was 2 words (range 0–48) and 20 code points (range 0–376).
Code text remains unchanged and is reported separately. All nine original writers satisfy the four-section, 250–450-word request
under the parser-based displayed-prose count.

| Stage | Median seconds | Range seconds | Latencies available | Reported USD |
| --- | --- | --- | --- | --- |
| Writers | 67.030 | 54.789–77.623 | 9/9 | 0 |
| Main audits | 63.127 | 45.806–105.772 | 9/9 | 0 |
| Control audits | 66.190 | 40.195–92.572 | 6/6 | 0 |
| Masked grading | 287.882 | 188.316–358.529 | 28/30 | 7.206024 |

Latencies cover submission through wait/export and exclude clone creation. Two recovery latencies are unavailable, not zero.
Zero Astra cost is the service's reported value, not a claim that the service was free.
[Study usage](study-summary.json) and [per-session execution records](study-executions.json) retain input/output/reasoning/cache token
counts and actual reported charges. Screening/control-admission cost was USD 1.513668; total recorded study service cost was
**USD 8.719692**. No list-price cost, temperature, or seed was inferred.

## Evidence and review entry points

- [Parent review queue and source rationale](ADJUDICATION.md): confirmed repairs and unresolved judgments.
- [All raw grade findings in pair order](GRADE-DIGEST.md): exact original model findings without adjudication overrides.
- [Paired results](paired-results.json): paths to original/revised manifests, audit records, grades, HTML, and metrics.
- [Unmasked mapping](unmasked-mapping.json): published only after all 30 grades were saved. The live mapping stayed outside model workspaces.
- [Main HTML directory](main-builds): all 30 text-only builds. [Preparatory builds](builds.json) remain separate.
- [Execution evidence](study-executions.json) and [shell review](shell-review.json): actual identities, hashes, tools, and local validation commands.
- [Evidence hashes](evidence-hashes.json): public artifacts; raw-export hashes also appear in each execution record.

Each modifying session used its own stripped sibling jj clone with explicit API location. Fresh contexts saw only their supplied packet;
no tool invoked a skill, delegated, read repository history, or read outside that workspace. Relative paths were resolved against the
recorded session location. Local shell calls validated artifacts; their complete commands/results are in visible transcripts.
The caller revalidated all source/probe bytes, exact audit inputs, public prepare/apply behavior, field coverage, code preservation,
and final builds. Visible transcripts exclude hidden reasoning and provider state. Full raw exports stay under ignored `.evals/resumed`
and the stable external archive for parent integration.

All 510 field pointers are covered. [Quotation issues](grade-quotation-issues.json) retain four grade rows whose quotes still differ
after HTML/whitespace/placeholder normalization: two omit or join spans and two change punctuation around code excerpts.
Those rows are not certified as verbatim evidence. No model was re-prompted to improve a saved grade; source-level review uses the
unchanged original fields instead. Other normalization differences remain visible in the per-field quotation flags.

## Verification and limits

All model execution and deterministic result assembly are complete. Root and nested frozen installs, explicit strict study-script type
checking, repository `bun run check`, frozen-input checks, and artifact builds are verified before integration.
Browser rendering and audio were not evaluated. Parent independent adjudication of the main disputed findings remains pending.
The small heterogeneous sample, grader variability, parent-admitted controls, and optional qualification edits prevent a general
reliability claim or an active-workflow change.
