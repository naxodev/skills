# Current walkthrough: six native full-workflow executions

All six offline walkthrough parents completed with 24 real native reports. All six artifacts passed the recorded source criteria and independent byte-identical rebuilds. This establishes execution of the current text-only workflow on these fixtures, not complete instruction compliance or general reliability.

The tiny fixture did not support the requested 2–4 distinct diff hunks. Two sessions also loaded installed instructions outside the local-only path. Both limitations remain in the scores.

## Execution and outcome

| Check | Small PR 42 | Multi-file PR 108 |
| --- | ---: | ---: |
| Parents completed | 3/3 | 3/3 |
| Native reports completed | 12/12 | 12/12 |
| Original case criteria passed on saved artifacts | 3/3 | 3/3 |
| Four native starts before first report completion | 3/3 | 3/3 |
| All reports completed before manifest writing | 3/3 | 3/3 |
| Local SKILL/STYLE reads match frozen files | 3/3 | 3/3 |
| Local-only instruction route, including children | 2/3 | 2/3 |
| Literal requested report shape | 0/3 | 3/3 |
| Four distinct explanatory sections; recap last | 3/3 | 3/3 |
| Audio command executed, no-op, stale sidecar removed | 3/3 | 3/3 |
| Build with `--audio`, real-path handoff, identical rebuild | 3/3 | 3/3 |

Prose word counts were **505, 486, 478** for the small PR and **490, 537, 552** for the multi-file PR. HTMLRewriter counted visible prose, headings, and metadata, excluding structured code and diagrams. Small outputs used two code excerpts; multi-file outputs used three. Short output alone is not a quality score.

The six parents used `build` with `openai/gpt-6-astra#medium`. All 24 native children used `general`; their exports independently confirm the same model and variant. No report was supplied or synthesized by the controller. There were no replacements, semantic feedback, infrastructure retries, timeout extensions, or blocked/unrun trials. At most two parents ran concurrently.

## Source review

[Scores](scores.json) preserve every original criterion and record workflow compliance separately. [Source limits](SOURCE-REVIEW.md) and the [exact manifests](manifests/) support the judgments; [returned reports](reports/) preserve all four charters, reads, and report texts per trial.

The small articles attribute the expiry failure to the author, distinguish a relocated source-level clock read from an added read, and leave streaming implementation unknown. They make no request-success or exact runtime clock-count promise. The first article leaves failure-representation detail in its before report and scopes its final prose to the diff and missing runtime tests; the other two explicitly discuss rejection behavior. These are contextual judgments, not demands to repeat every caveat in every section.

The multi-file articles explain default 100, positive-integer startup validation, prefix removal, the worker call, and retained jobs. They distinguish job count from memory and processing time, preserve the missing tenant key, and invent no alternatives or follow-up plans. Review covered titles, deks, footers, recaps, body claims, and code, not just section labels. Examples such as 250 queued jobs are source-derived illustrations, not measured results.

All six outputs have a coherent through-line. An explicit pre-write story sentence is visible in three sessions. Three others expose scope summaries but no unambiguous private through-line record; that process check is **untested**, not inferred from good prose. Hidden reasoning was not inspected.

## Deviations and focused follow-up

- **Tiny-diff report shape:** small run 1 returned one hunk plus two excerpts; run 2 returned one hunk; run 3 returned two excerpts from one hunk. These were grounded adaptations, but they do not literally supply 2–4 distinct hunks. The evaluator did not relax that requirement. A focused future fix could make the hunk count depend on available source hunks and distinguish hunks from excerpts. No instruction change or new batch was made here.
- **Installed walkthrough in one child:** the third small run's diff-tour child loaded the host `pr-walkthrough` and its style file. [Export-based comparison](installed-skill-check.json) confirms the body and style exactly match the frozen version. This is a path deviation, not evidence of a different tested version.
- **Additional host guide:** the second multi-file parent loaded installed `writing-technical-docs` and its style file. Its outcome is retained but qualified as an additional-instruction run. Four sessions preserve the strict local-only route; their artifacts also pass. The two deviations do not support a pure local-only attribution claim. [Additional-read hashes and paths](additional-instructions.json) identify the archived instruction snapshots.
- **Fixture check failures:** all six parents attempted repository type-check and lint commands. The stripped trial roots lacked TypeScript and ESLint configurations, so those commands failed. Parents reported the failures and completed the skill's independent build. These are harness setup limitations, not passing checks or builder defects. The evaluator's complete repository checks passed separately.

No child wrote files: 23 children used only `read`; the remaining child used `read`, `skill`, and `read`. All 24 read the exact fixture bytes. No caller repairs or semantic audit stage was added.

## Corrected preflight

The [initial preflight](initial/README.md) incorrectly used the evaluator's `general` tool surface to block planned `build` sessions. It launched zero trials; its scores are historical unrun records, not six failures.

The [amendment](AMENDMENT.md) was recorded before a neutral build-agent smoke and any PR trial. The [smoke](smoke.json) launched two native read-only reports, with overlapping execution and actual returned fixture values. This unlocked the original six-session protocol. Smoke counts are separate: **one parent and two native children**, making **seven created parents and 26 native children total** across smoke and evaluation.

[Original source hashes](freeze.json), [trial prompts and hashes](trial-freeze.json), and [execution records](executions.json) preserve the tested conditions. The initial plan followed neutral evaluator-tool discovery; the amendment and six-trial freeze preceded their respective outcomes. Root and nested dependencies were installed from frozen locks in every trial clone.

## Evidence and verification

Raw parent/child exports, visible-only transcripts, exact artifacts, build logs, installation logs, and observation timestamps are retained under ignored `.evals/pr-workflow/` and:

```text
/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/pr-workflow-evidence-20260917
```

The `runs/<case>-<n>/exports/` directories contain all 30 evaluation session exports. `smoke/exports/` contains the three separate capability-session exports. Saved handoff artifacts remain in each run's archive; disposable trial clones were removed after integration review. The controller's raw export is an infrastructure record, not a trial.

`run.ts` prepares and launches only parents; native tools dispatch their reports. `review.ts` checks recorded reads, counts prose with HTMLRewriter, and rebuilds saved manifests. `score.ts` records manual judgments for these six outputs; it is not an automatic semantic grader. The repository scoring command validates complete criterion reports, not prose quality.

`bun run check` and explicit strict TypeScript checks for all three new scripts passed. Browser rendering, audio synthesis/playback, live GitHub fetching, and automatic skill invocation remain **unrun**. The text-only audio no-op was actually executed in all six trials. The active skill and builder remain unchanged.
