# Official reference fixture: Parcel API v2

This is a fictional provider reference supplied as evaluation evidence. No live service exists.

`POST /v2/parcels` creates a parcel. It requires `Authorization: Bearer <token>` and a JSON body.
Required fields: `destination` (string) and `weightGrams` (positive integer).
An optional `Idempotency-Key` request header deduplicates retries for 24 hours.
The response status is 201 and its JSON body contains `id` and `status: "queued"`.
There is no `retryPolicy` body field and no client SDK in this fixture.

Requests in this evaluation must remain examples. No credentials or network access are provided.
