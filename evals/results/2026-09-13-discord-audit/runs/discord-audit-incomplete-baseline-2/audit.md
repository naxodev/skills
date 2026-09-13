# Fictional Discord server audit

## Verdict and scope

**The recorded baseline is promising, but launch readiness is unverified.** No configuration failure is demonstrated by the snapshot. Significant evidence gaps prevent a full pass.

- Mode: offline, read-only audit.
- Server evidence: `snapshot.md` only, cited below as S with line numbers.
- Audit criteria: local `skills/discord-community-server/SKILL.md`, `REFERENCE.md`, `OPERATIONS.md`, `VERIFICATION.md`, and `STATE-TEMPLATE.md`.
- Audience: 20 invited beta users and two maintainers (S3). This suggests a private beta; the formal launch policy is not supplied.
- Product surfaces: command execution and build previews (S4).
- Change made: this audit document only. No server changes or integration, invite, or launch actions occurred. Supplied files were kept unchanged.
- No live services, browser, account access, other skills, delegation, or sources outside the workspace were used.

The state template informed the gap inventory. This report is not an approved operating plan or a completed operational state file. Missing operational facts are left unknown rather than invented.

## Recorded strengths

| Observation | Evidence | What it establishes |
| --- | --- | --- |
| Community is enabled | S9 | The recorded prerequisite for Community-only features exists; their configuration and behavior remain unverified. |
| General, announcements, support, and staff channels exist | S10 | A compact structure covers conversation, communication, support, and staff work. Orientation content is unknown. |
| Announcements deny baseline messages, thread replies, both thread-creation types, polls, and invite creation | S11 | Recorded read-only settings cover the required actions. This is not a real-member enforcement test. |
| Support requires a member-selectable product tag; workflow-state tags are moderator-only | S12 | The recorded taxonomy matches command execution and build previews. Posting and tag enforcement remain untested. |
| Staff and unselected opt-in channels are hidden in the supplied baseline preview | S14 | Those specific static visibility checks pass on supplied evidence. Conduct-specific visibility is not supplied. |
| The interest role has only relevant channels and notifications, with no privileged permissions | S13–14 | The supplied role preview supports a static least-privilege pass for this role only. |

## Gaps and recommended human follow-up

Priorities describe verification and planning needs, not proven vulnerabilities. All follow-up is proposed for a separately authorized human review.

### Priority 1 — Access, safety, and recovery

1. **Effective permissions are incomplete.** Obtain a non-secret inventory of `@everyone`, baseline, staff, bot, and combined-role permissions. Check category inheritance, exceptions, private-category visibility, hierarchy, and absence of `Administrator` across all roles and bots. The interest-role preview cannot establish these globally.
2. **Invite restrictions are only recorded for announcements.** The server-wide policy and restrictions on other member-visible channels are unknown. For a private launch, verify `@everyone` and channel overwrites prevent member-created invites everywhere. Existing invitations need human-attested approval, expiry, use limits, ownership, and revocation state.
3. **Native safety controls lack evidence.** Verification level, minimum-age policy, moderator MFA, raid protection, explicit-content filtering, direct-message safety, and Rules Screening are unknown. AutoMod configuration and behavior are unobserved (S16). Verify mention spam, suspected spam, abusive language, unwanted external invites, and credential-like strings. Use synthetic values only. Credential matches must be blocked without copying matched content into alerts, with a revocation warning to the sender. Other alerts should reach a private moderation destination.
4. **Recovery and conduct accountability are unresolved.** A human owner is referenced, but owner MFA, recovery arrangements, successor, backup administrator, and absence of shared accounts are not established. Name a moderation lead, conduct recusal backup, and appeal owner. Two maintainers do not prove those roles are staffed.
5. **Real-member verification is blocked.** No fresh human-operated non-privileged test account is available (S15). Static settings cannot prove posting, thread, poll, tag, onboarding, voice, or invite enforcement. No residual-risk acceptance or further-launch approval is supplied.

### Priority 2 — Participation and durable records

| Workflow | Recorded destination | Gap |
| --- | --- | --- |
| Support and bugs | Issue tracker (S4) | Exact canonical route, published guidance, link access, and staff handoff are untested. Preserve this project-specific routing. |
| Security | Private security-reporting form (S5) | Link access and use without Discord are untested; public guidance and redirection practice are unknown. |
| Conduct | Human owner (S5) | This names a recipient, not a durable private intake or case system. Storage, recusal, appeal, and an independent-of-Discord route are unknown. |
| Product feedback | Not supplied | Choose a durable tracker or issue template if this workflow exists. |
| Product decisions | Not supplied | Identify a durable decision record or tracker. |
| Releases | Not supplied | Identify the authoritative release page or changelog if applicable. |

- Community is enabled, so Rules Screening, Onboarding, and Server Guide checks cannot be dismissed as Community-disabled checks. Their presence and behavior are unknown.
- Confirm default channels, valid question answers, three concrete starter tasks, and non-privileged interest-role assignment. Recorded role permissions do not prove onboarding assigns the right role.
- Check Server Guide links through read-only backing resource channels. Verify that global resources expose no confidential content.
- Review welcome, rules, and support guidance. A support template should request product surface/version, runtime, expected and observed behavior, sanitized reproduction, and prior attempts. It should forbid secrets, personal/customer data, and private logs, and redirect security reports.
- Verify the feedback lifecycle: member creates a purpose-tagged post, cannot apply state tags, staff advances state and links durable work, and test content is removed.
- Do not infer a confidential cohort from “invited beta users.” Establish whether separate private program areas exist. If they do, review explicit access roles, read-only orientation, multi-role access, and separation of public and confidential feedback. Interest roles must not grant confidential access.
- No additional channels are justified by the supplied traffic or needs. Assess missing orientation as a community job before proposing new channels.

### Priority 3 — Inventory and ongoing operations

- No integrations were approved (S17). That does **not** establish that no integrations or bots are installed. Obtain a redacted inventory before claiming anything about community-data access. Any present integration needs a workflow, human owner, minimum channel/action access, data and retention boundary, removal path, and approval record. Reject any app requiring `Administrator`.
- Release automation is not authorized. If later proposed, keep automated release traffic separate from curated announcements and limit events/actions to intended releases. Webhook handling and testing remain human-only; collect only redacted state and non-secret outcomes.
- Assets, custom emoji, showcases, events, hosts, canonical brand sources, and managed asset storage are not described. Establish applicability before requiring new content. If used, review provenance, raster/vector preservation and parity, emoji meanings, and full-series event changes at live crop sizes.
- Record the reason for Community, response commitments, moderation escalation, operating-plan approval, privileged-action owners, and a next-review date in private project-local operational state when the human continues the work.

## Verification matrix

Statuses follow the local verification reference: **passed**, **failed**, **not applicable**, or **untested**. Passed means only the cited supplied evidence supports that exact check. No check was rerun against Discord. An untested result is not a pass or proof of a bad configuration.

Methods: **RP** = role preview; **RM** = fresh human-operated real member; **HA** = human attestation. Conditional features with unknown existence remain untested until applicability is established. Each untested row states the affected launch assurance.

### Member view

| Check | Method | Status | Evidence or verification limit and impact |
| --- | --- | --- | --- |
| Fresh baseline account joins with a human-only short-lived, single-use invite | HA | Untested | No account is available (S15); fresh joining is unproven. |
| Consumed test invite rejects reuse | HA | Untested | No invite test evidence; use-limit enforcement is unproven. |
| Staff channels invisible | RP | Passed | Supplied baseline preview hides staff (S14). |
| Conduct channels invisible | RP | Untested | Conduct channel existence and separate access are unknown; confidentiality is unproven. |
| Unselected opt-in channels invisible | RP | Passed | Supplied baseline preview hides them (S14). |
| Baseline cannot see private cohort category, start, and feedback | RM | Untested | Cohort structure unknown; any confidential isolation is unproven. |
| Cohort role can see private start and feedback | RM | Untested | Cohort role and surfaces unknown; participant access is unproven. |
| Read-only channels reject messages, existing-thread replies, both thread types, polls, and invites | RM | Untested | S11 records announcements settings only; effective enforcement and other read-only channels are unproven. |
| Default member cannot create invites anywhere when policy disables them | RM | Untested | Global policy unknown; S11 is channel-local evidence only. |
| Members cannot manage roles or webhooks | RM | Untested | Baseline effective permissions absent; privilege boundaries are unproven. |
| Defaults useful and not noisy | RM | Untested | Channel existence does not establish default experience. |
| Forum tags and guidelines visible | RM | Untested | S12 describes tags, not member visibility or guidelines. |
| Voice and opt-in behavior follows the plan | RM | Untested | Voice unobserved (S16); behavior and consent boundaries are unproven. |
| Published durable-route links reach intended destinations safely | RM | Untested | Destinations are described, but no published links or access tests are supplied. |

### Onboarding and cohort access

| Check | Method | Status | Evidence or verification limit and impact |
| --- | --- | --- | --- |
| Community prerequisite for planned Community-only features | HA | Passed | Recorded enabled (S9); pass limited to prerequisite, not feature operation or completeness of plan. |
| Rules Screening appears to a new member | RM | Untested | Unobserved (S16); rules acceptance path is unproven. |
| Required questions have valid answers | RM | Untested | Onboarding unobserved; joining may be obstructed. |
| Interest answers assign only intended non-confidential roles/channels | RM | Untested | S13–14 verify role shape, not assignment behavior. |
| Starter tasks reach accessible destinations | RM | Untested | Tasks not supplied; first-member guidance is unproven. |
| Server Guide has no dead resources | RM | Untested | Guide not supplied; resource availability is unproven. |
| External links render from read-only backing resource channels | RM | Untested | Backing channels and rendering unknown; navigation and write protection are unproven. |
| Global guide excludes confidential cohort content | RP | Untested | No guide preview; confidential disclosure boundary is unproven. |
| Mark Community-only checks inapplicable for disabled Community | RP | Not applicable | Community is enabled (S9); the disabled-Community branch does not apply. |
| Disabled-Community text fallbacks cover planned jobs | RM | Not applicable | Community is enabled (S9). |
| First truly new cohort member receives only access role if invite assignment exists | RM | Untested | Cohort scope and capability unknown; correct access assignment is unproven. |
| Existing member role checked and manually assigned if absent | HA | Untested | No evidence; existing-member cohort access is unproven. |
| Staff assign access role when invite assignment unavailable | HA | Untested | Capability and fallback owner unknown; fallback access is unproven. |

### Roles, moderation, and recovery

| Check | Method | Status | Evidence or verification limit and impact |
| --- | --- | --- | --- |
| Admin has explicit approved permissions and no `Administrator` | RP | Untested | No Admin inventory or approved plan; least privilege is unproven. |
| Admin can perform approved recovery/configuration | HA | Untested | Recovery unobserved; operational continuity is unproven. |
| Admin cannot transfer ownership or reach unrelated private work | RP | Untested | No evidence; ownership and private-work boundaries are unproven. |
| Synthetic non-credential match reaches private moderation alerts | HA | Untested | AutoMod unobserved; alert delivery and privacy are unproven. |
| Synthetic credential match blocked, warning shown, matched content absent from alerts | HA | Untested | AutoMod unobserved; secret blocking and non-replication are unproven. |
| Moderators can apply intended safety actions | HA | Untested | Role assignment and capability unknown; response readiness is unproven. |
| Moderators cannot configure integrations or unrelated roles | RP | Untested | No permissions supplied; separation of duties is unproven. |
| Audit events identify acting account | HA | Untested | No audit evidence; accountability is unproven. |
| Conduct recusal and backup path exists | HA | Untested | Owner recipient only (S5); conflicts and absence coverage unresolved. |
| Maintainers lack bans, integrations, and configuration unless separately approved | RP | Untested | Two maintainers exist (S3), but their permissions are unknown. |
| Contributors/partners limited to explicit collaboration areas | RP | Untested | Roles and applicability unknown; any relationship-role boundaries are unproven. |
| Interest role has intended channels/notifications and no privilege | RP | Passed | Recorded permission shape confirmed by supplied preview (S13–14). |
| Combined roles expose only approved union of areas | RP | Untested | Single baseline/interest evidence does not cover combinations. |
| Cohort/relationship roles read-only in start; operational roles can post/pin | RP | Untested | Private program scope and overwrites unknown; orientation integrity is unproven. |
| Bot roles have minimum access, correct hierarchy, and no `Administrator` | RP | Untested | No bot inventory; lack of approval does not prove absence. |
| Role-assigning bot limited to approved lower roles | HA | Untested | Bot existence and capability unknown; role escalation boundary is unproven. |
| Owner MFA and recovery material held outside automation | HA | Untested | Recovery unobserved (S16); account recovery protection is unproven. |
| Second human can recover operations | HA | Untested | Maintainer count does not establish a successor or recovery operator. |
| No shared account exists | HA | Untested | No attestation; individual accountability is unproven. |
| Backup Admin hierarchy permits required bot management | RP | Untested | Backup and bot hierarchy unknown; recovery capability is unproven. |
| Conduct/security routes work without Discord | HA | Untested | Routing intent only (S5); independent reporting access is unproven. |

### Forum workflow and integrations

| Check | Method | Status | Evidence or verification limit and impact |
| --- | --- | --- | --- |
| Each feedback-like forum enforces a member-selectable purpose/domain tag | RM | Untested | Support configuration recorded (S12); actual enforcement and complete forum inventory unverified. |
| Participant cannot apply moderator-only state tags | RM | Untested | Recorded setting (S12), explicitly no real-member enforcement test (S15). |
| Staff can advance state and link durable work | HA | Untested | No lifecycle evidence; tracker handoff is unproven. |
| Security details go through private route rather than forum | HA | Untested | Policy recorded (S5), actual handling unverified. |
| End-to-end test content removed | HA | Untested | Lifecycle not run; cleanup would need verification after an authorized test. |
| Integrations restricted to intended channels | RP | Untested | None approved (S17); actual inventory and data access unknown. |
| Release notifications limited to intended events/actions | HA | Untested | No integration inventory or delivery evidence; any existing feed is unverified. |
| Test messages and temporary webhooks removed | HA | Untested | No operational evidence; any prior integration-test cleanup unknown. |
| Webhooks handled outside automation; credentials absent from operational records | HA | Untested | Snapshot contains none (S17), but wider handling and records are not attested. |
| Private state names each integration owner/removal path | HA | Untested | No state or inventory supplied; integration accountability unknown. |

### Assets, events, and launch

| Check | Method | Status | Evidence or verification limit and impact |
| --- | --- | --- | --- |
| Assets use current canonical sources and individual review | HA | Untested | Asset scope unknown; provenance unverified if used. |
| Approved raster and native SVG preserved in managed store | HA | Untested | Asset/storage scope unknown; preservation unverified if used. |
| SVG has no embedded/external resources and rendered parity checked | HA | Untested | Assets not supplied; vector integrity unverified if used. |
| Live visuals reuse implementation or rendered still | HA | Untested | Visual scope unknown; product fidelity unverified if used. |
| Recurring-event changes apply to series and live crops checked | HA | Untested | Event scope unknown; series consistency unverified if used. |
| Seed content/templates cover approved community jobs | RM | Untested | Content and approved plan absent; participation readiness unproven. |
| First recurring event has host | HA | Untested | Event applicability/host unknown; do not require an event without a planned job. |
| Every invite approved with bounded expiry and uses | HA | Untested | Invited users exist, but invite lifecycle evidence is absent. |
| Invite/manual assignment grants only low-privilege access role | HA | Untested | Assignment scope and process unknown; access grant safety unproven. |
| Temporary membership disabled for persistent participants | HA | Untested | Settings unknown; persistent access unproven. |
| Existing-member behavior checked and completed cohort invites revoked | HA | Untested | No cohort lifecycle evidence; residual access routes unverified. |
| Human handled invite UI, configuration, generation, and copying | HA | Untested | No handling attestation; no invite actions occurred in this audit. |
| Review date scheduled after first cohort joins | HA | Untested | No date supplied despite 20 invited beta users; follow-up ownership unresolved. |

## Handoff and verification limits

**Verified from supplied evidence:** Community enabled; compact recorded channel set; announcement denial configuration; product-specific required support-tag configuration; baseline preview hiding staff and unselected opt-in channels; non-privileged interest-role shape. These are documentary/static observations, not live verification.

**Still untested:** All real-member checks, most staff-role and combined-role checks, conduct-specific visibility, safety behavior, recovery, invitation lifecycle, published links, seed content, integration inventory, and conditional cohort/asset/event operations. Exact current Discord labels and platform behavior remain unverified offline (S20). Snapshot completeness and freshness cannot be independently established.

**Human actions remaining:** Establish applicability and a complete non-secret inventory; fill the operating-state gaps; attest recovery and invite handling; and arrange the matrix checks in a separately authorized session. A fresh human-operated account is necessary for real-member checks. Any test invite needs explicit approval and human-only handling; its URL must stay outside automation. The owner must resolve failures and explicitly accept any remaining risk before considering further launch approval.

**Roles still needing confirmed members:** Successor/backup Admin, Admin operators, moderation lead/operators, conduct recusal backup, and appeal reviewer. Two maintainers are recorded, but their role assignments and permissions are not verified. No contributor, partner, bot, or cohort role should be created solely to fill this list.

**Integrations that can access community data:** Unknown. No integrations are approved; installed integrations and their access are not inventoried.

**Next review:** Recommended before any further invitation wave or integration approval, with a fresh-member follow-up after the next authorized join. The owner must set a calendar date; none is currently recorded. Recheck permissions after role/channel changes and moderation behavior after rule changes.

This completes the snapshot audit, not server verification or launch approval. No type-check or lint configuration is present in the supplied workspace; code checks are not applicable to this Markdown-only deliverable.
