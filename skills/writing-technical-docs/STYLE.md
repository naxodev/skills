# Style rules

These compound. None are individually load-bearing, but the cumulative
effect is the difference between a page that feels professional and one
that doesn't.

## Voice & person

- **Second person, imperative.** "Pass a `store` to `history`." Not "We
  pass…" or "The user should pass…".
- **Active voice.** "The engine validates the message." Not "The message
  is validated by the engine."
- **Lead with the verb in steps.** "Configure the adapter" beats "To
  configure the adapter, you should…".
- **No "simply", "just", "easy".** They lie when the reader is stuck and
  add nothing when they aren't.

## Titles & headings

- **Title is the task.** "Add a custom LLM provider" beats "Custom LLM
  Providers." The sidebar entry can be shorter.
- **Sentence case** for everything except the page `title:` frontmatter.
- **Headings answer reader questions**, not section labels. "When to
  enable history" beats "History configuration semantics."
- **Avoid hierarchy past `###`.** If you need `####`, the section wants
  to be its own page.

## Code

- **Minimum runnable.** Every snippet should compile/run after
  `npm install` / `bun install` in a fresh project. Cut any line that
  isn't load-bearing for the step.
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
- **Don't echo console output** unless the output is the point of the
  step.

## Linking

- **Link the first mention** of every domain term to its Understanding
  page.
- **Link reference symbols** to the auto-generated reference page, not
  to GitHub source. If the reference page doesn't exist yet, link to
  the package README's relevant heading.
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

- **No "Conclusion" sections.** The page ends with `Next steps`.
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
- **Restating the type definition as prose.** If a reader can get the
  same information by hovering the symbol, the prose is filler. Cut it
  or replace it with a worked example.
- **Sycophantic preamble.** "The library's elegant design lets you…" —
  delete.
- **Cross-page duplication.** If two pages now say the same thing, one
  of them is wrong as soon as the API changes. Link instead of copying.
- **Over-eager error sections.** Don't list every possible error tag
  unless the page is about error handling. Mention only errors a reader
  will plausibly hit while following this page.
- **Phantom "Advanced" sections.** Don't bolt on an `Advanced` heading
  just to feel thorough — only include content the reader genuinely
  needs in the flow of the task.
- **Mode-mixing.** A how-to that explains *why* has drifted toward
  explanation. Move that material out and link to it.
- **Confabulated "Common pitfalls" lists.** Only document pitfalls you
  observed in the code (skip reasons, validation errors, footguns the
  types allow). If you can't point at the line that creates the
  pitfall, it isn't real.
