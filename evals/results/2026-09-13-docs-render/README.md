# Discover capable documentation renderers

**Both arms completed plain-Markdown review and reported MDX limits correctly.
This study shows no Markdown completion uplift.** The candidate made installed
renderer discovery and terminal-only scope more explicit.

## Results

| Check | Baseline | Candidate |
| --- | --- | --- |
| Markdown: installed viewer discovered and actual output inspected | 3/3 | 3/3 |
| Markdown: source claims and local navigation checked independently | 3/3 | 3/3 |
| Markdown: explicitly states terminal-only presentation scope | 0/3 | 3/3 |
| MDX: project configuration and source/navigation checked | 3/3 | 3/3 |
| MDX: installed renderer discovery attempted | 1/3 | 3/3 |
| MDX: correct untested rendering/interaction and draft handoff | 3/3 | 3/3 |
| MDX: actual component rendering/interaction verified | Untested, 3/3 | Untested, 3/3 |

All twelve sessions completed with the expected directory, model, and build
agent. All loaded the exact frozen `SKILL.md` and `STYLE.md`; baseline MDX run 2
also read the unchanged how-to template. No installed skill calls, input changes,
exclusions, retries, or resampling occurred. Evaluation clones were archived and
removed. [executions.json](executions.json) records identities and input hashes;
[read-checks.json](read-checks.json) records exact local reads.

### Visible evidence by run

Commands and quotations below come from visible tool/text evidence. The archive
contains each complete transcript at `raw/<case>-<arm>-<repeat>/transcript.md`.
Every Markdown command returned the actual formatted table, headings, paragraphs,
and expanded local link. Each author then described inspecting those elements.

| Run | Actual action | Exact claim excerpt |
| --- | --- | --- |
| Markdown baseline 1 | Discovered Glow, checked help, ran `glow --style ascii --width 100 page.md` with local HOME/config variables | “Inspected headings, paragraphs, the three-column table, and the source link.” |
| Markdown baseline 2 | Discovered Glow; ran `glow -s ascii -w 100 page.md` | “All content rendered legibly.” |
| Markdown baseline 3 | Discovered Glow; ran `glow --style ascii --width 100 page.md` | “Inspected the headings, paragraphs, three-column table, and source link.” |
| Markdown candidate 1 | `command -v glow`, help, then `glow --style ascii --width 88 page.md` with local HOME/config variables | “The source link displays with a wrapped local path.” |
| Markdown candidate 2 | `command -v glow`, help, then `glow --style ascii --width 80 page.md` with local HOME/config variables | “Rendering verification covers terminal Markdown only.” |
| Markdown candidate 3 | `command -v glow`, help, then `glow --style ascii --width 80 page.md` with local HOME/config variables | “Glow wrapped some source lines unevenly and displayed the source link’s long local path.” |
| MDX baseline 1 | Python checked scripts, dependencies, installed commands and links; `glow -s dark -w 100 page.mdx` after an ASCII-style error | “Its output displays the MDX import and component tag as text, without an interactive button.” |
| MDX baseline 2 | Read directory, package, contract, component, page and references; no command discovery | “A Markdown-only rendering cannot verify the component.” |
| MDX baseline 3 | Read directory, package, contract, component, page and references; no command discovery | “Compilation and host module resolution remain untested.” |
| MDX candidate 1 | Searched PATH for `bun node npm mdx next vite astro glow rich mdcat pandoc`; globbed project configuration | “Local command discovery found `glow`, but no `mdx`, `next`, `vite`, or `astro` executable.” |
| MDX candidate 2 | Searched PATH; Bun confirmed empty scripts, absent dependencies and existing links | “Glow cannot execute MDX imports or React components, so it cannot verify this page.” |
| MDX candidate 3 | Searched PATH, checked help, ran `glow --config package.json --style notty --width 80 page.mdx` after an ASCII-style error | “This does not verify MDX compilation, React rendering, site CSS, or events.” |

Baseline MDX runs 2 and 3 established the missing project host by reading the
snapshot, but did not discover installed renderer capabilities. Their untested
status is still correct and source-grounded. No run falsely claimed that Glow
was absent. Baseline Markdown claims name their viewer and do not assert browser
verification; the explicit-scope row records wording, not three false passes.

Two MDX sessions used Glow to display source-like output. This is evidence of its
capability limit, not component rendering. Both preserved untested MDX status.
Their initial ASCII-style errors and successful local fallback attempts remain
in the transcripts. Candidate run 3 passed `package.json` as Glow configuration;
that unnecessary choice is recorded, not recommended. No tools were installed.

## Skill change

Step 5 now inspects project build and preview configuration, then discovers a
suitable installed viewer when the project has no renderer. Glow is an example,
not a dependency. The author must inspect actual rendered output and state its
scope. Terminal Markdown does not verify site CSS or custom MDX components.
An unavailable suitable renderer requires concrete discovery evidence, an
untested check, and the existing draft handoff. No tools need to be installed.

The previous [reader study](../2026-09-13-docs-reader/README.md) recorded ten
premature unavailable-viewer claims despite installed Glow. This follow-up
isolates verification of existing source-backed pages.

## Frozen method

- Baseline: `9ea67e23`. Candidate: exact skill/reference hashes in [freeze.json](freeze.json).
- Model: `openai/gpt-6-astra#medium`, build agent, both arms.
- Two cases, three repeats per arm, twelve new sessions, at most three concurrent.
- Fresh sibling clones with original content and repository history removed.
  Each receives only its fixture and frozen local skill files. No evaluation
  rubric, design history, or prior result is present in the working data.
- API creation specifies the directory and model. Export identity, immutable
  input hashes, direct local reads, and absence of installed-skill calls are checked.
- Runtime preflight confirms `/opt/homebrew/bin/glow` and noninteractive source
  usage in `glow --help`. The same installed binary is available in both cases.
- The [plan](PLAN.md), source fixtures, and prompts were frozen before dispatch.
  [Source grounds](SOURCE-GROUNDS.md) explain the reviewer judgments. No grader model.

The [Markdown fixture](../../fixtures/docs-render/markdown/README.md) is a small
explanation with a table and local source link. The
[MDX fixture](../../fixtures/docs-render/mdx/README.md) imports a custom React
toggle with no installed dependencies or configured host. Both disclose the
same offline/no-install/no-browser constraints. This disclosure helps both arms;
the MDX contract explicitly identifies its runtime requirements.

### Frozen prompts

Both arms receive the same prompt for each case. Only the page filename differs:

> Read skills/writing-technical-docs/SKILL.md directly and its applicable local reference files, not an installed skill. Perform step 5 verification only of the existing page.md, using the supplied source files and README environment constraints. Report your verification findings and handoff status. Keep all supplied files unchanged. Do not draft a new page, use other skills, delegate, or read files outside this workspace. You may run installed local commands.

The MDX prompt substitutes `page.mdx` for `page.md`. Neither prompt names Glow or
prescribes the answer's statuses. Exact prompts and hashes are in the freeze.

## Scope and storage

This tests step 5 only, with explicit local skill reads and already correct
pages. Full drafting, automatic routing, browser review, live services, and
actual MDX framework rendering remain unrun. The small source packet and focused
verification request limit generalization to the prior full-drafting failure.

That was this study's historical limit. The later
[full-workflow comparison](../2026-09-13-docs-e2e/README.md) now covers drafting
through verification on the original two reader cases. Its scores form a separate
batch; automatic routing, browser review, live services, and MDX rendering remain unrun.

Raw exports, visible-only transcripts, workspaces, runtime evidence, exact
skill snapshots, and frozen fixtures are retained outside the owner clone:

`/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/docs-render-evidence-20260913`

`run.ts` records preparation and dispatch; `inspect.ts` extracts visible tool
and text evidence and checks local reads. The completed dispatcher is a command
script, not an importable helper. Do not rerun this frozen batch.

The executed dispatcher is archived as `executed-run.ts`. After the batch, its
redundant publication copies were removed: copied pages lacked their sibling
link targets and failed repository validation. Complete source packets remain
in the archive and reusable fixtures. This packaging fix did not change tested
skill contents, fixtures, prompts, or outcomes.

## Repository verification

- Root and nested walkthrough-script `bun install --frozen-lockfile`: passed.
- Explicit strict TypeScript check of `run.ts` and `inspect.ts`: passed.
- `bun run check`: passed type-check, lint, all 40 tests, and catalog/link/plugin validation after the publication-copy fix.
- The intentionally dependency-free MDX snapshot was source-reviewed. Its
  component type-check, compilation, rendered output, and interactions remain
  untested; no fixture dependencies were installed.
- No prose-mirroring tests were added. Reusable case criteria and the twelve
  visible session reviews provide the behavior evidence.
