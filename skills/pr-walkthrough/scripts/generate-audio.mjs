#!/usr/bin/env node
/**
 * Synthesize per-section narration audio for a walkthrough manifest using
 * kokoro-js (local, offline neural TTS), encode each clip to mono MP3 with
 * ffmpeg, and emit a sidecar JSON of base64 data-URIs that build.mjs inlines.
 *
 * Usage:
 *   generate-audio.mjs --manifest <path> --output <path> [--voice af_heart]
 *
 * Input manifest (see SKILL.md): each section MAY carry a `narration` string
 * written to be heard. An optional top-level `narrationIntro` opens the
 * "Play all" track. Sections without narration are silently skipped (their
 * player is omitted downstream).
 *
 * Output JSON:
 *   {
 *     "intro":    "data:audio/mpeg;base64,..." | null,
 *     "sections": [ "data:audio/mpeg;base64,..." | null, ... ]  // index-aligned
 *   }
 *
 * GRACEFUL FALLBACK: if kokoro-js can't load (not installed / model download
 * fails) or ffmpeg is missing, this prints a warning to stderr and exits 0
 * WITHOUT writing the output file. build.mjs then produces the plain HTML.
 * Genuine bad-input errors (missing manifest, bad flags) still exit non-zero.
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import { resolve, isAbsolute } from 'node:path';

const MODEL_ID = 'onnx-community/Kokoro-82M-v1.0-ONNX';
const DEFAULT_VOICE = 'af_heart';

// Kokoro's context window is 512 tokens and kokoro-js tokenizes with
// `truncation: true`, so a single generate() call silently drops everything
// past ~510 phonemes — roughly 28 seconds of speech. A one-paragraph narration
// blows through that, which is why long clips used to stop mid-sentence.
// Phonemes run a little under one per character for English prose, so we batch
// text to a conservative character budget, synthesize each batch separately,
// and stitch the waveforms back together.
const CHUNK_CHARS = 350;

/** @param {string[]} argv */
function parseArgs(argv) {
  /** @type {Record<string, string>} */
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k.startsWith('--')) {
      const v = argv[i + 1];
      if (v === undefined || v.startsWith('--')) fail(`flag ${k} expected a value`);
      out[k.slice(2)] = v;
      i++;
    }
  }
  return out;
}

// Hard error: bad input/usage. Exits non-zero so the caller notices.
/** @param {string} msg
 * @returns {never}
 */
function fail(msg) {
  console.error(`generate-audio: ${msg}`);
  process.exit(2);
}

// Soft skip: toolchain unavailable. Warns and exits 0 with no output file so
// the build degrades to plain HTML.
/** @param {string} msg
 * @returns {never}
 */
function skip(msg) {
  console.error(`generate-audio: ${msg} — skipping audio, walkthrough will be text-only.`);
  process.exit(0);
}

/** @param {string} p */
const abs = (p) => (isAbsolute(p) ? p : resolve(process.cwd(), p));

const args = parseArgs(process.argv.slice(2));
if (!args.manifest || !args.output) {
  fail('usage: generate-audio.mjs --manifest <path> --output <path> [--voice <id>]');
}
const voice = args.voice || DEFAULT_VOICE;
const outputPath = abs(args.output);
if (outputPath === abs(args.manifest)) fail('output must differ from manifest');
// A skipped or failed rerun must not leave narration from an earlier manifest.
rmSync(outputPath, { force: true });

/** @type {import('./types.js').Manifest} */
let manifest;
try {
  manifest = JSON.parse(readFileSync(abs(args.manifest), 'utf8'));
} catch (err) {
  fail(`failed to read or parse manifest: ${err instanceof Error ? err.message : String(err)}`);
}
if (!Array.isArray(manifest.sections) || manifest.sections.length === 0) {
  fail('manifest.sections must be a non-empty array');
}

if (!manifest.narrationIntro && !manifest.sections.some((section) => section?.narration)) {
  skip('manifest has no narration');
}

// --- Preflight: ffmpeg must exist and speak libmp3lame -----------------------
const ff = spawnSync('ffmpeg', ['-hide_banner', '-encoders'], { encoding: 'utf8' });
if (ff.error) skip('ffmpeg not found on PATH');
if (!/libmp3lame/.test(ff.stdout || '')) skip('ffmpeg lacks the libmp3lame MP3 encoder');

// --- Load kokoro-js (may download the model on first run) --------------------
// Dynamic so a missing install degrades to text-only instead of crashing;
// chunk-narration.mjs pulls kokoro-js in too, so it loads the same way.
let KokoroTTS;
/** @type {typeof import('./chunk-narration.mjs').chunkNarration} */
let chunkNarration;
try {
  ({ KokoroTTS } = await import('kokoro-js'));
  ({ chunkNarration } = await import('./chunk-narration.mjs'));
} catch (err) {
  skip(`kokoro-js not installed (${err instanceof Error ? err.message : String(err)}). Run \`bun install\` in the scripts dir`);
}

/** @type {import('kokoro-js').KokoroTTS} */
let tts;
try {
  tts = await KokoroTTS.from_pretrained(MODEL_ID, { dtype: 'q8', device: 'cpu' });
} catch (err) {
  skip(`could not load the Kokoro model (${err instanceof Error ? err.message : String(err)})`);
}
if (!Object.hasOwn(tts.voices, voice)) fail(`unknown voice: ${voice}`);
const selectedVoice = /** @type {keyof typeof tts.voices} */ (voice);

// Encode raw mono float32 PCM to MP3 (~48 kbps) and return a base64 data-URI.
// PCM rather than WAV because the clip is stitched from several generate()
// calls, and there's no WAV header to rebuild if we hand ffmpeg the samples.
/** @param {Float32Array} pcm
 * @param {number} sampleRate
 * @returns {Promise<string>}
 */
function pcmToMp3DataUri(pcm, sampleRate) {
  return new Promise((res, rej) => {
    const ffmpeg = spawn(
      'ffmpeg',
      ['-hide_banner', '-loglevel', 'error',
       '-f', 'f32le', '-ar', String(sampleRate), '-ac', '1', '-i', 'pipe:0',
       '-c:a', 'libmp3lame', '-b:a', '48k', '-f', 'mp3', 'pipe:1'],
      { stdio: ['pipe', 'pipe', 'inherit'] }
    );
    /** @type {Buffer[]} */
    const chunks = [];
    ffmpeg.stdout.on('data', (c) => chunks.push(c));
    ffmpeg.on('error', rej);
    ffmpeg.on('close', (code) => {
      if (code !== 0) return rej(new Error(`ffmpeg exited ${code}`));
      const b64 = Buffer.concat(chunks).toString('base64');
      res(`data:audio/mpeg;base64,${b64}`);
    });
    ffmpeg.stdin.on('error', () => {}); // ignore EPIPE if ffmpeg dies early
    ffmpeg.stdin.end(Buffer.from(pcm.buffer, pcm.byteOffset, pcm.byteLength));
  });
}

// Synthesize one narration string all the way to an MP3 data-URI, in as many
// passes as the text needs to stay inside Kokoro's context window.
/** @param {string} text
 * @param {string} label
 */
async function clip(text, label) {
  const parts = [];
  let sampleRate = 24000;
  const pieces = chunkNarration(text, CHUNK_CHARS);
  for (const piece of pieces) {
    const audio = await tts.generate(piece, { voice: selectedVoice });
    sampleRate = audio.sampling_rate;
    parts.push(audio.audio);
  }

  const total = parts.reduce((n, p) => n + p.length, 0);
  const pcm = new Float32Array(total);
  let offset = 0;
  for (const part of parts) {
    pcm.set(part, offset);
    offset += part.length;
  }

  const uri = await pcmToMp3DataUri(pcm, sampleRate);
  const kb = Math.round((uri.length * 3) / 4 / 1024);
  const seconds = (total / sampleRate).toFixed(1);
  console.error(`  ${label}: ${seconds}s, ~${kb} KB (${pieces.length} pass(es))`);
  return uri;
}

/** @type {{intro: string | null, sections: (string | null)[]}} */
const result = { intro: null, sections: [] };

if (manifest.narrationIntro && String(manifest.narrationIntro).trim()) {
  console.error('synthesizing intro…');
  result.intro = await clip(String(manifest.narrationIntro).trim(), 'intro');
}

for (let i = 0; i < manifest.sections.length; i++) {
  const n = manifest.sections[i]?.narration;
  if (!n || !String(n).trim()) {
    result.sections.push(null);
    continue;
  }
  console.error(`synthesizing section ${i + 1}/${manifest.sections.length}…`);
  result.sections.push(await clip(String(n).trim(), `section ${i + 1}`));
}

writeFileSync(outputPath, JSON.stringify(result));
const count = result.sections.filter(Boolean).length + (result.intro ? 1 : 0);
console.error(`generate-audio: wrote ${count} clip(s) to ${abs(args.output)}`);
process.stdout.write(abs(args.output) + '\n');
