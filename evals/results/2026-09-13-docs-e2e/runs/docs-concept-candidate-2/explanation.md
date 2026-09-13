# Why incident history lives outside chat

Incident history lives in the issue tracker because the team needs a timeline
that survives channel cleanup and staff changes. Chat serves a different need:
live coordination. The [decision record](operations.md) assigns incident
timelines and follow-up work to the tracker, with links from chat.

## Live coordination and lasting history serve different needs

During an incident, chat carries the team's coordination. Afterward, the team
still needs the timeline and the follow-up work. Keeping that record in the
tracker separates its usefulness from the lifetime of a chat channel.

Chat links connect these two contexts. They point from the live conversation
to the incident record, so chat can support coordination while the tracker
holds the history the team needs later.

## The record needs to outlast its participants

The team has one primary on-call maintainer and one backup. The stated need to
survive staff changes means incident history must remain useful beyond the
people who took part in the conversation. A shared tracker record gives that
history a home outside the original chat context.

This is the continuity the decision seeks: preserving the timeline and
follow-up work when channels or staff change.

## The decision defines where history belongs, not a service guarantee

The decision does not promise a response time or permanent retention by the
chat provider. Keeping incident history outside chat avoids making that
history depend on permanent chat retention. It does not establish how quickly
the primary maintainer or backup will respond.

## Next steps

Read the [accepted decision](operations.md) for the recorded scope of this
separation.
