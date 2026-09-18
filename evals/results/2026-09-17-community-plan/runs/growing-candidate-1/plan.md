# Tideway community improvement plan

**DRAFT — UNAPPROVED. No configuration or live action is authorized.**

## Purpose and evidence

Help members navigate, get help, and contribute within a small team's capacity. Improve the existing channels before adding more.

This draft uses only the fictional project facts in `packet.md`, dated 2026-09-17. The local community skill and its references supply the planning method. The packet reports misplaced SDK questions, unanswered dashboard posts, and unclear issue handoffs. These support a routing and triage trial, not a channel expansion.

Community enabled is a fixed planning assumption. No server inspection, member test, endpoint check, current documentation research, or comparison with other communities occurred. Exact Discord labels and behavior remain unverified. Reported permissions describe intentions, not effective access. No response SLA exists. Proposed routines are not measured workload or service guarantees.

This public copy uses fictional role jobs. Operator assignments and private operating details are omitted.

## Member journeys

| Journey | Entry and next action | Durable destination | Proposed human job |
| --- | --- | --- | --- |
| Arrive and orient | Read `#start`; choose SDK integration, dashboard use, or contribution guidance. Read the relevant guide before posting. | [Docs](https://tideway.example/docs), [SDK quickstart](https://tideway.example/docs/sdk/quickstart), [dashboard guide](https://tideway.example/docs/dashboard) | Community steward maintains the route map during existing operations time. Orientation should not require a staff reply. |
| Get help or report a bug | Search the matching help forum. Open one purpose-tagged post with a sanitized reproduction if no answer fits. | Useful answers become docs pull requests. Confirmed bugs use the [bug template](https://code.example/tideway/core/issues/new?template=bug). Link the issue back to the discussion. | Support triage steward checks unanswered posts in a bounded review. Product maintainers investigate as available. No reply deadline is promised. |
| Contribute or share feedback | Clarify an idea in `#ideas`, or follow the contribution guide for a docs or code change. Join the existing docs clinic if useful. | [Proposal template](https://code.example/tideway/core/issues/new?template=proposal), [contribution guide](https://code.example/tideway/core/blob/main/CONTRIBUTING.md), and pull requests. Decisions stay on issues. | Product maintainers review proposals as available. Docs-clinic host helps turn reusable answers and clinic notes into docs pull requests. |

## Smallest useful structure

Keep the existing public channels and their content. No channel creation, deletion, split, merge, or recreation is proposed.

| Existing channel | Job and proposed improvement |
| --- | --- |
| `#start` — read-only | Replace the channel-only list with the three journeys, canonical links, and the discussion-to-issue steps below. |
| `#announcements` — read-only | Keep curated release context when releases ship. Link the [release record](https://code.example/tideway/core/releases). No regular publishing cadence is promised. |
| `#general` — text | Keep conversation and introductions. Add a short routing note pointing technical questions to the matching help forum. |
| `#sdk-help` — forum | Keep SDK purpose tags. Propose requiring a purpose tag on each post. Keep `Resolved` moderator-only. |
| `#dashboard-help` — forum | Keep dashboard purpose tags. Use the same support template and proposed purpose-tag requirement. Keep `Resolved` moderator-only. |
| `#ideas` — forum | Keep SDK, dashboard, and docs purpose tags. Propose requiring one purpose tag. Keep `Planned` and `Shipped` moderator-only. Link consequential work to issues. |
| `#docs-clinic` — optional voice | Preserve the existing monthly docs clinic. Voice remains optional; asynchronous docs contributions remain available. |

Proposed default navigation highlights `#start`, `#announcements`, `#general`, both help forums, and `#ideas`. Avoid requiring an interest selection to find basic help. Optional product-interest questions may personalize navigation after joining. They must not grant privileges.

Use the existing read-only `#start` as the proposed backing resource for public quick links if Server Guide behavior permits. Verify that behavior before any later change. If it cannot serve both jobs cleanly, retain the normal channel and pin; defer the Guide change rather than create another channel.

Three starter tasks:

1. Read `#start` and open the guide for the product surface you use.
2. Search the relevant help forum; ask a purpose-tagged question only if needed.
3. Read the contribution guide, then share a scoped idea or prepare a docs pull request.

## Draft member-facing copy

### Welcome and routing

> Tideway builds a stream-ingestion SDK and a dashboard. Ask SDK integration questions in `#sdk-help` and dashboard questions in `#dashboard-help`. Use `#general` for conversation and `#ideas` for product or documentation ideas.
>
> Discord helps us diagnose and discuss. Confirmed bugs belong in the bug tracker. Product proposals and decisions belong on issues. Docs and code changes use pull requests. Link the durable record back to the discussion so others can follow it.
>
> Search before opening a new post. Include the product version, environment, expected result, observed result, and a small sanitized reproduction. Do not post credentials, customer data, personal data, or private logs.
>
> Help is provided as capacity allows. There is no response SLA. You can contribute asynchronously or attend the optional monthly docs clinic on the first Thursday at 16:00 UTC. The clinic is canceled when its host is unavailable.

### Support template

- Product surface and package/build version:
- Runtime and relevant environment:
- Expected result:
- Observed result and sanitized error:
- Minimal sanitized reproduction:
- What you already tried:
- Related documentation, discussion, or issue:

Choose the existing purpose tag that best matches the question. Remove secrets and sensitive information before posting.

### Discussion-to-issue handoff

1. Clarify whether the post asks for usage help, reports a reproducible defect, or proposes a change.
2. Keep usage help in the forum. Offer a docs pull request for an answer worth preserving.
3. For a confirmed bug, use the bug template with expected and observed behavior and a sanitized reproduction.
4. For a proposal, record the user's goal, impact, and scope in the proposal template.
5. Cross-link the public issue and discussion. Keep later decisions on the issue.
6. Authorized staff update workflow tags only when the recorded outcome supports them. A filed issue alone does not mean a problem is resolved or shipped.

## Sustainable operating routine

These jobs describe proposed responsibilities, not new staffing commitments.

| Job | Bounded work | Capacity rule |
| --- | --- | --- |
| Community and support triage steward | Review unanswered help posts; ask for missing details; offer a durable handoff; keep the route map accurate. | Use existing operations time. Triage acknowledges and routes work; it does not promise an immediate fix. |
| SDK and dashboard maintainers | Assess product-specific reproductions and proposals. | Do not promise coverage that has not been confirmed. Leave ownership gaps explicit. |
| Community moderator | Maintain clear participation boundaries and reduce repeated misrouting. | Use existing moderation capacity. Redirect kindly with a direct forum link instead of duplicating the investigation. |
| Release steward | Post concise context in `#announcements` when releases ship. | Preserve the existing release-triggered practice; no separate release feed or added publishing schedule. |
| Docs-clinic host | Prepare, host, and publish useful outcomes through docs pull requests. | Preserve the first Thursday at 16:00 UTC. Preparation and notes count as event work. Cancel if the host is unavailable; do not assume a backup. |

The first proposed triage pass starts with the existing unanswered dashboard posts. Establish their age, impact, and next step before choosing priority. Do not label them urgent from an unanswered count alone. For misplaced SDK questions, provide one clear redirect and preserve the original context.

Defer new events, bots, recurring digests, release automation, additional channels, and new tag families. The evidence does not establish the capacity or benefit for them.

## Proposed trial, review, and rollback

All steps below require later human approval. None has been applied.

1. Capture the current public copy and forum settings before editing.
2. Update `#start` and the `#general` routing note in place. Add support guidelines to both help forums and issue-handoff guidance to `#ideas`.
3. Verify existing purpose tags and moderated state tags. Require a purpose tag where missing, subject to current capability checks.
4. Run a bounded triage trial without moving or deleting existing discussions.
5. Compare the next fortnight's SDK redirects with the supplied baseline. Track unanswered dashboard posts with age and next action, not count alone. Review whether the work fits the confirmed time available.

Review immediately if triage cannot fit available time, navigation becomes less clear, or posting stops working. Review after the first trial fortnight even if no problem is reported. These triggers come from observed redirects, unanswered posts, and staff load, not member count.

If demand exceeds capacity, defer optional copy work and Guide enhancements first. Make support availability clear and seek an explicit coverage decision before expanding the service. Keep the supported clinic subject to host availability.

Rollback restores the previous copy, navigation selections, or changed tag settings. Preserve discussions and tags already used on posts. If a safe reversal is unclear, stop that change for human review. A triage trial can stop without deleting replies or durable issue links.

## Decisions and verification still needed

- Human approval of this plan and each proposed change.
- Confirmation of owners, support coverage, and the proposed work allocation.
- Current platform capability checks for navigation, tags, and Guide resources.
- A later fresh-member test of orientation, posting, read-only surfaces, and optional voice.
- A later test that the public documentation, issue, contribution, and release routes reach their intended destinations.
- A review of the trial against redirects, unanswered-post age, and available staff time.

Only the local drafts and the input evidence have been reviewed. No live check passed, and no server change was made. This draft ends before configuration.
