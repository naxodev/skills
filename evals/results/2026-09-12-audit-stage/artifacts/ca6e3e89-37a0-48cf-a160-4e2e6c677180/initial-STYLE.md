# Voice & prose rules for PR walkthroughs

## Focus

Write the through-line before any section: one sentence naming the single story this PR tells. It never appears in the output — it is the knife. Every section must advance it; material that is true but off the line goes in the bin, however interesting.

- **One new concept per section.** A reader holds about four things at once. A section that introduces the validation contract AND the theming strategy AND the fallback policy teaches none of them — split or cut.
- **One idea per paragraph, stated in its first sentence.** The rest of the paragraph earns that sentence.
- **End sentences on the new information.** Readers place emphasis where a sentence lands: "the build fails loudly" beats "loud failure is what the build produces."
- **The reader has not seen the diff.** Name a thing before leaning on it — a flag, acronym, or internal name used before its introduction costs the reader a re-read.
- **Before shipping, delete the weakest section.** If the essay survives, it was padding. Repeat until it doesn't.

## The arc — a menu, not a checklist (6–9 sections)

Four beats are mandatory: the setting, the gap, what we built, the short version. Everything else is on the menu and must earn its place via the through-line. Beats 1–3 are one story — give each its own section only when each carries distinct weight; otherwise merge them.

1. **The setting** — what the system was before this PR. Anchor the reader. Use `<p class="lead">` here.
2. **The gap / the bug nobody saw** — what was missing or wrong, with a concrete example, not an abstraction.
3. **Why it matters** — the user-visible or operational cost. Translate technical correctness into "what does this cost a developer."
4. **The mechanic, briefly** — explain the underlying domain concept the PR touches (Go build tags, ESM/CJS interop, JIT compilation, whatever). Plain language. Imagine the reader is sharp but new to the area. This section is the natural home for a diagram; if the concept has structure — a flow, a lifecycle, a before/after shape — draw it rather than describing it in prose.
5. **What we built** — the chosen approach in narrative form. Algorithm shape, where it plugs in. NOT a file-by-file dump yet. Include the one or two most load-bearing code hunks here, each introduced and explained (see "The key code").
6. **The honest trade-offs** — what the PR does NOT do, and why. Each trade-off gets the choice AND the reason. Use `<h3>` sub-headings inside this section.
7. **Alternatives considered** — what was rejected and why. One short paragraph per alternative. If none are documented in the materials, omit this section entirely; don't fabricate.
8. **What the diff looks like** — file-by-file tour, usually as a 2-column table. Each row: file name (with status: "new" / "modified") + one narrative sentence.
9. **A note on the test strategy** — optional. Only if tests are unusually structured (real-fs integration tests, fuzz, golden files, etc.). Skip for vanilla unit-test PRs.
10. **What's next** — open follow-ups, known issues filed, the priority order. Tie back to "trade-offs" — these are usually the same items.
11. **The short version** — one paragraph for skimmers, at the END. Never at the top.

For small PRs (single-file refactors), collapse to 5 sections: setting → why → what we built → trade-offs → what's next. For sprawling PRs the hard ceiling is 11, but reaching it means the through-line is probably carrying two stories — cut before you stack.

## Voice

- **Reader-facing.** Keep internal fact IDs, approval labels, reviewer directions, and drafting instructions in analysis artifacts. Use identifiers from the actual source when they help explain the program. Check the title, subtitle, sections, recap, and narration for leaked review material before handing off.
- **Natural attribution.** Translate evidence notes into prose: use "The author reports…" or "The diff shows…" where attribution matters. Preserve the meaning of important qualifications without copying reviewer wording or repeating the same caveat throughout the essay.
- **Essay-shaped.** Long paragraphs over short bullets. Bullets only when the items are genuinely parallel and don't carry their own narrative.
- **Second person + first-person plural.** "You might ask." "We rejected this path." Avoid passive ("it was rejected") — it's a tell of AI-generated prose.
- **Concrete > abstract.** Show the file, the constraint comment, the failure mode. A reader who can picture a real case beats one with a vague principle.
- **Honest about gaps.** Trust comes from saying "we did not handle X" before the reader asks. Hiding limitations is a worse failure mode than having them.
- **No marketing.** Don't write "we're excited to introduce" or "leverages tree-sitter" or "robustly handles". Just say what it does.
- **No emoji.** Not in headings, not in tables, not as status icons.
- **No hedging boilerplate.** "Of course, there are several considerations to keep in mind…" is dead weight. Cut it.

## Section headings

The build script renders each `<h2>` as:

```
N · The eyebrow   ← small accent
The title here    ← big bold
```

So the `eyebrow` field is the short chapter label ("The setting", "The mechanic, briefly") and `title` is the actual H2 line ("Where we were before this PR", "What we're actually parsing"). They should NOT repeat each other.

## Drop-cap

The first paragraph of section 1, and only that paragraph, gets `<p class="lead">…</p>`. The CSS turns the first letter into a 3.2rem drop-cap. Don't use it anywhere else; the doc loses its visual anchor if there are multiple.

## Code blocks

Multi-line code goes in the section's `code` array, not in `content`. Reference it from prose with a `{{CODE:i}}` placeholder (0-indexed, matching array order). Never hand-write `<pre><code>` — it gets no syntax highlighting and the build warns. Write `source` as raw code, exactly as it reads in an editor — no HTML entity escaping; the build owns escaping and highlighting.

```json
{
  "lang": "go",
  "file": "signal_unix.go",
  "source": "//go:build unix\n\npackage signal"
}
```

- `lang` is a Shiki language id (`ts`, `go`, `py`, `rust`, `bash`, `json`, …). An unknown id degrades to plain text with a build warning.
- `file` renders as a small caption above the block. Set it whenever the code comes from a specific file — it replaces the old `// file:` first-line comment convention.
- Inline code is unchanged: `<code>process.platform</code>`, `<code>foo_linux.go</code>` in prose. You must still escape `<`, `>`, `&` there — `content` is authored HTML the build does not touch.
- To *mention* placeholder syntax in prose without expanding it, entity-escape the braces: `<code>&#123;&#123;CODE:0&#125;&#125;</code>`. A literal placeholder in `content` is treated as a reference and must resolve to an entry.

### The key code

The document should include 2–4 code blocks total showing the most load-bearing code from the PR. Rules:

- Show the code as it exists AFTER the PR — never raw diff hunks with `+`/`-` markers.
- Trim each block to its essential lines; elide the rest with a `// …` comment. Max ~20 lines per block.
- Introduce the block in prose, show it, then explain what the reader should notice. Never drop a block without commentary.

## Diagrams (mermaid)

Diagram source goes in the section's `diagrams` array, not in `content`. Reference it from prose with a `{{DIAGRAM:i}}` placeholder (0-indexed, matching array order). Write it as raw mermaid — no entity escaping; the build owns escaping.

```json
{
  "diagrams": [
    "flowchart LR\n  A[fetch-pr.mjs] --> B[JSON dump]"
  ]
}
```

Referenced in `content` as `<p>{{DIAGRAM:0}}</p>`.

When a diagram earns its place: only when it carries structure prose can't — flow, hierarchy, sequence, state. A two-node arrow is prose, not a diagram.

Budget: 1–3 diagrams per document. Keep each small — roughly 12 nodes or fewer; a diagram that needs a legend is two diagrams.

Prefer `flowchart` and `sequenceDiagram`.

Every diagram needs a narration description in the manifest — the listener can't see it.

Rendering note: diagrams are themed to the document's palette and follow the light/dark toggle. If the mermaid package isn't installed at build time, readers see the diagram source as text — so the source itself should be tidy and readable.

## Tables (file tour)

The canonical "what the diff looks like" table:

```html
<table>
  <thead>
    <tr><th>File</th><th>What it does</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><code>file.ts</code> (new)</td>
      <td>One narrative sentence — what role this file plays, not a diff of its lines.</td>
    </tr>
  </tbody>
</table>
```

Mark new files with `(new)`. Don't mark modified ones. Don't add a "lines changed" column — irrelevant to the narrative.

## Callouts

```html
<div class="callout">
  <p><strong>Worth saying out loud:</strong> the body of the aside.</p>
</div>
```

Max 1–2 in the entire document. They're for asides the reader needs but that break the flow. Don't use as a status badge.

## Blockquotes

`<blockquote>` is styled with a left rule and italic body. Use it for direct quotes from a spec, an RFC, or another doc — never to highlight your own prose.

## Length

Word-count ceilings, not goals — the reader's attention is the budget, and a walkthrough that finishes at the bottom of its band beats one that fills it:
- Small PR walkthrough: 500–900 words
- Typical: 1100–1800 words
- Large / multi-feature: up to 2400 words

If you're pushing 2400, you have multiple stories — pick the strongest one and let the rest go.

## Forbidden patterns

- Lists of acceptance criteria with checkboxes (✅) — looks like a generated test report
- "Pros and cons" headings — essay voice doesn't use those
- Tables with status emoji (🟢, ⚠️, ❌)
- "TL;DR" at the top — the recap goes at the bottom; the *first* section is the setup
- Quoting the PR body verbatim — paraphrase, integrate
- Inventing alternatives or trade-offs not in the materials — research-driven, not imagined
- "We hope you find this useful" / "thanks for reading" / any sign-off
- Throat-clearing — a section that opens by announcing what it will discuss instead of discussing it ("In this section we will look at…")

## When in doubt

Ask: would a reader who is sharp but new to this area understand WHY we did this, after one read? If no, find the one paragraph that's the bottleneck and rewrite it. If yes, ask the inverse: what did you include that the through-line doesn't need? Cut that, then you're done.
