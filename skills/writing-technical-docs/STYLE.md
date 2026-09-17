# Style rules

Apply these rules to the reader need and quadrant selected in
[SKILL.md](SKILL.md). Its quadrant table governs voice; its workflow governs
page shape and verification.

## Voice & person

- **Match the quadrant's voice.** Use second-person imperatives for how-to
  instructions, not as a global rule for every page.
- **Active voice.** "The engine validates the message." Not "The message
  is validated by the engine."
- **Lead with the verb in steps.** "Configure the adapter" beats "To
  configure the adapter, you should…".
- **No "simply", "just", "easy".** They lie when the reader is stuck and
  add nothing when they aren't.

## Titles & headings

- **Title names the reader need.** Name the task for a how-to, the learning
  outcome for a tutorial, the lookup symbol or topic for reference, and the
  concept or question for explanation. The sidebar entry can be shorter.
- **Sentence case** for everything except the page `title:` frontmatter.
- **Headings support the page's purpose.** Questions help explanations;
  stable labels such as parameters, returns, and errors help reference lookup.
- **Avoid hierarchy past `###`.** If you need `####`, the section wants
  to be its own page.

## Code

- **Distinguish runnable examples from notation.** Runnable examples need
  the stated runtime, files, imports, and setup to work from the reader's
  context. Label signatures, type shapes, and fragments as such; they need
  accurate semantics, not an artificial execution wrapper.
- **Real imports.** No `// ... your code here` placeholders inside
  imports. The imports are part of the answer.
- **Pin the file path** on snippets where it isn't obvious:
  `\`\`\`ts title="src/server/engine.ts"`.
- **One snippet per step.** Don't make readers diff two adjacent 40-line
  blocks to find the change — show the diff explicitly.
- **Use the project's package manager** in shell snippets (match what
  `package.json` and the README use — bun, pnpm, npm, yarn).
- **No emoji in code or output**, even if the docs site supports them in
  prose.
- **Show output when it helps the reader check or understand a result**, 
  especially at tutorial checkpoints.

## Linking

- **Link the first mention** of a domain term when an existing explanation
  helps this reader. Verify the destination rather than inventing a route.
- **Link reference symbols** to the auto-generated reference page, not
  to GitHub source. If the reference page doesn't exist yet, link to
  an existing relevant heading in the package README when available.
- **Don't link the same target twice in one section.** Pick the first
  mention.
- **Prefer relative routes** (`/guides/engine/...`) over absolute URLs
  when the link is internal — survives domain renames.

## Lists & tables

- **Bulleted lists for unordered options.** Numbered lists imply order.
- **Tables for comparisons across ≥3 columns**; otherwise prefer prose.
- **Header rows are sentence case.** No "ALL CAPS" columns.
- **Tables don't take code blocks well** in most renderers. Inline
  `<code>` is fine; multi-line snippets break the row.

## What to omit

- **End when the reader need is met.** Add next-step links only to existing,
  relevant docs. Reference and explanation can end with their complete answer;
  no artificial `Next steps` section is required.
- **No restating the obvious** in prose right above a code block
  ("Here is the code:"). Just show the code.
- **No version-of-the-week phrasing** ("As of January 2026…"). Pin to
  the package version if it matters; otherwise omit.
- **No screenshots of code.** Use a code block; readers need to copy.
- **No "TL;DR" / "Note" / "Important" callouts** strung together as a
  cheap summary. Use callouts for genuinely orthogonal advice, not as
  highlighting.

## AI-specific failure modes (self-check before declaring complete)

These show up in AI-written docs more than in human-written ones. Walk
this list before claiming the page is done:

- **Inventing options.** If you wrote `maxRetries: 'aggressive'` and the
  source only accepts a number, the rest of the page is also suspect.
  Re-read the type.
- **Restatement without lookup value.** Apply the reference-contract check
  in [SKILL.md](SKILL.md); precision is useful, redundant paraphrase is not.
- **Sycophantic preamble.** "The library's elegant design lets you…" —
  delete.
- **Cross-page duplication.** If two pages now say the same thing, one
  of them is wrong as soon as the API changes. Link instead of copying.
- **Scope errors to the reader need.** Reference documents the exact
  source-backed errors and their conditions. Procedural pages cover errors
  readers can plausibly hit along the chosen path.
- **Phantom "Advanced" sections.** Don't bolt on an `Advanced` heading
  just to feel thorough — only include content the reader genuinely
  needs in the flow of the task.
- **Mode-mixing.** Keep brief, source-backed rationale needed to choose
  or perform a how-to step. Link extended conceptual background elsewhere.
- **Confabulated "Common pitfalls" lists.** Only document pitfalls you
  observed in the code (skip reasons, validation errors, footguns the
  types allow). If you can't point at the line that creates the
  pitfall, it isn't real.
