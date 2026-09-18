# Fictional Discord server audit

## Verdict and scope

**Audit only. Launch readiness is not verified.** The supplied snapshot supports several configuration strengths, but lacks real-member tests and key operational evidence. No observed configuration defect is established; missing evidence is not proof that a control is absent.

This offline audit uses `snapshot.md` as its only server evidence. The audit criteria come from the local `skills/discord-community-server/SKILL.md`, `REFERENCE.md`, `OPERATIONS.md`, `VERIFICATION.md`, and `STATE-TEMPLATE.md`. No live documentation, services, accounts, or external files were accessed. No server changes were authorized or made. Only this report was created; supplied inputs were left unchanged.

The state template was used as a coverage checklist. This report does not invent an approved operating plan or create a separate operational state record for the fictional server.

## Recorded strengths

| Observation | Evidence | Limit |
| --- | --- | --- |
| Community is enabled. | Snapshot line 9 | Current feature labels and behavior remain unverified. |
| General, announcements, support, and staff channels provide a compact starting structure for 20 beta users and two maintainers. | Lines 3, 10 | Channel contents, exact types other than the support forum, and member usefulness were not inspected. |
| Announcements deny baseline messages, thread replies, both thread creation types, polls, and invites. | Line 11 | This is recorded configuration, not a successful posting test. It does not prove a server-wide invite restriction. |
| The support forum requires a member-selectable product tag: command execution or build previews. Workflow-state tags are moderator-only. | Lines 4, 12 | The taxonomy matches the product. Runtime enforcement and staff workflow were not tested. |
| Baseline role preview hides staff and unselected opt-in channels. | Line 14 | This does not establish separate conduct-channel privacy or multi-role safety. |
| Interest-role permissions grant only relevant product channels and notifications, without privilege. | Lines 13–14 | The supplied preview confirms static permission shape, not onboarding role assignment. |
| Support and bugs have an issue-tracker destination; security reports have a private form. | Lines 4–5 | No published links or successful submissions were supplied. |

## Gaps and recommended human follow-up

These are evidence and planning gaps, not approved changes. Priority indicates what to resolve before relying on the setup for a further launch.

### High priority

1. **Member boundaries are untested.** No fresh human-operated test account is available (line 15). Later test read-only enforcement, forum tags, role/webhook management denial, opt-in access, and any private cohort boundaries. Use a separately approved, human-managed single-use, short-lived test invite. Keep its URL outside automation. Static preview cannot substitute for these tests.
2. **Safety controls are unobserved.** Rules Screening, Onboarding, voice, and AutoMod behavior were not observed (line 16). Verification level, minimum-age policy, moderator MFA, raid protection, explicit-content filtering, and direct-message safety are also unspecified. Obtain redacted settings and human test results. Test mention spam, suspected spam, abusive language, unwanted external invites, and credential-like strings. Credential tests must use synthetic values, block the message, show a revocation warning, and avoid copying matched content into alerts. Non-credential alerts must go privately to moderation.
3. **Privileged access and recovery are unknown.** A human owner is referenced, but no successor, backup Admin, moderation lead, full role permissions, hierarchy, or recovery attestation is supplied. Two maintainers do not establish moderation or recovery coverage. Verify explicit least-privilege permissions, absence of `Administrator` on every role and bot, category inheritance and exceptions, combined-role access, MFA, separate accounts, and a second human's recovery ability.
4. **Conduct handling lacks a documented durable destination and independent backup.** The human owner is the intake contact (line 5). The snapshot does not name an off-Discord case system, appeal reviewer, or recusal path when the owner is involved. Record these and verify that conduct and security routes work without Discord access. Keep conduct intake narrower than general staff access.
5. **Invite controls are only partly described.** The announcements deny does not prove that baseline members cannot invite elsewhere. The 20 invited users do not prove approval, expiry, use limits, temporary-membership settings, or completed-invite revocation. Obtain only non-secret human attestations and test the server-wide member restriction if the plan requires it.

### Before declaring the operating plan complete

6. **Durable routing needs detail.** Retain the snapshot's issue tracker as the destination for both support and bugs. Define the forum-to-tracker handoff and destinations for product feedback, decisions, releases, and persistent help where those workflows apply. Verify published routes; no destination URL was supplied. Keep security details out of public forums.
7. **Orientation and content are unknown.** Inspect welcome/rules content, support guidelines, required onboarding answers, three concrete starter tasks, and accessible Server Guide resources. Support templates should request product/version, runtime, expected and observed results, and a sanitized reproduction. If external links use Server Guide, verify a read-only backing channel and rendered links. Keep confidential resources out of the global guide.
8. **Private cohort requirements are not established.** Invited beta users do not by themselves prove a confidential cohort or private program exists. Confirm whether one is intended. If so, verify category-level `@everyone` denial, a distinct low-privilege access role, a read-only start channel, private feedback, and safe combined-role permissions. Keep confidential access out of interest-role self-assignment. Human operators must capability-check invite role assignment and use staff assignment when unavailable; test both new- and existing-member behavior.
9. **Integration inventory is unknown.** “No integrations were approved” (line 17) is not proof that none are installed. Obtain a redacted inventory, including bots and webhooks. For any existing integration, record its workflow, approval, operator, data access, permissions, retention/deletion behavior, removal path, and review owner. Reject an app requiring `Administrator`. No integration setup or test is authorized by this audit.
10. **Optional assets and events have no evidence.** Confirm whether either is in scope before requiring them. If used, document canonical brand sources, reviewed raster/vector assets, managed storage, and applicable rendering checks. Events need a host, backup, cadence, timezone, durable outcome destination, and full-series/crop verification. Do not add channels or events merely to fill a checklist.
11. **Operational state and review ownership are incomplete.** Record the Community rationale, launch policy, approved operating plan, role assignments, moderation escalation, appeal ownership, and next review date. No owner acceptance of residual risk is supplied.

## Verification matrix

Each row below corresponds to a check in local `VERIFICATION.md`; line numbers identify the original check. **Passed** means only that the supplied evidence supports that exact scope. **Untested** means evidence is unavailable, including when applicability is unresolved. **Not applicable** is used only for the explicitly disabled-Community branch. No check is marked failed because the snapshot supplies no observed enforcement failure.

Methods: **RP** = role preview; **RM** = fresh real member; **HA** = human attestation. No new preview, member test, or attestation was performed during this audit.

| Reference line | Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- | --- |
| 7 | Fresh account joins through bounded test invite | HA | Untested | No fresh account; join path and test-invite handling unproved. |
| 8 | Consumed invite rejects reuse | HA | Untested | Single-use enforcement unproved. |
| 9 | Staff and conduct channels hidden | RP | Untested | Staff portion passes supplied preview (snapshot 14); separate conduct scope unknown. |
| 10 | Unselected opt-in channels hidden | RP | Passed | Supplied baseline preview, snapshot 14; static scope only. |
| 11 | Baseline cannot see private category/start/feedback | RM | Untested | Private-program scope unknown; isolation unproved if used. |
| 12 | Cohort role sees start and feedback | RM | Untested | Cohort role and program scope unknown; intended access unproved. |
| 13 | Read-only channels reject all six actions | RM | Untested | Announcements configuration recorded; actual enforcement unproved. |
| 14 | Default member cannot create invites anywhere | RM | Untested | Launch policy and server-wide denial unproved. |
| 15 | Members cannot manage roles or webhooks | RM | Untested | Baseline privilege boundary unproved. |
| 16 | Default channels useful and quiet | RM | Untested | Channel list alone does not prove member experience. |
| 17 | Forum tags and guidelines visible | RM | Untested | Tags recorded; member visibility and guidelines unknown. |
| 18 | Voice and opt-in boundaries work | RM | Untested | Voice unobserved; opt-in preview does not prove runtime behavior. |
| 19 | Published durable-route links open safely | RM | Untested | No links supplied; destination reachability unproved. |
| 25 | Community prerequisite for planned features | HA | Passed | Community enabled per snapshot 9; feature operation is not implied. |
| 26 | New member sees Rules Screening | RM | Untested | Acceptance flow unobserved. |
| 27 | Required questions have valid answers | RM | Untested | Onboarding completion unproved. |
| 28 | Interest answers grant only intended access | RM | Untested | Role shape passes; assignment flow unobserved. |
| 29 | Starter tasks have accessible destinations | RM | Untested | First-member orientation unproved. |
| 30 | Server Guide has no dead resources | RM | Untested | Guide state unknown; navigation may fail. |
| 31 | External links render from backing channel | RM | Untested | Resource setup unknown; link presentation unproved. |
| 32 | Global guide excludes confidential resources | RP | Untested | Guide confidentiality unproved. |
| 36 | Disabled-Community checks marked N/A | RP | Not applicable | Community is enabled. |
| 37 | Disabled-Community text fallbacks cover jobs | RM | Not applicable | Community is enabled. |
| 41 | First new cohort member receives only access role | RM | Untested | Cohort and role-assignment capability unknown; correct access unproved. |
| 42 | Existing-member role behavior verified and corrected | HA | Untested | Cohort applicability unknown; role gaps may persist if used. |
| 43 | Staff assignment fallback when unavailable | HA | Untested | Capability and fallback owner unknown; cohort access unproved. |
| 47 | Admin explicit permissions, no Administrator | RP | Untested | Privileged-role inventory absent. |
| 48 | Admin can recover and configure as approved | HA | Untested | Recovery arrangements unobserved. |
| 49 | Admin ownership/private-work boundary | RP | Untested | Admin permission boundary unproved. |
| 53 | Non-credential match alerts privately | HA | Untested | AutoMod alert routing unobserved. |
| 54 | Credential match blocked, warning shown, no alert copy | HA | Untested | Secret-safe moderation behavior unproved. |
| 55 | Moderators can perform safety actions | HA | Untested | Incident response capability unproved. |
| 56 | Moderators cannot manage integrations/unrelated roles | RP | Untested | Moderator privilege limits unknown. |
| 57 | Audit events identify actor | HA | Untested | Accountability unproved. |
| 58 | Conduct recusal and backup path exists | HA | Untested | Owner intake alone does not establish independent handling. |
| 62 | Maintainers guide without unapproved powers | RP | Untested | Two maintainers recorded; permissions unknown. |
| 63 | Contributor/partner access restricted | RP | Untested | Role existence and access unknown; review if present. |
| 64 | Interest roles have intended access, no privilege | RP | Passed | Snapshot 13–14 confirms recorded permission shape. |
| 68 | Multi-role combinations preserve intended boundaries | RP | Untested | Baseline preview cannot establish combined-role safety. |
| 69 | Cohort/relationship roles read-only; staff post/pin | RP | Untested | Private start channel and roles unknown; enforcement unproved if used. |
| 70 | Bot permissions and hierarchy minimized | RP | Untested | Installed bot inventory absent; no-approval statement is insufficient. |
| 71 | Role-assigning bot limited to approved lower roles | HA | Untested | Bot existence unknown; escalation boundary unproved if used. |
| 75 | Forums require member-selectable domain/purpose tag | RM | Untested | Support configuration matches; posting enforcement untested. |
| 76 | Participants cannot apply workflow-state tags | RM | Untested | Moderator-only configuration recorded; enforcement untested. |
| 77 | Staff advance states and link durable work | HA | Untested | End-to-end triage and tracker handoff unproved. |
| 78 | Security details use private route | HA | Untested | Policy names private form; actual handling unobserved. |
| 79 | End-to-end test content removed | HA | Untested | No lifecycle test supplied; later verification must include cleanup. |
| 83 | Integration access limited to intended channels | RP | Untested | Inventory unknown; data exposure cannot be assessed. |
| 84 | Release notifications limited to intended events/actions | HA | Untested | Integration existence/configuration unknown; notification scope unproved. |
| 85 | Test messages and temporary webhooks removed | HA | Untested | No integration lifecycle evidence; cleanup unknown if applicable. |
| 86 | Webhooks handled outside automation; no exposure | HA | Untested | Snapshot contains no credential; historical handling is not established. |
| 87 | State names integration owner and removal path | HA | Untested | No inventory or operational state supplied. |
| 91 | Owner MFA and recovery material held safely | HA | Untested | Recovery unobserved; ownership continuity unproved. |
| 92 | Second human can recover operations | HA | Untested | Successor/backup capability unknown. |
| 93 | No shared account | HA | Untested | Account model unknown. |
| 94 | Backup Admin can manage required bot roles | RP | Untested | Hierarchy and bot applicability unknown; recovery may be blocked. |
| 95 | Conduct/security routes work without Discord | HA | Untested | Private form and owner named; independent reachability unproved. |
| 99 | Assets use canonical sources and individual review | HA | Untested | Assets and provenance unknown; review if used. |
| 100 | Raster/SVG sources preserved in managed store | HA | Untested | Asset applicability/storage unknown; reproducibility unproved. |
| 101 | SVG safety and rendered parity checked | HA | Untested | No SVG evidence; source quality unproved if used. |
| 102 | Product visuals reuse real implementation/still | HA | Untested | Visual scope unknown; fidelity unproved if used. |
| 103 | Event artwork/updates verified on full series at crop sizes | HA | Untested | Event scope unknown; series presentation unproved if used. |
| 107 | Seed content/templates cover approved jobs | RM | Untested | Approved plan and contents absent; participation readiness unproved. |
| 108 | First recurring event has host | HA | Untested | Event plan unknown; ownership unproved if applicable. |
| 109 | Every invite approved and bounded | HA | Untested | Invited users do not establish historical invite controls. |
| 110 | Invite/manual assignment grants only access role | HA | Untested | Cohort scope and assignment path unknown. |
| 111 | Temporary membership off for persistent access | HA | Untested | Invite settings unknown; persistent membership unproved. |
| 112 | Existing-member behavior checked; completed invites revoked | HA | Untested | Cohort lifecycle unknown; access and invite cleanup unproved. |
| 113 | Human alone operated invite UI and copied URL | HA | Untested | No invite handling history supplied. |
| 114 | Post-cohort review date scheduled | HA | Untested | No review date supplied; follow-up ownership unknown. |

## Handoff and verification limits

- **Changed:** Created `audit.md` only. No server actions, integrations, invites, test posts, or role assignments occurred.
- **Verified from supplied evidence:** Community prerequisite, baseline opt-in invisibility, interest-role permission shape, and the staff portion of the staff/conduct preview check. Recorded announcement denies and forum tag configuration are strengths, not real-member test passes.
- **Still untested:** All real-member checks; most human attestations; privileged roles, role combinations, and other unsupplied previews. Optional feature applicability remains unresolved rather than assumed absent. The snapshot has no capture date, full inventory, or live evidence, so freshness and completeness cannot be established.
- **Human actions remaining:** Resolve the high-priority evidence gaps, confirm optional scope, document ownership and durable routes, and arrange explicitly approved human testing when an account becomes available. Do not treat this audit as launch approval. The owner must review unresolved risks before any further launch decision.
- **Roles needing members:** Successor, backup Admin, moderation lead, conduct recusal backup, and appeal reviewer have no documented assignments. This is an assignment-evidence gap, not proof that the roles are vacant. Event and integration owners are needed only if those workflows exist. The two maintainers' exact roles remain unknown.
- **Integrations accessing community data:** None are documented as approved. Actual installed integrations and their access remain unknown.
- **Review timing:** Review before the next invitation wave or launch decision, again after the first verified fresh-member/cohort test, and after changes to permissions, onboarding, moderation, or integrations. The human owner should set the calendar date; none is currently evidenced.
- **Offline limits:** Current Discord labels, capabilities, and permission behavior were not checked against live official documentation. Links were not opened. No behavioral result is inferred from configuration alone.
- **Artifact checks:** This is a Markdown-only workspace with no supplied type-check or lint configuration. No project checker or server test was run. Report verification consists of checking coverage against the local matrix and evidence against `snapshot.md`.
