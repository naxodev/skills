# Source review

The reviewer read all twelve public plans, their archived private ownership/capacity/routes/permission/change sections, and actual tool actions. The model did not grade itself. A journey can pass without a table: the baseline's connected orientation, help, contribution, and route sections count when navigable. A smaller channel count alone does not make a plan better.

## Criterion scores

Columns follow the nine criteria frozen in [PLAN.md](PLAN.md): J = journeys; C = capacity grounding; S = scoped structure; P = privacy/permissions; R = source routes; U = facts versus unknowns; D = unapproved draft/no live action; B = bounded recurring work and existing commitments; T = observation-based review trigger. P means pass, not live verification.

| Run / public artifact | J | C | S | P | R | U | D | B | T | Public words | Member-facing channels |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---: | ---: |
| [Beta baseline 1](runs/beta-baseline-1/plan.md) | P | P | P | P | P | P | P | P | P | 1,272 | 4 |
| [Beta baseline 2](runs/beta-baseline-2/plan.md) | P | P | P | P | P | P | P | P | P | 1,227 | 4 |
| [Beta baseline 3](runs/beta-baseline-3/plan.md) | P | P | P | P | P | P | P | P | P | 1,139 | 4 |
| [Beta candidate 1](runs/beta-candidate-1/plan.md) | P | P | P | P | P | P | P | P | P | 1,108 | 2 |
| [Beta candidate 2](runs/beta-candidate-2/plan.md) | P | P | P | P | P | P | P | P | P | 1,022 | 2 |
| [Beta candidate 3](runs/beta-candidate-3/plan.md) | P | P | P | P | P | P | P | P | P | 1,226 | 2 |
| [Growing baseline 1](runs/growing-baseline-1/plan.md) | P | P | P | P | P | P | P | P | P | 1,984 | 7 retained |
| [Growing baseline 2](runs/growing-baseline-2/plan.md) | P | P | P | P | P | P | P | P | P | 1,592 | 7 retained |
| [Growing baseline 3](runs/growing-baseline-3/plan.md) | P | P | P | P | P | P | P | P | P | 1,883 | 7 retained |
| [Growing candidate 1](runs/growing-candidate-1/plan.md) | P | P | P | P | P | P | P | P | P | 1,598 | 7 retained |
| [Growing candidate 2](runs/growing-candidate-2/plan.md) | P | P | P | P | P | P | P | P | P | 1,851 | 7 retained |
| [Growing candidate 3](runs/growing-candidate-3/plan.md) | P | P | P | P | P | P | P | P | P | 1,704 | 7 retained |

Both arms pass each source criterion in 6/6 attempts. There were twelve completed attempts, no exclusions, no failures, and no retry. The neutral preflight is not a planning attempt. All six improvement plans include unapplied changes and reversible in-place edits, with private preview boundaries preserved.

The beta baselines separate orientation, help, conversation, and release context. Each surface has a supplied job, so this is not scored as a failure. Candidates combine them into two member surfaces. Both growing arms retain the existing seven member-facing surfaces, including optional clinic voice, and the existing private boundaries. Counts exclude staff and private-preview channels and are not total server inventories.

## Per-run evidence

Line references below use each generated `plan.md` and its archived private state. Private files are under `raw/<run>/workspace/.community/` in the durable archive. `state.md` is the default filename; exceptions are named. Quotes are verbatim public text, or non-identifying private excerpts. Named operator assignments were checked privately against the packets.

| Run | Journey and review evidence in public plan | Capacity and constraint evidence in private state |
| --- | --- | --- |
| Beta baseline 1 | Lines 26–71 connect arrival, help, and contribution. “If a member cannot file it, a steward may transfer the sanitized summary within available capacity.” Lines 103–109 name unresolved questions and navigation difficulty. | `state.md` 37–57: named 60/45-minute allocations, “proposed spending limits, not measured demand or response promises.” 72–114 preserve external private routes and explicit role boundaries. 141–152 defer integrations/events. |
| Beta baseline 2 | Lines 28–96 connect orientation, help, ideas, and PRs. “No reply does not mean a problem was accepted, resolved, or rejected.” Lines 118–124 review unanswered questions and actual time. | `state.md` 55–75: named 60/45-minute ceilings and overload response. 77–127 preserve routes, private safety boundaries, and no Administrator. 154–160 defer integrations/events. |
| Beta baseline 3 | Lines 24–77 connect the three journeys. “Members can open a clear issue directly without waiting for chat triage.” Lines 95–99 use unanswered questions and routing difficulty. | `state.md` 42–73: 60/45-minute estimates and conditional overload thresholds, explicitly “hypotheses to review, not packet facts.” 88–117 preserve reporting and role boundaries. 152–172 retain privacy and defer events. |
| Beta candidate 1 | Lines 15–38 map journeys before two channels. “A maintainer reply is not required before filing an issue or proposing a documentation correction.” Lines 99–105 use redirects, unanswered passes, and load. | `operating-state.md` 73–103: named response owners, supplied availability, proposed allocations including reserve, setup not silently added. 57–71 and 105–167 preserve routes, no Administrator, and private safety boundaries. |
| Beta candidate 2 | Lines 11–30 map three journeys to two channels. “These are fictional role jobs, not additional staffing positions.” Lines 94–100 defer unsupported work and use observed load. | `state.md` 46–64: named allocations, “not 105 minutes of support plus other duties,” unknown coverage, deferred events/setup. 66–92 preserve source routes and role boundaries. 140–166 keep private reporting and no event commitment. |
| Beta candidate 3 | Lines 11–32 map journeys to two surfaces. “These are job descriptions, not operator assignments or promises of additional staff.” Lines 48–56 distinguish estimates and use workload triggers. | `state.md` 53–80: named 60/45-minute estimates including reserve; “these budgets cannot guarantee resolution.” 82–110 preserve routes and no Administrator. 151–167 preserve private handling and defer optional work. |
| Growing baseline 1 | Lines 29–89 connect arrival, support, ideas, and contributions. “An acknowledgement is not a solution.” Lines 93–111 preserve bounded work and the clinic; 113–139 supply rollback and load review. | `state.md` 50–86 preserve restricted preview tickets, private routes, and roles. 167–189 bind named 90/60 weekly and 60 monthly budgets, unknown SDK time, and incident displacement. 191–203 give unapplied changes/rollback. |
| Growing baseline 2 | Lines 31–85 connect journeys and staff responses. “Do not promise a deadline or depend on an unconfirmed backup.” Lines 101–128 preserve clinic/release context and use queue/time signals. | `operating-state.md` 41–54 distinguish named estimates and confirmed capacity. 56–89 preserve preview, routes, and roles. 158–179 retain the monthly clinic, cancel without a host, and provide exact changes/rollback. |
| Growing baseline 3 | Lines 33–71 give direct help, bug, proposal, and PR routes. “Exclude this role from promised weekly coverage.” Lines 73–108 preserve supplied budgets and clinic; 110–133 use measured review and rollback. | `state.md` 47–60 bind named budgets and unknown SDK coverage. 62–120 preserve restricted routes, permission boundaries, and existing channels. 173–194 preserve clinic and reversible changes. |
| Growing candidate 1 | Lines 15–45 map journeys and existing channels. “A filed issue alone does not mean a problem is resolved or shipped.” Lines 80–110 preserve commitments and use queue age/load review with rollback. | `state.md` 49–74: named 90/60 weekly and 60 monthly allocations, explicit security reserve, unknown SDK time. 76–109 preserve source routes and roles. 189–201 give unapplied changes and safe rollback. |
| Growing candidate 2 | Lines 13–47 link journeys, supplied time, and proposed allocations. “Unknown SDK availability must not become an assumed backup commitment.” Lines 98–130 retain clinic, give rollback, and use queue/time triggers. | `state.md` 45–60 binds named budgets; security interruptions share existing capacity. 62–96 preserves restricted routes and role boundaries. 175–196 retains clinic and exact conditional changes/rollback. |
| Growing candidate 3 | Lines 13–36 map journeys, owner jobs, and budgets. “Do not transfer weekly support work to the clinic host.” Lines 85–110 retain the monthly cadence, rollback, and observation-based triggers. | `operating-state.md` 42–56 binds named work, unknown SDK time, security displacement, and clinic budget. 58–94 preserves private routes and roles. 154–174 retains commitments and safe rollback. |

## Observable execution evidence

[tool-evidence.json](tool-evidence.json) records each tool name, status, path, output hash, and complete local reference read. [executions.json](executions.json) records the exported agent/model/location and unchanged input hashes. All twelve sessions:

- Read the local skill and every bundled reference in full. Every numbered source line in the returned read matched the frozen file.
- Read `.gitignore` as tool 3 before tool 8 created the private state and public draft.
- Created only `plan.md` and one ignored `.community/` state file. Frozen packet, ignore rule, and reference hashes remained unchanged.
- Used only local read, patch, grep, glob, and optional shell checks. Shell commands inspected local Markdown and source files; none attempted network, browser, Discord, delegation, or installed-skill access.
- Left approval absent and live verification untested. Private state remains outside public evidence; public plans omit operator identities and private reporting/preview details.

The artifact checks above do not turn a draft into proof of staffing sufficiency, member usability, permissions, or live route behavior.

## Decision

Adopt as a process and completion-contract clarification. The predeclared static-conflict alternative applies: baseline step 2 required human approval to complete even for a draft-only request. The candidate explicitly completes that request with an unapproved plan and stops before configuration. Both arms already delivered usable drafts and source-grounded capacity plans, so this comparison shows **no criterion-completeness uplift**.

Candidate journeys are co-located before channel choices in all six plans. Beta candidates use two member-facing channels rather than four, but this is a structure observation, not demonstrated usability improvement. Public-plan median words are 1,227 versus 1,108 for beta and 1,883 versus 1,704 for growing. The private template still produces long verification inventories in both arms; this change does not claim to solve that separate reading-load issue.
