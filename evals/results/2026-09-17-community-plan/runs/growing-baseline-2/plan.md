# Tideway community improvement plan

**Public draft — unapproved. Prepared 2026-09-17. No configuration or live action is authorized.**

## Purpose and evidence

Help members find the right place, get useful help, and contribute within the team's available time.

The sole project evidence is the fictional snapshot in `packet.md`, dated 2026-09-17. It describes about 180 members, a stream-ingestion SDK, and a dashboard. Community enabled is a fixed planning assumption.

In the last fortnight, staff redirected six SDK questions from `#general`. Four dashboard posts were unanswered at snapshot time. Their age and severity are unknown. Members report that `#start` lists channels without explaining how discussion becomes an issue. These observations support clearer guidance and a bounded review of unanswered questions. They do not establish a response-time baseline or justify more channels.

This is an offline proposal. Effective permissions, current Discord labels, links, member journeys, and workload have not been verified. No comparable communities or current platform documentation were inspected. All targets below are proposed review criteria, not measured results or response promises.

## Keep the existing member spaces

Preserve existing posts, links, forum history, and channel names. Each existing space has a distinct job:

| Space | Member job | Proposed improvement |
| --- | --- | --- |
| `#start` | Find a first action and the right route | Replace the channel-only list with the short journey below and canonical links. Keep it read-only. |
| `#announcements` | Understand changes when releases ship | Keep release context linked to the release record. Keep it read-only. |
| `#general` | Talk, introduce yourself, and share what you built | Use one friendly redirect to the matching help forum when a question needs diagnosis. |
| `#sdk-help` | Get SDK integration help | Preserve SDK purpose tags; improve the post template and review unanswered questions. |
| `#dashboard-help` | Get dashboard help | Preserve dashboard purpose tags; review the four unanswered posts first. |
| `#ideas` | Explain an SDK, dashboard, or docs improvement | Preserve purpose tags and link actionable proposals to their durable record. |
| Optional voice `#docs-clinic` | Work together on documentation | Preserve the supported monthly clinic and offer a text contribution path. |

Proposed default orientation: `#start`, `#announcements`, and `#general`. Make both help forums and `#ideas` easy to find from `#start`. Product interests may personalize navigation after joining; they must not grant privileged access. Voice remains opt-in. Exact Onboarding and Server Guide behavior needs later verification. Use the existing read-only `#start` as the proposed backing resource for public links if the platform supports the intended presentation.

## Draft member journey

Suggested `#start` text for later review:

> Tideway has a stream-ingestion SDK and a dashboard. Start with the SDK quickstart or dashboard guide below.
>
> Ask SDK integration questions in `#sdk-help` and dashboard questions in `#dashboard-help`. Search for an existing answer first. Choose a product-purpose tag and use the support template. Community help is best effort; there is no guaranteed response time.
>
> Discuss improvements in `#ideas`. Once a bug is confirmed, open a bug issue and link it back to the discussion. Turn an actionable idea into a proposal. Keep decisions on the issue. Reusable support answers and clinic notes can become documentation pull requests.
>
> Introduce yourself or share a small project in `#general`. Join the optional docs clinic or contribute through a pull request at your own pace. Remove secrets, customer data, and private logs before posting.

Three starter tasks:

1. Read the guide for your product surface from `#start`.
2. Find a relevant help thread; ask a focused question or add a useful answer if you can.
3. Share your goal in `#general`, suggest a docs improvement in `#ideas`, or follow the contribution guide for a pull request.

Participation is optional. Members do not need to attend voice sessions or answer other members to receive help.

### Public routes

These fictional destinations are supplied by the packet and remain untested.

| Need | Durable destination |
| --- | --- |
| Documentation | https://tideway.example/docs |
| SDK quickstart | https://tideway.example/docs/sdk/quickstart |
| Dashboard guide | https://tideway.example/docs/dashboard |
| Source | https://code.example/tideway/core |
| Confirmed bug | https://code.example/tideway/core/issues/new?template=bug |
| Product proposal | https://code.example/tideway/core/issues/new?template=proposal |
| Docs or code contribution | Pull request using https://code.example/tideway/core/blob/main/CONTRIBUTING.md |
| Release record | https://code.example/tideway/core/releases |

## Help that fits available capacity

The fictional role jobs below describe responsibilities, not new staffing commitments.

| Role job | Bounded responsibility |
| --- | --- |
| Community steward | Review routing, prioritize unanswered help, and maintain concise guidance within existing operations time. |
| Product maintainer | Assess confirmed bugs and proposals through durable product workflows. Additional community coverage requires a separate capacity agreement. |
| Safety moderator | Maintain participation standards within the existing moderation commitment. |
| Documentation clinic host | Prepare, host, and record the existing monthly clinic within its current time allowance. |
| Community contributor | Voluntarily answer a question, improve a reproduction, share a project, or submit a docs pull request. |

Proposed help routine, after approval:

1. In a bounded weekly review, start with unanswered posts across both help forums. Establish the age and impact of the four dashboard posts before prioritizing them.
2. Ask once for missing reproduction details. Distinguish a helpful answer from a simple acknowledgment.
3. Prioritize by impact and age once known. Record the next step: needs author details, community answer welcome, confirmed bug, or reusable docs candidate. Use replies rather than adding new workflow tags.
4. Route confirmed work to an issue or pull request and link back. A linked issue does not mean the underlying problem is resolved.
5. Reserve `Resolved` for moderator-applied resolution. Keep `Planned` and `Shipped` in `#ideas` staff-controlled and tied to durable evidence.
6. When the time allowance ends, defer remaining work visibly and carry it to the next review. Do not promise a deadline or depend on an unconfirmed backup.

Suggested help template:

> Product surface and version/build:
> Runtime and relevant environment:
> Expected result:
> Observed result and exact error, sanitized:
> Minimal reproduction or shareable code:
> What I already tried:
> Relevant existing issue or docs link:
>
> Choose a purpose tag. Remove credentials, personal data, customer data, and private logs.

Suggested redirect: “This looks like an SDK integration question. Please use `#sdk-help` with your version and a sanitized reproduction so answers stay discoverable.” Preserve the original discussion and link the follow-up rather than recreating history.

## Participation and durable learning

Keep the docs clinic on the **first Thursday at 16:00 UTC**. The existing host's total allowance includes preparation, hosting, and notes. Cancel the session if the host is unavailable; no backup is confirmed. Voice is optional. Members can suggest docs topics in `#ideas` or contribute through a pull request without attending.

Keep the clinic focused on one small documentation problem. Capture a reusable answer as a docs pull request, with any remaining work clearly marked. Product decisions belong on issues. Do not add events, bots, or a recurring publishing schedule without evidence of need and confirmed capacity.

Release context stays in `#announcements` when releases ship, linked to the release record. No regular release cadence is promised. A project share in `#general` can use a simple format: goal, SDK or dashboard used, shareable link, lesson learned, and question for others.

## Proposed trial and review

The trial clock starts only after a human approves a later implementation plan. Work replaces lower-priority operations work within existing capacity; it does not add recurring commitments.

| Stage | Proposed work | Acceptance and fallback |
| --- | --- | --- |
| First available operations window | Capture the starting counts and revise `#start` and help guidance | A new member can identify a help route and an issue route. Restore the prior text if guidance misroutes members. |
| Following windows | Review unanswered help and preserve the monthly clinic | Record a next step within available time; defer excess work rather than promising coverage. |
| Two weeks after rollout | Review navigation and help trends | Compare equivalent windows; revise guidance before considering structural changes. |
| Four weeks after rollout | Decide whether to retain, simplify, or stop the trial | Keep only practices that fit confirmed capacity and improve member outcomes. |

Collect only lightweight aggregate measures during existing review time:

- SDK questions redirected from `#general` per fortnight; supplied comparison point: six. A lower count is useful only alongside overall question volume.
- Unanswered posts by forum, with age bands under seven days and seven days or older. Initial dashboard count: four; ages and SDK count are unknown.
- Posts receiving a useful answer, and posts with a clear next step. Do not count acknowledgments as answers.
- Useful discussions handed off to issues or docs pull requests; count only actual handoffs.
- Time spent against the agreed allowance, plus whether the clinic fit its monthly allowance or was canceled.

Proposed success means clearer routing, fewer neglected questions relative to volume, useful durable handoffs, and work staying within capacity. Small counts cannot prove causation. If unanswered work grows across two reviews or time exceeds the allowance, reduce optional content work and narrow triage scope. Revisit the plan before expanding channels or commitments.

## Draft boundary

Approval is pending. These are proposed edits and operating practices, not applied settings or verified outcomes. Live member testing and human approval are required before any later rollout. This document ends at planning.
