# Full drafting through rendered verification

**The candidate closed the observed renderer-discovery gap in this batch.**
Authors discovered Glow and inspected both the drafted page and README entry
point in **6/6 candidate runs versus 1/6 baseline runs**. All six procedural
pages passed independent fresh-copy replay. All six explanations preserved the
source-backed distinction. This shows a workflow improvement on these two cases,
not overall skill reliability or better reader outcomes.

Execution: **2026-09-13, 20:05:18–20:11:40 UTC**. These are twelve new full-workflow
sessions, not the previous verification-only sessions or pooled historical scores.

## Results

| Check | Baseline | Candidate |
| --- | --- | --- |
| Author discovers capable renderer and inspects page + README, how-to | 1/3 | 3/3 |
| Author discovers capable renderer and inspects page + README, explanation | 0/3 | 3/3 |
| Author explicitly identifies terminal rendering scope | 0/6 | 6/6 |
| Author source checks and supported claims | 6/6 | 6/6 |
| Author navigation and README entry-point checks | 6/6 | 6/6 |
| Correct build/checker/sidebar applicability with reasons | 6/6 | 6/6 |
| How-to: Bun/root, config copy, release choice, persistence rationale | 3/3 | 3/3 |
| How-to: author clean-copy execution and actual saved-content verification | 3/3 | 3/3 |
| How-to: independent fresh-copy replay with exact saved bytes | 3/3 | 3/3 |
| Explanation: continuity distinction, source limits, no forced recipe | 3/3 | 3/3 |
| Broad false-unavailable claims | 3/6 | 0/6 |
| Supported finished handoff | 1/6 | 6/6 |
| Explicit draft pending rendered inspection | 4/6 | 0/6 |
| Untested rendering reported, draft label omitted | 1/6 | 0/6 |

The baseline's successful author named Markdown and Glow but did not explicitly
state terminal-only scope. This is a wording difference, not a false browser pass.
No author claimed browser/site UI verification.

### Why the baseline checks stopped

How-to baseline runs 1 and 3 stopped after finding `Bun.markdown` unavailable.
Concept baseline run 3 did not attempt viewer discovery. These three made broad
claims that no viewer was available, despite installed Glow.

Concept baseline runs 1 and 2 checked other tools but missed Glow. Their final
claims were narrower: a failed Bun rendering attempt, and no usable renderer
“among the tools checked”. Those are accurate claims about incomplete discovery,
not two more false assertions of global unavailability.

How-to baseline run 1 listed rendering as untested but omitted the required draft
label. The other four blocked runs explicitly handed off drafts. The candidate
completed applicable checks in all six runs and supported finished handoffs.

## Per-run pages and evidence

| Case/repeat | Baseline page | Candidate page | Author rendering, baseline / candidate |
| --- | --- | --- | --- |
| Release card 1 | [Guide](runs/docs-reader-start-baseline-1/guide.md) | [Guide](runs/docs-reader-start-candidate-1/guide.md) | Untested / inspected both |
| Release card 2 | [Guide](runs/docs-reader-start-baseline-2/guide.md) | [Guide](runs/docs-reader-start-candidate-2/guide.md) | Inspected both / inspected both |
| Release card 3 | [Guide](runs/docs-reader-start-baseline-3/guide.md) | [Guide](runs/docs-reader-start-candidate-3/guide.md) | Untested / inspected both |
| Incident history 1 | [Explanation](runs/docs-concept-baseline-1/explanation.md) | [Explanation](runs/docs-concept-candidate-1/explanation.md) | Untested / inspected both |
| Incident history 2 | [Explanation](runs/docs-concept-baseline-2/explanation.md) | [Explanation](runs/docs-concept-candidate-2/explanation.md) | Untested / inspected both |
| Incident history 3 | [Explanation](runs/docs-concept-baseline-3/explanation.md) | [Explanation](runs/docs-concept-candidate-3/explanation.md) | Untested / inspected both |

[REVIEW.md](REVIEW.md) records manual source-referenced decisions, exact author
quotes, commands, output observations, handoff reasons, and independent checks.
[SOURCE-GROUNDS.md](SOURCE-GROUNDS.md) supplies the independent factual contract.
Generated pages and README files are unchanged, with local link targets retained.

### Independent review

After each author finished, the reviewer inspected the generated commands before
running them in a fresh copy containing no selected config or generated card.
All six procedures copied the example, selected release rather than preview,
used `--write`, and verified exactly **`release-2.4.0\n`**. No hidden setup was needed.
Exit status alone was not the success criterion.

The reviewer separately rendered all twelve pages and all twelve README entry
points with `glow -s dark -w 100`. Commands, outcomes, distinctions, and entry links
were readable. Long absolute link expansions wrap. Baseline guide 3 joins two
adjacent paragraphs at `release-2.4.0.Keep`; its commands remain readable.
These independent checks do **not** repair missing author verification credit.
Terminal Markdown review does not verify a docs site's CSS, components, or interactions.

## Frozen method and integrity

- Baseline: `9ea67e23`, the reader-contract version before renderer clarification.
  Candidate: `9b131265`, with `SKILL.md` SHA-256
  `6bdde47350eeebd3073ad504f819a9df495eaeef52c65a2fbee6636f13fa8057`.
  The two reference files are identical between arms. No skill text changed here.
- [PLAN.md](PLAN.md), model/settings, prompt hashes, source packets, runtime
  preflight, dispatcher, and exact three-file skill snapshots were frozen before
  submissions in [freeze.json](freeze.json).
- Both cases reuse the **exact original reader-study prompts and packets**.
  Their bytes match the original archive and freeze; procedural repository sources
  also match. The original concept README was copied from the archive.
  Prompts request drafting and verification; they do not name Glow or isolate step 5.
- `openai/gpt-6-astra#medium`, build agent, three fresh sessions per arm per case,
  twelve total, at most three concurrent. Each session started in its own fresh
  sibling `jj` clone. Repository content and history were removed before supplying
  only the source packet and frozen local skill. No evaluation material or
  controller helper was placed in observed workspaces.
- Controller preflight confirmed `/opt/homebrew/bin/glow`, version **3.0.0**, and
  its help before dispatch. Both arms had the same installed renderer. No tools
  were installed in evaluation workspaces.
- API creation specified each directory explicitly. All twelve exports matched
  the expected model, agent, directory, and exact user prompt. All required local
  skill/reference reads matched frozen text; no installed-skill calls occurred.
  See [executions.json](executions.json) and [read-checks.json](read-checks.json).
- All immutable inputs remained unchanged. Final differences were requested pages
  and README updates, plus workspace-local Glow config/cache files in concept
  candidate 1. Those support files remain in its raw archive. Authors removed
  their temporary procedural verification copies.
- Fifteen-minute wait bounds; no timeouts, retries, discarded sessions, provider
  recovery, semantic reruns, or grader model. Ordinary author errors remain in
  transcripts: baseline guide 2 corrected shell quoting; baseline concept 1
  encountered unsupported `Bun.markdown`.
- Each completed workspace was archived before its owned evaluation clone was
  removed. The dispatcher is a completed command script; do not rerun this batch
  or import its top-level dispatch as a helper.

## Duration and exposed service usage

| Measure, six sessions per arm | Baseline | Candidate |
| --- | --- | --- |
| Per-session elapsed range | 64.7–142.9 seconds | 61.1–113.6 seconds |
| Total session elapsed | 531.4 seconds | 521.7 seconds |
| Reported input tokens | 159,054 | 165,609 |
| Reported output tokens | 9,681 | 10,331 |
| Reported reasoning tokens | 1,398 | 463 |
| Reported cache-read tokens | 1,086,976 | 1,099,392 |
| Reported cost field | 0 | 0 |

The batch took about 6 minutes 22 seconds with concurrency. Token fields are
reported separately as exposed by session exports. The zero cost field is not
evidence of free service. This small batch does not establish a latency difference.

## Limits and storage

The [reader study](../2026-09-13-docs-reader/README.md) found a discovery gap during
full drafting. The [renderer study](../2026-09-13-docs-render/README.md) tested only
step 5. This follow-up now tests the complete workflow on the original two cases.
Historical scores are context only and are not pooled into this batch.

Automatic routing, tutorials, reference pages, live external APIs, MDX component
rendering, and browser review remain unrun. Two source-rich cases and one provider
model can create a ceiling for reader outcomes; both arms already passed them.
The observed discovery improvement does not establish overall reliability.

The complete archive, outside the owner clone, is:

`/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/docs-e2e-evidence-20260913`

It contains frozen inputs, raw exports, visible-only tool/text transcripts,
generated workspaces, manual inspections, replay logs, rendered outputs, and this
public result. Raw exports with hidden reasoning stay in that archive and ignored
`.evals/docs-e2e/`; public evidence contains visible text/tool observations only.

## Repository verification

- Root and nested walkthrough-script `bun install --frozen-lockfile`: passed.
- Explicit strict TypeScript check of the three evaluation scripts and local
  fixture implementation: passed. These paths are outside the root TypeScript config.
- `bun run check`: passed type-check, lint, all 40 tests, and catalog/link/plugin validation.
- No prose-mirroring tests were added. Skill files and release manifests are unchanged.
