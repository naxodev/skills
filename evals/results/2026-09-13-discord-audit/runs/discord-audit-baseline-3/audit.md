# Fictional Discord server audit

## Verdict and scope

**Three recorded configuration failures require attention. Launch readiness is not verified.**

Operating mode: **audit only, offline**. The sole source of server facts is `snapshot.md` (lines 1–20). The audit criteria come from the workspace's `skills/discord-community-server/SKILL.md`, `REFERENCE.md`, `OPERATIONS.md`, `VERIFICATION.md`, and `STATE-TEMPLATE.md`.

No server changes, integration actions, invite actions, or live tests were performed. Only this report was created. Supplied input files remain unchanged. No outside files, live services, installed skills, or delegated agents were used.

The audience is 20 invited beta users and two maintainers. The product surfaces are **command execution** and **build previews**. Community is recorded as enabled. General, announcements, support, and staff channels exist; support is a forum. An invited beta audience does not establish that a separate confidential cohort exists.

## Recorded failures

| Priority | Finding and evidence | Impact | Proposed correction, subject to later approval | Required verification |
| --- | --- | --- | --- | --- |
| High | The interest role has `Manage Roles` (`snapshot.md:13`). | A personalization role has privileged access. The hierarchy and effective scope are unknown; broader escalation is not proven. | Remove privileged permissions from the interest role. Restrict it to intended product channels or notifications. Review role hierarchy, overrides, and assignment paths. | Role preview of the role and relevant combinations, then a real-member check that members cannot manage roles or webhooks. |
| Medium | Announcements allow member messages (`snapshot.md:11`). | Members can place ordinary messages on an authoritative announcement surface. | Make announcements read-only for members while retaining explicitly approved staff posting access. Review thread, poll, and invite permissions too. | Real-member rejection of messages, existing-thread replies, public/private thread creation, polls, and invite creation. Only message access is a recorded failure; the other actions are untested. |
| Medium | The support forum has no required tags (`snapshot.md:12`). | Posts can bypass product-surface routing. | Require at least one member-selectable domain tag, such as `Command execution` or `Build previews`. Keep any workflow-state tags, such as `Resolved`, moderator-only. Preserve useful existing tags after inventory. | A real member cannot submit an untagged post, can select a domain tag, and cannot apply workflow-state tags. Staff can advance state and link the issue tracker. |

These findings use recorded configuration, not newly observed UI behavior. Exact current Discord labels and permission behavior remain unverified offline.

## Operating-plan gaps

### Ownership and safety

- A human owner is referenced, but succession, backup recovery, and operator assignments are not documented.
- Two maintainers are present. Their assigned roles and permissions are unknown. Admin, Moderator, backup Admin, conduct recusal backup, and moderation lead coverage are unverified; no role vacancy is established.
- The reason for enabling Community, approved operating plan, future launch policy, verification level, and minimum-age policy are missing.
- Moderator MFA, owner MFA, recovery arrangements, shared-account policy, raid protection, explicit-content filtering, and direct-message safety are unverified.
- Rules, moderation escalation, appeals, recusal, emergency response, evidence retention, and private alert destinations are not described.
- AutoMod coverage is unknown for mention spam, suspected spam, abusive language, credential-like strings, and unwanted external Discord invites. Credential-like matches should be blocked without copying matched content to an alert channel. Other alerts should route privately. Future tests must use synthetic values only.
- Member-created invite restrictions, existing invite approval, expiry, use limits, temporary membership, and revocation are unknown. The snapshot's lack of an invite URL does not prove safe invite operations.

### Channels, roles, and onboarding

- The four recorded channels cover conversation, announcements, support, and staff work. Orientation content is not described. Review existing channels for a welcome and rules path before proposing more channels for this small beta.
- Baseline role preview hides staff channels (`snapshot.md:14`). This does not establish conduct-channel privacy, `@everyone` category denies, category inheritance, permission exceptions, real-member visibility, or combined-role safety.
- Full role inventory, hierarchy, explicit permissions, per-user overrides, and absence of `Administrator` are unknown.
- Onboarding, Rules Screening, and voice are explicitly untested. Community being enabled does not prove these are configured or work.
- Default channels, post-join interest questions, safe role assignment, three accessible starter tasks, and opt-in sensitive or voice areas are unverified.
- Server Guide configuration, read-only backing resources, rendered canonical links, and exclusion of confidential content are unknown.
- Support guidelines and seed content are unknown. A proposed support template should request surface/version, runtime, expected and observed results, sanitized reproduction, and steps already tried. It should prohibit secrets, customer data, and private logs, and redirect security reports.
- Separate private-cohort areas, relationship roles, showcase, custom emoji, events, and assets are not established. Their conditional checks remain untested pending scope confirmation; no extra channels or events are prescribed.

### Durable destinations

| Work type | Snapshot evidence | Gap |
| --- | --- | --- |
| Support and bugs | Issue tracker (`snapshot.md:4`). | Exact published destinations, member guidance, link access, and actual handoff are untested. Preserve this project-specific support policy. |
| Security | Project private security-reporting form (`snapshot.md:5`). | Link operation, confidentiality, response ownership, and access without Discord are untested. |
| Conduct | Human owner (`snapshot.md:5`). | A recipient is named by role, but no durable private intake/case system, appeal owner, or recusal backup is documented. Do not assume owner DMs provide durable records. |
| Product feedback | Not specified. | Select one durable destination and publish the route. |
| Product decisions | Not specified. | Identify an issue, decision record, or project tracker destination. |
| Releases | Not specified. | Identify the authoritative release page/changelog if this workflow is planned. |

### Integrations and ongoing operations

No integrations were approved (`snapshot.md:17`). This does **not** establish that none are installed. Installed apps, bots, webhooks, community-data access, permissions, owners, retention, and removal paths are unknown. No integration can be identified as having access from this snapshot.

Before any later integration approval, inventory existing integrations and assess workflow need, native alternatives, operator/privacy policy, readable data, minimum permissions, private-channel access, retention/deletion, export/recovery, incident ownership, and removal. Reject apps requiring `Administrator`. If release automation is later approved, limit it to intended release events and keep automated traffic separate from curated announcements. Credential handling stays human-only.

Brand sources, managed asset storage, approved exports, event cadence, hosts, and review ownership are not recorded. The local state template was used as a gap checklist. No separate operations state was created because this task authorizes only a snapshot audit. A human can later maintain private project-local state with appropriate version-control exclusion.

## Verification matrix

Methods follow `VERIFICATION.md`: **RP** = role preview; **RM** = real member; **HA** = human attestation.

**Passed** means supported only to the stated extent by the supplied snapshot. **Failed** means recorded configuration contradicts the criterion; it does not claim a runtime test occurred. **Untested** means evidence is absent or the test is unavailable. Conditional features of unknown existence are untested, not assumed absent. **Not applicable** is used only for the Community-disabled branch because Community is recorded as enabled.

Every RM check lacks a fresh human-operated non-privileged account and browser/account access. All later tests below require a separately authorized human verification session. No new attestations were collected.

| Check | Method | Status | Evidence or verification gap and launch impact |
| --- | --- | --- | --- |
| Fresh account joins using short-lived, single-use test invite kept outside automation | HA | Untested | No fresh account; new-member entry is not proven. |
| Consumed test invite rejects second use | HA | Untested | No test; reuse limit is not proven. |
| Staff channels invisible to baseline member | RP | Passed | Snapshot line 14 records this narrow preview result only. |
| Conduct channels invisible | RP | Untested | Conduct-channel existence/access unknown; confidentiality not proven. |
| Unselected opt-in channels invisible | RP | Untested | Opt-in inventory absent; selective access not proven. |
| Baseline member cannot see private category/start/feedback | RM | Untested | Private-program scope unknown; isolation not proven if applicable. |
| Cohort role reveals private start and feedback forum | RM | Untested | Cohort role/areas unknown; intended access not proven if applicable. |
| Read-only surfaces reject messages, replies, threads, polls, invites | RM | Failed | Announcements permit messages, line 11. Runtime and remaining actions untested. |
| Default member cannot create invites anywhere when prohibited | RM | Untested | Policy and effective permissions unknown; launch access control not proven. |
| Members cannot manage roles or webhooks | RM | Untested | Privileged interest role is a known defect, but assignments and runtime behavior are unknown; member privilege boundary not proven. |
| Default channels useful and quiet | RM | Untested | Channel list alone cannot prove new-member experience. |
| Forum tags and guidelines visible | RM | Untested | No content or member view; usable posting guidance not proven. |
| Voice and opt-in boundaries work | RM | Untested | Explicitly untested, line 16; participation/access boundaries unknown. |
| All published durable-route links open intended destinations safely | RM | Untested | No links tested; reliable handoff not proven. |
| Community prerequisite for planned Community features | HA | Passed | Enabled per line 9; feature inventory/configuration and operation remain unknown. |
| Rules Screening appears for new member | RM | Untested | Explicitly untested; rules acceptance path not proven. |
| Every required onboarding question has valid answer | RM | Untested | Onboarding explicitly untested; completion not proven. |
| Interest answers grant only intended non-confidential, non-relationship roles/channels | RM | Untested | Assignment path unknown; privileged interest role makes review urgent. |
| Starter tasks lead to accessible destinations | RM | Untested | Tasks not supplied; guided participation not proven. |
| Server Guide has no dead resources | RM | Untested | Guide unknown; navigation not proven. |
| Canonical links render from read-only backing resource | RM | Untested | Resource configuration unknown; reference access not proven. |
| Global guide exposes no confidential content | RP | Untested | No guide preview; confidentiality not proven. |
| Community-disabled checks marked inapplicable | RP | Not applicable | Community is enabled; disabled-mode branch does not apply. |
| Community-disabled text fallbacks cover planned jobs | RM | Not applicable | Community is enabled; no fallback requirement established. |
| First truly new cohort member receives only access role when supported | RM | Untested | Cohort scope and role-assignment capability unknown; automatic access not proven. |
| Existing-member role checked and corrected when absent | HA | Untested | No evidence; existing-member access not proven if applicable. |
| Staff assign cohort role when automatic assignment unavailable | HA | Untested | No fallback/capability evidence; manual access not proven if applicable. |
| Admin has explicit approved permissions, no Administrator | RP | Untested | Admin plan/inventory missing; least privilege not proven. |
| Admin can perform approved recovery/configuration | HA | Untested | No attestation; operational recovery not proven. |
| Admin cannot transfer ownership or reach unrelated private work | RP | Untested | No permission evidence; ownership/data boundaries not proven. |
| Synthetic non-credential alert reaches private moderation channel | HA | Untested | AutoMod not described; alert routing not proven. |
| Synthetic credential blocked, revocation warning shown, no matched-content alert | HA | Untested | No test evidence; credential leakage prevention not proven. |
| Moderators can perform intended safety actions | HA | Untested | Roles/actions unknown; moderation readiness not proven. |
| Moderators cannot manage integrations or unrelated roles | RP | Untested | No role evidence; privilege limits not proven. |
| Audit events identify acting account | HA | Untested | No attestation; accountability not proven. |
| Conduct recusal and backup path exists | HA | Untested | Owner route alone insufficient; independent handling not established. |
| Maintainers guide without unapproved bans/configuration/integration powers | RP | Untested | Two maintainers stated, permissions absent; boundaries not proven. |
| Contributors/partners access only explicit collaboration areas | RP | Untested | Role existence/scope unknown; applicable access not proven. |
| Interest roles have no privileged permissions | RP | Failed | Manage Roles recorded, line 13. |
| Multi-role combinations expose only approved union | RP | Untested | Baseline preview insufficient; combined access not proven. |
| Cohort/relationship roles read-only in start; operators can post/pin | RP | Untested | Private program unknown; combined read-only behavior not proven if applicable. |
| Bots have minimum access, proper hierarchy, no Administrator | RP | Untested | No installed-bot inventory; integration permissions not proven. |
| Role-assignment bot limited to approved lower roles | HA | Untested | Bot existence unknown; assignment limits not proven if applicable. |
| Every feedback-like forum requires member-selectable domain/purpose/package tag | RM | Failed | Support has no required tags, line 12; other forums and runtime enforcement untested. |
| Participants cannot apply workflow-state tags | RM | Untested | Tag permissions absent; workflow integrity not proven. |
| Staff apply workflow states and link durable work | HA | Untested | No lifecycle evidence; tracker handoff not proven. |
| Security details use private route rather than forum | HA | Untested | Intended route stated, actual handling not proven. |
| End-to-end test content removed | HA | Untested | No lifecycle test performed; cleanup not demonstrated. |
| Integrations access only intended channels | RP | Untested | Approval absence is not installation absence; data boundary unknown. |
| Release notifications fire only for intended events/actions | HA | Untested | Integration existence/configuration unknown; event filtering not proven if applicable. |
| Integration test messages and temporary webhooks removed | HA | Untested | No historical evidence; cleanup not proven if applicable. |
| Webhooks handled outside automation; no credential exposure | HA | Untested | Snapshot has no credentials, but broader handling history is unknown. |
| Private state names integration owner/removal path | HA | Untested | No state supplied; integration accountability unknown if applicable. |
| Owner MFA and recovery material outside automation | HA | Untested | No attestation; account recovery readiness not proven. |
| Second human can recover operations | HA | Untested | Two maintainers do not prove recovery authority. |
| No shared account exists | HA | Untested | No attestation; individual accountability not proven. |
| Backup Admin hierarchy can manage required bot roles | RP | Untested | Hierarchy/bot inventory unknown; recovery capability not proven. |
| Conduct/security routes work without Discord | HA | Untested | Form and owner route stated, independent accessibility not proven. |
| Assets use current canonical brand and individual review | HA | Untested | Asset scope/provenance unknown; brand readiness unknown if applicable. |
| Raster and native SVG sources preserved in managed store | HA | Untested | Storage evidence absent; asset maintainability unknown if applicable. |
| SVGs exclude embedded/external content and match raster renders | HA | Untested | No assets supplied; source safety/parity unknown if applicable. |
| Live-product visuals reuse implementation or rendered still | HA | Untested | Visual scope absent; product accuracy unknown if applicable. |
| Recurring-event updates cover full series and live crops | HA | Untested | Event scope absent; series presentation unknown if applicable. |
| Seed content/templates cover approved community jobs | RM | Untested | No operating plan/content; first-member participation not proven. |
| First recurring event has host | HA | Untested | Event plan unknown; hosting readiness unknown if applicable. |
| Every invite approved with bounded expiry and uses | HA | Untested | Invite history absent; controlled access not proven. |
| Role-assigned invites/manual fallback grant only low-privilege access | HA | Untested | Capability/policy unknown; safe assignment not proven if applicable. |
| Temporary membership disabled for persistent participants | HA | Untested | Setting absent; persistent access not proven. |
| Existing-member behavior verified; completed cohort invites revoked | HA | Untested | No evidence; role consistency and invite closure not proven if applicable. |
| Human alone operated invite UI and copied URL | HA | Untested | No URL supplied, but handling history not attested. |
| Review date scheduled after first cohort joins | HA | Untested | No review date supplied; ongoing oversight not established. |

## Human follow-up and verification limits

1. The owner should review the three failures and authorize a separate improvement plan before any correction. Include exact changes, responsible operators, and rollback steps.
2. The owner should confirm role assignments, successor/recovery coverage, moderation and conduct backup ownership, launch policy, and conditional feature scope.
3. Maintainers should confirm the published issue-tracker route and support template. The owner should establish durable conduct intake and the missing feedback/decision/release routes.
4. An authorized human should gather redacted configuration evidence and run role previews for all relevant roles and combinations. No secrets or private report contents should enter the audit record.
5. When a fresh human-operated non-privileged test account becomes available, run the member matrix and applicable feedback lifecycle. Any test invite requires separate explicit approval and human-only creation, copying, and use. Record only non-secret settings and results.
6. Humans should attest to recovery, MFA, invite lifecycle, and any webhook handling without exposing credentials. Capability-check optional invite role assignment rather than assuming availability.
7. Re-audit after approved corrections and before further invitations or launch expansion. Schedule a review immediately after the next cohort joins. No review date or owner acceptance of residual risk is currently recorded.

**Verified extent:** the supplied snapshot supports the three configuration defects, baseline staff hiding in role preview, and Community being enabled. It also states the audience, channel inventory, intended support/bug/security/conduct routes, and lack of integration approval. These are documentary observations, not independent live verification.

**Remaining limits:** no browser, account access, fresh test account, current official documentation, live permission inspection, link opening, or end-to-end interaction was available. Current feature labels and capability behavior were not researched. Role preview cannot substitute for new-member onboarding, posting, forum, invite, Server Guide, or voice tests. Unknown configuration is not treated as absent, and untested checks do not count as passes.

This Markdown-only workspace has no configured project type-checker or lint command. No code checks or live server tests were run. This report records gaps; it does not approve launch or authorize changes.
