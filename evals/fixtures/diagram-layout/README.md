# Diagram layout browser regression

These are renderer fixtures, not examples of the skill's four-section narrative.
`valid.json` contains a flowchart and sequence diagram. `invalid.json` deliberately contains malformed syntax.

Build from the repository root after the normal nested dependency install:

```bash
mkdir -p .evals/diagram-layout
node skills/pr-walkthrough/scripts/build.mjs --manifest evals/fixtures/diagram-layout/valid.json --output .evals/diagram-layout/valid.html
node skills/pr-walkthrough/scripts/build.mjs --manifest evals/fixtures/diagram-layout/invalid.json --output .evals/diagram-layout/invalid.html
```

Open the files in an isolated browser context. On the valid page, evaluate the read-only function in [assertions.js](assertions.js)
after both diagrams finish rendering. Treat `passed: false` as a failed regression check.
Check 1280, 390, and 320 CSS-pixel viewports in both themes. The test requires natural SVG width, one visible variant per diagram,
named keyboard-focusable scroll containers, and no document-level overflow. It records the visible variant's class and requires it to match
the page's active theme. It failed on the previous builder and passed after the fix.

Use Tab to focus each diagram, then ArrowRight to reach its right edge. Confirm the focus outline is visible.
The invalid page must retain its source and show no rendered error graphic. Inspect console messages separately: a file-origin diagnostic
also occurred on script-free HTML in the tested environment. Use [the static control](static-control.html) and compare local HTTP before
attributing that diagnostic to Mermaid; see the [isolation results](../../results/2026-09-26-diagrams/ORIGIN-CONTROL.md).

The browser assertions are not executed by `bun run check`; that command does not launch a browser.
See the [recorded browser run](../../results/2026-09-26-diagrams/README.md) for evidence and remaining coverage limits.
