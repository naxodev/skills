# Why incident history lives outside chat

Incident history lives in the issue tracker because the team needs a timeline
that survives channel cleanup and staff changes. The
[accepted decision](operations.md) gives chat and the tracker distinct roles:
chat carries live coordination and links to the tracker; the tracker stores
incident timelines and follow-up work.

## Why live coordination is not the incident record

Chat supports the conversation while an incident is happening. The incident
record serves a longer-lived need: preserving the timeline beyond the channel
and the people involved. Keeping that record outside chat means channel cleanup
does not have to determine whether the team still has its incident history.

The distinction concerns purpose, not whether chat remains useful. Chat connects
the live discussion to the stored timeline through links. The tracker gives the
timeline and follow-up work a home beyond that discussion.

## Why continuity matters for this team

The team has one primary on-call maintainer and one backup. Staff changes make
continuity important: the timeline needs to survive a change in who handles
incidents. A shared record outside the conversation supports that goal without
making the conversation itself the lasting history.

Keeping follow-up work alongside incident timelines also connects what happened
with the work that follows. This is a consequence of storing both in the tracker,
rather than a separate guarantee about how quickly anyone will act.

## What the decision does not guarantee

Choosing where history lives does not establish a response time. The presence
of a primary maintainer and a backup does not add such a promise.

The decision also does not promise permanent retention by the chat provider.
Its rationale is to preserve incident history beyond chat, not to depend on
chat remaining available indefinitely.

## Next steps

Read the [decision record](operations.md) for the accepted scope of this split
between coordination and history.
