import { test, expect } from 'bun:test';
import { chunkNarration } from './chunk-narration.mjs';

const BUDGET = 350;
/** @param {string} s */
const words = (s) => s.split(/\s+/).filter(Boolean);

const PARAGRAPH = [
  'This pull request reworks the authentication middleware so that token refresh happens before the request is dispatched.',
  'Previously the refresh ran afterwards, which meant the first call after an expiry always failed and the retry masked the real error.',
  'The new ordering costs one extra clock read per request, and the team judged that cheaper than the confusing failure mode it replaces.',
  'A follow-up will move the same guard into the streaming client, which still has the old ordering.',
  'The very last words of this narration are: banana banana banana.',
].join(' ');

// The whole point of chunking: Kokoro truncates at 512 tokens, so any chunk
// over budget gets its tail silently cut off in the generated audio.
test('every chunk stays inside the budget', () => {
  for (const chunk of chunkNarration(PARAGRAPH, BUDGET)) {
    expect(chunk.length).toBeLessThanOrEqual(BUDGET);
  }
});

// Chunks are concatenated back into one clip, so dropping or reordering a word
// silently corrupts the narration the listener hears.
test('chunks concatenate back to the original words', () => {
  expect(words(chunkNarration(PARAGRAPH, BUDGET).join(' '))).toEqual(words(PARAGRAPH));
});

test('a single sentence longer than the budget is broken up, not truncated', () => {
  const runOn =
    'The migration touches the session store, the refresh scheduler, ' +
    'the retry policy, the metrics exporter, the audit log writer, ' +
    'the feature flag reader, the request tracer, the config loader, ' +
    'the health checker, the shutdown hook, and the background reconciler, ' +
    'all of which previously assumed the token was already valid at the ' +
    'moment the router invoked them.';
  expect(runOn.length).toBeGreaterThan(BUDGET);

  const chunks = chunkNarration(runOn, BUDGET);
  expect(chunks.length).toBeGreaterThan(1);
  for (const chunk of chunks) expect(chunk.length).toBeLessThanOrEqual(BUDGET);
  expect(words(chunks.join(' '))).toEqual(words(runOn));
});

test('text that already fits is left as one chunk', () => {
  const short = 'The diff adds a guard clause and nothing else.';
  expect(chunkNarration(short, BUDGET)).toEqual([short]);
});
