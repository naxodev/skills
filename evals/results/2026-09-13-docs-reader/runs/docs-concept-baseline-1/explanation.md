# Why incident history lives outside chat

Incident history lives in the issue tracker because the team needs a timeline
that survives channel cleanup and staff changes. The [decision record](operations.md)
assigns incident timelines and follow-up work to the tracker. Chat carries live
coordination and links to that record.

## Why live coordination and incident history have different homes

Live coordination concerns the response happening now. Incident history must
remain useful after that conversation ends. Keeping the timeline outside chat
means channel cleanup does not have to determine whether the team can reconstruct
an incident.

The tracker also holds follow-up work. This places the record of the incident
and the work that follows it in the same system. Chat links connect the live
conversation to that record without making the conversation itself the history.

## Why continuity matters for this team

The team has one primary on-call maintainer and one backup. The stated need is
for a timeline that survives staff changes. A practical implication is that
someone taking over needs a record they can consult without having participated
in the original chat.

This explains the separation of responsibilities: chat supports coordination,
while the tracker preserves the context needed beyond the current response.
That separation is a choice about where the team keeps its history, rather than
a guarantee about how quickly either maintainer will respond.

## What the decision does not guarantee

The decision promises neither a response time nor permanent retention by the
chat provider. It also specifies no tracker retention period. Choosing the
tracker as the home for incident history should not be read as a promise that
either system keeps data forever.

## Next steps

Read the [accepted decision](operations.md) for the recorded responsibilities
and limits.
