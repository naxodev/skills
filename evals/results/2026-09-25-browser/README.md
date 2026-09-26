# Text-only walkthrough browser check

**No rendering defect was found in the tested documents.** Three saved walkthroughs were opened directly from disk in isolated Chrome contexts.
All nine viewport checks fit the page width, preserved the manifest's code text, and exposed keyboard-focusable code blocks.
No skill, template, or builder change was needed.

## Scope and observations

The checked revision is `20bde214` (0.10.0). Chrome reports version 154.0.0.0 on macOS.
The public sample was opened unchanged. The two later manifests were rebuilt with the current builder before viewing.

| Document | Source | Sections | Code blocks |
| --- | --- | ---: | ---: |
| Public sample | [Manifest](../../../examples/pr-walkthrough.json) | 5 | 1 |
| Credential ordering | [Saved manifest](../2026-09-17-pr-evidence/manifests/pr-grounding-quality-1.json) | 4 | 1 |
| Batch limit | [Saved manifest](../2026-09-17-pr-evidence/manifests/pr-batch-limit-3.json) | 4 | 3 |

Each was inspected at **1280×900, 390×844, and 320×844 CSS pixels**.
At narrow widths, long code overflowed inside its scroll container rather than widening the page.
Exact code text matched each source manifest at every width. Headings and text-only controls matched the expected document shape.
Screenshots at desktop and 390-pixel widths were visually inspected; the 320-pixel checks additionally measured layout and keyboard access.

| Interaction | Observed result |
| --- | --- |
| Sample theme button, mouse | Dark to light; `aria-pressed` changed from true to false |
| Credential theme button, Tab then Space | Light theme and `aria-pressed=false` |
| Batch theme button, Tab then Space | Dark to light; reload retained light state |
| Narrow code blocks, Tab then ArrowRight | Focus reached the code; horizontal scroll moved 40 pixels |
| Keyboard PageDown | Reached visible footers in all three documents |
| Console and network inspection | No console messages; only each local HTML document request, status 200 |

These documents contain no hyperlinks, so link-target navigation was not applicable.
Reading navigation here means keyboard paging and reaching scrollable code, not a table of contents or router.
Theme persistence was observed through rendered state after reload; no cookies or storage contents were inspected.

## Evidence and reproduction

[DOM observations](observations.json) retain viewport measurements, code text, source hashes, keyboard-state captures, and observed console/network outcomes.
The browser calls used explicit page IDs and isolated contexts. JavaScript inspections were read-only; interactions used native click and key tools.
Representative screenshots show the [desktop credential walkthrough](credential-desktop.png) and [narrow batch walkthrough](batch-mobile.png).

To reproduce, open the [public HTML](../../../examples/pr-walkthrough.html) directly in a browser.
Build the other two manifests with `node skills/pr-walkthrough/scripts/build.mjs --manifest <manifest> --output <html>`.
Use the dimensions above, switch themes, tab to code, scroll it horizontally, and page to the footer.
Compare rendered code with the manifest rather than treating a successful build as a browser pass.

Raw screenshots, rebuilt HTML, and measurement files are retained in `.evals/browser-20260925/` and the external archive:

```text
/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/browser-evidence-20260925
```

The window-resize tool did not establish the requested CSS viewport, so subsequent measurements use explicit viewport emulation and verify `innerWidth`.
One click used a stale snapshot ID and failed before interaction; a fresh snapshot resolved it.
End-of-document shortcuts did not move the mobile-emulated document; native PageDown did. These tool observations were not classified as site defects.

## Limits

This is a direct browser check of existing text-only artifacts, not a fresh writing evaluation or a new factual review of their prose.
The public sample is an older artifact, not proof that current synthesis follows the latest style rules.
No audio synthesis/playback, Mermaid diagrams, tables, browser-engine comparison, full accessibility audit, or touch-device hardware testing was performed.
The local navigation timings in the observations are incidental and do not establish a performance budget or Core Web Vitals result.
