# Why incident history lives outside chat

Incident history lives in the issue tracker because the team needs a timeline
that survives channel cleanup and staff changes. The
[accepted decision](operations.md) gives chat and the tracker distinct roles:
chat carries live coordination and links to the tracker; the tracker stores
incident timelines and follow-up work.

## Why coordination and history need different homes

Live coordination concerns the incident as it unfolds. Incident history must
remain useful after that conversation ends. Keeping the timeline in the tracker
means the team does not depend on a chat channel remaining intact to understand
what happened.

The distinction also matters when staff change. The team has one primary
on-call maintainer and one backup. A shared timeline gives incident context a
home outside the participants' conversation. This supports continuity when
someone else needs to understand an incident and its follow-up work.

## How chat and the tracker work together

Chat remains the place for live coordination. Links connect that conversation
to the incident record in the tracker. The two serve different time horizons:
coordination during the incident, and a timeline with follow-up work that the
team can return to afterward.

This separation makes the tracker the place to look for incident history,
rather than requiring a later reader to reconstruct it from chat.

## What the decision does not guarantee

The decision assigns a home to information; it does not promise a response
time. Having a primary maintainer and a backup does not turn this storage
decision into a response-time commitment.

The decision also makes no promise of permanent retention by the chat
provider. The need for a timeline that survives channel cleanup is the reason
for keeping history outside chat, not a guarantee about how long chat messages
remain available.

## Next steps

See the [incident documentation index](README.md) for the decision record
behind this explanation.
