# Sprig community operating plan

**DRAFT — UNAPPROVED.** Prepared from the fictional project packet dated 2026-09-17. This is a sanitized public planning document, not a launch announcement or authorization to configure a server.

## Purpose and evidence limits

Sprig is a local-first Markdown notebook with a CLI importer and desktop editor. The proposed community helps beta members import notes, report editor defects, and suggest changes.

The packet is the only source of project facts. There is no server yet. Community disabled is a fixed planning assumption. Routes below describe project policy; their availability has not been tested. Current Discord labels, permissions, and feature behavior are unverified. No comparable-community observations were supplied. No live research or member testing supports this draft.

## Member journeys

These journeys determine the channel jobs below.

| Journey | Entry and next action | Durable handoff | Proposed human response |
| --- | --- | --- | --- |
| Arrive and orient | Read `#start-here`; open the import guide; choose a first task | Documentation and contribution instructions | A Community Steward clarifies confusing directions when available; orientation should not require a personal welcome |
| Get help or report a bug | Search the guide and existing discussions, then post a sanitized question in `#help-and-ideas` | Retain reusable answers in documentation; send reproducible defects to the bug template | The relevant CLI or Desktop Guide asks for missing context and links the durable record; no response-time promise |
| Participate or suggest a change | Share a goal, suggestion, or useful lesson in `#help-and-ideas`; use contribution instructions for a pull request | Ideas use the feedback template; documentation and code use pull requests; consequential decisions stay on the relevant issue | The relevant Guide clarifies the problem and points to existing work; discussion does not promise implementation |

## Small starting structure

| Channel job | Proposed surface | Reason |
| --- | --- | --- |
| Orientation and occasional release context | `#start-here`, ordinary read-only text | One place for product terms, rules, links, starter tasks, and links to durable releases |
| Help, ideas, and shared learning | `#help-and-ideas`, ordinary writable text | One destination avoids forcing members to distinguish a usage question from a defect before asking |

Keep the quick-links message pinned above occasional release notes. Use a reply thread per topic where available; the top-level message must still explain the question. Do not make threads essential to finding the durable answer.

Forums and enforced tags are not part of this design. Members may start a message with `CLI importer`, `Desktop editor`, or `Docs`, followed by `Help`, `Bug`, `Idea`, or `Share`. These are plain-text routing hints, not tags or authoritative workflow states. Staff replies link the issue or documentation change when work leaves chat.

There are no native announcement channels, Rules Screening, Onboarding, or Server Guide in this Community-disabled plan. Orientation uses the read-only text channel. Separate product channels, a showcase channel, interest roles, voice, and events are deferred until an observed need and a willing owner justify them.

## Fictional role jobs

These are job descriptions, not operator assignments or promises of additional staff. One person may perform several jobs.

| Job | Contribution |
| --- | --- |
| Community Steward | Keep directions clear, review community load, and maintain a workable participation model |
| CLI Guide | Help members describe importer problems and turn reusable answers into documentation |
| Desktop Guide | Help members describe editor problems and connect them to durable product work |
| Release Editor | Add concise context and a durable release link when a release warrants a message |
| Member | Ask with enough context, share sanitized lessons, help peers, and contribute through durable project routes |

## Sustainable participation

Support is asynchronous and best effort. Coverage days and response times are not established. A proposed internal time allocation needs human confirmation; it is neither measured demand nor a service-level commitment.

During available triage time, Guides should first identify unanswered questions, ask once for missing information, and link existing answers before repeating diagnosis. If a defect is ready for the tracker, offer the bug template and a short sanitized summary. Avoid requiring the member to repeat the entire conversation. Link the resulting issue back to the discussion.

Members can help peers without speaking for the project. Useful answers become documentation changes. Product decisions and implementation status belong on the relevant issue, not only in chat.

Release messages follow actual releases and available capacity. No publishing schedule or recurring meeting is promised. When load exceeds capacity, reduce optional release commentary and seed content before adding channels or recurring duties. Explain delays honestly rather than implying continuous coverage.

Review the design when questions repeatedly go to the wrong place, unanswered work persists across triage passes, or community work exceeds its agreed budget. Use observed problems to choose a correction; membership growth alone is not a reason to expand.

## Draft orientation and participation copy

> Welcome to Sprig, a local-first Markdown notebook with a CLI importer and desktop editor. Read the import guide before your first import. Use `#help-and-ideas` for questions, editor defects, suggestions, and lessons you can safely share. Confirmed work belongs in the project repository. Help is asynchronous, with no guaranteed response time. No synchronous sessions are scheduled.

Three starter tasks:

1. Read the community rules and open the import guide.
2. Try an import or editor task with sample notes you can safely share.
3. Ask one clear question, share one useful lesson, or find a documentation improvement to contribute.

Draft rules: be respectful, discuss ideas without harassment, avoid spam, and do not post secrets, personal notes, raw customer data, or private reports. Use the project's security and conduct policies for sensitive reporting.

**Help or bug message:**

- Surface: CLI importer, Desktop editor, or Docs.
- App or CLI version and operating system.
- What you tried and what you expected.
- What actually happened, including a sanitized error if useful.
- Minimal steps or sample Markdown that reproduce the problem.
- What you have already checked; related issue or documentation link if known.

Never request personal notes or raw customer data. Remove credentials and private information from reproductions and screenshots.

**Idea or shared lesson:** state the goal, affected surface, current difficulty or approach, and the feedback you want. Link an existing idea before opening a duplicate. A reply or acknowledgment is not a promise to ship.

**Release message:** state the version, the relevant CLI or editor change, and the durable release link. Use only actual release information.

## Durable public routes

All routes are fictional and unverified.

| Purpose | Destination |
| --- | --- |
| Documentation | https://sprig.example/docs |
| Import guide | https://sprig.example/docs/import |
| Source repository | https://code.example/sprig/notebook |
| Bug report | https://code.example/sprig/notebook/issues/new?template=bug |
| Product idea | https://code.example/sprig/notebook/issues/new?template=idea |
| Contribution instructions | https://code.example/sprig/notebook/blob/main/CONTRIBUTING.md |
| Releases | https://code.example/sprig/notebook/releases |

Documentation improvements and code contributions use repository pull requests. Record consequential decisions on the relevant issue. Retain support answers worth reusing as documentation changes.

## Draft disposition

Approval, assignment of the proposed jobs, confirmation of capacity, and future runtime verification remain outstanding. No server configuration, invite creation, publishing, or live action was performed or authorized. This draft stops at the operating-plan stage.
