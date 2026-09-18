# Sprig community operating plan

**DRAFT — UNAPPROVED · 2026-09-17**

This is a sanitized public planning document for a fictional project. It authorizes no configuration or launch.

## Purpose and evidence

Sprig is a local-first Markdown notebook with a CLI importer and desktop editor. The initial audience is twenty invited beta members. The community should help members import notes, report editor defects, and suggest changes.

The sole project evidence is `packet.md`, dated 2026-09-17. Its routes describe policy, not verified endpoints. Local workflow references guided the drafting method. There is no server yet. Current Discord labels, capabilities, permissions, and member behavior are unverified. No comparable-community observations were supplied. No online research or live testing occurred.

Community remains **disabled**, as required by the packet. This plan uses ordinary text channels. Forums, enforced tags, announcement-channel features, Rules Screening, native Onboarding, and Server Guide are not applicable.

## Member journeys

These journeys determine the channel jobs below.

| Journey | Entry and next action | Durable handoff | Proposed human job |
| --- | --- | --- | --- |
| Arrive and orient | Read the start message, choose CLI importer or desktop editor, then open the relevant documentation. | Documentation and contribution instructions. | A community steward repairs unclear instructions when members need repeated redirects. |
| Get help or report a bug | Search documentation and existing issues, then post one sanitized question with the product surface and version. | Retain reusable answers in documentation; put defects in the bug tracker. | The relevant product maintainer clarifies the report and links the durable work. |
| Participate or suggest a change | Describe a goal, friction, or an import lesson in the shared discussion. Use an idea issue for actionable feedback. | Idea issues, documentation or code pull requests, and decisions recorded on the relevant issue. | The relevant product maintainer identifies the next useful contribution. |

Members can help each other. A maintainer reply is not required before filing an issue or proposing a documentation correction.

## Small starting structure

Channel names are proposals, not configured destinations.

| Proposed channel | Type and member use | Job and journey |
| --- | --- | --- |
| `#start-here` | Read-only ordinary text channel. | Orientation, rules, canonical links, support template, and occasional curated release notices. Serves arrival and redirects from help. |
| `#workshop` | Ordinary text channel where members can participate. | Questions, editor defects, CLI importer feedback, introductions, and useful lessons. Serves support and contribution without separate queues. |

Combine support and feedback initially because they share the same small audience and maintainers. Do not add a general-chat, showcase, or per-product channel until observed traffic shows a distinct need.

Start a message with `CLI importer`, `Desktop editor`, or `Documentation`, followed by its purpose: question, bug, idea, or lesson. These are voluntary plain-text cues, not enforced forum tags. Use explicit replies and issue links to keep follow-up understandable. Do not present a suggestion as accepted or shipped without a durable maintainer decision.

## Orientation and participation copy

Proposed start message:

> Welcome to Sprig, a local-first Markdown notebook with a CLI importer and desktop editor. Read the import guide before importing notes. Use `#workshop` for questions, defects, ideas, and lessons. Record actionable work in the repository so it remains useful outside chat. Be respectful. Share only sanitized examples. Never post credentials, personal notes, raw customer data, or private logs. Maintainers review questions as capacity allows; there is no response-time promise. No recurring meetings are planned.

Three starter tasks:

1. Read the import guide and find the instructions relevant to your notes.
2. Search existing issues before posting a question or defect. If you need help, use the template below.
3. Share one sanitized lesson, suggest one improvement, or read the contribution instructions before proposing a change.

Proposed help template:

```text
Product surface and purpose:
App or CLI version:
Operating system:
What I wanted to do:
Expected result:
Actual result and sanitized error:
Small sanitized reproduction:
What I already tried:
Related issue or documentation link, if any:
```

For an idea, explain the goal, current difficulty, and desired outcome. For a lesson, describe what worked and what others can reuse. Private notes and raw customer data are never required.

## Public durable routes

These fictional destinations come from the packet and have not been opened or tested.

| Need | Destination |
| --- | --- |
| Documentation | <https://sprig.example/docs> |
| Import guide | <https://sprig.example/docs/import> |
| Source and existing issues | <https://code.example/sprig/notebook> |
| Bug report | <https://code.example/sprig/notebook/issues/new?template=bug> |
| Product idea | <https://code.example/sprig/notebook/issues/new?template=idea> |
| Contribution instructions | <https://code.example/sprig/notebook/blob/main/CONTRIBUTING.md> |
| Releases | <https://code.example/sprig/notebook/releases> |

Useful support answers become documentation changes. Code and documentation contributions use repository pull requests. Consequential decisions belong on the relevant issue. Chat summaries link to those records instead of becoming the only record.

## Sustainable operating model

The following are fictional job descriptions, not operator identities or approved assignments:

- **Community steward:** keeps orientation clear and reviews whether the community remains manageable.
- **Desktop maintainer:** helps classify desktop editor reports and links actionable work to issues.
- **CLI maintainer:** helps classify importer reports and turns reusable guidance into documentation.
- **Release communicator:** posts a short, useful summary when an irregular release merits one, linking the durable release page.

One person may perform several jobs. The packet provides limited shared capacity and no dedicated moderator or event host. Proposed allocations require human confirmation. Neither those estimates nor member participation create a support SLA.

Keep work asynchronous. Ask for missing information once, link duplicate reports, and leave unresolved questions visibly unresolved. Do not promise fixes in chat. When capacity is tight, prioritize member safety and blocked workflows, then defer optional summaries and promotion. Release communication is event-driven; no publishing schedule is promised.

Recurring meetings, office hours, voice, separate showcase channels, and additional channel queues are deferred. Each would need a demonstrated member need and a confirmed operator with time to run it.

## Review and draft boundary

Proposed review triggers are repeated redirects about the same topic, an unanswered question surviving two actual triage passes, or staff reporting that the proposed workload exceeds available time. These are future signals, not observed demand or response deadlines.

Review the start message and templates before expanding channels. Add a channel only when a distinct job keeps being missed and someone accepts its upkeep. Reduce optional work when the community exceeds its operating budget.

Approval, ownership of proposed duties, capacity allocations, and future launch checks remain open. No server configuration, invitation, posting, integration, or member test has occurred. This draft stops before configuration.
