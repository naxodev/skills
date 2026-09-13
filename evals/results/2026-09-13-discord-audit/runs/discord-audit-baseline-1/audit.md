# Offline Discord community audit

## Verdict and scope

**The snapshot does not establish launch readiness.** It records three configuration failures: the interest role has `Manage Roles`, announcements allow member messages, and the support forum has no required tags. Fixing these would still leave member verification and operational controls untested.

- **Mode:** audit only. No server changes are authorized or were made.
- **Server evidence:** only `snapshot.md`, lines 1–20. This is a fictional, incomplete configuration record, not a live inspection.
- **Audit criteria:** the workspace-local `skills/discord-community-server/SKILL.md`, `REFERENCE.md`, `OPERATIONS.md`, `VERIFICATION.md`, and `STATE-TEMPLATE.md`.
- **Execution:** offline document review. No live services, browser, account access, other skills, delegation, or outside-workspace files were used.
- **Output:** only `audit.md` was created. Supplied input files were left unchanged.
- **Verification limit:** exact current Discord labels, capabilities, and permission behavior remain unverified. Recommendations describe local reference requirements, not confirmed current UI instructions.

The state template was used as a gap checklist. This report records the available state and unknowns; it does not invent an approved operating plan or a private operational roster.

## Recorded state

| Area | Snapshot evidence | Limit |
| --- | --- | --- |
| Audience | 20 invited beta users and two maintainers (line 3) | Future launch policy, response commitments, and moderator assignments are unknown. |
| Product surfaces | Command execution and build previews (line 4) | No package map or other product surfaces are supplied. |
| Community | Enabled (line 9) | Reason for enabling it and feature configuration are unknown. |
| Channels | General, announcements, support, and staff exist (line 10); support is a forum (line 12) | Other channel types, categories, overrides, and additional channels are unknown. |
| Staff visibility | Baseline role preview hides staff channels (line 14) | Does not prove conduct, opt-in, multi-role, or real-member boundaries. |
| Testing | No fresh human test account; Onboarding, Rules Screening, and voice not tested (lines 15–16) | Member testing cannot be completed in this audit. |
| Integrations | None approved (line 17) | This does not establish that none are installed or can read data. |
| Sensitive material | No invite or credential included (line 17) | Does not prove historical handling, revocation, or absence elsewhere. |

### Durable destinations

| Workflow | Recorded destination | Gap |
| --- | --- | --- |
| Support and bugs | Issue tracker (line 4) | Exact destination, published instructions, link behavior, and handoff are untested. Preserve this product-specific routing. |
| Security | Project's private security-reporting form (line 5) | Link, confidentiality, ownership, and use without Discord access are untested. |
| Conduct | Human owner (line 5) | A recipient is named by role, but no durable private intake or case system, recusal backup, appeal owner, or external access path is documented. |
| Product feedback | Not recorded | Name one durable destination and explain when support discussion becomes tracked work. |
| Product decisions | Not recorded | Name the authoritative decision record or tracker. |
| Releases | Not recorded | Name the release page or changelog if releases are part of the plan. |

## Findings and recommended priorities

These are proposals for later human approval, not an authorized change plan.

### F1 — High: interest role has a privileged permission

**Evidence:** `snapshot.md:13` records `Manage Roles` on the interest role.

**Requirement:** `REFERENCE.md`, Role model, and `VERIFICATION.md`, interest-role check, require interest roles to grant only product access or notifications, with no privileged permissions.

**Impact:** a personalization role carries role-management authority. The reachable roles and effective scope are unknown because hierarchy and overrides were not supplied. It is not established that Onboarding assigns this role.

**Recommendation:** remove the privileged permission through a separately approved change. Review all interest roles, role hierarchy, assignment paths, and combined-role access. Keep administrative authority on explicit operational roles; do not use `Administrator`.

**Closure evidence needed:** role preview of definitions and combinations, followed by a fresh member check that members cannot manage roles or webhooks. If Onboarding assigns the interest role, verify that path too.

### F2 — Medium: announcements are writable by members

**Evidence:** `snapshot.md:11` records that announcements allow member messages.

**Requirement:** `REFERENCE.md`, Permission rules, requires announcements to be read-only for members.

**Impact:** member messages can interrupt the authoritative announcement surface.

**Recommendation:** make announcements read-only for members, with posting limited to approved operational roles. Review effective channel and category permissions.

**Closure evidence needed:** a fresh member cannot send messages, reply in existing threads, create public or private threads, create polls, or create invites in the read-only surface. The snapshot establishes the message-permission failure only; it says nothing about the other actions.

### F3 — Medium: support forum does not require a routing tag

**Evidence:** `snapshot.md:12` records no required tags.

**Requirement:** `OPERATIONS.md`, Make forum state trustworthy, requires at least one member-selectable purpose, package, or domain tag before post creation. Workflow-state tags must be moderator-only.

**Impact:** support posts can omit the product context needed for routing.

**Recommendation:** require a tag using the known surfaces, **Command execution** and **Build previews**, as candidate domain tags. Keep any workflow states, such as Resolved, moderator-only. Existing tags and state permissions are unknown; do not assume they are absent or misconfigured.

**Closure evidence needed:** a participant cannot create an untagged post, can choose a domain tag, and cannot apply workflow-state tags. Staff can advance the state and link the issue tracker. Remove synthetic test content after verification.

### G1 — High-priority evidence gap: safety and recovery controls

No evidence covers owner MFA, moderator MFA, verification level, minimum-age policy, raid protection, explicit-content filtering, direct-message safety, or AutoMod. No successor, recovery operator, moderation lead, conduct recusal backup, or appeal owner is recorded. Their absence from the snapshot is not proof that they are missing on the server.

Before readiness sign-off, obtain non-secret configuration evidence and human attestations. AutoMod should cover mention spam, suspected spam, abusive language, credential-like strings, and unwanted external Discord invites. Non-credential alerts should go privately to moderators. Credential matches should be blocked without copying matched content into alerts, and the sender should receive a revocation warning. Test only synthetic values and avoid rules that block ordinary technical discussion.

### G2 — High-priority evidence gap: access and invite boundaries

The baseline staff preview is narrow positive evidence. Role inventory, `Administrator` grants, hierarchy, category inheritance, exceptions, per-user overrides, member-created invites, conduct access, and multi-role combinations are unknown.

The invited beta audience does not establish a confidential cohort category. If such a program exists, verify explicit `@everyone` visibility denial, a low-privilege access role, read-only orientation, and a separate private feedback path. Confidential access and relationship roles must not be self-assigned through interest questions. Preserve a public feedback path when it serves a separate audience.

Invite approval, expiry, use limits, temporary membership, role assignment availability, existing-member behavior, and revocation are not recorded. Any later test invite requires explicit approval and human-only UI, generation, copying, and handling. Record only non-secret attestations. No invite should be created for this audit.

### G3 — Readiness evidence gap: orientation and participation

Community is enabled, so Rules Screening, Onboarding, and Server Guide checks are applicable. None can be marked passed from this snapshot. Default channels, required question answers, three concrete starter tasks, interest assignments, and opt-in boundaries need evidence.

Check for a welcome that names the two product surfaces and explains durable routing. The support template should request versions, runtime, expected and observed behavior, a sanitized reproduction, and prior attempts. It should prohibit credentials, customer data, and private logs, and redirect security reports to the private form.

For Server Guide external links, use read-only backing resources and verify rendered links. Keep confidential cohort resources out of the global guide. Resource existence and content are unknown.

### G4 — Operational evidence gap: integrations, assets, events, and state

No integrations are approved. Inventory any existing apps, bots, and webhooks before declaring their data access safe or absent. Each needs a clear workflow, named human owner, minimum permissions, data boundary, retention/deletion review, and removal path. Reject apps requiring `Administrator`. A later approved release notification should use only intended release events and actions, with human-only webhook handling.

Brand sources, managed asset storage, raster/vector preservation, asset review, recurring events, hosts, and cadence are not recorded. These are conditional checks, not grounds to add channels or events. If assets or events exist, verify provenance, rendering, full-series changes, and live crops before claiming completion.

The operating plan, Community rationale, invite policy, permission owners, review date, and residual-risk acceptance are also unknown. A later private state record should name operational owners and unresolved actions without credentials or invite URLs.

## Channel-job review

The four recorded channels are a reasonable small starting structure for this audience. Traffic and configuration evidence are insufficient to judge channel sprawl or completeness.

| Existing surface | Proposed job to confirm | Check needed |
| --- | --- | --- |
| General | Conversation and introductions | Confirm member defaults and noise level. |
| Announcements | Curated official updates | Resolve F2; check separation from any future automated releases. |
| Support forum | Diagnose command execution and build preview problems; hand off to the issue tracker | Resolve F3; inspect guidelines and durable links. |
| Staff | Operational coordination | Extend baseline preview to real members and role combinations; keep conduct intake narrower than general staff access. |

Welcome, rules, feedback, events, voice, and releases should be mapped to real jobs in the operating plan. Missing snapshot evidence does not justify creating a channel for every checklist item.

## Verification matrix

This covers each check in the local `VERIFICATION.md`, in its original section order.

**Status meanings:**

- **Passed (snapshot):** the supplied observation supports only the stated scope; no new test was run.
- **Failed (snapshot):** a recorded configuration contradicts a required invariant. Runtime reproduction remains untested.
- **Untested:** no adequate evidence. Conditional checks remain untested until applicability is known.
- **Not applicable:** a known prerequisite excludes the check.

**Methods:** RP = role preview; RM = real member; HA = human attestation. These identify the required evidence source, not actions performed during this audit. Each untested row states its readiness impact.

### Member view

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Fresh account joins using a short-lived, single-use invite handled outside automation | HA | Untested | No fresh account is available; join path and invite handling cannot be certified. |
| Consumed invite rejects second use | HA | Untested | Invite use-limit enforcement is unknown. |
| Staff and conduct channels invisible | RP | Untested | Staff portion passed in baseline preview (`snapshot.md:14`); conduct portion unknown, so the full check is not passed. |
| Unselected opt-in channels invisible | RP | Untested | Opt-in privacy is unknown. |
| Baseline member cannot see private category, start, or feedback surface | RM | Untested | Private cohort existence and isolation are unknown. |
| Cohort role reveals intended start and feedback surfaces | RM | Untested | Cohort applicability and access are unknown. |
| Read-only surfaces reject messages, thread replies/creation, polls, and invites | RM | Failed (snapshot) | Announcements allow messages (line 11). Other actions and member behavior are untested. |
| Default member cannot create invites anywhere when disabled by plan | RM | Untested | Policy and server-wide enforcement are unknown. |
| Members cannot manage roles or webhooks | RM | Untested | F1 shows an unsafe role; holders and effective member capabilities are unknown. |
| Default channels useful and quiet | RM | Untested | New-member usability is unknown. |
| Forum tags and guidelines visible | RM | Untested | Post guidance and tag visibility are unknown. |
| Voice and opt-in boundaries work | RM | Untested | Explicitly not tested (line 16); participation boundaries unknown. |
| Every published durable-route link opens the intended destination safely | RM | Untested | No links supplied; routing accessibility and destinations unverified. |

### Onboarding

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Community enabled as prerequisite for planned Community features | HA | Passed (snapshot) | Enabled (line 9); does not establish feature configuration or behavior. |
| Rules Screening appears for new member | RM | Untested | Explicitly not tested; rules acceptance flow unknown. |
| Required questions have valid answers | RM | Untested | Joining may be blocked or misleading; questions unknown. |
| Interest answers grant only intended non-confidential, non-relationship roles/channels | RM | Untested | Assignment flow unknown; F1 must be resolved if the interest role is assigned. |
| Starter tasks reach accessible destinations | RM | Untested | Three concrete usable tasks are not evidenced. |
| Server Guide has no dead resources | RM | Untested | Orientation resources and availability unknown. |
| Canonical links render from read-only backing resources | RM | Untested | Rendering, links, and read-only boundaries unknown. |
| Global guide exposes no confidential cohort content | RP | Untested | Guide and cohort applicability unknown; confidentiality unproven. |
| Community-disabled checks marked not applicable | RP | Not applicable | Community is enabled. |
| Community-disabled text fallbacks cover planned jobs | RM | Not applicable | Community is enabled. |

### Cohort access

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| First new invite user receives only cohort-access role when assignment is available | RM | Untested | Cohort plan and current role-assignment capability unknown. |
| Existing-member role checked and manually assigned if absent | HA | Untested | Existing-member access cannot be assumed. |
| Manual role assignment when invite assignment unavailable | HA | Untested | Fallback ownership and execution unknown. |

### Admin

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Admin has only approved explicit permissions, never Administrator | RP | Untested | Plan and Admin permissions unknown; privilege boundary unproven. |
| Admin performs approved recovery/configuration | HA | Untested | Operational recovery capability unknown. |
| Admin cannot transfer ownership or reach unrelated private work | RP | Untested | Ownership and unrelated-data boundaries unproven. |

### Moderator

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Synthetic non-credential match reaches private moderation channel | HA | Untested | Alert delivery and privacy unknown. |
| Synthetic credential blocked, warning shown, content absent from alerts | HA | Untested | Secret-blocking behavior and non-copying guarantee unproven. |
| Moderators can perform intended safety actions | HA | Untested | Enforcement capability unknown. |
| Moderators cannot configure integrations or unrelated roles | RP | Untested | Moderation privilege boundary unknown. |
| Audit events identify actor | HA | Untested | Action accountability unknown. |
| Conduct recusal and backup path exists | HA | Untested | Owner is the recorded recipient; independent handling is not evidenced. |

### Maintainer, contributor, partner, and interest roles

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Maintainers guide without unrelated bans, integrations, or configuration | RP | Untested | Two maintainers exist, but their permissions and separate approvals are unknown. |
| Contributors/partners reach only explicit collaboration areas | RP | Untested | Role existence and boundaries unknown. |
| Interest roles grant only intended product access/notifications, no privilege | RP | Failed (snapshot) | Manage Roles is recorded (line 13); F1. |

### Role combinations and bots

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Multi-role combinations preserve approved visibility union | RP | Untested | Baseline staff preview does not cover combined roles. |
| Cohort/relationship roles read-only in private start; operators can post/pin | RP | Untested | Program existence and combined write permissions unknown. |
| Bots have minimum permissions, correct hierarchy, no Administrator | RP | Untested | No approval does not prove no bots exist. |
| Role-assigning bot limited to approved lower roles | HA | Untested | Bot inventory and role-assignment scope unknown. |

### Forum workflow

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Every feedback-like forum requires a member-selectable domain/purpose/package tag | RM | Failed (snapshot) | Support has no required tags (line 12); F3. Other forums and runtime enforcement unknown. |
| Participants cannot apply workflow-state tags | RM | Untested | State tags and permissions unknown; workflow integrity unproven. |
| Staff advance states and link durable work | HA | Untested | Issue tracker is named, but handoff lifecycle is unverified. |
| Security details use private route, not forums | HA | Untested | Intended private form is recorded; actual handling unverified. |
| End-to-end test content removed | HA | Untested | No lifecycle test ran; cleanup must be checked after any later test. |

### Integrations

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Integrations access only intended channels | RP | Untested | Installed inventory and community-data access unknown. |
| Release notifications fire only for intended events/actions | HA | Untested | Release integration existence and filters unknown. |
| Test messages and temporary webhooks removed | HA | Untested | No integration test ran; historical state unknown. |
| Webhook handling outside automation; no credentials in retained outputs | HA | Untested | Snapshot contains none; broader handling cannot be attested. |
| Private state names integration owner and removal path | HA | Untested | Operational state and installed integration owners unknown. |

No integration installation or test is part of this audit. If a later inventory confirms none exist, integration and bot checks can be marked not applicable with that evidence.

### Recovery

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Owner MFA and recovery material held outside automation | HA | Untested | Account recovery protection unknown; attest without exposing material. |
| Second human can recover operations | HA | Untested | Successor and recovery capability unknown. |
| No shared account exists | HA | Untested | Account ownership model unverified. |
| Backup Admin can manage required bot roles | RP | Untested | Backup, bots, and hierarchy unknown. |
| Conduct and security routes work without Discord access | HA | Untested | Reporting during account loss or exclusion is unproven. |

### Assets and events

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Assets derive from current brand and were individually reviewed | HA | Untested | Asset existence/provenance unknown; conditional branding readiness gap. |
| Approved rasters/native SVGs preserved in managed store | HA | Untested | Preservation and shared ownership unknown. |
| SVGs contain no embedded/external resources; rendered parity checked | HA | Untested | SVG applicability and fidelity unknown. |
| Live-product visuals reuse implementation or rendered still | HA | Untested | Visual applicability and accuracy unknown. |
| Recurring artwork/updates cover full series and live crops | HA | Untested | Event applicability and presentation unknown. |

### Launch

| Check | Method | Status | Evidence or untested impact |
| --- | --- | --- | --- |
| Seed content/templates cover approved community jobs | RM | Untested | Approved plan and content absent from snapshot; participation readiness unknown. |
| First recurring event has host | HA | Untested | Event plan and host unknown; conditional event readiness gap. |
| Every invite explicitly approved, expiring, and use-bounded | HA | Untested | Invited users do not establish invite controls. |
| Invite/manual assignment grants only low-privilege cohort access | HA | Untested | Assignment plan and behavior unknown. |
| Temporary membership disabled for persistent participants | HA | Untested | Membership persistence setting unknown. |
| Existing-member role behavior verified; completed cohort invites revoked | HA | Untested | Access correctness and lingering invite exposure unknown. |
| Human alone opened/configured/generated/copied invites | HA | Untested | No invite included; historical handling unknown. |
| Review scheduled after first cohort joins | HA | Untested | Beta users are already present; no review date is recorded. |

## Human follow-up and handoff

1. **Owner:** review F1–F3 and separately approve any remediation. Check current official Discord documentation before relying on exact UI labels or capabilities.
2. **Owner:** name a successor, configuration operator, moderation lead, conduct recusal backup, and appeal owner. Two maintainers are recorded; their operational role assignments are unknown. Admin, Moderator, backup Admin, and any cohort-access roles still need assignment confirmation, not presumed new members.
3. **Owner and maintainers:** confirm the small operating plan, durable routes, external conduct intake, response expectations, and private-program applicability.
4. **Authorized human operator:** supply non-secret role, override, safety, invite-policy, and integration inventory evidence. Use attestations for identity, recovery, and credential handling.
5. **Human tester, after separate approval and remediation:** use a fresh non-privileged account to test joining, Rules Screening, Onboarding, posting, tags, invite restrictions, links, and voice. Include relevant role combinations and any private feedback lifecycle. Keep invite URLs outside automation and verify single-use consumption.
6. **Owner:** record unresolved risks and an explicit readiness decision after reviewing evidence. This audit grants no launch or integration approval.

**Review timing:** review the known failures before expanding beta access. Re-audit after approved fixes and fresh-member testing. Since 20 beta users have already joined, schedule the first cohort review now; the owner must set the exact date. Review again after material role, integration, or onboarding changes.

**What changed:** only this audit document was created; no server changes occurred.

**What was verified:** the report was checked against the supplied snapshot and local criteria. The snapshot supports three configuration failures, Community being enabled, and staff being hidden in baseline role preview. No new role preview, real-member test, or human attestation was obtained.

**What remains untested:** every matrix item marked untested, all runtime behavior, current platform labels/capabilities, and conditional features whose existence is unknown. Integration data access remains unknown despite the absence of approvals.

**Local checks:** no project type-check or lint configuration is supplied in this document-only workspace. No type-check, lint, or runtime tests were run. This is an offline evidence audit, not a verified server launch.
