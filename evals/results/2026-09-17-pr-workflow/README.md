# Current walkthrough workflow: blocked preflight

The full-workflow gap remains open. This evaluator session exposes no native subagent/task dispatch tool, so the six planned trials were not launched.
This is a harness prerequisite result, not a failed skill execution or a model-quality score.

| Execution | Planned | Started | Completed | Unrun due to preflight block |
| --- | ---: | ---: | ---: | ---: |
| Parent walkthroughs | 6 | 0 | 0 | 6 |
| Native report agents | 24 | 0 | 0 | 24 |

The live model catalog confirmed `openai/gpt-6-astra` is active and offers `medium`.
The complete discoverable `opencode` namespace contains only `models`, `session_move`, and `session_rename`.
Searches for dispatch and task found no dispatch mechanism; the subagent search returned only model discovery.
The directly exposed tools likewise contain no Agent/task tool. See [visible preflight evidence](preflight.md).
This establishes the limitation of this evaluator's exposed tools, not a claim that every OpenCode build session lacks native delegation.
The caller may have a different tool surface. No API-driven substitute was launched.

## Frozen scope and scores

[PLAN.md](PLAN.md) records the bounded protocol. [freeze.json](freeze.json) hashes the current source, cases, scripts, and dependency locks.
The plan and hashes were recorded after neutral tool discovery but before any trial outcome. They are not a preregistration of that discovery.
[scores.json](scores.json) preserves each original criterion for all six planned trials as `untested` and lists workflow stages independently.
There are no manifests, returned reports, child exports, builds, handoff artifacts, or prose word counts to evaluate.
Root and nested dependencies were installed from frozen locks in the evaluator clone only; no trial clone was created.

Step 3 requires four independent native reports in parallel. Synthesizing from supplied reports would repeat the earlier component study rather than close this gap.
The active skill and scripts remain unchanged. No deterministic skill bug was established.
Resume the same six-session protocol in a harness that exposes native dispatch, with a fresh pre-trial freeze.

## Evidence and limits

Private preflight evidence is retained under ignored `.evals/pr-workflow/` and at:

```text
/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/pr-workflow-evidence-20260917
```

No evaluation parents or children exist to export. The available evaluator-session export is an infrastructure record, not a walkthrough trial.
All walkthrough semantic and rendering checks are untested. Browser review, audio generation/playback, live GitHub fetching, and automatic invocation are unrun.
Repository checks are recorded separately in the archive and do not count as workflow execution.

## Repository verification

Both `bun install --frozen-lockfile` commands passed (root and walkthrough scripts).
`bun run check` passed type checking, lint, tests, catalog checks, local Markdown links, and metadata validation.
No TypeScript script was added, so there is no additional strict script check.
