# Tideway community improvement operating plan

**Public draft — unapproved — 2026-09-17.** No configuration or live action is authorized. All changes below are proposals.

## Purpose and evidence

Help Tideway's roughly 180 members find SDK and dashboard help, turn useful discussions into durable work, and contribute within existing team capacity.

Project evidence comes only from `packet.md`, a fictional snapshot dated 2026-09-17. The local community skill and its references provide planning rules, not additional project evidence. No live inspection, link checks, current documentation checks, or comparable-community research occurred. Community enabled is a fixed planning assumption. Exact Discord labels, effective permissions, member journeys, and endpoint behavior remain unverified.

The packet reports six SDK questions redirected from `#general` during the last fortnight. Four dashboard posts were unanswered at snapshot time. Their ages and severity are unknown, so this does not establish an SLA breach. Members report that `#start` lists channels without explaining issue handoff. Workload is unmeasured. These observations justify clearer instructions and triage, but do not establish a need for new channels.

## Keep the structure small

Preserve channel names, existing posts, links, and useful tags. Improve the existing surfaces in place.

| Existing public surface | Member job | Proposed improvement |
| --- | --- | --- |
| Read-only `#start` | Find the right next step | Replace the channel-only list with a short route map, quick links, and three starter tasks. |
| Read-only `#announcements` | Understand shipped changes | Keep release context when releases ship; link the release record. No regular publishing schedule. |
| `#general` | Meet others, discuss use, and share progress | Add one friendly routing note. Ask SDK and dashboard questions in their help forums. |
| `#sdk-help` forum | Ask SDK integration questions | Keep SDK purpose tags; add a concise support template and issue-handoff instructions. |
| `#dashboard-help` forum | Ask dashboard questions and investigate defects | Keep dashboard purpose tags; apply the same template and triage loop. |
| `#ideas` forum | Clarify SDK, dashboard, and documentation proposals | Keep domain tags; explain proposal and pull-request handoffs. |
| Optional voice `#docs-clinic` | Work together on documentation | Preserve the existing monthly clinic and its cancellation rule. |

Each forum should require a member-selectable purpose or domain tag. Existing workflow states remain staff-controlled: Resolved in help forums, Planned/Shipped in ideas. Exact enforcement needs later verification. Do not add channels, tag families, bots, release feeds, events, or publishing commitments without new evidence and capacity.

## A new member's route

Proposed `#start` copy:

> Tideway builds a stream-ingestion SDK and a dashboard. Start with the SDK quickstart or dashboard guide. Search the matching help forum before posting. Choose a purpose tag and use the question template so other members can help.
>
> A conversation is not yet a tracked bug or decision. Once a public bug is confirmed, create a bug issue and link it back to the discussion. Product proposals use the proposal template. Documentation and code changes use pull requests. Keep decisions on issues.
>
> Share progress or introduce yourself in `#general`. You can also help by answering a question, testing a sanitized reproduction, or improving documentation. The docs clinic is optional.
>
> Help is asynchronous and best effort. There is no response SLA. Do not post credentials, personal or customer data, private logs, confidential material, security details, or conduct evidence in public threads. Use the project's private reporting instructions for sensitive reports.

Three starter tasks, all pointing to existing channels:

1. Open `#start` and choose the SDK quickstart or dashboard guide.
2. Browse `#sdk-help` or `#dashboard-help`; search for a relevant answer or post a tagged question.
3. Introduce your use case or share one lesson in `#general`, without sensitive data.

Proposed default view: `#start`, `#announcements`, `#general`, `#sdk-help`, and `#dashboard-help`. Keep `#ideas` easy to find and voice opt-in. Optional post-join SDK/dashboard/docs interests may personalize the view, but must not confer authority. Do not add mandatory questions merely to use Onboarding. Native eligibility and default-channel requirements are unverified; use the improved `#start` directly if the proposed native flow is unavailable. Do not add filler channels.

If Server Guide is later approved, reuse read-only `#start` as the backing resource for public quick links. Verify the selected backing channel and rendered links before use. The text route map remains useful without that feature.

### Public durable destinations

These are supplied fictional routes, not verified working endpoints.

| Need | Destination |
| --- | --- |
| Documentation | https://tideway.example/docs |
| SDK quickstart | https://tideway.example/docs/sdk/quickstart |
| Dashboard guide | https://tideway.example/docs/dashboard |
| Source | https://code.example/tideway/core |
| Confirmed public bug | https://code.example/tideway/core/issues/new?template=bug |
| Public product proposal | https://code.example/tideway/core/issues/new?template=proposal |
| Documentation or code contribution | Pull request following https://code.example/tideway/core/blob/main/CONTRIBUTING.md |
| Product decision | The relevant issue in the source repository |
| Release record | https://code.example/tideway/core/releases |

### Proposed support template

> **Purpose tag and product surface:** SDK or dashboard, with package/build version.  
> **Runtime and environment:** Only relevant, non-sensitive details.  
> **Expected result:** What should happen?  
> **Observed result:** What happened, including a sanitized error?  
> **Reproduction:** Minimal sanitized code or steps.  
> **Already tried:** What did you check?  
> Remove secrets, personal/customer data, and private logs before posting. Use private reporting instructions for security or conduct concerns.

For ideas, ask for the domain, user problem, impact, and example. Clarify the proposal in the forum, then link the durable proposal or contribution. A discussion or workflow tag is not a delivery promise.

## A sustainable help loop

Use a bounded weekly review, subject to the capacity rules below:

1. Check unanswered help posts. Start by establishing the age, impact, and missing context of the four reported dashboard posts.
2. Prioritize blocking problems with usable reproductions, then older unanswered posts. Do not infer urgency from the snapshot alone.
3. Acknowledge the question, request one concise set of missing details, or offer a useful documentation link. An acknowledgement is not a solution.
4. Invite peer help without assigning members work. Seek specialist input only when that person confirms availability.
5. For confirmed public bugs, check for duplicates, create or request an issue, and link both directions. Keep investigation and decisions on the issue.
6. Turn reusable answers into documentation pull requests as capacity allows. Leave the forum answer and durable link available for future search.
7. Apply Resolved only when the answer is confirmed or the outcome is explained. Do not mark an unanswered post resolved to reduce the queue.

When the review budget expires, carry unresolved questions forward with an honest status. A staff acknowledgement must not imply an answer deadline. If questions accumulate, reduce optional work before promising more coverage.

## Role jobs and capacity

These are fictional jobs, not public assignments to named operators. Allocations are proposed ceilings within the packet's confirmed capacity.

| Job | Available capacity | Proposed use |
| --- | --- | --- |
| Community steward / dashboard maintainer | 90 minutes per week total | 45 minutes help triage; 15 minutes release context when needed; 15 minutes navigation or documentation handoffs; 15 minutes queue measurement and review. |
| SDK maintainer / continuity deputy | Weekly availability unknown | Consult only after availability is confirmed. No weekly queue ownership or automatic cover is assumed. |
| Community moderator | 60 minutes per week | Existing moderation responsibilities. This is not extra product-support capacity. |
| Documentation clinic host | 60 minutes per month total | Suggested split: 15 minutes preparation, 30 minutes hosting, 15 minutes notes and documentation handoff. No weekly support duty. |
| Community contributors | Voluntary | Answer, reproduce, share a lesson, or submit a pull request when able. No implied staffing obligation. |

Unused release time may return to help triage; it does not become a new publishing task. Urgent needs consume these same budgets. Setup work must replace a planned improvement block or receive a separately confirmed allocation. Do not add it on top of routine commitments.

### Preserve the docs clinic

Keep the first Thursday at **16:00 UTC**. Voice participation is optional. Members may leave a documentation question or proposed correction in `#ideas` before the clinic. The agenda covers a small number of SDK quickstart or dashboard-guide improvements. Notes and reusable answers become documentation pull requests.

There is no confirmed backup host. Cancel if the host is unavailable; do not assign an unconfirmed substitute. Preparation, hosting, and notes must fit within the existing 60-minute monthly total. A smaller agenda is preferable to extra unpaid follow-up. No new event series is proposed.

## Proposed rollout and rollback

All phases require later explicit approval. Timing starts only after approval and depends on capacity.

| Phase | Work and exit condition | Rollback |
| --- | --- | --- |
| 1. Clarify navigation | Save prior copy, then edit `#start` and the `#general` routing note in place. Check that each starter task has a destination. | Restore prior copy; keep existing content and links intact. |
| 2. Improve help intake | Add templates and handoff guidance to existing forums. Preserve domain tags and existing posts. Verify any proposed tag-enforcement change before relying on it. | Restore prior guidelines and approved settings; do not delete posts or recreate forums. |
| 3. Try bounded triage | Establish a baseline, inspect unanswered questions, and run the help loop within the steward's budget. | Reduce the trial to basic best-effort triage if the workload is too high. Preserve answers and durable links. |
| 4. Review the trial | After four weeks, compare routing, unanswered questions, useful handoffs, and time spent. | Keep helpful copy; revise or drop work that has no demonstrated value. |

Native onboarding or guide changes are optional follow-up work, not prerequisites for the first copy improvements. Existing content must remain accessible through the rollout. Do not rename, merge, delete, or recreate channels as part of this draft.

## Measure usefulness within the budget

Use a short manual tally during the steward's review block. No new analytics system or recurring public report is proposed.

| Measure | Baseline and interpretation |
| --- | --- |
| SDK questions redirected from `#general` per fortnight | Six supplied. Also count total relevant questions when feasible; fewer redirects alone may reflect less activity. |
| Dashboard posts with no useful answer; oldest unanswered age | Four supplied; age and severity unknown. Record useful answers separately from staff acknowledgement. |
| Help and navigation time | Unknown. Log minutes against the existing 90-minute weekly ceiling, including setup. |
| Durable handoffs | Count issue/proposal links and documentation pull requests. Record whether each is still pending; activity is not the same as resolution. |
| Member participation | Note peer answers, reproductions, and contributions in aggregate. Do not turn this into quotas or member rankings. |
| Clinic sustainability | Record whether held or cancelled and whether total work fit the monthly budget. Attendance alone does not justify expansion. |

Review after two weeks for overload and after four weeks for usefulness. A rising or aging unanswered queue across two reviews should trigger smaller optional work and clearer expectations. Reallocate within confirmed time first. If demand still exceeds capacity, request an explicit capacity decision. Do not silently increase working hours or promise an SLA.

## Draft acceptance boundary

Before implementation, the human owner must approve the exact changes, accountable operators, capacity allocation, and rollback steps. Later verification must distinguish static role preview, fresh human-operated member testing, and human attestations. None has been performed here.

A successful trial would show members finding the right forum, useful answers or honest pending states, durable handoffs, and work within the agreed limits. No numerical improvement target is asserted without a workload baseline.

**Status: draft only, unapproved.** No server changes, messages, events, invites, tests on live services, or other live actions were performed.
