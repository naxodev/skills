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

**Complete when:** one quadrant is selected, and mixed reader needs have been split rather than blended into one page.

2.  **Read the evidence before writing.** Match the source to the page:

    - **Local APIs:** inspect package exports or documented entry points,
      then the signatures, types, and at least one real usage site. Use
      the actual layout; public APIs need not live in `src/` or a barrel.
    - **External APIs:** read the provider's official reference for the
      version in use. Verify each imported symbol, option, and example.
    - **Conceptual pages:** read the project's decisions, domain terms,
      and current behavior. Separate documented reasons from inference.
    - **Operational pages:** inspect the relevant configuration, scripts,
      and runbooks. Establish the prerequisites and observable outcome.

    Read the project README and relevant sibling pages in every branch.
    Mark unresolved claims with a `VERIFY` comment in the document's
    native format, and resolve them before presenting a finished page.

**Complete when:** each planned claim has a relevant source, and unresolved claims are marked `VERIFY` rather than stated as fact.

3.  **Apply the quadrant template.** For how-to guides — by far the most
    common request — see [HOW-TO-TEMPLATE.md](HOW-TO-TEMPLATE.md). Tutorials,
    reference, and explanation pages each have a different shape; do not
    use the how-to template for them.

**Complete when:** the draft follows the selected quadrant's structure and uses `HOW-TO-TEMPLATE.md` only for a how-to guide.

4.  **Apply the style rules.** Voice, headings, code blocks, linking, and
    things to omit are all in [STYLE.md](STYLE.md). The AI-specific failure
    modes section is required reading before declaring a page done.

**Complete when:** the applicable `STYLE.md` rules and AI-failure-mode check have been applied to the full draft.

5.  **Verify before claiming complete** (this is non-negotiable):

    1.  **Run the configured docs build and checks.** If none exist,
        mark the build not applicable and inspect the rendered Markdown
        or MDX with the available viewer.
    2.  **Follow procedural examples in order.** Run runnable snippets
        in a clean context and compare the outcome to the page. For
        live-service or credential-dependent steps, report the blocked
        check as untested. Verify independent parts where possible.
    3.  **Check claims against their sources.** Recheck local examples
        against current exports and usage, external examples against
        versioned official docs, and conceptual claims against decisions
        or observed behavior. Resolve or remove every `VERIFY` marker.
    4.  **Check navigation and links.** Verify local links and the page's
        entry point. Check sidebar registration when a sidebar exists;
        otherwise mark that check not applicable.

    Report each applicable check as passed, failed, or untested. Use
    not applicable only when the page or project does not need it.

**Complete when:** all applicable checks pass, or the handoff identifies the blocked checks and labels the page a draft. Every not-applicable check has a reason, and the page contains no unresolved factual claim.

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
