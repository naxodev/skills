# Fictional Discord server audit

## Scope and conclusion

- **Mode:** Offline, snapshot-only audit. No server changes were authorized or made.
- **Audit date:** 2026-09-17. **Snapshot date:** Unknown.
- **Server evidence:** `snapshot.md`, lines 1–20, only.
- **Assessment rules:** Local `skills/discord-community-server/SKILL.md` (steps 1 and A1–A3), `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md`.
- **Access limits:** Browser and account access are unavailable. No live services, fresh tests, or current official documentation were used. Exact-current Discord labels and behavior remain unverified.

The snapshot establishes **three configuration failures**: a privileged interest role, writable announcements, and missing required support-forum tags. It also records a successful baseline-member role preview for staff-channel visibility. That preview does not establish fresh-member behavior or safety for other role combinations.

All corrections below are proposals and **have not been applied**. This report completes the audit, not launch acceptance.

## Project context

The community has 20 invited beta users and two maintainers (`snapshot.md:3`). Its product surfaces are **command execution** and **build previews** (`snapshot.md:4`). Community is enabled, and general, announcements, support, and staff channels exist (`snapshot.md:9–10`). This is an invited beta; a future public-launch plan and any confidential cohort boundaries are unknown.

Preserve these supplied reporting routes (`snapshot.md:4–5`):

| Work | Supplied destination | Evidence limit |
| --- | --- | --- |
| Support and bugs | Issue tracker | No destination link or routing test supplied. |
| Security reports | Project's private security-reporting form | Availability, confidentiality, and access without Discord are untested. |
| Conduct reports | Human owner | Contact mechanism, private durable records, recusal, and backup are unknown. |

Product feedback, decisions, release records, documentation links, response commitments, moderation staffing, event cadence, voice needs, billing/account areas, brand sources, and managed asset storage are unknown. Two maintainers are recorded, but their permissions and operational responsibilities are not.

## Evidence classification

Configuration statements are **supplied snapshot evidence**, not independently inspected settings or fresh human attestations. The only supplied test result is a **recorded role preview** (`snapshot.md:14`). No real-member results are available (`snapshot.md:15–16`).

The verification methods below follow the local matrix:

- **Role preview:** Static permission shape and visibility only.
- **Real member:** Behavior exercised by a fresh, human-operated, non-privileged account.
- **Human attestation:** Human-only operations, recovery, credential handling, and checks assigned to humans by the matrix.

Proposed verification is future work requiring separate authorization. No invite creation, posting test, or other modifying test is part of this audit.

## Observed failures

### F1 — High: Interest role grants Manage Roles

**Fact and source:** The interest role has Manage Roles (`snapshot.md:13`). This is a supplied configuration failure against `REFERENCE.md:13` and `VERIFICATION.md:64`, which require interest roles to have no privileged permissions.

**Impact and priority:** Product-interest selection should not carry role-management authority. This is the highest-priority correction because it crosses a privilege boundary in a small beta community. Role holders, hierarchy, self-assignment, and effective escalation paths are unknown; no actual escalation is established.

**Proposed correction — not applied:** Remove Manage Roles from the interest role. Keep interest roles limited to intended product channels or notifications for command execution and build previews. Assign any necessary role-management permission to a separately controlled operational role with explicit scope.

**Future verification:** Use **role preview** to confirm the interest role has no privileged permissions and review relevant role combinations (`VERIFICATION.md:64,68`). Use a **real member** with baseline and interest roles to confirm the member cannot manage roles or webhooks (`VERIFICATION.md:15`). If onboarding assigns interest roles, test that answers grant only intended non-privileged access (`VERIFICATION.md:28`). None of these behavioral checks has passed.

### F2 — Medium: Members can post in announcements

**Fact and source:** Announcements allow member messages (`snapshot.md:11`). This violates the read-only requirement in `REFERENCE.md:26`.

**Impact and priority:** Member posts can obscure authoritative updates and make announcements less reliable for the 20 beta users. This is a confirmed communication-boundary failure, with no evidence of abuse.

**Proposed correction — not applied:** Make announcements read-only for ordinary members, while allowing explicitly authorized staff to publish. Review channel overrides and combined roles so they do not restore member posting.

**Future verification:** Use **role preview** to inspect effective permissions, then a **real member** to confirm rejection of messages, replies in existing threads, public/private thread creation, polls, and invite creation in the read-only channel (`VERIFICATION.md:13`). The supplied evidence establishes message permission only; the other actions are untested.

### F3 — Medium: Support forum does not require tags

**Fact and source:** The support forum has no required tags (`snapshot.md:12`). This violates `OPERATIONS.md:28,33` and the forum requirement in `VERIFICATION.md:75`.

**Impact and priority:** Untagged posts make command execution and build previews harder to distinguish and route. This creates avoidable triage work for two maintainers. The snapshot does not establish whether optional tags or workflow-state tags already exist.

**Proposed correction — not applied:** Require at least one member-selectable product-domain tag, using **command execution** and **build previews** where appropriate. Keep workflow-state tags moderator-only. Keep support and bugs in the issue tracker as the durable destination; forum guidance should direct users there and send security reports to the private security-reporting form. Request versions, runtime, expected and observed results, and a sanitized reproduction.

**Future verification:** A **real member** should see tags and guidelines, fail to create an untagged post, succeed with a domain tag, and be unable to apply moderator-only workflow-state tags (`VERIFICATION.md:17,75–76`). Obtain **human attestation** that staff can apply any planned states, link durable work, route security details privately, and remove test content (`VERIFICATION.md:77–79`). These tests remain unavailable.

## Healthy observations and their limits

| Observation | Source and evidence class | What it establishes |
| --- | --- | --- |
| Community is enabled. | `snapshot.md:9`; supplied configuration | The prerequisite is recorded. It does not verify Rules Screening, Onboarding, Server Guide, or native announcement behavior. |
| General, announcements, support, and staff channels exist. | `snapshot.md:10`; supplied configuration | A small channel structure is recorded. Usability, defaults, and content quality are untested. |
| Staff channels are hidden from the baseline member in role preview. | `snapshot.md:14`; recorded **role preview** | A limited supplied pass for staff visibility. Conduct, opt-in areas, real members, and combined roles remain unverified. |
| Support, bug, security, and conduct destinations are stated. | `snapshot.md:4–5`; supplied project policy | Routing intent is clear. Published links and operational handling are untested. |
| No integrations were approved; no invite or credential is included. | `snapshot.md:17`; supplied statement | Approval status and evidence exclusions only. This does not prove that no integrations are installed or that credentials were always handled safely. |

## Gaps and unavailable checks

Missing evidence is not an insecure-setting finding. Each row below is unknown or untested unless explicitly marked not applicable. Sources identify the snapshot evidence or omission; verification classes describe what future evidence is needed.

| Area | Status and snapshot basis | Required evidence / verification class |
| --- | --- | --- |
| New-member access | **Untested/unavailable:** no fresh human test account (`15`), browser or account access (`19`). | **Real member:** actual baseline visibility, default-channel usefulness, posting, and durable-route links. **Human attestation:** safe test join and rejection of a consumed single-use invite. |
| Rules Screening and Onboarding | **Explicitly untested** (`16`). Community is enabled (`9`), so these are not exempted by disabled Community. Configuration is unknown. | **Real member:** screening appears, required answers work, interest answers grant only intended access, and starter tasks are accessible. |
| Server Guide | **Unknown:** no resource or starter-task evidence (`9–20`). | **Role preview:** no confidential cohort resources exposed. **Real member:** resources and canonical links render from read-only backing channels without dead destinations. |
| Voice and opt-in areas | Voice is **explicitly untested** (`16`); existence and intended boundaries are unknown. | **Role preview:** unselected areas hidden. **Real member:** voice and other opt-in access follows the intended plan. |
| Staff, conduct, and combined-role isolation | Staff baseline preview only (`14`); category denies, overrides, conduct visibility, and role combinations are **unknown**. | **Role preview:** private-category boundaries, narrower conduct access, and relevant combinations. **Real member:** effective private access boundaries. |
| Other role permissions | **Unknown:** only the interest-role permission is supplied (`13`). Admin, Moderator, Maintainer, Contributor, partner, bot, and backup-role permissions and hierarchy are not inventoried. | **Role preview:** least privilege, no Administrator, appropriate hierarchy, and no unintended combined-role access. **Human attestation:** approved operational and recovery actions work. Roles needing members cannot yet be identified. |
| Native safety and moderation | **Unknown:** no verification level, minimum-age policy, moderator MFA, raid protection, content filtering, DM safety, AutoMod, alert routing, audit, or enforcement evidence (`7–20`). | Configuration evidence plus **human attestation:** safety actions, acting-account audit events, private non-credential alerts, and synthetic credential blocking without copying matched content into alerts. Never use real credentials for testing. |
| Forum workflow and content | Required tags fail (F3); existing taxonomy, moderated state tags, guidelines, and templates are **unknown** (`12`). | **Real member:** tag enforcement and state restrictions. **Human attestation:** durable issue links, private security handling, and test cleanup. |
| Durable reporting and conduct operations | Destinations supplied (`4–5`), but URLs, published guidance, confidentiality, record retention, response commitments, appeals, recusal, and backup are **unknown**. | **Real member:** published routes open intended destinations. **Human attestation:** security and conduct intake works without Discord; conduct has private durable records and an alternate handler. Preserve the human owner as the stated conduct route. |
| Ownership and recovery | Human owner mentioned (`5`); successor, backup recovery, owner MFA, recovery storage, and absence of shared accounts are **unknown**. | **Human attestation:** human ownership, successor, MFA, recovery, and no shared account. **Role preview:** backup hierarchy supports required operations. Do not inspect recovery material. |
| Invites and private cohort controls | Invited beta users are recorded (`3`), but expiry, use limits, approvals, revocation, member invite permissions, and any separate confidential cohort are **unknown**. No invite is supplied (`17`). | **Human attestation:** invite approval, bounds, human-only handling, role-assignment capability/manual fallback, persistence, existing-member handling, and revocation. **Real member:** member invite denial and new-cohort access if applicable. Do not assume invited beta means a separate private program exists. |
| Integrations and community data access | No approvals (`17`); installed inventory, data access, owners, permissions, and removal paths are **unknown**. | Establish inventory first. If present, **role preview:** scoped access and no Administrator; **human attestation:** approval, data boundaries, ownership, removal, release-event scope, credential handling, and cleanup. No integration installation is proposed. |
| Assets and events | **Unknown applicability:** no brand, assets, store, events, hosts, or cadence supplied (`1–20`). | If used, **human attestation:** canonical sources, preserved reviewed raster/vector assets, safe SVGs and rendered parity, full-series updates, live crop review, and host ownership. Absence from the snapshot is not a failure. |
| Seed content and review schedule | **Unknown:** channel existence (`10`) does not establish welcome messages, templates, or review ownership. | **Real member:** useful seed content for intended jobs. **Human attestation:** review date and any planned event host. |
| Community-disabled fallbacks | **Not applicable:** Community is enabled (`9`). | Disabled-Community text-channel fallback checks are not required for this snapshot. |
| Exact-current labels and platform capabilities | **Unverified/offline:** explicitly limited (`20`). | Current official documentation and, where necessary, human capability checks before future implementation. Local references are audit criteria, not proof of current UI behavior. |

## Handoff

- **Changed:** Only this local report was created. Supplied input files were left unchanged. No server changes or live tests were performed.
- **Verified from supplied evidence:** Three configuration failures and the limited recorded staff-visibility role-preview result. None was independently verified against Discord.
- **Still unverified:** All real-member behavior, human-only operational checks, undocumented configuration, and exact-current platform labels.
- **Next human actions:** If remediation is authorized later, correct the interest-role privilege first, then announcement posting and forum tag enforcement. Confirm unknown role assignments, integration inventory, recovery ownership, and reporting paths. Arrange separately authorized member testing when a fresh human-operated account is available; keep invite handling human-only and outside automation.
- **Review timing:** Re-audit after approved corrections and member verification, and before expanding beyond the current invited beta. No review date is currently recorded.

The audit is complete within its offline scope. The evidence does not establish launch readiness.
