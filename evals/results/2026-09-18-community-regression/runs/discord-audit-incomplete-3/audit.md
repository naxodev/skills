# Fictional Discord server audit

## Verdict and scope

**No failures are established by the supplied snapshot. Verification is incomplete; this is not a launch-readiness approval.** Missing evidence is recorded as unknown or untested, not as an insecure setting.

- **Mode:** Offline, snapshot-only audit. No server changes were authorized or made.
- **Audit date:** 2026-09-18. **Snapshot date:** Unknown.
- **Server evidence:** Only `snapshot.md`, lines 3–20. No browser, account, live service, or current official documentation was accessed.
- **Assessment criteria:** Local `skills/discord-community-server/SKILL.md` (steps 1 and A1–A3), `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md`. These supply controls, not additional server facts.
- **Community:** 20 invited beta users and two maintainers. Product surfaces are **command execution** and **build previews**. The exact launch policy, staff availability, and response commitments are unknown.
- **Reporting routes:** Support and bugs belong in the issue tracker. Security reports belong in the project's private security-reporting form. Conduct reports go to the human owner. Actual links, accessibility, and the owner's durable conduct-record destination were not supplied.

Evidence classes follow the local verification matrix: **role preview** establishes static visibility and permission shape; **real member** establishes actual member behavior; **human attestation** covers identity, recovery, invite handling, and operational actions. Recorded configuration below is supplied documentary evidence, not an independently obtained attestation or a behavioral test. Exact-current Discord labels and permission behavior remain unverified.

## Healthy observations

| Observation and source | What the evidence establishes | Limit |
| --- | --- | --- |
| Community is enabled (`snapshot.md:9`). | The snapshot records the prerequisite for Community features. | Does not establish that Rules Screening, Onboarding, or Server Guide are configured or work. |
| General, announcements, support, and staff channels exist (`snapshot.md:10`). | The recorded structure includes conversation, announcements, support, and staff areas. | Names alone do not prove channel types, usability, permissions, or useful seed content. The support forum is separately identified below. |
| Announcements deny baseline members messages, existing-thread replies, public/private thread creation, polls, and invite creation (`snapshot.md:11`). | Recorded configuration covers the specified read-only actions. | Effective enforcement, combined roles, and other read-only channels remain untested. This is not a server-wide invite restriction result. |
| The support forum requires a member-selectable **command execution** or **build previews** tag; workflow-state tags are moderator-only (`snapshot.md:12`). | Recorded settings match the product taxonomy and separate purpose from staff workflow state. | Post creation, tag enforcement, and staff workflow were not tested. |
| The interest role grants relevant product channels and notifications without privileged permissions; supplied role preview confirms that shape (`snapshot.md:13–14`). | **Supplied role-preview pass**, limited to that interest role's static permissions. | Does not prove onboarding assigns only that role or that combined roles remain safe. |
| Supplied baseline role preview hides staff and unselected opt-in channels (`snapshot.md:14`). | **Supplied role-preview pass**, limited to those visibility checks. | Does not establish fresh-member behavior, separate conduct-channel protection, or confidential cohort isolation. |
| Support, bug, security, and conduct destinations are named (`snapshot.md:4–5`). | The intended routes are documented. | Publication, working links, durable handoff, and access without Discord are untested. |

## Findings

**No observed failures.** No corrective server changes are proposed as established necessities. The evidence does not support claiming that moderation is absent, recovery is insecure, tags are bypassable, or private channels are exposed.

## Coverage gaps and verification limits

The grouped notes below cover the remaining applicable controls in the local references and verification matrix. All checks described as untested lack supplied evidence; none count as passed. Conditional features have unknown applicability unless stated otherwise.

### Static access and permissions — unknown; role preview required

Beyond the two supplied preview results, there is no evidence for:

- Admin, Moderator, Maintainer, contributor/partner, backup Admin, or bot permission boundaries; role hierarchy; or absence of `Administrator` across all roles. Two maintainers do not establish a Moderator or recovery assignment.
- Category-level `@everyone` denials, inherited permissions, exceptions, per-user overrides, conduct intake narrower than staff discussion, or effective multi-role access.
- Server-wide member invite restrictions and rules/release-channel read-only settings, if those channels exist.
- Confidential cohort/start/feedback permissions, operational posting and pinning rights, or global guide confidentiality, if those surfaces exist. Invited beta membership alone does not prove a separate confidential cohort exists.

Future role previews could establish these static boundaries. Actual denials still require member testing where the matrix specifies it.

### Member experience — untested; fresh human-operated account unavailable

`snapshot.md:15–16,19` expressly limits this evidence. No real-member result exists for:

- Read-only actions, invite creation throughout the server, inability to manage roles/webhooks, useful default channels, or voice and opt-in behavior.
- Forum guidelines, required product tags, inability to apply workflow-state tags, or the participant-to-staff-to-issue-tracker lifecycle.
- Rules Screening, valid answers to required onboarding questions, interest-role assignment, three useful starter tasks, Server Guide resources, or external links rendered through read-only backing channels.
- Published support, bug, security, conduct, release, or other durable-route links and appropriate seed content/templates.
- Conditional cohort isolation, access after assignment, or the first truly new member receiving only the intended cohort role.

Community is enabled, so Community-disabled text-channel fallback checks are **not applicable**. The enabled-Community checks cannot be dismissed on that basis. Voice, Server Guide, and separate cohort surfaces were not established; their existence and intended boundaries need confirmation before testing.

These gaps prevent acceptance of the new-member journey, effective access controls, and forum enforcement. A recorded role preview does not close them.

### Safety, ownership, and durable operations — unknown; human attestation required

- Verification level, minimum-age policy, moderator MFA, raid protection, explicit-content filtering, and direct-message safety were not supplied.
- AutoMod configuration and behavior are unknown: mention spam, suspected spam, abusive language, unwanted external invites, and credential-like strings. No evidence establishes private non-credential alerts, credential blocking without copying matches to alerts, sender revocation warnings, or avoidance of overly broad technical-term rules.
- Moderator safety actions, audit-event attribution, escalation, appeals, and conduct recusal/backup ownership are untested.
- The snapshot names a human owner as the conduct contact. It does not attest server-account ownership, a human successor, owner MFA, private recovery storage, a second human's recovery ability, or absence of shared accounts.
- Staff application of forum states, linkage to durable work, private handling of security details, and cleanup after any future test remain untested. Welcome text, sanitized reproduction guidance, confidentiality warnings, and any custom emoji meanings are unknown.
- Security and conduct routes working without Discord, a durable conduct case destination under the human owner, and destinations for consequential feedback, decisions, and releases remain unverified or unspecified.

No credentials or recovery material are needed to close these gaps. Future attestations should describe outcomes only. Any authorized moderation test should use synthetic data.

### Invites and cohort administration — unknown; human-only handling

No invite is included (`snapshot.md:17`), and none was inspected or created. Approval, expiry, use limits, temporary-membership policy, completed-cohort revocation, and human-only handling are unknown. Optional role-assignment capability, manual fallback, and existing-member behavior also lack evidence.

Future verification would combine human attestations of non-secret settings and single-use rejection with real-member role-assignment checks where applicable. Invite URLs must remain outside the report and automation. This audit requires no test invite or launch invite.

### Integrations — none approved; installed inventory unknown

`snapshot.md:17` establishes **no approved integrations**, not that no apps, bots, or webhooks are installed. Installed access to community data therefore remains unknown.

No integration installation or delivery test is applicable to this audit. If an integration exists, its workflow need, approval, human owner, permissions, named-channel access, privacy/retention/deletion/export terms, update review, removal path, and bot hierarchy need evidence. Any release webhook would additionally need human-attested event/action scope, secret-safe handling, non-secret delivery results, and test cleanup. No approval violation can be inferred without an inventory.

### Assets, events, and ongoing staffing — unknown applicability or evidence

Canonical brand sources, asset review, managed storage, preserved raster/vector sources, SVG safety and rendered parity, and reuse of real product visuals are unknown. No recurring event is established; host, backup, cadence, timezone, durable outcomes, whole-series updates, and live crop verification remain conditional and untested.

Staff role membership beyond the two maintainers, support/moderation coverage, response commitments, and a post-cohort review date are unknown. The snapshot does not justify adding channels, bots, or a recurring event workload.

## Handoff

Only this report was created. Supplied input files remain unchanged. No live checks, modifying tests, invitations, integrations, or server changes were performed.

Verified against the supplied document: the healthy recorded settings and the limited supplied role-preview results above. No fresh behavioral tests or human attestations were obtained. Local report review checked coverage and evidence distinctions; no project type-check or lint configuration is present in this documentation-only workspace.

If the owner later authorizes further verification, first obtain non-secret permission/settings evidence and ownership/recovery attestations. Then arrange fresh human-operated member tests for the known support and onboarding journeys. Preserve the issue tracker, private security-reporting form, and human-owner conduct routes. Confirm conditional features before testing them. Any implementation requires a separate improvement plan and authorization.

Review again when these evidence gaps can be closed, before expanding access or claiming launch readiness. The owner must resolve staff coverage and role assignments; this snapshot cannot identify which roles still need members. No operating state file or launch acceptance is required to complete this offline audit.
