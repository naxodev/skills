# Why the ledger owns incident history

The ledger preserves the timeline and final resolution after chat messages
expire. Chat remains the place for live coordination.

| Record | Purpose | Retention |
| --- | --- | --- |
| Chat | Coordinate the response | 30 days |
| Ledger | Store the timeline and resolution | No automatic expiry |

## Links are not copies

The ledger links to chat while messages remain available. It does not copy those
messages. Keep the distinction between durable incident history and temporary
coordination when choosing where to look for a resolution.

See the [incident record decision](decision.md) for the source policy.
