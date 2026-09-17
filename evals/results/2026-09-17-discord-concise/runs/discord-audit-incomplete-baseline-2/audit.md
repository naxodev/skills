# Fictional Discord server audit

## Result and scope

**No observed control failures are established by the supplied snapshot. Overall server safety and member behavior remain unverified.** The snapshot records several healthy settings and a limited role preview. It does not support launch acceptance or a full permission audit.

- **Mode:** Audit only, following the local skill's steps 1 and A1–A3.
- **Audit date:** 2026-09-17. **Snapshot date:** Unknown.
- **Server evidence:** Only `snapshot.md`, lines 1–20. References below to `S` mean this file and its line numbers.
- **Assessment criteria:** Local `skills/discord-community-server/SKILL.md`, `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md`. These provide controls, not additional server evidence.
- **Access limits:** Offline. Browser and account access are unavailable (S19). No fresh human test account is available (S15).
- **Changes:** Only this report was created. No server changes, live checks, invite operations, app installations, or modifying tests were performed. Supplied input files were left unchanged.
- **Current platform details:** Exact-current Discord labels and permission behavior were not checked against live official documentation. They remain unverified (S20). Control names here follow the local references.

## Community context and reporting routes

The community has 20 invited beta users and two maintainers (S3). Its product surfaces are **command execution** and **build previews** (S4). This supports an invited-beta assessment; it does not establish a separate confidential cohort or a public-launch plan.

| Workflow or responsibility | Supplied destination or fact | Evidence limits |
| --- | --- | --- |
| Support and bugs | Issue tracker (S4) | Tracker identity, links, access, and actual handoff behavior are unknown. Keep both workflows routed here. |
| Security reports | Project's private security-reporting form (S5) | Form identity, accessibility, handling, and availability without Discord are unverified. |
| Conduct reports | Human owner (S5) | Contact method, durable private record, recusal, and backup arrangements are unknown. Preserve this owner route. |
| Staffing | Two maintainers (S3) and a human owner identified as conduct recipient (S5) | Account ownership, role membership, moderator coverage, successor, and response commitments are unverified. |
| Other project context | No further evidence | Product name, feedback and decision destinations, release process, event cadence, brand sources, and asset store are unknown. Billing, account-support, voice, and separate private-cohort needs are also unknown. |

## Evidence classification

The local verification matrix distinguishes **role preview**, **real member**, and **human attestation**. Recorded settings below are retained as **supplied configuration evidence**. They are not fresh tests or identity/recovery attestations.

- A supplied role preview can support static visibility and permission shape only.
- A real-member result requires a fresh human-operated, non-privileged account. No such result is supplied.
- Human-attestation checks need a specific human confirmation. Unobserved recovery or invite handling cannot pass by inference.
- “Untested” and “unknown” are evidence gaps, not observed failures. Conditional features have unknown applicability unless the snapshot establishes otherwise.

## Healthy observations

| Observation and source | Evidence class and result | What remains unverified |
| --- | --- | --- |
| Community is enabled (S9). | Supplied configuration; prerequisite recorded as present. | This does not prove Rules Screening, Onboarding, or Server Guide configuration or operation. The matrix's human confirmation of all planned feature prerequisites is not supplied. |
| General, announcements, support, and staff channels exist (S10). | Supplied inventory; a compact set of community jobs is represented. | Complete inventory, channel content, default-channel usefulness, and member navigation. No extra channels are warranted solely by this audit. |
| Announcements deny baseline members messages, replies in existing threads, public/private thread creation, polls, and invite creation (S11). | Supplied configuration; all listed read-only restrictions are recorded. | **Real member:** rejection of each action. Other role combinations and server-wide invite restrictions are not established. |
| Support requires at least one member-selectable product tag: command execution or build previews; workflow-state tags are moderator-only (S12). | Supplied configuration; the required domain-tag and workflow-state separation is recorded. | **Real member:** required-tag enforcement, tag visibility, and denial of member-applied workflow states. **Human attestation:** staff state transitions and durable issue links. |
| The interest role grants only relevant product channels and notifications, without privileged permissions (S13–14). | **Role preview: passed within the supplied preview's scope**, corroborated by recorded configuration. | Actual onboarding assignment, combined-role access, and fresh-member behavior. |
| Staff and unselected opt-in channels are hidden from the baseline member (S14). | **Role preview: passed for the named boundaries in the supplied preview.** | Separate conduct-channel visibility, underlying category overrides, other role combinations, and real-member access. |
| No integrations were approved (S17). | Supplied approval status. | This is not an inventory proving that no bots, apps, or webhooks are installed. |

## Observed failures

**None established.** The snapshot does not show an insecure setting or failed member action. In particular, missing real-member tests do not contradict the recorded announcement restrictions or forum tag configuration.

There are therefore no evidence-backed corrective findings to prioritize. The next section prioritizes verification gaps instead. All suggested actions are future proposals and **have not been applied**.

## Unknown and unavailable checks

Priority here reflects what to verify first for a small invited beta, not a finding severity. **High** means access, safety, or recovery deserves early confirmation. **Medium** means participation or operational reliability needs confirmation. All checks below are untested unless explicitly marked not applicable.

| Area and source of gap | Status and relevance | Proposed future verification and evidence class |
| --- | --- | --- |
| Owner and recovery (S16; no further account evidence) | **High — unknown.** A human conduct recipient does not prove sole account ownership, MFA, recovery readiness, or succession. | **Human attestation:** human ownership and named successor; owner MFA and recovery material held outside automation; no shared account; a second human can recover operations. **Role preview:** backup Admin hierarchy supports required bot management, if bots exist. Never inspect recovery material. |
| Full role and permission model (S13–14 cover only baseline preview and interest role) | **High — incomplete.** Admin, Moderator, Maintainer, contributor/partner, bot, category, per-user, and combined-role permissions are unavailable. Two maintainers do not establish assigned roles. | **Role preview:** review definitions, hierarchy, category inheritance and exceptions; no role or bot has `Administrator`; least privilege; conduct/staff isolation; safe combined-role access. **Real member:** baseline members cannot manage roles or webhooks. **Human attestation:** approved administrative and moderation actions work. |
| Invite controls (S11 covers announcements only; S17 contains no invite) | **High — unknown server-wide.** The invited beta increases the relevance of controlled entry. No supplied URL says nothing about active invites or their limits. | **Real member:** inability to create invites across all member-visible surfaces where policy forbids it. **Human attestation:** approval, owner, expiry, use limits, persistent-membership setting where needed, revocation, and human-only handling. Any later test invite needs explicit approval and human operation; a consumed single-use invite must reject reuse. |
| Native safety and AutoMod (S16) | **High — unobserved.** Missing evidence does not mean controls are disabled. | **Human attestation:** verification level, moderator MFA, raid protection, explicit-content and DM safety settings; synthetic tests for mention spam, suspected spam, abusive language, credential-like strings, and unwanted external invites. Confirm non-credential alerts remain private; credential matches are blocked with a revocation warning and without copying matched content into alerts. Confirm audit events identify actors. |
| Security and conduct operations (S5 supplies routes only) | **High — routes named, operation unknown.** Confidential intake, durable handling, and continuity are unverified. | **Real member:** published route links reach intended destinations. **Human attestation:** private security form and owner conduct route work without Discord; conduct recusal/backup and restricted durable records exist; security details stay out of forums. Preserve the supplied reporting destinations. |
| Announcements and other read-only surfaces (S11, S15) | **Medium — configuration recorded; enforcement untested.** Rules, release-feed, or private start-channel existence is unknown. | **Real member:** reject messages, existing-thread replies, both thread types, polls, and invites in every applicable read-only channel. **Role preview:** check additional role combinations and approved staff posting/pinning access where relevant. |
| Support forum lifecycle (S12, S15) | **Medium — configuration recorded; enforcement untested.** No posting or tag test was performed. | **Real member:** tags/guidelines visible; untagged posting rejected; product-tagged posting accepted; workflow-state selection denied. **Human attestation:** staff advances state, links support/bugs to the issue tracker, and removes authorized test content afterward. |
| Onboarding and Rules Screening (S9, S16) | **Medium — applicable and unobserved.** Community is enabled, so these checks are not waived by the disabled-Community fallback. | **Real member:** screening appears, required questions have valid answers, interest choices assign only intended non-privileged access, and three concrete starter tasks reach accessible destinations. The interest-role preview does not prove assignment behavior. |
| Server Guide (no evidence in S9–16) | **Medium — setup unknown.** Resources and backing channels were not inventoried. | **Real member:** no dead resources; canonical links render from read-only backing channels. **Role preview:** global resources disclose no confidential cohort content, if such content exists. |
| Orientation, templates, and durable handoff (S4–5, S10; no content supplied) | **Medium — unknown.** Channel existence does not prove useful defaults, clear guidance, or working links. | **Real member:** inspect welcome/seed content, defaults, and all published durable-route links. Check support guidance requests versions, runtime/context, expected/observed results, sanitized reproduction, and prior attempts. **Human attestation:** consequential work reaches durable systems. Retain command execution/build previews terminology and the supplied issue-tracker, security-form, and owner routes. |
| Voice and other sensitive areas (S16) | **Conditional — voice unobserved; existence and intended use unknown.** Do not mark the boundary passed or assume voice is required. | If present, **real member:** test opt-in access and participation boundaries against the intended policy. |
| Separate confidential cohort (S3 identifies invited beta users only) | **Conditional — applicability unknown.** An invited beta does not prove a separate private program exists. | If present, **role preview:** explicit category denial for `@everyone`, permitted operational/access roles, safe multi-role access, read-only start channel, and confidential resources outside global onboarding. **Real member:** baseline exclusion, cohort visibility, and first-new-member role assignment when available. **Human attestation:** manual fallback and existing-member assignment, limited invites, and post-onboarding revocation. |
| Integrations and data access (S17) | **Conditional — no approvals recorded; installed inventory unknown.** No integration's data access can be certified. | **Human attestation:** inventory installed apps/webhooks and approvals; for each, identify workflow, owner, data access/retention, removal path, and credential handling. **Role preview:** minimum channel/action permissions and hierarchy. If release delivery exists, **human attestation:** intended release events only, secret-safe testing, and cleanup. No installation is proposed. |
| Assets, emoji, and events (not supplied) | **Conditional — existence and applicability unknown.** These are not mandatory additions for this audit. | If used, **human attestation:** canonical brand sources, individual review, preserved raster/native SVG assets in a managed store, vector safety and rendered parity, real-product visuals, documented emoji meanings, event host/backup/cadence/timezone, and full-series updates verified at live crop sizes. |
| Staffing and review schedule (S3, S16) | **Medium — incomplete.** Moderator coverage, response commitments, escalation owners, role vacancies, and review date are unknown. | **Human attestation:** identify assigned staff, backup and appeal ownership, expected response coverage, and the next review date. No specific vacant role can be named from the snapshot. |

**Not applicable to this audit:** Community-disabled text-channel fallback checks, because Community is recorded as enabled (S9). Creating operating state, configuring the server, seeding content, creating invites, and launch acceptance are outside audit mode. No launch approval is implied. Optional-feature checks remain conditional rather than being marked passed or absent.

## Handoff and verification limits

The audit verified the report against the supplied evidence and local criteria only. The only supplied role-preview passes concern baseline staff/opt-in visibility and the interest role's static permission shape. Announcements and forum controls are healthy **recorded settings**, not verified member enforcement. No real-member checks or new human attestations were obtained.

If the owner later authorizes further assessment, first obtain non-secret evidence for access, invite controls, moderation, recovery, and confidential reporting. Then arrange human-operated member checks for announcements, forum tags, onboarding, and route links. Any test that changes server state requires separate authorization. Invite URLs and credentials must remain outside automation and the report.

Review after missing evidence becomes available and before expanding beta access or approving a launch. A scheduled review date is currently unknown. **No server changes were made, and the supplied inputs remain unchanged.**
