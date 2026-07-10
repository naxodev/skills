---
name: pr-walkthrough
description: Generates a narrative HTML walkthrough of a pull request, with optional embedded audio narration — an essay covering problem, motivation, trade-offs, alternatives, and file tour. Use when the user wants to tell the story of a PR to a non-reviewer audience, or asks for a walkthrough, explainer, or narrated version of a change. NOT for code review.
---

# PR Walkthrough

Produces an essay-shaped HTML walkthrough of a pull request. Output is a story, not a review: it explains where the system was, what gap or motivation prompted the change, what was built, what was deliberately not built, and what's next.

**Read [STYLE.md](STYLE.md) before writing.** The voice is specific and the section arc is fixed.

## Workflow

Steps in order. Steps 2 and 3 are what keep the output grounded — run them every time.

**Skill root:** `${CLAUDE_PLUGIN_ROOT}` is Claude Code's plugin root. On other agents (opencode, etc.) it is unset — read `${CLAUDE_PLUGIN_ROOT}/skills/pr-walkthrough` throughout as the directory containing this SKILL.md.

### 1 · Resolve the PR

Take the PR number from the user's argument. If none given, look it up for the current branch:

```bash
gh pr view --json number --jq .number
```

If that fails (no PR for current branch), ask the user.

### 2 · Fetch PR data (deterministic)

```bash
node ${CLAUDE_PLUGIN_ROOT}/skills/pr-walkthrough/scripts/fetch-pr.mjs <PR#>
```

Prints the path to a JSON dump in `/tmp` containing PR metadata + full diff. Use that path as input for all subagents below.

### 3 · Dispatch four subagents in parallel

Dispatch all four subagents in parallel — in Claude Code, four `Agent` tool calls (type `general-purpose`) in a single message; on other agents, the native subagent/task mechanism. Pass the JSON dump path so each agent can read it instead of being handed a giant inline diff.

| Agent | Charter |
|---|---|
| **before** | What was the state of the code before this PR? What gap, bug, or missing capability prompted it? Read the diff to see what files changed; read the PR body for the author's framing. Do not speculate beyond what's in the materials. Return 200-400 words. |
| **diff-tour** | Walk through each changed file in 2-4 sentences each, in narrative form (not "adds X, removes Y"). Group new vs. modified. Identify the central piece of new logic, not just every line. Return as a table-ready file list with a one-sentence summary per file. Also return, verbatim, the 2-4 most load-bearing hunks of the diff — each trimmed to its essential lines and paired with a short explanation of what to notice — these feed the key-code blocks in the walkthrough. |
| **tradeoffs** | List documented limitations, edge cases, known gaps. Sources: code comments in the diff matching "limitation", "TODO", "out of scope", "known issue", "gap"; the PR body's own caveats; tests that document weak behavior (e.g. "treats X as Y when we can't tell"). For each, capture the choice AND the reason. |
| **alternatives** | What other approaches were considered and rejected? Sources: PR body, commit messages on the branch (`gh pr view --json commits`), linked issue text, code comments saying "considered X but". Do not invent. If none are documented, state "none documented" and return. |

### 4 · Synthesize the manifest

First write the through-line: one sentence naming the single story this PR tells. It appears nowhere in the output — it decides which sections from the STYLE.md arc make the cut and which reports' material gets left behind.

Then combine the four reports into one JSON manifest matching this shape:

```json
{
  "title": "Short evocative title — not the PR title verbatim",
  "eyebrow": "PR #N · <scope> · <type>",
  "dek": "One-sentence subtitle that orients the reader.",
  "meta": "feat(scope): exact commit subject",
  "footer": "PR #N · feat(scope): subject · closes #X",
  "narrationIntro": "Spoken opening for the audio track: read the title and dek aloud in one or two sentences.",
  "sections": [
    {
      "eyebrow": "The setting",
      "title": "Where we were before this PR",
      "content": "<p class=\"lead\">Opening paragraph. Drop-cap renders on the first letter.</p><p>More prose, referencing {{CODE:0}} and {{DIAGRAM:0}}.</p>",
      "code": [
        { "lang": "go", "file": "signal_unix.go", "source": "//go:build unix\n\npackage signal" }
      ],
      "diagrams": [
        "flowchart LR\n  A[fetch-pr.mjs] --> B[JSON dump]"
      ],
      "narration": "The same beat, rewritten for the ear: no code read aloud, tables and diffs described in words, transitions smoothed."
    }
  ]
}
```

**Constraints:** the section arc, section counts, voice, and HTML rules (escaping, `<p class="lead">`, callout budget, diagram rules, key-code rules) all live in [STYLE.md](STYLE.md) — it is the single source of truth for the prose. Follow the arc unless you have a specific reason not to.

Code samples and diagrams are supplied as structured `code` / `diagrams` entries on each section, referenced from `content` via `{{CODE:i}}` / `{{DIAGRAM:i}}` placeholders — the build escapes, captions, and highlights them deterministically, and fails loudly on any placeholder/entry mismatch. Authoring rules in STYLE.md.

**Narration fields (for the audio track):**

- Every section gets a `narration` string, and the manifest gets a top-level `narrationIntro`. These feed the text-to-speech step — they are *heard*, never shown.
- Write them for the ear, not the eye. Do NOT read code, file paths, or symbols aloud; describe what a diff or table *does* in plain words, and describe the shape a diagram shows — it's invisible to the listener. Spell out what a listener can't see ("the diff adds a guard clause" — not "as shown below").
- Roughly one tight spoken paragraph per section (~30–60 seconds). Smooth the transition into the next beat; this is continuous audio, not isolated blurbs.
- `narrationIntro` is a one-to-two sentence spoken opening derived from the title and dek; it opens the "Play all" track before section 1.
- If you are producing a text-only walkthrough on purpose, omit these fields — the audio step no-ops and the output is the plain single-file HTML.

Write the manifest to `/tmp/pr-<N>-manifest.json`.

### 5 · Generate narration audio (deterministic)

```bash
node ${CLAUDE_PLUGIN_ROOT}/skills/pr-walkthrough/scripts/generate-audio.mjs \
  --manifest /tmp/pr-<N>-manifest.json \
  --output /tmp/pr-<N>-audio.json \
  [--voice af_heart]
```

Synthesizes each section's `narration` (and `narrationIntro`) with kokoro-js — a local, offline neural TTS — and encodes each clip to mono MP3 via ffmpeg, writing a sidecar JSON of base64 data-URIs. Notes:

- **First run downloads the ~330 MB model** (cached afterward). Later runs load it in ~10–15s and synthesize a few seconds per section.
- **Graceful fallback:** if kokoro-js isn't installed or ffmpeg is missing, the script prints a warning and exits 0 **without** writing the sidecar. The build then produces the plain text-only HTML. So it's safe to always run this step.
- One-time setup on a fresh machine: `cd ${CLAUDE_PLUGIN_ROOT}/skills/pr-walkthrough/scripts && bun install` (installs kokoro-js). ffmpeg must be on PATH with libmp3lame.
- `--voice` overrides the default (`af_heart`); kokoro-js's `tts.list_voices()` prints the options.

### 6 · Build (deterministic)

```bash
node ${CLAUDE_PLUGIN_ROOT}/skills/pr-walkthrough/scripts/build.mjs \
  --manifest /tmp/pr-<N>-manifest.json \
  --audio /tmp/pr-<N>-audio.json \
  --output ~/Desktop/pr-<N>-walkthrough.html
```

The build script validates required fields, escapes plain-text strings, numbers the sections automatically, and writes the final HTML. When `--audio` points at a readable sidecar, each narrated section gets an inline player and the header gets a "Play narration" control that plays every clip in order, auto-advancing and scrolling each section into view. When the sidecar is missing or unreadable (the TTS step was skipped), it emits exactly the plain HTML — so always pass `--audio`. On schema errors it exits non-zero with a specific message — fix the manifest and retry.

When any section contains a `<pre class="mermaid">` block, the build inlines the mermaid renderer from `scripts/node_modules` so diagrams render in the single self-contained file. If the `mermaid` package isn't installed (`bun install` in the scripts dir installs it), the build warns and diagrams degrade to visible source text.

`code` entries are syntax-highlighted at build time with Shiki (vitesse themes, follows the light/dark toggle; no client-side JS). If shiki isn't installed (`bun install` covers it), the build warns and emits plain code blocks. Placeholder/entry mismatches exit non-zero with a specific message — fix the manifest and retry.

### 7 · Hand off

Tell the user the file path. It's a single self-contained HTML — audio is embedded, so it stays shareable as one file. On macOS, ask before running `open` — they may want to inspect first.

## When the PR is small

A typo fix doesn't need a walkthrough. Push back: "this PR doesn't have enough narrative weight for a walkthrough — do you want a short summary instead?" If they insist, use the small-PR arc from [STYLE.md](STYLE.md).
