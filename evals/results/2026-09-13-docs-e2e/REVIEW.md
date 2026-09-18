# Visible author and independent reviewer evidence

These are manual judgments against [source grounds](SOURCE-GROUNDS.md), not
scores inferred from command exit. Complete visible commands and output are in
the external archive's `inspection-<run>.json` and `raw/<run>/visible.json`.
Hidden reasoning is excluded. Run names below omit the `docs-` prefix.

## reader-start-baseline-1

- Page: [guide.md](runs/docs-reader-start-baseline-1/guide.md).
- Author ran a clean local fixture, then copied the configuration, generated
  with `--write`, and verified. Output: `verified generated/release.txt: release-2.4.0`.
  A separate byte assertion checked `release-2.4.0\n`.
- Source and navigation: read README, implementation, and both configurations;
  checked local targets and the README anchor. Correct Bun/root, release choice,
  configuration copy, persistence reason, and saved-result guidance.
- Renderer: checked only `typeof Bun.markdown?.html`, which returned `undefined`.
  No capable-viewer discovery or rendered output. Final claim:
  “**Untested:** Rendered Markdown preview; no local renderer or viewer was available.”
  This unavailable claim is false in the preflight environment.
- Handoff lists untested rendering but does **not** label the page a draft.
  Build/type-check/lint/sidebar are correctly not applicable because none exist.
- Independent review: replay passed from the declared fresh root without hidden
  setup; saved bytes matched exactly. Glow rendered both files. Commands and
  expected output are readable; long local links wrap. This does not credit author rendering.

## reader-start-candidate-1

- Page: [guide.md](runs/docs-reader-start-candidate-1/guide.md).
- Author ran `command -v bun glow mdcat pandoc`, received the installed Glow path,
  checked `glow --help`, then rendered **both** files with
  `glow --config .glow-docs.yml --style ascii --width 90 <file>`.
  Actual output contains the guide's setup, commands, expected result, and README entry link.
- Final claim: “Reviewed both pages rendered with Glow. This verifies terminal
  Markdown rendering only.” Finished handoff is supported. No unavailable claim.
- Source and navigation: read the full source packet, checked local links, ran a
  clean-copy recipe and exact bytes. Visible verifier output matches the promised
  release result. Dry-run and missing/mismatched-file checks also ran.
- Correct Bun/root, release choice, configuration copy, persistence reason, and
  saved-result guidance. No build, sidebar, lint, or type-check is configured;
  their not-applicable statuses give that reason.
- Independent review: fresh-root replay passed with exact saved bytes. Both Glow
  outputs are readable; an inline path and long local links wrap. No browser/UI credit.

## reader-start-baseline-2

- Page: [guide.md](runs/docs-reader-start-baseline-2/guide.md).
- Author first found `Bun.markdown` undefined, then discovered Glow with
  `command -v pandoc glow lowdown markdown`. Ran `glow -s ascii guide.md` and
  `glow -s ascii README.md`; both returned the formatted page and entry link.
- Exact final claim: “Inspected both Markdown pages rendered with Glow, checked
  local links, and confirmed no unresolved `VERIFY` markers.” Supported finished
  handoff. It names Markdown/Glow but does not explicitly state terminal-only scope.
- Full source reads and clean-copy execution support the starting context,
  release selection, configuration copy, persistence rationale, and saved result.
  Actual output includes `verified generated/release.txt: release-2.4.0`.
  The exact-byte/link assertion initially failed with `zsh:1: unmatched '`;
  the author fixed the quote and reran it successfully in the same session.
- Build/type-check/lint/sidebar are correctly not applicable with reasons.
  No false-unavailable claim. Independent replay saved the exact expected bytes.
  Reviewer rendered both files; commands, result, and entry point are readable,
  with long links wrapping.

## reader-start-baseline-3

- Page: [guide.md](runs/docs-reader-start-baseline-3/guide.md).
- Source reads and clean-copy execution support all procedural criteria. Actual
  verifier output and a byte assertion establish `release-2.4.0\n`. The author
  also checked dry-run non-persistence and rejected a missing newline.
- Renderer discovery stopped at `typeof Bun.markdown?.html === "function"`,
  which returned false. No rendered page or README output was inspected.
- Exact final claim: “Rendered Markdown preview; no local Markdown renderer was
  available. The guide remains a draft pending that check.” Draft labeling is
  explicit, but the unavailable claim is false given installed Glow.
- Local links and README entry point were checked. Build/type-check/lint/sidebar
  statuses correctly give the absence of configured checks as their reason.
- Independent fresh replay passed with exact saved bytes. Reviewer Glow output
  joins two adjacent paragraphs at `release-2.4.0.Keep`; commands and the result
  remain readable. README entry point is visible. Author gets no rendering credit.

## reader-start-candidate-2

- Page: [guide.md](runs/docs-reader-start-candidate-2/guide.md).
- Discovered Glow using `command -v bun glow mdcat pandoc markdown`, checked help,
  and ran `glow --config .docs-verification/glow.yml --style ascii --width 90`
  on both files. Actual output includes the complete recipe and README entry point.
- Exact final claim: “Reviewed both pages rendered with Glow. This verifies
  terminal Markdown presentation.” Supported finished handoff; no unavailable claim.
- Read all source files, executed the ordered recipe in a clean local copy,
  checked exact saved bytes, source claims, local links, and README anchor.
  Actual verifier output matches `verified generated/release.txt: release-2.4.0`.
- Correct Bun/root, configuration copy, release selection, `--write` reason, and
  saved-result guidance. Correct not-applicable reasons for absent build/sidebar/checkers.
- Independent fresh replay passed with exact bytes. Both reviewer Glow outputs
  show readable commands, expected result, and entry point; long links wrap.

## reader-start-candidate-3

- Page: [guide.md](runs/docs-reader-start-candidate-3/guide.md).
- Discovered Glow using `command -v bun glow mdcat pandoc`, checked help, then
  rendered both files with
  `glow --config .docs-verification/glow.yml --style ascii --width 90 <file>`.
  Actual output contains the complete procedure, saved-result message, and entry link.
- Exact final claim: “Reviewed both pages with Glow’s terminal Markdown renderer.”
  Supported finished handoff; no unavailable claim.
- Full source reads, clean-copy ordered execution, and the exact-byte assertion
  support all procedural criteria. The visible verifier printed
  `verified generated/release.txt: release-2.4.0`. Dry-run and missing-card checks
  also ran. Links and the README anchor were checked.
- Absent build/sidebar/type-check/lint have correct not-applicable reasons.
  Independent fresh replay passed with exact bytes. Reviewer rendered both files;
  commands and expected result are readable, with long links wrapping.

## concept-baseline-1

- Page: [explanation.md](runs/docs-concept-baseline-1/explanation.md).
- Read the decision and README. The page distinguishes coordination now from
  history for later readers, ties continuity to cleanup and staff changes, and
  preserves the decision's response-time/chat-retention limits. No forced recipe.
- Searched `python3 pandoc cmark markdown bun`, missing installed Glow.
  `Bun.markdown.html` threw a TypeError before any rendering. A corrected link
  check subsequently covered both pages and the README entry point.
- Exact final claim: “The local rendering attempt failed because this Bun
  version lacks `Bun.markdown`.” This is an accurate narrow claim, not a false
  claim that all viewers are absent. Capable-viewer discovery still failed.
- Handoff: “The page remains a **draft pending rendered inspection**.” Build,
  checkers, sidebar, and procedural examples have correct not-applicable reasons.
- Independent Glow review shows readable conceptual headings, paragraphs, source
  links, and README entry point. Expanded paths wrap and leave short continuation lines.

## concept-baseline-2

- Page: [explanation.md](runs/docs-concept-baseline-2/explanation.md).
- Read the decision and README. The page gives the coordination/history
  distinction, cleanup/staff-change rationale, and no invented guarantees or recipe.
- Checked `pandoc markdown cmark bun python3`, three Python Markdown modules,
  and `Bun.markdown?.html`; did not discover Glow. Raw-source printing is not
  rendered inspection. Python checked local links and the README entry point.
- Exact final claim: “No usable local renderer was found among the tools checked.
  The page remains a draft pending this check.” The qualifier makes this a true
  narrow claim. The discovery gap remains; no author rendering credit.
- Correct not-applicable reasons for absent build/checkers/sidebar and no examples.
  Independent Glow review shows readable page and entry point, with wrapped paths.

## concept-baseline-3

- Page: [explanation.md](runs/docs-concept-baseline-3/explanation.md).
- Read the decision, README, and final page. The explanation supports continuity
  across cleanup and staff changes and identifies inference: “The implication is
  that understanding an incident should not depend on the continued presence of
  the people who coordinated it.” It adds no retention duration or response promise.
- Python checked local links, README entry point, unresolved markers, and decision
  equality. No installed-viewer discovery or rendering command occurred.
- Exact final claim: “no offline viewer was available in the supplied workspace.”
  This is a false broad unavailable claim in an environment with installed Glow.
  The page is explicitly a “**draft pending rendered inspection**”.
- Correct not-applicable reasons for absent build/checkers/sidebar and no recipes.
  Independent Glow review shows readable paragraphs and README entry point; paths wrap.

## concept-candidate-1

- Page: [explanation.md](runs/docs-concept-candidate-1/explanation.md).
- Read the decision and README. The page separates live coordination from lasting
  history, explains cleanup/staff continuity, and marks backup-reader benefits as
  “A practical implication”. It adds no guarantee or procedural setup.
- Discovered Glow with `command -v glow mdcat pandoc bun python3`, read help, and
  ran `HOME="$PWD" XDG_CONFIG_HOME="$PWD" glow --style ascii --width 88 <file>`
  for the page and README. Actual output includes all paragraphs and the entry link.
- Exact final claim: “Reviewed both pages rendered with Glow. This verifies
  terminal Markdown only.” Supported finished handoff. Python checked four links
  and the README entry point. No unavailable claim; correct applicability reasons.
- Glow created workspace-local config/cache files, retained in the raw archive.
  No input changed. Independent Glow review found readable content and entry point,
  with long expanded links and short continuation lines.

## concept-candidate-2

- Page: [explanation.md](runs/docs-concept-candidate-2/explanation.md).
- Read the decision and README. The page connects cleanup/staff continuity to
  the tracker, distinguishes coordination from later history, and preserves the
  response/retention limits without adding a recipe.
- Ran `command -v glow`, help, then
  `glow --config .glow-verification.yml --style ascii --width 88 <file>` on both
  files. Output includes the complete explanation and README entry point.
- Exact final claim: “Rendered both pages with local Glow and inspected the
  terminal output. This verifies plain Markdown, not site styling.” Supported
  finished handoff. Python checked the four links and entry point. Correct
  not-applicable reasons; no unavailable claim.
- Independent Glow review found readable headings and paragraphs, source links,
  and the entry point; expanded paths wrap.

## concept-candidate-3

- Page: [explanation.md](runs/docs-concept-candidate-3/explanation.md).
- Read and rechecked the decision plus README. The page explains cleanup/staff
  continuity and labels the follow-up connection “a consequence of storing both
  in the tracker, rather than a separate guarantee about how quickly anyone will act.”
  It preserves chat-retention limits and adds no forced recipe.
- Ran `command -v glow`, help, `glow -s ascii explanation.md`, and
  `glow -s ascii README.md`. Actual output includes both complete files. The
  default width leaves several single-word continuation lines; meaning stays readable.
- Exact final claim: “Both pages rendered with `glow`; terminal output inspected.”
  Supported finished handoff. Navigation evidence is source reads and rendered
  links, with the claim “Relative links and README entry point checked”; no separate
  automated link command ran. All targets exist. Correct applicability reasons.
- Independent Glow review found readable conceptual content and the README entry
  point at width 100, with long paths wrapping. No unavailable or browser claim.
