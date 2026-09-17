# Current walkthrough workflow protocol

This protocol records the requested six-session evaluation before any trial.
Native-tool discovery happened before this file was written; it is not a preregistered preflight.
No model outcome was available when the protocol and input hashes were recorded.

## Frozen scope

- Base: `ba48b5c1`. Use its exact `skills/pr-walkthrough/SKILL.md`, `STYLE.md`, scripts, and frozen root and nested locks.
- Parents: `openai/gpt-6-astra#medium`, build agent, three `pr-grounding-quality` and three `pr-batch-limit` sessions.
- Each writer owns a fresh sibling jj clone. Withhold rubrics, evaluations, examples, and historical outputs from trial-visible files.
- Use the original case prompt, replacing the skill name with its exact local path and assigning local manifest, audio-sidecar, and HTML output paths.
- Fixture JSON replaces GitHub fetching only. No live GitHub or external source lookup. The small-case request already insists on a full walkthrough.
- Keep all remaining stages. Four native read-only report agents receive the same actual JSON path and the skill's before, diff-tour, tradeoffs, and alternatives charters. Return reports rather than writing files.
- Start all four independently before waiting. Record dispatch and completion timing, exact inputs, actual models, locations, instruction reads, and complete visible tool results.
- At most two parents run concurrently. Wait up to 15 minutes; extend only when evidence shows active children. Log extensions. Permit one fresh retry only for a zero-token infrastructure timeout. Retain self-repairs; provide no semantic feedback or replacement low-quality runs.
- Missing native dispatch blocks the study. Do not replace it with controller-written reports or API-orchestrated report sessions.

## Review

Copy every original case criterion into scores unchanged. Score source grounding separately from workflow compliance.
Inspect title, dek, footer, body, recap, code, and any narration. Apply the current required arc, optional-section rules, code requirements, and word ceilings. Count prose with HTMLRewriter, excluding structured code and diagrams.
Preserve source uncertainty: source-level clock calls do not prove per-call runtime counts; author reports require attribution; the streaming implementation is unshown. The multi-file change bounds job count, not memory or elapsed time. Do not invent alternatives or plans.
Do not relax code-block or hunk requirements for the tiny fixture to manufacture a pass.

Verify all four real reports complete before synthesis, the through-line, actual text-only audio no-op and stale-sidecar removal, build with `--audio`, and final real-path handoff without desktop opening.
Independently rebuild available manifests with the existing builder and compare the saved handoff to the artifact. Successful builds are not grounding passes.
Archive raw exports privately and visible text/tool evidence without hidden reasoning publicly. Preserve unexpected child writes and record the deviation.
Browser review, audio playback, live GitHub, and automatic invocation remain untested unless actually performed.

**Complete when:** all attempted sessions and stage outcomes are archived and scored, or the native-tool prerequisite is documented as blocked with all unrun counts explicit.
