# Fictional Discord server audit

## Result and scope

**No observed failures are established by the supplied snapshot. The evidence is incomplete, so this is not a safety or launch-readiness pass.**

- Audit date: 2026-09-17. Snapshot date: unknown.
- Mode: offline, snapshot-only audit. No server changes were authorized or made.
- Server evidence: `snapshot.md`, lines 1–20, only. No browser, account, live service, or current official documentation was accessed.
- Assessment criteria: local `skills/discord-community-server/SKILL.md` (steps 1 and A1–A3), `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md`.
- Deliverable: this report. Supplied input files were not modified. No tests, invites, apps, events, or operating state file were created.

## Community context and routing

The community has 20 invited beta users and two maintainers (`snapshot.md:3`). Its product surfaces are **command execution** and **build previews** (`snapshot.md:4`). This supports a small beta-community scope; a separate confidential cohort is not established.

| Workflow | Supplied destination | Limit |
| --- | --- | --- |
| Support and bugs | Issue tracker | Exact destination and member-facing links are not supplied. |
| Security reports | Project's private security-reporting form | Availability and access without Discord are untested. |
| Conduct reports | Human owner | Contact method, durable case record, recusal, and backup are unknown. |

Sources: `snapshot.md:4–5`. Other feedback, product decisions, documentation, and release destinations are unknown. Moderator staffing, response commitments, event cadence, voice needs, billing/account areas, successor, brand sources, and managed asset storage are not supplied. Two maintainers do not establish moderator or recovery coverage.

## Evidence rules

- **Recorded configuration:** a supplied description, not an independently inspected setting or behavioral test.
- **Role preview:** supplied evidence of static visibility or permission shape. It does not prove onboarding, posting, or fresh-member behavior.
- **Real member:** requires a fresh, human-operated, non-privileged account. None is available (`snapshot.md:15`). No real-member check passes in this audit.
- **Human attestation:** requires an explicit account of the relevant human-only check. Configuration statements do not establish recovery, invite handling, or other operational attestations.

All results below are limited to the supplied evidence. Exact current Discord labels and permission behavior remain unverified (`snapshot.md:19–20`).

## Healthy observations

| Assessment | Source | Evidence class and result | Verification limit |
| --- | --- | --- | --- |
| Community is enabled. | `snapshot.md:9` | Recorded configuration; prerequisite reported present. | Does not establish functioning Rules Screening, Onboarding, or Server Guide. No fresh human attestation was obtained. |
| General, announcements, support, and staff channels exist. | `snapshot.md:10` | Recorded configuration; core community jobs have named surfaces. | Channel types, full inventory, content, and usability are not established beyond the support forum described below. |
| Announcements deny baseline messages, existing-thread replies, public/private thread creation, polls, and invite creation. | `snapshot.md:11` | Recorded configuration; matches the listed read-only restrictions. | Real-member enforcement and combined-role access are untested. This is not a server-wide invite restriction. |
| Support requires a member-selectable domain tag: command execution or build previews. Workflow-state tags are moderator-only. | `snapshot.md:12` | Recorded configuration; matches the forum tag invariant. | Posting without a tag and attempts to apply state tags were not tested. |
| The interest role grants relevant product channels and notifications without privileged permissions. | `snapshot.md:13–14` | Supplied role preview; **passed for the recorded static permission shape**. | Onboarding assignment and combinations with other roles are untested. |
| Staff and unselected opt-in channels are hidden from the baseline member. | `snapshot.md:14` | Supplied role preview; **passed for these visibility checks only**. | Does not prove separate conduct-channel isolation, category overwrites, multi-role access, or fresh-member visibility. |

## Observed failures

**None established.** Missing observations are verification gaps, not proof of insecure settings. No corrective server change is justified as a confirmed defect by this snapshot, and no correction was applied.

## Unknown and unavailable checks

These are evidence gaps, not failure findings. “Priority” indicates the order for a future authorized review, not a confirmed defect's severity. High priority covers access, safety, and recovery because even a small invited beta can expose private information or lose operational access.

| Area and status | Evidence basis | Why it matters / priority | Future verification method; not performed |
| --- | --- | --- | --- |
| Full permission model — unknown | Only baseline visibility and the interest-role shape are supplied (`snapshot.md:11–14`). | High: no basis to conclude that every role lacks Administrator, or that members cannot manage roles/webhooks. | **Role preview:** inspect role definitions, hierarchy, category/channel overrides, Admin, Moderator, Maintainer, and relevant role combinations. Check contributor/partner/bot roles if present. **Real member:** verify members cannot manage roles or webhooks. |
| Read-only and invite enforcement — untested | Announcements restrictions are recorded; posting was not tested (`snapshot.md:11,15`). | High: static permissions do not prove all effective access paths. | **Real member:** test every listed announcement restriction and server-wide member invite denial where intended. Inventory rules/release/start surfaces before assessing their read-only controls. Invite UI and invite handling remain human-only. |
| Safety configuration and AutoMod — unknown/untested | AutoMod behavior was not observed (`snapshot.md:16`); other safety settings are absent. | High: spam, abuse, and credential protection cannot be assessed. | **Human attestation:** confirm verification level, age policy, moderator MFA, raid controls, explicit-content filtering, DM safety, safety actions, and audit attribution. Check mention/suspected spam, abuse, external invites, and credential rules. Use only synthetic matches; credentials must be blocked with a revocation warning and no matched-content alert. Non-credential alerts should reach a private moderation channel. |
| Ownership, recovery, and moderation coverage — unknown | Human owner and two maintainers are named by function; recovery is unobserved (`snapshot.md:3,5,16`). | High: operational continuity and escalation coverage are unverified. | **Human attestation:** confirm human ownership/successor, owner MFA, externally held recovery material, no shared account, second-human recovery, moderator staffing, response commitments, conduct recusal, and backup. **Role preview:** verify backup permissions and hierarchy where relevant. Do not inspect recovery material. |
| Durable reporting routes — stated, not tested | Routes are described without links or workflow evidence (`snapshot.md:4–5`). | High for security/conduct; normal for support: users need working destinations and durable records. | **Real member:** check published route links. **Human attestation:** confirm the private security form and human-owner conduct route work without Discord, with private durable conduct handling and backup. Preserve support and bugs in the issue tracker. |
| Rules Screening and Onboarding — unknown/untested | Community enabled; both flows unobserved (`snapshot.md:9,16`). | High before expanding invitations: new-member entry and role assignment are unverified. | **Real member:** verify screening, valid answers to required questions, intended default channels, non-privileged interest assignment, and three accessible starter tasks. Interest answers must not grant confidential or relationship roles. |
| Server Guide and seed content — unknown | No resources, welcome content, templates, or links supplied (`snapshot.md:10,19`). | Normal: members may lack a clear route to participation. | **Real member:** inspect guide resources, rendered external links from read-only backing channels, welcome and support templates, and useful defaults. Templates should request versions/runtime, expected/observed behavior, and sanitized reproduction. **Role preview:** check global resources expose no confidential content. |
| Forum workflow — configuration recorded; behavior untested | Tag settings supplied; real-member enforcement explicitly untested (`snapshot.md:12,15`). | Normal before wider use: members and staff need reliable categorization and durable follow-up. | **Real member:** verify visible guidelines, required domain tags, and rejection of member-applied state tags. **Human attestation:** verify staff state changes, issue-tracker linkage, private security routing, and removal of any future test content. No lifecycle test was run here. |
| Voice and opt-in behavior — untested; voice existence unknown | Static opt-in hiding is supplied, but voice was not observed (`snapshot.md:14,16`). | Conditional: relevance depends on whether voice or sensitive areas exist. | **Real member:** verify opt-in selection, visibility, and voice access if present. Do not infer a voice failure or require new voice channels. |
| Private cohort boundaries — applicability unknown | Invited beta users are reported, but no confidential category, cohort role, or private feedback workflow is described (`snapshot.md:3,10–14`). | Conditional, high if confidential work exists: invited membership alone does not prove cohort isolation. | Establish applicability first. **Role preview:** inspect private category denial, explicit access, role combinations, and read-only start channels. **Real member:** test baseline exclusion and cohort access. **Human attestation:** confirm assignment fallback and existing-member checks. |
| Invite governance — unknown | Invited users exist; no invite settings or approval history supplied (`snapshot.md:3,17`). | High before further invitations: expiry, use limits, assignment, and ownership are unverified. | **Human attestation:** confirm approval, bounded expiry/uses, human-only handling, persistent-membership settings where needed, low-privilege assignment/manual fallback, and revocation of completed cohort invites. A future test would also need human-attested second-use rejection. No invite is needed for this audit. |
| Integration inventory and data access — unknown | “No integrations were approved” (`snapshot.md:17`) does not prove none are installed. | High if any integration exists: its permissions and community-data access are unknown. | Obtain a non-secret inventory first. If present, use **role preview** for channel/action scope and bot hierarchy; **human attestation** for approval, owner, removal path, data retention/boundary, and credential handling. Release delivery tests apply only if a release integration exists. No installation is proposed. |
| Assets and events — applicability unknown | No brand assets, store, event series, cadence, or host described (`snapshot.md:19`). | Conditional, lower priority: do not introduce work without a community need. | If present, use **human attestation** for canonical sources, reviewed raster/vector assets, managed storage, SVG safety/parity, and event host/backup, timezone, full-series updates, and live crop checks. |
| Launch acceptance and review date — unverified | No acceptance or review schedule supplied; member testing unavailable (`snapshot.md:15,19`). | High before claiming readiness: incomplete checks cannot count as passes. | **Human attestation:** record residual-risk ownership and a review date after the next authorized evidence review or cohort change. No launch approval is inferred. |

Community-disabled fallback checks are **not applicable** because Community is recorded as enabled (`snapshot.md:9`). Community-enabled onboarding checks remain applicable and untested. Optional cohort, integration, voice, asset, and event checks cannot be marked passed or definitively not applicable until their existence and intended use are known.

## Handoff and verification limits

The supplied role preview verifies only baseline hiding of staff/unselected opt-in channels and the interest role's static permission shape. The snapshot also records healthy announcement restrictions and forum tag configuration. It supplies no fresh-member results, AutoMod outcomes, recovery attestations, integration inventory, or current official-label verification.

No server changes were made. All future checks in this report are proposals and require a separately authorized activity. No corrective action was applied. Roles needing members and integrations able to access community data remain unknown.

For a future review, first obtain non-secret permission, safety, recovery, and integration evidence. Then, if separately authorized and a fresh human account becomes available, verify member behavior using the local matrix. Human-only invite and credential handling must remain outside automation. Review this report after those evidence gaps are addressed or before expanding the beta. This offline audit ends at A3 and does not authorize implementation or certify launch readiness.
