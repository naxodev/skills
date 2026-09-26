# Readable diagrams on narrow screens

**Fixed a reproduced diagram layout defect.** Mermaid's percentage-sized SVGs and the template's `max-width: 100%`
compressed labels rather than allowing horizontal reading. A six-node flowchart shrank from 759.42 to 342 CSS pixels
at a 390-pixel viewport: a 14-pixel label appeared at roughly 6.3 pixels. The three-participant sequence diagram also shrank.

The builder now sizes each themed SVG from its viewBox width. The existing figure handles horizontal overflow.
Figures have accessible names, keyboard focus, and a visible focus outline. Block SVG alignment keeps the left edge reachable
when the diagram exceeds the container while retaining centering for diagrams that fit.

## Reproduction and results

The [flow/sequence fixture and browser assertions](../../fixtures/diagram-layout/README.md) isolate the renderer.
No writing model, live PR, server, or external requests were needed. Testing used isolated Chrome contexts and local files.
Read-only JavaScript inspected geometry; native keyboard tools performed interactions.

| Check | Before | Fixed |
| --- | --- | --- |
| Flowchart SVG at 390-pixel viewport | 342 pixels wide | 759.42 pixels wide inside a 342-pixel scroller |
| Sequence SVG at 390-pixel viewport | 342 pixels wide | 683 pixels wide inside a 342-pixel scroller |
| Named keyboard-focusable figures | Neither diagram | Both diagrams |
| Regression assertions, light/dark at 1280, 390, 320 | Failure reproduced at 390 | All six configurations passed |
| Page-level horizontal overflow | None | None |
| Keyboard access to right edge at 320 | Container not focusable | Both diagrams reached the right edge |

The baseline assertion failed for both scaled SVG widths and missing keyboard access.
The fixed flow and sequence scrollers reached offsets 487 and 411 pixels at the narrowest width.
Their SVG right edges matched the container edge within one CSS pixel. Both themed variants remain in the DOM; exactly one is visible.
Valid diagrams emitted no console messages and requested only the local HTML document.

A review found that the original assertion counted visible variants without checking their identity. The assertion now records the visible
class and requires it to match `data-theme`. All six configurations were rerun and passed. A separate negative control forced the light SVG
visible on a dark page; both diagrams failed the new theme-identity assertion despite each still having exactly one visible variant.
The production CSS was unchanged by this test correction. The negative-control observation is retained alongside the passing captures.

[Before](before-mobile.png), [after in dark mode](after-dark-mobile.png), and [after in light mode](after-light-mobile.png)
show the change. The clipped right-hand portion in the fixed screenshots is accessible by horizontal scrolling.
[Measurements](observations.json) retain the failing baseline, six passing captures, keyboard observations, and source/output hashes.

## Invalid syntax and limits

Malformed syntax still falls back to readable source with no visible error graphic. One empty wrapper remains after cleanup.
A file-origin console diagnostic was observed before and after the layout change. The [controlled follow-up](ORIGIN-CONTROL.md)
also reproduces it on script-free HTML and removes it with localhost HTTP, so it is not established as a Mermaid defect.
A syntax-prevalidation experiment removed the empty wrapper but did not eliminate the diagnostic; it was reverted rather than shipped.
Those discarded outputs remain in the raw archive and are not counted as the final implementation.

An initial keyboard capture landed on the theme button rather than a figure. Inspection caught the failed assertion;
the retained verified captures explicitly confirm each focused diagram and its right edge. No failed capture was counted as a pass.

The final builder was rebuilt after the prevalidation experiment was reverted. Its HTML matched the browser-tested layout-fix output byte for byte.
The bundled Mermaid version is recorded in the observations. This checks flowchart and sequence diagrams in Chrome, not every diagram type,
other browser engines, audio, screen-reader behavior, or a complete accessibility standard. It adds no new skill workflow or required dependency.

Raw HTML, measurements, screenshots, and discarded experiments are retained under `.evals/diagram-browser-20260926/` and:

```text
/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/diagram-evidence-20260926
```
