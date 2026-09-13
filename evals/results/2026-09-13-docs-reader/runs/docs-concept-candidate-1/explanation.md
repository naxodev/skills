# Why incident history lives outside chat

Incident history lives in the issue tracker because the team needs a timeline
that survives channel cleanup and staff changes. The
[accepted decision](operations.md) gives chat and the tracker different roles:
chat carries live coordination and links to the tracker; the tracker stores
incident timelines and follow-up work.

## Why live coordination is not the incident record

Live coordination serves the people responding now. Incident history must also
serve people who need to understand the incident later, after a channel has
been cleaned up or the staff has changed. Keeping the timeline outside chat
means the team does not depend on that conversation remaining available as
its incident record.

Chat still has a role. Links connect the live conversation to the tracker,
where the timeline and follow-up work belong. The distinction is between
coordinating the response and preserving its history, not between using chat
and abandoning it.

## Why continuity matters for this team

The team has one primary on-call maintainer and one backup. In that context,
a shared record gives continuity a place outside any one person's recollection
or participation in a chat. This is an implication of the decision's stated
need to survive staff changes, rather than a separate staffing or handoff policy.

Keeping follow-up work alongside the timeline also connects later work to the
incident record. The record's purpose extends beyond the live conversation.

## What the decision does not guarantee

Choosing where history lives does not promise a response time. The staffing
arrangement does not establish one either. The decision also makes no promise
of permanent retention by the chat provider.

The tracker is the chosen home for incident history. That choice should not
be read as a guarantee of permanent retention: the decision does not specify
the tracker's retention policy.

## Next steps

Read the [decision record](operations.md) for the accepted scope of the split
between chat and the tracker.
