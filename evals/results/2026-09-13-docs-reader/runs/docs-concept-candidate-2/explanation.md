# Why incident history lives outside chat

Incident history belongs in the issue tracker because the team needs a timeline
that survives channel cleanup and staff changes. Chat serves a different need:
live coordination. Keeping these roles separate means the conversation can move
on without becoming the only record of the incident.

## Why the conversation is not the record

During an incident, chat carries coordination and links to the tracker. The
tracker stores the incident timeline and follow-up work. This division follows
the accepted [decision record](operations.md).

The distinction is between what helps people coordinate now and what they need
to understand later. A chat conversation can support the immediate response,
but the team's history must remain useful after a channel is cleaned up or the
people involved have changed. The tracker gives that history a home outside
the conversation.

## Why continuity matters for this team

The team has one primary on-call maintainer and one backup. The need to preserve
history through staff changes explains why it cannot depend only on the people
who took part in the chat. A later reader needs the incident timeline and
follow-up work, even if they did not participate in the response.

Keeping both in the tracker connects the account of the incident with the work
that follows it. Chat links point back to that record, so live coordination and
incident history serve distinct purposes while remaining connected.

## What the decision does not promise

The decision establishes where the team stores incident history. It does not
promise a response time or permanent retention by the chat provider. The
presence of a primary maintainer and a backup does not add a response-time
commitment to the decision.

## Next steps

Read the [decision record](operations.md) for the accepted policy, or return to
the [incident documentation index](README.md).
