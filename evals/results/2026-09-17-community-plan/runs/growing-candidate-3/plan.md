# Tideway community improvement plan

**DRAFT — UNAPPROVED.** No configuration or live action is authorized. All changes below are proposals.

## Evidence and goal

This plan uses only the fictional `packet.md` snapshot dated 2026-09-17. Tideway maintains a stream-ingestion SDK and a dashboard. About 180 members use the community for integration help, dashboard defects, and documentation contributions.

The snapshot reports six SDK questions redirected from `#general` in the last fortnight and four unanswered dashboard posts. Their age and severity are unknown. Members say `#start` lists channels without explaining how discussions become issues. These observations support better navigation and triage. They do not establish that more channels would help.

Community enabled is a fixed planning assumption. Effective permissions, current Discord labels, routing, and member behavior are unverified. No live inspection, external research, or comparable-community review occurred. Proposed time allocations are estimates, not measured workload or response promises.

## Member journeys

| Journey | Entry and next action | Durable handoff | Proposed human job |
| --- | --- | --- | --- |
| Arrive and orient | Read `#start`; choose SDK help, dashboard help, or contribution guidance | [Docs](https://tideway.example/docs), [SDK quickstart](https://tideway.example/docs/sdk/quickstart), or [dashboard guide](https://tideway.example/docs/dashboard) | Community steward maintains one compact orientation message; members can use it without waiting for staff |
| Ask for help or report a bug | Search the relevant help forum; post a purpose-tagged question with a sanitized reproduction | Confirmed bugs use the [bug template](https://code.example/tideway/core/issues/new?template=bug); reusable answers become docs pull requests | Support triager checks unanswered posts and routes technical questions; a reply or fix has no promised deadline |
| Contribute or share feedback | Discuss SDK, dashboard, or docs ideas in `#ideas`; follow the contribution guide for actionable changes | Product ideas use the [proposal template](https://code.example/tideway/core/issues/new?template=proposal); code and docs use pull requests; decisions stay on issues | Relevant maintainer reviews when available; docs-clinic host helps with scoped documentation work |

## Capacity before channel choices

These are fictional role jobs, not new staffing positions. One person may hold several jobs. All allocations below require approval.

| Job | Supplied capacity or commitment | Proposed operating limit |
| --- | --- | --- |
| Community steward, dashboard triager, release communicator | A shared 90 minutes each week | Estimate: 50 minutes for support triage, 20 for navigation and durable handoffs, 20 for release context and queue review. Keep the total within 90 minutes; release work displaces lower-priority improvements |
| Moderator and conduct lead | A shared 60 minutes each week | Estimate: 45 minutes for safety and intake, 15 for review. Active cases take priority over routine review |
| SDK maintainer | Availability unknown | Request technical review when needed; do not promise a standing support rotation |
| Docs-clinic host | 60 minutes each month for preparation, hosting, and notes; no weekly support commitment | Estimate: 15 minutes preparation, 30 minutes clinic, 15 minutes notes. Preserve the existing monthly commitment |

There is no response SLA. Triage means checking context, impact, and routing; it does not promise resolution. The four unanswered dashboard posts receive the first proposed triage pass. Ask for age, version, impact, and reproduction before ranking them. Do not label them urgent or resolved without evidence.

At the proposed weekly triage pass, check both help forums for unanswered questions. Ask for missing information and link existing answers. Invite the author to create a confirmed bug report; a maintainer may help when capacity permits. Link the issue back to the discussion. An issue handoff alone does not mean a problem is resolved.

When the time budget is exhausted, leave a clear pending status in the discussion. Defer optional improvements rather than silently creating an after-hours commitment. Do not transfer weekly support work to the clinic host.

## Smallest useful channel structure

Preserve existing channels and history. No channel creation, deletion, merging, or conversion is proposed.

| Existing channel | Member job and proposed improvement | Destination for lasting work |
| --- | --- | --- |
| `#start`, read-only | Replace the channel list with the three journeys, quick links, support expectations, and starter tasks | Docs and contribution guide |
| `#announcements`, read-only | Continue release context when releases ship; include the canonical release link | [Releases](https://code.example/tideway/core/releases) |
| `#general`, text | Conversation, introductions, and informal sharing; add a short pointer to the help forums | Relevant forum, then docs, issue, or pull request |
| `#sdk-help`, forum | SDK integration questions; retain existing SDK purpose tags | Bug issues and reusable docs answers |
| `#dashboard-help`, forum | Dashboard questions and defects; retain dashboard purpose tags | Bug issues and reusable docs answers |
| `#ideas`, forum | SDK, dashboard, and docs feedback | Proposal issues and pull requests |
| `#docs-clinic`, optional voice | Existing monthly docs clinic; voice participation remains optional | Docs pull requests and issue-linked decisions |

Keep at least one member-selectable purpose tag required in each forum. Retain moderator-only `Resolved` in help forums and `Planned`/`Shipped` in `#ideas`. Exact existing tag names and enforcement require later verification. Do not add generic workflow tags members can apply themselves.

Proposed default navigation includes `#start`, `#announcements`, `#general`, both help forums, and `#ideas`. Keep voice opt-in. Optional post-join SDK/dashboard/docs interests may personalize navigation, but must not grant authority. Do not add required interest questions merely to create activity.

If Server Guide is later used, reuse read-only `#start` for public quick links rather than creating another resource channel. Its current setup and suitability remain unverified.

## Draft member-facing content

### Orientation

> Tideway provides a stream-ingestion SDK and a dashboard. Start with the SDK quickstart or dashboard guide. Ask integration questions in `#sdk-help` and dashboard questions in `#dashboard-help`. Search before posting, then choose a purpose tag.
>
> Discuss product or documentation ideas in `#ideas`. Confirmed bugs become bug issues; product proposals become proposal issues. Code and docs contributions use pull requests. Keep decisions on issues and link them back to the discussion. Community replies depend on availability; there is no response deadline.

Three proposed starter tasks:

1. Read the quick links and participation guidance in `#start`.
2. Open the relevant help forum and read its posting guidance. Posting is optional.
3. Browse `#ideas` and the [contribution guide](https://code.example/tideway/core/blob/main/CONTRIBUTING.md); choose a small contribution if useful.

Include the [source repository](https://code.example/tideway/core) with the docs and release links. Do not require introductions or unnecessary posts to finish orientation.

### Help and feedback template

- Product surface, SDK package or dashboard version/build.
- Runtime and relevant environment.
- Goal and expected result.
- Observed result and sanitized error.
- Minimal reproduction and what you already tried.
- Relevant documentation or issue link, if one exists.

Remove credentials, personal information, customer data, and private logs before posting. Use only material approved for public sharing. For ideas, explain the user problem and expected benefit. Useful answers and clinic notes can become docs pull requests; a Discord discussion is not the permanent decision record.

## Preserve supported participation

Keep the docs clinic on the **first Thursday at 16:00 UTC**. The existing host's monthly budget includes preparation and notes. No backup host is confirmed. Cancel that occurrence if the host is unavailable. Do not silently substitute a new host or expand the cadence.

Proposed clinic work: clarify one quickstart gap, improve one dashboard explanation, or review one small docs contribution. Members can submit a docs idea asynchronously in `#ideas` or a pull request without joining voice. Notes become docs pull requests; decisions remain on linked issues.

Continue release context in `#announcements` when releases ship, within the shared community budget. No regular release schedule is promised. Defer new events, separate release feeds, automation, additional recurring publishing, and channel expansion because capacity is not supplied. Branding stays unchanged.

## Proposed change sequence and rollback

Every item is **unapproved and unapplied**.

| Change | Proposed role job | Acceptance evidence after separate authorization | Rollback |
| --- | --- | --- | --- |
| Improve `#start` and the help pointer in `#general` | Community steward | A new member can find the correct help forum and explain the issue handoff | Restore the prior text and pins; preserve discussions |
| Improve forum guidance; retain purpose and moderated state tags | Support triager with moderator | Member posting requires a purpose tag and cannot set workflow state | Restore recorded prior guidance/settings; do not delete posts or tags with history |
| Trial bounded triage of the existing unanswered queue | Dashboard triager with SDK review when available | Record unanswered age, handoffs, and time used | Stop the proposed cadence if unsustainable; keep useful replies and issue links |
| Clarify the existing clinic and release guidance | Docs-clinic host and release communicator | Confirm the clinic host and time; check public notes and release destinations | Restore previous descriptions; preserve the monthly commitment and cancel unavailable occurrences |

Before any future edit, record the relevant previous content and settings. Review the plan and available time first. A draft is not permission to perform these changes or their verification actions.

## Review by observed need

At the next proposed weekly triage pass, record the age and context of the four unanswered dashboard posts and the time spent. After two proposed weekly passes, compare SDK redirects against the supplied six-per-fortnight baseline and check whether unanswered posts received a useful next step. Counts are signals, not service targets; the sample is small and traffic may differ.

Review sooner if questions remain without a next step across both passes or work reaches the time budget. Simplify guidance or reduce optional work first. Consider more channels only if repeated misrouting remains after guidance improves and an owner has capacity. Member count alone is not a trigger.

## Approval and evidence limits

The human owner must review the proposed allocations, unresolved coverage, and change scope before implementation. SDK availability, emergency coverage, clinic backup, actual workload, and response times remain unknown. This document creates no staffing commitment.

Only consistency with the supplied snapshot has been reviewed offline. No permission test, fresh-member test, route opening, onboarding test, event check, or live action has occurred. Both this public draft and the separate private operating draft remain **unapproved**.
