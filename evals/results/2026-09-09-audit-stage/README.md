# Final audit-stage study: blocked before model execution

**No audit-effect result is available.** Both permitted external graders failed neutral availability checks with HTTP 401, `provider.auth`: “OAuth access token is invalid.”
Each failed again in one fresh rerun. All four exports record zero input/output/reasoning/cache tokens and zero cost.
The study stopped before independent control acceptance, as specified by its prerequisite. Astra was not substituted as the grader.

## What this study would isolate

The comparison holds the writer and auditor at `openai/gpt-6-astra#medium`.
Each draft-alone artifact would be compared with the **same unchanged original** after one fresh independent audit.
Three fresh drafts per fixture would produce nine pairs. Six separate control audits would measure correction and preservation.
This addresses the model-ability confound in the [earlier audit-model comparison](../2026-09-08-final-narrative-audit/README.md).

The [study protocol](PROTOCOL.md), [writer prompt](WRITER.md), [schema summary](MANIFEST.md), and [reviewer criteria](reviewer/CRITERIA.md) were saved before any narrative model results.
The existing [final audit protocol](../../protocols/FINAL-NARRATIVE-AUDIT.md) remains byte-for-byte unchanged.
The preparation base is `ec73558cec7981ebfa88d94a0c25c80f5f2cd944` (`eval/audit-stage-base@origin`).
This is a writing/audit component study, not an evaluation of the full skill workflow.

## Execution accounting

| Stage | Planned | Completed | Status |
| --- | ---: | ---: | --- |
| Neutral external-grader checks | Two candidates, at most one fresh rerun each | 4 attempts, 0 successful | All excluded for authentication failure |
| Independent correct-control acceptance | 3 | 0 | Blocked |
| Astra original drafts | 9 | 0 | Unrun |
| Astra paired audits | 9 | 0 | Unrun |
| Astra control audits | 6 | 0 | Unrun |
| Masked external artifact grades | 30 if every artifact exists | 0 | Unrun |

The neutral checks contained no fixture answers and made no tool calls. Exported models and locations match the requested models and the study clone.
Both grader models appear enabled in the service catalog; catalog availability did not establish authentication availability.
The `opencode2 models` command produced no output in this environment, so catalog evidence came from `GET /api/model`.
See [preflight-results.json](preflight-results.json) for model entries, session identities, provider errors, timestamps, and recorded usage.
End-to-end latency was captured only for the fresh reruns in the raw evidence; initial smoke exports contain service timestamps only.

There are no before/after correctness, attribution, prose, growth, introduced-defect, or audit-cost measurements.
No meaningful paired estimate or statistical uncertainty interval can be calculated from zero pairs.

## Prepared and verified material

| Fixture | Complete functions and contracts | Deterministic observations |
| --- | --- | --- |
| Retry behavior | [Source](fixtures/retry/source.json) | [Probe code](fixtures/retry/probe.mjs), [results](fixtures/retry/probe-results.json): budget exhaustion, permanent errors, zero retries, sleep rejection, duplicate side effects, independent concurrent calls |
| Transaction boundary | [Source](fixtures/transaction/source.json) | [Probe code](fixtures/transaction/probe.mjs), [results](fixtures/transaction/probe-results.json): write/commit failures, external publication failures before/after effect, concurrent duplicate publication |
| Cache invalidation | [Source](fixtures/cache/source.json) | [Probe code](fixtures/cache/probe.mjs), [results](fixtures/cache/probe-results.json): sequential success, failed write, fill during write, delayed old snapshot after invalidation |

Every fixture includes complete before/after functions, explicit contracts, an author's claim, and empty prior verification with `status: "none"`.
The probes execute the exact local functions. Cache scheduling uses promise gates rather than timing guesses.
Passing assertions establish these modeled paths, not general production guarantees. Process death is a contractual possibility, not a tested transaction probe.

The [control candidates](reviewer/controls.json) contain concise correct narratives and one title-only corruption per fixture.
The preparing agent checked their claims against source paths and probe results. This is not independent acceptance.
All six candidate manifests built, and mechanical comparison confirmed that only `/title` differs in each pair.
The correct candidates remain **pending external review**. None entered an audit session, and no blind label mapping was generated.

[design-lock.json](design-lock.json) records the pre-result design snapshot, including hashes of STYLE.md and the unchanged audit protocol.
It is not a claim that the independent control-admission gate passed. If independent review requires a revision, record it and create a new snapshot before launching the batch.
Reviewer facts and candidate controls live under reviewer/ for publication; the protocol requires withholding them from evaluated workspaces.
No evaluated model workspace was created because the prerequisite failed.

## Reproduce preparation

From the repository root, install dependencies with `bun install --frozen-lockfile`.
Also run that command in `skills/pr-walkthrough/scripts`, whose package contains the builder and narration dependencies.

```sh
bun evals/results/2026-09-09-audit-stage/prepare.ts
```

This executes the three probe suites, regenerates source and observed-results JSON, checks title-only corruption, builds six controls under `.evals/audit-stage/builds`, and records input hashes.
It does not invoke a model or judge prose.

```sh
bun evals/results/2026-09-09-audit-stage/preflight.ts
```

This queries the permitted graders in order and records neutral session exports in a new `.evals/audit-stage/preflight-*` directory.
Exit 1 means neither candidate passed. Authentication must be restored before a new run; this study exhausted its one fresh rerun per candidate.
The full 24-session narrative batch and masked grading require following PROTOCOL.md. No automatic batch runner is claimed here.

## Validation and evidence

- `bun install --frozen-lockfile`: passed at the repository root and in `skills/pr-walkthrough/scripts`.
- `bun evals/results/2026-09-09-audit-stage/prepare.ts`: passed; three probe suites, six builds, three title-only comparisons.
- `bun run check`: passed after installing the nested package dependencies. Type-check, lint, 40 tests with 174 expectations, metadata, local Markdown links, and marketplace validation passed.
- Explicit strict TypeScript checking of `prepare.ts` and `preflight.ts`: passed. These result-directory scripts are outside the root tsconfig include paths.
- The first check failed because the fresh clone lacked nested `shiki` and `kokoro-js` dependencies. Installing the existing lockfile dependencies resolved it.
- Model evaluation: blocked as counted above. Browser rendering: untested; this is a component study with builder checks.

Raw exports, concise visible transcripts, rerun latency records, build logs, and generated HTML are archived at:

```text
/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/audit-stage-evidence-20260909
```

Copy its `audit-stage/` directory into the receiving repository's `.evals/audit-stage/` before deleting the disposable study clone.
The committed report and fixture data remain available without that archive. Raw exports remain separate from visible transcripts, which omit hidden reasoning.

The preparation supports a later controlled run. It provides no evidence for adopting a final audit as the default workflow.
