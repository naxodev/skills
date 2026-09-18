# Offline Discord audit

## Result and scope

**No observed control failures are established by the supplied snapshot. Verification is incomplete.** The recorded settings and limited role preview show several healthy controls, but they do not establish real-member behavior or launch readiness.

- **Mode:** Audit only, completed through local skill steps A1–A3.
- **Audit date:** 2026-09-17. **Snapshot date:** Unknown.
- **Server evidence:** Only `snapshot.md`, lines 1–20. This is a fictional server with 20 invited beta users and two maintainers.
- **Assessment criteria:** Local `skills/discord-community-server/SKILL.md`, `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md`. These files supply criteria, not additional server evidence.
- **Access limits:** Offline. Browser access, account access, and a fresh human test account are unavailable. No live services or current official documentation were consulted. Exact-current Discord labels and behavior remain unverified.
- **Actions:** Only this report was created. No server changes, member tests, invites, integrations, or credential operations were performed. Supplied input files were not edited.

## Project context and reporting routes

The product surfaces are **command execution** and **build previews**. Preserve these terms in tags and guidance.

| Workflow | Supplied destination | Evidence and limit |
| --- | --- | --- |
| Support and bugs | Issue tracker | `snapshot.md:4`; destination stated, address and accessibility unknown. The support forum does not replace this route. |
| Security reports | Project's private security-reporting form | `snapshot.md:5`; destination stated, availability outside Discord untested. |
| Conduct reports | Human owner | `snapshot.md:5`; responsible recipient stated. Private intake method, durable case storage, recusal, and backup are unknown. |

The audience is an invited beta group (`snapshot.md:3`). A separate confidential cohort, future launch policy, moderator assignments, response commitments, event cadence, billing/account areas, and canonical brand sources are not described. Two maintainers do not establish moderator or recovery coverage.

## Evidence classification and healthy observations

“Supplied configuration” below means a recorded fact, not an independently inspected setting or a behavioral pass. “Supplied role preview” preserves the snapshot's evidence class; it is not a fresh-member result. No new human attestations were collected.

| Assessment | Source | Evidence class and result | Verification boundary |
| --- | --- | --- | --- |
| Community is enabled | `snapshot.md:9` | Supplied configuration; prerequisite recorded | Does not prove Rules Screening, Onboarding, or Server Guide operation. |
| General, announcements, support, and staff channels exist | `snapshot.md:10` | Supplied configuration; compact structure recorded | Channel types beyond the identified support forum, content quality, and completeness are unverified. |
| Announcements deny baseline members messages, existing-thread replies, public/private thread creation, polls, and invites | `snapshot.md:11` | Supplied configuration; healthy read-only permission shape | All six rejection behaviors remain untested as a real member. Other roles and role combinations are unknown. |
| Support requires a member-selectable command execution or build previews tag; workflow-state tags are moderator-only | `snapshot.md:12` | Supplied configuration; matches forum taxonomy and workflow-state controls | Actual required-tag enforcement and restriction of workflow-state tags remain untested. |
| Interest role grants only relevant product channels and notifications, without privileges | `snapshot.md:13–14` | Supplied configuration and supplied role preview; static check passed within this scope | Does not prove onboarding answers assign only that role or that combined roles remain safe. |
| Staff and unselected opt-in channels are hidden from the baseline member | `snapshot.md:14` | Supplied role preview; these two visibility checks passed within this scope | Does not establish separate conduct-channel privacy, confidential cohort isolation, or fresh-member behavior. |
| No integrations were approved | `snapshot.md:17` | Supplied statement; approval status recorded | Does not prove that no apps, bots, or webhooks are installed. |
| No invite or credential appears in the snapshot | `snapshot.md:17`, supplied file | Limited artifact observation | Does not verify historical handling, invite settings, or absence of secrets elsewhere. |

## Observed failures

**None supported by the available evidence.** Missing observations are recorded below as gaps, not insecure settings. No corrective server change is justified as an established finding from this snapshot alone.

## Unknown and unavailable checks

All checks below are **untested**, unless explicitly marked otherwise. Verification methods describe possible future authorized checks, not actions performed or authorized by this audit. Role preview establishes static access shape; real-member checks establish behavior; human attestation covers human-only operations and recovery.

| Gap and evidence | Impact or priority for this beta community | Future verification method |
| --- | --- | --- |
| **Announcement enforcement:** Recorded denials only; posting was not tested (`snapshot.md:11,15`). | High verification priority before relying on read-only announcements. Configuration alone cannot prove rejection. | **Real member:** Check messages, existing-thread replies, both thread types, polls, and invite creation with a baseline account. |
| **Support forum lifecycle:** Required purpose tags and moderated states are recorded; enforcement, guidelines, templates, and staff transitions are untested (`snapshot.md:12,15`; remaining details absent). | High verification priority for useful support intake and trustworthy workflow state. | **Real member:** Verify visible guidelines, required command execution/build previews tags, and inability to apply workflow-state tags. **Human attestation:** Verify staff state changes, issue-tracker linkage, private security routing, and removal of test content. |
| **Onboarding, Rules Screening, and Server Guide:** Flows unobserved; tasks/resources undocumented (`snapshot.md:16`; resource details absent). | New-user access and routing cannot be accepted. Community is enabled, so lack of evidence is not a reason to mark Community-only checks inapplicable. | **Real member:** Check screening, valid required answers, intended interest-role assignment, accessible starter tasks, and resource/link rendering from read-only backing channels. **Role preview:** Check global resources expose no confidential content, if such content exists. |
| **Full permission model:** No inventory of Admin, Moderator, Maintainer, baseline, partner, contributor, bot, or combined-role permissions; staff visibility and one interest role are the only preview results (`snapshot.md:13–14`). | High verification priority for least privilege. No conclusion about server-wide `Administrator`, member role/webhook management, hierarchy, or category overrides is supported. | **Role preview:** Inspect applicable role definitions, category/channel overrides, hierarchy, and relevant role combinations. Confirm maintainers and moderators have only intended powers and no role/bot has `Administrator`. **Real member:** Confirm baseline members cannot manage roles/webhooks. |
| **Invites and cohort boundaries:** Invited beta users are stated, but approval, expiry, uses, revocation, temporary membership, assignment, and server-wide invite restrictions are absent (`snapshot.md:3,11,17`). Separate confidential cohort areas are not established. | Announcement-only denial does not prove invite restriction throughout the server. Cohort-specific applicability remains unknown. | **Human attestation:** Review non-secret invite settings and human-only handling; check assignment capability/manual fallback and existing-member behavior if applicable. **Real member:** Verify server-wide member invite denial under the launch policy, and baseline/cohort visibility and first-new-member assignment if a private cohort exists. Any new test invite requires separate explicit approval and human-only handling. |
| **Moderation and safety:** AutoMod behavior is explicitly unobserved; verification level, moderator MFA, raid protection, content filtering, DM safety, audit events, and escalation are absent (`snapshot.md:16`). | High verification priority before expanding access. Spam protection and secret-safe moderation cannot be assumed. | **Human attestation:** Confirm controls and moderator actions. With separate authorization, use synthetic values to check mention spam, suspected spam, abusive language, unwanted invites, and credential-like strings. Credential matches must be blocked with a revocation warning and no matched-content alert; non-credential alerts must stay private. Verify audit attribution. |
| **Recovery and conduct coverage:** Recovery was not observed; human owner is the conduct recipient (`snapshot.md:5,16`). Successor, backup Admin, owner MFA, non-shared accounts, durable conduct intake, and recusal are unknown. | High verification priority: two maintainers do not prove operational recovery or independent conduct handling. | **Human attestation:** Confirm a human owner and successor, owner MFA, recovery material outside automation, second-human recovery, no shared account, narrow durable conduct intake, and recusal/backup. **Role preview:** Check backup Admin hierarchy and separation from unrelated private work. Never inspect recovery secrets. |
| **Durable routes and seed content:** Intended routes are stated, but actual links, welcome content, sanitized reproduction templates, feedback/decision/release destinations, and response commitments are absent (`snapshot.md:4–5`). | Users may lack usable guidance even when destinations are agreed. This is unknown, not a demonstrated broken route. | **Real member:** Open published routes and inspect useful defaults, templates, and accessible guidance. **Human attestation:** Confirm security and conduct routes work without Discord and consequential records remain durable. Keep support/bugs in the issue tracker, security in the private form, and conduct with the human owner. |
| **Voice and sensitive areas:** Voice was unobserved; billing/account or separate private-program requirements are absent (`snapshot.md:16`). | Opt-in behavior and applicability are unknown. No need for new channels is established. | **Human attestation:** Establish which areas exist and their intended audience. **Role preview / real member:** Verify applicable visibility and opt-in boundaries. |
| **Integration inventory:** No integrations approved; installed inventory and data access are not supplied (`snapshot.md:17`). | Community-data access cannot be enumerated or declared absent. | **Human attestation:** Confirm installed apps, bots, and webhooks. If present, establish approval, owner, purpose, data/retention boundary, removal path, and human-only credential handling. **Role preview:** Check minimal channel/action permissions and hierarchy. Verify release-only delivery if a release integration exists. |
| **Assets, events, and review cadence:** No assets, managed store, events, hosts, or review date are described (`snapshot.md:1–20`). | Applicability unknown; no branding or event failure established. Lower priority than access and recovery. | **Human attestation:** Establish scope. If applicable, verify canonical asset sources, reviewed raster/vector parity, managed storage, and full-series event updates/crops and hosts. Schedule a review. |

### Not-applicable distinctions

- **Community-disabled text-channel fallback checks:** Not applicable because Community is recorded as enabled (`snapshot.md:9`).
- **Installing apps, creating events/invites, modifying tests, and launch acceptance:** Not applicable to this audit-only execution. Their relevant existing controls remain unknown where evidence is absent.
- **Specific app, cohort, voice, asset, and recurring-event checks:** Applicability is unknown, not automatically “not applicable.” No approved integration does not establish no installed integration; invited beta users do not establish a separate confidential cohort.

## Handoff and verification limits

**Verified from the supplied evidence:** The snapshot records a read-only announcement permission shape, product-specific required forum tags, and moderator-only workflow-state tags. Its supplied role preview confirms baseline staff/opt-in hiding and the non-privileged interest-role shape. These are limited documentary and static-preview results, not live verification.

**Still unverified:** All real-member enforcement and onboarding checks, human-only recovery/invite assurances, moderation behavior, full role combinations, durable-route usability, installed integration access, and current Discord labels. The absence of a fresh account makes behavioral checks unavailable in this audit. This report is not launch approval.

**Human follow-up, only under separate authorization:** First resolve the high-priority access, moderation, invite, and recovery gaps. Then arrange fresh-human member testing using the local verification matrix. Preserve the project's stated reporting routes. Do not send invite URLs, credentials, private user IDs, or private channel contents to automation.

**Roles needing members:** Unknown. Only two maintainers and a human conduct recipient are recorded; moderator, successor, and backup Admin assignments require confirmation.

**Integrations with community-data access:** Unknown. None were approved in the snapshot; no installed inventory is available.

**Recommended review point:** When missing evidence becomes available, and before expanding the invited beta or changing access/integrations. No review date was supplied.

The offline audit is complete. No server changes were made or authorized. No type-check or lint configuration exists in the supplied workspace; this documentation-only report was reviewed against the local audit criteria and snapshot.
