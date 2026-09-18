# Why incident history lives outside chat

Incident history lives in the issue tracker because the team needs a timeline
that survives channel cleanup and staff changes. Chat supports live
coordination, while the tracker holds the timeline and follow-up work. The
[accepted decision record](operations.md) establishes this division.

## Why coordination and history have different homes

Live coordination concerns the incident as it unfolds. Incident history must
remain useful after the conversation ends. Keeping that history in the tracker
means channel cleanup does not also remove the team's designated incident
record.

Chat still has a role: it carries coordination and links to the tracker. Those
links connect the live discussion to the place where the team keeps its
timeline and follow-up work. The two tools serve different needs within the
same incident.

## Why the record must outlast the people involved

The team has one primary on-call maintainer and one backup. The stated need to
survive staff changes means the history must remain useful to someone other
than the people who coordinated the incident.

The implication is that a later reader should not need to reconstruct the
incident from a former maintainer's chat conversations. Keeping the timeline
and follow-up work together gives that reader a designated place to understand
what happened and what work follows.

## What this decision does not guarantee

Choosing a home for incident history does not establish how quickly anyone
will respond. The decision promises no response time and no permanent
retention by the chat provider.

The tracker is the chosen home for the record, but the decision does not specify
a tracker retention policy. The reason for the separation is continuity across
chat cleanup and staff changes, rather than a guarantee that either tool keeps
data forever.

## Next steps

Read the [decision record](operations.md) for the accepted scope, or return to
the [incident documentation index](README.md).
