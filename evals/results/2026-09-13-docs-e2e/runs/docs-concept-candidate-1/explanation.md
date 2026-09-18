# Why incident history lives outside chat

Incident history belongs in the issue tracker because the team needs a timeline
that survives channel cleanup and staff changes. Chat supports live coordination;
it links to the record rather than serving as the record itself. The
[accepted decision](operations.md) assigns incident timelines and follow-up work
to the tracker.

## Why the timeline must outlast the conversation

Live coordination concerns what responders need to discuss now. Incident history
must also serve people who return later, after a channel has been cleaned up or
the staff have changed. Keeping that history in the tracker means the team does
not depend on the continued availability of a chat conversation for its timeline.

Follow-up work belongs alongside that timeline. This gives the incident a home
beyond the live discussion, where its history and remaining work stay connected.
Chat links point responders to that shared record.

## What this means for a small on-call team

The team has one primary on-call maintainer and one backup. A practical
implication of the decision is that the backup has a shared record to consult,
rather than depending on the primary maintainer's memory of the conversation.
The same distinction matters when staff change: the record needs to remain useful
beyond the people who coordinated the response.

## What the decision does not guarantee

Choosing where history lives does not establish how quickly someone will respond.
The decision promises no response time. It also promises no permanent retention
by the chat provider. The need for lasting history explains the choice of the
tracker; it does not turn chat into a permanent archive.

## Next steps

Return to the [incident documentation index](README.md) for the decision record
behind this explanation.
