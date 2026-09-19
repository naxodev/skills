# Sprig community operating plan

**DRAFT — UNAPPROVED.** Prepared 2026-09-17. This document proposes a new private beta community. It authorizes no configuration or launch.

## Purpose and evidence

Sprig is a local-first Markdown notebook with a CLI importer and desktop editor. The initial audience is twenty invited beta members. The community should help them import notes, report editor defects, suggest changes, and learn from one another.

Project facts come only from `packet.md`, dated 2026-09-17. All names, jobs, and routes are fictional. Routes describe policy; their destinations have not been tested. There is no server. Current Discord labels, permissions, feature availability, and member experience remain unverified. No comparable-community evidence is available. Channel names and operating practices below are proposals, not observed demand or accepted commitments.

Community remains disabled as a fixed planning assumption. Use ordinary text channels and pinned messages. Forums, required tags, announcement-channel behavior, Rules Screening, native Onboarding, and Server Guide are not part of this design.

## A small member-facing structure

“Member-facing” means visible to admitted beta participants, not publicly accessible on the internet.

| Proposed channel | Community job | Posting pattern |
| --- | --- | --- |
| `#start-here` | Explain Sprig, participation rules, routes, and first steps | Read-only text; one compact pinned welcome and link index |
| `#help-and-feedback` | Import help, editor troubleshooting, and change suggestions | Member text posts; use a clear purpose and product-surface heading |
| `#commons` | Introductions, peer tips, and small showcases | Optional participation; one shared conversation space |
| `#release-notes` | Explain relevant published changes | Read-only text; occasional curated messages linking durable releases |

Do not split support by product surface yet. Headings such as **Help · CLI importer**, **Bug · desktop editor**, and **Idea · notebook** provide routing without forum tags. They are conventions, not enforced workflow states. Start without voice, events, or extra opt-in channels.

### First visit

The pinned welcome would say:

> Welcome to Sprig's private beta. Sprig is a local-first Markdown notebook with a CLI importer and desktop editor. Read this page, then use `#help-and-feedback` for questions and suggestions. Use `#commons` to meet other members and share sanitized examples. Published changes appear in `#release-notes`. Confirmed work and decisions belong in the repository. Participation is asynchronous; there are no scheduled meetings or guaranteed response times. Be respectful. Never post credentials, personal notes, raw customer data, or private reports.

Three starter tasks:

1. Read the [import guide](https://sprig.example/docs/import) and try a small, non-sensitive sample.
2. Introduce your use case in `#commons`, if you want. Share goals, not notebook contents.
3. Ask one focused question, suggest an improvement, or help another member using the template below.

Keep these tasks and the links below in `#start-here`. Do not depend on a native onboarding flow.

## Getting help and preserving answers

Search the [documentation](https://sprig.example/docs) and existing repository issues first. Then post:

```text
Purpose: Help / Bug / Idea
Surface: CLI importer / desktop editor / notebook
App or CLI version:
Operating system:
Goal and context:
Expected result:
Actual result and sanitized error:
Minimal reproduction using invented notes:
What I already tried:
Existing issue, if any:
```

Do not upload personal notes, credentials, private logs, or raw customer data. A small invented example is better than a full notebook.

Members may answer one another. A helpful reply is not an official product commitment. A product steward would clarify missing details once, look for duplicates, and choose a durable destination. A difficult question can remain unanswered; repeated mentions and direct messages do not create a support queue.

| Outcome | Durable destination and closure |
| --- | --- |
| Useful explanation | Link the docs; propose a documentation pull request if the answer is missing |
| Reproducible defect | Use the [bug template](https://code.example/sprig/notebook/issues/new?template=bug); link the issue back in the conversation |
| Product suggestion | Use the [idea template](https://code.example/sprig/notebook/issues/new?template=idea); record consequential decisions on that issue |
| Documentation or code contribution | Follow [CONTRIBUTING.md](https://code.example/sprig/notebook/blob/main/CONTRIBUTING.md) and submit a pull request |
| Published change | Link the [release record](https://code.example/sprig/notebook/releases); discuss impact without duplicating the changelog |

The [source repository](https://code.example/sprig/notebook) is the permanent home for actionable product work. Members can use its public bug and idea routes directly. Sensitive reports must use the project's designated private reporting routes rather than community posts; those procedures are outside this sanitized draft.

Proposed triage reply: “This belongs in the bug tracker. Please add a sanitized reproduction using the bug template. The linked issue will hold updates.” If a member cannot file it, a steward may transfer the sanitized summary within available capacity and link it back. No transfer implies priority or a delivery date.

## Participation without a publishing burden

Use `#commons` for a short showcase: **goal, product surface and version, sanitized example, lesson learned, and one question**. A shareable source link is optional. No one must publish regularly.

Useful participation includes answering a question, checking a reproduction, improving the import guide, or submitting a small pull request. Product stewards acknowledge useful work in the existing conversation. Do not add points, rankings, or a separate recognition channel.

Release messages are event-driven, not scheduled. A proposed format is: **what changed, who it helps, known limitations, release link**. If no release needs community context, no message is due. Seed only a welcome, support template, showcase prompt, and links; do not fabricate conversations or testimonials.

## Fictional role jobs

These describe work, not operator identities or confirmed appointments.

| Role job | Member-facing responsibility |
| --- | --- |
| Community steward | Keep orientation clear and review whether the community remains manageable |
| CLI product steward | Guide importer questions and route reproducible CLI defects |
| Desktop product steward | Guide editor questions and route reproducible editor defects |
| Safety steward | Maintain respectful participation and explain the community rules |
| Beta member | Ask focused questions, help peers, and share only sanitized material |

A product title alone grants no authority to change the server or enforce sanctions. No dedicated moderator, event host, or response-time promise exists in the supplied evidence.

## Sustainable service boundary

Offer best-effort asynchronous peer help with limited steward triage. Discord is not a ticketing system, an emergency channel, or a commitment to resolve every question. Coverage days are not established.

Batch triage rather than watching chat continuously. Prioritize safety, short routing replies, and reusable answers. Keep product implementation in the normal repository workflow. A pinned availability note should state when steward triage is paused and direct members to docs and issue templates.

If work exceeds available capacity, reduce optional posts and consolidate duplicate questions first. Defer new channels, events, and additional admissions while the stewards review demand. Do not respond to overload by silently promising more coverage.

## Review and decision gates

Propose a review two weeks after the first members join, followed by monthly reviews if manageable. No calendar date exists because launch is not approved.

Review a small set of signals: time spent versus available capacity, unresolved questions, repeated topics, completed durable handoffs, and member difficulty finding the right place. These are proposed observations, not existing measurements or response targets.

Keep the structure small unless sustained traffic shows a distinct job needs its own space and someone accepts its upkeep. Improve the welcome or docs before adding channels. If support cannot fit, narrow the offered service and pause expansion.

Before any implementation, the human decision-makers must approve the operating plan and confirm ownership, capacity, access policy, and reporting coverage. A later authorized phase must verify permissions, text-channel behavior, routes, and a fresh member's experience. This draft stops before that phase.
