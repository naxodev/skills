# Fictional Discord server audit

## Scope and evidence

**Result: three configuration failures are recorded in the snapshot. Live behavior remains unverified.**

- **Mode:** offline, audit only. Report date: 2026-09-17. Snapshot date: unknown.
- **Server evidence:** only `snapshot.md`, cited below as S with line numbers. The community has 20 invited beta users and two maintainers (S3).
- **Assessment criteria:** local `skills/discord-community-server/SKILL.md` and its `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md`. These supply controls, not additional server evidence.
- **Product terms and routes:** command execution and build previews; support and bugs belong in the issue tracker; security reports belong in the project's private security-reporting form; conduct reports go to the human owner (S4–5). No destination links or route tests are supplied. A durable conduct case-recording process is unknown.
- **Evidence classes:** recorded configuration establishes snapshot facts only. The supplied role preview supports static visibility for the tested role. Neither is a fresh-member test. Human-attestation checks require explicit human evidence, which is not supplied for those checks.

No browser, account, fresh human test account, or live documentation access is available (S15–20). Exact-current Discord labels and permission behavior are unverified. Proposed corrections below use the local references' terminology and are **not applied or authorized**.

## Findings

### F1 — High: the interest role has privileged access

**Evidence:** S13 records `Manage Roles` on the interest role. This fails the non-privileged interest-role rule in `REFERENCE.md` and the interest-role check in `VERIFICATION.md`. This is a recorded configuration failure; actual role-management actions were not tested.

**Impact and priority:** an interest role intended for product preferences carries role-management authority. This is the highest-priority correction because ordinary participation should not grant administrative capabilities. Actual reach depends on role hierarchy, assignment, and effective permissions, all unknown. The snapshot does not establish that users self-assign this role or that privilege escalation occurred.

**Proposed correction, not applied:** remove `Manage Roles` and any other privileged permissions from the interest role. Limit it to intended product channels or notifications. Keep authorized role management on explicit operational roles.

**Verification:** use **role preview** to inspect the interest role and relevant role combinations for privileged access. Use a fresh **real member** to verify that interest selection grants only intended access and that the member cannot manage roles or webhooks.

### F2 — Medium: announcements allow member messages

**Evidence:** S11 explicitly records member posting in announcements. This fails the read-only announcement control in `REFERENCE.md`. Other posting capabilities are unknown.

**Impact and priority:** member messages can obscure official updates for the beta audience and create avoidable moderation work. This affects announcement reliability, with less direct authority risk than F1.

**Proposed correction, not applied:** make announcements read-only for ordinary members while retaining posting for approved operational roles. Review effective overwrites and role combinations for message, thread, poll, and invite permissions.

**Verification:** use **role preview** for static permissions, then a **real member** to confirm rejection of messages, replies in existing threads, public and private thread creation, polls, and invite creation. Confirm that approved staff can still publish updates.

### F3 — Medium: support posts do not require tags

**Evidence:** S12 records that the support forum has no required tags. This fails the feedback-like forum tag invariant in `OPERATIONS.md`. The snapshot does not establish whether optional tags or workflow-state tags exist.

**Impact and priority:** unclassified posts make support harder to route across command execution and build previews. For two maintainers supporting 20 beta users, required product-surface tags provide useful routing without adding channels.

**Proposed correction, not applied:** require at least one member-selectable domain tag, using `command execution` and `build previews` where appropriate. Keep any workflow-state tags moderator-only. Make the forum's guidance preserve the issue tracker as the destination for support and bugs, the private security-reporting form for vulnerabilities, and the human owner for conduct reports.

**Verification:** a **real member** should be unable to create an untagged post, able to select an appropriate domain tag, and unable to apply moderator-only state tags. **Human attestation** should confirm that staff can advance any planned workflow states, link durable work, route security details privately, and remove synthetic test content.

## Healthy recorded observations

- Community is enabled (S9), satisfying the recorded prerequisite for Community features. This does not prove that those features are configured or work.
- General, announcements, support, and staff channels exist (S10). This is a compact starting structure; channel usefulness and content remain untested.
- The supplied **role preview** hides staff channels from the baseline member (S14). This is a limited static pass for that role and those channels, not proof about conduct channels, additional roles, or fresh-member access.
- Reporting destinations are named (S4–5), and no invite or credential appears in the supplied snapshot (S17). Neither observation proves destination availability or credential handling elsewhere.

## Gaps and verification limits

These are unknown or untested checks, not additional failures. Coverage follows the local verification matrix and applicable reference controls.

| Coverage | Status and missing evidence |
| --- | --- |
| Role and channel boundaries — **role preview / real member** | Beyond F1–F2 and the supplied staff preview, untested: `@everyone` and category overwrites, inheritance exceptions, per-user overrides, role hierarchy, absence of `Administrator`, Admin/Moderator/Maintainer permissions, contributor or partner access if present, conduct isolation, unselected opt-in visibility, multi-role combinations, read-only rules or release channels if present, and server-wide member invite restrictions. Two maintainers are reported, but role assignments and remaining staffing needs are unknown. |
| Onboarding and member experience — **real member / role preview** | Onboarding, Rules Screening, and voice are explicitly untested (S16). Default-channel usefulness, required answers, interest assignments, starter tasks, guide resources, rendered external links, confidential-content exclusion, templates, sanitized-reproduction guidance, and durable-route links are also untested. Community-disabled fallback checks are **not applicable**, because Community is recorded as enabled. |
| Forum workflow — **real member / human attestation** | Beyond F3, tag visibility, guidelines, moderator-only state enforcement, staff workflow, durable issue linkage, security redirection, and test cleanup are untested. No additional forums are established by the snapshot. |
| Moderation and safety — **human attestation / role preview** | Unknown: verification level, minimum-age policy, moderator MFA, raid protection, content filtering, direct-message safety, audit attribution, enforcement permissions, response commitments, escalation, appeals, conduct recusal, and backup coverage. AutoMod coverage for mentions, spam, abuse, credential-like strings, and unwanted invites is unknown. Synthetic tests would need to establish private non-credential alerts and credential blocking with a revocation warning and no copied match in alerts. |
| Ownership and recovery — **human attestation** | A human owner is named as the conduct destination, but actual server ownership, a human successor, owner MFA, recovery arrangements, absence of shared accounts, backup operational access, and security/conduct routes working without Discord are unverified. Backup role hierarchy also requires **role preview**. |
| Private programs and invites — **real member / human attestation / role preview** | Invited beta users do not establish a confidential cohort. Applicability of private categories, start channels, feedback forums, and cohort roles is unknown. If present, isolation, combined-role access, read-only start behavior, and separation from global onboarding require testing. Existing invite approval, expiry, use bounds, temporary membership, role assignment capability, new/existing-member behavior, manual fallback, revocation, and human-only handling are unknown. Single-use test-invite consumption and second-use rejection have no attestation. Invite interaction must remain human-only. |
| Integrations and bots — **role preview / human attestation** | S17 says no integrations were approved; it does **not** establish that none are installed. Installed inventory and community-data access are unknown. If any exist, app purpose, native alternatives, operator/privacy policy, permissions, private-channel access, retention/deletion/export, owner, update review, removal path, role hierarchy, and assignment limits need review. Webhook event scope, release filtering, delivery, cleanup, and credential handling are unverified. No integration installation or test is needed to finish this audit. |
| Assets, events, and launch operations — **human attestation / real member** | Applicability is unknown: canonical brand sources, asset review, managed storage, raster/vector preservation and parity, SVG restrictions, real-product visuals, custom emoji meanings, recurring events, cadence, timezone, host/backup, series updates, and crop checks. Seed content and a scheduled post-cohort review are unverified. Public versus staged launch plans and residual-risk acceptance are not supplied. No channel reordering or asset work was performed. |

## Handoff

Only this local report was created. **No server changes, live-service calls, modifying tests, invites, integrations, or credential interactions were performed. Supplied input files were left unchanged.**

The audit verifies what the snapshot records and identifies three control failures against the local references. It does not certify current server security, effective member behavior, or launch readiness.

The human owner can prioritize F1, then F2 and F3, through a separately authorized improvement process. When access and a fresh human-operated member account become available, verify the corrections and close the grouped evidence gaps. Review again after those corrections and before expanding beta access; no review date is currently recorded. Audit completion requires no server action or launch acceptance.
