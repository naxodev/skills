# Audit regression after Discord planning changes

**All six current-instruction audits passed the six existing source criteria and the no-planning-detour check.**
Revision `455bac4e` preserves audit-only completion after adding journey and staff-capacity requirements to shared discovery.
This is candidate conformance on two offline fixtures, not measured uplift or general reliability.

## Scope and results

The [frozen plan](PLAN.md) specifies three repeats of the existing defect snapshot and three of the healthy-but-incomplete snapshot.
Each fresh build session used `openai/gpt-6-astra#medium`, the exact previous neutral audit prompt, and current local instructions.
No baseline batch, semantic retries, or instruction tuning occurred. All six attempts completed without infrastructure retries.

| Frozen criterion | Passes / attempts |
| --- | --- |
| Read-only; no claimed server changes | 6/6 |
| Audit-mode completion without setup requirements | 6/6 |
| Complete findings or no invented failures | 6/6 |
| Scope, as-of, sources, separate unknowns | 6/6 |
| Preview/member distinction and current-label limits | 6/6 |
| Product terms and durable routes | 6/6 |
| No planning detour or steps 2–8 execution | 6/6 |

Manual review covered actual reports, visible assistant text, every tool action, and source passages.
The [rubric](rubric.json) retains every existing case field and adds one regression check.
[Reviews](reviews.json), [quoted scores](scores.json), and [summary](summary.json) preserve all six denominators.
The score script validates these manual judgments and quote locations; it does not judge prose truth.

All three defect reports retain writable announcements, missing required forum tags, and the privileged interest role from snapshot lines 11–13.
Each finding includes its source, impact and priority rationale, explicitly unapplied correction, and matrix-classified verification.
All three healthy reports retain every recorded announcement denial, member-selectable product tags, moderator-only states, and narrow supplied previews.
None invents a failure or certifies the whole server.

Representative outcomes:

- [Defect 1, line 72](runs/discord-audit-1/audit.md): “Configuration, launch acceptance, invite creation, event creation, app installation, and a long-lived operating state file are outside this audit-only scope.”
- [Defect 2, line 83](runs/discord-audit-2/audit.md): “This audit does not grant launch acceptance or require additional server activity to be complete.”
- [Healthy 1, line 41](runs/discord-audit-incomplete-1/audit.md): “There is no basis for assigning a failure priority or prescribing a corrective server change.”
- [Healthy 2, line 106](runs/discord-audit-incomplete-2/audit.md): “The offline audit is complete. Launch acceptance and implementation are outside this audit.”
- [Healthy 3, line 98](runs/discord-audit-incomplete-3/audit.md) says, “The owner must resolve staff coverage and role assignments,” then states no operating-state file or launch acceptance is required. This is operational follow-up, not an audit-completion prerequisite. The frozen criterion permits pertinent owner notes; it does not fail every capacity mention.

No report required a journey map, staffing budget, operating-plan approval, or private operating state to finish.
Member-journey references describe future behavioral verification. Staffing and workload notes remain unknowns or follow-up suggestions.

## Instruction and execution integrity

[Byte comparisons](guard-evidence.json) between `ef6f9456` and `455bac4e` verify unchanged frontmatter, mode hook, guardrails, operating-mode choices, A1–A3, steps 3–8, shared handoff, and audit references.
The changed discovery paragraph starts “For greenfield or improvement work”; its added completion condition uses the same scope.
Step 2 and the state template changed for planning. The audit branch still stops before them.

| Frozen input | SHA-256 |
| --- | --- |
| Current `SKILL.md` | `545e7550ed8ff52765404f2e01b78dfef45d497ad152cf57e5fefa988e763cf9` |
| Defect snapshot | `cbf730b02596917e3a4c963f0997962626567e2271033afb1f7df9520338dfdc` |
| Healthy snapshot | `14da5d051c6983ccce602c9d7efc4cdaff4de34c1138e5f132bbf36f74ce030e` |
| Unchanged neutral prompt | `5b479082ad230023a00762212684f0403e763bc56ba0b8b0596f322b9e831ead` |

[Freeze metadata](freeze.json) includes all reference hashes, exact prompts, and trial locations. [Inputs](inputs/) preserve their bytes.
The current API OpenAPI was read before execution; the runner uses its experimental wait/export paths.
At most three fresh sibling jj clones ran concurrently. Each was stripped to the snapshot and local skill files, withholding history, evals, rubrics, and previous results.
[Exports](executions.json) verified each explicit location, build agent, model, successful outcome, and unchanged input hashes.

[Tool evidence](tool-evidence.json) verifies complete hash-matched reads of the snapshot, skill, and three audit references in 6/6 runs.
Tools performed only local reads and one `audit.md` creation per run. No installed skills, external files, network calls, browser calls, or server actions were used.
Defect repeat 3 corrected one out-of-range read of its finished report. That local read error did not require a rerun.
Each `runs/<id>/` includes the authored report, visible transcript, and scored source report. Public transcripts exclude hidden reasoning.

## Limits and checks

This is manual source review by the evaluation author, not an independent blind assessment.
Six audits on two fixed snapshots cannot establish general reliability. Report brevity was not a gate in this regression.
Live Discord, exact-current platform labels, automatic routing, and live planning effects remain unrun.

Verified root and nested frozen installs, `bun run check` (type-check, lint, tests, repository validation), strict TypeScript checks for these evaluation scripts, and all six source-report score validations.

Raw exports remain ignored under `.evals/community-regression` and in the evidence archive:
`/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/community-review-evidence-20260918`.
Owned trial clones were removed after archival; the review owner clone remains available.
