# Fictional Discord server audit

## Scope and evidence

**Three configuration failures are recorded: a privileged interest role, writable announcements, and a support forum without required tags.** This is an offline, audit-only assessment. No server changes or live tests were performed.

- **Audit date:** 2026-09-17. **Snapshot date:** unknown.
- **Server evidence:** only `snapshot.md`, lines 3–20. Configuration statements are supplied observations, not independently verified settings or fresh human attestations. The recorded staff visibility check is specifically role-preview evidence.
- **Assessment criteria:** local `skills/discord-community-server/SKILL.md` (steps 1 and A1–A3), `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md`.
- **Context:** 20 invited beta users and two maintainers. Product surfaces are **command execution** and **build previews**. Support and bugs belong in the **issue tracker**; security reports belong in the **project's private security-reporting form**; conduct reports go to the **human owner** (`snapshot.md:3–5`). Exact destinations and their availability are not supplied.
- Browser, account access, and a fresh human test account are unavailable. Exact-current Discord labels and permission behavior remain unverified. Proposed setting names below follow the local references, not current official documentation.

## Findings

All corrections below are **proposed, not applied**. Priorities reflect this small beta community: high means an authority boundary needs attention; medium means a communication or routing control needs correction.

### 1. High — The interest role has a privileged permission

**Evidence:** `snapshot.md:13` records that the interest role has `Manage Roles`. This violates the non-privileged interest-role control in `REFERENCE.md`, “Role model,” and `VERIFICATION.md`, “Maintainer, contributor, partner, and interest roles.” This is a supplied configuration failure, not a tested escalation.

**Impact:** A role intended for product interests carries role-management authority. Its effective reach depends on hierarchy and role assignments, which are unknown. There is no evidence that members currently hold or can self-assign this role.

**Correction:** Remove `Manage Roles` from the interest role. Limit it to intended product channels or notifications for command execution and build previews. Keep role-management authority on explicitly authorized operational roles. Review other interest-role permissions, hierarchy, and assignment paths.

**Verification:** Use **role preview** to inspect the interest role and relevant role combinations for privileged access. Use a **real member** account to verify that members cannot manage roles or webhooks and that onboarding grants only intended interests. Neither check was performed here.

### 2. Medium — Members can post in announcements

**Evidence:** `snapshot.md:11` records that announcements allow member messages. `REFERENCE.md`, “Permission rules,” requires read-only announcements.

**Impact:** Member messages can obscure official beta updates and make the announcement source less clear, even at this community's current size.

**Correction:** Make announcements read-only for ordinary members, including applicable thread, reply, poll, and invite permissions. Allow posting only for approved operational roles. Review effective permissions and channel overrides.

**Verification:** Use **role preview** to inspect static permissions and combinations. A **real member** must then be unable to send messages, reply in existing threads, create public or private threads, create polls, or create invites there. Authorized staff posting also needs confirmation. The snapshot proves only the recorded message-permission failure.

### 3. Medium — Support posts do not require tags

**Evidence:** `snapshot.md:12` records no required tags on the support forum. `OPERATIONS.md`, “Make forum state trustworthy,” requires a member-selectable purpose, package, or domain tag on every feedback-like forum.

**Impact:** Untagged posts make command execution and build previews harder to route between two maintainers. Existing optional tags, guidelines, and workflow-state restrictions are unknown.

**Correction:** Require at least one member-selectable product-surface tag, using **command execution** and **build previews** where appropriate. Preserve useful existing domain tags. Keep workflow-state tags moderator-only. State that support and bugs belong in the issue tracker; redirect security reports to the private security-reporting form and conduct reports to the human owner. Discord discussion must not replace those routes.

**Verification:** A **real member** must see tags and guidelines, fail to create an untagged post, succeed with an appropriate domain tag, and be unable to apply moderator-only states. **Human attestation** should confirm staff state changes, durable issue links, private security routing, and removal of any test content. No forum lifecycle test was performed.

## Healthy observations and their limits

- Community is recorded as enabled (`snapshot.md:9`). This supports the prerequisite for Community features; it does not establish working Rules Screening, Onboarding, or Server Guide behavior.
- General, announcements, support, and staff channels exist (`snapshot.md:10`). This provides a compact starting structure, but usefulness, content, and effective permissions are not established.
- **Recorded role-preview pass, limited scope:** staff channels are hidden from the baseline member (`snapshot.md:14`). This does not prove fresh-member isolation, conduct-channel isolation, or safety under additional roles.
- Durable support, bug, security, and conduct destinations are stated (`snapshot.md:4–5`). Published links, access outside Discord, and actual handling remain untested.

## Gaps and verification coverage

Missing evidence is **unknown or untested**, not an additional failure. These grouped limits cover the remaining applicable reference controls and verification matrix areas.

| Scope | Status and missing evidence | Required evidence class |
| --- | --- | --- |
| Access and role boundaries | Untested beyond the narrow staff preview and findings above: admin, moderator, maintainer, contributor/partner permissions; `Administrator` absence; hierarchy; overrides and category inheritance; multi-role combinations; conduct and opt-in isolation; member webhook and server-wide invite permissions. Role membership and roles needing members are unknown. | Role preview; real member for effective member restrictions |
| Onboarding and member experience | Rules Screening, Onboarding, and voice are explicitly untested (`snapshot.md:16`). Required answers, role assignment, useful defaults, three starter tasks, seed content, sanitized support templates, read-only resources, external links, and global-guide confidentiality are unknown. | Real member; role preview for static resource visibility |
| Moderation and safety | Verification level, minimum-age policy, moderator MFA, raid protection, explicit-content and DM safety, audit logs, enforcement, and appeal ownership are unknown. AutoMod coverage for mentions, spam, abuse, credentials, and external invites is unknown. Credential blocking without copied alert content and private non-credential alerts need synthetic checks. | Human attestation; role preview for staff boundaries |
| Ownership, recovery, and reporting | A human owner is identified only by role. Successor, backup recovery, owner MFA, recovery storage, absence of shared accounts, conduct recusal/backup, confidential case storage, response commitments, and security/conduct access outside Discord are unknown. Feedback, decision, documentation, and release destinations are unspecified. | Human attestation; real member for published route links |
| Private cohorts and invites | Invited beta users do not establish a separate confidential cohort. Private categories, start channels, feedback surfaces, relationship roles, combined-role boundaries, and public/private feedback separation have unknown applicability. Invite approval, expiry/use limits, reuse rejection, temporary membership, role-assignment capability, first-new-member and existing-member behavior, manual fallback, and revocation are untested. No invite handling occurred. | Role preview; real member for access and new-member assignment; human attestation for invite handling and settings |
| Integrations and release delivery | No integrations were approved (`snapshot.md:17`); this does not prove none are installed. Inventory, app permissions and data access, privacy/retention, owners, removal paths, bot hierarchy, release-only filtering, delivery, credential handling, and cleanup remain unknown. Installation and delivery testing are not applicable to this audit-only task. | Role preview; human attestation using non-secret evidence |
| Assets, events, and ongoing review | Applicability is unknown: brand sources, managed asset store, raster/vector preservation and parity, live-product visuals, event host/backup, cadence/timezone, durable outcomes, full-series artwork and crop checks. No operational review date is supplied. | Human attestation |

Community-disabled fallback checks are **not applicable** because Community is recorded as enabled. Optional cohort, asset, and event checks cannot be marked passed or definitively inapplicable from silence.

## Handoff

This audit verifies what the supplied snapshot records against the local controls. It does **not** verify live server behavior or establish launch readiness. No server changes, invites, integrations, events, or modifying tests were authorized or performed. Supplied input files remain unchanged; only this report was added.

If the owner later authorizes improvement work, address finding 1 first, then findings 2 and 3. Obtain non-secret configuration evidence and human attestations for the gaps. Schedule fresh human-member checks when access is available, and review the result after corrections and before expanding beta access. Any future invite interaction must remain human-only and require explicit approval. The audit ends here; implementation and launch acceptance require separate authorization.
