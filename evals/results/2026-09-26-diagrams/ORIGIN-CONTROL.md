# File-origin diagnostic: corrected attribution

The earlier browser run associated an unsafe-file-origin console diagnostic with malformed Mermaid syntax.
Controlled follow-up shows that attribution was not supported. The same diagnostic occurs on a static page containing no scripts,
styles, diagrams, or external resources. No Mermaid-specific workaround is justified by these observations.

## Isolation sequence

All pages ran in separate isolated Chrome contexts through the same DevTools tooling.
The minimal bundled pages used the installed Mermaid distribution. Their script completion and output were inspected after loading.

| Page | Protocol | Observed result | File-origin diagnostic |
| --- | --- | --- | --- |
| Bundle plus initialization, no parse or render | `file://` | Script completed; no SVG | Yes |
| Parse invalid syntax with `suppressErrors` | `file://` | Returned `false`; no SVG | Yes |
| Render invalid syntax | `file://` | Caught parse error; error SVG remained in this bare diagnostic page | Yes |
| Render valid syntax | `file://` | Produced SVG | Yes |
| Bundle loading without initialization | `file://` | No SVG | Yes |
| Local script with no Mermaid | `file://` | Script completed; no SVG | Yes |
| [Static control](../../fixtures/diagram-layout/static-control.html), no scripts | `file://` | Plain paragraph; zero script or SVG nodes | Yes |
| Same static-control bytes | localhost HTTP | Same paragraph; zero script or SVG nodes | No |
| Current builder's invalid-diagram output | localhost HTTP | Original source retained; zero SVG nodes | No |
| Valid minimal diagram | localhost HTTP | Produced SVG | No |

The recurring browser message was:

```text
Unsafe attempt to load URL file:… from frame with URL file:….
'file:' URLs are treated as unique security origins.
```

The HTTP control server served only the named local probe pages, bound to `127.0.0.1`.
No browser security controls were disabled. The same HTML files were used across the static and valid-diagram protocol comparisons.

## Conclusion and limits

Malformed syntax and the Mermaid bundle are not necessary to reproduce the diagnostic in this browser/tool environment.
Local HTTP removes the observed diagnostic, but this does not identify the precise browser or tooling code that emits it.
It also does not prove that all browser environments emit it on local files. The previous valid walkthrough checks reported no messages;
those observations are retained rather than replaced with a universal claim.

The source fallback works on the generated invalid walkthrough. Its small empty wrapper remains a separate cleanup detail.
The earlier parsing experiments remain discarded. The production change still only fixes diagram sizing and keyboard access.

The [layout report](README.md) and its measurements continue to describe the independently reproduced readability defect.
Raw probe pages and the diagnostic generator are archived at:

```text
/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/mermaid-origin-evidence-20260926
```
