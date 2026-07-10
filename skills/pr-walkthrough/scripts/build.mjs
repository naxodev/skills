#!/usr/bin/env node
/**
 * Stitch a JSON manifest + the HTML template into the final walkthrough
 * document.
 *
 * Usage:
 *   build.mjs --manifest <path> --output <path> [--template <path>]
 *             [--audio <sidecar.json>]
 *
 * --audio is optional. When given and readable, each section with a clip gets
 * an inline <audio> player and the header gets a "Play narration" control that
 * plays every clip in order, auto-advancing and scrolling each section into
 * view. When the flag is absent OR the file can't be read (the TTS step was
 * skipped), the output is exactly the plain text-only HTML.
 *
 * Mermaid diagrams need no flag — section `content` may embed them directly as
 * <pre class="mermaid">…</pre> (escaped mermaid source). When at least one is
 * found, mermaid.min.js is inlined (resolved via the `mermaid` package) so the
 * diagrams render client-side with no CDN dependency, keeping the output a
 * single self-contained file. Each diagram is rendered twice — once with the
 * document's light palette, once with its dark palette — and the injected
 * script toggles between them via CSS as `data-theme` flips, so diagrams
 * match the page instantly in both themes. If the `mermaid` package isn't
 * installed, the build still succeeds — diagrams just render as plain source
 * text — and a warning is printed telling you to `bun install`. More than 3
 * diagrams in one document also gets a warning (STYLE.md budgets 1-3) but
 * does not fail.
 *
 * Structured code blocks and diagrams. A section may carry a `code` array
 * (each entry `{ lang, source, file? }`) and/or a `diagrams` array (raw
 * mermaid source strings), referenced from that section's `content` via
 * {{CODE:i}} / {{DIAGRAM:i}} placeholders (0-indexed). The build expands
 * these deterministically before assembly — it owns escaping, captions, and
 * syntax highlighting. Every placeholder must reference an existing array
 * entry and every array entry must be referenced by exactly one placeholder;
 * any mismatch (dangling placeholder, orphaned entry, or a placeholder used
 * twice) fails the build (exit 2) naming the section and index — the
 * manifest is LLM-authored, so a silently dropped or silently ignored block
 * is worse than a loud error.
 *
 * Code entries are highlighted at build time with Shiki (dual light/dark
 * theme) when the `shiki` package is installed; an unrecognized `lang` falls
 * back to plain text for that one block (with a warning) rather than failing
 * the build. If `shiki` isn't installed at all, every code entry renders as
 * plain escaped text and a warning is printed telling you to `bun install` —
 * same graceful-fallback shape as the mermaid handling above. More than 4
 * code entries across the document also gets a warning (STYLE.md budgets
 * 2-4 key blocks) but does not fail.
 *
 * Manifest schema (see SKILL.md for the full spec):
 *   {
 *     "title":   string,         // page H1
 *     "eyebrow": string,         // small uppercase label above H1
 *     "dek":     string,         // subtitle paragraph
 *     "meta":    string,         // small meta line under dek (optional)
 *     "footer":  string,         // footer text (optional, defaults to meta)
 *     "sections": [
 *       {
 *         "eyebrow": string,
 *         "title":   string,
 *         "content": string-of-html,          // may embed {{CODE:i}} / {{DIAGRAM:i}}
 *         "code":     [{ lang, source, file? }],  // optional
 *         "diagrams": [string, ...]               // optional, raw mermaid source
 *       }
 *     ]
 *   }
 *
 * Sections are numbered automatically starting at 1. `content` is raw
 * HTML — the build script does not escape it (escape your own code
 * samples). Plain-text fields are escaped.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, isAbsolute } from 'node:path';
import { createRequire } from 'node:module';

const __dirname = dirname(fileURLToPath(import.meta.url));

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k.startsWith('--')) {
      const v = argv[i + 1];
      if (v === undefined || v.startsWith('--')) {
        fail(`flag ${k} expected a value`);
      }
      out[k.slice(2)] = v;
      i++;
    }
  }
  return out;
}

function fail(msg) {
  console.error(msg);
  process.exit(2);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const args = parseArgs(process.argv.slice(2));
if (!args.manifest || !args.output) {
  fail(
    'usage: build.mjs --manifest <path> --output <path> [--template <path>]'
  );
}

const manifestPath = isAbsolute(args.manifest)
  ? args.manifest
  : resolve(process.cwd(), args.manifest);
const outputPath = isAbsolute(args.output)
  ? args.output
  : resolve(process.cwd(), args.output);
const templatePath = args.template
  ? isAbsolute(args.template)
    ? args.template
    : resolve(process.cwd(), args.template)
  : resolve(__dirname, '..', 'template.html');
const audioPath = args.audio
  ? isAbsolute(args.audio)
    ? args.audio
    : resolve(process.cwd(), args.audio)
  : null;

let manifest;
try {
  manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
} catch (err) {
  fail(`failed to read or parse manifest: ${err.message}`);
}

const required = ['title', 'eyebrow', 'dek', 'sections'];
for (const k of required) {
  if (manifest[k] === undefined || manifest[k] === null || manifest[k] === '') {
    fail(`manifest missing required field: ${k}`);
  }
}

if (!Array.isArray(manifest.sections) || manifest.sections.length === 0) {
  fail('manifest.sections must be a non-empty array');
}
if (manifest.sections.length > 11) {
  fail(
    `too many sections: ${manifest.sections.length} (max 11 — collapse or split into another doc)`
  );
}

// Optional narration audio sidecar. A read failure degrades to plain HTML
// rather than aborting the build — the whole point of the graceful fallback.
let audio = null;
if (audioPath) {
  try {
    audio = JSON.parse(readFileSync(audioPath, 'utf8'));
  } catch (err) {
    console.error(
      `build: could not read audio sidecar (${err.message}) — emitting text-only HTML`
    );
    audio = null;
  }
}

// Structured code (Shiki) is an optional dependency with a graceful
// plain-text fallback — same shape as the mermaid handling below. Only
// attempt the import if some section actually uses it, and only import it
// once for the whole build.
let codeToHtml = null;
const needsShiki = manifest.sections.some(
  (s) => s && Array.isArray(s.code) && s.code.length > 0
);
if (needsShiki) {
  try {
    // Dynamic import is deliberate here, not a style slip: shiki is optional,
    // and importing it eagerly would make every build depend on it even when
    // no section uses structured code.
    ({ codeToHtml } = await import('shiki'));
  } catch {
    console.error(
      'build: code blocks present but the shiki package is not installed — ' +
        'run `bun install` in the scripts dir; code will render as plain text'
    );
    codeToHtml = null;
  }
}

const SHIKI_THEMES = { light: 'vitesse-light', dark: 'vitesse-dark' };

async function renderCodeEntry(entry, n, idx) {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
    fail(`section ${n}: code[${idx}] must be an object with "lang" and "source"`);
  }
  if (!entry.lang || typeof entry.lang !== 'string') {
    fail(`section ${n}: code[${idx}] missing required field "lang"`);
  }
  if (!entry.source || typeof entry.source !== 'string') {
    fail(`section ${n}: code[${idx}] missing required field "source"`);
  }

  let pre;
  if (codeToHtml) {
    try {
      pre = await codeToHtml(entry.source, { lang: entry.lang, themes: SHIKI_THEMES });
    } catch {
      console.error(
        `build: section ${n} code[${idx}]: unknown lang "${entry.lang}" — rendering as plain text`
      );
      pre = await codeToHtml(entry.source, { lang: 'text', themes: SHIKI_THEMES });
    }
  } else {
    pre = `<pre><code>${escapeHtml(entry.source)}</code></pre>`;
  }

  return entry.file
    ? `<figure class="code-figure"><figcaption><code>${escapeHtml(
        entry.file
      )}</code></figcaption>${pre}</figure>`
    : pre;
}

function renderDiagramEntry(entry, n, idx) {
  if (typeof entry !== 'string' || entry.trim() === '') {
    fail(`section ${n}: diagrams[${idx}] must be a non-empty string`);
  }
  return `<pre class="mermaid">\n${escapeHtml(entry)}\n</pre>`;
}

// Expand {{TAG:i}} placeholders in a section's content against its matching
// array field. Strict on purpose: the manifest is LLM-authored, so a
// dangling placeholder or an orphaned array entry must fail loudly (exit 2)
// rather than silently dropping content or leaving a placeholder literal in
// the output.
async function expandPlaceholders(content, arr, tag, fieldName, n, render) {
  const entries = Array.isArray(arr) ? arr : [];
  const re = new RegExp(`\\{\\{${tag}:(\\d+)\\}\\}`, 'g');
  const seen = new Set();
  let match;
  while ((match = re.exec(content))) {
    const idx = Number(match[1]);
    if (seen.has(idx)) {
      fail(`section ${n}: {{${tag}:${idx}}} placeholder appears more than once`);
    }
    seen.add(idx);
    if (idx >= entries.length) {
      fail(
        `section ${n}: {{${tag}:${idx}}} references ${fieldName}[${idx}], which does not exist`
      );
    }
  }
  for (let i = 0; i < entries.length; i++) {
    if (!seen.has(i)) {
      fail(
        `section ${n}: ${fieldName}[${i}] is never referenced by a {{${tag}:${i}}} placeholder`
      );
    }
  }

  let result = content;
  for (const idx of seen) {
    const rendered = await render(entries[idx], n, idx);
    result = result.split(`{{${tag}:${idx}}}`).join(rendered);
  }
  return result;
}

let leadCount = 0;
let codeEntryCount = 0;
const sectionsHtmlParts = [];
for (let i = 0; i < manifest.sections.length; i++) {
  const s = manifest.sections[i];
  const n = i + 1;
  if (!s || typeof s !== 'object') fail(`section ${n} is not an object`);
  if (!s.title) fail(`section ${n} missing title`);
  if (!s.content) fail(`section ${n} missing content`);

  // Checked against the authored content, before placeholder expansion swaps
  // in structured blocks — this is advisory, not a validation failure.
  if (/<pre>\s*<code/.test(String(s.content))) {
    console.error(
      `build: section ${n} content has a hand-authored <pre><code> block — consider a structured "code" entry instead for syntax highlighting`
    );
  }
  if (Array.isArray(s.code)) codeEntryCount += s.code.length;

  let content = String(s.content);
  content = await expandPlaceholders(content, s.code, 'CODE', 'code', n, renderCodeEntry);
  content = await expandPlaceholders(
    content,
    s.diagrams,
    'DIAGRAM',
    'diagrams',
    n,
    renderDiagramEntry
  );

  const matches = content.match(/<p\s+class="lead"/g);
  if (matches) leadCount += matches.length;
  const eyebrow = s.eyebrow
    ? `${n} · ${escapeHtml(s.eyebrow)}`
    : String(n);
  const clip =
    audio && Array.isArray(audio.sections) ? audio.sections[i] : null;
  const player = clip
    ? `\n<div class="pw-player"><audio class="pw-audio" controls preload="none" data-scroll="#pw-sec-${n}" src="${clip}"></audio></div>`
    : '';
  sectionsHtmlParts.push(
    `<h2 id="pw-sec-${n}"><span class="num">${eyebrow}</span>${escapeHtml(
      s.title
    )}</h2>${player}\n${content}`
  );
}
const sectionsHtml = sectionsHtmlParts.join('\n\n');

if (leadCount > 1) {
  fail(
    `found ${leadCount} <p class="lead"> elements — STYLE.md allows only one (in section 1)`
  );
}

if (codeEntryCount > 4) {
  console.error(
    `build: ${codeEntryCount} code blocks found — STYLE.md budgets 2-4 key code blocks per document`
  );
}

// Mermaid diagrams. A read failure (package not installed) degrades to plain
// source text rather than aborting the build — same graceful-fallback shape
// as the audio sidecar above.
const hasMermaid = /<pre\s+class="mermaid"/.test(sectionsHtml);
let mermaidInjection = '';
if (hasMermaid) {
  const diagramCount = (sectionsHtml.match(/<pre\s+class="mermaid"/g) || [])
    .length;
  if (diagramCount > 3) {
    console.error(
      `build: ${diagramCount} mermaid diagrams found — STYLE.md budgets 1-3 per document`
    );
  }
  try {
    const mermaidPath = createRequire(import.meta.url).resolve(
      'mermaid/dist/mermaid.min.js'
    );
    const src = readFileSync(mermaidPath, 'utf8');
    // Guard against the minified source prematurely closing our wrapping
    // <script> tag. Mermaid's official dist is routinely inlined this way
    // and does not contain a bare `</script` outside string literals.
    const safeSrc = src.replaceAll('</script', '<\\u002Fscript');
    // Each <pre class="mermaid"> is rendered twice — once against the
    // document's light theme variables, once against its dark ones — and
    // both SVGs are kept in the DOM; CSS (see template.html) shows only the
    // one matching the current data-theme, so toggling is instant with no
    // re-render. mermaid.initialize() sets global config that the very next
    // mermaid.render() call reads, so the loop below stays strictly
    // sequential — concurrent renders would race each other's theme.
    const initScript = `
(function () {
  var pres = document.querySelectorAll('pre.mermaid');
  if (!pres.length || typeof mermaid === 'undefined') return;

  var LIGHT_VARS = {
    fontFamily: '-apple-system, system-ui, sans-serif',
    fontSize: '14px',
    background: '#fbfaf6',
    primaryColor: '#f3efe4',
    primaryTextColor: '#1a1a1a',
    primaryBorderColor: '#8a3a1a',
    lineColor: '#767676',
    textColor: '#1a1a1a',
    edgeLabelBackground: '#fbfaf6',
    clusterBkg: '#ffffff',
    clusterBorder: '#e6e2d6',
    actorBkg: '#f3efe4',
    actorBorder: '#8a3a1a',
    actorTextColor: '#1a1a1a',
    signalColor: '#4a4a4a',
    signalTextColor: '#4a4a4a',
    noteBkgColor: '#ffffff',
    noteTextColor: '#1a1a1a',
    noteBorderColor: '#e6e2d6'
  };
  var DARK_VARS = {
    fontFamily: '-apple-system, system-ui, sans-serif',
    fontSize: '14px',
    background: '#1a1714',
    primaryColor: '#25211c',
    primaryTextColor: '#e8e3d8',
    primaryBorderColor: '#d77a4a',
    lineColor: '#8d8576',
    textColor: '#e8e3d8',
    edgeLabelBackground: '#1a1714',
    clusterBkg: '#221e1a',
    clusterBorder: '#36312a',
    actorBkg: '#25211c',
    actorBorder: '#d77a4a',
    actorTextColor: '#e8e3d8',
    signalColor: '#b8b0a0',
    signalTextColor: '#b8b0a0',
    noteBkgColor: '#221e1a',
    noteTextColor: '#e8e3d8',
    noteBorderColor: '#36312a'
  };
  var VARIANTS = [
    { name: 'light', vars: LIGHT_VARS },
    { name: 'dark', vars: DARK_VARS }
  ];

  (async function () {
    for (var i = 0; i < pres.length; i++) {
      var pre = pres[i];
      var src = pre.textContent.trim();
      var fig = document.createElement('div');
      fig.className = 'mermaid-fig';
      var renderedBoth = true;
      for (var v = 0; v < VARIANTS.length; v++) {
        var variant = VARIANTS[v];
        var id = 'mmd-' + i + '-' + variant.name;
        try {
          mermaid.initialize({
            startOnLoad: false,
            theme: 'base',
            themeVariables: variant.vars,
            flowchart: { useMaxWidth: true }
          });
          var out = await mermaid.render(id, src);
          var wrap = document.createElement('div');
          wrap.className = 'mermaid-variant mermaid-' + variant.name;
          wrap.innerHTML = out.svg;
          fig.appendChild(wrap);
        } catch (err) {
          // mermaid.render can throw on bad syntax, and on failure it may
          // leave an orphan error element (tagged with our render id) in the
          // DOM — clean that up so a giant error graphic doesn't render.
          renderedBoth = false;
          var orphan = document.getElementById(id);
          if (orphan) orphan.remove();
          break;
        }
      }
      // Leave the original <pre> (source text) in place unless both themed
      // variants rendered cleanly.
      if (renderedBoth) pre.replaceWith(fig);
    }
  })();
})();
`;
    mermaidInjection = `<script>${safeSrc}</script>\n<script>${initScript}</script>`;
  } catch (err) {
    console.error(
      'build: mermaid blocks present but the mermaid package is not installed — ' +
        'run `bun install` in the scripts dir; diagrams will appear as source text'
    );
    mermaidInjection = '';
  }
}

// Header "Play narration" control. Rendered only when at least one clip
// exists. The hidden intro clip, if present, is first in document order so the
// play-all sequence opens with it.
const hasAudio =
  audio &&
  (audio.intro ||
    (Array.isArray(audio.sections) && audio.sections.some(Boolean)));
const introEl =
  audio && audio.intro
    ? `<audio class="pw-audio pw-intro" preload="none" data-scroll="top" src="${audio.intro}"></audio>`
    : '';
const playAll = hasAudio
  ? `<div class="pw-audiobar">
  <button class="pw-playall" type="button" aria-pressed="false"><span class="pw-playall-icon" aria-hidden="true">▶</span><span class="pw-playall-label">Play narration</span></button>
  ${introEl}
</div>`
  : '';

const template = readFileSync(templatePath, 'utf8');
const html = template
  .replaceAll('{{TITLE}}', escapeHtml(manifest.title))
  .replaceAll('{{EYEBROW}}', escapeHtml(manifest.eyebrow))
  .replaceAll('{{DEK}}', escapeHtml(manifest.dek))
  .replaceAll('{{META}}', escapeHtml(manifest.meta ?? ''))
  .replaceAll('{{PLAYALL}}', playAll)
  .replaceAll('{{SECTIONS}}', sectionsHtml)
  .replaceAll(
    '{{FOOTER}}',
    escapeHtml(manifest.footer ?? manifest.meta ?? '')
  )
  .replaceAll('{{MERMAID}}', () => mermaidInjection);

writeFileSync(outputPath, html);
process.stdout.write(outputPath + '\n');
