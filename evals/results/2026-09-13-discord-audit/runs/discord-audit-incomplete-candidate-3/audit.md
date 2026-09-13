# Fictional Discord server audit

## Verdict and scope

**No observed control failures are established by the snapshot. Verification is incomplete.** The recorded configuration shows several healthy controls. It does not establish real-member enforcement or launch readiness.

- **Mode:** Audit only, following local `skills/discord-community-server/SKILL.md`, steps A1–A3.
- **Audit date:** 2026-09-13. **Snapshot date:** Unknown.
- **Server evidence:** Only `snapshot.md`, lines 1–20. Line references below refer to that file.
- **Assessment criteria:** Local `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md` in the same skill directory.
- **Access limits:** Offline. Browser and account access are unavailable. No fresh human test account is available (lines 15, 19).
- **Actions:** Created this report only. No server changes, live checks, invites, app installations, or modifying tests were performed. Supplied input files were left unchanged.

Exact-current Discord labels and permission behavior remain unverified. The local references provide audit criteria, not independent evidence of this server or current platform behavior.

## Community context and durable routes

The community has 20 invited beta users and two maintainers (line 3). Its product surfaces are **command execution** and **build previews** (line 4). The supplied channel inventory is general, announcements, support, and staff (line 10). This is a small invited beta; no broader launch plan is supplied.

| Workflow | Supplied destination | Limit |
| --- | --- | --- |
| Support and bugs | Issue tracker (line 4) | Tracker identity, published links, and actual routing are unverified. |
| Security reports | Project's private security-reporting form (line 5) | Availability, confidentiality, and access without Discord are unverified. |
| Conduct reports | Human owner (line 5) | Durable private intake, recusal, backup, and access without Discord are unknown. |

Keep these routes in any later correction. The support forum does not, by itself, contradict the issue-tracker boundary. Evidence of forum guidance and durable handoff is missing.

Moderator assignments, response commitments, event cadence, owner succession, billing/account areas, distinct confidential cohorts, brand sources, and the managed asset store are unknown. Invited beta membership alone does not establish a separate private-cohort design. Product-feedback, decision-record, and release destinations are also unspecified.

## Evidence classes and healthy observations

**Recorded configuration** means a supplied statement about settings. It is not an independently inspected role preview or a behavioral test. **Role preview** supports static access conclusions only. **Real member** requires a fresh human-operated non-privileged account. **Human attestation** covers checks such as recovery, invite handling, and moderation outcomes. No fresh checks of any class were performed here.

| Assessment | Source and evidence class | Result and limit |
| --- | --- | --- |
| Community prerequisite | Line 9; recorded configuration | Community is reported enabled. This supports the forum prerequisite; it does not prove Onboarding or Rules Screening works. |
| Announcements read-only shape | Line 11; recorded configuration | Denies baseline messages, existing-thread replies, public/private thread creation, polls, and invite creation. The recorded shape matches the read-only criteria. Real-member rejection and combined-role access are untested. |
| Support forum taxonomy | Line 12; recorded configuration | Requires a member-selectable **command execution** or **build previews** tag. Workflow-state tags are moderator-only. This matches the domain-tag criteria. Posting and tag enforcement remain untested (line 15). |
| Staff visibility | Line 14; supplied role preview | Passed within the supplied baseline preview: staff is hidden. Separate conduct-area visibility and real-member access are not established. |
| Opt-in visibility | Line 14; supplied role preview | Passed within the supplied baseline preview: unselected opt-in channels are hidden. No onboarding or voice outcome is established. |
| Interest-role least privilege | Lines 13–14; recorded configuration and supplied role preview | Passed for the supplied static permission shape: relevant product channels and notifications only, without privileged permissions. Actual assignment through interest answers is untested. |
| Integrations and sensitive material | Line 17; supplied statement | No integrations were approved, and no invite or credential is included. This does not prove no integrations are installed or that historical handling was safe. |

## Observed failures

**None established.** Missing observations are listed below as gaps, not insecure settings. There is no evidence-backed corrective finding to prioritize. No correction was applied.

## Unknown and unavailable checks

All checks below are **untested** unless explicitly marked not applicable. Priorities describe the value of obtaining evidence, not the severity of an observed failure. Suggested verification is a future handoff only; this audit authorizes none of it.

| Area and source | Gap and impact | Future evidence required |
| --- | --- | --- |
| Effective access; lines 11–15 | **High:** Static checks do not prove read-only enforcement, inability to manage roles/webhooks, or server-wide invite denial. Announcement invite denial is channel-specific evidence. | **Role preview:** baseline, category overrides, exceptions, and relevant role combinations. **Real member:** all read-only actions, privileged-action rejection, and member invite creation boundaries across the server. |
| Staff roles; lines 3, 13–14 | **High:** Two maintainers are known, but their permissions are not. Admin, Moderator, contributor/partner, bot hierarchy, and server-wide absence of `Administrator` are unknown. | **Role preview:** explicit permissions, hierarchy, private-area access, and combined roles. **Human attestation:** intended moderation and recovery actions work. |
| Safety controls; line 16 | **High:** AutoMod behavior is unobserved. Verification level, moderator MFA, raid controls, explicit-content filtering, and DM safety settings are unspecified. Protection cannot be assessed. | **Human attestation:** non-secret settings and synthetic behavior tests. Cover mention/suspected spam, abusive language, external invites, and credential-like strings. Credential matches must block without copying content to alerts, and show a revocation warning. Non-credential alerts must route privately. |
| Ownership, recovery, and reporting; lines 5, 16 | **High:** Human conduct ownership is known. Owner MFA, successor, independent recovery, shared-account status, conduct recusal/backup, and durable intake are unknown. | **Human attestation:** recovery and succession arrangements without exposing recovery material; working security and conduct routes without Discord. **Role preview:** backup Admin hierarchy and narrow conduct access. |
| Onboarding and orientation; lines 9, 16 | **Medium:** Rules Screening and Onboarding were not observed. Default-channel usefulness, valid required answers, starter tasks, and actual interest-role assignment are untested. | **Real member:** screening, required questions, intended non-privileged assignments, accessible starter tasks, and useful defaults. **Human attestation:** Community prerequisites for planned features. |
| Forum lifecycle and durable work; lines 4–5, 12, 15 | **Medium:** Required tags and restricted state tags are recorded, but enforcement, guidelines, staff state transitions, and tracker handoff are untested. | **Real member:** visible tags/guidelines, rejection without a domain tag, inability to apply workflow states, and working published route links. **Human attestation:** staff transitions, issue-tracker links, private security redirection, and cleanup of any later test content. |
| Seed content and templates; lines 4–5, 10–12 | **Medium:** Welcome text and support guidelines were not supplied. Members' ability to find durable routes and provide sanitized reproductions is unknown. | **Real member:** accessible seed content for actual community jobs. Review guidance for versions, runtime, expected/observed results, sanitized reproductions, and the supplied reporting routes. |
| Invites and cohort access; lines 3, 17 | **High if inviting more users:** Existing invite approval, expiry, use limits, temporary membership, revocation, and role assignment are unknown. Distinct confidential-cohort applicability is unknown. | **Human attestation:** non-secret invite settings and handling, existing-member role checks, and manual fallback where needed. **Real member:** private boundaries and first-new-member role assignment if a cohort exists. Future test invites require explicit approval and human-only handling; never include their URLs in evidence. |
| Voice, opt-in areas, and Server Guide; lines 14, 16 | **Conditional:** Voice is unobserved; Server Guide and confidential resources are unspecified. The preview does not prove either flow. | Confirm which surfaces exist. **Real member:** voice/opt-in behavior and accessible Guide resources, including external links from read-only backing channels. **Role preview:** no confidential content exposed by the global Guide. |
| Integrations; line 17 | **Conditional:** Approval status is known; installation inventory and community-data access are unknown. No app-specific verdict is possible. | Obtain a non-secret inventory. If present, use **role preview** for minimum channel/action access and **human attestation** for owner, data boundary, retention/removal path, intended release events, and safe webhook handling. Do not install an app to complete this audit. |
| Assets and recurring events; no snapshot evidence | **Conditional:** Existence, intended use, canonical sources, managed storage, hosts, cadence, and series updates are unknown. | Confirm applicability first. If used, obtain **human attestation** for brand provenance, reviewed raster/vector assets and parity, managed storage, event host, and series-wide crop verification. |
| Review and launch acceptance; lines 3, 15–20 | Review date and residual-risk acceptance are unknown. Member behavior cannot be certified. | **Human attestation:** review ownership/date and any later launch decision after relevant evidence is available. Launch acceptance is not required to finish this audit. |

The **Community-disabled fallback checks are not applicable** because Community is recorded enabled (line 9). Community-enabled checks remain untested; they are not exempted by missing observations. Optional cohort, voice, Guide, bot, asset, and event checks have unknown applicability rather than an assumed pass or failure. Integration-specific testing is unavailable without an inventory and an in-scope integration.

## Handoff and verification limits

- **Verified from supplied evidence:** the baseline preview hides staff and unselected opt-in channels, and confirms the non-privileged interest-role shape. Announcement denials and forum tagging are healthy recorded settings only.
- **Not verified:** fresh-member behavior, current Discord labels, safety enforcement, recovery, server-wide least privilege, actual reporting links, and the conditional workflows above.
- **Human follow-up:** first close the high-priority access, safety, recovery, and invite-evidence gaps before expanding the beta. Then verify member onboarding and the support-to-issue-tracker lifecycle. Any later tests or changes need their own authorization.
- **Roles needing members:** unknown. Two maintainers and a human conduct owner are recorded; Moderator and backup Admin assignments are not supplied.
- **Integrations with community-data access:** unknown. No integrations were approved; installation absence cannot be inferred.
- **Next review:** recommended when missing evidence becomes available and before further invitations or access changes. No review date is recorded or scheduled.

Audit steps A1–A3 are complete as an evidence-limited assessment. This is not a launch-readiness certification. No operating state file or implementation plan was required or created.

No code project, type-check, or lint configuration is supplied in this workspace. Those checks are not configured for this Markdown-only audit. Report verification consists of checking its claims against the supplied snapshot and local audit criteria.
