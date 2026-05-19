import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
const { loadAllChunks } = await import(
  new URL('../lib/rag/chunker.js', import.meta.url).href
);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const meDir = path.join(root, 'Me');
const outPath = path.join(root, 'data', 'knowledge-index.json');

async function embedChunks(chunks) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY not set — building keyword-only index (no embeddings).');
    return chunks;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });

  const withEmbeddings = [];
  const batchSize = 8;

  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    process.stdout.write(`Embedding ${i + 1}-${i + batch.length} / ${chunks.length}\r`);

    for (const chunk of batch) {
      try {
        const result = await model.embedContent(chunk.text.slice(0, 8000));
        withEmbeddings.push({
          ...chunk,
          embedding: result.embedding.values,
        });
      } catch (err) {
        console.warn(`\nEmbed failed for ${chunk.id}:`, err.message);
        withEmbeddings.push(chunk);
      }
    }
  }

  console.log(`\nEmbedded ${withEmbeddings.filter((c) => c.embedding).length} chunks.`);
  return withEmbeddings;
}

async function main() {
  if (!fs.existsSync(meDir)) {
    if (fs.existsSync(outPath)) {
      console.log('Me/ not found — keeping existing knowledge-index.json');
      return;
    }
    throw new Error(`Me/ not found at ${meDir} and no existing index.`);
  }

  console.log('Loading documents from Me/...');
  const chunks = loadAllChunks(meDir);
  console.log(`Chunked ${chunks.length} pieces.`);

  const indexed = await embedChunks(chunks);

  const payload = {
    version: 1,
    generatedAt: new Date().toISOString(),
    chunkCount: indexed.length,
    chunks: indexed,
  };

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(payload));
  console.log(`Wrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
