# Discord community server verification

Run this matrix in step 8 of the workflow. Classify each result as passed, failed, not applicable, or untested. An untested check never counts as passed. The labels identify who or what can prove the result.

## Member view

- **Human attestation:** A fresh non-privileged account joins through a single-use, short-lived test invite whose URL stayed outside automation.
- **Human attestation:** The consumed single-use test invite rejects a second use.
- **Role preview:** Staff and conduct channels are invisible.
- **Role preview:** Unselected opt-in channels are invisible.
- **Real member:** With only `@everyone` and any baseline Member role, the private category, start channel, and feedback surface are hidden.
- **Real member:** With the cohort role, the private start channel and feedback forum are visible.
- **Real member:** Read-only channels reject messages, replies in existing threads, public and private thread creation, polls, and invite creation.
- **Real member:** When the plan disables member-created invites, a default member cannot create one anywhere in the server.
- **Real member:** Members cannot manage roles or webhooks.
- **Real member:** Default channels are useful and not noisy.
- **Real member:** Forum tags and guidelines are visible.
- **Real member:** Voice and other opt-in boundaries behave as planned.
- **Real member:** Every published support, bug, security, conduct, release, and other durable-route link opens the intended destination without exposing credentials or invite URLs.

## Onboarding

When Community is enabled:

- **Human attestation:** Every planned forum, announcement channel, Rules Screening flow, Onboarding flow, and Server Guide resource has Community enabled as its prerequisite.
- **Real member:** Rules Screening appears for a new member.
- **Real member:** Every required question has a valid answer.
- **Real member:** Interest answers grant only intended roles and channels, never confidential-access or relationship roles.
- **Real member:** Starter tasks point to real, accessible destinations.
- **Real member:** The Server Guide has no dead resources.
- **Real member:** Canonical external links render from their read-only backing resource channel.
- **Role preview:** Global guide resources expose no confidential cohort content.

When Community is disabled:

- **Role preview:** Community-only checks are marked not applicable.
- **Real member:** Read-only text-channel fallbacks cover each planned job without claiming forum tags, announcements, Rules Screening, Onboarding, or Server Guide behavior.

## Cohort access

- **Real member:** When role assignment is available, the first truly new member using a cohort invite receives only the cohort-access role.
- **Human attestation:** For an existing member, staff verify the role after invite acceptance and assign it directly when absent. Do not assume either behavior without checking the current server and client.
- **Human attestation:** When role assignment is unavailable, staff assign the cohort-access role after the member joins.

## Admin

- **Role preview:** Admin has only the explicit configuration permissions in the operating plan and never has `Administrator`.
- **Human attestation:** Admin can perform approved recovery and configuration actions.
- **Role preview:** Admin cannot transfer ownership or access unrelated private product work.

## Moderator

- **Human attestation:** A synthetic non-credential match reaches the private moderation channel.
- **Human attestation:** A synthetic credential-like string is blocked, the sender sees the revocation warning, and the matched content does not appear in the alert channel.
- **Human attestation:** Moderators can apply the intended safety actions.
- **Role preview:** Moderators cannot configure integrations or unrelated roles.
- **Human attestation:** Audit events identify the acting account.
- **Human attestation:** A recusal and backup path exists for conduct reports.

## Maintainer, contributor, partner, and interest roles

- **Role preview:** Maintainers can guide the community without bans, integration management, or server configuration unless separately approved.
- **Role preview:** Contributors and partners can access only their explicit collaboration areas.
- **Role preview:** Interest roles grant only intended product channels or notifications and no privileged permission.

## Role combinations and bots

- **Role preview:** Relevant multi-role combinations do not reveal additional staff, conduct, or opt-in areas beyond the approved union.
- **Role preview:** Cohort and relationship roles remain read-only in the private start channel while approved operational roles can post and pin.
- **Role preview:** Each bot role has only required channel and action permissions, sits below human Admin and Moderator roles, and never has `Administrator`.
- **Human attestation:** A bot that assigns roles can assign only approved lower roles without gaining broader access.

## Forum workflow

- **Real member:** Every support, bug, feedback, and showcase forum requires at least one member-selectable purpose, package, or domain tag before post creation.
- **Real member:** A participant cannot apply moderator-only workflow-state tags.
- **Human attestation:** Staff can apply the planned workflow states and link durable work.
- **Human attestation:** Security details use the private reporting route, not a forum.
- **Human attestation:** End-to-end test content is removed after verification.

## Integrations

- **Role preview:** Each integration can access only intended channels.
- **Human attestation:** Release notifications fire only for intended release events and actions.
- **Human attestation:** Test messages and temporary webhooks are removed.
- **Human attestation:** Webhook handling stayed outside automation, and credentials are absent from logs, files, screenshots, and chat.
- **Human attestation:** The private project state names an owner and removal path.

## Recovery

- **Human attestation:** The owner account has MFA and recovery material stored outside automation.
- **Human attestation:** A second human can recover server operations.
- **Human attestation:** No shared account exists.
- **Role preview:** Role hierarchy allows the backup Admin to manage required bot roles.
- **Human attestation:** The conduct and security routes work without Discord access.

## Assets and events

- **Human attestation:** Community assets derive from current canonical brand sources and were reviewed one at a time.
- **Human attestation:** Approved raster exports and native SVG counterparts are preserved in the managed asset store.
- **Human attestation:** SVG files contain no embedded images, base64, data URIs, or external resources, and rendered parity was checked.
- **Human attestation:** Live-product visuals reuse the real implementation or a still rendered from it when available.
- **Human attestation:** Recurring-event artwork and updates apply to the full series and were verified live at Discord crop sizes.

## Launch

- **Real member:** Seed content and templates exist for every community job in the approved plan, without forcing unplanned channels.
- **Human attestation:** The first recurring event has a host.
- **Human attestation:** Every invite had explicit approval, bounded expiry, and bounded uses.
- **Human attestation:** Role-assigned invites grant only a low-privilege access role; the manual fallback grants the same role after joining.
- **Human attestation:** Temporary membership is disabled when participants need persistent access.
- **Human attestation:** Existing-member role behavior was verified rather than assumed, and completed cohort invites were revoked after onboarding.
- **Human attestation:** A human opened the invite UI, configured the options, generated the URL, and copied it outside automation.
- **Human attestation:** A review date is scheduled after the first cohort joins.
