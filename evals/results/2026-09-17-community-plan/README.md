# Member journeys and staff capacity

**Adopt as a clarification, with no measured completeness uplift.** All six baseline and six candidate plans pass the frozen source criteria. The candidate resolves step 2's draft-only completion conflict and makes journey-first planning explicit. The batch completed without failures, exclusions, or retries.

The [source scores and quoted evidence](scores.md) cover all twelve plans. Candidate beta drafts use two member-facing channels versus four in each baseline. Both growing-project arms preserve existing channels, the supported monthly clinic, and unknown SDK availability. These are paper-plan results, not measured member outcomes or workload savings.

## Scope and method

This is a planning-only offline comparison, not a live Discord workflow evaluation. Two fictional packets cover a 20-member greenfield beta and an existing growing project. The latter includes unknown SDK availability, a supported monthly docs clinic, observed redirects, and unanswered dashboard questions.

- Baseline: `ef6f9456`, the merged 0.9.0 release.
- Candidate: the `SKILL.md` and `STATE-TEMPLATE.md` hashes in [freeze.json](freeze.json). No candidate edits followed the freeze.
- Model and agent: `openai/gpt-6-astra#medium`, `build`.
- Design: three fresh sessions per arm per packet; twelve total, with at most three concurrent.
- Inputs: identical packets and requests across arms. Prompts request a sustainable draft; they do not prescribe a journey table.
- Isolation: fresh sibling jj clones, stripped of history, review material, and unrelated files before model access. Each packet supplies an ignore rule for private state.
- Evidence: exported session identity, unchanged input hashes, exact local read checks, actual tool actions, and manual source review. No model grader.

The [frozen plan](PLAN.md) defines criteria and adoption rules. [Sprig](inputs/beta.md) and [Tideway](inputs/growing.md) preserve the fictional source context. [run.ts](run.ts) records execution; [evidence.ts](evidence.ts) extracts tool and read evidence without grading prose. A neutral API preflight verified the live OpenAPI paths before the batch.

Full exports, private operating states, and source snapshots are archived outside the repository at `/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/community-plan-evidence-20260917`. Public artifacts omit hidden reasoning and private operating-state contents. Source review uses both the sanitized plans and archived private state.

See [executions.json](executions.json) for session identities and immutable input hashes, and [tool-evidence.json](tool-evidence.json) for exact local read checks. Every trial read the ignore rule before creating private state. All trial clones were removed after their outputs were archived. No additional model batch or candidate revision was run.

## Static scope checks

The Guardrails section, audit steps A1–A3, and `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md` remain byte-identical to baseline. The new requirements apply only to greenfield and improvement planning. The draft-only completion branch resolves the previous conflict between a draft request and step 2's mandatory approval criterion.

## Repository verification

Root and nested walkthrough dependencies installed with frozen lockfiles. `bun run check` passed type checking, lint, all 40 tests, and repository/plugin validation. Both new evaluation scripts also passed an explicit strict TypeScript check with Node and Bun types and `allowImportingTsExtensions`. The 0.9.0 manifests and released changelog history remain unchanged; this is new Unreleased work.

## Limits

Automatic invocation, real member navigation, effective permissions, live configuration, current official Discord labels, and actual route delivery were not evaluated. Community status is a supplied planning assumption. Audit cases were not rerun because their source is unchanged. A complete paper plan does not establish adequate staffing in operation. Word and channel counts are descriptive, not quality scores.
