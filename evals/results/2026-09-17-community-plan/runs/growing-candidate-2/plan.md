# Tideway community improvement operating plan

**DRAFT — UNAPPROVED.** Prepared 2026-09-17. No configuration or live action is authorized or performed.

## Basis and limits

This public draft uses only the fictional project evidence in `packet.md`, dated 2026-09-17. Local planning references supply the method, not additional project facts. Community enabled is a fixed planning assumption.

The snapshot reports six SDK questions redirected from general discussion in the last fortnight and four unanswered dashboard posts. Their age and severity are unknown. Members report that orientation lists channels without explaining how discussion becomes an issue. Staff workload has not been measured.

These observations support better guidance and triage. They do not establish a need for new channels or a response-time breach. No response SLA exists. Effective permissions, member journeys, current Discord labels, links, and routing remain unverified. No live inspection, comparison-community research, or network checks were performed.

## Outcomes and member journeys

Use existing spaces to help members find the next action and keep lasting work outside chat.

| Journey | Entry and next action | Durable handoff | Proposed response job |
| --- | --- | --- | --- |
| Arrive and orient | Read #start; choose SDK integration, dashboard help, or contribution guidance | SDK quickstart, dashboard guide, contribution guide | Community steward maintains guidance; reading requires no staff response |
| Ask for help or report a bug | Search the relevant help forum; create a purpose-tagged post with a sanitized reproduction if needed | Confirmed bugs become bug issues; reusable answers become docs pull requests | Triage steward checks unanswered posts, asks for missing details, and seeks a relevant maintainer; no guaranteed answer time |
| Contribute or share feedback | Use #ideas with an SDK, dashboard, or docs tag; discuss a goal or propose a docs/code change | Product proposals become issues; docs and code use pull requests; decisions stay on issues | Relevant maintainer reviews when capacity allows; clinic host helps with documentation during the existing clinic |

### Public destinations

- [Documentation](https://tideway.example/docs)
- [SDK quickstart](https://tideway.example/docs/sdk/quickstart)
- [Dashboard guide](https://tideway.example/docs/dashboard)
- [Source repository](https://code.example/tideway/core)
- [Confirmed bug template](https://code.example/tideway/core/issues/new?template=bug)
- [Product proposal template](https://code.example/tideway/core/issues/new?template=proposal)
- [Contribution guide](https://code.example/tideway/core/blob/main/CONTRIBUTING.md)
- [Release record](https://code.example/tideway/core/releases)

These are supplied fictional routes, not tested endpoints. Do not include credentials, customer data, personal data, or confidential material in public posts or issues.

## Capacity before cadence

The following are fictional role jobs, not new appointments. One person may hold several jobs. Availability does not create a response SLA.

| Job | Supplied commitment | Proposed allocation or limit |
| --- | --- | --- |
| Community and dashboard steward | 90 minutes per week, including triage and release context | Estimate: 50 minutes triage, 20 minutes guidance and durable handoffs, 10 minutes review, 10 minutes release context or buffer |
| SDK maintainer | Weekly availability and coverage unknown | Request technical input; do not assign a weekly queue or promise response times |
| Moderation lead | 60 minutes per week for moderation and report intake | Preserve this safety allocation; do not treat it as spare technical support capacity |
| Documentation clinic host | 60 minutes per month for preparation, hosting, and notes | Preserve the existing monthly clinic; no weekly support assignment |

The proposed weekly split is not measured workload. Initial guidance edits must replace work within the steward's budget, not add unpaid capacity. If release context needs more time, reduce optional guidance work first. If the budget is exhausted, stop optional work and leave an honest queue status rather than promise answers.

## Smallest useful channel structure

Preserve channel names, existing discussions, useful tags, and public audiences. No new channels, merges, deletions, or reordering are proposed.

| Existing channel | Job and proposed guidance | Visibility choice |
| --- | --- | --- |
| #start | Read-only orientation, journey map, public links, and explanation of issue/PR handoffs | Default |
| #announcements | Read-only curated context when releases ship; link the release record | Default; no new publishing cadence |
| #general | Conversation and introductions; redirect technical questions with a useful link | Default |
| #sdk-help | SDK integration support; retain existing SDK purpose tags and moderator-only Resolved | Default |
| #dashboard-help | Dashboard questions and defects; retain dashboard purpose tags and moderator-only Resolved | Default |
| #ideas | SDK, dashboard, and docs feedback; retain those purpose tags and moderator-only Planned/Shipped | Default |
| #docs-clinic | Optional voice for the existing documentation clinic | Opt-in |

Require at least one member-selectable purpose tag in each public forum. Existing package-specific tags remain useful; do not invent a larger taxonomy. Members choose the subject, while authorized staff maintain workflow states.

Keep the first improvement focused on #start and forum guidance. A later, separately approved native Onboarding or Server Guide change may reuse #start as a read-only backing resource. Exact capability and rendering checks would come first. Do not add resource channels merely to satisfy a feature checklist.

## Proposed orientation and participation copy

> Tideway provides a stream-ingestion SDK and a dashboard. Start with the SDK quickstart or dashboard guide above. Use #sdk-help for SDK integration and #dashboard-help for dashboard questions. Search first, then choose a purpose tag and describe what you tried.
>
> A confirmed bug belongs in the bug template. Link the issue back to the discussion so others can follow it. Use #ideas to clarify product proposals, then record actionable proposals and decisions on issues. Send docs and code changes as pull requests using the contribution guide. Useful support answers and clinic notes can become docs pull requests.
>
> Help is capacity-limited. There is no guaranteed response time. Keep public posts sanitized. Join the optional docs clinic if you want help improving documentation.

Three starter tasks:

1. Open the quickstart or dashboard guide relevant to your work.
2. Search the matching help forum and read its posting guide.
3. Read the contribution guide; share a docs idea in #ideas or prepare a pull request when ready.

Proposed help template: product surface/package and version; runtime/environment; expected result; observed result and error; minimal sanitized reproduction; what you already tried. Remove credentials, customer data, personal data, and private logs.

Proposed ideas template: SDK/dashboard/docs purpose; user goal; present difficulty; expected benefit; shareable example; related issue or pull request. Discussion does not imply acceptance or a delivery date.

## Bounded support and durable handoffs

During a proposed weekly triage pass, the triage steward would:

1. Inspect the four unanswered dashboard posts first to establish age, impact, and missing information. Their current status is unknown.
2. Scan both help forums for unanswered posts. Prioritize demonstrated impact and age once known.
3. Give a useful first response where possible: a relevant answer, a specific information request, or an honest need for maintainer input.
4. Redirect misplaced SDK questions once, with a direct forum link and the posting template. Preserve the original discussion; avoid repeated scolding or duplicate investigations.
5. Ask the reporter to file a confirmed bug, or offer a sanitized issue draft if time permits. Link the resulting issue back to the forum. An unanswered question is not automatically a confirmed bug.
6. Record useful reusable answers as candidate docs pull requests. Mark Resolved only after a useful outcome or confirmed handoff, not merely to reduce the queue.

Unassigned technical work stays visible as pending. Unknown SDK availability must not become an assumed backup commitment. Peer help is welcome but voluntary.

## Preserve the documentation clinic

Keep the existing first-Thursday clinic at **16:00 UTC**. Voice remains optional. Members may bring documentation questions through #ideas and participate through written proposals or pull requests.

The host has 60 minutes per month total. A proposed split is 10 minutes preparation, 35 minutes hosting, and 15 minutes notes or a docs pull request. It is an estimate, not a longer event commitment. Record outcomes as docs pull requests, with consequential decisions on issues.

No backup host is confirmed. Cancel that occurrence if the host is unavailable. Do not create a replacement event or a weekly office-hours obligation.

## Proposed sequence and reversal

All items below are unapplied and require later approval.

| Order | Proposed improvement | Success evidence after approval | Reversal |
| --- | --- | --- | --- |
| 1 | Revise #start using the journey map and public links | A new member can choose help and identify the issue/PR destination | Restore the prior text and links |
| 2 | Revise public forum templates; preserve purpose tags and staff-only states | Members can post with a purpose tag and cannot set workflow states | Restore prior guidance and tag settings without deleting posts |
| 3 | Pilot the bounded triage pass | Dashboard post age/impact becomes known; useful responses and durable handoffs are recorded | End the pilot and revise the duty allocation; preserve answers and issue links |
| 4 | Preserve clinic and release context within existing commitments | Clinic outcomes use docs PRs; release context links release records | Restore prior descriptions if edited; do not remove outcomes |

Any later configuration would first need approval, a responsible human, and a record of the prior settings. Optional native onboarding refinements remain deferred until capability and capacity are confirmed.

## Review and workload controls

Review after two weeks of an approved pilot, or sooner if the weekly budget is exceeded. This matches the supplied fortnight of redirects rather than an arbitrary membership target.

Within the existing review allocation, collect only aggregate counts: SDK redirects from #general, unanswered dashboard posts, age of unanswered posts, useful responses, durable handoffs, and minutes spent by duty. Establish ages and workload at the first pass; no historical values are available.

Proposed decision thresholds:

- If SDK redirects remain at six or more per fortnight, ask which part of #start or the forum guide was unclear before considering channels.
- If the unanswered dashboard queue remains at four or grows, or the oldest post ages across two passes, narrow scope or seek explicit capacity rather than promise faster answers.
- If community operations exceed 90 minutes in a week, cut optional guidance work and reassess the triage allocation. Preserve the separate moderation commitment.
- A lower queue count alone is not success. Check that members received a useful answer or a durable handoff, rather than closing or relocating posts to improve the count.

Defer new events, bots, automated release feeds, new channels, expanded tags, and recurring publishing. The packet supplies neither capacity nor evidence for them.

## Open decisions and draft boundary

- Confirm acceptance of the proposed duty split and one-time editing effort.
- Establish SDK coverage and any clinic backup without inventing commitments.
- Determine the age and impact of unanswered dashboard posts.
- Confirm the public guidance, forum behavior, and member experience through later authorized checks.
- Approve specific changes and their reversal records before configuration.

This document is a sanitized public draft. Only document preparation is complete. The operating plan remains unapproved, and no server changes or live tests have occurred.
