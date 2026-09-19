# Fictional Discord server audit

## Verdict and scope

**No observed failures are established by the supplied snapshot. Several healthy settings are recorded, but member behavior and operational readiness remain unverified.** Missing evidence is a verification gap, not proof of an insecure setting. This audit does not establish launch readiness.

- **Mode:** offline, audit only; local skill steps A1–A3.
- **Audit date:** 2026-09-18. **Snapshot date:** unknown.
- **Sole server evidence:** `snapshot.md`, lines 3–20. No browser, account, live service, or fresh human test account was available or used.
- **Assessment criteria:** local `skills/discord-community-server/SKILL.md`, `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md`. These supply controls, not additional server facts.
- **Changes:** only this report was created. No server changes or tests that modify the server were performed. Supplied input files were left unchanged.

Exact-current Discord labels and permission behavior remain unverified. No live official documentation was consulted.

## Community context and durable routes

The community has **20 invited beta users and two maintainers**. Its product surfaces are **command execution** and **build previews** (`snapshot.md:3–5`). A confidential cohort structure or a public-launch plan is not established by the word “beta.”

| Workflow | Supplied destination | Evidence limit |
| --- | --- | --- |
| Support and bugs | Issue tracker | Destination stated; actual links, access, and handoff practice untested. |
| Security reports | Project's private security-reporting form | Route stated; confidentiality, availability outside Discord, and handling untested. |
| Conduct reports | Human owner | Recipient stated; durable private record, recusal, backup, and access outside Discord unknown. |

Feedback, product decisions, documentation, and release destinations are unknown. Staff availability, moderator assignments, response commitments, event cadence, billing/account areas, canonical brand sources, and asset ownership are not supplied. No new commitments are inferred from the two-maintainer count.

## Healthy observations and their evidence classes

“Recorded configuration” below means a snapshot statement, not an independently inspected setting or a completed human-attestation check. “Supplied role preview” preserves the evidence class of the recorded observation; no preview was rerun.

| Observation | Source | Evidence class and result |
| --- | --- | --- |
| Community is enabled; general, announcements, support, and staff channels exist. | `snapshot.md:9–10` | Recorded configuration. The Community prerequisite is reported satisfied; feature flows are not verified. |
| Announcements deny baseline members messages, existing-thread replies, public/private thread creation, polls, and invite creation. | `snapshot.md:11` | Recorded configuration consistent with the read-only control. Real-member rejection remains untested. This does not establish server-wide invite restrictions. |
| The support forum requires a member-selectable **command execution** or **build previews** tag; workflow-state tags are moderator-only. | `snapshot.md:12` | Recorded configuration consistent with the forum taxonomy control. Posting and tag enforcement remain untested. |
| Staff and unselected opt-in channels are hidden from the baseline member. | `snapshot.md:14` | Supplied role preview: passed for these stated visibility checks only. Conduct-channel visibility and other role combinations are not established. |
| The interest role grants only relevant product channels and notifications, with no privileged permissions. | `snapshot.md:13–14` | Recorded configuration corroborated by supplied role preview: passed for this static role shape. Onboarding assignment is not verified. |

## Findings

**None supported by the supplied evidence.** There is no basis for assigning a failure priority or prescribing a corrective server change. The unknowns below must not be converted into passes or failures.

## Gaps and verification limits

The following grouped coverage notes cover the remaining applicable controls in the local references and verification matrix. All are **unknown or untested**, unless explicitly marked not applicable. Proposed verification is for a separately authorized follow-up; none was performed here.

| Coverage | Missing evidence and impact | Required evidence class for follow-up |
| --- | --- | --- |
| Effective access and role model | Beyond the two supplied previews, role definitions, hierarchy, category inheritance, exceptions, per-user overrides, combined roles, and conduct isolation are unknown. Admin, Moderator, Maintainer, Contributor/Partner, backup Admin, and bot boundaries are not established. The absence of `Administrator` server-wide is unverified. | **Role preview:** inspect applicable roles, category/channel overrides, hierarchy, and combinations. **Real member:** verify members cannot manage roles or webhooks and read-only restrictions hold. |
| Member arrival and Community features | Rules Screening, Onboarding, default-channel usefulness, valid question answers, interest-role assignment, three starter tasks, Server Guide resources, rendered external links, and resource-channel read-only behavior are untested (`snapshot.md:15–16`). Confidential resources in the global guide are unknown. Static interest-role permissions do not prove safe assignment. | **Real member:** fresh non-privileged member journey. **Role preview:** global-guide confidentiality. **Human attestation:** Community prerequisites for planned features. Community-disabled fallback checks are **not applicable**, because Community is recorded enabled. |
| Forums, content, and durable handoff | Support tag visibility, required-tag enforcement, and moderator-state exclusion were not member-tested (`snapshot.md:15`). Guidelines, sanitized reproduction templates, welcome/seed content, state transitions, durable links, and security redirection are unknown. Other feedback-like forums and custom emoji are not established. | **Real member:** posting, tags, guidelines, templates, and published route links. **Human attestation:** staff workflow, durable handoff, private security handling, and removal of any future test content. Assess other forums or emoji only if present. |
| Native safety and moderation | AutoMod behavior was not observed (`snapshot.md:16`). Verification level, minimum-age policy, moderator MFA, raid/CAPTCHA controls, explicit-content filtering, DM safety, mention/suspected spam, abusive language, credential-like strings, and unwanted invites are unverified. Private non-credential alerts, credential blocking without copied alerts, revocation warnings, technical-discussion false positives, moderation actions, audit attribution, escalation, and appeals are unknown. | **Human attestation:** settings and synthetic-only moderation checks, including no credential match copied to alerts. **Role preview:** moderation-channel privacy and restricted moderator permissions. No real credentials should be supplied. |
| Invites, private cohorts, and opt-in areas | Announcements' invite denial does not prove denial for `@everyone` and every member-visible channel. Invite approvals, expiry/use limits, human-only handling, temporary membership, and revocation are unknown. Private cohort areas and voice existence are not established; their behavior cannot be passed or declared absent (`snapshot.md:16–17`). | **Real member:** server-wide invite prohibition where planned, opt-in/voice boundaries, and private-category/start/forum access if present. **Role preview:** combined cohort/relationship roles and start-channel restrictions. **Human attestation:** non-secret invite settings, single-use rejection, existing-member assignment, and manual fallback. **Real member:** first-new-member role assignment if supported. Invite URLs stay outside automation. |
| Ownership, recovery, and staffing | Recovery was not observed (`snapshot.md:16`). A human conduct recipient is known, but ownership model, successor, owner MFA, recovery storage, absence of shared accounts, backup coverage, role vacancies, and conduct recusal are unknown. Continuity and reporting outside Discord are unverified. | **Human attestation:** ownership, successor, recovery capability, MFA, private durable conduct handling, backup/recusal, and out-of-Discord routes. **Role preview:** backup Admin's required hierarchy and explicit permissions. Never inspect recovery material. |
| Apps and release integrations | No integrations were approved (`snapshot.md:17`). This does **not** establish that none are installed. Installed inventory, community-data access, owners, removal paths, privacy/retention/export terms, and release-event scope are unknown. | **Human attestation:** non-secret inventory and app review, ownership, removal, event filtering, delivery, cleanup, and credential handling. **Role preview:** installed integration permissions and hierarchy, if any. Integration-specific runtime checks are conditional on inventory; no installation is proposed. |
| Assets, events, and ongoing review | Assets, managed storage, canonical sources, raster/vector parity, live-product visuals, recurring series, host/backup, timezone, outcome records, and review schedule are not described. Their applicability is unknown; their absence is not a finding. | **Human attestation:** applicable asset provenance/storage and review, safe SVG content and parity, event ownership and full-series crop verification, and review timing. Optional features need not be added to close this audit. |

## Handoff

Verified **within the supplied evidence only**: the stated baseline visibility and interest-role permission shape have recorded role-preview support. The announcements and forum controls are healthy recorded settings, not member-tested results.

The key verification blocker is the lack of a fresh human-operated non-privileged account. Browser/account access and human operational attestations are also unavailable. Prioritize the member journey, permission enforcement, moderation behavior, and recovery evidence if a follow-up is authorized. Preserve the issue tracker, private security form, and human-owner conduct routes during any later work.

Review again when non-secret settings evidence or authorized fresh-member results become available, especially before expanding access. Do not treat this report as launch acceptance. No invite, app, event, operating-state file, or implementation is required to finish this audit.

This is a documentation-only workspace; no project type-check or lint configuration is supplied. No code checks or live verification were run.
