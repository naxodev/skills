# Walkthrough structure clarification

The candidate gives one answer about section count and the ending. It uses four distinct required sections, evidence-earned optional sections before the recap, and word ceilings without minimums.

## Component result

Twelve fresh `openai/gpt-6-astra#medium` build-agent sessions completed: three per arm on each of two fixtures. Baseline instructions came from `c9b5afa3`. Candidate instruction hashes, exact prompts, input hashes, and trial locations are in [freeze.json](freeze.json). The [plan](PLAN.md) was frozen before any trial. No semantic retries, mechanical repairs, infrastructure exclusions, or replacement sessions occurred.

| Check | Small baseline | Small candidate | Multi-file baseline | Multi-file candidate |
| --- | --- | --- | --- | --- |
| Distinct required beats in order, recap in its own final section | 1/3 | 3/3 | 3/3 | 3/3 |
| Total section ceiling | 3/3 | 3/3 | 3/3 | 3/3 |
| Optional sections add a distinct explanation | 0/3 | 3/3 | 0/3 | 3/3 |
| Supported content, no invented optional claims | 3/3 | 3/3 | 3/3 | 3/3 |
| Word ceiling | 3/3 | 3/3 | 3/3 | 3/3 |
| Model build and separate reviewer build | 3/3 | 3/3 | 3/3 | 3/3 |

Small baselines used 6, 5, and 5 sections. Two placed the recap inside the final “What's next” section. All candidates used four sections. Multi-file baselines already preserved the required order and final recap; this comparison shows no improvement on that check.

The optional-section judgment is narrower than factual correctness. Small baselines repeated the streaming follow-up already explained in trade-offs. Multi-file baselines repeated the implementation's three-file explanation in a file-tour table. Those sections added no distinct explanation under the new contract. The old menu encouraged these choices. This is a reviewer judgment about redundancy, not evidence of fabricated facts.

Word counts include title, subtitle, metadata, section labels, headings, and HTML-parsed content; they exclude structured code and diagram source. The integration review replaced tag-stripping with HTMLRewriter to preserve comparison text. Per-run counts are recorded in scores.json. Every output stayed below its ceiling; shorter output alone is not a quality score.

## Evidence and limits

[Scores and source grounds](scores.json) record each manifest's count, order, word count, local instruction-read hashes, observed build calls, and manual content review. [Execution records](executions.json) verify exported model, build agent, and explicit clone location. [Manifests](manifests/) retain the generated content for review. The scorer checks the recorded local file reads against exact frozen instructions. All inputs remained unchanged.

The same original PR and four fixed evidence reports were supplied to each arm. PR #42 retains the author's extra-clock-read claim alongside the diff's moved check and documented streaming follow-up. The modest three-file PR #108 retains its batch-count boundary, startup validation, and missing tenant key. Source review covered those explanatory beats, not labels alone.

This evaluates **step 4 synthesis and text-only building**, not the full workflow. Full invocation, GitHub fetch, step 3 four-agent dispatch, narration, and browser rendering remain **unrun**. The supplied reports isolate synthesis and do not establish report-generation quality. Two fixtures and three runs per arm do not establish general model reliability.

Raw exports, visible text/tool transcripts without hidden reasoning, HTML, exact baseline/candidate instructions, original inputs, and reports are retained in ignored `.evals/structure/` and this external archive:

```text
/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/walkthrough-structure-evidence-20260913
```

The archive's root contains the frozen instruction pairs and source packets; `runs/` contains each trial's raw evidence. Public files avoid duplicating those snapshots.

## Verification

Root and nested frozen Bun installs passed. `bun run check` passed type checking, lint, 40 tests, catalog checks, local links, and metadata validation. The added fixture case definitions pass the repository evaluation checks. The new comparison scripts also pass their explicit strict TypeScript project check. No implementation-mirroring tests were added for the instruction edits.
