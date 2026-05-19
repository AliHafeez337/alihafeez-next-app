const STOP = new Set([
  'a',
  'an',
  'the',
  'is',
  'are',
  'was',
  'were',
  'what',
  'who',
  'how',
  'when',
  'where',
  'why',
  'do',
  'did',
  'does',
  'your',
  'you',
  'me',
  'my',
  'i',
  'about',
  'and',
  'or',
  'in',
  'on',
  'at',
  'to',
  'for',
  'of',
  'with',
]);

import { expandQueryTokens } from '@/lib/rag/queryExpand';

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
}

export function scoreChunk(query, chunkText) {
  const queryTokens = expandQueryTokens(tokenize(query));
  if (!queryTokens.length) return 0;

  const textLower = chunkText.toLowerCase();
  let score = 0;

  for (const token of queryTokens) {
    if (textLower.includes(token)) {
      const count = textLower.split(token).length - 1;
      score += 1 + Math.log1p(count);
    }
  }

  return score / queryTokens.length;
}

export function retrieveByKeywords(chunks, query, topK = 5) {
  const scored = chunks
    .map((chunk) => ({
      chunk,
      score: scoreChunk(query, chunk.text),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored.map((item) => ({
    ...item.chunk,
    score: item.score,
  }));
}
