---
name: writing-technical-docs
description: Opinionated playbook for writing technical documentation pages — anchored in the Diátaxis framework. Use when the user asks to write, draft, or improve a documentation page (how-to guide, tutorial, reference, explainer, README section, MDX file, docs site content), when filling stubs in a docs directory, or when the task is anything resembling "write docs for X."
---

# Writing technical docs

This skill produces production-grade technical documentation pages. It is
deliberately opinionated to avoid the failure modes AI agents fall into
when writing docs (hallucinated APIs, mode-mixing, sycophantic preamble,
unverified claims).

If a project-local rule (`CLAUDE.md`, repo style guide, explicit user
instruction) contradicts this skill, the project-local rule wins.

## Workflow

Follow these steps in order. Skipping step 2 is the dominant cause of bad
AI-written docs.

1.  **Pick the quadrant** (Diátaxis). Every doc page serves exactly **one**
    of four needs. Mixing modes is the single most common reason docs feel
    "off."

    | Quadrant         | Reader is…              | The page answers           | Voice                |
    | ---------------- | ----------------------- | -------------------------- | -------------------- |
    | **Tutorial**     | Learning                | "Teach me, step by step"   | Hand-holding, "we"   |
    | **How-to guide** | Already competent       | "How do I do X?"           | Imperative, "you"    |
    | **Reference**    | Looking something up    | "What is the exact shape?" | Neutral, factual     |
    | **Explanation**  | Building a mental model | "Why does this work?"      | Discursive, "because" |

    Quick decision tree:

    ```
    Is the reader trying to learn?
    ├── yes → Tutorial
    └── no  → Is the reader trying to do a specific task?
             ├── yes → How-to guide
             └── no  → Is the reader trying to look up an exact shape?
                      ├── yes → Reference (prefer auto-gen)
                      └── no  → Explanation
    ```

    If the answer is "all of the above," split the page. If unsure between
    how-to and tutorial, ask: does the reader already know the domain? Yes
    → how-to. No → tutorial.

2.  **Read the API surface before writing.** Hallucinated APIs are the
    dominant failure mode. Before typing a single code example, read:

    - The package's `src/index.ts` (or equivalent barrel). Anything not
      re-exported is **internal** — do not document it as public.
    - The signatures, JSDoc, and types of every symbol you mention.
    - The package README (often the authoritative spec).
    - Any sibling Understanding / concept page the new page should link to.
    - At least one real usage site (test, example app, demo).

    If uncertain about a behavior after this, leave a
    `{/* VERIFY: ... */}` comment and continue. Never invent a parameter,
    return shape, or error tag from training memory.

3.  **Apply the quadrant template.** For how-to guides — by far the most
    common request — see [HOW-TO-TEMPLATE.md](HOW-TO-TEMPLATE.md). Tutorials,
    reference, and explanation pages each have a different shape; do not
    use the how-to template for them.

4.  **Apply the style rules.** Voice, headings, code blocks, linking, and
    things to omit are all in [STYLE.md](STYLE.md). The AI-specific failure
    modes section is required reading before declaring a page done.

5.  **Verify before claiming complete** (this is non-negotiable):

    1.  **Run the project's docs build** (e.g. `nx build docs`,
        `npm run docs:build`). MDX errors are silent in editors and loud
        in CI.
    2.  **Follow the page yourself.** Open a fresh terminal, copy each
        snippet in order, verify the described outcome happens. If a step
        needs adapter keys or external services, state that and stop —
        don't fake it.
    3.  **Re-read every code snippet against the current source.** Types
        change.
    4.  **Check the sidebar.** New pages should appear without manual
        registration if auto-sidebar is configured; if they don't, fix
        the config in the same change.
    5.  **Grep for the symbols you used.** If a function name doesn't
        appear in `src/` exactly as written, it was hallucinated.

    Only after all five: mark the task complete.

## Anti-patterns (stop and revise if you catch yourself doing these)

- **Inventing options.** If a code example uses a value the source doesn't
  accept, the rest of the page is suspect. Re-read the type.
- **Restating type definitions as prose.** If a reader can get the same
  information by hovering the symbol, the prose is filler.
- **Sycophantic preamble.** "X's elegant design lets you…" — delete.
- **Cross-page duplication.** Link instead of copying. Duplication rots
  on the next API change.
- **Phantom "Advanced" sections.** Don't bolt on a heading just to feel
  thorough — only include content the reader genuinely needs.
- **Mode-mixing.** A how-to that explains *why* has drifted toward
  explanation. Move that material out and link to it.
- **Version-of-the-week phrasing.** "As of January 2026…" — pin to a
  package version if it matters, otherwise omit.

## Further reading

- [HOW-TO-TEMPLATE.md](HOW-TO-TEMPLATE.md) — full template + worked example
  for how-to pages (the most common request)
- [STYLE.md](STYLE.md) — voice, headings, code, linking rules + the
  AI-specific failure modes self-check
- [Diátaxis](https://diataxis.fr/) — the framework this skill is derived
  from
