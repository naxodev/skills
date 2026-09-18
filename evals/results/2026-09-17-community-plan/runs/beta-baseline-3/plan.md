# Sprig community operating plan

**DRAFT — UNAPPROVED.** Proposed design only. This document does not authorize configuration or launch.

## Purpose and evidence

Sprig is a local-first Markdown notebook with a CLI importer and desktop editor. This proposal serves twenty invited beta members who need import help, editor-defect reporting, and a way to suggest changes.

The only project evidence is `packet.md`, dated 2026-09-17. There is no server yet. Routes below describe fictional project policy; their destinations have not been opened or verified. Current Discord labels, feature behavior, permissions, and member experience are untested. No comparable-community observations or measured demand are available. Channel names and operating choices below are proposals, not observed settings.

Community stays disabled as a fixed planning assumption. Use ordinary text channels. Forums, enforced tags, announcement-channel features, Rules Screening, native Onboarding, and Server Guide are not part of this design.

## A small member-facing structure

| Proposed text channel | Member job | How it works |
| --- | --- | --- |
| `#start-here` | Understand Sprig and find the right route | Read-only orientation, rules, quick links, and three starter tasks. |
| `#help-and-feedback` | Get import help, describe editor defects, and suggest changes | Use the short request template below. Start with “CLI importer,” “desktop editor,” or “documentation.” These are written labels, not enforced tags. |
| `#commons` | Introduce yourself, share a useful workflow, and help peers | One conversation space for introductions, sanitized examples, and lessons learned. |
| `#updates` | Find important beta changes | Read-only, concise maintainer summaries linking to durable releases. Posts follow useful changes, not a fixed schedule. |

Keep these jobs together until actual use shows a need to split them. Product-specific channels, a showcase channel, and notification roles would add navigation and maintenance work without current evidence of need.

## Find your way

Proposed welcome copy:

> Welcome to the Sprig beta. Sprig combines a local-first Markdown notebook, CLI importer, and desktop editor. Start with the import guide. Ask questions and discuss ideas in `#help-and-feedback`. Introduce yourself or share a lesson in `#commons`. Find release summaries in `#updates`.
>
> Help is asynchronous and best effort. There is no guaranteed response time. Peer answers are welcome. A discussion is not a promise to fix or ship a change. Keep confirmed work and decisions in the repository.
>
> Be respectful. Do not post credentials, personal notes, raw customer data, or private logs. Use sanitized examples. Keep security and conduct report details out of community conversations.

Three starter tasks:

1. Read the [import guide](https://sprig.example/docs/import) and the community rules in `#start-here`.
2. Optionally introduce your goal in `#commons`: importing notes, editing Markdown, or improving documentation.
3. Try a small import with invented notes. Share one question using the help template, or answer an existing question.

No introduction, event attendance, or sharing of personal notes is required. Orientation lives in a pinned text message, not a Community-only onboarding flow.

## Get help and turn it into durable work

Search the documentation and existing issues first. Then post one question per message in `#help-and-feedback`. Reply to the original request to preserve context. Use a thread only if a later approved setup verifies that it works for members.

```text
Purpose: help / bug / idea / documentation
Surface: CLI importer / desktop editor / documentation
App or CLI version:
Operating system:
Goal and expected result:
Actual result and sanitized error:
Small reproduction using invented notes:
What I already tried:
Related issue or documentation link, if any:
```

Do not attach a notebook export or raw private logs. A small invented example is enough to begin. Missing details should lead to one focused clarification request, not repeated staff prompting.

| Need | Durable destination and handoff |
| --- | --- |
| Import or editor help | [Documentation](https://sprig.example/docs), starting with the [import guide](https://sprig.example/docs/import). Reusable answers become documentation pull requests. |
| Reproducible defect | [Bug template](https://code.example/sprig/notebook/issues/new?template=bug). Link the issue back to the conversation. |
| Proposed product change | [Idea template](https://code.example/sprig/notebook/issues/new?template=idea). Describe the goal and impact, not just a requested solution. |
| Documentation or code contribution | [Contribution guide](https://code.example/sprig/notebook/blob/main/CONTRIBUTING.md) and repository pull requests. |
| Consequential product decision | The relevant issue in the [repository](https://code.example/sprig/notebook), with the rationale recorded there. |
| Shipped change | [Releases](https://code.example/sprig/notebook/releases). A chat summary points here rather than becoming the only release record. |

Maintainers can summarize a request as “needs information,” “linked to issue,” or “answered” in plain replies. These labels are not platform-enforced workflow states. Once an issue exists, product follow-up belongs there. Members can open a clear issue directly without waiting for chat triage.

## Participate without creating a support queue for every conversation

- Ask or answer a focused question using sanitized examples.
- Share a workflow in `#commons`: goal, product surface, small invented example, lesson, and optional question.
- Confirm whether an existing report reproduces, using your version and operating system.
- Improve a confusing guide through a documentation pull request.
- Suggest a change through the idea template and explain who benefits.

No recurring events, office hours, voice sessions, bots, or publishing schedule are proposed. The packet supplies no host or commitment for them. Sharing and peer help remain optional and asynchronous.

## Fictional role jobs

These are jobs in the proposed community, not assigned accounts or confirmed staffing commitments.

| Role job | Responsibility |
| --- | --- |
| Community Steward | Keep orientation useful and the community scope manageable. |
| Desktop Guide | Clarify editor questions and connect defects to durable reports. |
| Import Guide | Clarify CLI import questions and improve reusable import guidance. |
| Documentation Contributor | Turn recurring answers into proposed documentation improvements. |
| Beta Member | Ask clearly, help peers when able, and share sanitized findings. |

## Sustainable operating expectations

Staff attention is limited. Proposed triage prioritizes safety, blocking beta problems, and reusable answers before general discussion. No coverage days or emergency availability are established. Members should not rely on immediate chat help.

When demand exceeds capacity, reduce optional summaries and prompts first. Ask members to use durable issue templates, identify unanswered requests honestly, and keep the channel map small. Do not compensate by promising faster responses or adding unstaffed channels.

Review the design after an initial beta period. Look at whether members find the correct route, whether questions remain unanswered, and whether repeated answers reach the docs. Add a new surface only when repeated unmet demand has a willing owner. Merge or remove unused surfaces after preserving useful links and content.

## Status

This is a sanitized public draft, not a launch announcement. Human review and approval remain outstanding. Setup, live documentation checks, permission tests, and fresh-member testing have not occurred. No server configuration, invitation, publication, or other live action was performed or authorized.
