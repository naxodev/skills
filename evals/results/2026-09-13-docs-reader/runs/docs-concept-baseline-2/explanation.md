# Why incident history lives outside chat

Incident history needs to remain useful after the live conversation ends. The
[accepted decision](operations.md) assigns incident timelines and follow-up work
to the issue tracker. Chat supports live coordination and links to that record.

## Why the timeline needs a separate home

The team needs a timeline that survives channel cleanup and staff changes.
Keeping that history in the tracker means the incident record does not depend
on preserving the channel where people coordinated their response.

Staff changes create a related need: later readers need to understand an incident
without relying on the people who were present. A timeline provides that context,
while follow-up work records what remains to be addressed. Keeping both in the
tracker connects the incident to the work that follows it.

## How chat and the tracker fit together

Chat serves the immediate conversation. The tracker holds the history and
follow-up work that need to outlast it. Links from chat connect these two roles:
people can coordinate in the channel while referring to the incident record.

The practical implication is that chat alone is not the incident history.
A conversation can help people respond now, but the tracker is the place a later
reader should look for the timeline and follow-up work.

## What this decision does not guarantee

The decision assigns responsibility for the record; it does not promise permanent
retention by the chat provider. It also does not specify a retention period for
the tracker. The need for lasting history is the reason for the separation,
not a guarantee that either service keeps data forever.

The team has one primary on-call maintainer and one backup. That staffing context
does not establish a response-time commitment. The decision makes no such promise:
where history lives and how quickly someone responds are separate questions.

## Next steps

Read the [decision record](operations.md) for the accepted scope of this arrangement.
