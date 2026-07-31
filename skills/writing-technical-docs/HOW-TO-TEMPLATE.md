# How-to guide template

How-to guides are the most common doc-writing request and the easiest to get
wrong. Use this template unless you have a strong reason not to. Adapt the
component imports to whatever docs framework the project uses (Starlight,
Docusaurus, Nextra, Mintlify, plain Markdown).

## The shape

```mdx
---
title: <Imperative task in Title Case>
description: <One sentence: "How to <do X> with <component>.">
---

import { Aside, Steps, Tabs, TabItem } from '@astrojs/starlight/components';

<!-- 1. Lead — one or two sentences -->
One or two sentences: what task this page accomplishes, when you would do it,
and any single load-bearing prerequisite. No theory. No "in this guide we will."

<!-- 2. Prerequisites — only if non-obvious -->
## Before you start

- A configured `<Thing>` (see [<Concept page>](/understanding/<concept>)).
- An API key for `<provider>` exposed as `<ENV_VAR>`.

<!-- 3. The recipe — one task per page, ordered steps -->
## Steps

<Steps>
1.  **<Imperative verb phrase>** — one-sentence rationale if not obvious.

    ```ts title="<file.ts>"
    // minimal, runnable, paste-into-your-app code
    ```
2.  **<Next step>**
    ...
</Steps>

<!-- 4. Variations — common branches off the main recipe -->
## Variations

### <Variant name>

When you want <X instead of default>, change step N to:

```ts
// just the diff, not the whole example
```

<!-- 5. Verify — confirm it worked -->
## Verify

How to confirm the change took effect (a log line, a test command, a UI cue).

<!-- 6. Next steps — links out, not new content -->
## Next steps

- [Related how-to](/guides/<area>/<page>)
- [Reference: <symbol>](/reference/<area>/<symbol>)
- [Why this works](/understanding/<concept>)
```

## Section-by-section guidance

**Frontmatter title.** Imperative task in Title Case. "Add a custom LLM
provider" beats "Custom LLM Providers." The sidebar entry can be shorter.

**Frontmatter description.** Always starts with "How to". One sentence. It
is the snippet that appears in search results, sidebar tooltips, and
generated `llms.txt` files.

**Lead.** One or two sentences. Do not include "In this guide, we will…" or
any preamble. Drop straight into what the page accomplishes.

**Before you start.** Skip this section when there is nothing non-obvious.
Don't list "Node 18+" or "a code editor." Do list anything the reader needs
to wire up beforehand (an API key, a configured engine, a sibling concept
page they should read first).

**Steps.** One task per page. If you find yourself writing "Now, in a
separate task, …" you have two pages, not one. Each step starts with an
imperative verb. Code snippets immediately follow the step they implement.

**Variations.** Common branches off the main recipe. Show only the diff,
not the whole example again. If a variation is rare or speculative, cut it
— don't bolt on an "Advanced" section to feel thorough.

**Verify.** How the reader knows it worked. A log line, a test command, a
UI cue. This is the single section AI agents most often forget.

**Next steps.** Links only, no new content. Three categories:
- Related how-to (sibling task)
- Reference (the exact API shape)
- Understanding (the conceptual page that explains *why*)

## Worked example

The following page (lightly trimmed) is a model how-to in this style:

```mdx
---
title: Use a custom LLM provider
description: How to swap the Engine's LLM adapter — Gemini, OpenAI, Anthropic, or your own.
---

import { Steps, Tabs, TabItem } from '@astrojs/starlight/components';

The reference engine talks to the model through a TanStack AI text adapter.
Swapping providers is a single field on `EngineConfig.adapter` — the prompt
builder, response parser, and retry policy are all provider-agnostic.

## Before you start

- An installed `@example/engine` package.
- An API key for the provider you want to use.

## Steps

<Steps>
1.  **Install the adapter package** for the provider you want.

    <Tabs syncKey="llm-provider">
      <TabItem label="Gemini">
        ```bash
        bun add @tanstack/ai-gemini
        ```
      </TabItem>
      <TabItem label="OpenAI">
        ```bash
        bun add @tanstack/ai-openai
        ```
      </TabItem>
    </Tabs>

2.  **Pass the adapter to `createEngine`.**

    ```ts title="src/server/engine.ts"
    import { createEngine } from '@example/engine';
    import { geminiText } from '@tanstack/ai-gemini';

    export const engine = createEngine({
      adapter: geminiText('gemini-2.0-flash'),
    });
    ```
</Steps>

## Verify

Send a request through the engine and confirm a non-empty
`response.userMessage` comes back.

## Next steps

- [Customize the system prompt](/guides/engine/system-prompt)
- [The Engine](/understanding/engine) — what happens after the adapter returns
```

Note what the example *omits*: marketing copy, a "Conclusion" section, a
duplicate code block before each step explaining what the code does, and
any mention of why TanStack AI was chosen (that's an explanation, not a
how-to).

## When to break the template

These are the only good reasons:

- **Truly single-step task.** Drop the `<Steps>` wrapper; just show the
  code block with a one-sentence intro.
- **Pure-config recipe** (no procedural order). Use a single code block
  + a table explaining each field.
- **Project has its own template.** Match the existing house style; this
  template is the fallback when there isn't one.
