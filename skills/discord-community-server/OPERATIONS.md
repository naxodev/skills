# Discord community operations reference

Read this reference for private cohorts, forums, Server Guide resources, community assets, recurring events, or channel reordering. Verify current Discord labels and capabilities in official documentation before relying on exact UI behavior.

## Required invariants

### Control cohort access

- Require explicit human approval before creating any invite. Do not create or publish public invites in this workflow.
- Have the human capability-check whether the invite dialog exposes an optional role-assignment field. When available, assign one low-privilege cohort-access role. Otherwise, have staff assign the role after the member joins.
- Assign only access roles through invites. Keep Admin, Moderator, Maintainer, and relationship or status roles staff-assigned.
- Keep confidential access out of normal onboarding and self-assignable interest roles.
- Bound each cohort invite by expiry and use count. Use a separate invite per cohort and revoke it after onboarding.
- Keep temporary membership disabled when participants need persistent access.
- Verify existing-member behavior instead of assuming it. Current Discord behavior can vary by capability or client; check whether the role was applied and assign it directly when absent.
- Keep invite URLs outside automation, logs, files, and screenshots. The human opens the invite UI, configures the options, generates the URL, and copies it privately. Automation records only human-attested non-secret settings.

### Isolate private program areas

- Deny `@everyone` visibility at the private category. Treat any additional Member role as extra defense, not the default boundary. Allow the cohort-access role and explicit operational roles.
- Use explicit permissions instead of `Administrator`.
- Make the start channel read-only for participant and relationship roles. Deny Send Messages, Send Messages in Threads, Create Public Threads, Create Private Threads, Create Polls, and Create Instant Invite. Allow approved operational roles to post. Grant Manage Messages on that channel only to operational roles that must pin content.
- Review effective access for members who hold multiple roles. Channel overwrites must remain safe under the combined permission set.
- Preserve a public feedback path when it serves non-confidential discussion. Keep unreleased or confidential feedback in the private forum.

### Make forum state trustworthy

- Enable Require Tag on every feedback-like forum. Keep all member-selectable tags within its purpose, package, or domain taxonomy, and keep workflow-state tags moderated. A private forum that must guarantee purpose selection should not offer unrelated member-selectable tags.
- Ask for build or package versions, context, expected and observed behavior, and a reproduction or demo.
- Forbid credentials, customer data, private logs, and redistribution of confidential material.
- Move confirmed bugs and consequential work to the durable system of record. Route security details to the private security-reporting path.
- Preserve useful package-specific help tags in existing public forums. Add broader domain or integration tags only when they improve routing.
- Keep resolved or shipped workflow tags moderator-only. Require at least one member-selectable purpose, package, or domain tag in support, bug, feedback, and showcase forums.
- Document custom emoji meanings in a pinned welcome message before mapping them to tags. Apply each meaning consistently.

### Publish external links through Server Guide resources

- Treat Get Started tasks as channel-oriented. Put canonical external links in a read-only backing resource channel instead of expecting arbitrary external-link buttons.
- Pin one compact quick-links message for the live product, documentation, and source repository. Grant Manage Messages only to the operational roles that pin it. Verify that every link renders in the Server Guide resource page.
- Keep confidential cohort resources out of the global guide. Put cohort onboarding in the role-gated start channel.

### Build assets from canonical brand sources

- Resolve the current brand from canonical source files before creating community assets. Treat old exports and social images as untrusted caches.
- Review generated assets one at a time before upload. Prefer one coherent visual vocabulary over repeating the logo everywhere.
- Preserve approved raster exports and native SVG counterparts. SVG files must contain vector geometry and gradients only, with no embedded images, base64, data URIs, or external resources.
- Render SVGs and compare them with approved raster exports before declaring parity.
- Reuse the real implementation for animated or live product visuals, or render a still from it. Prefer this over a generic approximation.
- Store canonical community assets in a managed shared asset store. Task trackers may link previews and reviews, but must not be the only canonical store.

### Keep operations durable

- Keep the project's durable systems authoritative for confirmed bugs, releases, and consequential work.
- Apply recurring-event artwork and event updates to the full series. Verify the live result at Discord crop sizes.
- Follow the secret-safe webhook procedure in `<skill-root>/REFERENCE.md` after any credential exposure: revoke first, replace, update, test with synthetic data, delete the test message, and remove temporary copies.

## Optional defaults

These are starting points, not required names or taxonomies.

### Minimal private program

When Community is enabled, start with one private category containing:

- One read-only orientation channel
- One private feedback forum

When Community stays disabled, replace the forum with one private feedback text channel and do not claim tag enforcement. Add private chat, private release feeds, or more channels only after traffic proves the need.

A generic private feedback taxonomy can use purpose tags for API, UX, documentation, voice, and bugs or reliability. A small moderator-only state set can use Triaged, Planned, and Shipped.

### Existing public forums

- Help forums can keep package-specific tags, add missing domain or integration tags, require one tag, and reserve Resolved for moderators.
- Showcase forums can use domain tags plus a moderator-only Shipped tag. Ask what was built, how the product is used, relevant versions, and a demo or source link when shareable.
- Optional branded emoji can reinforce product surfaces, documentation or plans, runtime behavior, voice, and completed work. The written meaning remains authoritative.

## UI-specific troubleshooting

- **Role-assigned invites:** the optional role field may not exist in every server or client. Have the human capability-check it and use manual assignment when absent.
- **Existing members:** after an existing member accepts a role-assigned invite, inspect their roles and assign the access role directly only when it is absent.
- **Channel reordering:** Discord may block drag-and-drop while Show All Channels is off. Enable it before reordering. Preserve content by avoiding move-and-recreate workarounds.
- **Distinct forum audiences:** create a separate role-gated forum instead of moving an established public forum into a private area.
- **Server Guide resources:** an empty or busy channel selector can obscure the current backing channel. Confirm the selected resource before saving so an edit does not replace it accidentally.
