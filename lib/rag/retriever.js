import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CHAT_LIMITS } from '@/lib/chat/constants';
import { retrieveByKeywords } from '@/lib/rag/keywordRetriever';

let cachedIndex = null;

function loadIndex() {
  if (cachedIndex) return cachedIndex;

  const indexPath = path.join(process.cwd(), 'data', 'knowledge-index.json');
  if (!fs.existsSync(indexPath)) {
    cachedIndex = { version: 1, chunks: [] };
    return cachedIndex;
  }

  cachedIndex = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
  return cachedIndex;
}

function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (!normA || !normB) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function embedQuery(query) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const embeddingModel =
    process.env.GEMINI_EMBEDDING_MODEL || 'gemini-embedding-001';
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: embeddingModel });
  const result = await model.embedContent(query);
  return result.embedding.values;
}

function retrieveByEmbeddings(chunks, queryEmbedding, topK) {
  return chunks
    .filter((c) => Array.isArray(c.embedding) && c.embedding.length)
    .map((chunk) => ({
      chunk,
      score: cosineSimilarity(queryEmbedding, chunk.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((item) => ({ ...item.chunk, score: item.score }));
}

export async function retrieveContext(query) {
  const index = loadIndex();
  const chunks = index.chunks || [];

  if (!chunks.length) {
    return { chunks: [], lowConfidence: true };
  }

  const topK = CHAT_LIMITS.topK;

  try {
    const queryEmbedding = await embedQuery(query);
    if (queryEmbedding) {
      const vectorResults = retrieveByEmbeddings(chunks, queryEmbedding, topK);
      const best = vectorResults[0]?.score ?? 0;
      if (vectorResults.length && best >= CHAT_LIMITS.minSimilarity) {
        return {
          chunks: prioritizeChunksForQuery(vectorResults, query, topK),
          lowConfidence: false,
        };
      }
    }
  } catch {
    // fall through to keyword search
  }

  let keywordResults = retrieveByKeywords(chunks, query, topK);
  let bestKeyword = keywordResults[0]?.score ?? 0;

  // No literal keyword overlap (e.g. user says "qualification", docs say "degree")
  if (keywordResults.length === 0) {
    const broadQuery =
      'Ali Hafeez education degree university experience skills projects work thesis PTA NET dotnet AI RAG LLM machine learning portfolio chat';
    keywordResults = retrieveByKeywords(chunks, broadQuery, topK);
    bestKeyword = keywordResults[0]?.score ?? 0;
  }

  // Last resort: include CV/journey sections so the LLM is never sent empty context
  if (keywordResults.length === 0) {
    keywordResults = pickBootstrapChunks(chunks, topK);
    bestKeyword = 0.1;
  }

  return {
    chunks: prioritizeChunksForQuery(keywordResults, query, topK),
    // lowConfidence = weak match, NOT "blocked" — LLM should still try with context
    lowConfidence: bestKeyword < 0.2,
  };
}

/** When search finds nothing, prefer overview docs over random chunks */
function pickBootstrapChunks(chunks, topK) {
  const preferred = chunks.filter((c) => {
    const file = c.meta?.file || '';
    return (
      file.includes('Complete Professional Journey') ||
      file.includes('Detailed CV') ||
      file.includes('AI Experience') ||
      file.includes('Quick Reference') ||
      file.includes('PTA') ||
      file.includes('Education') ||
      /education|experience|skills|summary|pta|whatsapp/i.test(c.meta?.section || '')
    );
  });
  const pool = preferred.length >= topK ? preferred : chunks;
  return pool.slice(0, topK).map((chunk) => ({ ...chunk, score: 0.1 }));
}

const AI_TOPIC_RE =
  /\b(rag|llm|llms|embedding|chatbot|generative|artificial intelligence|machine learning)\b/i;

function prioritizeChunksForQuery(chunks, query, topK) {
  if (!AI_TOPIC_RE.test(query)) return chunks;

  const chatAnswer = chunks.filter((c) =>
    /chat answer:/i.test(c.meta?.section || '')
  );
  const quickRef = chunks.filter((c) =>
    (c.meta?.file || '').includes('Quick Reference')
  );
  const rest = chunks.filter(
    (c) => !chatAnswer.includes(c) && !quickRef.includes(c)
  );

  const merged = [...chatAnswer, ...quickRef, ...rest];
  const seen = new Set();
  const unique = [];
  for (const chunk of merged) {
    if (seen.has(chunk.id)) continue;
    seen.add(chunk.id);
    unique.push(chunk);
    if (unique.length >= topK) break;
  }
  return unique.length ? unique : chunks;
}

export function formatContextForPrompt(retrievedChunks) {
  if (!retrievedChunks.length) return '';

  return retrievedChunks
    .map((c, i) => {
      const section = c.meta?.section || 'Background';
      return `[${i + 1}] ${section}\n${c.text}`;
    })
    .join('\n\n---\n\n');
}
