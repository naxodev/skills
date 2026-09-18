# Tideway community improvement plan

**Public draft · Unapproved · 2026-09-17**

This proposal aims to help members find answers and contribute within the team's available time. It authorizes no configuration, publishing, invites, or other live action.

## Basis and limits

The only project evidence is `packet.md`, a fictional snapshot dated 2026-09-17. Tideway has about 180 members and maintains a stream-ingestion SDK and a dashboard. Community enabled is a fixed planning assumption.

The snapshot reports six SDK questions redirected from `#general` during the last fortnight and four unanswered dashboard posts. Their age and severity are unknown. Members report that `#start` lists channels without explaining how discussion becomes an issue. These observations support clearer guidance and triage. They do not establish a response-time baseline or prove that more channels would help.

No live inspection, member testing, route testing, current documentation lookup, or comparable-community research was performed. Exact Discord labels, effective permissions, endpoints, and current feature behavior remain unverified. All changes below are proposals.

## 1. Keep the existing places; explain their jobs

Preserve existing posts, links, forum history, and product-specific tags. Do not merge, delete, recreate, or rename channels for this trial.

| Existing public surface | Member job | Proposed improvement |
| --- | --- | --- |
| Read-only `#start` | Find the right place and the next step | Replace the channel-only list with the routing guide and three starter tasks below. |
| Read-only `#announcements` | Understand shipped changes | Continue release context when releases ship, linking to the release record. No new publishing cadence. |
| `#general` | Meet people and discuss use cases | Keep conversation here; gently redirect technical questions to the relevant help forum. Members can share a small project or lesson here. |
| `#sdk-help` forum | Get SDK integration help | Keep SDK purpose tags and a moderator-controlled Resolved state. Add a concise support template. |
| `#dashboard-help` forum | Get dashboard help | Keep dashboard purpose tags and a moderator-controlled Resolved state. Review unanswered posts within the triage budget. |
| `#ideas` forum | Explain a product or documentation need | Keep SDK/dashboard/docs purpose tags and moderator-controlled Planned/Shipped states. Link consequential work to an issue or pull request. |
| Optional voice `#docs-clinic` | Work together on documentation | Preserve the existing monthly clinic. Voice remains optional. |

Suggested default navigation: `#start`, `#announcements`, and `#general`, with clearly visible links to both help forums and `#ideas`. Offer SDK/dashboard interests after joining if the current native flow supports this. Interests are personalization only. Do not hide the only route to help behind an unanswered question.

Reuse read-only `#start` for canonical links and a Server Guide resource if later checks confirm it works. Do not add a resource channel merely to complete a setup flow. Keep the direct `#start` guide usable if the native guide cannot support the proposed structure.

## 2. Give members a complete route

### Proposed `#start` copy

Welcome to Tideway, a stream-ingestion SDK and dashboard community.

- **Integrating the SDK?** Read the [SDK quickstart](https://tideway.example/docs/sdk/quickstart), search `#sdk-help`, then post there if needed.
- **Using the dashboard?** Read the [dashboard guide](https://tideway.example/docs/dashboard), search `#dashboard-help`, then post there if needed.
- **Have an idea?** Explain the problem, impact, and product surface in `#ideas`. A discussion is not a delivery commitment.
- **Found a reproducible bug?** Create a [bug report](https://code.example/tideway/core/issues/new?template=bug) with a sanitized reproduction. Link the issue in the original help thread.
- **Have an agreed product proposal?** Use the [proposal route](https://code.example/tideway/core/issues/new?template=proposal). Keep decisions on the issue and link it from the discussion.
- **Want to improve docs or code?** Follow the [contribution guide](https://code.example/tideway/core/blob/main/CONTRIBUTING.md) and open a pull request. Reusable help answers and clinic notes should become docs pull requests.
- **Looking for shipped changes?** See the [release record](https://code.example/tideway/core/releases) and release context in `#announcements`.

General references: [documentation](https://tideway.example/docs) and [source](https://code.example/tideway/core).

Help is best effort. There is no response SLA. A triage reply may request information or suggest a durable issue; it does not promise a fix or a delivery date. Keep credentials, personal data, customer data, private logs, and confidential material out of public posts. Use the project's designated private reporting routes for sensitive reports.

### Three starter tasks

1. Read `#start` and open the guide for the product surface you use.
2. Search the matching help forum. Ask one question with the template if you still need help, or add a useful answer.
3. Introduce your use case in `#general`, or find one small documentation improvement through the contribution guide.

### Support template

> Product surface and version:
> Runtime and relevant environment:
> What I expected:
> What happened, including a sanitized error:
> Minimal reproduction or sanitized code:
> What I already tried:
> Related documentation or issue, if any:
>
> Remove credentials, customer data, personal data, and private logs before posting. Do not post sensitive reports here.

Each forum post should require a member-selectable product or purpose tag. Keep existing useful SDK tags. Members should not set workflow states. Mark Resolved only when an answer or documented resolution exists, not merely because a post was reviewed. Planned and Shipped should reflect durable decisions and release evidence.

For ideas, ask for the product surface, user goal, current obstacle, impact, and a shareable example. For project sharing in `#general`, ask what was built, which Tideway surface it uses, one lesson, and a shareable link if available. No separate showcase channel is proposed.

## 3. Bound the work

The role jobs below describe a proposed allocation of existing commitments. They are not new staffing promises.

| Fictional role job | Available time | Proposed use |
| --- | --- | --- |
| Community steward | 90 minutes per week | 45 minutes for a shared help/ideas triage sweep; 20 minutes for one routing or reusable-answer improvement; 15 minutes for release context when needed; 10 minutes for measurement and review. |
| Safety moderator | 60 minutes per week | Keep this time for moderation and conduct work. Do not depend on it for product support. |
| Documentation clinic host | 60 minutes per month | 15 minutes preparation, 30 minutes hosting, and 15 minutes for notes and a docs handoff. No weekly support duty. |
| SDK specialist / successor | Availability unknown | Consult only when available. Exclude this role from promised weekly coverage. |
| Community contributors | Voluntary | Answer questions, improve reproductions, and submit docs or code pull requests. No assigned queue or response promise. |

These are ceilings, not targets to fill. Release-heavy weeks draw time from documentation improvements, then reduce triage depth. Urgent safety work takes priority over discretionary work. Unused release time may support the existing queue, but does not create a new recurring obligation.

During the initial trial, use the improvement block for navigation and template edits before taking on new documentation work. If approved setup or verification cannot fit, spread it over more weeks. Do not silently add hours.

### Weekly triage procedure

The community steward reviews both help forums and `#ideas` in one bounded sweep:

1. Check the four reported unanswered dashboard posts for age, impact, missing context, and any answer since the snapshot.
2. Check new unanswered questions across both product surfaces. Review higher-impact reports first, then the oldest unanswered posts.
3. Provide one useful next step: an answer, a focused information request, a relevant existing issue, or help preparing a sanitized bug report.
4. For misplaced SDK questions, give a short redirect to `#sdk-help`. Preserve the original discussion and cross-link any follow-up rather than deleting history.
5. Offer the author the durable handoff. If a volunteer or maintainer takes it, make that explicit. Link the resulting issue or pull request back to the thread.
6. Stop at the time limit. Keep the remaining items visible for the next sweep. Do not mark them resolved to clear a queue.

Public wording should distinguish “seen,” “needs information,” and “resolved” without introducing new workflow tags unnecessarily. Acknowledgment alone is not a useful answer. A bug issue can remain open after a support question is answered; the issue remains the source of truth.

## 4. Preserve a small participation rhythm

Keep the monthly docs clinic on the **first Thursday at 16:00 UTC**. The next occurrence after the snapshot is October 1, 2026, subject to the existing host being available. Cancel that occurrence if the host is unavailable; there is no confirmed backup.

Possible agenda: clarify one SDK quickstart step, improve a dashboard explanation, or turn one recurring help answer into a docs change. Choose one topic that fits the existing hour, including preparation and notes. Voice is optional; members can contribute asynchronously through a docs pull request. Capture decisions on issues and reusable outcomes in docs pull requests, not solely in voice or chat.

Release context stays tied to actual releases. Link to the release record and explain the member impact. Do not add a weekly digest, additional event series, automated feed, or engagement program without evidence and a separate capacity decision.

## 5. Review whether the trial helps

Propose a four-week trial beginning only after approval and applicable checks. Establish a baseline in the first weekly sweep; do not invent historical measurements.

Within the existing ten-minute review block, record aggregate counts and time:

- SDK questions redirected from `#general` per fortnight. Compare cautiously with the supplied six; traffic may change.
- Unanswered help posts by product surface, plus the oldest age when observable. Track requests awaiting the author's information separately.
- Posts receiving a useful first response. Sample elapsed time only when timestamps are available; this is not an SLA.
- Issues and docs pull requests linked back to their originating discussions. Count links, not messages or member activity as a success proxy.
- Community-operation minutes and any work displaced by releases or incidents.
- Clinic held or canceled, host time, and any reusable docs outcome. Attendance alone is not the goal.

Review at two weeks for overload and at four weeks for continuation. Prefer fewer misrouted questions and a smaller or younger unanswered queue without exceeding the available time. Small samples are directional evidence, not proof of causation.

If work exceeds the budget or the unanswered queue grows at two consecutive reviews, pause discretionary improvements and reduce trial scope. State the best-effort support boundary again. Do not respond by creating more channels or promising faster answers. Expand scope only after a specific unmet job and funded ownership are demonstrated.

## 6. Decision and verification gate

All proposals remain unapproved. Before any later implementation, the human owner must approve the exact edits, capacity allocation, and rollback approach. A future authorized review must distinguish static role previews, fresh-member behavior, and human-attested controls. Supplied intentions are not permission-test results.

Proposed edits should be reversible in place: retain the previous welcome copy, templates, navigation selections, and tag settings before changing them. Restore those settings if the trial makes routing worse. Keep posts and durable issue links intact. Never restore a setting known to expose confidential information.

Open decisions include practical weekly coverage, the unknown support baseline, native onboarding feasibility, and successful route and member checks. The public role jobs are proposals; additional staff assignments are not assumed.

**Draft outcome:** clearer navigation, bounded help triage, and the existing monthly clinic. No configuration or live action has been performed.
