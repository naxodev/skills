/**
 * Split a narration string into TTS-sized chunks.
 *
 * Kokoro truncates its input at 512 tokens, so long narration must be
 * synthesized in pieces and concatenated. Chunks are cut at sentence
 * boundaries wherever possible so the seams land where a reader would pause;
 * a sentence too long to fit on its own is broken at clause punctuation, and
 * only then at whitespace.
 */
import { TextSplitterStream } from 'kokoro-js';

// Sentence-internal pause points, in the order we're willing to cut at.
const CLAUSE_BOUNDARY = /(?<=[,;:—–])\s+/;

function splitSentences(text) {
  const splitter = new TextSplitterStream();
  splitter.push(text);
  return [...splitter]; // iterating flushes the trailing partial sentence
}

// Break one over-long sentence into pieces that each fit the budget.
function splitLongSentence(sentence, budget) {
  const pieces = [];
  for (const clause of sentence.split(CLAUSE_BOUNDARY)) {
    if (clause.length <= budget) {
      pieces.push(clause);
      continue;
    }
    // No punctuation to lean on — fall back to packing whole words.
    let current = '';
    for (const word of clause.split(/\s+/)) {
      if (current && current.length + 1 + word.length > budget) {
        pieces.push(current);
        current = word;
      } else {
        current = current ? `${current} ${word}` : word;
      }
    }
    if (current) pieces.push(current);
  }
  return pieces;
}

/**
 * @param {string} text     narration to speak
 * @param {number} budget   max characters per chunk
 * @returns {string[]}      non-empty chunks, in order, each <= budget unless a
 *                          single unbreakable word exceeds it
 */
export function chunkNarration(text, budget) {
  const pieces = splitSentences(String(text).trim()).flatMap((sentence) =>
    sentence.length <= budget ? [sentence] : splitLongSentence(sentence, budget)
  );

  // Re-pack adjacent pieces: fewer, fuller chunks mean fewer seams and more
  // natural prosody than synthesizing one short sentence at a time.
  const chunks = [];
  for (const piece of pieces) {
    if (!piece) continue;
    const last = chunks.at(-1);
    if (last && last.length + 1 + piece.length <= budget) {
      chunks[chunks.length - 1] = `${last} ${piece}`;
    } else {
      chunks.push(piece);
    }
  }
  return chunks;
}
