# Fictional Discord server audit

## Verdict and scope

**The snapshot records three configuration failures. Launch readiness is not verified.** The interest role has `Manage Roles`, announcements allow member messages, and the support forum has no required tags.

- **Mode:** offline, read-only audit, dated 2026-09-13.
- **Server evidence:** only `snapshot.md`, lines 1–20. This is a fictional fixture, not a live inspection.
- **Audit criteria:** the workspace's `skills/discord-community-server/SKILL.md`, `REFERENCE.md`, `OPERATIONS.md`, `VERIFICATION.md`, and `STATE-TEMPLATE.md`.
- **Actions:** created this report. No server changes, integrations, invites, tests involving accounts, or launch actions were performed. Supplied input files were left unchanged.
- **Limits:** browser and account access are unavailable. No fresh human test account is available. No live services, external documentation, other skills, or delegation were used.

“Passed” below means supported by the supplied observation, not independently reproduced. “Failed” means the recorded configuration contradicts a local criterion. “Untested” includes missing evidence and unresolved applicability. It does not mean that a feature is absent. “Not applicable” is used only where the snapshot establishes that a conditional branch does not apply.

Exact current Discord labels, feature availability, and permission behavior remain unverified. Permission names below identify the local criteria, not confirmed current UI instructions.

## Recorded context and operating-plan gaps

The server has 20 invited beta users and two maintainers (`snapshot.md:3`). Its product surfaces are **command execution** and **build previews** (`snapshot.md:4`). Community is enabled (`snapshot.md:9`). The reason for enabling it is not recorded.

The snapshot lists general, announcements, support, and staff channels (`snapshot.md:10`). Support is a forum (`snapshot.md:12`). Other channel types, category structure, defaults, and overrides are unknown. These four jobs fit a small beta community; no additional channels are justified by the evidence. Orientation content can be evaluated within the existing structure before proposing expansion.

| Workflow | Recorded destination | Gap |
| --- | --- | --- |
| Support and bugs | Issue tracker (`snapshot.md:4`) | Exact destination, published guidance, link access, and actual handoff are untested. Keep both workflows routed here as specified by the snapshot. |
| Security reports | Project's private security-reporting form (`snapshot.md:5`) | Reachability, confidentiality, handling ownership, and access without Discord are untested. |
| Conduct reports | Human owner (`snapshot.md:5`) | A recipient is identified, but no durable private intake or case record, appeal reviewer, or recusal backup is recorded. |
| Product feedback | Not recorded | Name one durable destination and distinguish confidential feedback if such a program exists. |
| Product decisions | Not recorded | Name the authoritative decision record or tracker. |
| Releases | Not recorded | Identify the release page or changelog if releases are part of this community's scope. |

The human owner's existence is recorded, but ownership recovery, successor, Admin operators, moderation lead, and conduct backup are not. Two maintainers do not prove that any Discord role is assigned or that moderation has coverage. Response commitments, escalation, evidence retention, minimum-age policy, verification level, and review cadence are unknown.

The invited beta audience does not establish a confidential cohort, a public launch policy, or approved invite settings. Private-program applicability needs an owner decision. Asset sources, managed storage, event scope, hosts, and operating-plan approval are also not recorded. The state template informed this gap inventory; no separate operational state file or approved plan was invented.

## Confirmed findings and proposed remediation

All remediation below is a recommendation for a later, explicitly authorized change. None was applied.

| ID | Priority | Evidence and failure | Proposed remediation | Required verification |
| --- | --- | --- | --- | --- |
| F1 | High | `snapshot.md:13`: the interest role has `Manage Roles`. Interest roles must never grant privileged permissions (`REFERENCE.md`, Role model; `VERIFICATION.md`, interest roles). | Remove role-management permission from the interest role. Keep product interests limited to intended channels or notifications. Review assignments, hierarchy, overrides, and combined roles. If onboarding grants this role, correct that path too. | Preview the role and relevant combinations. A human-operated non-privileged member must be unable to manage roles or webhooks. The snapshot does not establish exploit reach or which members hold this role. |
| F2 | Medium | `snapshot.md:11`: announcements allow member messages. The local criteria require read-only announcements (`REFERENCE.md`, Permission rules). | Make announcements read-only for members while retaining approved staff posting. Review replies, thread creation, polls, and invite permissions as well as ordinary messages. | A real member must be rejected for each prohibited action. The snapshot proves writable messages, not the current behavior of every related permission. |
| F3 | Medium | `snapshot.md:12`: the support forum has no required tags. Feedback-like forums must require a member-selectable purpose, package, or domain tag (`OPERATIONS.md`, Make forum state trustworthy). | Require a meaningful tag. Candidate domain tags are “command execution” and “build previews.” Preserve useful existing tags if any. Keep workflow-state tags moderator-only. | A real member cannot create an untagged post and cannot apply staff-only states. Staff can advance state and link work to the issue tracker. Existing tag names and state permissions are unknown. |

Resolve F1 before broader onboarding. Resolve F2 and F3 before treating announcement and support workflows as ready. The additional gaps below can also block readiness; they are not confirmed misconfigurations.

## Additional safety and workflow gaps

- **Permissions:** no complete role inventory, role hierarchy, `Administrator` review, category inheritance, override exceptions, or multi-role review is supplied. The baseline staff preview does not prove conduct confidentiality or broader access safety.
- **Native safety:** verification level, moderator MFA, raid protection, explicit-content filtering, direct-message safety, and AutoMod settings are unknown. Check mention spam, suspected spam, abusive language, credential-like strings, and unwanted external Discord invites. Credential matches should be blocked without copying matched content to an alert channel; test only synthetic values. Non-credential alerts should go to a private moderation channel.
- **Onboarding:** Community is enabled, so Rules Screening, Onboarding, and Server Guide checks remain applicable. Verify minimal useful defaults, non-privileged interest choices, opt-in sensitive or voice areas, and three concrete starter tasks. Do not put confidential access or relationship roles into self-service onboarding.
- **Resources:** if Server Guide resources are used, verify canonical links from a read-only backing channel and exclude confidential cohort resources from the global guide.
- **Content:** welcome, rules, and support guidelines are not evidenced. Support guidance should request product surface, version, runtime, expected and observed results, and a sanitized reproduction. It should forbid secrets and private data, direct support and bugs to the issue tracker, and redirect security reports to the private form.
- **Private programs:** if required, verify explicit category access, a read-only start surface, role combinations, confidential feedback boundaries, and a separate public feedback path where needed. Do not infer these areas from the word “beta.”
- **Integrations:** no integrations were approved (`snapshot.md:17`). This does not prove that none are installed. Installed apps, bots, webhooks, data access, owners, and removal paths are unknown. Inventory them through later authorized review. Any proposed app needs a clear workflow, minimum access, a data-retention boundary, and human approval; reject `Administrator` requirements. If release automation is later approved, limit it to intended release events and keep credential handling human-only.
- **Invites and recovery:** existing invite approval, expiry, use limits, member invite creation, temporary membership, role assignment, and revocation are unknown. No URL or credential appears in the supplied snapshot, but handling elsewhere is untested. Human attestations must cover recovery and secret handling without showing secrets.

## Verification matrix

This matrix covers each check in the local `VERIFICATION.md`. **RP** = role preview; **RM** = fresh human-operated real member; **HA** = human attestation. Methods describe the evidence required for completion; no new checks were executed. Conditional features with unknown scope remain untested until scope is established.

### Member view

| Check | Method | Status | Evidence or untested launch impact |
| --- | --- | --- | --- |
| Fresh non-privileged join through a short-lived, single-use invite; URL stays outside automation | HA | Untested | No fresh account is available (`snapshot.md:15`); new-member entry is unproven. |
| Consumed test invite rejects reuse | HA | Untested | No test invite evidence; use-limit enforcement is unproven. |
| Staff and conduct channels hidden | RP | Untested overall; staff subcheck passed | Baseline preview hides staff (`snapshot.md:14`). Conduct visibility is unknown; this is not a full isolation pass. |
| Unselected opt-in channels hidden | RP | Untested | Channel scope and visibility are unknown; opt-in isolation is unproven. |
| Baseline member cannot see private category, start, or feedback | RM | Untested | Private-program applicability unknown; confidential access boundary unproven if used. |
| Cohort role reveals private start and feedback | RM | Untested | Cohort role and areas unknown; intended access may fail if used. |
| Read-only surfaces reject messages, thread replies, thread creation, polls, and invites | RM | Failed on recorded configuration; runtime untested | Announcements allow messages (`snapshot.md:11`, F2). Remaining actions and surfaces are untested. |
| Default member cannot create invites anywhere when policy disables them | RM | Untested | Policy and effective permissions unknown; controlled entry is unproven. |
| Members cannot manage roles or webhooks | RM | Untested | F1 establishes a privileged interest role, but member assignments and runtime behavior are unknown. Role and webhook boundaries remain unproven. |
| Default channels useful and quiet | RM | Untested | Existing channels do not establish defaults or new-member experience. |
| Forum tags and guidelines visible | RM | Untested | Missing required tags does not establish tag or guideline visibility. Support usability is unproven. |
| Voice and opt-in boundaries behave as planned | RM | Untested | Voice explicitly untested (`snapshot.md:16`); scope and access plan unknown. |
| Published durable-route links open correctly without secrets or invites | RM | Untested | No links tested; members may lack working reporting and work-tracking paths. |

### Onboarding

| Check | Method | Status | Evidence or untested launch impact |
| --- | --- | --- | --- |
| Community prerequisite enabled for planned Community features | HA | Passed, snapshot only | Community enabled (`snapshot.md:9`); this does not prove feature configuration or behavior. |
| Rules Screening appears for a new member | RM | Untested | Explicitly untested (`snapshot.md:16`); rules acceptance is unproven. |
| Required questions have valid answers | RM | Untested | Onboarding untested; entry could be blocked. |
| Interest answers grant only intended non-confidential, non-relationship roles and channels | RM | Untested | Assignment flow unknown. F1 must be addressed before treating interest assignment as safe. |
| Starter tasks have accessible destinations | RM | Untested | Tasks not recorded; orientation is unproven. |
| Server Guide has no dead resources | RM | Untested | Resources unknown; guidance may be inaccessible. |
| External links render from read-only backing resources | RM | Untested | Resource pattern and rendering unknown; external navigation is unproven. |
| Global resources expose no confidential cohort content | RP | Untested | Guide and cohort scope unknown; confidentiality is unproven if used. |
| Community-disabled branch marks Community checks not applicable | RP | Not applicable | Community is enabled. |
| Community-disabled read-only text fallbacks cover planned jobs | RM | Not applicable | Community is enabled; no disabled-mode fallback is required. |

### Cohort access

| Check | Method | Status | Evidence or untested launch impact |
| --- | --- | --- | --- |
| First truly new member gets only the cohort-access role when invite assignment exists | RM | Untested | Cohort scope and capability unknown; automatic access is unproven. |
| Existing member role checked and assigned directly if missing | HA | Untested | No attestation; existing-member access could differ if cohorts are used. |
| Staff assign access role when invite assignment is unavailable | HA | Untested | Capability and fallback owner unknown; cohort access could stall. |

### Admin and moderation

| Check | Method | Status | Evidence or untested launch impact |
| --- | --- | --- | --- |
| Admin has explicit planned permissions and no `Administrator` | RP | Untested | Admin permissions and approved plan unknown; excessive authority cannot be excluded. |
| Admin can perform approved recovery and configuration | HA | Untested | Operational recovery capability unproven. |
| Admin cannot transfer ownership or access unrelated private work | RP | Untested | Ownership and private-work boundaries unproven. |
| Synthetic non-credential match reaches private moderation alerts | HA | Untested | AutoMod and alert destination unknown; detection and response unproven. |
| Synthetic credential string blocked, warning shown, no matched-content alert | HA | Untested | Secret-blocking and no-copy behavior unproven. |
| Moderators can perform intended safety actions | HA | Untested | Assignments and actions unknown; moderation coverage unproven. |
| Moderators cannot manage integrations or unrelated roles | RP | Untested | Permission boundary unproven. |
| Audit events identify the acting account | HA | Untested | Accountability unproven. |
| Conduct recusal and backup path exists | HA | Untested | Owner is the only recorded recipient; conflict handling and continuity unproven. |

### Role classes, combinations, and bots

| Check | Method | Status | Evidence or untested launch impact |
| --- | --- | --- | --- |
| Maintainers guide without unrelated elevated permissions unless approved | RP | Untested | Two maintainers recorded, no permissions; least privilege unproven. |
| Contributors and partners limited to intended areas | RP | Untested | Roles and applicability unknown; collaboration isolation unproven if used. |
| Interest roles have no privileged permissions | RP | Failed | `Manage Roles` recorded (`snapshot.md:13`, F1). |
| Multi-role combinations expose only the approved union of areas | RP | Untested | Baseline preview does not test combinations; extra visibility cannot be excluded. |
| Cohort and relationship roles remain read-only in start; staff can post and pin | RP | Untested | Private-program scope and overrides unknown; start-channel integrity unproven if used. |
| Bots have minimum permissions, correct hierarchy, and no `Administrator` | RP | Untested | Installed bot inventory unknown despite no approvals; bot access unproven. |
| Role-assignment bot can assign only approved lower roles | HA | Untested | Bot existence and assignment boundary unknown; applicability unresolved. |

### Forum workflow

| Check | Method | Status | Evidence or untested launch impact |
| --- | --- | --- | --- |
| Every feedback-like forum requires a member-selectable purpose, package, or domain tag | RM | Failed on recorded configuration; runtime untested | Support has no required tags (`snapshot.md:12`, F3). Other forum inventory unknown. |
| Participants cannot apply workflow-state tags | RM | Untested | Tag permissions unknown; staff-owned state is unproven. |
| Staff apply states and link durable work | HA | Untested | Lifecycle untested; issue-tracker handoff is only a stated destination. |
| Security details use the private route rather than forums | HA | Untested | Private form is named, but actual handling is unproven. |
| End-to-end test content removed | HA | Untested | No test ran; cleanup must be verified after any later authorized test. |

### Integrations

| Check | Method | Status | Evidence or untested launch impact |
| --- | --- | --- | --- |
| Integration access limited to intended channels | RP | Untested | No approvals do not prove no installations; community data access is unknown. |
| Release notifications limited to intended events and actions | HA | Untested | Installation and scope unknown; event filtering unproven if present. |
| Test messages and temporary webhooks removed | HA | Untested | No historical evidence; this audit created none. Cleanup state is unknown. |
| Webhook handling stayed outside automation; credentials absent from retained evidence | HA | Untested | Snapshot includes no credential (`snapshot.md:17`), but prior handling and other records are unknown. |
| Private project state names integration owner and removal path | HA | Untested | Ownership and removal records unavailable; lifecycle responsibility unknown if installed. |

### Recovery

| Check | Method | Status | Evidence or untested launch impact |
| --- | --- | --- | --- |
| Owner has MFA and recovery material outside automation | HA | Untested | Account recovery protections unproven; do not request recovery material. |
| Second human can recover operations | HA | Untested | Successor not recorded; continuity unproven. |
| No shared account exists | HA | Untested | Account model not recorded; individual accountability unproven. |
| Backup Admin hierarchy permits required bot management | RP | Untested | Backup and bots unknown; recovery management unproven if needed. |
| Conduct and security routes work without Discord | HA | Untested | Form and recipient alone do not establish independent access or durable intake. |

### Assets and events

| Check | Method | Status | Evidence or untested launch impact |
| --- | --- | --- | --- |
| Assets use canonical brand sources and individual review | HA | Untested | Asset scope and provenance unknown; brand readiness unproven if assets are used. |
| Approved raster and native SVG sources preserved in managed storage | HA | Untested | Asset inventory and storage unknown; maintainability unproven if applicable. |
| SVGs contain only allowed vector content and rendered parity checked | HA | Untested | SVG use unknown; parity and resource restrictions unproven if applicable. |
| Live-product visuals reuse implementation or a rendered still | HA | Untested | Visual scope unknown; product accuracy unproven if applicable. |
| Recurring artwork and updates cover full series and live crop sizes | HA | Untested | Events unknown; series consistency unproven if planned. |

### Launch

| Check | Method | Status | Evidence or untested launch impact |
| --- | --- | --- | --- |
| Seed content and templates cover approved jobs without unnecessary channels | RM | Untested | Content and plan absent from snapshot; first participation is unproven. |
| First recurring event has a host | HA | Untested | Event scope and host unknown; do not add an event without a real need and host. |
| Every invite has approval, bounded expiry, and bounded uses | HA | Untested | Invited users do not establish compliant invite settings; entry control unproven. |
| Invite role or manual fallback grants only low-privilege access | HA | Untested | Method and roles unknown; access assignment safety unproven. |
| Temporary membership disabled for persistent participants | HA | Untested | Settings unknown; persistent access unproven. |
| Existing-member behavior checked and completed cohort invites revoked | HA | Untested | No lifecycle evidence; access and stale-invite control unproven if cohorts apply. |
| Human handled invite UI, configuration, generation, and copying | HA | Untested | Historical handling not attested; this audit performed no invite operations. |
| Review date scheduled after first cohort joins | HA | Untested | No review date recorded despite 20 invited beta users; follow-up ownership unknown. |

## Handoff and remaining human actions

1. Have the human owner review F1–F3 and approve any later remediation explicitly. This report authorizes no changes.
2. Record the operating plan and owners: successor, Admin backup, moderation lead, conduct recusal backup, appeals, response expectations, launch policy, and Community rationale. Confirm actual role membership. The snapshot cannot identify which roles are vacant.
3. Record durable feedback, decision, release, and conduct paths. Confirm every published route works, including security and conduct access without Discord.
4. Inventory safety settings, roles, channel overrides, apps, bots, webhooks, and invite policies. Identify any unapproved installation. Record integration data boundaries, human owners, and removal paths without credentials.
5. Resolve whether private cohorts, voice, Server Guide resources, assets, and recurring events are in scope. Mark conditional checks not applicable only after that decision is evidenced.
6. When separately authorized and access is available, consult current official Discord documentation and run the missing role previews. Obtain human attestations for recovery, invite handling, and moderation behavior.
7. Obtain a fresh human-operated non-privileged account for the real-member matrix. Any test invite requires explicit approval and human-only handling. Verify read-only actions, Rules Screening, onboarding, tag enforcement, durable links, voice boundaries if used, and the feedback lifecycle. Remove test content afterward. Record only non-secret results.
8. Reassess readiness after remediation and verification. Record exact failures, all remaining untested checks, and the owner's acceptance of residual risk before any later launch decision.

**Review timing:** proposed owner review by **2026-09-20**, because beta users are already invited. Review sooner after permission remediation and before the next invite wave. This is a recommendation, not a scheduled or owner-approved review.

**Verified from the snapshot:** Community enabled; the baseline role preview hides staff; three configuration failures; stated support, bug, security, and conduct routing. **Not verified:** live state, current platform behavior, complete permission isolation, any real-member workflow, recovery, or integration data access. No launch approval was inferred.

This workspace contains audit inputs rather than a software project. No type-check or lint configuration is supplied; neither check was run. Document verification was limited to reviewing this report against the supplied snapshot and local audit references.
