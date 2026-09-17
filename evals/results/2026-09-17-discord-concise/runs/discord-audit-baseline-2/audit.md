# Fictional Discord server audit

## Scope and evidence

- **Mode:** Offline, snapshot-only audit (local skill steps A1–A3).
- **Audit date:** 2026-09-17. **Snapshot date:** Unknown.
- **Server evidence:** Only `snapshot.md`, lines 1–20. Statements below describe the supplied record, not a live inspection.
- **Assessment controls:** `skills/discord-community-server/SKILL.md`, `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md`. These define the controls; they provide no additional server evidence.
- **Authorization:** Audit only. No server changes or live tests were authorized or performed. All corrections below are proposals, not applied changes.

The community has 20 invited beta users and two maintainers. Its product surfaces are **command execution** and **build previews** (`snapshot.md:3–4`). Support and bugs belong in the **issue tracker**. Security reports belong in the **project's private security-reporting form**. Conduct reports go to the **human owner** (`snapshot.md:4–5`). These routes must remain authoritative. Their addresses, accessibility, and any confidential conduct record system are unknown.

### Evidence classes and limits

The local verification matrix distinguishes **role preview** (static visibility and permission shape), **real member** (fresh-member behavior), and **human attestation** (human-only checks).

Recorded configuration is supplied evidence, not a newly performed test or independent human attestation. The only supplied role-preview result concerns baseline-member staff visibility. No fresh human test account is available; browser and account access are unavailable (`snapshot.md:14–19`). No real-member result is established. Exact current Discord labels and permission behavior remain unverified because live official documentation is outside scope (`snapshot.md:20`).

## Observed failures

Priority is relative to this small beta community: **High** means an inappropriate privileged permission; **Medium** means a communication or support-routing control failure. The record does not establish exploitation or member harm.

### F1 — Interest role grants Manage Roles — High

- **Evidence:** The interest role has Manage Roles (`snapshot.md:13`; supplied configuration).
- **Control:** `REFERENCE.md:7–17` and `VERIFICATION.md:60–64` limit interest roles to product channels or notifications, without privileged permissions.
- **Impact and rationale:** A personalization role carries role-management authority. This is the highest-priority correction because interest roles should not confer administrative capabilities. Role holders, assignment paths, hierarchy, and effective scope are unknown; a specific escalation path is not proven.
- **Proposed correction — not applied:** Remove Manage Roles from the interest role. Review its remaining permissions and overrides for other privileged grants. Keep any necessary role-management authority in an explicitly authorized operational role. Preserve command execution and build previews as non-privileged interests.
- **Future verification:** **Role preview:** Inspect the interest role and relevant combined roles for intended access and no privileged permissions. **Real member:** Confirm a non-privileged member with the interest role cannot manage roles or webhooks. If Onboarding assigns it, verify that answers grant only intended roles and channels. These checks are untested here.

### F2 — Members can post in announcements — Medium

- **Evidence:** Announcements allow member messages (`snapshot.md:11`; supplied configuration).
- **Control:** `REFERENCE.md:23–27` requires announcements to be read-only for members; `VERIFICATION.md:13` defines behavioral read-only checks.
- **Impact and rationale:** Member posts can obscure or confuse authoritative beta updates. This undermines the channel's purpose even at this community's small size.
- **Proposed correction — not applied:** Make announcements read-only for baseline members and other non-operational roles. Retain posting for explicitly authorized maintainers or other operational roles. Review overrides and combined roles so they do not restore member posting.
- **Future verification:** **Role preview:** Check the static permission shape for baseline and relevant combined roles. **Real member:** Confirm announcements reject messages, existing-thread replies, public and private thread creation, polls, and invite creation. Verify authorized staff can still publish through **human attestation**. Only member-message permission is established as failing; other posting paths remain untested.

### F3 — Support forum does not require tags — Medium

- **Evidence:** The support forum has no required tags (`snapshot.md:12`; supplied configuration). This does not establish whether optional tags exist.
- **Control:** `OPERATIONS.md:26–33` and `VERIFICATION.md:73–79` require a member-selectable purpose, package, or domain tag and reserve workflow-state tags for moderators.
- **Impact and rationale:** Untagged questions make it harder for two maintainers to route support across command execution and build previews. The snapshot does not show an existing routing backlog.
- **Proposed correction — not applied:** Require at least one member-selectable domain tag. Use command execution and build previews where suitable, preserving any useful existing taxonomy after review. Keep workflow-state tags moderator-only. Forum guidance should direct support and bugs to the issue tracker, security details to the private security-reporting form, and conduct reports to the human owner. Discord discussion must not replace these routes.
- **Future verification:** **Real member:** Confirm an untagged post is rejected, a domain-tagged post succeeds, guidelines are visible, and workflow-state tags cannot be applied by a participant. **Human attestation:** Confirm staff can advance any planned states, link durable work, route security details privately, and remove test content afterward. All behavioral checks remain untested.

## Healthy observations and bounded results

| Observation | Source and evidence class | What it establishes |
| --- | --- | --- |
| Community is enabled. | `snapshot.md:9`; supplied configuration. The matrix assigns prerequisite confirmation to human attestation. | The prerequisite is recorded as present. This does not prove Onboarding, Rules Screening, or Server Guide work. |
| General, announcements, support, and staff channels exist. | `snapshot.md:10`; supplied configuration. | A compact set of conversation, updates, support, and staff surfaces is recorded. Channel usefulness and content quality are untested. |
| Baseline-member role preview hides staff channels. | `snapshot.md:14`; supplied **role preview**. | **Passed within the recorded preview's narrow scope.** It does not prove conduct privacy, multi-role isolation, or fresh-member visibility. |
| Support, bug, security, and conduct routes are named. | `snapshot.md:4–5`; supplied project policy. | Intended destinations are known. Published guidance, link behavior, and access without Discord are untested. |
| No integrations were approved. | `snapshot.md:17`; supplied approval status. | No integration approval is recorded. This does not establish that no apps, bots, or webhooks are installed. |
| No invite or credential is included. | `snapshot.md:17` and the supplied document. | The input contains no such material. Historical handling and live server settings are not verified. |

## Unknown and unavailable checks

Missing evidence is not a failed setting. The following checks are **untested**, unless explicitly marked otherwise. Future verification methods describe evidence needed after separate authorization; they are not requests to run tests during this audit.

| Area and gap | Evidence or reason | Future evidence class and verification | Residual impact |
| --- | --- | --- | --- |
| Full role inventory, hierarchy, overrides, Administrator grants, maintainer permissions, role membership, and combined-role access | `snapshot.md:3,13–14` covers only maintainer count, one role grant, and one preview. | **Role preview:** Review explicit permissions and relevant combinations, including any Admin, Moderator, contributor, partner, or bot roles. **Human attestation:** Confirm authorized operational duties and role assignments. | Least privilege is not established beyond the limited observations. Which roles need members is unknown. |
| Staff, conduct, and opt-in isolation | Only baseline staff preview is supplied (`snapshot.md:14`). | **Role preview:** Check conduct and opt-in boundaries and combinations. **Real member:** Confirm effective visibility. | The baseline preview cannot establish all private boundaries. |
| Onboarding and Rules Screening | Explicitly not tested (`snapshot.md:16`); Community is enabled. | **Real member:** Check rules acceptance, valid answers, non-privileged interest assignment, useful defaults, and accessible starter tasks. | New-member orientation and access assignment remain unverified. These checks are not exempt because Community is enabled. |
| Server Guide, backing resources, welcome content, and support templates | No evidence in `snapshot.md`. | **Role preview:** Check confidential content stays out of the global guide. **Real member:** Check resource rendering, read-only behavior, links, and templates requesting versions, runtime, expected/observed results, and sanitized reproductions. | Members may lack clear guidance; no content defect is established. |
| Voice, billing/account areas, and other sensitive opt-ins | Voice is explicitly untested (`snapshot.md:16`); existence of separate areas is unknown. | **Role preview** and **real member:** Verify planned access and opt-in boundaries if such areas exist. | Applicability and effective boundaries remain unknown. |
| Native safety controls and AutoMod | No configuration evidence is supplied. | **Human attestation:** Verify verification level, age policy, moderator MFA, raid protection, content/DM safety, safety actions, and audit attribution. Use synthetic moderation checks: non-credential alerts stay private; credential-like matches are blocked with a revocation warning and are not copied to alerts. | Spam, abuse, raid, and credential-handling protections are unknown, not proven absent. |
| Reporting destinations and moderation operations | Intended routes only (`snapshot.md:4–5`); no response commitments, moderator coverage, escalation, appeals, or recusal details. | **Real member:** Check published route links. **Human attestation:** Verify security and conduct access without Discord, confidential durable conduct records, owner intake, backup/recusal paths, and response ownership. | Durable routing and continuity cannot be confirmed. Preserve the human owner as conduct intake. |
| Ownership and recovery | Human owner is named by role, not identity (`snapshot.md:5`); no successor or recovery evidence. | **Human attestation:** Confirm human ownership, owner MFA, recovery materials outside automation, no shared account, and a human successor. **Role preview:** Check backup operational permissions and hierarchy. | Two maintainers do not establish a recovery successor. |
| Invites and private-beta access | Twenty invited users are recorded, but no invite settings or attestations (`snapshot.md:3,17`). | **Role preview:** Inspect member invite permissions. **Real member:** Verify members cannot create invites where prohibited. **Human attestation:** Verify approval, expiry/use limits, appropriate persistence, and human-only handling. A separately authorized fresh-member test would require a human-handled short-lived, single-use invite and attested second-use rejection. | Existing invitation controls and join behavior are unknown. No invite creation is authorized here. |
| Confidential cohort category, start channel, feedback lifecycle, and cohort role assignment | Invited beta users do not establish a separate confidential cohort design. | **Applicability unknown.** If present, use **role preview** for category and combined-role permissions, **real member** for baseline exclusion, cohort access, read-only start behavior, and new-member assignment; use **human attestation** for manual assignment, existing-member handling, and cleanup. | Do not infer a private cohort exists or require new cohort channels from this snapshot. |
| Installed integrations and their data access | No approval does not prove absence (`snapshot.md:17`). | **Human attestation:** Establish inventory, owners, purpose, privacy/data boundary, retention, and removal paths. **Role preview:** Verify minimum channel access and no Administrator. If release webhooks exist, obtain redacted human attestations for intended events and credential handling. | Which integrations can access community data remains unknown. No app or webhook is authorized. |
| Assets, canonical brand sources, managed asset storage, events, hosts, and cadence | No evidence in `snapshot.md`. | **Applicability unknown. Human attestation:** If used, verify canonical sources, reviewed assets, preserved raster/vector sources, managed storage, and hosted event series with live crop checks. | No branding or event failure can be asserted; no event is required by this audit. |
| Review schedule and launch acceptance | No review date or acceptance evidence. | **Human attestation:** Record a review after corrections and required member checks, before wider invitations. | The audit does not establish launch readiness. |

**Not applicable:** The Community-disabled text-channel fallback checks in `VERIFICATION.md:34–37`, because the snapshot records Community as enabled. A greenfield operating plan, long-lived state file, app installation, event creation, and launch acceptance are outside this audit's completion criteria.

## Handoff

- **Changed:** Only this local `audit.md` report was created. Supplied input files were left unchanged. No server changes were made.
- **Verified against the supplied record:** Three configuration failures; the narrow recorded staff-visibility preview; the Community prerequisite; channel presence; and intended durable routes. No live configuration or real-member behavior was independently verified.
- **Remaining human actions, if later authorized:** Address F1 first, then F2 and F3. Collect non-secret permission and operational evidence for the gaps above. Use a fresh human-operated, non-privileged account for behavioral checks; keep invite and credential handling outside automation.
- **Review timing:** Re-audit after corrections and fresh-member evidence are available, and before expanding the beta. No scheduled review date is supplied.
- **Verification limits:** Offline only; unknown snapshot date; no browser, account, fresh-member test, live documentation, or independent attestation. Exact current feature labels remain unverified. No untested check is counted as passed, and this report is not a launch approval.

The audit ends at A3. No implementation or modifying verification was performed. Type-check and lint do not apply to this Markdown-only audit; no project checker configuration was supplied.
