**v2 run 2 passes all five criteria.** The other five artifacts fail at least one criterion.

Scored against `evals/cases.json:84–89` and `evals/fixtures/pr.json`. I read every final manifest and its saved HTML, including titles, dek, sections, and recap.

### Score matrix

| Variant/run | causality | evidence | guarantees | reader-facing | artifact | Total |
|---|---|---|---|---|---|---|
| v1 / 1 | Pass | **Fail** | **Fail** | Pass | Pass | 3/5 |
| v1 / 2 | Pass | Pass | **Fail** | **Fail** | Pass | 3/5 |
| v1 / 3 | Pass | **Fail** | **Fail** | **Fail** | Pass | 2/5 |
| v2 / 1 | Pass | **Fail** | Pass | Pass | Pass | 4/5 |
| v2 / 2 | Pass | Pass | Pass | Pass | Pass | 5/5 |
| v2 / 3 | Pass | **Fail** | **Fail** | Pass | Pass | 3/5 |

### Evidence and failure reasons

Paths below use:
- **A** = `.evals/challenged-v1-pr-grounding-quality-XPbay3`
- **B** = `.evals/challenged-v2-pr-grounding-quality-IgGjn0`
- **M** = `run-N/write/work/manifest.json`
- **H** = corresponding `walkthrough.html`

| Run | Concise evidence |
|---|---|
| **A / 1** | **Causality passes:** “contributor’s reported diagnosis” and check-before-send explanation (M:15,20). **Evidence fails:** invents “the second evaluation of `Date.now()`” (M:32), then recap adopts “accepting an extra clock read” without distinguishing report from established change (M:37; H:340,345). Streaming implementation correctly remains absent. **Guarantees fails:** “Both the old and new versions read … once per request path shown” (M:20; H:337). Old `send` rejection skips that read. **Reader-facing passes:** complete developer-facing prose, without IDs or drafting directives (H:316–345). |
| **A / 2** | **Causality passes:** explicitly attributes the expiry failure to the author and explains relocation (M:15,20). **Evidence passes:** contrasts “The author states the extra clock read” with one source call before/after; streaming implementation is absent (M:32; H:341–342). **Guarantees fails:** dek says the relocation “keeps the first request … from failing” (M:4; H:317); recap says code “performs exactly one” read (M:37; H:345). **Reader-facing fails:** recap leaks “the verification requires us to preserve” (same location); M:32 also says the discrepancy “must be preserved.” |
| **A / 3** | **Causality passes:** “author’s stated reason” accompanies explicit relocation (M:16). **Evidence fails:** replaces the author’s extra-read report with a “rejected claim” supposedly resolved by an unchanged per-invocation count (M:21), then repeats “the number of clock reads stays the same” in recap (M:43; H:350). Streaming remains correctly unshown. **Guarantees fails:** “unchanged at one per invocation” and “exactly one … read per call” (M:21,33; H:338,344), despite unknown-method caveats elsewhere. **Reader-facing fails:** leaks `(V2, V8)`, `(constraint)`, `(caveat on V3)`, and “Any description of cost must reflect…” (H:324,327,344). |
| **B / 1** | **Causality passes:** author-reported failure and relocated existing check (M:16,21). **Evidence fails:** never presents or attributes the author’s **extra-read claim**, so it does not distinguish that claim from relocation. The clock paragraph only discusses relocation and counts (M:33; H:336). Streaming implementation correctly stays unknown. **Guarantees passes:** clock counts explicitly concern “success paths”; recap remains “path-specific and assumption-dependent rather than a universal guarantee” (M:33,43; H:336,342). I read “No net addition” within that paragraph’s success-path scope. **Reader-facing passes:** modeled examples explain runtime limits without internal IDs or drafting directives. |
| **B / 2** | **Causality passes:** author-reported failure plus refresh-before-send explanation (M:15,20). **Evidence passes:** contrasts the body accepting read cost with “the diff itself performs only the relocation”; streaming code is absent (M:32; H:336). **Guarantees passes:** explicitly explains that old `send` failures leave “the post-send check unreachable,” and unrelated failures remain possible (same location). Recap preserves stated assumptions (M:37; H:339). **Reader-facing passes:** complete prose with no leaked IDs or reviewer instructions (H:316–339). |
| **B / 3** | **Causality passes:** author attribution and identical-condition relocation (M:15,20). **Evidence fails:** promotes the report into “one more `Date.now()` read on every call … even when credentials are still valid” (M:20; H:329). Recap adds “on every invocation” to the author’s report, which the fixture does not say (M:42; H:342). Streaming implementation correctly stays unknown. **Guarantees fails:** that universal extra-read count is false on successful old paths. Later refresh-error and timing caveats do not withdraw it. **Reader-facing passes:** complete explanation without evaluation IDs or reviewer directives. |

### Artifact verification

**All six artifact criteria pass.** Each saved HTML contains the final manifest’s title, dek, complete sections, recap, and rendered code block. Writer session records report the HTML output paths and successful builds:

- `A/run-{1,2,3}/write/session.json`
- `B/run-{1,2,3}/write/session.json`

The saved reader-facing ranges are H:316–345, 316–345, 316–350 for v1; H:316–342, 316–339, 316–342 for v2.

**No unfinished prose appeared in the final artifacts.** Evaluation IDs and directions leaked in **v1 runs 2 and 3**.

The decisive semantic distinction is source occurrence versus runtime execution: both versions contain one explicit `Date.now()` expression, but the old version never reaches it when `await client.send(payload)` rejects.