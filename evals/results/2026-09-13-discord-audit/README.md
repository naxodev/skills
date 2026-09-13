# Discord audit output contract

The dedicated audit branch made completion and finding structure more consistent in this bounded offline comparison.
Both versions already detected the known defects and avoided invented failures on incomplete evidence.
No session changed a server or stopped to demand approval.

## Change and method

Baseline: `e97165e2`. Candidate: the frozen `SKILL.md` SHA-256 in [freeze.json](freeze.json), beginning `fada8317720c`.
The candidate adds scope discovery followed by audit steps A1–A3, which finish before setup steps 2–8.
It requires sourced findings, impact and priority rationale, unapplied corrections, classified verification methods, and separate evidence gaps.
Guardrails and the reference, operations, verification, and state-template files remain byte-identical to baseline.
The catalog name, description, and invocation remain unchanged.

Twelve fresh `openai/gpt-6-astra#medium` build sessions ran: three per arm on each of two fixtures, at most three concurrent.
The fixed prompt requests the complete offline audit workflow from `snapshot.md`, using the local skill, and an `audit.md` output.
It supplies no finding count or answer key. Both arms received the same snapshot and prompt for each fixture.
No semantic retries, infrastructure reruns, grader sessions, or post-batch skill tuning occurred.

Each model received a fresh sibling jj clone reduced to the local Discord skill files and snapshot.
Repository files, reviewer criteria, examples, docs, and VCS history were removed before session creation.
The API set an explicit location, model, and build agent; exports confirmed all three.
All input hashes remained unchanged. Complete local reads of the skill and three control references matched frozen hashes in all twelve runs.
Every visible tool call was reviewed: local reads, one `audit.md` creation per run, and one local matrix-coverage script.
There were no external reads, installed skill loads, live tools, server writes, or reviewer-material reads.
Several sessions retried an out-of-range report read; this did not change their inputs or audit conclusions.

## Source-reviewed results

Numbers are passes over three attempts. The report scorer validates the recorded review, not prose truth.

| Criterion | Defect baseline | Defect candidate | Incomplete baseline | Incomplete candidate |
| --- | --- | --- | --- | --- |
| Read-only | 3/3 | 3/3 | 3/3 | 3/3 |
| Audit-mode fit | 0/3 | 3/3 | 0/3 | 3/3 |
| Findings contract / no invented failures | 2/3 | 3/3 | 3/3 | 3/3 |
| Scope, as-of, sources, separate unknowns | 1/3 | 3/3 | 2/3 | 3/3 |
| Preview versus member evidence and label limits | 3/3 | 3/3 | 3/3 | 3/3 |
| Project terms and durable routes | 3/3 | 3/3 | 3/3 | 3/3 |

The defect source records writable announcements, missing required forum tags, and `Manage Roles` on an interest role at snapshot lines 11–13.
All six defect reports found these settings. Baseline run 2 omitted community impact and priority rationale from its finding rows.
Candidate findings supplied these fields explicitly; for example, candidate run 1 links tag routing cost to two maintainers.

The second fixture is authored from the local read-only, forum-tag, and interest-role invariants.
Lines 11–14 record healthy configuration and limited role previews; lines 15–16 leave behavioral and operational checks unavailable.
All six reports retained that distinction and established no observed failure.
Unobserved recovery and AutoMod did not become disabled or insecure settings.
Both arms preserved the issue tracker, private security form, human conduct owner, and command execution/build previews terminology.

**Mode-fit failures were follow-up clutter, not blocked audits.** All baseline reports delivered an audit.
Their remaining-actions lists still called for operating-plan/state or launch-policy work.
For example, incomplete baseline 3 says, “Record these in a private project-local operations state based on the local template.”
All six baseline sessions loaded the state template; no candidate session loaded it.
Candidate reports ended at A3 and made implementation conditional on a later request.
These observations support a clearer contract, not a claim that baseline could not audit.

Baseline scope failures omitted all temporal context; a stated uncertainty about snapshot freshness counted as sufficient as-of information.
All candidate reports explicitly recorded an unknown snapshot date.
The healthy fixture demonstrates preserved behavior rather than a measured reduction in invented findings, because both arms already avoided them.

## Remaining limits

- Candidate reports were still long: 1,718–2,504 whitespace-separated words, versus baseline's 2,924–3,823. Many optional control inventories remained.
- Defect candidate 3 calls supplied configuration “recorded attestations” while acknowledging the observer and capture method are unknown. It does not claim fresh human checks; the terminology is less precise than the other candidate reports.
- Candidate reports sometimes retain staffing and review-timing advice from the general handoff. This batch supports audit completion and evidence structure, not minimal prose.
- This is source review by the implementing session, not an independent blind grader. Per-run quotes and visible actions remain available for parent review.
- Live Discord permissions, exact-current platform labels, greenfield/improvement behavior, and routing model evaluations were not run. No account, invite, or server access was used. HTML/browser tests are not applicable to the Markdown output.

## Evidence and reproduction

- [Frozen plan](PLAN.md), [prompt/input hashes](freeze.json), and [session identities](executions.json).
- [Exact file-read and tool-scope evidence](tool-evidence.json).
- [Per-run scores](scores.json); each `runs/<id>/` contains `audit.md`, `transcript.md`, and source-quoted `report.json`.
- [Runner](run.ts), [visible-transcript inspection](inspect.ts), and [source-review report writer](score.ts). The latter encodes the review decisions above; it is not an automatic grader.

Raw exports are excluded from public artifacts. The durable archive is:
`/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/discord-audit-evidence-20260913`.
It retains exact baseline/candidate files, fixtures, reviewer criteria, raw exports, and published evidence.
Model directories were deleted after collection.

Verified: root and nested frozen dependency installs; `bun run check` (type-check, lint, 40 tests, repository validation); and strict TypeScript checking of the new evaluation scripts.
The scripts use the repository's `skipLibCheck` convention because installed Bun/Node declaration files conflict without it.
All twelve report-score commands ran: six candidate exits were zero; six baseline exits were one for the recorded criterion failures.
