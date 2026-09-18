# Source limits used by the reviewer

This reviewer material was withheld from all evaluated sessions.
The trials receive only their original JSON fixture and current skill files.

## PR 42

The [original fixture](sources/pr.json) moves `if (client.expiresAt <= Date.now()) await client.refresh();` from after `await client.send(payload)` to before it.
This establishes source order and one explicit clock-read expression in both versions.
It does not establish exactly one clock read on every runtime call: property access or called methods can throw, and their implementations are not supplied.
Successful refresh before send does not establish that the request must succeed or cannot expire again.

The body says, “The first request after expiry failed,” and accepts an “extra clock read.”
The failure is the author's report. The displayed diff relocates an existing check rather than adding another explicit check.
The body also says streaming uses a separate path needing follow-up. That path's implementation is absent.
No rejected alternatives or measured performance result appears in the fixture.

## PR 108

The [original fixture](sources/pr-batch-limit.json) converts `BATCH_LIMIT` with `Number`, defaults to `100`, and rejects non-integers and values below one during configuration import.
`pending.splice(0, limit)` removes a bounded prefix. `tick` passes `batchLimit` into `drain` before sending the returned jobs.
Excess jobs remain pending after that drain; this is not evidence about delivery retries, failed-send recovery, memory usage, or processing time.

The body explicitly says, “This bounds batch size, not job memory or processing time.”
Per-tenant scheduling is excluded because the queue lacks a tenant key.
The fixture documents no rejected alternatives, follow-up issues, priorities, or measured benefit.

## Separate judgments

Review title, dek, metadata/footer, section prose, recap, and code against these limits.
An illustrative example may explain source semantics without becoming a measured runtime claim.
Code samples may elide surrounding context if they preserve the shown lines' meaning.
Build success, section counts, and short prose do not establish grounding or explanatory quality.
