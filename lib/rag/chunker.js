import fs from 'fs';
import path from 'path';

const SKIP_FILES = new Set(['Professional Journey.md']);
const TARGET_CHARS = 1800;
const OVERLAP_CHARS = 200;

function splitByHeaders(content, fileName) {
  const lines = content.split('\n');
  const sections = [];
  let currentTitle = fileName;
  let buffer = [];

  const flush = () => {
    const text = buffer.join('\n').trim();
    if (text.length > 80) {
      sections.push({ section: currentTitle, text });
    }
    buffer = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^#{1,3}\s+(.+)/);
    if (headerMatch) {
      flush();
      currentTitle = headerMatch[1].trim();
    }
    buffer.push(line);
  }
  flush();
  return sections;
}

function splitLongText(text, section, fileName) {
  if (text.length <= TARGET_CHARS) {
    return [{ section, text }];
  }

  const chunks = [];
  let start = 0;
  let part = 0;

  while (start < text.length) {
    const end = Math.min(start + TARGET_CHARS, text.length);
    chunks.push({
      section: `${section} (part ${part + 1})`,
      text: text.slice(start, end),
    });
    if (end >= text.length) break;
    start = end - OVERLAP_CHARS;
    part += 1;
  }

  return chunks;
}

export function chunkFile(filePath, baseName) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const sections = splitByHeaders(raw, baseName);
  const chunks = [];

  sections.forEach((sec, index) => {
    const parts = splitLongText(sec.text, sec.section, baseName);
    parts.forEach((part, subIndex) => {
      chunks.push({
        id: `${baseName.replace(/[^a-z0-9]+/gi, '_').toLowerCase()}_${index}_${subIndex}`,
        text: part.text,
        meta: {
          file: baseName,
          section: part.section,
        },
      });
    });
  });

  return chunks;
}

export function loadAllChunks(meDir) {
  const resolved = path.resolve(meDir);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Me directory not found: ${resolved}`);
  }

  const files = fs
    .readdirSync(resolved)
    .filter(
      (f) =>
        (f.endsWith('.md') || f.endsWith('.txt')) && !SKIP_FILES.has(f)
    );

  const all = [];
  for (const file of files) {
    all.push(...chunkFile(path.join(resolved, file), file));
  }
  return all;
}
