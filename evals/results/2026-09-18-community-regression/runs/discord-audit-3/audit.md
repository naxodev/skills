# Fictional Discord server audit

## Scope and evidence

**Result:** Three configuration failures are recorded. This offline audit does not establish launch readiness.

- **Mode:** Audit only, following steps A1–A3 of the workspace's `skills/discord-community-server/SKILL.md`.
- **Audit date:** 2026-09-18. **Snapshot date:** Unknown.
- **Sole server evidence:** `snapshot.md`, lines 3–20. The fictional community has 20 invited beta users and two maintainers.
- **Assessment criteria:** The local `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md` alongside that skill. These define controls; they provide no additional server evidence.
- **Limits:** Browser, account access, and a fresh human test account are unavailable. No live services were used. Exact-current Discord labels and permission behavior remain unverified.

Recorded configuration is accepted as supplied evidence, not independent live verification or human attestation. The staff-visibility observation is explicitly a recorded **role preview**. No **real-member** test or new **human attestation** was performed. Verification methods below describe future evidence needed, not completed tests or authorized actions.

Product terms are **command execution** and **build previews**. Support and bugs belong in the **issue tracker**. Security reports belong in the project's **private security-reporting form**. Conduct reports go to the **human owner** (`snapshot.md:4–5`). Specific destinations and their accessibility are not supplied.

## Findings

### F1 — High: The interest role has privileged role-management access

**Evidence:** `snapshot.md:13` records that the interest role has `Manage Roles`. This fails the interest-role boundary in `REFERENCE.md:13` and `VERIFICATION.md:64`. The source records configuration, not a member exercising the permission.

**Impact and priority:** An interest role should only personalize product access or notifications. Role-management authority creates an unnecessary access-control risk, even in a small beta. The hierarchy, role holders, assignment path, and exact reachable roles are unknown; full administrative control is not established.

**Proposed correction — not applied:** Remove `Manage Roles` from the interest role and review its remaining permissions. Limit it to intended command execution or build previews channels and notifications. Keep necessary role management with explicitly authorized operational roles, without `Administrator`.

**Verification:** Use **role preview** to review the interest role, hierarchy, channel overrides, and relevant role combinations for privileged or confidential access. Use a fresh **real member** with baseline and interest roles to confirm that role and webhook management are unavailable. If Onboarding assigns this role, verify that interest answers grant only intended roles and channels.

### F2 — Medium: Members can post in announcements

**Evidence:** `snapshot.md:11` records that announcements allow member messages. This violates the read-only requirement in `REFERENCE.md:26`. Actual posting was not tested.

**Impact and priority:** Member posts can obscure or confuse official beta updates. With 20 users, a focused permissions correction is more proportionate than adding moderation tooling.

**Proposed correction — not applied:** Make announcements read-only for ordinary members while allowing approved staff to publish. Review role and channel overrides together, including thread, poll, and invite permissions.

**Verification:** Use **role preview** to inspect effective permissions for baseline, interest, and relevant combined roles. Use a fresh **real member** to confirm rejection of messages, existing-thread replies, public and private thread creation, polls, and invite creation. Obtain **human attestation** that approved staff can publish.

### F3 — Medium: The support forum does not require tags

**Evidence:** `snapshot.md:12` records no required support-forum tags. This fails `OPERATIONS.md:28,33` and the forum check in `VERIFICATION.md:75`. It does not establish whether optional tags or moderator-only workflow tags exist.

**Impact and priority:** Untagged posts reduce routing context for two maintainers supporting two product surfaces. This is a workflow-quality failure, with lower immediate access risk than F1.

**Proposed correction — not applied:** Require at least one member-selectable product or purpose tag. Use **command execution** and **build previews** where they fit the existing taxonomy. Keep workflow-state tags moderator-only. Guidelines should request versions, runtime, expected and observed behavior, and a sanitized reproduction. Preserve the issue tracker as the destination for support and bugs, the private security-reporting form for vulnerabilities, and the human owner for conduct reports.

**Verification:** With a fresh **real member**, confirm that an untagged post is rejected, a suitable product-tagged post is accepted, guidelines are visible, and workflow-state tags cannot be applied. Obtain **human attestation** that staff can advance any planned workflow states, link durable work, route security details privately, and remove synthetic test content.

## Healthy observations and their limits

- Community is recorded as enabled (`snapshot.md:9`). This supports the stated prerequisite for the support forum. It does not prove that Onboarding, Rules Screening, or Server Guide works.
- General, announcements, support, and staff channels exist (`snapshot.md:10`). Their existence alone does not establish useful defaults or correct routing.
- Recorded **role preview** hides staff channels from the baseline member (`snapshot.md:14`). This is positive evidence for that static view only. It does not prove conduct-channel isolation, other role combinations, or fresh-member behavior.
- The snapshot identifies reporting destinations (`snapshot.md:4–5`) and contains no invite or credential (`snapshot.md:17`). This does not verify live routing or historical credential handling.

## Gaps and unavailable verification

Missing evidence below is **unknown or untested**, not an observed insecure setting. Findings F1–F3 retain their separate failure status.

| Coverage | Status and evidence limit | Evidence needed later |
| --- | --- | --- |
| Access and role boundaries | Apart from F1–F2 and the baseline staff preview, role definitions, hierarchy, `Administrator` absence, overrides, category inheritance, per-user exceptions, conduct isolation, opt-in visibility, multi-role access, and member invite/webhook permissions are unknown. Two maintainers are reported, but role assignments are not. | **Role preview** for static boundaries; **real member** for effective restrictions; **human attestation** for approved administrative recovery actions. |
| New-member experience | Onboarding, Rules Screening, and voice are explicitly untested (`snapshot.md:15–16`). Default-channel usefulness, required answers, role grants, starter tasks, seed templates, Server Guide resources, backing-channel permissions, and durable links are also untested. | **Real member** for joining and interaction; **role preview** for confidential-resource visibility. Community-disabled fallbacks are **not applicable**, because Community is recorded as enabled. |
| Safety and moderation | Verification level, minimum-age policy, moderator MFA, raid protection, explicit-content filtering, DM safety, audit attribution, enforcement, and AutoMod are unknown. Coverage includes mention spam, suspected spam, abusive language, external invites, and credential-like strings. Private non-credential alerts and credential blocking without alert copies are unverified. | Settings evidence and **human attestation**, including synthetic moderation tests and confirmation of the credential revocation warning. No such tests ran. |
| Ownership, durable routing, and staffing | The conduct recipient is a human owner. Owner identity, successor, recovery access, MFA, absence of shared accounts, conduct recusal/backup, and an off-Discord conduct case route are unknown. Reporting-link operation, feedback/decision/release destinations, response commitments, moderator coverage, and staff availability are unspecified. | **Human attestation** for ownership, recovery, staffing, and off-Discord reporting; **real member** for published links. Two maintainers do not establish an SLA or moderation coverage. |
| Invites and private cohorts | Invited beta membership does not establish a confidential cohort. Invite approval history, expiry, use limits, temporary membership, revocation, human-only handling, and role-assignment capability are unknown. Private categories, start channels, feedback forums, and first-new/existing-member assignment behavior have no evidence. | **Human attestation** for invite settings and handling; **role preview** and **real member** for any confirmed private access and feedback lifecycle. Invite URLs must remain outside automation. |
| Integrations and releases | No integrations were approved (`snapshot.md:17`). Installed integrations and their community-data access are **unknown**; lack of approval does not prove absence or an unauthorized installation. App purpose, native alternatives, permissions, privacy, retention/deletion, export, owner, removal, and incident review have no evidence. Release-event scope and webhook handling are untested. | If integrations exist, **role preview** for access and **human attestation** with redacted provider evidence for ownership, event delivery, credential handling, and cleanup. Installation and webhook creation are outside this audit. |
| Assets, events, and review cadence | No evidence establishes assets, custom emoji, a managed asset store, recurring events, hosts, timezone, series updates, or a scheduled review. Applicability is unknown; these are not required additions for this beta. | If used, **human attestation** for canonical sources, asset review, raster/vector preservation and parity, safe SVGs, live-product visuals, and event-series crop checks. Confirm event ownership and a review trigger from support load or unresolved access checks. |

## Handoff

Only this local report was created. **No server changes were made**, and all corrections remain unapplied. Supplied input files were kept unchanged.

The audit verifies what the snapshot records and identifies conflicts with the local controls. It does not verify the live server, fresh-member behavior, current platform labels, or launch acceptance. No role or integration can be declared fully reviewed from this evidence.

If follow-up is authorized, the human owner should address F1 first, then F2 and F3, and arrange the matching verification. Confirm a successor, moderation coverage, and any unfilled operational roles before assigning duties. Reassess after corrections and fresh-member evidence, or when unanswered posts, redirects, or staff load indicate a need. No launch invite, app, event, or modifying test is required to complete this audit.

**Document check:** Findings were checked against the supplied snapshot and local references. No project type-check or lint configuration is present; neither check was run.
