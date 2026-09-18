# Why incident history lives outside chat

Incident history needs to outlast the conversation that produced it. The
[accepted decision](operations.md) assigns incident timelines and follow-up
work to the issue tracker. Chat carries live coordination and links to that
record.

## Why coordination and history have different homes

Live coordination helps the people responding to an incident work together.
Incident history serves a different need: preserving the timeline for people
who need to understand it later. The team needs that history to survive both
channel cleanup and staff changes.

Keeping the timeline in the tracker makes chat a route to the record rather
than the place where the record must survive. Chat can support the response
without making its conversation history the team's incident history.
Follow-up work belongs alongside the timeline in the tracker, so the record
covers both the incident and the work that follows it.

## Why continuity matters for this team

The team has one primary on-call maintainer and one backup. A useful way to
understand the decision is that incident context must remain available beyond
the people involved in the live conversation. The tracker gives the team a
designated place for that context when staff change.

This is a distinction between coordinating now and preserving context for
later. It does not depend on everyone having participated in the same chat.

## What the decision promises

The decision establishes where incident history belongs. It does not promise
a response time or permanent retention by the chat provider. A designated
record supports continuity; it is not a response-time commitment or a chat
retention guarantee.

## Next steps

Read the [decision record](operations.md) for the accepted scope of this
separation.
