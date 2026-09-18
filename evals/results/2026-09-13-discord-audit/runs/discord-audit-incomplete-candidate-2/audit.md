# Fictional Discord server audit

## Verdict and scope

**No observed control failures are established by the supplied snapshot. Verification is incomplete.** The recorded announcement restrictions, support tags, and interest-role permissions match the applicable local controls. The supplied role preview supports staff and opt-in visibility boundaries and the interest-role permission shape. These observations do not establish real-member enforcement or launch readiness.

- **Mode:** Audit only; local skill steps 1 and A1–A3.
- **Report date:** 2026-09-13. **Snapshot date:** unknown.
- **Server evidence:** `snapshot.md`, lines 1–20, exclusively. No independent server inspection occurred.
- **Audit criteria:** `skills/discord-community-server/SKILL.md`, `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md` in this workspace.
- **Access limits:** Offline; no browser, account access, or fresh human test account (`snapshot.md:15,19–20`). Exact-current Discord labels and platform behavior remain unverified.
- **Authorization:** No server changes authorized or made. No live services, other skills, delegation, or files outside the workspace were used. Only this report was created; supplied inputs were unchanged.

The local references supply criteria, not additional facts about this server. “Recorded” below means supplied configuration evidence. “Passed — supplied role preview” preserves the snapshot's observation; it does not claim a new test. Human-attestation checks require explicit evidence of the stated human action. A configuration statement alone does not establish that action.

## Community context and reporting routes

| Item | Supplied evidence | Limits |
| --- | --- | --- |
| Audience and stage | 20 invited beta users and two maintainers (`snapshot.md:3`) | Future public-launch plans, audience details, and response commitments are unknown. |
| Product language | **command execution** and **build previews** (`snapshot.md:4`) | Product name, package map, and documentation are not supplied. |
| Support and bugs | Issue tracker (`snapshot.md:4`) | Exact destination, published guidance, accessibility, and actual routing are untested. |
| Security reports | Project's private security-reporting form (`snapshot.md:5`) | Form availability and operation without Discord are untested. |
| Conduct reports | Human owner (`snapshot.md:5`) | Private intake mechanism, durable case storage, recusal, backup, and access without Discord are unknown. The owner route is not itself evidence of a missing case system. |
| Other durable work | Not supplied | Feedback, product decisions, releases, and persistent documentation routes are unknown. |
| Ownership and staffing | Human owner receives conduct reports; two maintainers exist (`snapshot.md:3,5`) | Server ownership arrangements, successor, moderator coverage, and privileged-role membership are not established. |
| Optional community jobs | Not supplied | Separate confidential cohorts, billing/account areas, voice, event cadence, brand sources, assets, and managed storage are unknown. Invited beta membership alone does not establish a separate confidential program. |

Any later corrections should retain the two product terms and these support, bug, security, and conduct routes. Discord should not become the only record of consequential work.

## Healthy observations and what they prove

| Control | Source and evidence class | Assessment and verification limit |
| --- | --- | --- |
| Community prerequisite | `snapshot.md:9`; recorded configuration | Community is recorded as enabled. This supports the prerequisite for the support forum. It does not prove Rules Screening, Onboarding, or Server Guide setup or behavior. The matrix's human-attestation check was not independently performed. |
| Compact channel structure | `snapshot.md:10`; recorded inventory | General, announcements, support, and staff exist. This is consistent with a small beta community. Orientation content, channel types other than the support forum, and default-channel usefulness are not established. |
| Read-only announcements | `snapshot.md:11`; recorded configuration | Baseline members are denied messages, existing-thread replies, public/private thread creation, polls, and invites. This matches the listed read-only actions. Effective access with other roles and real-member rejection of these actions remain untested. |
| Product-specific support tags | `snapshot.md:12`; recorded configuration | The support forum requires at least one member-selectable tag: command execution or build previews. Workflow-state tags are moderator-only. This matches the forum invariants. Posting, required-tag enforcement, and denial of member-applied workflow tags remain untested as a real member (`snapshot.md:15`). |
| Staff visibility | `snapshot.md:14`; **passed — supplied role preview** | Staff is hidden from the baseline member. This does not establish a separate conduct-channel boundary, multi-role safety, or fresh-member behavior. |
| Opt-in visibility | `snapshot.md:14`; **passed — supplied role preview** | Unselected opt-in channels are hidden from the baseline member. Voice behavior and onboarding role assignment remain untested. |
| Interest-role scope | `snapshot.md:13–14`; **passed — supplied role preview**, supported by recorded configuration | The role grants only relevant product channels and notifications, without privileged permissions. This does not prove that onboarding assigns only this role or that other roles are safe. |
| Integration approval boundary | `snapshot.md:17`; supplied statement | No integrations were approved. This is not evidence that none are installed or that no integration can access community data. |
| Snapshot information exclusions | `snapshot.md:17` and review of the supplied text | No invite or credential appears in the snapshot. This does not verify historical credential handling, invite approval, or server-wide absence of exposed secrets. |

## Observed failures

**None established.** There is no evidence-backed correction to apply from this snapshot. In particular, it does not show writable announcements, untagged support posting, privileged interest roles, or exposed staff channels.

Missing evidence is recorded below as a verification gap, not a failed control. All verification suggestions are future actions only; none were performed or authorized through this audit.

## Unknown and unavailable checks

Priorities below rank evidence collection, not proven defects. **High** means the gap concerns access, safety, or recovery for the existing beta community. **Medium** means it concerns participation or durable operations. **Conditional** means the workflow's existence must first be established.

| Gap and source | Status / priority | Future verification method and consequence of the gap |
| --- | --- | --- |
| Announcement enforcement, other read-only surfaces, and server-wide member invite restrictions (`snapshot.md:11,15,19`) | Untested / High | **Real member:** test all six announcement actions, including replies in an existing thread; test other applicable read-only surfaces and invite creation across member-visible channels. The announcement deny alone does not establish a server-wide invite restriction. |
| Complete role definitions, category overrides, hierarchy, per-user exceptions, and combined-role access (only baseline and interest preview supplied, `snapshot.md:13–14,19`) | Unknown / High | **Role preview:** inspect Admin, Moderator, Maintainer, relevant relationship/access roles, and combinations. Check explicit permissions, absence of Administrator, private-category boundaries, and bot hierarchy if bots exist. **Real member:** verify members cannot manage roles or webhooks. Two maintainers do not prove least-privilege Maintainer permissions. |
| Separate conduct visibility and private-program boundaries (`snapshot.md:5,10,14,19`) | Unknown; private-program applicability unknown / High | **Role preview:** verify conduct intake is narrower than staff discussion. If a confidential program exists, inspect category denies and approved role combinations. **Real member:** verify baseline exclusion and cohort-role access to start and feedback surfaces. Baseline staff hiding cannot establish these separate boundaries. |
| Verification level, age policy, moderator MFA, raid protection, content filtering, and DM-safety configuration (not supplied; `snapshot.md:16,19`) | Unknown / High | **Human attestation:** obtain non-secret confirmation of applicable native safety settings and moderator coverage. Their absence from the snapshot does not show they are disabled. |
| AutoMod setup and behavior (`snapshot.md:16`) | Unobserved / High | **Human attestation:** confirm mention spam, suspected spam, abusive language, credential-like strings, and unwanted external invites are covered. Use synthetic values in a separately authorized test. Verify non-credential alerts remain private; credential-like matches are blocked with a revocation warning and without copying matched content to alerts. Check ordinary technical discussion is not broadly blocked. |
| Moderation actions, audit attribution, escalation, appeals, and recusal (`snapshot.md:3,5,16,19`) | Unknown / High | **Human attestation:** confirm moderators can take intended safety actions, audit events identify the actor, and conduct handling has a recusal and backup route. **Role preview:** confirm moderators cannot manage unrelated roles or integrations. Current operational response capacity is unverified. |
| Owner MFA, recovery, successor, shared-account policy, and backup access (`snapshot.md:16`) | Unobserved / High | **Human attestation:** confirm a human owner and successor, owner MFA, recovery material held outside automation, no shared account, and a second human able to recover operations. **Role preview:** check backup Admin hierarchy where relevant. Never collect recovery material. |
| Rules Screening, Onboarding answers, interest assignment, starter tasks, and default experience (`snapshot.md:9,15–16`) | Untested / Medium | **Real member:** verify screening appears, required questions have valid answers, interest answers grant only intended non-confidential roles/channels, three concrete tasks work, and defaults are useful. Community is enabled, so these checks cannot be dismissed as Community-disabled fallbacks. |
| Server Guide configuration and resources (not supplied; `snapshot.md:9,19`) | Unknown / Medium | **Real member:** inspect resource destinations and canonical links from read-only backing channels if configured. **Role preview:** verify global resources expose no confidential content. Guide existence, resource health, and backing-channel permissions are not established. |
| Support forum experience and lifecycle (`snapshot.md:12,15`) | Untested / Medium | **Real member:** verify visible guidelines, required domain-tag selection, and inability to apply workflow tags. **Human attestation:** verify staff can advance state and link support/bugs to the issue tracker, security details go to the private form, and test content is removed. No end-to-end lifecycle was demonstrated. |
| Welcome, support templates, and published durable routes (`snapshot.md:4–5,10,19`) | Unknown / Medium | **Real member:** inspect useful seed content and open every published route to its intended destination. Templates should request versions, runtime/context, expected and observed results, and sanitized reproduction. **Human attestation:** confirm security and conduct routes work without Discord and consequential work is retained durably. Do not replace the owner's conduct route; clarify its intake and recordkeeping. |
| Historical and future invite controls (`snapshot.md:3,17,19`) | Unknown / High | **Human attestation:** confirm explicit approval, expiry/use bounds, human-only handling, persistent-membership settings where needed, and revocation of completed cohort invites. No invite URL is needed. An invited audience does not prove these settings. |
| Fresh-member admission and cohort role assignment (`snapshot.md:15,19`) | Unavailable; cohort applicability unknown / High if confidential access exists | **Human attestation:** confirm a fresh non-privileged account joins through a short-lived, single-use test invite and a second use is rejected, only under separate approval with all invite interaction human-only. **Real member:** if role assignment exists, test the first truly new member receives only a low-privilege access role. **Human attestation:** verify existing-member behavior or staff assignment fallback. No test account is available now. |
| Voice, billing/account access, and other sensitive opt-ins (`snapshot.md:16,19`) | Voice unobserved; other applicability unknown / Conditional | Establish which surfaces exist. **Real member:** verify intended visibility and participation boundaries. The supplied opt-in role preview is not a voice test. |
| Installed integrations, bots, webhooks, and community-data access (`snapshot.md:17,19`) | Inventory unknown / High if installed | Obtain a redacted inventory before assessing access. **Role preview:** check channel/action scope, least privilege, and bot hierarchy. **Human attestation:** confirm owners, workflow need, data retention/deletion, removal paths, safe role assignment, and credential handling. No integration data boundary can be certified from approval status alone. |
| Release notification delivery and cleanup (no approved integration, `snapshot.md:17`) | Not applicable to the supplied approved scope; installed state unknown / Conditional | No delivery test or installation is needed for this audit. If a release integration is later confirmed and authorized, use **human attestation** of redacted release-event/action filters, non-secret delivery, cleanup, and human-only webhook handling. Keep curated announcements separate. |
| Assets, brand sources, storage, events, and hosts (not supplied; `snapshot.md:19`) | Applicability unknown / Conditional | If present, use **human attestation** for canonical brand provenance, reviewed raster/vector assets, managed storage, safe SVG contents and parity, and live full-series event artwork/crops. Confirm cadence, timezone, host, backup, and durable outcomes. Do not require a new event or new assets merely to finish an audit. |
| Follow-up review date and residual-risk acceptance (not supplied; `snapshot.md:3,19`) | Unknown / Medium | **Human attestation:** record who reviews the existing beta setup and when. A review date after the first cohort is not supplied. This report is not launch acceptance. |
| Exact-current feature labels and capabilities (`snapshot.md:20`) | Unverified / Conditional on later live work | Consult current official Discord documentation when live access is authorized. Local reference labels are audit criteria, not confirmation of the current UI or optional invite-role capability. |

**Not applicable:** Community-disabled text-channel fallback checks, because Community is recorded as enabled (`snapshot.md:9`). Optional private cohorts, bots, voice, assets, and events are not marked passed or absent; their applicability remains unknown unless stated otherwise above.

## Handoff

- **Changed:** Created `audit.md` only. No server configuration, posting, invite, app, event, credential, or live test actions occurred.
- **Verified from supplied evidence:** Baseline staff/opt-in hiding and interest-role permission shape have recorded role-preview support. Announcement restrictions and support tag rules match the local criteria as written configuration. No fresh verification occurred.
- **Still unverified:** All real-member behavior, omitted settings, recovery arrangements, integration inventory/data access, working route links, and exact-current labels. The report does not certify security or readiness for a broader launch.
- **Human follow-up:** First resolve high-priority access, safety, recovery, invite, and integration-inventory gaps using non-secret evidence. Schedule fresh-member checks only when access and separate authorization are available. Keep invite and credential handling human-only.
- **Role staffing:** Two maintainers are known. Admin, backup Admin/successor, Moderator, and any cohort-role assignments are unknown; no vacancy is asserted.
- **Integration access:** No integrations were approved. Installed integrations and their access remain unknown.
- **Review timing:** Recommended before expanding the invited beta and after material role, onboarding, or integration changes. No review date is currently evidenced.

Audit steps A1–A3 are complete as an evidence-limited offline assessment. No operating-state file or launch workflow is required. This Markdown-only workspace has no configured type-check or lint task; report verification was limited to reviewing its claims against the supplied snapshot and local references.
