# Fictional Discord server audit

## Result and scope

**No observed failures in the supplied snapshot. Verification is incomplete; this is not a launch-readiness approval.** Missing evidence is recorded below as unknown or untested, not as an insecure setting.

- **Mode:** offline, snapshot-only audit. No server changes were authorized or made. No live services, account access, delegation, or member tests were used.
- **Audit date:** 2026-09-17. **Snapshot date:** unknown.
- **Server evidence:** `snapshot.md`, lines 3–20, exclusively. Configuration statements are supplied records, not independently inspected settings or human attestations of runtime behavior.
- **Assessment criteria:** local `skills/discord-community-server/SKILL.md` (steps 1 and A1–A3), `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md`. These files supply criteria, not evidence about the server.
- **Evidence classes:** supplied **role preview** supports static visibility and permission shape only. **Real member** checks require a fresh human-operated non-privileged account. **Human attestation** covers recovery, identity, invite handling, and operational checks. Neither of the latter classes was obtained in this audit. Exact-current Discord labels and platform behavior remain unverified because live documentation is outside scope.

## Project context and reporting routes

The community has **20 invited beta users and two maintainers** (`snapshot.md:3`). Its product surfaces are **command execution** and **build previews** (`snapshot.md:4`). This establishes an invited beta audience, but not a confidential cohort design or future launch plan.

The supplied destinations are:

| Work | Supplied destination | Evidence limit |
| --- | --- | --- |
| Support and bugs | Issue tracker | Route stated; exact destination and published links unavailable. |
| Security reports | Project's private security-reporting form | Route stated; access and delivery untested. |
| Conduct reports | Human owner | Recipient stated; confidential intake mechanism, durable case record, recusal, and backup unknown. |

Sources: `snapshot.md:4–5`. Any later correction should preserve these destinations and the two product-surface names. Product feedback, decisions, persistent documentation, releases, and changelog destinations are unknown. Moderator assignments, response commitments, event cadence, billing/account areas, brand sources, asset ownership, and the managed asset store are not supplied. Two maintainers do not establish moderator coverage or a recovery successor.

## Healthy observations

These are limited to what the snapshot records; no fresh tests were run.

| Observation | Source and evidence class | Supported conclusion |
| --- | --- | --- |
| Community is enabled. | `snapshot.md:9`; supplied configuration | The recorded prerequisite for Community features exists. Their individual setup and member flows are untested. |
| General, announcements, support, and staff channels exist. | `snapshot.md:10`; supplied inventory | A compact structure covers conversation, announcements, support, and staff work. Orientation content and member usability remain unknown. |
| Announcements deny baseline messages, existing-thread replies, public/private thread creation, polls, and invite creation. | `snapshot.md:11`; supplied configuration | The recorded deny set matches the read-only baseline. Effective enforcement and combined-role access are untested. |
| Support requires a member-selectable command execution or build previews tag; workflow-state tags are moderator-only. | `snapshot.md:12`; supplied configuration | The recorded taxonomy and state separation meet the forum invariants. Posting and tag enforcement are untested. |
| Baseline members cannot see staff or unselected opt-in channels in the supplied preview. | `snapshot.md:14`; supplied role preview | These static visibility checks pass within the recorded preview's scope. Conduct-channel isolation and fresh-member behavior are not established. |
| The interest role grants only relevant product channels and notifications, with no privileged permissions. | `snapshot.md:13–14`; supplied configuration and role preview | The recorded interest-role permission-shape check passes. Onboarding assignment behavior is untested. |

## Findings

**None supported by the evidence.** There is no observed failure requiring a corrective finding or priority. The support forum's existence does not demonstrate that support or bugs bypass the issue tracker. Unobserved controls do not demonstrate missing or disabled controls.

## Verification gaps and control coverage

The following groups cover the remaining applicable reference controls and verification-matrix checks. Each names the missing evidence, the required verification class, and its consequence. Suggested verification is future work only; no test or change is authorized by this report.

### 1. Member access and permission inventory — unknown / untested

**Evidence:** `snapshot.md:10–15,19` supplies only the channel inventory and limited previews above.

- **Role preview needed:** all role definitions, hierarchy, category inheritance, exceptions, per-user overrides, and relevant role combinations. Confirm explicit Admin permissions without `Administrator`, limits on ownership/unrelated private work, Moderator separation from integration and unrelated-role management, Maintainer limits on bans/configuration, and any contributor/partner boundaries. Confirm conduct intake is narrower than general staff access and any backup Admin can manage required bot roles.
- **Real member needed:** effective read-only behavior, server-wide member invite restrictions, inability to manage roles/webhooks, useful default channels, and opt-in/voice boundaries. Announcements' invite denial alone does not establish a server-wide restriction. Rules and any release-feed read-only boundaries also need evidence if those channels exist.

**Limit:** the supplied baseline and interest-role previews cannot establish least privilege across the server. Roles needing members are unknown; role names and two maintainers do not prove assignments or coverage.

### 2. Onboarding, orientation, and Server Guide — unknown / untested

**Evidence:** Community is enabled (`snapshot.md:9`), but Onboarding and Rules Screening were not observed (`snapshot.md:16`). Guide configuration and seed content are not supplied.

- **Real member needed:** Rules Screening appearance, valid answers to required questions, safe interest-role assignment, accessible starter tasks, useful default channels, visible forum guidelines, live durable-route links, and readable Server Guide resources backed by read-only channels. Check three concrete starter tasks, product terminology, reporting boundaries, and templates for the actual community jobs.
- **Role preview needed:** global guide resources reveal no confidential cohort content.
- **Human attestation needed:** confirm the Community prerequisite for every planned feature.

**Limit:** a new member's joining and orientation path is unverified. Community-disabled text-channel fallback checks are **not applicable**, because the supplied configuration has Community enabled. Individual Community features are not assumed configured merely because the prerequisite exists.

### 3. Forum lifecycle and durable work — unknown / untested

**Evidence:** `snapshot.md:4–5,12,15` records routes and tag settings but explicitly lacks member posting/tag tests.

- **Real member needed:** post creation requires a product-surface tag; participants cannot apply workflow-state tags; guidelines and route links are visible and usable.
- **Human attestation needed:** staff advance workflow states, link consequential work to the issue tracker, redirect security details to the private form, and remove test content after an authorized lifecycle test.
- **Content evidence needed:** versions, runtime/context, expected and observed results, sanitized reproduction, prior attempts, and restrictions on credentials, personal/customer data, private logs, and confidential redistribution. Custom emoji meanings and consistency need review only if used. Other feedback-like forums need the same tag controls if present.

**Limit:** the recorded forum settings do not prove enforcement or durable follow-through. The security and conduct routes also need human confirmation that they work without Discord access.

### 4. Moderation and safety — unknown / untested

**Evidence:** AutoMod behavior was not observed (`snapshot.md:16`); other safety settings and escalation procedures are not supplied.

- **Configuration evidence / human attestation needed:** verification level, minimum-age policy, moderator/admin MFA, raid protection and CAPTCHA, explicit-content filtering, direct-message safety, escalation and appeal ownership, recusal, and backup conduct handling.
- **Human attestation needed:** intended timeouts/bans/report handling work and audit events identify the acting account. Synthetic non-credential matches for mention spam, suspected spam, abusive language, and unwanted external invites should alert privately. Synthetic credential-like matches should be blocked with a revocation warning and no matched content copied into alerts. Check that rules permit normal technical discussion.

**Limit:** moderation readiness and credential-safe blocking cannot be assessed. No real credentials should be used in future testing.

### 5. Ownership and recovery — unknown / untested

**Evidence:** a human owner is the conduct recipient (`snapshot.md:5`); recovery arrangements were not observed (`snapshot.md:16`).

**Human attestation needed:** human ownership, named human successor, owner MFA and recovery material held outside automation, no shared account, a second human able to recover operations, and approved Admin recovery/configuration actions.

**Limit:** the server's recovery capability and continuity of confidential reporting are unverified. No recovery material is needed in an audit report.

### 6. Invites and any private cohort — unknown / conditionally applicable

**Evidence:** users were invited, but invite settings and private-program design are absent (`snapshot.md:3,17`). An invited beta does not establish separate confidential cohort areas.

- **Human attestation needed:** explicit invite approval, ownership, bounded expiry/use count, human-only handling, temporary membership policy, completed-cohort revocation, and a scheduled post-cohort review. Attestation of a fresh-account test must cover a short-lived single-use invite and rejection of its second use.
- **If a separate private cohort exists:** use **role preview** for category-level baseline denial, explicit access/operational roles, combined-role safety, read-only start permissions, and authorized posting/pinning. Use **real member** checks for baseline invisibility, cohort visibility, and first-new-member access-role assignment when available. Use **human attestation** for current role-assignment capability, manual fallback, and verified existing-member behavior. Confirm confidential access stays out of self-assigned interests/global onboarding and relationship roles remain staff-assigned.

**Limit:** invite control and cohort isolation are unverified. Confidential/public feedback separation is conditional on actual audiences. No invite creation or URL handling is part of this audit.

### 7. Integrations — approval known; inventory unknown

**Evidence:** no integrations were approved (`snapshot.md:17`). This does not establish that none are installed. Which integrations can access community data is **unknown**.

Installation and webhook-delivery tests are **not applicable to this audit-only task**. Existing integration controls remain conditional on an inventory: **role preview** for minimum channel/action permissions, hierarchy, no `Administrator`, and private-area boundaries; **human attestation** for workflow need, provider/privacy policy, data access/retention/deletion/export, owner, update/incident review, removal path, and limits on role assignment. Any release integration also needs intended event/action filtering, separate curated announcements, human-only credential handling, redacted delivery evidence, and cleanup of test messages/temporary webhooks.

**Limit:** no integration safety conclusion is possible. No exposure or recovery incident is reported, so credential-rotation procedures are not triggered. The absence of credentials in this snapshot does not establish their absence elsewhere.

### 8. Assets, events, and operational fit — unknown / conditionally applicable

**Evidence:** `snapshot.md:3–5,10` establishes scale, product terms, and basic channels; it supplies no assets, event plan, or full content inventory.

**Human attestation needed, if assets/events exist:** canonical brand provenance, individual asset review, approved raster/native SVG preservation in a managed store, safe SVG contents and rendered parity, reuse of actual product visuals, and full-series event updates checked at Discord crop sizes. Event plans need a host/backup, cadence, timezone, product-specific agenda, optional/required voice policy, and a durable outcome destination. A **real member** should verify seed content and templates for each planned job.

**Limit:** these optional surfaces cannot be assessed or presumed missing. Channel reordering and its UI troubleshooting are **not applicable** because no reordering is requested or recorded. New channels, apps, assets, or events are not prerequisites for completing this audit.

## Handoff

The audit verifies only consistency of the supplied records with the local controls and the limited static preview results identified above. All runtime, recovery, and operational outcomes remain unverified unless explicitly supported in this report.

The human owner's next useful step is to supply non-secret configuration evidence and attestations for the gaps above. If later authorized and a fresh account becomes available, prioritize effective access, read-only enforcement, forum tag enforcement, Rules Screening, and reporting-route tests before any wider invitation decision. Review again when that evidence is available and before expanding beta access; no review date is supplied.

Only `audit.md` was created. Supplied input files remain unchanged. No server changes were made. No type-check or lint configuration is supplied in this workspace; code checks do not validate this document-only audit.
