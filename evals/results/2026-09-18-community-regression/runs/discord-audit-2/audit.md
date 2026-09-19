# Fictional Discord server audit

## Verdict and scope

**Three configuration failures are recorded below. Live behavior and launch readiness remain unverified.** No server changes were authorized or made. All corrections are proposals, not applied changes.

- **Mode:** Offline audit, limited to steps A1–A3 of the supplied local skill.
- **Audit date:** 2026-09-18. **Snapshot date:** Unknown.
- **Server evidence:** Only `snapshot.md`, cited by line below. Local skill files provide assessment criteria, not additional server evidence.
- **Criteria:** `skills/discord-community-server/SKILL.md`, `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md`.
- **Limits:** No browser, account, or fresh human test account is available. No live services were used. Exact current Discord labels and permission behavior were not checked against live official documentation.

The community has 20 invited beta users and two maintainers. Its product surfaces are **command execution** and **build previews**. Support and bugs belong in the **issue tracker**. Security reports belong in the **project's private security-reporting form**. Conduct reports go to the **human owner** (`snapshot.md:3–5`). These are supplied routing decisions; their implementation and destinations were not tested.

### Evidence classification

Recorded configuration is accepted as supplied evidence, not as a new UI inspection or behavioral test. The sole recorded **role-preview** result concerns baseline-member staff visibility. **Real-member** checks are unavailable. **Human-attestation** checks require explicit supporting evidence; this snapshot does not establish them merely by naming a setting or route. Unknowns below are evidence gaps, not additional failures.

## Findings

### F1 — High: The interest role has a privileged permission

**Evidence:** The interest role has `Manage Roles` (`snapshot.md:13`). This is a supplied configuration failure against the interest-role boundary in `REFERENCE.md`, Role model, and `VERIFICATION.md`, interest roles.

**Impact and priority:** A personalization role carries role-management authority. This is the highest-priority correction because it breaks least privilege even in a small beta community. The role's holders, assignment path, hierarchy, and effective reach are unknown; the snapshot does not prove exploitation or unrestricted role management.

**Proposed correction — not applied:** Remove `Manage Roles` and any other privileged permissions from the interest role. Limit it to intended product channels or notifications for command execution and build previews. Keep operational permissions in explicitly assigned staff roles, without granting `Administrator`.

**Verification:** Use **role preview** to inspect the interest role and relevant role combinations for non-privileged access. Use a **real member** with the baseline and interest roles to confirm that role and webhook management are unavailable. If Onboarding assigns the role, test that its answers grant only intended roles and channels. None of these follow-up checks ran.

### F2 — Medium: Members can post in announcements

**Evidence:** Announcements allow member messages (`snapshot.md:11`). This violates the read-only announcement control in `REFERENCE.md`, Permission rules.

**Impact and priority:** Member posts can obscure or appear alongside official updates. For 20 beta users this is a bounded communication-integrity issue, below the privileged-role failure.

**Proposed correction — not applied:** Make announcements read-only for members while allowing approved maintainers or operational roles to publish. Review effective permissions and overrides so thread replies, thread creation, polls, and invite creation do not bypass the intended read-only boundary.

**Verification:** Use **role preview** to inspect the static permission shape, including combined roles. Use a **real member** to confirm rejection of messages, existing-thread replies, public/private thread creation, polls, and invite creation. Confirm approved publishers retain their intended access. Only message permission is established as a failure; the other actions are untested.

### F3 — Medium: The support forum does not require tags

**Evidence:** The support forum has no required tags (`snapshot.md:12`). This violates `OPERATIONS.md`, Make forum state trustworthy. The evidence does not establish that all tags are absent or that members can apply workflow-state tags.

**Impact and priority:** Untagged posts make routing between command execution and build previews less reliable and increase triage work for two maintainers. This is a workflow issue rather than demonstrated data exposure.

**Proposed correction — not applied:** Require at least one member-selectable product-surface tag, using **command execution** and **build previews** where suitable. Keep workflow-state tags moderator-only. Retain the issue tracker as the destination for support and bugs; forum discussion should link the durable record. Guidelines should request versions, runtime, expected and observed results, and a sanitized reproduction. Redirect security details to the private security-reporting form and conduct reports to the human owner.

**Verification:** A **real member** should see tags and guidelines, fail to create an untagged post, succeed with a product-surface tag, and be unable to apply moderator-only states. Obtain **human attestation** that staff can advance any planned states, link issue-tracker work, route security details privately, and remove test content. This lifecycle is untested.

## Healthy observations and their limits

- **Community is enabled** (`snapshot.md:9`). The supplied prerequisite is present; this does not establish working Onboarding, Rules Screening, or Server Guide resources.
- **General, announcements, support, and staff channels exist** (`snapshot.md:10`). Their presence alone does not establish useful defaults, complete orientation, or safe permissions.
- **Baseline role preview hides staff channels** (`snapshot.md:14`). This is a recorded pass for that narrow static check. It does not prove conduct-channel isolation, combined-role safety, or fresh-member access boundaries.
- **Durable routes are named** (`snapshot.md:4–5`). Link access and use remain unverified. The human owner is the conduct contact; an independent conduct record and recusal route are unknown.
- **No integrations were approved**, and no invite or credential is included (`snapshot.md:17`). This does not prove that no integrations are installed or that historical handling was safe.

## Coverage gaps and verification limits

These grouped notes cover the remaining applicable local controls. No missing evidence is treated as a failed setting.

| Control scope | Status and missing evidence | Needed verification class |
| --- | --- | --- |
| Role and category boundaries | **Unknown:** Full role inventory, holders, hierarchy, explicit Admin permissions, absence of `Administrator`, moderator/maintainer separation, contributor/partner access, channel overrides, category inheritance, per-user exceptions, conduct isolation, opt-in visibility, multi-role effects, and backup Admin reach. The recorded staff preview and F1 cover only their stated scope. | Role preview; human attestation for approved staff actions and recovery. |
| Member experience | **Untested:** Useful default channels, read-only surfaces beyond the observed announcement failure, member webhook management, server-wide invite restrictions, published route links, templates, seed content, and accessible starter tasks. Missing channels or templates cannot be inferred from the short inventory. | Real member; role preview for static boundaries. |
| Community onboarding and voice | **Untested:** Onboarding, Rules Screening, and voice are explicitly untested (`snapshot.md:16`). Required answers, interest assignment, three starter tasks, opt-in boundaries, and Server Guide resources/backing-channel links are unverified. Guide existence and confidential-resource exposure are unknown. Community-disabled fallbacks are **not applicable** because Community is enabled. | Real member; role preview for global-resource confidentiality. |
| Moderation and safety | **Unknown:** Verification level, minimum-age policy, moderator MFA, raid protection, explicit-content filtering, direct-message safety, audit logs, enforcement, escalation, and appeal ownership. AutoMod coverage for mention spam, suspected spam, abuse, credentials, and external invites is unknown. Private non-credential alerts and credential blocking without copying matches to alerts are unverified. | Human attestation, including synthetic moderation checks; role preview for alert-channel privacy. |
| Ownership, recovery, and conduct | **Unknown:** Named operational owner and successor, staff role assignments, owner MFA/recovery, absence of shared accounts, second-human recovery, conduct recusal/backup, and conduct/security access without Discord. Two maintainers do not establish coverage, availability, or a response commitment. | Human attestation; role preview for recovery hierarchy. |
| Forums and durable work | **Unknown beyond F3:** Tag inventory and state permissions, guidelines and sanitation rules, actual issue-tracker handoff, and staff lifecycle. Feedback, product-decision, release, and documentation destinations are not supplied. Routes named in the snapshot must be preserved. | Real member for posting and links; human attestation for staff workflow and private routing. |
| Private cohorts and invites | **Applicability unknown:** Invited beta users do not establish a separate confidential cohort. Private-category isolation, role-gated start/feedback areas, relationship-role boundaries, public/private feedback separation, and persistent access require evidence if such areas exist. Invite approval, expiry/use limits, second-use rejection, temporary membership, role-assignment capability/manual fallback, new/existing-member behavior, revocation, and human-only handling are unknown. | Role preview for static access; real member for cohort access/new-member assignment; human attestation for invite settings, handling, and fallback. Never collect invite URLs. |
| Integrations and releases | **Inventory unknown:** No approval is recorded, but absence of installed apps is not verified. For any installed integration, workflow need, native alternatives, permissions, data access/retention/deletion, export, operator, incident owner, and removal path need evidence. Release-event filtering, separate read-only feeds, credential handling, and synthetic-test cleanup are unverified. Installation and webhook setup are outside this audit. | Role preview for access; human attestation for inventory, provider state, ownership, and secret-safe handling. |
| Assets, events, and review cadence | **Existence/applicability unknown:** Canonical brand sources, managed asset storage, approved raster/vector files, SVG safety/parity, real-product visuals, event cadence/timezone, host/backup, series-wide artwork/crop verification, and durable event outcomes are not supplied. Review scheduling and staff workload are unknown. Channel reordering is **not applicable** to this read-only audit. | Human attestation if assets/events exist. |

## Handoff

**Completed:** Offline assessment and this report. Only `audit.md` was created; supplied input files were left unchanged. No live tests, invitations, app installations, or server changes occurred.

**Verified from supplied evidence:** The three configuration failures, Community's recorded enabled state, the channel inventory, and the narrow recorded staff-visibility preview. These are snapshot conclusions, not current live-server verification.

**Remaining human work:** If implementation is later authorized, address F1 first, then F2 and F3. Obtain redacted configuration evidence for the unknown controls and run the specified checks when a fresh human-operated member account is available. A human must manage any test invite outside automation. Determine which staff roles need holders and whether any integration can access community data; neither is established here.

Review after authorized corrections and member testing, and when unanswered posts, repeated redirects, or staff load expose a need. No recurring commitment or review date is evidenced. This audit does not grant launch acceptance or require additional server activity to be complete.

No project type-check or lint configuration is supplied in this document-only workspace; neither check was run.
