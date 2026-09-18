# Evaluate independently verified walkthroughs

The [frozen protocol](verified-walkthrough.json) separates fact extraction, verification, and writing into three fresh sessions.
It is an experimental evaluation workflow. Its [first comparison](../results/2026-09-07-verified-walkthrough/README.md) improved conflict detection, but exposed factual and prose-quality defects.

See the [counterexample and reader-facing revision](CHALLENGED-WALKTHROUGH.md) for the next experiment and its bounded quotation-repair policy.

## Prepare the inputs

Choose a case from [cases.json](../cases.json). Keep its criteria and reference outputs with the reviewer.
Use the same model and tool configuration for all compared trials. Give every modifying session its own fresh sibling clone.
Copy only the required fixture and upstream artifact into each session's working directory; withhold evaluator cases and example outputs from the clones.

Substitute these placeholders in the protocol text:

| Placeholder | Value |
| --- | --- |
| `<SOURCE>` | Absolute path to the supplied PR JSON |
| `<WORK>` | Absolute path to this stage's output directory |
| `<FACTS>` | Path to the extractor's `facts.json`, copied into the verifier's directory |
| `<VERIFICATION>` | Path to the verifier's `verification.json`, copied into the writer's directory |
| `<STYLE>` | Path to the tested skill's `STYLE.md` |
| `<BUILD>` | Path to the tested skill's `scripts/build.mjs` |

Keep the protocol text fixed before running a held-out case. Record its hash and the fixture hash with each trial.

**Complete when:** the reviewer holds the criteria, the stage inputs are isolated, and the tested model, protocol, fixture, and skill revision are recorded.

## Run the three stages

1. Submit the protocol's `extract` prompt to a fresh session. Save its transcript and `facts.json`.
   Check that it contains 1–12 facts with unique IDs, a supported category, a claim, a caveat, and source evidence.
   Resolve every JSON Pointer into the original fixture and check that its quoted string occurs verbatim there.

   **Complete when:** the extractor has stopped and the facts file passes the structural and quotation checks.

2. Submit the `verify` prompt to a different fresh session with the fixture and extracted facts.
   Save the verifier's transcript and `verification.json`.
   Apply the same fact and quotation checks to `approved`. Check that every input fact is accounted for by `approved.inputIds` or `rejected.inputId`.
   Admit the writing stage only after those checks pass.

   **Complete when:** an actual separate verifier session has finished, its input and output are recorded, and every extracted fact has a review decision.

3. Submit the `write` prompt to a third fresh session with the fixture and verified facts.
   Save the manifest, HTML, transcript, and builder result. Preserve the complete chain of session IDs and input/output hashes.
   If an earlier stage failed or did not finish, mark the trial blocked rather than letting the writer supply its own verification.

   **Complete when:** the writing session has stopped and a successful builder result accompanies the manifest and HTML.

## Review the result

Use the [evaluation guide](../README.md) to score the final artifact against the unchanged case criteria.
Inspect the final prose independently; structural and quotation checks do not prove a fact is true.
Also record these findings separately from the frozen criteria:

- New false guarantees introduced by the verifier or writer.
- Internal fact IDs, reviewer instructions, or drafting notes copied into the essay.
- Misleading attributions or caveats lost between stages.
- Runtime failures and blocked stages, including attempts with no model response.

**Complete when:** the final prose has an evidence-based score, stage execution is verified from tool records, and additional defects and blocked attempts are reported.
