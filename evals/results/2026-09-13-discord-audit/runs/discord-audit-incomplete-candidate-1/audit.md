# Fictional Discord server audit

## Verdict and scope

**No observed control failures are established by the supplied snapshot.** Several recorded settings align with the local controls. Evidence is insufficient to confirm end-to-end member behavior or launch readiness. Unknown checks are not failures or passes.

- **Mode:** Audit only; local skill steps 1 and A1–A3.
- **Audit date:** 2026-09-13. **Snapshot date:** Unknown.
- **Server evidence:** Only `snapshot.md`, lines 1–20. This is a fictional, incomplete snapshot, not a live inspection.
- **Criteria:** `skills/discord-community-server/SKILL.md`, `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md`, read directly from this workspace.
- **Access limits:** Offline; no browser, account, fresh human test account, or live official documentation available or used.
- **Changes:** Only this report was created. No server changes or tests were performed. Supplied input files were left unchanged.
- **Platform limits:** Exact current Discord feature labels and current permission behavior remain unverified (`snapshot.md:19–20`). Permission terms below follow the local references.

## Community context and reporting routes

| Item | Supplied evidence | Limits |
| --- | --- | --- |
| Audience and stage | 20 invited beta users and two maintainers (`snapshot.md:3`) | Future launch model, response commitments, moderator coverage, and event cadence are unknown. |
| Product surfaces | **command execution** and **build previews** (`snapshot.md:4`) | No further product architecture is supplied. |
| Support and bugs | Issue tracker (`snapshot.md:4`) | Published links, tracker access, and actual handoff behavior are untested. The support forum does not itself contradict this route. |
| Security | Project's private security-reporting form (`snapshot.md:5`) | Accessibility without Discord and actual handling are untested. |
| Conduct | Human owner (`snapshot.md:5`) | Durable case storage, off-Discord contact, recusal, and backup arrangements are unknown. Preserve the owner as the reporting route. |
| Other durable work | No destination supplied for product feedback, decisions, releases, or persistent documentation | Unknown; do not infer destinations from the channel names. |
| Ownership and resources | A human owner is identified by function; two maintainers are recorded | Successor, role membership, recovery coverage, brand sources, assets, and managed asset store are unknown. |

## Evidence classification

The local verification matrix distinguishes **role preview** (static visibility and permissions), **real member** (actual member behavior), and **human attestation** (human-only actions and operational assurances).

Recorded configuration is documentary evidence, not an executed verification class. Where a matrix check requires human attestation, configuration text alone does not establish that attestation. The supplied role preview is preserved as role-preview evidence, not promoted to real-member evidence. No new verification was run.

## Healthy observations and their limits

| Observation and source | Evidence class and supported result | What remains unverified |
| --- | --- | --- |
| Community is enabled (`snapshot.md:9`). | Recorded configuration supports the Community prerequisite described by the local controls. | No live confirmation or explicit prerequisite attestation; enabled Community does not prove its member flows work. |
| General, announcements, support, and staff channels exist (`snapshot.md:10`). | Recorded inventory shows a compact structure with conversation, announcement, support, and staff jobs. | Channel list completeness, orientation content, default-channel usefulness, and actual channel types beyond the support forum. |
| Announcements deny baseline messages, existing-thread replies, public/private thread creation, polls, and invite creation (`snapshot.md:11`). | Recorded configuration matches the listed read-only controls. | **Real-member check untested:** rejection of each action. This does not establish read-only behavior under other role combinations or server-wide invite denial. |
| Support requires a member-selectable **command execution** or **build previews** tag; workflow-state tags are moderator-only (`snapshot.md:12`). | Recorded configuration matches the required domain-tag and staff-state separation. | **Real-member checks untested:** tag visibility, mandatory tag enforcement, and inability to apply workflow-state tags. Staff workflow and durable linking also remain unattested. |
| Supplied baseline role preview hides staff and unselected opt-in channels (`snapshot.md:14`). | **Role preview: passed within the supplied scope.** | Conduct-specific visibility, private categories, other role combinations, and actual member access are not established. |
| Interest role grants only relevant product channels and notifications, with no privilege; preview confirms its shape (`snapshot.md:13–14`). | **Role preview: passed for the recorded interest role.** | Onboarding assignment behavior, confidential-access separation during assignment, and combined-role behavior remain untested. |
| No integrations were approved; no invite or credential is included (`snapshot.md:17`). | Documentary evidence establishes approval status and absence of these values from the supplied snapshot. | This does not prove no integration is installed or no secret exists elsewhere. It is not a credential-handling attestation. |

## Observed failures

**None established.** The snapshot contains no demonstrated mismatch requiring a corrective finding. No severity is assigned to missing evidence, and no corrections were applied.

In particular, unavailable fresh-member testing does not invalidate the supplied role preview. Unobserved AutoMod, Onboarding, Rules Screening, and recovery arrangements do not establish that those controls are disabled or unsafe.

## Gaps and unavailable checks

All checks below are **unknown or untested**, unless explicitly marked not applicable. Verification methods are proposed for a separately authorized review; they were not executed. The order identifies useful follow-up priority, not vulnerability severity.

### 1. Access, member behavior, and moderation

| Gap and evidence source | Impact of missing evidence | Required verification class and method |
| --- | --- | --- |
| Announcement action rejection and other read-only surfaces (`snapshot.md:11,15`; no rules or release-channel evidence). | Cannot confirm members actually encounter the intended posting boundary. | **Real member:** attempt each listed announcement action; repeat on other read-only surfaces if present. **Role preview:** inspect relevant combined roles. |
| Server-wide invite restrictions and baseline role/webhook management (`snapshot.md:11,14–15` cover only narrower settings). | Announcement-only denial cannot establish containment elsewhere. | **Role preview:** inspect baseline permissions and channel overrides. **Real member:** verify a default member cannot manage roles/webhooks or create invites anywhere when the launch policy forbids it. Keep invite UI and URLs human-only. |
| Admin, Moderator, Maintainer, contributor/partner, backup, bot, and multi-role permission boundaries are absent (`snapshot.md:3,13–14`). | Cannot establish least privilege, absence of `Administrator` across all roles, hierarchy safety, or staff coverage. | **Role preview:** inspect role definitions, category inheritance, exceptions, per-user overrides, and relevant combinations. **Human attestation:** confirm role assignments and approved operational duties. Two maintainers do not prove moderator or recovery coverage. |
| Conduct intake visibility and scope are unknown; only staff hiding is recorded (`snapshot.md:5,14`). | Cannot confirm conduct intake is narrower than general staff discussion. | **Role preview:** inspect the conduct boundary if a Discord intake exists. **Human attestation:** confirm owner intake, private durable records, recusal, and backup. |
| Verification level, minimum-age policy, moderator/admin MFA, raid protections, content filtering, DM safety, and moderation operations are undocumented; AutoMod behavior is expressly unobserved (`snapshot.md:16,19`). | Cannot assess abuse prevention, enforcement, or incident accountability. | **Human attestation:** review non-secret settings and approved synthetic tests for mention spam, suspected spam, abuse, unwanted external invites, and credential-like strings. Credential matches must be blocked with a revocation warning and no matched-content alert; non-credential alerts must route privately. Confirm safety actions and audit-event attribution. |

### 2. Joining, forums, and durable routing

| Gap and evidence source | Impact of missing evidence | Required verification class and method |
| --- | --- | --- |
| Onboarding and Rules Screening are unobserved (`snapshot.md:16`); Community is enabled (`snapshot.md:9`). | Joining and rules acceptance remain unproven. These checks are not inapplicable merely because evidence is missing. | **Real member:** verify screening, valid answers for required questions, safe interest-role assignment, useful defaults, and three accessible starter tasks. |
| Server Guide configuration and resources are not supplied (`snapshot.md:19`). | Cannot confirm working resource links or absence of confidential content in the global guide. | **Role preview:** inspect global resource exposure. **Real member:** verify resources and canonical links render from read-only backing channels and open correctly. |
| Forum posting and tag enforcement were not tested (`snapshot.md:15`). Guidelines, templates, and lifecycle evidence are absent. | Cannot confirm users can submit useful, properly tagged reports or that staff can advance them. | **Real member:** create a purpose-tagged post, verify no-tag rejection and workflow-tag restrictions, and inspect guidelines. **Human attestation:** verify staff state changes, issue-tracker linking, private security routing, and removal of test content. Templates should request versions, runtime, expected/observed behavior, and a sanitized reproduction. |
| Route names exist but no published links or lifecycle evidence is supplied (`snapshot.md:4–5,19`). | Support/bugs may not reach the issue tracker; off-Discord security and conduct continuity is unproven. | **Real member:** verify published route links reach intended destinations. **Human attestation:** confirm actual handoffs, private security-form handling, and owner conduct intake work without Discord; confirm durable conduct storage. Do not replace the supplied routes. |
| Welcome, rules, seed content, support expectations, and remaining durable destinations are absent (`snapshot.md:3–5,10,19`). | Cannot assess whether a beta user can orient themselves or know what response to expect. | **Real member:** inspect content for the existing community jobs. **Human attestation:** confirm response ownership and destinations for any additional consequential workflows. No new channels are implied. |
| Voice is unobserved (`snapshot.md:16`); separate billing/account or confidential-cohort needs are unspecified. | Cannot determine applicability or confirm sensitive/opt-in access in practice. | **Human attestation:** establish whether these areas exist. **Role preview** and **real member:** verify applicable visibility, opt-in, and combined-role boundaries. An invited beta population alone does not establish a separate confidential program. |

### 3. Ownership, invites, integrations, and optional operations

| Gap and evidence source | Impact of missing evidence | Required verification class and method |
| --- | --- | --- |
| Recovery arrangements were not observed (`snapshot.md:16`). | Continuity and independent recovery are unproven. | **Human attestation:** confirm owner MFA, externally stored recovery material, a human successor/second operator, no shared account, and approved recovery capability. **Role preview:** confirm backup hierarchy and required bot-management scope if applicable. Never inspect recovery material. |
| Invite approval history, expiry, use limits, ownership, temporary membership, and revocation are absent (`snapshot.md:3,17,19`). No fresh test account is available (`snapshot.md:15`). | Existing beta membership does not prove controlled joining or bounded invitations. | **Human attestation:** confirm non-secret invite settings and human-only handling. A future approved fresh-account test requires a single-use, short-lived invite; a human verifies second-use rejection. No invite creation is authorized here. |
| Cohort role assignment capability and new/existing-member behavior are unknown (`snapshot.md:19`). | If separate cohort access is needed, assignment and isolation remain unproven. | Establish applicability first. **Real member:** verify baseline hiding, cohort visibility, and first-new-member low-privilege assignment when supported. **Human attestation:** confirm manual fallback, existing-member role checks, and post-onboarding revocation. **Role preview:** verify private start-channel read-only controls and combined roles. |
| No integrations were approved (`snapshot.md:17`), but installed inventory and data access are not supplied. | Cannot name integrations accessing community data or conclude that access is absent. | **Human attestation:** provide a non-secret inventory. If any exist, review workflow need, approval, owner, privacy/retention/deletion/export boundaries, and removal path. **Role preview:** verify named-channel access, minimum permissions, hierarchy, and no `Administrator`. Release-event filtering, human-only credential handling, and test cleanup need **human attestation** if applicable. |
| Assets, canonical brand sources, managed storage, recurring events, hosts, and review schedule are undocumented (`snapshot.md:19`). | Applicability and operational ownership remain unknown; absence is not a defect. | **Human attestation**, if present: confirm canonical sources, individual asset review, raster/native-vector preservation, SVG restrictions and rendered parity, live-product visual provenance, full-series event updates and crop checks, host/backup, cadence/timezone, and durable outcomes. |

## Not-applicable and deferred work

- **Community-disabled text fallbacks:** Not applicable because Community is recorded as enabled (`snapshot.md:9`).
- **Installation, webhook setup, event/asset creation, invite creation, server changes, and launch acceptance:** Outside this audit's authorization. No such work or modifying tests were performed.
- **Bot, release integration, private-cohort, asset, and recurring-event checks:** Applicability is unknown, not automatically not applicable. No approved integrations is not an installed inventory.
- **Operating plan and state file:** Not required for audit mode. The local workflow ends at A3; `STATE-TEMPLATE.md` is for later greenfield or improvement work.

## Handoff and verification limits

**Verified only from supplied evidence:** recorded Community and channel configuration; the stated announcement denial set and support tag policy; the supplied role-preview results for staff/opt-in hiding and the interest role. Only the latter are role-preview passes. No real-member checks passed, and no recovery, invite, or credential-handling assurances were independently attested.

**Remaining human actions, if a follow-up is authorized:** provide non-secret role and installed-integration inventories, attest ownership/recovery and moderation controls, and arrange fresh-member verification. Keep support and bugs in the issue tracker, security reports in the private security-reporting form, and conduct reports with the human owner. Any later correction requires a separately approved improvement plan.

**Staffing:** The snapshot records two maintainers but does not establish which roles still need members. Moderator, backup, successor, and operational assignments need confirmation.

**Review timing:** Review after the missing evidence and fresh-member access become available, preferably before inviting another beta cohort or expanding access. No review date is recorded or scheduled by this audit.

**Completion limit:** This report completes the offline audit, not server verification or launch acceptance. No server changes were made. No live services, other skills, delegation, or files outside this workspace were used. No project type-check or lint configuration is supplied; this Markdown-only audit was checked against the local criteria and snapshot rather than executable tests.
