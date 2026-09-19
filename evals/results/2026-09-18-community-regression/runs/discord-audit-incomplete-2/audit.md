# Fictional Discord server audit

## Verdict and scope

**No failures are established by the supplied snapshot. This is a limited evidence assessment, not a launch-readiness pass.**

- **Mode:** audit only, offline. No server changes or member tests were performed.
- **Audit date:** 2026-09-18. **Snapshot date:** unknown.
- **Server evidence:** `snapshot.md` only; line references below refer to that file.
- **Assessment criteria:** local `skills/discord-community-server/SKILL.md`, `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md`. These define controls, not additional server facts.
- **Access limits:** browser and account access are unavailable. No fresh human test account is available (lines 15–20).
- **Current platform details:** exact-current Discord labels and permission behavior remain unverified. No live documentation or services were accessed.

Recorded configuration is evidence of the stated setting, not proof of its runtime enforcement. Supplied role preview supports only the recorded static visibility and permission checks. It does not establish a fresh-member result. No new human attestation was obtained.

## Community context and durable routes

The community has 20 invited beta users and two maintainers (line 3). Its product surfaces are **command execution** and **build previews** (line 4). Staff availability, moderation coverage, response commitments, and event cadence are unknown. Invited beta participation does not establish a separate confidential cohort or a verified invite policy.

| Workflow | Supplied destination | Limit |
| --- | --- | --- |
| Support and bugs | Issue tracker (line 4) | Exact destination and member-facing links are not supplied; handoff behavior is untested. |
| Security reports | Project's private security-reporting form (line 5) | Form access, confidentiality, and operation without Discord are untested. |
| Conduct reports | Human owner (line 5) | Contact method, durable private case storage, recusal, and backup are unknown. |

Feedback, product decisions, persistent documentation, and release destinations are unspecified. Any later guidance should preserve the supplied support, bug, security, and conduct routes. Naming the human owner as conduct recipient does not establish a durable conduct-record system.

## Healthy observations

| Observation and source | Evidence class and supported result |
| --- | --- |
| Community is enabled (line 9). | Recorded configuration supports the prerequisite for Community features. It does not verify Rules Screening, Onboarding, or Server Guide operation. |
| General, announcements, support, and staff channels exist (line 10). | Recorded inventory supports these community surfaces. Channel usefulness, complete inventory, seed content, and actual member access are untested. |
| Announcements deny baseline members messages, existing-thread replies, public and private thread creation, polls, and invite creation (line 11). | Recorded configuration covers the listed read-only controls. Effective denial requires a real-member test; other channels and role combinations are not covered. |
| Support requires a member-selectable **command execution** or **build previews** tag; workflow-state tags are moderator-only (line 12). | Recorded configuration matches the domain-tag and staff-controlled workflow requirements. Post creation and tag enforcement remain untested as a real member. |
| The interest role grants only relevant product channels and notifications, without privileged permissions (lines 13–14). | Supplied role preview confirms this static permission shape. It does not verify how Onboarding assigns the role. |
| Baseline role preview hides staff and unselected opt-in channels (line 14). | Supplied role-preview checks pass for those stated boundaries only. Conduct-specific, multi-role, and real-member visibility are not established. |

## Observed failures

**None established.** The supplied observations do not show a breached control. Missing observations below are verification gaps, not findings of insecure configuration. No corrective server changes are proposed as necessary on this evidence.

## Gaps and verification coverage

The following groups cover the remaining applicable local controls. All checks are **unknown or untested** unless a conditional or not-applicable status is stated. Suggested verification is future human work, not authorization to run tests or modify this server.

### 1. Access, roles, and read-only enforcement

**Gap:** Complete role definitions, role hierarchy, category inheritance, channel exceptions, per-user overrides, and multi-role combinations are unavailable. The snapshot does not establish server-wide absence of `Administrator`. Admin configuration boundaries, Moderator separation, Maintainer permissions, and baseline role/webhook-management denial are unknown. Conduct intake visibility and separation from general staff are unknown. Other read-only surfaces, if present, are not assessed.

**Verification:** Role preview should cover applicable privileged roles, conduct areas, category boundaries, and combined roles. A real member should verify announcement denials and inability to manage roles or webhooks. Existing preview results do not prove these broader checks.

### 2. Onboarding, orientation, and member experience

**Gap:** Onboarding and Rules Screening were not observed (line 16). Required answers, role assignment, default-channel usefulness, three starter tasks, welcome text, and accessible destinations are untested. Server Guide presence, backing-channel permissions, external-link rendering, dead resources, and exclusion of confidential content are unknown. Voice existence and opt-in behavior are unknown.

**Verification:** A real member should exercise Rules Screening, applicable Onboarding questions, interest-role assignment, starter tasks, Guide resources, and any voice boundaries. Role preview should check any Guide confidentiality boundary. **Community-disabled fallback checks are not applicable**, because Community is recorded as enabled.

### 3. Forum workflow and durable handoffs

**Gap:** Real-member posting and tag enforcement were explicitly not tested (line 15). Forum guidelines, templates, versions/runtime prompts, expected and observed results, sanitized reproductions, and sensitive-data restrictions are unknown. Staff workflow transitions, durable issue links, private security redirection, and cleanup of test content are untested. No evidence establishes additional feedback, bug, or showcase forums.

**Verification:** A real member should confirm visible guidelines, mandatory domain-tag selection, and inability to apply workflow-state tags. Human attestation should confirm staff state changes, issue-tracker handoff, private security routing, and test cleanup. Real-member checks should confirm every published durable-route link opens its intended destination. Additional forum controls are conditional on those forums existing.

### 4. Moderation and native safety

**Gap:** AutoMod behavior was not observed (line 16). Configuration is also unspecified. Mention spam, suspected spam, abusive language, credential-like strings, and external-invite coverage are unknown. Private non-credential alerts, credential blocking without copying matches into alerts, sender revocation warnings, and avoidance of overbroad technical-term rules are untested. Verification level, minimum-age policy, moderator MFA, raid protection, content filtering, direct-message safety, moderation actions, audit attribution, and report/appeal procedures are unknown.

**Verification:** Obtain non-secret configuration evidence and human attestation of intended safety actions and attributable audit events. Any later behavior checks should use synthetic inputs. Human attestation should distinguish private non-credential alert delivery from credential blocking with no matched-content alert copy.

### 5. Ownership, recovery, and staffing

**Gap:** A human owner receives conduct reports, but owner identity and operational responsibility are not otherwise documented. Recovery arrangements were not observed (line 16). Owner MFA, recovery material held outside automation, a human successor, a second human recovery path, absence of shared accounts, and backup Admin hierarchy are unknown. Two maintainers do not establish moderator coverage or a successor. Which operational roles still need members is unknown.

**Verification:** Human attestation should confirm ownership, recovery, staffing, conduct recusal and backup, and security/conduct access without Discord. Role preview should confirm any backup Admin's required hierarchy and explicit permissions. Do not obtain credentials or recovery material as evidence.

### 6. Invites and conditional private cohorts

**Gap:** Announcement invite denial does not establish server-wide denial for `@everyone` and member-visible overrides. Historical invite approval, owner, expiry, use limits, human-only handling, temporary membership, and revocation are unknown. The absence of an invite URL in the snapshot does not verify invite controls.

No separate private program, confidential feedback surface, cohort-access role, or relationship role is established. Its applicability remains unknown; private-category/start/forum isolation and role-assignment tests cannot be marked passed or definitively not applicable.

**Verification:** Human attestation should establish non-secret invite settings and handling. Any later authorized test would require a fresh human-operated non-privileged account and a human-managed, short-lived, single-use test invite. The human would attest rejection of reuse. A real member would verify server-wide invite denial and, if a cohort exists, baseline exclusion, cohort access, and first-new-member role assignment where supported. Human attestation would cover existing-member behavior, manual fallback, and completed-invite revocation. Role preview would cover cohort/relationship combinations and read-only start-channel controls. No invite is required for this offline audit.

### 7. Integrations and data access

**Gap:** No integrations were approved (line 17). This does not prove none are installed. The installed inventory, bot roles, data access, retention/deletion, operators, permissions, hierarchy, ownership, and removal paths are unknown. No integration can be named as having community access from this evidence.

**Verification:** If integrations exist, review non-secret inventory and the local app-review controls. Role preview should establish minimum channel/action permissions and no `Administrator`. Human attestation should cover role-assignment limits, owners, removal paths, and data handling. Release-webhook event scope, synthetic delivery, cleanup, and human-only credential handling are conditional on such a webhook existing. No installation, approval, or webhook test is needed to finish this audit.

### 8. Assets, events, and operational readiness

**Gap:** Brand sources, community assets, managed storage, custom emoji meanings, events, hosts, backups, and recurring-series updates are unspecified. Asset provenance, raster/SVG preservation, vector-only content, rendered parity, live-product visual reuse, and live crop checks are conditional on applicable assets or events existing. They are not established failures. Launch seed content, workload coverage, response commitments, and a post-cohort review date are unknown.

**Verification:** Human attestation should establish applicable asset provenance, preservation, event ownership, and series-wide review. A real member should verify seed content and templates for actual community jobs. Do not infer a need for new channels, bots, events, or a cadence from the member count.

## Handoff

- **Changed:** Only this local `audit.md` was created. Supplied input files were left unchanged. No server changes were made.
- **Verified within the evidence:** The snapshot records appropriate announcement restrictions and forum tags, plus successful static role previews for baseline staff/opt-in visibility and the interest role. These are not live or fresh-member passes.
- **Remaining limits:** Member enforcement, onboarding, moderation, recovery, broader permissions, invite controls, and conditional operational features remain as described above. Exact-current labels remain unverified.
- **Human follow-up:** First resolve the role, moderation, invite, and recovery evidence gaps relevant to this invited beta. Obtain authorized real-member evidence before relying on runtime enforcement. Supply non-secret attestations only.
- **Review trigger:** Reassess when missing evidence becomes available, before broader invitations, or after permission, Onboarding, or integration changes. Review actual redirects, unanswered support posts, and staff load before expanding operations. No review date is established by the snapshot.
- **Local checks:** The report was checked against the supplied snapshot and local audit references. No project type-check or lint configuration is present in this document-only workspace; neither check was run.

The offline audit is complete. Launch acceptance and implementation are outside this audit.
