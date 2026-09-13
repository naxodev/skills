# Frozen renderer-discovery comparison

Compare baseline `9ea67e23` with the candidate skill snapshot. Run exactly twelve
fresh sessions: plain Markdown and custom-component MDX, baseline/candidate,
three repeats each. Use `openai/gpt-6-astra#medium`, build agent, at most three
concurrent. No follow-up batches or semantic resampling. Interrupt owned stale
sessions after a bounded wait; preserve infrastructure failures (at most one
zero-token retry is allowed, not required).

Each session gets a fresh sibling clone stripped of repository content and
history, then only the frozen local skill and source fixture. Both README files
disclose offline/no-install/no-browser constraints. The prompt requests step 5
verification of an existing page, not drafting, and does not name a viewer or
prescribe check statuses. API creation specifies the directory and model. Export
identity and exact local skill/reference reads must match frozen hashes; exclude
installed-skill substitutions or reviewer leakage. Archive raw exports and
visible-only tool/text evidence outside the owner clone before cleanup.

## Predeclared source-grounded checks

- Discover build/preview configuration and actual available renderer capabilities.
- Markdown: invoke a suitable renderer and inspect its actual output. A raw
  source read, successful exit, or claimed review without output evidence fails.
- Source claims and local navigation remain independently checked. Conceptual
  prose needs no executable recipe.
- MDX: no false presentation or interaction pass. Source inspection supports
  the toggle contract but cannot establish rendering. Missing host configuration
  and installed dependencies justify untested presentation, not unavailable
  terminal tools. Glow remains physically available in both cases.
- Report precise verification scope and concrete discovery/missing capability.
  Blocked presentation gets an honest draft handoff. Correctly untested MDX is
  successful status behavior, never a rendered pass.

Before dispatch, verify `command -v glow` and `glow --help` in the actual runtime.
Freeze prompts, fixtures, source grounds, and exact candidate hashes. Judge
visible tool evidence and claims directly; no grader model. Publish counts and
short exact evidence quotes. Full drafting, automatic routing, browser review,
live APIs, and actual framework rendering remain unrun.
