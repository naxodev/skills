# Fictional Discord server audit

## Result and scope

**No failures are established by the supplied snapshot.** The recorded configuration has useful access and forum controls. It does not establish working member flows or launch readiness. Missing evidence is recorded below as unknown or untested, not as a failed setting.

- **Mode:** Audit only, offline. No server changes were authorized or made.
- **Audit date:** 2026-09-17. **Snapshot date:** Unknown.
- **Server evidence:** `snapshot.md` only. Source references below use its line numbers.
- **Assessment criteria:** Local `skills/discord-community-server/SKILL.md`, `REFERENCE.md`, `OPERATIONS.md`, and `VERIFICATION.md`.
- **Access limits:** No browser, account, fresh human test account, or live documentation access. Exact-current Discord labels and platform behavior remain unverified. No live services, other skills, delegation, or files outside this workspace were used.

Recorded configuration is supplied documentary evidence. Only the explicitly recorded role preview counts as supplied **role-preview** evidence. Neither is a new live check, a **real-member** result, or a **human attestation** of an unobserved action.

## Community context and reporting routes

The community has 20 invited beta users and two maintainers. Its product surfaces are **command execution** and **build previews** (lines 3–4). General, announcements, support, and staff channels exist (line 10). This is a small invited beta; a broader launch plan and any confidential cohort model are unknown.

Preserve these supplied routes (lines 4–5):

| Work | Recorded destination | Evidence limit |
| --- | --- | --- |
| Support and bugs | Issue tracker | No destination link or working routing example supplied. |
| Security reports | Project's private security-reporting form | Privacy, availability, and access without Discord are untested. |
| Conduct reports | Human owner | A contact route, durable case record, recusal path, and backup are unknown. |

The conduct destination names a human owner; it does not prove server ownership or recovery arrangements. Product feedback, decisions, releases, and reusable documentation destinations are unknown. Moderator staffing, role membership, response commitments, and event cadence are also unknown.

## Healthy observations

| Observation and source | What the evidence establishes |
| --- | --- |
| Community is enabled (line 9). | Recorded prerequisite for Community features. Feature setup and member behavior remain untested. |
| Announcements deny baseline members messages, replies in existing threads, public and private thread creation, polls, and invite creation (line 11). | The recorded denial set matches the read-only control. It does not prove effective behavior or server-wide invite restrictions. |
| Support requires a member-selectable **command execution** or **build previews** tag; workflow-state tags are moderator-only (line 12). | The recorded forum design uses the project's domain terms and separates purpose from workflow state. Posting and tag enforcement are explicitly untested (line 15). |
| Baseline role preview hides staff and unselected opt-in channels (line 14). | **Passed in supplied role preview only** for those visibility boundaries. Conduct-specific visibility and fresh-member access are not established. |
| Interest role grants only relevant product channels and notifications, without privileged permissions; supplied preview confirms this shape (lines 13–14). | **Passed in supplied role preview only** for the interest-role permission shape. Onboarding assignment and combined-role effects are untested. |

No observed failure warrants a corrective finding or priority rating. All possible changes remain unapplied.

## Gaps and verification coverage

These groups cover the remaining applicable local controls. Unless otherwise stated, settings are **unknown** and behavior is **untested**. The named evidence classes describe future verification, not work performed in this audit.

| Coverage and source limit | Missing evidence and matching verification |
| --- | --- |
| **Access and role boundaries.** Only the baseline and interest previews are supplied (lines 13–15). | **Role preview:** full role definitions, hierarchy, category inheritance and exceptions, per-user overrides, explicit private-category `@everyone` denials, conduct isolation, Admin/Moderator/Maintainer limits, any contributor or relationship roles, multi-role combinations, and absence of `Administrator` across roles and bots. **Real member:** read-only enforcement, inability to manage roles or webhooks, server-wide invite denial, useful default channels, and opt-in/voice behavior. Voice existence and intended boundaries are unknown (line 16). |
| **Community orientation.** Community is recorded enabled, but Onboarding and Rules Screening were not observed (lines 9, 16). | **Real member:** screening, valid required answers, safe interest-role assignment, three accessible starter tasks, Server Guide resources and external links through read-only backing channels. **Role preview:** no confidential material in global resources and correct backing-channel permissions. Welcome content, rules, templates, sanitation guidance, custom emoji use, and seed content are unknown; inspect them and test member accessibility. Community-disabled fallback checks are **not applicable** to the recorded enabled state. |
| **Forum and durable workflow.** Tag configuration and reporting destinations are supplied, but no workflow or member test exists (lines 4–5, 12, 15). | **Real member:** guidelines are visible, purpose tags are required, workflow-state tags cannot be applied, and published route links open the intended destinations. **Human attestation:** staff advance states, link support and bugs to the issue tracker, route security details privately, maintain durable conduct records, and remove any future test content. Verify templates request versions, runtime/context, expected and observed results, and sanitized reproduction. The security and conduct routes must also work without Discord. |
| **Moderation and safety.** AutoMod behavior was not observed (line 16); other safety settings are absent. | **Human attestation:** verification level, minimum-age policy, moderator MFA, raid controls, content filtering, DM safety, moderation actions, actor-attributed audit events, escalation, appeals, and conduct recusal/backup. Verify mention spam, suspected spam, abusive language, external invites, and credential-like rules. Future synthetic checks should prove non-credential alerts stay private and credential-like matches are blocked with a revocation warning, without copying matched content to alerts. No synthetic tests ran here. |
| **Invites and confidential cohorts.** Users are invited, but no invite settings or private-program model are supplied (lines 3, 17). | **Human attestation:** explicit invite approval, expiry/use limits, persistent membership settings, human-only handling, and revocation after cohort onboarding. Any future single-use test invite needs approval and human handling, with second-use rejection attested. Whether cohort roles or confidential areas exist is **unknown**, not a demonstrated requirement to add them. If present, use **role preview** for private-category and read-only start permissions; **real-member** checks for baseline/cohort visibility and first-new-member access assignment; **human attestation** for optional role-assignment capability, existing-member behavior, and manual fallback. |
| **Ownership, recovery, and staffing.** Recovery was not observed (line 16); only two maintainers and a conduct owner are mentioned. | **Human attestation:** human server owner, named human successor, owner MFA and recovery storage outside automation, no shared account, backup recovery capability, and assigned moderation/appeal responsibility. **Role preview:** backup hierarchy and permitted recovery/configuration scope. Which roles still need members is unknown; two maintainers do not establish moderator or backup coverage. |
| **Integrations.** No integrations were approved (line 17). | Actual installation inventory and community-data access are **unknown**; lack of approval does not prove absence. No installation or webhook setup applies to this audit. If integrations exist, use **role preview** for minimum channel/action access and bot hierarchy, and **human attestation** for approval, owner, removal path, retention/privacy/export boundaries, role-assignment limits, release-only delivery, secret-safe handling, and cleanup. No invite or credential is included in the supplied snapshot; this says nothing about external logs or storage. |
| **Assets, events, and ongoing operations.** No evidence is supplied. | Existence and applicability are **unknown**. If used, obtain **human attestation** for canonical brand sources, reviewed assets, managed raster/vector storage, safe SVG contents and rendered parity, implementation-derived visuals, event cadence/timezone, host/backup, durable outcomes, and full-series artwork verified at live crop sizes. Channel reordering is outside this audit's scope. A scheduled review date and owner acceptance of residual launch risk are unknown. |

## Handoff

The audit verifies only the supplied facts and the limited recorded role-preview results above. It provides no fresh-member pass, recovery attestation, or launch acceptance.

If further verification is authorized later, first obtain a redacted permissions/settings inventory and human attestations for ownership, recovery, moderation, and invite handling. Then use a fresh human-operated non-privileged account to test member boundaries, screening, forum enforcement, and reporting routes. Any test invite requires separate explicit approval and human-only handling. Current official documentation is needed before relying on exact UI labels or behavior.

Review after those checks and before expanding beyond the invited beta. No live test, invite, integration, event, or server change was performed. The only output created is `audit.md`; supplied input files remain unchanged. Type-check and lint are not applicable to this standalone Markdown audit; no project checker configuration is supplied.
