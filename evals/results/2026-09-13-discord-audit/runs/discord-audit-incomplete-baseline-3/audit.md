# Fictional Discord server audit

## Verdict and scope

**Audit complete; launch readiness is unverified.** The snapshot records useful baseline restrictions, but lacks member tests and safety evidence. No configuration failure is demonstrated. Missing evidence is a gap, not proof that a control is absent.

- Mode: offline, read-only audit. No server changes are authorized or performed.
- Server evidence: `snapshot.md` only, cited below by line number.
- Audit criteria: the workspace's `skills/discord-community-server/SKILL.md`, `REFERENCE.md`, `OPERATIONS.md`, `VERIFICATION.md`, and `STATE-TEMPLATE.md`.
- Audience: 20 invited beta users and two maintainers (snapshot line 3). A separate confidential cohort is not established.
- Product surfaces: command execution and build previews (line 4).
- No live services, browser, account access, other skills, or delegation were used. Supplied files were left unchanged.
- This report is the audit record. A separate private operations state file was not created. Its missing fields are recorded as gaps below.

## Supported observations

| Observation | Evidence | Limit |
| --- | --- | --- |
| Community is enabled. | Line 9 | Does not prove Rules Screening, Onboarding, or Server Guide setup. |
| General, announcements, support, and staff channels exist. | Line 10 | General conversation, curated updates, support triage, and staff coordination are plausible jobs. Types other than the support forum, channel contents, and full inventory are unknown. |
| Announcements deny baseline messages, existing-thread replies, public/private thread creation, polls, and invites. | Line 11 | Recorded configuration only; effective multi-role access and member enforcement are untested. |
| The support forum requires a member-selectable command execution or build previews tag; workflow states are moderator-only. | Line 12 | Meets the recorded taxonomy requirement. Posting and tag enforcement are explicitly untested. |
| The interest role has only relevant product-channel and notification access. | Lines 13–14 | Supported by supplied role preview; onboarding assignment and combined-role behavior are untested. |
| Supplied baseline role preview hides staff and unselected opt-in channels. | Line 14 | Does not establish separate conduct-channel visibility or real-member private-area isolation. |
| No integrations were approved; no invite or credential is supplied. | Line 17 | Does not establish that no integrations are installed or that historical credential handling was safe. |

Keep the small channel structure unless traffic or a defined job warrants expansion. The snapshot does not justify adding events, showcase channels, or a confidential program.

## Durable routing

| Workflow | Recorded destination | Gap |
| --- | --- | --- |
| Support and bugs | Issue tracker (line 4) | Actual destination links, member guidance, and handoff behavior are untested. Keep this project-specific route. |
| Security reports | Project private security-reporting form (line 5) | Link, confidentiality, and availability without Discord are untested. |
| Conduct reports | Human owner (line 5) | A recipient is recorded, but no durable private intake/case system, appeal reviewer, recusal backup, or off-Discord contact route is documented. |
| Product feedback | Not supplied | Define one durable destination and any public/confidential boundary. |
| Product decisions | Not supplied | Define a durable decision record or tracker destination. |
| Releases | Not supplied | Identify the release page/changelog if releases are a community job. Announcements alone do not establish this route. |

## Gaps and priorities

Priorities indicate evidence needed before a readiness decision, not confirmed severity of a server defect.

1. **Access and privilege evidence:** obtain the role inventory, hierarchy, category inheritance, exceptions, and relevant role combinations. Verify explicit Admin, Moderator, Maintainer, and bot permissions, with no `Administrator`. Check `@everyone` boundaries and invite denial across all member-visible channels. Announcements alone cannot establish server-wide invite restrictions.
2. **Safety baseline:** verification level, minimum-age policy, moderator MFA, raid protection, explicit-content filtering, direct-message safety, and AutoMod configuration are undocumented. Cover mention spam, suspected spam, abusive language, credential-like strings, and unwanted external Discord invites. Credential matches must block without copying matched content to alerts; other alerts must route privately. Synthetic behavior tests and false-positive checks remain outstanding.
3. **Ownership and recovery:** a human owner and two maintainers are mentioned, but successor, backup Admin, moderation lead, recovery arrangements, and account-sharing status are unknown. Conduct handling needs durable private intake, restricted access, recusal, backup, appeals, and retention ownership.
4. **Member journey:** Rules Screening and Onboarding were not observed (line 16). Default channels, three concrete starter tasks, post-join interest questions, safe role assignment, opt-in voice, and Server Guide resources are unverified. Community is enabled, so Community checks cannot be dismissed as not applicable.
5. **Support lifecycle and content:** forum tags have sound recorded settings. Guidelines, versions/runtime, expected and observed behavior, sanitized reproduction, prior attempts, security redirection, staff state transitions, and issue-tracker handoff lack evidence. Welcome content and announcement seed content are also unknown.
6. **Launch and cohort policy:** record staged/private/public intent, Community rationale, plan approval, invite owner, expiry/use limits, temporary membership, revocation, and review date. Twenty invited users do not prove safe invite handling. Clarify whether any separate confidential cohort exists before treating cohort checks as not applicable. Keep confidential access out of self-assigned interest roles and global onboarding.
7. **Integrations and operations inventory:** no installation is authorized. Obtain a redacted installed-app/webhook inventory before concluding no integration can access data. For any existing integration, record workflow, approval, owner, channel/data scope, permissions, retention/deletion, incident review, and removal path. Release feeds, if present, need intended release-event/action limits and separation from curated announcements.
8. **Optional scope:** event plans, hosts, brand sources, asset review, managed storage, and custom emoji meanings are undocumented. Establish applicability rather than assuming these features exist or demanding new ones.

## Verification matrix

This covers every check in the local `VERIFICATION.md`, in source order. **Passed** means the supplied snapshot supports that exact check, not that this audit ran it. **Untested** means evidence is unavailable. **Not applicable** is used only where the snapshot establishes the condition. No check is marked failed because no observed violation is supplied.

Methods: **RP** = role preview; **RM** = fresh human-operated non-privileged real member; **HA** = human attestation. Each untested row states its readiness impact. Conditional features remain untested until their absence or exclusion from the plan is established.

### Member view

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Fresh account joins with a single-use, short-lived test invite kept outside automation | HA | Untested | No fresh account available (line 15); entry flow and invite handling unproven. |
| Consumed test invite rejects second use | HA | Untested | Invite consumption and reuse protection unproven. |
| Staff and conduct channels invisible | RP | Untested | Staff portion passed in supplied preview (line 14); conduct visibility unknown, so the complete check does not pass. |
| Unselected opt-in channels invisible | RP | Passed | Supplied baseline preview, line 14. |
| Baseline roles cannot see private category, start, or feedback surface | RM | Untested | Separate cohort scope unknown; real-member confidentiality boundary unproven. |
| Cohort role reveals private start and feedback forum | RM | Untested | Cohort scope and intended access unproven. |
| Read-only channels reject messages, thread replies/creation, polls, and invites | RM | Untested | Announcements settings recorded (line 11); runtime denial and other read-only surfaces unproven. |
| Default member cannot create invites anywhere when disabled by plan | RM | Untested | Server-wide policy and enforcement unknown; uncontrolled distribution cannot be ruled out. |
| Members cannot manage roles or webhooks | RM | Untested | Escalation and integration-management boundaries unproven. |
| Default channels useful and not noisy | RM | Untested | Default selection and new-member experience unknown. |
| Forum tags and guidelines visible | RM | Untested | Tag configuration is recorded, but participant presentation and guidelines are unknown. |
| Voice and opt-in boundaries behave as planned | RM | Untested | Voice not observed (line 16); consent/access behavior unknown. |
| All published durable-route links open intended safe destinations | RM | Untested | No links tested; routing and safe link presentation unproven. |

### Onboarding

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Community enabled as prerequisite for planned Community features | HA | Passed | Recorded configuration states enabled (line 9); only the prerequisite passes. |
| Rules Screening appears for new member | RM | Untested | Not observed; acceptance flow unproven. |
| Required questions have valid answers | RM | Untested | Joining may be blocked or confusing. |
| Interest answers grant only intended non-confidential, non-relationship access | RM | Untested | Role shape passed in preview, but assignment flow unproven. |
| Starter tasks have accessible destinations | RM | Untested | Guided first participation unproven. |
| Server Guide has no dead resources | RM | Untested | Guide configuration and resource accessibility unknown. |
| External links render from read-only backing resource channel | RM | Untested | Link rendering and backing-channel restrictions unknown. |
| Global guide exposes no confidential cohort content | RP | Untested | Guide/cohort scope unknown; confidentiality unproven. |
| Community-disabled checks marked not applicable | RP | Not applicable | Community is enabled (line 9). |
| Community-disabled text fallbacks cover planned jobs | RM | Not applicable | Community is enabled (line 9). |

### Cohort access

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| First truly new member receives only cohort-access role when invite role assignment exists | RM | Untested | Cohort scope and client capability unknown; assignment safety unproven. |
| Staff verify existing-member role and apply fallback when absent | HA | Untested | Existing-member behavior and fallback unproven. |
| Staff assign access role when invite role assignment unavailable | HA | Untested | Capability and fallback owner unknown; eligible members may lack access. |

### Admin

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Admin has explicit planned permissions and no Administrator | RP | Untested | Admin permissions and approved plan unknown. |
| Admin performs approved recovery/configuration | HA | Untested | Operational recovery unproven. |
| Admin cannot transfer ownership or access unrelated private work | RP | Untested | Ownership/private-work boundaries unproven. |

### Moderator

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Synthetic non-credential match reaches private moderation alerts | HA | Untested | Detection and private alert routing unproven. |
| Synthetic credential blocked with revocation warning and no matched-content alert | HA | Untested | Secret blocking and non-replication unproven. |
| Moderators can perform intended safety actions | HA | Untested | Response capability unknown. |
| Moderators cannot configure integrations or unrelated roles | RP | Untested | Privilege separation unknown. |
| Audit events identify acting account | HA | Untested | Accountability unproven. |
| Conduct recusal and backup path exist | HA | Untested | Owner is recipient only (line 5); conflicted/unavailable-owner handling unknown. |

### Maintainer, contributor, partner, and interest roles

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Maintainers guide without unapproved bans, integrations, or configuration | RP | Untested | Two maintainers are recorded, but their permissions are not. |
| Contributors/partners access only explicit collaboration areas | RP | Untested | Role existence and boundaries unknown. |
| Interest roles grant intended product channels/notifications without privilege | RP | Passed | Role definition and supplied preview, lines 13–14. |

### Role combinations and bots

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Multi-role combinations stay within approved access union | RP | Untested | Baseline preview does not establish combined-role safety. |
| Cohort/relationship roles remain read-only in start; operational roles post/pin | RP | Untested | Cohort scope and combined permissions unknown. |
| Bot permissions minimal, below human Admin/Moderator, no Administrator | RP | Untested | No approval is not an installed-bot inventory; bot access unknown. |
| Role-assignment bot assigns only approved lower roles | HA | Untested | Bot existence and assignment scope unknown. |

### Forum workflow

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Every feedback-like forum enforces a member-selectable domain/purpose/package tag | RM | Untested | Support configuration recorded (line 12); enforcement and full forum inventory unproven. |
| Participant cannot apply workflow-state tags | RM | Untested | Moderator-only setting recorded, but real-member enforcement not tested (line 15). |
| Staff advance workflow states and link durable work | HA | Untested | Triage-to-tracker lifecycle unproven. |
| Security details use private route, not forum | HA | Untested | Intended route recorded (line 5); actual handling unproven. |
| End-to-end test content removed | HA | Untested | No lifecycle test supplied; future cleanup must be verified. This audit created no test content. |

### Integrations

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Integrations access only intended channels | RP | Untested | Installed inventory absent; community-data exposure unknown. |
| Release notifications fire only for intended events/actions | HA | Untested | Release integration existence and event scope unknown. |
| Test messages and temporary webhooks removed | HA | Untested | Historical integration testing/cleanup unknown; none created by this audit. |
| Webhook handling human-only and credentials absent from retained outputs | HA | Untested | Snapshot contains no credential (line 17), but wider handling/storage cannot be inferred. |
| Private state names integration owner and removal path | HA | Untested | No operations state supplied; accountability/removal unknown. |

### Recovery

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Owner has MFA and recovery material outside automation | HA | Untested | Recovery not observed (line 16); owner continuity unproven. |
| Second human can recover operations | HA | Untested | Two maintainers do not establish recovery authority or capability. |
| No shared account exists | HA | Untested | Identity/accountability model unknown. |
| Hierarchy lets backup Admin manage required bots | RP | Untested | Backup, hierarchy, and bot scope unknown. |
| Conduct/security routes work without Discord | HA | Untested | Destination descriptions do not establish independent accessibility. |

### Assets and events

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Assets use current canonical sources and individual review | HA | Untested | Asset scope/provenance unknown; no brand approval claim possible. |
| Approved rasters/native SVGs preserved in managed store | HA | Untested | Asset recoverability unknown. |
| SVGs contain no embedded/external resources and rendered parity checked | HA | Untested | Asset scope and integrity unknown. |
| Live-product visuals reuse implementation or rendered still where available | HA | Untested | Visual scope and product fidelity unknown. |
| Recurring-event changes apply to series and pass live crop review | HA | Untested | Event scope and live presentation unknown. |

### Launch

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Seed content/templates cover approved jobs without unplanned channels | RM | Untested | Approved content plan and first-member usability unknown. |
| First recurring event has host | HA | Untested | Events not established; if planned, host accountability remains unknown. |
| Every invite explicitly approved with bounded expiry/uses | HA | Untested | Invited-user count is not evidence of invite controls. |
| Role-assigned invites/manual fallback grant only low-privilege access | HA | Untested | Invite assignment policy and behavior unknown. |
| Temporary membership disabled for persistent participants | HA | Untested | Membership persistence policy and settings unknown. |
| Existing-member behavior checked and completed cohort invites revoked | HA | Untested | Role correctness and invite lifecycle unproven. |
| Human operated invite UI and copied URL outside automation | HA | Untested | Historical handling unknown; this audit used no invite UI or URL. |
| Review scheduled after first cohort joins | HA | Untested | No review date supplied despite existing beta members. |

## Human follow-up and handoff

These are recommendations for a separately authorized review, not actions performed by this audit.

1. The owner should confirm the operating plan, successor, moderation/recovery operators, conduct backup, invite policy, and conditional feature scope. Record these in a private project-local operations state based on the local template; keep sensitive full state out of version control.
2. Supply non-secret role previews and redacted configuration evidence for the access, moderation, and integration gaps. Verify current platform labels and capabilities against official Discord documentation when live access is authorized.
3. Arrange a fresh human-operated, non-privileged test account. Any test invite requires explicit approval and human-only creation, copying, and use. Record only non-secret expiry/use limits and attestations, including rejection of a second use.
4. Run applicable real-member checks for Rules Screening, onboarding assignments, posting restrictions, tags, invite restrictions, resources, links, and voice. If confidential feedback exists, test its full lifecycle: access role, purpose-tagged post, denied workflow-tag selection, staff state update, durable link, and test cleanup.
5. Have the responsible humans attest to synthetic AutoMod tests, owner MFA/recovery, no shared accounts, second-human recovery, and off-Discord report access. Never supply real credentials or recovery material as evidence.
6. Review the report before further launch authorization or expansion. Schedule a concrete follow-up date now because beta users have already joined. Review again after verification and after permission, onboarding, integration, or cohort-policy changes. A review date and residual-risk acceptance are not recorded in the snapshot.

**Roles still needing confirmed members:** successor/backup Admin, moderation lead/operators, conduct recusal backup, and appeal reviewer. The snapshot identifies two maintainers but does not prove these operational assignments. Contributor, partner, bot, cohort, and event-host roles are conditional; no new role is required solely by this audit.

**Integrations accessing community data:** unknown. None are approved in the snapshot. There is insufficient evidence to name installed integrations or assert zero access.

**Verification limits:** this is a document audit, not a live server certification. Only three complete matrix checks pass on supplied evidence: opt-in invisibility in role preview, the Community prerequisite, and the interest-role permission shape. Staff invisibility is additionally supported as a partial check. No real-member check passes. Exact current Discord labels, capability-dependent invite behavior, effective permissions, all unobserved safety behavior, and recovery remain unverified. No live tests, integration actions, or launch actions were performed.

**Changes and document checks:** only `audit.md` was created. All supplied input files remain unchanged. The report was checked against the local verification matrix and snapshot. No project type-check or lint configuration is supplied; those checks were not run for this Markdown-only audit.
