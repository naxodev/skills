# Sprig community operating plan

**DRAFT — UNAPPROVED · 2026-09-17**

## Purpose and evidence

Sprig is a local-first Markdown notebook with a CLI importer and desktop editor. This proposed community helps invited beta members import notes, report editor defects, and suggest changes.

This is a greenfield plan. The fictional project has no server. Community disabled is a fixed planning assumption. The only project evidence is `packet.md`, dated 2026-09-17. Its routes express project policy; their availability is unverified. Current Discord labels, feature behavior, permissions, and member experience are untested. No comparable-community observations are available. The local Discord skill and its references supply planning guidance, not additional project evidence.

## Member journeys

| Journey | Entry and next action | Durable handoff | Proposed role job and response |
| --- | --- | --- | --- |
| Arrive and orient | Read `#start-here`, open the import guide, then optionally introduce your goal in `#workshop`. | Documentation and contribution instructions below. | Community Steward keeps directions current. Orientation should work without a personal welcome. |
| Get help or report a bug | Read the guide, search existing issues, then post one focused question in `#workshop` using the support template. | Confirmed defects go to the bug template. Reusable answers become documentation changes. | Import Guide helps with the CLI importer; Editor Guide helps with the desktop editor. Members may help each other. No response-time promise applies. |
| Participate or suggest a change | Share a goal, lesson, or proposed change in `#workshop`; explain the problem before suggesting a solution. | Ideas use the idea template. Documentation and code changes use pull requests. Consequential decisions belong on the relevant issue. | The relevant Guide clarifies the request and points to the durable route. Discussion does not promise implementation. |

These are fictional role jobs, not additional staffing positions. One person may perform several jobs.

## Small channel structure

| Proposed channel | Type and member use | Job |
| --- | --- | --- |
| `#start-here` | Read-only text | Welcome, rules, canonical links, participation instructions, and occasional curated release notes linking to durable releases. |
| `#workshop` | Writable text | Import help, editor questions, introductions, feedback, and small examples of useful workflows. |

Both are default member destinations once beta access is granted. One conversation channel keeps members from choosing between overlapping help, bugs, feedback, and chat channels. A single orientation channel also handles irregular release messages without an empty release feed.

Use optional text headings such as `CLI importer — help`, `desktop editor — bug`, or `documentation — idea`. These are writing conventions, not enforced tags. Forums and forum tags are not applicable. Announcement-channel behavior, Rules Screening, native Onboarding, and Server Guide are also not applicable under this plan. Read-only text and pinned directions provide the orientation fallback.

## Ready-to-use draft orientation

> Welcome to Sprig, a local-first Markdown notebook with a CLI importer and desktop editor. Start with the import guide. Use `#workshop` for help, feedback, or a short introduction. Check existing issues before opening a new one. Put confirmed bugs, ideas, contributions, and decisions in the repository so others can find them later.
>
> Be respectful. Keep questions focused. Never post credentials, personal notes, raw customer data, or private logs. Use small synthetic examples. Community support is asynchronous and has no guaranteed response time. There are no scheduled meetings.

Three starter tasks:

1. Read these directions and the import guide.
2. Try importing a small set of synthetic Markdown notes. If you need help, use the template below.
3. Optionally share your goal or one lesson in `#workshop`, or use the contribution guide for a documentation improvement.

### Support template

```text
Surface: CLI importer / desktop editor
App or CLI version:
Operating system:
Goal:
Expected result:
Actual result and sanitized error:
Small synthetic reproduction:
What I already tried:
Existing issue, if any:
```

Never request personal notebooks or raw customer data. A useful answer should include a documentation link when available. If a defect is confirmed, link its issue back to the conversation. Members may open a complete issue directly without waiting for community triage.

### Participation template

```text
Surface: CLI importer / desktop editor / documentation
Goal or problem:
What I tried or learned:
Suggested change or question:
Sanitized example, if useful:
Related idea, issue, or pull request:
```

The Guides summarize consequential outcomes on the relevant issue. Acknowledging a suggestion does not place it on a roadmap.

## Durable public routes

| Purpose | Destination |
| --- | --- |
| Documentation | https://sprig.example/docs |
| Import guide | https://sprig.example/docs/import |
| Source and existing issues | https://code.example/sprig/notebook |
| Bug report | https://code.example/sprig/notebook/issues/new?template=bug |
| Product idea | https://code.example/sprig/notebook/issues/new?template=idea |
| Contribution instructions | https://code.example/sprig/notebook/blob/main/CONTRIBUTING.md |
| Releases | https://code.example/sprig/notebook/releases |

Documentation and code contributions use repository pull requests. Reusable support answers become documentation changes. The relevant issue records product decisions. Discord discussion is not the sole record of actionable work.

## Sustainable participation

- Community Steward maintains orientation and keeps conversations usable.
- Import Guide and Editor Guide perform bounded support triage and durable handoffs for their product surfaces.
- Release Writer adds a short, useful note when a release warrants one and capacity allows. The release page remains authoritative.
- Members can answer questions, improve documentation, and share small examples without joining meetings.

Work is asynchronous. No response deadline, recurring meeting, event cadence, or publishing schedule is promised. Voice, separate showcase channels, and channel expansion are deferred until there is a clear need and an owner with capacity.

At each proposed triage review, check repeated redirects, unanswered posts, and work exceeding available capacity. Repeated misrouting should first improve the start message or template. Persistent unresolved demand should narrow commitments before adding channels. These are proposed review signals, not observed problems or member-count targets.

## Draft status

Human review is still required for ownership assignments, workload allocation, member rules, and the final operating plan. No server configuration, member testing, or live action has occurred. This document is a sanitized public draft, not a complete implementation specification or launch approval.
