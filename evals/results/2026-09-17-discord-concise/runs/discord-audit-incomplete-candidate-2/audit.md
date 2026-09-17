# Fictional Discord server audit

**Result: No failures are established by the supplied snapshot. Several controls have healthy recorded evidence, but member behavior and operational readiness remain unverified.**

## Scope and evidence

- **Mode:** Offline audit only. Report date: 2026-09-17. Snapshot date: unknown.
- **Server evidence:** Only `snapshot.md`, lines 3–20. No browser, account, live service, or fresh human test account was available.
- **Criteria:** Local `skills/discord-community-server/SKILL.md` (steps 1 and A1–A3), `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md`.
- **Context:** 20 invited beta users and two maintainers. Product surfaces are **command execution** and **build previews**. General, announcements, support, and staff channels exist.
- **Reporting routes:** Support and bugs belong in the issue tracker. Security reports belong in the project's private security-reporting form. Conduct reports go to the human owner. Exact destinations, availability outside Discord, and a durable conduct-record system are unknown.

Recorded configuration is documentary evidence, not an independently inspected setting or a successful behavior test. Supplied role-preview results retain that evidence class. No fresh real-member result or operational human attestation is supplied. Exact-current Discord labels and platform behavior remain unverified because live official documentation is outside scope.

## Healthy observations

| Observation and source | What the evidence establishes | Limit |
| --- | --- | --- |
| Community is enabled (`snapshot.md:9`). | The recorded prerequisite for Community features is present. | Does not prove that Rules Screening, Onboarding, or Server Guide is configured or works. |
| Announcements deny baseline members messages, existing-thread replies, public/private thread creation, polls, and invite creation (`snapshot.md:11`). | The recorded read-only configuration covers the specified actions. | Effective enforcement and other role combinations need real-member checks. This is not a server-wide invite restriction result. |
| Support requires a member-selectable **command execution** or **build previews** tag; workflow-state tags are moderator-only (`snapshot.md:12`). | The recorded forum configuration matches the required domain-tag and staff-state separation. | Post creation, tag enforcement, and staff workflow were not tested. |
| Supplied baseline role preview hides staff and unselected opt-in channels (`snapshot.md:14`). | Passed within the supplied **role-preview** scope. | Does not establish separate conduct-channel visibility, private-cohort isolation, or fresh-member behavior. |
| The interest role grants only relevant product channels and notifications, with no privileged permissions; supplied preview confirms its shape (`snapshot.md:13–14`). | Passed within the supplied **role-preview** scope. | Does not prove onboarding assignment or combined-role access. |

## Findings

**No observed failures.** The snapshot does not justify a corrective finding or a failure priority. Missing evidence is not proof of a missing or insecure control. No corrections were applied.

## Assessment coverage and gaps

The following groups cover the remaining applicable reference controls and verification matrix checks. All are **unknown or untested**, unless explicitly marked not applicable. They are verification gaps, not findings.

| Control scope | Evidence gap and appropriate verification |
| --- | --- |
| Access and role design | Beyond the supplied preview, role definitions, hierarchy, category inheritance, exceptions, per-user overrides, `@everyone` boundaries, conduct isolation, multi-role combinations, and Admin/Moderator/Maintainer/contributor/partner permissions are unknown. Use **role preview** to inspect applicable roles, including absence of `Administrator`; use a **real member** to check role/webhook management denial and effective read-only boundaries. Two maintainers do not establish moderator or backup staffing. |
| Member experience and durable routing | Posting and tag behavior are explicitly untested (`snapshot.md:15`). Default-channel usefulness, forum guidelines, sanitized support templates, seed content, welcome/routing clarity, published links, voice, and opt-in behavior are unverified. Use a **real member** for these checks. Use **human attestation** for staff state transitions, durable issue links, private security routing, and test-content removal. Preserve the supplied support, bug, security, and conduct destinations. Feedback, decision, documentation, and release destinations are unknown. |
| Community onboarding and resources | Onboarding and Rules Screening were not observed (`snapshot.md:16`). Questions, role assignment, starter tasks, Server Guide resources, read-only backing channels, and canonical link rendering are untested. Use a **real member** for the flows and **role preview** for confidential-resource exclusion. Community-disabled fallback checks are **not applicable** because Community is recorded as enabled. |
| Safety and moderation | AutoMod behavior was not observed (`snapshot.md:16`); configuration, verification level, minimum-age policy, moderator MFA, raid protection, explicit-content filtering, and DM safety are unknown. Obtain non-secret configuration evidence and **human attestation** for synthetic mention/spam, abuse, credential, and external-invite tests. Verify private non-credential alerts; credential matches must be blocked without copying matched content into alerts. Safety actions, audit attribution, escalation, appeals, and conduct recusal/backup ownership also need attestation. |
| Invites and confidential cohorts | Invited beta membership does not establish a separate confidential cohort or an approved launch policy. Invite approval, expiry, use limits, reuse rejection, temporary membership, revocation, and human-only handling need **human attestation** without URLs. Server-wide member invite denial needs a **real member**. If private program areas exist, check category/start/forum isolation, read-only start permissions, staff-only relationship roles, and exclusion from self-service onboarding using **role preview** and **real-member** evidence. Check first-new-member assignment with a real member; attest existing-member behavior and manual fallback. Applicability of these cohort-specific checks is unknown. |
| Ownership, recovery, and staffing | Recovery arrangements were not observed (`snapshot.md:16`). Human ownership, successor, owner MFA, securely held recovery material, no shared account, backup recovery capability, moderation staffing, response commitments, and routes usable without Discord need **human attestation**. Backup role hierarchy needs **role preview**. Which roles still need members is unknown. |
| Apps, bots, and webhooks | No integrations were approved (`snapshot.md:17`); this does not prove none are installed. Inventory and community-data access are unknown. If any exist, obtain **role-preview** evidence of narrow access and bot hierarchy, plus **human attestation** of approval, owner, minimum permissions, privacy/retention/deletion boundaries, removal path, bounded role assignment, release-only event filtering, secret-safe handling, and test cleanup. No integration installation or webhook test is required to finish this audit. |
| Assets, events, and launch operations | Brand sources, assets, managed storage, emoji meanings, event need/cadence, hosts, and launch/review plans are unknown. Establish applicability first. If present, obtain **human attestation** for asset provenance, raster/vector preservation and parity, safe SVG contents, real-product visuals, and full-series event updates/crops. Verify relevant seed content with a **real member**. A scheduled review and owner acceptance of residual launch risk are not evidenced. Channel reordering and asset/event creation are **not applicable to this audit's actions**. |

## Handoff and verification limits

Only `audit.md` was created. No server changes were made. Supplied input files were left unchanged. No live services, other skills, delegation, or outside-workspace files were used.

This audit verifies the assessment against the supplied record, including its limited role-preview results. It does not certify the live server, fresh-member behavior, security readiness, or launch acceptance. No invite or credential was supplied, and none was requested or generated.

For a future authorized review, first obtain non-secret role/settings evidence and human attestations for safety, ownership, recovery, and invite handling. Then have a human perform the applicable fresh-member checks, including announcement restrictions, forum tags, onboarding, and durable routes. Any test invite must remain human-controlled and require separate approval. Review again when that evidence becomes available and before expanding the beta; no review date is currently recorded.
