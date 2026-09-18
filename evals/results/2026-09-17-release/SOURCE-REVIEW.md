# Source review and workflow findings

Reviewed against frozen criteria and actual visible tools, without a model grader.
Session identities and recovered collection are in [collection.json](collection.json).
The original execution statuses remain unchanged; all 19 actual sessions succeeded.

## Selection — 12/12 matched

Each of the six prompts has two fresh judgments. Both documentation positives,
both Discord positives, and both explicit walkthrough requests selected the expected
skill. All six negative judgments selected null. All twelve used zero tools.
This is curated-catalog selection simulation, not automatic invocation evidence.

## Discord — all six criteria pass

Evidence: [audit.md](runs/discord-audit/audit.md) and its visible session export.

- **read-only:** only the local report is created. No network, delegation, or server writes.
- **mode-fit:** the handoff ends the audit; a later authorized correction plan is optional.
  No setup, operating-state file, app, invite, event, or launch acceptance is required.
- **findings:** F1 cites snapshot line 13 for Manage Roles; F2 cites line 11 for
  writable announcements; F3 cites line 12 for missing required tags. Each includes
  impact, priority rationale, unapplied correction, and matrix-classified verification.
- **scope:** audit date and unknown snapshot date are explicit. The coverage table
  groups unknown and untested controls separately from the three observed defects.
- **evidence:** baseline staff-channel role preview stays narrowly scoped. Fresh-member
  behavior and current Discord labels remain unverified.
- **fit:** command execution and build previews inform tags and triage. Issue tracker,
  private security form, and human-owner conduct routes remain intact.

The report groups common limits but remains substantial. This one-run smoke makes
no new length-improvement claim. Source hashes are unchanged. Visible reads cover
local SKILL.md, REFERENCE.md, OPERATIONS.md, and VERIFICATION.md.

## Documentation — all seven criteria pass

Evidence: [guide.md](runs/docs-reader-start/guide.md), the visible session export,
and [verification.json](verification.json).

- **grounding:** the guide follows card.ts and the release example config. It preserves
  the release prefix/version and uses no invented options or service.
- **reader-fit:** Bun and the workspace root are explicit. The first step creates the
  absent release config from its example; no dependency installation is needed.
- **outcome:** both the author's clean-copy replay and independent replay produced
  exactly `release-2.4.0\n` in generated/release.txt. The verify action checked it.
- **rationale:** the guide explains that `--write` saves the artifact; dry run does not.
- **execution:** the author ran all three fenced commands in a clean local copy and
  asserted their actual outputs. Independent replay repeated them from the fresh fixture.
- **applicability:** the author discovered Glow, inspected rendered guide output, and
  checked the README entry point and local links. Build, sidebar, type-check, and lint
  are absent in this fixture. Live-service checks do not apply to the local workflow.
- **quadrant:** one task-focused how-to, with prerequisites and observable verification.

The only changed input is the explicitly permitted README entry-point link. Local
SKILL.md, HOW-TO-TEMPLATE.md, and STYLE.md reads match the frozen pre-clarification
sources. The final structural-illustration annotation is model-untested. Independent
terminal review confirms the guide's headings, numbered steps, code, and expected
output remain readable; it does not verify browser or MDX behavior.

## PR — all six criteria and seven workflow stages pass

Evidence: [manifest](runs/pr-grounding-quality/pr-42-manifest.json), its generated
HTML, five visible session exports, and [verification.json](verification.json).

- **causality:** the narrative explains refresh before send and attributes the reported
  first-after-expiry failure to the author.
- **code-evidence:** one contiguous verbatim diff excerpt covers the full small change.
  One complete after-change function appears in the manifest and rendered artifact.
- **evidence:** the prose distinguishes the author's extra-read claim from the moved
  Date.now call and keeps the unshown streaming implementation unknown.
- **guarantees:** there is no promise that requests always succeed or an exact per-call
  clock-count guarantee. The description explains the shown awaited ordering.
- **reader-facing:** four distinct sections progress from setting through gap and
  implementation to final recap. There are no internal review IDs or drafting instructions.
- **artifact:** the HTML exists, has no narration or unresolved code placeholders,
  and independently rebuilds to the exact same SHA-256 hash.

Stage 1 used fixture PR #42 with prior insistence on the full small-PR walkthrough.
Stage 2 used the authorized offline JSON substitution. Stage 3 dispatched four actual
native children in parallel, returning before, diff-tour, tradeoffs, and alternatives
reports. The before report satisfies 200–400 words; the diff-tour has a three-sentence
file narrative, table-ready summary, and one sufficient excerpt. Alternatives says
none documented. Every child reads the local frozen skill, style, and fixture; none
writes files or loads installed skills. Stage 4 produces the four-part manifest.
Stage 5 actually runs generate-audio, removes the seeded stale sidecar, and exits with
the documented no-narration warning. Stage 6 builds the HTML. Stage 7 returns its path
without opening a desktop application.

**Action exception:** the PR parent also attempted root type-check and lint in its
minimal fixture clone. Those commands failed because tsconfig.json and ESLint config
were intentionally absent from that packet. It reported both failures accurately.
These are fixture checks, not the complete release owner's passing configured checks.

## Release conclusion

The smoke found no source or workflow release blocker in the frozen fixtures.
It does not establish general reliability. The controller identity failures are
preserved and independently resolved without resampling. The post-freeze P2 template
clarification is source-reviewed and locally checked, with its model evaluation unrun.
