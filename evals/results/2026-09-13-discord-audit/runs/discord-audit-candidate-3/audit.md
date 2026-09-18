# Fictional Discord server audit

## Verdict and scope

**Three configuration failures are recorded. Member-flow verification remains unavailable.** This audit does not establish launch readiness.

- **Mode:** audit only, following steps 1 and A1–A3 of the workspace-local `skills/discord-community-server/SKILL.md`.
- **Audit date:** 2026-09-13. **Snapshot date:** unknown.
- **Server evidence:** only `snapshot.md`, lines 1–20. No browser, account, or live-service observations were available or used.
- **Control sources:** local `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md` under `skills/discord-community-server/`.
- **Authorization:** local report creation only. No server changes or modifying tests were performed. All corrections below are proposals, not applied changes.
- **Preservation:** supplied input files were left unchanged.

Exact current Discord labels and permission behavior remain unverified. Local references provide the audit criteria; they do not independently prove the server's settings or current platform behavior.

## Project context and reporting boundaries

| Area | Supplied evidence or gap |
| --- | --- |
| Audience and stage | 20 invited beta users and two maintainers (`snapshot.md:3`). Future public-launch intent is unknown. |
| Product terms | **Command execution** and **build previews** (`snapshot.md:4`). Product name and other surfaces are unknown. |
| Support and bugs | Both belong in the **issue tracker** (`snapshot.md:4`). Discord should direct work there. Exact destination and published links are unavailable. |
| Security | Use the project's **private security-reporting form** (`snapshot.md:5`). Exact destination and accessibility are untested. |
| Conduct | Reports go to the **human owner** (`snapshot.md:5`). Confidential intake mechanism, durable record, backup, and recusal route are unknown. |
| Staffing | Two maintainers and a human owner are mentioned. Role assignments, moderators, successor, response commitments, and coverage are unknown. |
| Separate access needs | Voice is mentioned only as untested. Billing, account areas, and confidential cohort needs are unknown. Invited beta membership alone does not establish a private cohort design. |
| Events and brand | Cadence, hosts, canonical brand sources, existing assets, and managed asset storage are unknown. |

## Evidence classification

The verification matrix distinguishes **role preview**, **real member**, and **human attestation**. Supplied configuration statements are treated as recorded attestations, not independent inspections. The snapshot does not identify their observer or capture method.

| Observation | Source | Evidence class and result |
| --- | --- | --- |
| Community is enabled | `snapshot.md:9` | Supplied configuration attestation. Prerequisite recorded as satisfied; no member flow verified. |
| General, announcements, support, and staff channels exist | `snapshot.md:10` | Supplied configuration attestation. Existence recorded; usefulness, content, and complete inventory unverified. |
| Announcements allow member messages | `snapshot.md:11` | Supplied configuration attestation; failed read-only control, finding F2. Real-member enforcement untested. |
| Support forum has no required tags | `snapshot.md:12` | Supplied configuration attestation; failed tag requirement, finding F3. Real-member post creation untested. |
| Interest role has Manage Roles | `snapshot.md:13` | Supplied configuration attestation; failed least-privilege control, finding F1. Effective member capabilities untested. |
| Baseline role preview hides staff channels | `snapshot.md:14` | **Recorded role preview: passed for this narrow visibility check only.** It does not prove conduct-channel isolation, multi-role safety, or actual new-member behavior. |
| No fresh human test account; onboarding, Rules Screening, and voice not tested | `snapshot.md:15–16` | Explicit evidence of unavailable real-member verification. These checks are untested, not passed or failed. |
| No integrations approved | `snapshot.md:17` | Supplied attestation of approval state. Does not establish that no integrations are installed. |
| No invite or credential in snapshot | `snapshot.md:17`, supplied file | Confirmed for this input only. Historical handling and external storage are unverified. |

Healthy observations are limited to the recorded Community prerequisite, the listed core channels, the specified reporting routes, and the narrow staff-visibility preview. Routing behavior and safe effective access are not established by these observations.

## Observed failures

Priority is relative to this small beta community. **High** addresses privileged access. **Medium** addresses communication integrity or support routing.

### F1 — High: Interest role grants Manage Roles

- **Fact and source:** The interest role has Manage Roles (`snapshot.md:13`; supplied configuration attestation).
- **Control:** `REFERENCE.md`, Role model, excludes privileged permissions from interest roles. `VERIFICATION.md`, Maintainer, contributor, partner, and interest roles, requires a non-privileged interest role.
- **Impact and rationale:** A personalization role carries role-management authority. This violates least privilege and may allow unintended role changes within its effective reach. Actual holders, hierarchy, assignability, and exploitable reach are unknown; no escalation incident is established. This is the highest-priority correction because it affects access control.
- **Proposed correction — not applied:** Remove Manage Roles from the interest role. Limit it to intended command execution or build previews interests and notifications. Review its other permissions, holders, hierarchy, and assignment paths. Keep role management in an explicitly authorized operational role without Administrator.
- **Verification after separate authorization:** **Role preview** should show no privileged permissions for the interest role and safe relevant role combinations. A **real member** with baseline and interest roles should be unable to manage roles or webhooks. Test onboarding assignments separately if interest roles are offered there; the snapshot does not establish that they are.

### F2 — Medium: Announcements accept member messages

- **Fact and source:** Announcements allow member messages (`snapshot.md:11`; supplied configuration attestation).
- **Control:** `REFERENCE.md`, Permission rules, and `SKILL.md`, step 4, require read-only announcements for members.
- **Impact and rationale:** Member posts can obscure or confuse official beta updates. A clear announcement surface matters with only two maintainers. The snapshot establishes a writable channel, not actual spam or impersonation.
- **Proposed correction — not applied:** Make announcements read-only for ordinary members and interest-role holders. Allow designated operational roles to publish. Review category inheritance, channel overrides, and role combinations for alternate write paths.
- **Verification after separate authorization:** Use **role preview** to inspect the static permission shape. A **real member** must be rejected when sending messages, replying in existing threads, creating public or private threads, creating polls, or creating invites in the channel, as required by the read-only matrix. Confirm designated staff retain intended publishing access.

### F3 — Medium: Support forum does not require tags

- **Fact and source:** The support forum has no required tags (`snapshot.md:12`; supplied configuration attestation). Existing optional tags and workflow-tag permissions are unknown.
- **Control:** `OPERATIONS.md`, Make forum state trustworthy, requires a member-selectable purpose, package, or domain tag on feedback-like forums and reserves workflow-state tags for moderators.
- **Impact and rationale:** Posts can omit product context, making command execution and build previews questions harder to route. This adds triage work for two maintainers. There is no evidence that tags are entirely absent or that members can currently change workflow states.
- **Proposed correction — not applied:** Require at least one member-selectable product-domain tag, using **Command execution** and **Build previews** where suitable. Preserve useful existing tags after inventory. Keep any workflow-state tags moderator-only. Ensure guidelines request versions, runtime, expected and observed behavior, and a sanitized reproduction. Direct support and bugs to the issue tracker, security details to the private security-reporting form, and conduct reports to the human owner. Do not turn Discord into the durable support record.
- **Verification after separate authorization:** A **real member** should see the tags and guidelines, fail to create an untagged post, succeed with a valid domain tag, and be unable to apply moderator-only states. **Human attestation** should confirm staff can advance any planned states, link work to the issue tracker, route security details privately, and remove synthetic test content. None of these lifecycle checks ran in this audit.

## Unknown and unavailable checks

Missing evidence is not proof of an insecure setting. Unless explicitly marked not applicable, the following checks remain **untested**. Evidence classes describe what later verification would require, not what happened here.

| Check and local control | Gap and source | Required evidence class | Impact of the gap |
| --- | --- | --- | --- |
| Full permissions, hierarchy, Administrator exclusion, and role combinations; reference Role model and matrix role sections | Only the interest-role grant and baseline staff preview are supplied (`snapshot.md:13–14`). Admin, moderator, maintainer, contributor, partner, bot, and backup-role settings are unknown. | Role preview; human attestation for approved operational capabilities; real member for role/webhook restrictions | Cannot establish least privilege or safe combined-role access. Two maintainers do not prove populated Discord roles. |
| Staff, conduct, and unselected opt-in visibility; matrix Member view | Staff is hidden in one baseline preview only (`snapshot.md:14`). Conduct intake, category inheritance, exceptions, and opt-in areas are not described. | Role preview; real member where access boundaries apply | Cannot generalize the recorded preview to all sensitive areas or members. |
| Rules and other read-only surfaces; matrix Member view | Only announcements' message permission is supplied (`snapshot.md:10–11`). Rules, release feeds, replies, threads, polls, and invite paths are unknown. | Role preview and real member | Cannot establish complete read-only enforcement. |
| Onboarding and Rules Screening; matrix Onboarding | Explicitly untested (`snapshot.md:16`); configuration, required answers, role grants, and starter tasks unknown. Community is enabled (`snapshot.md:9`). | Real member; human attestation for the Community prerequisite | Community-enabled flows remain applicable and untested, not exempt. New members may face access or orientation problems. |
| Server Guide and canonical links; operations Server Guide resources | No guide configuration, backing channels, or resource evidence supplied. | Real member; role preview for confidential resource exclusion | Cannot establish link rendering, accessible tasks, or resource privacy. |
| Default-channel usefulness, templates, and durable routes; matrix Member view and Launch | Channel names and destination descriptions only (`snapshot.md:4–5,10`). No content, templates, links, or observed routing. Feedback, decisions, and release destinations unknown. | Real member for content and links; human attestation for routing and access without Discord | Cannot confirm usable orientation, sanitized support intake, or working external reporting. |
| Voice and sensitive opt-in boundaries; matrix Member view | Voice explicitly untested (`snapshot.md:16`); existence, intended access, and other sensitive surfaces unknown. | Real member, supported by role preview | Cannot confirm intended opt-in behavior. |
| AutoMod and native safety; reference Native moderation baseline | No settings or synthetic results supplied. Verification level, minimum-age policy, moderator MFA, raid controls, explicit-content filtering, DM safety, and moderation coverage unknown. | Human attestation for configuration and synthetic results; role preview for alert-channel privacy | Cannot confirm spam, abuse, unwanted invite, or credential protections. Later credential-rule checks must use synthetic values and establish blocking without copying matches to alerts. |
| Moderation operations and conduct escalation; matrix Moderator | Conduct recipient is the human owner (`snapshot.md:5`); safety actions, private intake, audit attribution, recusal, appeal, backup, and durable case handling unknown. | Human attestation; role preview for narrow intake access | Cannot confirm operational coverage or an independent route when the owner must recuse. Preserve owner routing while clarifying these gaps. |
| Ownership and recovery; matrix Recovery | Human owner mentioned (`snapshot.md:5`), but successor, owner MFA, recovery storage, shared-account status, and backup capability unavailable. | Human attestation; role preview for backup hierarchy | Recovery readiness is unknown. Do not request recovery material or credentials as evidence. |
| Member-created invites and beta invite handling; reference Permission rules and matrix Launch | Invited users are recorded (`snapshot.md:3`), but invite approval, expiry, uses, temporary membership, revocation, and handling are unknown. No URL is supplied (`snapshot.md:17`). | Real member for member invite restrictions; human attestation for invite settings and handling | Cannot confirm bounded beta access. Invite UI, generation, copying, testing, and revocation remain human-only and require appropriate authorization. |
| Private cohort access and lifecycle; operations cohort sections and matrix Cohort access | No confidential program, cohort role, private start channel, or private feedback forum is established. | Applicability unknown; if present, role preview, real member, and human attestation as specified in the matrix | Do not infer a cohort architecture from invited beta users. Private access, combined roles, read-only starts, first-new-member assignment, existing-member handling, and manual fallback remain unverified if relevant. |
| Remaining forum workflow; matrix Forum workflow | Required-tag failure is known (`snapshot.md:12`); tag inventory, guidelines, state restrictions, durable links, and other forums unknown. | Real member and human attestation | Cannot establish the rest of the forum lifecycle or extrapolate the failure to unspecified forums. |
| Integration inventory and data access; reference App review and matrix Integrations | No integrations approved (`snapshot.md:17`); installed apps, bots, webhooks, permissions, operators, retention, owners, removal paths, and release filters unknown. | Role preview and human attestation | No integration can be identified as accessing community data from this evidence. Lack of approval does not prove absence or unauthorized installation. App installation and delivery testing are outside this audit. |
| Assets and recurring events; operations asset/event controls and matrix Assets and events | No assets, brand sources, storage, event plan, host, or cadence supplied. | Applicability unknown; human attestation if present | Cannot assess provenance, preserved exports, vector parity, or series-wide crop verification. Their absence from the snapshot is not a failure. |
| Launch acceptance and review date; matrix Launch | No acceptance, review schedule, or fresh test account supplied (`snapshot.md:15`). | Human attestation, informed by applicable real-member results | Cannot claim acceptance or launch readiness. This audit does not require a launch invite or a long-lived operating state file. |

**Not applicable to this audit:** Community-disabled text-channel fallback checks, because Community is recorded as enabled. New app installation, event creation, invite generation, asset changes, and implementation planning are outside the authorized audit scope. Unknown existing features are not treated as absent merely to mark their checks not applicable.

## Handoff and verification limits

- **What changed:** Only `audit.md` was created. No server changes were made. The supplied snapshot and local skill files remain unchanged.
- **What is verified:** The report is grounded in the supplied snapshot. It records three configuration failures against local controls. The sole supplied behavioral preview establishes that staff channels were hidden for the baseline role in that recorded preview.
- **What remains unverified:** Current server state, current Discord labels and behavior, every fresh-member flow, the broader permission model, safety operations, recovery, integration data access, and the unknown checks above. No new role preview, real-member test, or human attestation was obtained.
- **Relevant human next actions:** If corrections are authorized later, address F1 first, then F2 and F3. Supply non-secret configuration evidence for the gaps. Arrange fresh human-operated member verification only under separate authorization; invite handling must stay outside automation. Do not send credentials, invite URLs, or private channel contents.
- **Roles needing members:** Unknown. Confirm operational role holders, moderation coverage, a human successor, and a conduct backup rather than assuming vacancies.
- **Review timing:** Re-audit after approved corrections and fresh-member testing, and before expanding beyond the current beta audience. No review date is currently recorded.
- **Local verification:** Reviewed this report against `snapshot.md` and the three local reference files. No project type-check or lint configuration is present in this supplied document-only workspace; those checks were not run. This is an offline evidence audit, not a tested server configuration or launch sign-off.

Audit workflow ends at A3. Implementation requires a later improvement-mode request and authorization.
