# Concise Discord audit reports

**Adopted the frozen candidate.** Median report length fell from **2,032 to 1,434 words (29.4%)**.
All six candidate audits passed the existing source criteria and manual compression-completeness review.
The same-batch baseline also passed every source criterion.
This is a report-size and completeness proxy for page usability, not evidence of reduced user task time.

## Change and frozen gate

Baseline: `2d31f953`, whose Discord skill already contains audit steps A1–A3.
The candidate adds two presentation paragraphs in A1 and A2: a brief evidence summary, grouped unknowns, and complete findings stated together.
It retains full control assessment and allows a full matrix when requested or needed to distinguish statuses.
There is no hard word cap, new report-file requirement, or fixture-specific rule.

The [frozen plan](PLAN.md) required all six candidate reports to preserve the source/evidence/mode-fit criteria and material restrictions.
It also required at least a 25% reduction in median words against this same batch's baseline.
Both conditions passed. The candidate was neither tuned nor rerun after semantic outcomes.
The active skill matches the frozen candidate SHA-256 `f1c4afd3ea69b71823f060f289dbfc15e2510e8087ac8106ff04e05b4bc86209`.

## Results

Words use `text.trim().split(/\s+/).length`, matching the previous report's whitespace counting.

| Snapshot | Baseline words, repeats 1–3 | Candidate words, repeats 1–3 | Baseline median | Candidate median |
| --- | --- | --- | --- | --- |
| Three recorded defects | 2,020 / 2,044 / 2,279 | 1,626 / 1,470 / 1,349 | 2,044 | 1,470 |
| Healthy but incomplete | 1,841 / 2,057 / 1,869 | 1,897 / 1,172 / 1,398 | 1,869 | 1,398 |
| Combined | Range 1,841–2,279 | Range 1,172–1,897 | 2,032 | 1,434 |

| Source criterion | Baseline | Candidate |
| --- | --- | --- |
| Read-only, no claimed server changes | 6/6 | 6/6 |
| Audit-mode completion without setup requirements | 6/6 | 6/6 |
| Complete findings or no invented failures | 6/6 | 6/6 |
| Scope, as-of, sources, separate unknowns | 6/6 | 6/6 |
| Preview/member distinction and current-label limits | 6/6 | 6/6 |
| Product terms and durable reporting routes | 6/6 | 6/6 |
| Manual compression completeness | 6/6 | 6/6 |

All six defect reports retained writable announcements, missing required tags, and privileged interest-role permissions from snapshot lines 11–13.
Each finding includes evidence, community impact and priority rationale, an unapplied correction, and classified verification.
Posting verification retains messages, thread replies/creation, polls, and invites. Forum corrections preserve member-selectable domain tags and moderator-only state tags.
All six healthy reports retained the snapshot's restrictions and limited previews without inventing failures from unobserved controls.

For example, defect candidate 2 states, “Other posting capabilities are unknown,” then names every required posting-denial check.
Healthy candidate 2 says, “Missing evidence is not proof of a missing or insecure control.”
Both preserve the issue tracker, private security form, and human conduct owner.
[Per-run reviews](reviews.json) and [scores](scores.json) quote exact output lines for all verdicts.
The score script validates these manual judgments and report completeness; it does not grade prose truth.

## Execution and evidence

Twelve fresh `openai/gpt-6-astra#medium` build sessions completed, three per fixture and arm, at most three concurrent.
The [exact neutral task prompt](freeze.json) is unchanged from the previous audit study.
Each session received a fresh sibling jj clone stripped to `snapshot.md` and local Discord skill files.
History, evals, rubrics, and previous reports were withheld.

The previous runner used obsolete wait/export endpoints. Its first twelve attempts were interrupted after HTTP 404 responses.
Recovered exports confirm **zero input, output, reasoning, and cache tokens, with no visible content**, in every attempt.
Each received its one permitted fresh infrastructure retry after correcting those endpoint paths. No semantic retry occurred.
[Infrastructure evidence](infrastructure-evidence.json) preserves those attempts; raw exports remain archived.

Exports verified the explicit API location, build agent, and model in all completed sessions.
All input hashes remained unchanged. [Tool evidence](tool-evidence.json) verifies complete hash-matched reads of the skill and three references in every run.
Every visible tool action was reviewed: local reads and one `audit.md` creation per session.
There were no installed skill substitutions, external reads, network/browser/server calls, or other writes.
Three sessions corrected out-of-range reads of their finished reports.

The [guard comparison](guard-evidence.json) confirms byte-identical frontmatter, discovery, guardrails, A3 handoff, steps 2–8, shared handoff, and bundled references.
[Input snapshots](inputs/), [session identities](executions.json), [summary](summary.json), and each `runs/<id>/audit.md`, `transcript.md`, and `report.json` preserve the evidence.
Public transcripts exclude hidden reasoning.

## Limits and verification

- Candidate healthy repeat 1 is longer than its paired baseline, with eight detailed coverage sections. All candidates still contain substantial unknown-control inventories. The change reduces median length without establishing uniformly brief reports.
- This is manual source review by the implementing session, not an independent blind grader. Twelve runs on two fixed offline snapshots do not establish general reliability.
- Live Discord, exact-current labels, greenfield/improvement workflows, and routing evaluations were not rerun. No external platform facts were updated.
- Verified root and nested frozen installs, `bun run check` (type-check, lint, 40 tests, repository validation), strict TypeScript checks for the new evaluation scripts, and all twelve existing source-report score validations.

Raw exports and exact packets are retained under ignored `.evals/discord-concise` and:
`/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/discord-concise-evidence-20260917`.
Owned trial clones were removed after archival. Previous historical results remain unchanged.
