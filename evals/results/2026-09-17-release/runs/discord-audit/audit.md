# Fictional Discord server audit

## Scope and conclusion

**Three configuration failures are recorded in the snapshot.** Address F1 first because an interest role has a privileged permission. This is an offline audit, not launch acceptance.

- **Audit date:** 2026-09-17. **Snapshot date:** unknown.
- **Mode:** audit, following steps A1–A3 of the workspace's `skills/discord-community-server/SKILL.md`.
- **Evidence:** `snapshot.md` only. Control criteria come from the local `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md` in that skill directory.
- **Boundary:** no browser, account, live service, or fresh human test account was available or used. Exact-current Discord labels and permission behavior remain unverified.
- **Changes:** only this report was created. No server changes or tests were performed. Supplied evidence and skill files were left unchanged.

Recorded configuration is supplied evidence, not a fresh inspection or human attestation obtained during this audit. The recorded role preview proves only its stated static visibility result. Proposed verification below distinguishes **role preview**, **real member**, and **human attestation**; none of those future checks has been run.

## Community context and healthy observations

The community has 20 invited beta users and two maintainers. Its product surfaces are **command execution** and **build previews** (`snapshot.md:3–5`). Broader audience, public-launch plans, moderator assignments, response commitments, and event cadence are unknown.

Preserve the supplied reporting routes:

| Work | Recorded destination | Remaining gap |
| --- | --- | --- |
| Support and bugs | Issue tracker | Exact destination and member access are unverified. |
| Security reports | Project's private security-reporting form | Availability outside Discord and private handling are unverified. |
| Conduct reports | Human owner | Contact mechanism, durable case record, recusal, and backup are unknown. |

Product feedback, decisions, persistent help documentation, and release-record destinations are unspecified. Do not replace the supplied routes with invented destinations.

Community is recorded as enabled, and general, announcements, support, and staff channels exist (`snapshot.md:9–10`). This supports the prerequisite for Community features, but does not prove their setup or member experience.

The supplied **role preview** hides staff channels from the baseline member (`snapshot.md:14`). This is a healthy, narrowly scoped observation. It does not prove conduct-channel isolation, combined-role access, or fresh-member behavior.

## Findings

All corrections below are **proposed and not applied**. Priority reflects this small invited beta community, not evidence of exploitation.

### F1 — High: interest role has Manage Roles

- **Evidence:** `snapshot.md:13` records Manage Roles on the interest role. This is a supplied configuration observation; assignment paths and effective role hierarchy are unknown.
- **Control:** `REFERENCE.md`, Role model; `VERIFICATION.md`, Maintainer, contributor, partner, and interest roles. Interest roles must have no privileged permissions.
- **Impact and priority:** a personalization role carries role-management authority. Depending on hierarchy and assignment, members could gain unintended control over roles or access. High priority because this crosses the privilege boundary; the snapshot does not establish an actual escalation.
- **Correction:** remove Manage Roles from the interest role. Limit it to intended product-channel access or notifications. Keep role administration on explicit operational roles without Administrator. Review any self-assignment path and relevant combined-role permissions.
- **Verification:** **role preview** checks the interest role and relevant combinations for privileged permissions and unintended visibility. A fresh **real member** checks that baseline and interest-role members cannot manage roles or webhooks. If onboarding grants this role, verify that its answers grant only intended, non-confidential access.

### F2 — Medium: announcements permit member messages

- **Evidence:** `snapshot.md:11` records that announcements allow member messages. This is supplied configuration evidence, not a posting test.
- **Control:** `REFERENCE.md`, Permission rules; `VERIFICATION.md`, Member view. Announcements must be read-only for members.
- **Impact and priority:** member posts can obscure maintainer notices and blur the official communication boundary. Medium priority because the observed failure affects announcement integrity, without evidence of misuse.
- **Correction:** make announcements read-only for members and retain posting only for approved operational roles. Review effective category and channel permissions, including relevant role combinations and thread permissions.
- **Verification:** **role preview** checks the effective permission shape. A fresh **real member** verifies rejection of messages, existing-thread replies, public/private thread creation, polls, and invite creation in the read-only channel. The snapshot establishes only the message-permission failure; the other actions remain untested.

### F3 — Medium: support forum does not require tags

- **Evidence:** `snapshot.md:12` records no required tags in the support forum. It does not establish whether optional tags exist or workflow tags are moderated.
- **Control:** `OPERATIONS.md`, Make forum state trustworthy; `VERIFICATION.md`, Forum workflow. Feedback-like forums must require a member-selectable purpose, package, or domain tag.
- **Impact and priority:** unclassified support posts make routing harder for two maintainers across command execution and build previews. Medium priority because this undermines repeatable triage, without proving that any report was lost.
- **Correction:** require at least one member-selectable domain tag, using command execution and build previews where appropriate. Keep workflow-state tags moderator-only. Forum guidance should send support and bugs to the issue tracker, security reports to the private security-reporting form, and conduct reports to the human owner. Request versions, runtime, expected and observed results, and a sanitized reproduction when discussion occurs in Discord.
- **Verification:** a fresh **real member** confirms that guidelines and tags are visible, an untagged post is rejected, a domain-tagged post succeeds, and members cannot apply workflow-state tags. **Human attestation** confirms staff can advance any planned states, link work to the issue tracker, route security details privately, and remove synthetic test content.

## Coverage and verification gaps

The following groups cover the remaining local reference controls and verification matrix. **Unknown** means the snapshot supplies no setting or observation. **Untested** means behavior was not exercised. Neither means a control failed or passed.

| Control scope | Evidence status and missing coverage | Required evidence for a future check |
| --- | --- | --- |
| Ownership and recovery | Human owner is named by role only. Successor, backup recovery, owner MFA, recovery storage, shared-account policy, and backup role hierarchy are unknown. | **Human attestation** for ownership, recovery, and identity safeguards; **role preview** for backup hierarchy. Never inspect recovery material. |
| Role and access model | F1 and the baseline staff preview are the only supplied permission observations. Admin, moderator, maintainer, contributor, partner, bot, and combined-role boundaries are unknown. Administrator absence, category inheritance, exceptions, per-user overrides, conduct isolation, and unrelated private-product access are unverified. Two maintainers do not establish assigned Discord roles. | **Role preview** for static access and hierarchy; **real member** for effective restrictions; **human attestation** for approved admin recovery and moderator actions. |
| Safety and moderation | Verification level, minimum-age policy, moderator MFA, raid/CAPTCHA controls, explicit-content filtering, direct-message safety, audit attribution, moderation escalation, and appeals are unknown. AutoMod coverage for mentions, suspected spam, abuse, credential-like strings, and external invites is unknown. Private non-credential alerts and credential blocking without matched-content alerts are untested. | **Human attestation** of configuration, intended moderation actions, and synthetic AutoMod results. Credential checks must use synthetic values and confirm sender guidance without copying matched content into alerts. |
| Member experience and read-only surfaces | Channel names alone do not establish useful defaults, low noise, or orientation. F2 covers the observed announcement failure. Rules, release feeds, start/resources, and other read-only surfaces are unspecified. Voice was explicitly not tested (`snapshot.md:16`); voice, billing, account, and opt-in areas may or may not exist. | **Role preview** for visibility; **real member** for posting restrictions, useful defaults, voice/opt-in boundaries, and access to planned surfaces. |
| Community onboarding and Server Guide | Community enabled is supplied configuration evidence, not a new **human attestation**. Onboarding and Rules Screening were explicitly not tested (`snapshot.md:16`). Required answers, role grants, three starter tasks, resource health, read-only backing links, and confidential-content exclusion are unknown. | **Real member** for screening, questions, tasks, grants, and rendered resources; **role preview** for confidential-content exclusion; **human attestation** for Community prerequisites. Community-disabled fallback checks are **not applicable** to this snapshot. |
| Forums, content, and durable routes | F3 covers tag enforcement. Other forum presence, tag permissions, guidelines, seed content, custom emoji meanings, state transitions, and durable-work linking are unknown. The three recorded reporting routes have no tested destinations. Conduct independence from Discord and security-form availability are unverified. | **Real member** for tag behavior, templates, seed content, and published route links; **human attestation** for staff workflow, private reporting, conduct recusal/backup, durable records, and cleanup. |
| Private cohorts and invites | Invited beta users do not establish a separate confidential cohort or private program. Category isolation, cohort-role grants, relationship-role separation, start-channel restrictions, and public/private feedback separation have unknown applicability. Invite approval history, member invite restrictions, expiry, use limits, temporary membership, assignment capability/fallback, existing-member behavior, and revocation are unknown. | **Role preview** for private-area and combined-role permissions if those areas exist; **real member** for visibility and first-new-member access. **Human attestation** for invite settings, consumption/reuse rejection, assignment fallback, existing-member checks, and revocation. All invite UI and URL handling stays human-only. |
| Integrations and release delivery | No integrations were approved (`snapshot.md:17`). This does **not** prove that none are installed. Inventory, owners, permissions, data access/retention/deletion, export, removal paths, and review duties are unknown. Release-event filtering, delivery, credential handling, and cleanup have unknown applicability. | **Role preview** for any integration's channel scope and bot hierarchy; **human attestation** for inventory, app review, role-assignment limits, release delivery, ownership/removal, and secret-safe handling. Do not install or test anything as part of this audit. |
| Assets, events, and launch operations | Canonical brand sources, community assets, managed storage, raster/vector parity, live-product visuals, recurring series, host/backup, cadence/timezone, and event outcomes are unspecified. Their specialized checks have unknown applicability. Seed completeness and a scheduled review date are unknown. | **Human attestation** for asset provenance/storage, vector constraints and rendering, series-wide changes/crops, and event ownership; **real member** for relevant seed content. Establish applicability before requesting specialized checks. |

No fresh human test account is available (`snapshot.md:15`), so all **real-member** checks remain untested. Browser and account access are unavailable (`snapshot.md:19`), so no additional **role preview** was possible. No new **human attestations** were obtained. The snapshot's absence of an invite or credential is not evidence of safe historical handling elsewhere.

## Handoff

This audit verifies that the supplied snapshot contains F1–F3 and the narrow healthy observations above. It does not verify the live server, current Discord behavior, end-to-end reporting, or launch readiness.

The human owner can prioritize F1, then F2 and F3, through a separately authorized improvement plan. After corrections, collect the matching role-preview evidence and arrange fresh human-operated member checks when available. Invite creation and all invite handling require human action and explicit approval; this report authorizes neither.

Roles needing members and integrations able to access community data remain unknown. Confirm the operational role roster, successor, and integration inventory before claiming coverage. Review after the corrections and before expanding access; no review date is currently evidenced. Audit mode ends here.

**Local checks:** the workspace contains no configured type-check or lint command. Neither was run. The report was checked against the supplied snapshot and local audit references; no executable code was changed.
