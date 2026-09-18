# Fictional Discord server audit

## Scope and evidence

**Three configuration failures are recorded in the snapshot. Effective member behavior remains untested.**

- **Mode:** offline, audit only. Audit date: 2026-09-17. Snapshot date: unknown.
- **Server evidence:** only `snapshot.md`, lines 1–20. The supplied configuration statements are recorded observations, not fresh tests or human attestations of completed verification.
- **Assessment criteria:** local `skills/discord-community-server/SKILL.md` (steps 1 and A1–A3), `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md`.
- **Context:** 20 invited beta users and two maintainers. Product surfaces are **command execution** and **build previews** (`snapshot.md:3–4`). A confidential cohort or public-launch plan is not established.
- **Durable routes:** support and bugs belong in the issue tracker; security reports belong in the project's private security-reporting form; conduct reports go to the human owner (`snapshot.md:4–5`). Exact destinations, accessibility, and an external conduct-record system are unknown. Feedback, decisions, documentation, and release destinations are unspecified.

No live services, browser, account, fresh member account, or current official documentation were used. Exact-current Discord labels and permission behavior remain unverified. Names below follow the supplied local references. No server changes were made. All corrections and verification procedures below are proposals, not applied or executed.

## Findings

### F1 — High: the interest role has a privileged permission

**Evidence:** `snapshot.md:13` records that the interest role has `Manage Roles`. This fails the local interest-role invariant (`REFERENCE.md`, Role model; `VERIFICATION.md`, Maintainer, contributor, partner, and interest roles). Evidence class: supplied configuration observation; no role-preview or real-member test of this role is supplied.

**Impact and priority:** A personalization role carries role-management authority. This is the highest-priority correction because it crosses the privilege boundary even in a small beta. Role holders, self-assignment, role hierarchy, and the actual scope of usable authority are unknown; no exploit or staff-channel access is established.

**Proposed correction:** Remove `Manage Roles` from the interest role. Limit it to intended command execution or build previews channels and notifications. Keep necessary role administration in explicitly authorized operational roles. Check other privileged permissions and relevant role combinations before treating this boundary as restored.

**Verification:** Use **role preview** to inspect the corrected interest-role permission shape and relevant combinations. Use a **real member** with the baseline and interest roles to confirm that role and webhook management are unavailable. If onboarding grants this role, test that flow with a fresh member and confirm that it grants only intended access.

### F2 — Medium: members can post in announcements

**Evidence:** `snapshot.md:11` records that announcements allow member messages. This fails the read-only announcement rule (`REFERENCE.md`, Permission rules). Evidence class: supplied configuration observation; runtime posting was not tested.

**Impact and priority:** Member messages can obscure official beta updates or make their authority unclear. Medium priority reflects the direct communication problem for 20 invited users without evidence of abuse.

**Proposed correction:** Make announcements read-only for ordinary members while retaining posting access for approved operational roles. Review category inheritance, channel overrides, and combined roles so the restriction covers messages and other write paths.

**Verification:** Use **role preview** for effective static permissions. Use a **real member** to confirm rejection of messages, existing-thread replies, public and private thread creation, polls, and invite creation under the intended read-only boundary. Check that approved operational roles retain intended posting access.

### F3 — Medium: the support forum does not require tags

**Evidence:** `snapshot.md:12` records no required tags in the support forum. This fails the mandatory purpose/package/domain-tag invariant (`OPERATIONS.md`, Make forum state trustworthy). Evidence class: supplied configuration observation. The snapshot does not establish whether optional tags or workflow-state tags exist.

**Impact and priority:** Untagged posts make command execution and build previews questions harder for two maintainers to route. Medium priority reflects this triage cost; no failed support outcome is claimed.

**Proposed correction:** Require at least one member-selectable product-surface tag, using command execution and build previews where suitable. Preserve useful existing domain tags if present. Reserve workflow-state tags for moderators. Keep support and bugs in the issue tracker as the authoritative destination; route security reports to the private security-reporting form and conduct reports to the human owner. Include versions, runtime, expected and observed results, and sanitized reproductions in forum guidance.

**Verification:** Use a **real member** to confirm that an untagged post is rejected, a valid domain-tagged post is accepted, guidelines are visible, and workflow-state tags cannot be applied by participants. Obtain **human attestation** that staff can advance any planned states, link durable work, route security reports privately, and remove test content. These tests require later authorization.

## Healthy recorded observations

- **Community is enabled** (`snapshot.md:9`). This records the prerequisite for Community features, not successful Rules Screening, Onboarding, or Server Guide behavior.
- **General, announcements, support, and staff channels exist** (`snapshot.md:10`). This is a compact structure for the stated scale. Channel names alone do not establish usefulness or safe permissions.
- **The recorded baseline-member role preview hides staff channels** (`snapshot.md:14`). This is a narrow **role-preview** pass for staff visibility only. It does not prove conduct-channel isolation, multi-role safety, or fresh-member behavior.
- **Reporting destinations are stated** (`snapshot.md:4–5`). Their operation and published links remain untested.

## Gaps and verification limits

The following coverage groups account for the remaining applicable local controls. Missing evidence is an unknown, not an observed failure. No additional verification-matrix pass is claimed.

| Coverage | Status and missing evidence | Required evidence class and limit |
| --- | --- | --- |
| Roles and static access | **Unknown**, except F1 and the narrow staff-preview result. Admin, moderator, maintainer, contributor/partner, member, and bot permissions; `Administrator` absence; role hierarchy; category inheritance; per-user overrides; conduct isolation; opt-in visibility; member invite permissions; and multi-role combinations are not supplied. The two maintainers' actual permissions and any vacant operational roles are unknown. | **Role preview** for static shape and hierarchy; **real member** for effective access and denied actions. No further preview or account access is available. |
| Member journey and Community features | **Untested.** The snapshot explicitly says Onboarding, Rules Screening, and voice were not tested (`snapshot.md:16`). Default-channel usefulness, required answers, interest-role assignment, starter tasks, read-only actions, forum behavior beyond the recorded setting, published route links, and seed/template content are also untested. | **Real member**, requiring a fresh human-operated non-privileged account, is unavailable (`snapshot.md:15`). Recorded preview cannot substitute for this evidence. |
| Server Guide and private-program boundaries | **Unknown applicability and configuration.** No Server Guide, resource channels, confidential cohort, private start channel, separate feedback audiences, or access-role scheme is described. If present, resource readability, canonical-link rendering, confidential-content exclusion, baseline/cohort visibility, read-only start permissions, and combined-role boundaries require checking. Invited beta membership alone does not prove a confidential cohort exists. | **Role preview** for static exposure; **real member** for resources and access; **human attestation** for role-assignment capability and manual fallback. These are unavailable. |
| Safety and moderation | **Unknown.** Verification level, minimum-age policy, moderator MFA, raid protection, explicit-content and DM safety, audit logging, enforcement permissions, escalation, appeals, recusal, and backup coverage are absent. AutoMod coverage for mention spam, suspected spam, abuse, credentials, and external invites is absent. Private non-credential alerts, credential blocking without matched-content alerts, revocation warnings, and tolerance for normal technical discussion are unverified. | **Role preview** for moderation permission boundaries; **human attestation** for settings and synthetic moderation tests. No synthetic messages or enforcement tests were sent. |
| Ownership, recovery, and durable operations | **Unknown**, beyond the stated human conduct recipient. Human server ownership, successor, owner MFA and recovery storage, absence of shared accounts, backup recovery capability, moderation staffing, response commitments, and review cadence are not documented. Conduct recordkeeping and security/conduct access without Discord are unverified. | **Human attestation**, without inspecting identity or recovery secrets; **role preview** for backup role hierarchy. No such attestations are supplied. Route statements are not delivery tests. |
| Invites and cohort admission | **Unknown.** Approval history, expiry, use limits, temporary membership, member-created invites, role assignment, existing-member behavior, manual fallback, and post-onboarding revocation are absent. No invite is included (`snapshot.md:17`), which does not prove these controls passed. | **Human attestation** for invite settings, handling, consumption, reuse rejection, and existing-member checks; **real member** for first-new-member role assignment and denied invite creation. Invite handling remains human-only; no invite was created or inspected. |
| Apps, bots, and webhooks | **Unknown inventory; no integrations approved** (`snapshot.md:17`). This does not establish that none are installed. Data access, minimum permissions, ownership, privacy/retention/deletion/export, removal paths, role-assignment powers, release-only filtering, and credential handling are unknown. There is no approved integration delivery test in this audit. | **Role preview** for channel/action access; **human attestation** for a redacted inventory, approval, data boundaries, secret handling, release delivery, and cleanup if applicable. No integration's access to community data can be established. |
| Assets, events, and presentation | **Unknown applicability.** No canonical brand, managed asset store, emoji meanings, event plan, cadence, host, or artwork is described. Asset source/review, raster/vector preservation and parity, SVG restrictions, real-product visuals, and full-series event updates cannot be assessed. Channel ordering needs and release/showcase surfaces are unspecified. | **Human attestation** for asset and event controls if applicable; **real member** for usable orientation and published content. No assets or live event views are available. |
| Disabled-Community fallback | **Not applicable to the recorded state:** Community is enabled. | The disabled-Community text-fallback branch of `VERIFICATION.md` does not apply. This does not waive enabled-Community checks. |

## Handoff

This audit verifies the three discrepancies against the supplied local criteria and preserves the limited recorded staff-visibility result. It does not certify live settings, fresh-member safety, or launch readiness.

The owner can next authorize an improvement plan for F1–F3 and arrange the missing role previews, fresh-member checks, and non-secret human attestations. Prioritize the interest-role boundary before expanding beta access. Review again after corrections and fresh-member verification, before the next cohort; no review date is currently supplied.

Only `audit.md` was created. Supplied input files remain unchanged. No server, app, event, invite, credential, or integration operation was performed.
