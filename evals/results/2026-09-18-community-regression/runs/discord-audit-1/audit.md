# Fictional Discord server audit

## Scope and evidence

**Result:** Three configuration failures are recorded below. This audit does not establish launch readiness.

- **Mode:** Offline audit only. No server changes or live tests were authorized or performed.
- **Audit date:** 2026-09-18. **Snapshot date:** Unknown.
- **Server evidence:** Only `snapshot.md`, cited by line number below.
- **Assessment criteria:** Local `skills/discord-community-server/SKILL.md` (steps A1–A3), `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md`. These files supply criteria, not additional server evidence.
- **Community:** 20 invited beta users and two maintainers. Product surfaces are **command execution** and **build previews** (`snapshot.md:3–4`). Staff availability, response commitments, and event cadence are unknown.
- **Reporting routes:** Support and bugs belong in the issue tracker. Security reports belong in the project's private security-reporting form. Conduct reports go to the human owner (`snapshot.md:4–5`). Exact destinations, accessibility, and a durable confidential conduct-record system are not supplied.

Recorded configuration is supplied evidence, not an independently observed result or a fresh human attestation. The sole explicitly identified verification method is the recorded role preview. Browser access, account access, and a fresh human test account are unavailable (`snapshot.md:15–20`). Exact current Discord labels and permission behavior remain unverified because live official documentation is outside scope.

## Findings

Priorities reflect this small beta community: **High** means a privilege boundary needs correction first; **Medium** means a publishing or support-routing control needs correction. All corrections below are proposals, **not applied**. Verification methods describe future authorized work.

### F1 — High: The interest role has a privileged permission

**Evidence:** The interest role has `Manage Roles` (`snapshot.md:13`). This conflicts with the non-privileged interest-role model in `REFERENCE.md`, “Role model,” and `VERIFICATION.md`, “Maintainer, contributor, partner, and interest roles.”

**Impact and priority:** A role intended for personalization carries role-management authority. That is a privilege-boundary failure even with only 20 beta users. The snapshot does not establish who holds this role, whether it is self-assigned, its hierarchy position, or the exact effective authority. It does not prove exploitation or access to staff channels.

**Proposed correction — not applied:** Remove `Manage Roles` from the interest role. Limit it to intended product channels or notifications for command execution and build previews. Keep role administration with explicitly authorized operational roles. Review other permissions, hierarchy, overrides, and relevant role combinations before declaring the boundary corrected.

**Future verification:** Use **role preview** to check static permissions and combinations for the interest role. Use a fresh, human-operated **real member** account to confirm ordinary members cannot manage roles or webhooks. Any onboarding assignment should grant only intended non-privileged roles. Neither check has been performed here.

### F2 — Medium: Members can post in announcements

**Evidence:** Announcements allow member messages (`snapshot.md:11`). This conflicts with the read-only publishing rule in `REFERENCE.md`, “Permission rules.”

**Impact and priority:** Member posts can obscure official notices and blur who speaks for the project. This is a confirmed publishing-control failure, without evidence of actual misuse.

**Proposed correction — not applied:** Make announcements read-only for ordinary members while preserving posting for approved maintainers or other authorized publishers. Review category inheritance, channel overrides, and combined roles so alternate posting paths do not bypass the boundary.

**Future verification:** Use **role preview** to inspect static access. Use a **real member** to verify rejection of messages, replies in existing threads, public and private thread creation, polls, and invite creation, as applicable to the channel. A **human attestation** should confirm that authorized publishers retain their intended access. Only member messages are recorded as allowed; the other paths are untested.

### F3 — Medium: The support forum does not require tags

**Evidence:** The support forum has no required tags (`snapshot.md:12`). This conflicts with `OPERATIONS.md`, “Make forum state trustworthy.” The snapshot does not say that all tags are absent or that workflow-state tags are member-selectable.

**Impact and priority:** Posts can omit the product classification needed to route support across command execution and build previews. This creates avoidable triage work for two maintainers, although actual workload is unknown.

**Proposed correction — not applied:** Require at least one member-selectable domain tag using the project's terms, such as `command execution` or `build previews`. Preserve any useful existing taxonomy after inspection. Keep any workflow-state tags moderator-only. State clearly that support and bugs belong in the issue tracker; forum discussion must not replace that record. Route security details to the private security-reporting form and conduct reports to the human owner.

**Future verification:** A **real member** should be unable to create an untagged post, able to select an appropriate domain tag, and unable to apply moderator-only workflow states. A **human attestation** should confirm staff can advance any planned states, link durable work, use the private security route, and remove test content. This lifecycle was not tested.

## Healthy observations and narrow passes

- **Staff visibility — recorded role-preview pass, limited scope:** Staff channels are hidden from the baseline member (`snapshot.md:14`). This supports only that preview result. It does not establish conduct-channel isolation, combined-role safety, or actual fresh-member access.
- **Community prerequisite — recorded enabled:** Community is enabled (`snapshot.md:9`). This supports the prerequisite for Community features, not their configuration or runtime behavior.
- **Basic structure and reporting intent:** General, announcements, support, and staff channels exist, and reporting destinations are stated (`snapshot.md:4–5,10`). Member-facing guidance, link validity, and durable handoffs are untested.
- **Approval boundary:** No integrations were approved (`snapshot.md:17`). This does not prove that no integration is installed. The snapshot supplies no invite or credential; this is not a credential-handling audit of the server.

## Gaps and verification limits

These are **unknown or untested**, not additional failures. Each row groups controls that share missing evidence or a missing verification capability. F1–F3 contain the confirmed exceptions.

| Coverage | Missing evidence and verification class | Consequence of the gap |
| --- | --- | --- |
| Roles and channel permissions | **Role preview:** Full role inventory, hierarchy, `Administrator` absence, Admin boundaries, Moderator boundaries, Maintainer permissions, contributor/partner access, bot permissions, private-category denials, conduct isolation, opt-in visibility, category exceptions, per-user overrides, and multi-role combinations. **Real member:** Effective private-area access, read-only boundaries, role/webhook management, and server-wide member invite restrictions. | The baseline staff preview cannot establish least privilege across the server. See F1 and F2 for known failures. |
| Onboarding and member journey | Onboarding, Rules Screening, and voice are explicitly untested (`snapshot.md:16`). **Real member:** Rules acceptance, valid answers, safe interest-role assignment, useful default channels, accessible starter tasks, opt-in behavior, Server Guide resources, and external links through read-only backing channels. **Role preview:** Global guide confidentiality. | A new user's orientation and access boundaries remain unverified. Community-enabled checks remain applicable; they are not passes merely because Community is enabled. |
| Moderation and safety | Configuration and **human attestation** are absent for verification level, age policy, owner/staff MFA, raid controls, CAPTCHA, explicit-content filtering, DM safety, audit events, timeouts, bans, and member reports. AutoMod coverage is unknown for mention spam, suspected spam, abuse, credentials, and external invites. Synthetic tests must establish private non-credential alerts and credential blocking without copying matched content to alerts. | Prevention, detection, and response effectiveness cannot be assessed. No synthetic tests were run. |
| Content and durable workflows | **Real member:** Forum guidelines and tag behavior beyond F3, sanitized templates, welcome/seed content, custom emoji meanings if used, and published support, bug, security, conduct, release, and other durable links. **Human attestation:** Durable handoff, confidential security handling, conduct records, and conduct/security access without Discord. Feedback, decision, documentation, and release destinations are unknown. | Stated reporting intent does not prove accessible routes or durable records. Preserve the supplied issue-tracker, private security-form, and human-owner routes. |
| Ownership, staffing, and recovery | **Human attestation:** Successor, backup recovery, no shared account, owner recovery material outside automation, approved Admin recovery actions, moderator assignments, conduct recusal/backup, escalation and appeals, staff coverage, and response commitments. **Role preview:** Backup Admin hierarchy. | Two maintainers do not establish moderation or recovery coverage. Which roles still need members is unknown. |
| Invites and private cohorts | **Human attestation:** Approval, expiry, use limits, temporary-membership settings, human-only handling, consumed test-invite rejection, optional role-assignment capability, existing-member handling, manual fallback, and revocation. **Real member:** First-new-member role assignment and private cohort visibility/read-only behavior. Separate confidential cohorts and their access/relationship roles are not established by the snapshot. | Invited beta membership does not prove safe invite settings or imply that a separate confidential cohort exists. Conditional cohort checks have unknown applicability. No invite interaction occurred. |
| Integrations and release delivery | Installed app/webhook inventory is unknown despite no approvals. If present, **role preview** must establish channel/data boundaries and minimum permissions. **Human attestation** must establish owners, workflow need, privacy/retention/deletion/export terms, removal paths, release-only event scope, human-only credential handling, and test cleanup. | No integration's data access or absence can be verified. Conditional delivery and bot checks cannot be marked passed or definitively not applicable. |
| Assets, events, and ongoing review | Existence of assets and events is unknown. If present, **human attestation** is needed for canonical brand sources, managed storage, approved raster/vector preservation, safe SVG contents and parity, real product visuals, event host/backup, cadence/timezone, durable outcomes, and full-series artwork at live crop sizes. Staff capacity and a post-cohort review date are not supplied. | Optional assets or events are not requirements to add. Their controls have unknown applicability. Operational sustainability and review ownership remain unknown. |

**Not applicable to this audit:** Community-disabled text-channel fallback checks, because Community is recorded enabled. Configuration, launch acceptance, invite creation, event creation, app installation, and a long-lived operating state file are outside this audit-only scope. Unknown optional features are not treated as absent.

## Handoff

The local evidence supports three configuration findings and one narrow recorded staff-visibility preview pass. It supplies no fresh-member result and no independent live verification.

The owner should prioritize F1, then F2 and F3, if implementation is later authorized. Future verification needs a fresh human-operated non-privileged account, appropriate read-only configuration evidence, and the human attestations listed above. Invite and credential handling must remain human-only, with no URLs or credentials recorded. No such work is authorized by this report.

Review the findings after authorized corrections and before broadening beta access. Establish a review owner and trigger from unanswered posts, routing problems, or staff load; no response SLA or event cadence is inferred.

Only `audit.md` was added. Supplied input files were left unchanged. No server changes, live-service calls, delegation, or modifying tests were performed. No type-check or lint configuration is supplied in this documentation-only workspace; neither check was run.
