# Fictional Discord server audit

## Verdict and scope

The snapshot records **three configuration failures**: an interest role has Manage Roles, announcements allow member messages, and the support forum has no required tags. Correct the privileged interest role first. The recorded baseline role preview hides staff channels, but it does not prove fresh-member behavior or safety for other role combinations.

- **Mode:** Audit only, following steps A1–A3 of the local skill.
- **Audit date:** 2026-09-13.
- **Snapshot date:** Unknown.
- **Server evidence:** Only `snapshot.md`, lines 1–20. All server observations below are supplied evidence, not independently verified live state.
- **Control sources:** `skills/discord-community-server/SKILL.md`, `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md` in that same directory.
- **Access limits:** Offline. Browser and account access are unavailable. No fresh human test account is available.
- **Changes:** Only this report was created. No server changes, live-service calls, invites, app installations, or modifying tests were performed. Supplied input files were left unchanged.

Exact-current Discord labels and permission behavior remain unverified. Control names below follow the supplied local references; they are not current UI instructions.

## Community context and durable routes

| Item | Supplied evidence | Limit |
| --- | --- | --- |
| Audience and stage | 20 invited beta users and two maintainers (`snapshot.md:3`) | Future public-launch plans and confidentiality requirements are unknown. Invited beta users do not establish a separate private cohort area. |
| Product surfaces | **command execution** and **build previews** (`snapshot.md:4`) | Product name, package map, and documentation destinations are unknown. |
| Support and bugs | Both belong in the **issue tracker** (`snapshot.md:4`) | Tracker address, published guidance, and routing behavior are unknown. |
| Security reports | The project's **private security-reporting form** (`snapshot.md:5`) | Form reachability and operation without Discord access are untested. |
| Conduct reports | The **human owner** (`snapshot.md:5`) | Contact method, durable private case record, recusal route, and backup are unknown. |
| Community structure | Community enabled; general, announcements, support, and staff channels exist (`snapshot.md:9–10`) | Complete inventory, category inheritance, channel types beyond the support forum, and effective overwrites are unknown. |

The report preserves these routes. It does not replace the issue tracker with Discord support records or invent a security or conduct destination. Feedback, product decisions, releases, response commitments, moderator assignments, and event cadence are not specified.

## Evidence classification

The local verification matrix distinguishes:

- **Role preview:** Static channel visibility and permission shape. It cannot prove onboarding, posting, or other real-member behavior.
- **Real member:** Behavioral checks with a fresh, human-operated, non-privileged account. None were performed or supplied.
- **Human attestation:** Human-only evidence for identity, recovery, invite handling, sensitive operations, and designated workflow checks. No specific attestations for these checks were supplied.

The snapshot's recorded configuration is documentary evidence. Its collection method is unspecified, so it is not relabeled as a completed role preview, real-member test, or human attestation. Only the staff-visibility observation explicitly records a role preview.

**Status convention:** “Failed” below means the supplied configuration contradicts a local control. “Passed, limited” applies only to the recorded preview result. “Untested/unknown” never counts as passed and does not establish an insecure setting.

## Observed failures

### F1 — High: The interest role has Manage Roles

- **Fact and source:** `snapshot.md:13` records Manage Roles on the interest role.
- **Control:** `REFERENCE.md:13,17` and `VERIFICATION.md:60–64` restrict interest roles to intended product channels or notifications, with no privileged permission.
- **Evidence class/status:** Supplied configuration; **failed** against the interest-role control. Effective role hierarchy and live capabilities are untested.
- **Impact and priority:** A personalization role carries role-management authority. This crosses a core access boundary for the beta community. High priority reflects that privilege mismatch; the snapshot does not prove who holds the role, whether it is self-assigned, or which roles it can affect.
- **Proposed correction — not applied:** Remove Manage Roles and any other privileged permissions from the interest role. Restrict it to intended command execution or build previews interests. Keep role administration with explicitly authorized operational roles. Review assignments and hierarchy before changing permissions.
- **Verification method:** **Role preview** should establish that the interest role has no privileged permissions and that relevant role combinations expose only intended areas. A **real-member** check should establish that baseline and interest-role members cannot manage roles or webhooks. If onboarding assigns interests, test that answers grant only intended non-privileged roles and channels. All these follow-up checks remain untested.

### F2 — Medium: Announcements allow member messages

- **Fact and source:** `snapshot.md:11` records member posting in announcements.
- **Control:** `REFERENCE.md:26` and `SKILL.md:131` require announcements to be read-only for members.
- **Evidence class/status:** Supplied configuration; **failed** against the read-only control. No posting test was supplied.
- **Impact and priority:** Member messages can obscure or confuse official updates. Medium priority reflects an observed communication boundary failure in a small beta, without evidence of abuse.
- **Proposed correction — not applied:** Make announcements read-only for normal members, accounting for category permissions, channel overwrites, and combined roles. Allow only approved operational roles to publish official updates.
- **Verification method:** **Role preview** should confirm the static permission shape. A **real member** should be unable to send messages, reply in existing threads, create public or private threads, create polls, or create invites there, as required by `VERIFICATION.md:13`. Verify that the intended publisher still has the required access. All follow-up checks remain untested.

### F3 — Medium: The support forum has no required tags

- **Fact and source:** `snapshot.md:12` records no required tags in the support forum. This does not establish that no tags exist.
- **Control:** `OPERATIONS.md:28–33` and `VERIFICATION.md:75–79` require a member-selectable purpose, package, or domain tag and reserve workflow-state tags for moderators.
- **Evidence class/status:** Supplied configuration; **failed** against required-tag enforcement. Existing tag definitions and moderation restrictions are unknown.
- **Impact and priority:** Untagged posts make command execution and build previews support harder to route for two maintainers. Medium priority reflects that routing cost, not a demonstrated confidentiality breach.
- **Proposed correction — not applied:** Require at least one member-selectable domain tag, using **command execution** and **build previews** where appropriate. Preserve useful existing tags after inventory. Keep any workflow-state tags moderator-only. State that support and bugs belong in the **issue tracker**, security reports in the **private security-reporting form**, and conduct reports with the **human owner**. Ask for versions, runtime, expected and observed results, and a sanitized reproduction.
- **Verification method:** A **real member** should see tags and guidelines, be unable to create an untagged post, be able to select an appropriate domain tag, and be unable to apply moderator-only states. **Human attestation** should confirm staff workflow transitions, durable issue linkage, private security routing, and removal of test content. Route links also need **real-member** destination checks. All follow-up checks remain untested.

## Healthy observations and their limits

| Observation | Source and evidence class | Assessment |
| --- | --- | --- |
| Staff channels are hidden from the baseline member in role preview. | `snapshot.md:14`; supplied **role preview** | **Passed, limited** to that view and those staff channels. Conduct-channel visibility, other roles, combined roles, and fresh-member access are not established. |
| Community is enabled. | `snapshot.md:9`; supplied configuration | Positive prerequisite evidence for the support forum and Community features. It does not verify Rules Screening, Onboarding, Server Guide, or announcement-channel type. |
| The four named channels serve recognizable jobs. | `snapshot.md:10`; supplied configuration | A compact described structure. No complete inventory or member usability check exists. |
| Support, bug, security, and conduct routes are stated. | `snapshot.md:4–5`; supplied project policy | Useful routing intent. Published links and actual handling are untested. |
| No integrations were approved. | `snapshot.md:17`; supplied approval state | No installation is authorized. This does not prove that no apps, bots, or webhooks are installed. |
| The supplied snapshot contains no invite or credential. | `snapshot.md:17` and local inspection of the snapshot | Limited to the supplied document. This is not evidence about server history, logs, or credential handling elsewhere. |

## Unknown and unavailable checks

These are evidence gaps, not additional observed failures. Verification classes identify the future evidence needed under the local matrix. All follow-up activity would require separate authorization and access.

| Area | Status and evidence gap | Required evidence and consequence |
| --- | --- | --- |
| Staff, conduct, and opt-in boundaries | **Untested beyond baseline staff preview.** No conduct-channel or opt-in observations (`snapshot.md:14,19`). | **Role preview** for each relevant role and combination; **real member** for effective sensitive and opt-in access. Isolation cannot be certified. |
| Read-only surfaces and member powers | **Untested beyond F1/F2 configuration facts.** Rules, release feeds, thread/poll permissions, webhook management, and server-wide invite permissions are not described (`snapshot.md:19`). | **Role preview** plus **real-member** read-only and management checks. Member restrictions cannot be certified. |
| Onboarding and Rules Screening | **Explicitly untested** (`snapshot.md:16`); Community is enabled, so these are not dismissed as Community-disabled checks. Questions, interest assignment, and starter tasks are unknown. | **Real member** for rules display, valid answers, role assignment, and accessible starter tasks; **human attestation** for feature prerequisites. The new-member path is unverified. |
| Server Guide | **Unknown configuration and applicability** (`snapshot.md:19`). No resource inventory exists. | If used, **real member** for working resources and rendered external links; **role preview** for absence of confidential cohort content. Orientation and resource privacy remain unverified. |
| Voice and default-channel experience | Voice was **explicitly untested** (`snapshot.md:16`); whether voice exists or is planned is unknown. Default usefulness and noise were not assessed. | **Real member** for opt-in boundaries and default-channel usability. Participation quality is unverified. |
| Forum lifecycle | **Untested beyond F3.** Guidelines, state-tag restrictions, staff transitions, and issue linkage are unknown (`snapshot.md:12,19`). | **Real member** and **human attestation** as specified in F3. Reliable routing and state ownership are unverified. |
| Durable reporting and content | **Known route intent, untested operation** (`snapshot.md:4–5`). Links, seed content, templates, support commitments, and confidential handling are unavailable. | **Real member** for published destinations and usable content; **human attestation** for private security handling and security/conduct access without Discord. Durable conduct recordkeeping and feedback/decision/release routes need clarification. |
| Admin, moderator, maintainer, and other roles | **Unknown**, except the interest role. Two maintainers do not establish their permission sets or moderator staffing (`snapshot.md:3,13,19`). | **Role preview** for explicit permissions, no Administrator, hierarchy, role combinations, and collaboration boundaries; **human attestation** for approved operational actions. Least privilege across the server is unverified. |
| Native safety controls | **Unknown:** verification level, age policy, moderator MFA, raid protection, content filtering, DM safety, AutoMod, alerts, audit logs, and escalation (`snapshot.md:19`). | **Human attestation** of settings and intended moderator actions. Synthetic non-credential alerts should reach private moderation; synthetic credential-like matches should block without copying content to alerts and show a revocation warning. Protection is unverified, not proven absent. |
| Ownership and recovery | The conduct recipient is a human owner, but successor, backup access, owner MFA, recovery readiness, and absence of shared accounts are **unknown** (`snapshot.md:5,19`). | **Human attestation** for ownership/recovery and a conduct recusal/backup path; **role preview** for backup hierarchy. Recovery and independent conduct escalation are unverified. No recovery material should enter the evidence. |
| Invites and beta access | **Unknown historical controls.** The beta users were invited, but approval, expiry, use limits, temporary membership, role assignment, and revocation are not recorded (`snapshot.md:3,17,19`). | **Human attestation** for invite settings and handling, consumed test-invite rejection, and existing-member/manual assignment behavior. **Real member** for first-new-member access-role assignment where supported. No invite interaction belongs in this audit. |
| Separate confidential cohort | **Applicability unknown.** A beta audience alone does not prove a private category, start channel, or feedback forum exists or is needed (`snapshot.md:3,19`). | If present, **role preview** for category and combined-role boundaries; **real member** for baseline denial, cohort visibility, and read-only start-channel behavior. Confidential-cohort isolation cannot be claimed. |
| Apps, bots, and webhooks | Approval is absent; actual installation and data access are **unknown** (`snapshot.md:17,19`). | Establish a non-secret inventory first. If present, **role preview** for scoped access and bot hierarchy; **human attestation** for owners, removal paths, data boundaries, release filters, role assignment, cleanup, and human-only credential handling. No integration is approved by this report. |
| Assets and recurring events | **Applicability unknown.** No brand sources, asset store, event plan, host, or cadence are supplied (`snapshot.md:19`). | If used, **human attestation** for canonical sources, reviewed assets, preserved raster/vector files, vector safety/parity, series-wide updates, live crop review, and host ownership. Their absence from evidence is not a failure. |
| Launch review | **Unknown** review schedule and risk acceptance; no fresh account is available (`snapshot.md:15,19`). | A later review needs **real-member** behavioral results and **human attestation** of applicable launch controls. This audit is not launch acceptance. |

**Not applicable to this audit:** Community-disabled text-channel fallback checks, because Community is recorded as enabled. Installation, asset creation, event changes, channel reordering, invite creation, and launch execution are outside the audit scope. Unspecified features are not assumed absent or marked passed.

## Handoff

1. **Proposed correction order:** Remove interest-role privilege, make announcements read-only, then require appropriate support tags. None is applied or authorized by this report.
2. **Future human actions:** If improvement work is requested, approve an exact change and rollback plan. Provide non-secret configuration evidence and arrange fresh-member testing. Humans must retain all identity, recovery, credential, and invite handling.
3. **Roles needing members:** Unknown. Two maintainers are recorded, but assignment of operational roles, moderators, backup administrators, and a successor is not supplied. Do not assume those positions are vacant or filled.
4. **Integrations that can access community data:** Unknown. “No integrations approved” is not an installed-integration inventory.
5. **Review timing:** Re-audit after approved corrections and before widening beta access. No existing review date is supplied.

**Verification limit:** This report verifies the assessment against the supplied snapshot and local controls. It records three documented configuration failures and one limited staff-visibility preview result. It does not verify current server state, current Discord labels, real-member behavior, human-only operational controls, or launch readiness.

The report was read back for consistency with the evidence. No project type-check or lint configuration is supplied in this audit-only workspace; those checks were not run. No server changes were made. The audit ends at A3.
