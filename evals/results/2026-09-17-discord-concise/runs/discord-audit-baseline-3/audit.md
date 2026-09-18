# Fictional Discord server audit

## Scope and conclusion

- **Mode:** Offline, read-only audit under local skill steps A1–A3.
- **Audit date:** 2026-09-17. **Snapshot date:** Unknown.
- **Server evidence:** Only `snapshot.md`, lines 1–20. This report treats its observations as supplied evidence, not independently verified live state.
- **Assessment controls:** Local `skills/discord-community-server/SKILL.md`, `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md`.
- **Authorization:** Audit only. No server changes, live-service access, account access, invite interaction, or modifying tests were performed.

The snapshot establishes three configuration failures: an interest role has Manage Roles, announcements permit member messages, and the support forum does not require tags. The recorded baseline role preview hides staff channels. That observation does not prove fresh-member or combined-role access boundaries.

All corrections below are proposals and **have not been applied**. This audit does not establish launch readiness.

## Community context and reporting routes

| Item | Supplied evidence or gap |
| --- | --- |
| Audience and stage | 20 invited beta users and two maintainers (`snapshot.md:3`). Broader audience and future launch model are unknown. |
| Product surfaces | **Command execution** and **build previews** (`snapshot.md:4`). |
| Support and bugs | Both belong in the **issue tracker** (`snapshot.md:4`). No destination link or issue template is supplied. Discord discussion should direct actionable work there. |
| Security reports | Use the **project's private security-reporting form** (`snapshot.md:5`). No form link or accessibility evidence is supplied. |
| Conduct reports | Go to the **human owner** (`snapshot.md:5`). A private durable record, backup, recusal route, and access without Discord are unknown. Preserve owner-led intake when clarifying these details. |
| Structure | Community is enabled. General, announcements, support, and staff channels exist (`snapshot.md:9–10`). Support is a forum (`snapshot.md:12`). |
| Operations | Moderator assignments, response commitments, successor, event cadence, and role vacancies are unknown. Two maintainers do not establish moderation or recovery coverage. |
| Other areas | Voice configuration, billing/account areas, confidential cohorts, brand sources, assets, and managed asset storage are unknown. Invited beta membership alone does not establish a separate confidential cohort. |

## Evidence classification

The local verification matrix distinguishes **role preview** (static visibility and permission shape), **real member** (fresh human-operated, non-privileged account behavior), and **human attestation** (human-only checks such as recovery and invite handling).

- Configuration statements in the snapshot are **supplied configuration observations**. Their collection method is unspecified. They are sufficient to identify the stated configuration failures, but are not fresh role-preview or real-member test results.
- `snapshot.md:14` explicitly records **role-preview evidence**. Its scope is only staff-channel visibility for the baseline member.
- No real-member verification is available: no fresh human test account exists (`snapshot.md:15`), and browser/account access is unavailable (`snapshot.md:19`).
- No explicit human attestation of recovery, invite controls, moderation behavior, or credential handling is supplied.
- Exact-current Discord labels and permission behavior remain **unverified**. No live official documentation was consulted (`snapshot.md:20`). Permission and control names below follow the supplied local references.

## Observed failures

### F1 — High: The interest role grants privileged role management

**Fact and source:** The interest role has Manage Roles (`snapshot.md:13`; supplied configuration observation). This violates the interest-role boundary in `REFERENCE.md`, Role model, and `VERIFICATION.md`, Maintainer, contributor, partner, and interest roles.

**Impact and priority:** An interest role should express product interests, not administrative authority. Role management is a high-priority access-control failure even in a small beta community. The snapshot does not identify role holders, hierarchy, assignment methods, or effective reach, so it does not prove a particular escalation path or incident.

**Proposed correction — not applied:** Remove Manage Roles from the interest role. Limit it to intended command execution or build previews channels and notifications. Review its other permissions and any self-assignment path. Keep privileged permissions in explicit staff roles and confidential access outside interest-role assignment. Do not substitute Administrator.

**Verification after separately authorized correction:**

- **Role preview:** Check the interest role and relevant role combinations for only intended channels and no privileged permissions.
- **Real member:** Confirm a fresh non-privileged member with the interest role cannot manage roles or webhooks. If onboarding assigns the role, verify that answers grant only intended non-privileged roles and channels.
- **Current status:** Configuration failure established by the snapshot; effective access and member behavior untested.

### F2 — Medium: Announcements permit member messages

**Fact and source:** Announcements allow member messages (`snapshot.md:11`; supplied configuration observation). `REFERENCE.md`, Permission rules, requires announcements to be read-only for members.

**Impact and priority:** Member posts can obscure or be confused with official beta updates. This is a medium-priority communication-integrity issue for 20 beta users; no misleading message or abuse is evidenced.

**Proposed correction — not applied:** Make announcements read-only for ordinary members while retaining posting access for approved operational roles. Review category inheritance, channel overrides, thread/reply permissions, polls, and invite creation so alternate participation paths do not defeat the intended boundary.

**Verification after separately authorized correction:**

- **Role preview:** Inspect the effective static permissions for the baseline member and relevant role combinations.
- **Real member:** Verify rejection of messages, replies in existing threads, public/private thread creation, polls, and invite creation, following the read-only-channel matrix.
- **Current status:** Member-message permission failure established; other posting paths are unknown, not additional observed failures.

### F3 — Medium: The support forum does not require a routing tag

**Fact and source:** The support forum has no required tags (`snapshot.md:12`; supplied configuration observation). `OPERATIONS.md`, Make forum state trustworthy, requires a member-selectable purpose, package, or domain tag before post creation.

**Impact and priority:** Untagged posts reduce routing clarity across command execution and build previews. This is a medium-priority support-workflow issue, below the privileged-role failure. The snapshot does not prove that all tags are absent or that workflow-state tags are member-editable.

**Proposed correction — not applied:** Require at least one member-selectable domain tag, using **Command execution** and **Build previews** where appropriate. Preserve useful existing domain tags after inventory. Keep any workflow-state tags, such as Resolved, moderator-only. Make the forum guidance direct support and bugs to the issue tracker and vulnerabilities to the private security-reporting form. Request versions, runtime, expected and observed results, and a sanitized reproduction.

**Verification after separately authorized correction:**

- **Real member:** Confirm guidelines and tags are visible, a post cannot be created without a valid domain/purpose tag, and participants cannot apply moderator-only workflow states.
- **Human attestation:** Confirm staff can advance any planned states, link durable issue-tracker work, keep security details in the private route, and remove authorized test content afterward.
- **Current status:** Required-tag failure established; tag taxonomy, guidelines, workflow states, and the full lifecycle remain untested.

## Healthy observations and their limits

| Observation | Source and evidence class | What it establishes / limit |
| --- | --- | --- |
| Staff channels are hidden from the baseline member in role preview. | `snapshot.md:14`; recorded **role preview**. | Pass only for that recorded visibility check. It does not cover conduct intake, other role combinations, or a real member. |
| Community is enabled. | `snapshot.md:9`; supplied configuration observation. | The stated prerequisite is present. Rules Screening, Onboarding, forum behavior, and Server Guide are not thereby verified. |
| Support, bug, security, and conduct destinations are identified. | `snapshot.md:4–5`; supplied routing statements. | Intended routing is clear. Published links, usability, durable conduct records, and off-Discord access are unverified. |
| The recorded channel set is compact. | `snapshot.md:10`; supplied inventory. | No evidence justifies expanding the channel structure for this small beta. Default visibility, noise, and channel usefulness are untested. |
| No integrations were approved; no invite or credential is included. | `snapshot.md:17`; supplied statement. | No integration deployment or secret-handling task is authorized. This does not prove that no integration is installed or that earlier handling was safe. |

## Separate gaps and unavailable checks

These are unknown or untested controls, **not inferred configuration failures**. Except where cited otherwise, the evidence gap follows from the limited configuration inventory (`snapshot.md:7–17`) and the statement that only these observations are available (`snapshot.md:19`). Verification methods describe future evidence needs, not work authorized by this audit.

| Area | Unknown or unavailable evidence | Matching verification method and significance |
| --- | --- | --- |
| Ownership and recovery | Human owner is the conduct contact, but successor, owner MFA, recovery storage, shared-account status, and backup capability are not documented. | **Human attestation** for ownership/recovery; **role preview** for backup role hierarchy. Recovery resilience cannot be assessed. |
| Full role model | Admin, Moderator, Maintainer, contributor/partner, and bot permissions; Administrator grants; hierarchy; overrides; and multi-role combinations are unknown. | **Role preview**, plus **human attestation** for approved admin recovery and moderator actions. F1 is the only evidenced privileged-role failure. |
| Private boundaries | Conduct-channel visibility, opt-in visibility, private category inheritance, and combined-role access are unknown. Separate cohort areas are not established. | **Role preview** for static boundaries; **real member** for access with and without any cohort role if such areas exist. Baseline staff hiding cannot establish these results. |
| Onboarding and Rules Screening | Explicitly not tested (`snapshot.md:16`). Questions, interest-role assignment, starter tasks, and default-channel experience are unknown. | **Real member**. Community is enabled, so these checks cannot be dismissed as Community-disabled fallbacks. New-member orientation and safe role assignment remain unverified. |
| Server Guide and links | Guide existence, backing resources, link rendering, confidentiality, and route destinations are unknown. | **Role preview** for confidential content exclusion; **real member** for resources and all published route links; **human attestation** for security/conduct access without Discord. Routing statements alone do not establish usable routes. |
| Voice and sensitive areas | Voice explicitly was not tested (`snapshot.md:16`); presence and opt-in design are unknown. Billing/account/private-product areas are also unspecified. | **Role preview** for visibility and **real member** for voice and opt-in behavior if present. Applicability must first be established. |
| Native safety and moderation | Verification level, age policy, moderator MFA, raid protections, explicit-content and DM safety settings, AutoMod coverage, alert destinations, audit events, and escalation/appeal ownership are unknown. | **Human attestation** of settings and authorized synthetic tests. Cover mention/suspected spam, abusive language, external invites, and credential-like strings. Credential matches must be blocked without copying matched content into alerts; non-credential alerts must remain private. No such test was run. |
| Conduct handling | Durable private intake, limited access, recusal, backup, and appeal arrangements are unknown. | **Role preview** for narrow visibility; **human attestation** for owner-led handling, recusal/backup, and durable records. The named human owner is preserved as the intake route. |
| Invite controls and cohort assignment | Member-created invite permissions, approval history, expiry/use bounds, temporary membership, revocation, and cohort-role assignment are unknown. | **Real member** for member invite restrictions and new-member cohort access where applicable; **human attestation** for invite settings, second-use rejection, manual fallback, and existing-member handling. Any future invite requires separate approval and human-only UI/URL handling. |
| Forum workflow and seed content | Existing tag taxonomy, moderated states, templates, sanitized-data guidance, seeded orientation, and durable issue links are unknown beyond F3. | **Real member** for guidelines, required tags, templates, and member actions; **human attestation** for staff state changes, durable links, private security handling, and test cleanup. |
| Integrations and releases | No approvals exist (`snapshot.md:17`); installed app/webhook inventory, data access, owners, permissions, removal paths, and release filters are unknown. | If present, **role preview** for access and **human attestation** for ownership, data boundaries, release behavior, cleanup, and credential handling. Do not assume absence or recommend installation without a demonstrated need. |
| Assets, events, and channel ordering | No canonical brand, asset store, artwork, event plan, hosts, or ordering requirement is supplied. | **Human attestation** of provenance, retained raster/vector assets, review, series updates, and live crop results if applicable. These optional workflows are applicability-unknown, not launch failures. No reordering task applies to this audit. |
| Review and launch acceptance | No scheduled review, accepted residual risk, or complete verification record is supplied. | **Human attestation** for review ownership and acceptance after applicable checks. Existing invited users do not prove launch checks passed. |

**Not applicable:** Community-disabled text-channel fallback checks, because the snapshot states Community is enabled. Creating an operating plan/state file, installing apps, preparing events, and generating launch invites are outside audit steps A1–A3. Optional features with unknown existence are not marked passed or absent.

## Handoff and verification limits

**What changed:** Only this local `audit.md` report was created. Supplied input files were left unchanged. No server changes were made.

**What the evidence verifies:** The snapshot records the three configuration failures, the enabled Community prerequisite, stated reporting routes, and one narrow baseline staff-visibility role-preview result. This report verifies consistency against the local controls, not current server state.

**What remains unverified:** All fresh-member behavior, the unknown controls above, the currency of the snapshot, and exact-current Discord labels and platform behavior. No browser, account, live documentation, service, integration, invite, or credential was accessed. No human-only check was independently attested during this audit.

**Relevant next human actions, requiring separate authorization where they change state:**

1. Review F1 first, then F2 and F3, and approve any intended corrections under improvement mode.
2. Supply a non-secret role/permission and safety inventory plus human attestations for ownership, recovery, conduct handling, and invite controls.
3. When available and authorized, use a fresh human-operated non-privileged account for the matrix checks. Keep any separately approved test invite human-only, short-lived, and single-use; never record its URL.
4. Review the corrected configuration before inviting further beta users, then revisit after the next cohort joins. No review date is currently scheduled in the supplied evidence.

**Staffing and data access:** Which roles still need members is unknown. Which integrations can access community data is unknown; lack of approval is not an installed-integration inventory.

The offline audit is complete. Remediation and live verification remain unapplied and untested.
