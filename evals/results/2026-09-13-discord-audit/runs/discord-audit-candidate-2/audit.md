# Fictional Discord server audit

## Verdict and scope

The snapshot records three control failures. The highest priority is removing `Manage Roles` from the interest role. Writable announcements and missing required support-forum tags also need correction.

This is an offline, snapshot-only audit, following steps A1–A3 of the local skill. No server changes were authorized or made. All corrections below are proposals, not applied changes. This report does not establish launch readiness.

- **Audit date:** 2026-09-13.
- **Snapshot date:** Unknown. The observations have no timestamp.
- **Server evidence:** Only `snapshot.md`, lines 1–20. No repository, account, browser, or live-service evidence was used.
- **Audit criteria:** `skills/discord-community-server/SKILL.md`, `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md`, read directly from this workspace.
- **Limits:** Browser and account access are unavailable. No fresh human test account is available. Current official documentation was not consulted. Exact-current Discord labels and permission behavior remain unverified.

## Community context and reporting routes

| Item | Supplied evidence |
| --- | --- |
| Audience and stage | 20 invited beta users and two maintainers; invited beta stage (`snapshot.md:3`). Future public-launch intent is unknown. |
| Product surfaces | **Command execution** and **build previews** (`snapshot.md:4`). |
| Support and bugs | Both belong in the **issue tracker** (`snapshot.md:4`). Discord must not become their only record. |
| Security reports | The project's **private security-reporting form** (`snapshot.md:5`). |
| Conduct reports | The **human owner** (`snapshot.md:5`). The confidential durable record, backup, and recusal route are unknown. |
| Structure | Community enabled; general, announcements, support, and staff channels exist (`snapshot.md:9–10`). Support is a forum (`snapshot.md:12`). |
| Staffing | Two maintainers are recorded. Moderator assignments, successor, response commitments, and event cadence are unknown. |

The snapshot supplies route names, not destinations or working links. Feedback, product-decision, documentation, and release destinations are unknown. Voice, billing, account-support, and confidential-cohort requirements are also unknown. Invited beta membership alone does not prove a separate confidential program exists.

## Evidence classification

- **Supplied configuration:** Recorded settings can establish a snapshot-level failure against the local criteria. They are not fresh UI observations or completed behavioral tests.
- **Role preview:** The snapshot explicitly records only baseline staff-channel visibility. This proves that narrow preview result, not fresh-member behavior or every role combination.
- **Real member:** No results are available. The required fresh human-operated non-privileged account is unavailable (`snapshot.md:15`).
- **Human attestation:** No explicit recovery, invite-handling, or operational-test attestations are supplied. Descriptive configuration statements are retained as supplied evidence, not promoted into completed attestation checks.

Priorities below are audit judgments: **P1** means address first because it grants configuration authority; **P2** means correct the community workflow before treating it as reliable. No exploitation or member incident is asserted.

## Observed failures

### F1 — P1: The interest role grants `Manage Roles`

- **Fact and source:** `snapshot.md:13` records `Manage Roles` on the interest role. Evidence class: supplied configuration. Snapshot-level result: **failed**.
- **Criterion:** `REFERENCE.md:7–17` limits interest roles to personalization and opt-in access, excluding privileged permissions. `VERIFICATION.md:60–64` requires a non-privileged interest role.
- **Impact and priority:** A personalization role grants role-management authority. This is the highest priority for a beta with only two maintainers. The hierarchy, role holders, assignability, and effective scope are unknown; arbitrary escalation or staff access is not demonstrated.
- **Proposed correction — not applied:** Remove `Manage Roles` and any other privileged permissions from the interest role. Keep it limited to intended command execution or build previews channels and notifications. Review its assignment paths, hierarchy, and combined permissions. Keep privileged and confidential-access roles outside interest selection.
- **Verification after separately authorized correction:** **Role preview** should show only intended interest access and no privileged permissions, including relevant role combinations. A **real member** with baseline and interest roles should be unable to manage roles or webhooks. If onboarding assigns this role, a fresh member should receive only the intended non-privileged access. These checks remain untested.

### F2 — P2: Announcements allow member messages

- **Fact and source:** `snapshot.md:11` records member posting in announcements. Evidence class: supplied configuration. Snapshot-level result: **failed**.
- **Criterion:** `REFERENCE.md:21–27` and `SKILL.md:131` require member-read-only announcements.
- **Impact and priority:** Member posts can obscure official beta updates and weaken the channel's meaning as an authoritative source. This is a reliability failure; the snapshot reports no actual misuse.
- **Proposed correction — not applied:** Make announcements read-only for members while preserving posting for explicitly authorized operational roles. Review inherited permissions, channel exceptions, and role combinations. Include replies, thread creation, polls, and invite creation in the read-only boundary.
- **Verification after separately authorized correction:** **Role preview** should show the intended static permissions for baseline and relevant combined roles. A **real member** should be unable to send messages, reply in existing threads, create public or private threads, create polls, or create invites in the channel, as specified by `VERIFICATION.md:13`. The snapshot establishes only the message-permission failure; other actions remain untested.

### F3 — P2: The support forum does not require tags

- **Fact and source:** `snapshot.md:12` records no required tags. Evidence class: supplied configuration. Snapshot-level result: **failed**. This does not establish that no tags exist.
- **Criterion:** `OPERATIONS.md:26–34` requires a member-selectable purpose, package, or domain tag before posting and reserves workflow-state tags for moderators.
- **Impact and priority:** Untagged questions can lose product context and slow routing across command execution and build previews. This adds avoidable triage work for two maintainers.
- **Proposed correction — not applied:** Require at least one relevant member-selectable tag. Use **Command execution** and **Build previews** where suitable, preserving any useful existing taxonomy. Keep any workflow-state tags moderator-only. Guidelines should request version, runtime, expected and observed results, and a sanitized reproduction. Keep support and bugs in the issue tracker, security details in the private security-reporting form, and conduct reports with the human owner.
- **Verification after separately authorized correction:** A **real member** should see tags and guidelines, be blocked from posting without a qualifying tag, succeed with one, and be unable to apply moderator-only states. **Human attestation** should confirm staff can advance any planned states, link durable issue-tracker work, use the private security route, and remove test content. No posting or lifecycle test was performed. Existing guidelines and state-tag restrictions are unknown, not additional observed failures.

## Healthy observations and narrow passes

| Observation | Evidence and status | What it does not prove |
| --- | --- | --- |
| Staff channels are hidden from the baseline member in role preview | `snapshot.md:14`; **passed, supplied role preview only** | Conduct isolation, real-member access, interest-role access, and multi-role combinations remain untested. |
| Community is enabled | `snapshot.md:9`; recorded prerequisite satisfied | No completed human-attestation prerequisite check; feature configuration and member flows are unverified. |
| Four named community surfaces exist | `snapshot.md:10–12`; supplied structural evidence | Useful defaults, seed content, correct channel types beyond support, and effective permissions are unverified. No channel expansion is justified by this snapshot. |
| Reporting routes are identified | `snapshot.md:4–5`; supplied routing intent | Published links, accessibility without Discord, and durable handling are unverified. |
| No integrations were approved | `snapshot.md:17`; supplied approval status | This does not establish an empty installation inventory or zero data access. |
| No invite or credential is included | `snapshot.md:17`, consistent with the supplied text | This does not establish safe historical handling or the absence of exposures elsewhere. |

## Separate gaps and unavailable checks

All entries below are **unknown or untested**, unless explicitly marked not applicable. Missing evidence is not a failed setting. Verification classes identify future evidence needed, not work authorized by this audit.

| Area and snapshot basis | Gap or status | Verification class and consequence |
| --- | --- | --- |
| Access inventory (`13–14` only) | Full role definitions, hierarchy, overrides, role holders, `Administrator`, webhook management, private and opt-in access, and role combinations are unknown. | **Role preview** for static shape; **real member** for effective boundaries. Baseline staff preview cannot establish least privilege across the server. |
| Ownership and recovery (`3`, `5`) | Human owner route is named, but owner MFA, recovery, successor, shared-account status, and backup authority are unknown. | **Human attestation** for identity and recovery; **role preview** for backup hierarchy. Do not inspect recovery material. Operational continuity is unverified. |
| Moderation (no supplied settings) | Verification level, minimum-age policy, moderator MFA, raid protections, content filtering, DM safety, and AutoMod coverage are unknown. Moderator powers and audit attribution are unknown. | **Role preview** for permissions; **human attestation** for settings and safety actions. Abuse response readiness is unverified. |
| AutoMod data handling (no supplied settings) | Mention spam, suspected spam, abusive language, unwanted invites, and credential-like strings have no evidence. Alert privacy and credential-match handling are unknown. | **Human attestation** using synthetic matches only: non-credential alerts go privately; credential-like matches are blocked with a revocation warning and are not copied into alerts. No synthetic tests are authorized here. |
| Conduct and security (`5`, `14`) | Working private intake, conduct recusal and backup, durable conduct records, and access without Discord are unknown. Staff preview does not establish conduct-channel isolation. | **Role preview** for narrower conduct access; **real member** for published routes; **human attestation** for independent access and private handling. Confidential reporting readiness is unverified. |
| Rules Screening and Onboarding (`9`, `15–16`) | Explicitly not tested. Appearance, valid answers, safe role assignment, and starter tasks are unverified. | **Real member**; **human attestation** for Community prerequisites. Community is enabled, so these are not dismissed as inapplicable. A new user's join path is unverified. |
| Server Guide (no supplied configuration) | Presence, intended resources, backing channels, links, and confidential-content exclusions are unknown. | **Real member** for resource rendering and destinations; **role preview** for confidential exclusions. Orientation quality is unverified. |
| Voice and default channels (`10`, `16`) | Voice is explicitly untested; whether it exists or is planned is unknown. Opt-in behavior, noise, and useful defaults are untested. | **Real member** for behavior; **role preview** for static opt-in visibility. No voice pass or definitive not-applicable result is justified. |
| Forum lifecycle and content (`12`) | Tag availability, workflow restrictions, guidelines, seed templates, durable linking, and staff handling are unknown beyond F3. | **Real member** for posting and tags; **human attestation** for staff states, private security routing, and test cleanup. End-to-end support handling is unverified. |
| Invites and private-beta boundaries (`3`, `17`) | Approval history, expiry, use limits, member invite permissions, temporary membership, revocation, and human-only handling are unknown. | **Human attestation** for non-secret invite facts and reuse rejection; **real member** for inability to create invites. No invite URL or invite UI interaction is needed for this report. |
| Confidential cohort (no supplied configuration) | A separate private category, start channel, feedback forum, access role, and role-assigned invite capability are not established. Conditional applicability remains unknown. | If present: **role preview** for category and combined-role permissions; **real member** for baseline exclusion, cohort visibility, read-only boundaries, and first-new-member assignment; **human attestation** for existing-member checks and manual fallback. No private area is proposed solely because users are invited. |
| Apps, bots, and webhooks (`17`) | Approval status is known; installation inventory, permissions, data access, owners, retention, removal paths, and release-event filters are unknown. | **Role preview** for installed integration access; **human attestation** for inventory and operations. Which integrations can access community data cannot be determined. Installation and webhook testing are not applicable to this audit-only task. |
| Assets and events (no supplied evidence) | Canonical brand, shared asset store, raster/vector preservation, review, event existence, cadence, hosts, and full-series updates are unknown. | **Human attestation**, if these features exist or are planned. Applicability is unknown; no asset or event creation is needed for audit completion. |
| Launch acceptance (`15–19`) | No fresh-member results, residual-risk acceptance, or review date is supplied. | **Real member** and **human attestation** per the local matrix. Launch readiness is unverified. Invite creation and launch acceptance are not applicable to this audit-only deliverable. |
| Community-disabled fallbacks (`9`) | **Not applicable:** Community is recorded as enabled. | The disabled-Community branch of `VERIFICATION.md:34–37` does not apply. |
| Exact-current platform details (`20`) | **Unverified:** live official documentation is outside scope. | Before future implementation, check current official documentation for labels and behavior. Permission names here reproduce the supplied evidence or local criteria, not a live UI walkthrough. |

## Handoff and verification limits

- **Changed:** Created only `audit.md`. Supplied input files were left unchanged. No server settings, messages, roles, apps, events, invites, or credentials were changed or tested.
- **Verified from the snapshot:** Three recorded settings violate the local criteria. The supplied baseline role preview hides staff channels. Community enablement, named channels, and reporting-route intent are recorded facts, not live verification.
- **Not verified:** Fresh-member behavior, full effective permissions, onboarding, Rules Screening, voice, durable-route links, moderation, recovery, integrations, and conditional features listed above. No unavailable check counts as passed.
- **Human next actions:** If implementation is later authorized, address F1 first, then F2 and F3 through an explicit improvement change plan. Obtain non-secret evidence for the relevant gaps. Any future member test needs separate authorization and a human-operated fresh account; invite handling remains human-only.
- **Staffing:** The two maintainers are known. Whether Moderator, backup Admin, successor, or other operational roles still need members is unknown. Confirm assignments rather than infer vacancies.
- **Data access:** No integration is approved in the snapshot. Actual installed integrations and their community-data boundaries are unknown.
- **Review timing:** Recommend review after approved corrections and before expanding beta access, then after the next cohort joins. No review date is recorded or scheduled by this audit.
- **Local checks:** Reviewed this report against the snapshot and local audit criteria. No project type-check or lint configuration is supplied in this document-only workspace; neither was run. No live or modifying tests were performed.

The offline audit is complete. Server verification and launch acceptance remain incomplete. The workflow stops at A3.
