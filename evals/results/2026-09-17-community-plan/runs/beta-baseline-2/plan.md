# Sprig community operating plan

**Public draft — unapproved — 2026-09-17.** No configuration or live action is authorized.

## Purpose and evidence

Sprig is a local-first Markdown notebook with a CLI importer and desktop editor. This plan serves twenty invited beta members. Its goals are simple: members can find their way, get help, and contribute without depending on constant staff attention.

`packet.md`, dated 2026-09-17, is the entire project evidence set. All project names, roles, and routes are fictional. Routes express policy; they are not verified live endpoints. Local Discord skill references informed the planning method only.

There is no server yet. This is a greenfield private-beta proposal with Community disabled as a fixed assumption. Current Discord labels, feature behavior, permissions, member experience, and route availability remain untested. No comparable-community observations or measured demand are available. No online research was performed.

## Small member-facing structure

Use ordinary text channels. Do not depend on forums, tag enforcement, announcement-channel features, Rules Screening, native Onboarding, or Server Guide.

| Proposed channel | Community job | How members use it |
| --- | --- | --- |
| `#start-here` | Orientation and rules | Read the pinned welcome, quick links, help format, and participation boundaries. Read-only. |
| `#general` | Conversation and participation | Introduce yourself, exchange notebook workflows, suggest changes, or share a sanitized example. |
| `#help` | CLI import and desktop editor help | Ask one question at a time using the help format. Continue a related discussion together and link its durable outcome. |
| `#updates` | Shipping context | Read short, manual summaries of relevant published releases, with links to release notes. Read-only. |

These are the default member destinations. No extra member channels, opt-in areas, or voice spaces are proposed for launch. Use written prefixes such as `[CLI import]` and `[Desktop editor]` to make help easy to scan. These are conventions, not enforced tags.

Keep feedback and showcases in `#general` initially. Consider a split only if repeated collisions make conversations hard to find and an owner can maintain the new channel within the existing capacity.

## Orientation draft

> Welcome to Sprig, a local-first Markdown notebook with a CLI importer and desktop editor.
>
> Start with the import guide. Ask CLI import or desktop editor questions in `#help`. Use `#general` for introductions, workflow examples, and early ideas. Read `#updates` for selected release summaries.
>
> Be respectful. Do not harass, spam, or share another person's private information. Use synthetic notes in examples. Never post credentials, personal notes, raw customer data, or private logs.
>
> Help is asynchronous and best-effort. There is no response-time promise or recurring meeting schedule. Peer answers are welcome. A chat reply is not a product commitment.
>
> Confirmed bugs and suggestions belong in the linked issue templates. Useful answers become documentation improvements. Record consequential decisions on the relevant issue.

Three optional starter tasks:

1. Read the import guide and try an import with a small synthetic Markdown note.
2. Introduce your goal in `#general`, mentioning the CLI importer or desktop editor if useful.
3. Ask a formatted question, answer an existing question, or share one sanitized workflow lesson.

Do not require an introduction or activity quota to receive help. These are text instructions, not native onboarding tasks.

## Durable public routes

| Need | Destination |
| --- | --- |
| Learn Sprig | [Documentation](https://sprig.example/docs) |
| Import notes | [Import guide](https://sprig.example/docs/import) |
| Browse the project | [Source repository](https://code.example/sprig/notebook) |
| Report a bug | [Bug template](https://code.example/sprig/notebook/issues/new?template=bug) |
| Suggest a change | [Idea template](https://code.example/sprig/notebook/issues/new?template=idea) |
| Improve documentation or code | [Contribution instructions](https://code.example/sprig/notebook/blob/main/CONTRIBUTING.md), followed by a repository pull request |
| Read release details | [Durable releases](https://code.example/sprig/notebook/releases) |
| Find a consequential decision | The relevant repository issue |

The beta is invite-only, but ordinary non-confidential product work still uses these public destinations. Share only sanitized information there.

## Help and participation workflow

Before asking, check the import guide and relevant existing discussions or issues. Ask in `#help` when you need diagnosis; a complete bug report can go straight to the bug template.

**Help post format**

```text
[CLI import / Desktop editor] Short description
App or CLI version:
Operating system and relevant environment:
Expected result:
Actual result and sanitized error:
Minimal reproduction using synthetic notes:
What I already tried:
Related issue or documentation link, if any:
```

Members may clarify steps, offer a reproduction, or link a helpful answer. Maintainers request only the missing information, link duplicates, and move confirmed work to its durable destination. They should avoid asking members to repeat a complete report.

Use a short text outcome such as “answered,” “needs reproduction,” or “tracked: issue link.” These are manual summaries, not forum workflow states. No reply does not mean a problem was accepted, resolved, or rejected.

For a useful support answer, propose a documentation pull request or a small documentation follow-up on the relevant issue. For an idea, describe the goal and impact before using the idea template. The relevant issue holds the decision and rationale.

**Optional workflow-sharing format**

```text
Goal:
CLI importer or desktop editor, with version:
Synthetic example or shareable link:
What I learned:
Question or feedback wanted:
```

No showcase schedule, fake conversations, or testimonials are needed. Sharing, peer help, reproducible bugs, and documentation corrections all count as participation.

## Role jobs and sustainable service

These are fictional role jobs, not assigned operators or permission grants.

| Role job | Responsibility |
| --- | --- |
| Community steward | Keep the welcome and channel purposes clear; review whether the plan remains manageable. |
| Desktop maintainer | Clarify editor reports and connect actionable work to issues or documentation. |
| CLI maintainer | Clarify import reports and connect actionable work to issues or documentation. |
| Release editor | Add brief, useful context to selected published releases. |
| Member | Ask clearly, protect private data, and contribute help or examples when willing. |

Staff attention is limited. Support is asynchronous and best-effort, with no response-time promise. Coverage days are not established. Peer help supplements staff work; it does not create an unpaid support obligation.

Use bounded review batches rather than continuous monitoring. Triage and link work during those batches; substantial product fixes stay in the repository workflow. If demand exceeds capacity, reduce optional publishing and channel expansion first. Then simplify intake and state the limits clearly rather than promising more availability.

Releases are irregular. `#updates` has no publishing schedule and need not mirror every release. A proposed update format is: what changed, who benefits, known limitations, and the durable release link.

Recurring events and office hours are deferred because no host has committed. Members can participate asynchronously without attending a meeting.

## Review and decision gate

Propose a first review two weeks after the first beta members join, followed by a monthly review if affordable. These dates are not scheduled or approved.

Review a few useful signals: repeated navigation questions, unanswered help discussions, repeated support topics, useful documentation or issue handoffs, and actual staff time. Compare demand with available time before adding channels, roles, events, or commitments. Low traffic alone does not justify engagement activities.

Before launch, a human must approve the operating plan and complete the relevant configuration, route checks, and fresh-member verification. This document approves none of those actions. All live behavior remains untested.
