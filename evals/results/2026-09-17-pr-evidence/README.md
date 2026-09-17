# Source-scaled walkthrough evidence

All six saved walkthroughs pass the original source criteria and revised code-evidence contract. Each tiny walkthrough uses one complete function block. One batch-limit report required host transport recovery and a native-parent completion request, so only five runs were uninterrupted.

The focused instruction change removes the lower quota for diff evidence and rendered code. The diff-tour requests up to four contiguous verbatim excerpts, with one sufficient excerpt allowed. The final walkthrough prefers one self-contained block for a simple code change. Both artifacts must still explain the central mechanism.

## Results

| Check | Credential ordering | Batch limit |
| --- | ---: | ---: |
| Parents completed | 3/3 | 3/3 |
| Actual native reports completed | 12/12 | 12/12 |
| Original case criteria passed | 3/3 | 3/3 |
| Revised source-scaled evidence passed | 3/3 | 3/3 |
| Four initial native starts before first completion | 3/3 | 3/3 |
| All completed reports before manifest writing | 3/3 | 3/3 |
| Complete report shape on first delivery | 3/3 | 2/3 |
| Complete report shape after native recovery | 3/3 | 3/3 |
| Local instruction reads match frozen files | 3/3 | 3/3 |
| Audio no-op, stale sidecar removed, build with `--audio` | 3/3 | 3/3 |
| Existing handoff and byte-identical independent rebuild | 3/3 | 3/3 |
| Fixture type-check, lint, and 13 builder tests passed | 3/3 | 3/3 |

The small reports each return **one** verbatim diff excerpt; the batch reports each return **three**. The final manifests use **1, 1, 1** and **2, 2, 3** code blocks respectively. The two-block batch articles show validation and prefix removal as blocks, then show the exact worker call inline. The three-block article gives caller integration its own explanation. All are sufficient; the score does not require a fixed ideal count.

HTMLRewriter prose counts are **429, 444, 450** words for the small case and **492, 475, 506** for the batch case. All six explain four distinct beats with the recap last. Shortness alone is not a quality score.

## Scope

This is a six-run conformance check of the current candidate: three credential-ordering walkthroughs and three batch-limit walkthroughs. It is not a paired before/after effect estimate. The [historical workflow report](../2026-09-17-pr-workflow/README.md) identified the impossible tiny-diff hunk quota and two-block fragmentation; its outputs are context only.

The [plan](PLAN.md) and [exact prompts and source hashes](trial-freeze.json) were recorded before the first model response. All parents use native `build` with `openai/gpt-6-astra#medium`. All 24 child exports independently confirm native `general` with the same model and medium variant. Each parent owns a sibling jj clone and dispatches four native read-only report children. At most two parents ran concurrently. There was no controller feedback, controller retry, second baseline batch, or model grader.

The [setup record](SETUP.md) explains the pre-session bookmark correction and isolation adaptations. Trial roots retain TypeScript/ESLint configurations and frozen dependencies. Their meaningful `check` runs type-check, lint, and builder tests; catalog checks require files deliberately withheld from those clones.

## Inspectable evidence

The [small source](sources/pr.json) moves the same expiry condition across the send. Each final block preserves the complete after-state function:

```ts
export async function request(client, payload) {
  if (client.expiresAt <= Date.now()) await client.refresh();
  const response = await client.send(payload);
  return response;
}
```

Small run 1 says, “This diff establishes a reordered check, not an added clock read.” Small run 3 says refresh must “resolve” before sending. All three attribute the reported expiry failure to the author, scope clock-count observations to source, leave the unshown streaming implementation unknown, and avoid unconditional request-success claims. Unknown failure representation limits runtime conclusions. The first diff-tour report states author causality more strongly than the final article; synthesis restores attribution.

The [batch source](sources/pr-batch-limit.json) connects `Number(process.env.BATCH_LIMIT ?? 100)`, positive-integer validation, `pending.splice(0, limit)`, and the worker call. Batch run 2 states, “The bound counts jobs, not their memory use or processing time.” All three preserve the missing tenant key and invent no alternatives, follow-up plans, priorities, or measured benefits. Their 250-job illustrations follow from the supplied limit, rather than measurement.

**Retained interruption:** batch-limit run 2's diff-tour hit `provider.transport: WebSocket inbound queue overflow` after emitting partial text. The host recorded `retry.attempt=2` and resumed the same child. Its first actual tool return contained three complete excerpts but omitted the earlier file tour. The native parent requested those missing sections from that child and received them before writing. The original four starts were concurrent; this fifth tool call was a completion request, not a fifth report agent.

The recovered report has sufficient file context across its two deliveries and no duplicated completed excerpts. The incomplete public prefix remains in `childVisibleText`; `returnedText` records what the parent actually received. This recovery is not a controller-authorized zero-token retry and is a deviation from the planned uninterrupted conditions. The run is retained and qualified, without replacement or repair feedback from the evaluator. Five runs have no recorded transport error or report follow-up. No trials were blocked or left unrun.

Every child used only `read`; all 72 child reads match the frozen local skill, style, and fixture. Parent reads and shell commands show no installed guide load, history lookup, external fetch, or desktop opening. Host catalogs and system instructions remain common background context. No source drift was observed.

### Saved records

- [Execution records](executions.json): actual reads, model identities, native dispatch timing, shell results, source drift, prose counts, and independent rebuild hashes.
- [Scores](scores.json) and [manual source judgments](judgments.json): original case criteria plus the added source-scaled code-evidence criterion.
- [Manifests](manifests/) and [four returned reports per trial](reports/): exact outputs, report charters, actual read contents and hashes, and contiguous-source checks.
- [Source fixtures](sources/): the supplied author framing and diffs.

Prose counts use HTMLRewriter over reader-facing metadata, headings, and prose, excluding structured code and diagrams. Source substring checks establish fidelity, not explanatory quality. Manual review checks file context, sufficient mechanism coverage, legitimate block boundaries, four distinct narrative beats, final recap, and factual scope.

## Limits and archive

Private through-line drafting is untested when the public transcript does not expose an unambiguous record. Coherent final prose is judged separately. Hidden reasoning is not reviewed.

Live GitHub fetching, browser rendering, audio synthesis/playback, automatic skill routing, and content-only no-code rendering remain unrun. The text-only audio branch ran in all six trials and removed each seeded stale sidecar.

Raw exports, visible-only transcripts, install/build logs, exact instruction snapshots, and handoff artifacts are archived under:

```text
/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/pr-evidence-evidence-20260917
```

`run.ts` launches parents only. `review.ts` extracts public evidence and rebuilds outputs. `score.ts` records human/source judgments and mechanical observations separately. `archive.ts` verifies handoff snapshots before deleting disposable trial clones. The owner clone is retained for integration.

## Verification

`bun run check` passed: type-check, lint, all 40 tests, catalog/local-link checks, and skill metadata validation. Explicit strict TypeScript checks passed for all four new result scripts. All six reviewer reports passed the repository's completeness validator; that command validates recorded judgments, not prose quality. The single interrupted-delivery failure remains in `scores.json`.
