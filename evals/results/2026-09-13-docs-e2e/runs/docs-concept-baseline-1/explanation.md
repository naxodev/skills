# Why incident history lives outside chat

Incident history lives in the issue tracker because the team needs a timeline
that survives channel cleanup and staff changes. The [accepted decision](operations.md)
assigns incident timelines and follow-up work to the tracker. Chat carries live
coordination and links to that record.

## Why separate coordination from history?

Coordination serves the people responding now. Incident history also serves
people who need to understand the incident later. Keeping the timeline outside
chat means the team does not depend on a surviving channel to preserve that
account.

The distinction is about the role of each tool. Chat remains a place to
coordinate, while its links direct readers to the tracker for the timeline and
follow-up work. The tracker connects the account of the incident with the work
that follows it.

## Why does continuity matter for this team?

The team has one primary on-call maintainer and one backup. The stated need is
for history to survive staff changes as well as channel cleanup. A shared record
outside chat supports that need: later readers have a place to look for the
timeline without relying on participation in the original conversation.

This separates the team's incident history from who happens to be coordinating
the response at a particular time.

## What does the decision guarantee?

The decision establishes where the team keeps the record. It does not promise
a response time or permanent retention by the chat provider. Having a primary
maintainer and a backup does not turn this storage decision into a response-time
commitment.

The reason for using the tracker is continuity of the incident record, not a
guarantee about how quickly someone will respond or how long chat messages will
remain available.

## Next steps

Read the [decision record](operations.md) for the accepted division of
responsibilities between the tracker and chat.
