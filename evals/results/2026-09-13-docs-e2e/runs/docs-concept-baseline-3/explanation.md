# Why incident history lives outside chat

Incident history lives in the issue tracker because the team needs a timeline
that survives channel cleanup and staff changes. The [accepted decision](operations.md)
assigns incident timelines and follow-up work to the tracker. Chat carries live
coordination and links to that record.

## Why separate coordination from history?

Live coordination concerns what people need to discuss during an incident.
Incident history serves a different purpose: preserving the timeline for people
who need to understand it later. Keeping that history in the tracker means the
team does not rely on the continued availability of a chat channel as its record.

Chat still has a role. Links connect the live discussion to the incident record,
while the tracker holds both the timeline and the follow-up work. The distinction
is between where people coordinate and where the team keeps the history.

## Why does continuity matter for this team?

The team has one primary on-call maintainer and one backup. The decision names
staff changes, alongside channel cleanup, as a reason to keep history outside
chat. The implication is that understanding an incident should not depend on
the continued presence of the people who coordinated it.

Keeping the timeline and follow-up work together gives later readers a place to
find both the incident's history and the work that follows it. This supports
continuity beyond the live conversation.

## What does the decision promise?

The decision establishes where the team keeps incident history. It does not
promise a response time or permanent retention by the chat provider. The primary
and backup roles describe staffing, not a response-time commitment.

The need for a timeline that survives cleanup and staff changes explains the
choice of record location. It does not establish a retention duration or a
technical guarantee for the tracker.

## Next steps

Read the [decision record](operations.md) for the accepted scope of this separation.
