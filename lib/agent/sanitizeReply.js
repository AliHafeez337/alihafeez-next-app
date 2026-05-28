/** Leaked tool syntax some models print in plain text instead of using the tools API */
const FUNCTION_TAG_RE =
  /<function\s*=\s*([a-z_][a-z0-9_]*)\s*(?:\/>|><\/function>|\s*>)/gi;

export function extractLeakedFunctionNames(text) {
  if (!text || typeof text !== 'string') return [];
  const names = new Set();
  let match = FUNCTION_TAG_RE.exec(text);
  while (match) {
    names.add(match[1]);
    match = FUNCTION_TAG_RE.exec(text);
  }
  FUNCTION_TAG_RE.lastIndex = 0;
  return [...names];
}

const AWKWARD_PHRASE_RE =
  /\s*(?:in|from)\s+my\s+(?:notes|context|documents|files|knowledge\s+base)\.?/gi;

/** Internal implementation details the model must not expose to visitors */
const INTERNAL_JARGON_RES = [
  [/\btext-embedding-004\b/gi, 'Gemini embeddings'],
  [/\bgemini-embedding-001\b/gi, 'Gemini embeddings'],
  [/\b`?Me\/?`?\s*(?:folder|documents?|files?)?\b/gi, 'my CV and project write-ups'],
  [/\bchunked\s+`?Me\/?`?\s*documents?\b/gi, 'indexed my background material'],
  [/\bknowledge-index\.json\b/gi, 'search index'],
  [/\bnpm run build:index\b/gi, ''],
  [/\bscripts\/build-knowledge-index\.mjs\b/gi, ''],
  [/\blib\/rag\/[\w.]+\b/gi, ''],
  [/\bpages\/api\/chat\.js\b/gi, ''],
  [/\bdata\/knowledge-index\.json\b/gi, ''],
  [/\bThis was part of my RAG systems work\.?\s*/gi, ''],
  [/\bgrounded first-person replies\.?\s*/gi, ''],
];

export function polishReplyTone(text) {
  if (!text || typeof text !== 'string') return '';
  let out = text;
  for (const [pattern, replacement] of INTERNAL_JARGON_RES) {
    out = out.replace(pattern, replacement);
  }
  return out
    .replace(AWKWARD_PHRASE_RE, '')
    .replace(
      /I don't have any information about (.+?) in my notes\.?/gi,
      "I don't have details on $1 in what I've shared here."
    )
    .replace(
      /I don't have (?:any )?information about (.+?)\.?/gi,
      "I don't have details on $1."
    )
    .replace(
      /I do not have (?:any )?information about (.+?)\.?/gi,
      "I don't have details on $1."
    )
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([,.])/g, '$1')
    .replace(/^\s*[,.\-–]\s*/gm, '')
    .trim();
}

export function stripLeakedFunctionSyntax(text) {
  if (!text || typeof text !== 'string') return '';
  return polishReplyTone(
    text
      .replace(/<function\s*=\s*[a-z_][a-z0-9_]*\s*\/?>/gi, '')
      .replace(/<function\s*=\s*[a-z_][a-z0-9_]*\s*>\s*<\/function>/gi, '')
      .replace(/<\/function>/gi, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

export function appendToolLinks(text, toolResults) {
  if (!toolResults?.length) return text;

  const lines = [];

  for (const result of toolResults) {
    if (result.action === 'contact_menu' && result.options) {
      for (const opt of result.options) {
        if (opt.hint && !text.includes(opt.hint)) {
          lines.push(opt.hint);
        } else if (opt.url && !text.includes(opt.url)) {
          lines.push(`${opt.label}: ${opt.url}`);
        }
      }
    }
    if (result.action === 'koalendar_widget' && result.hint && !text.includes(result.hint)) {
      lines.push(result.hint);
    }
  }

  // Only add single-link tools when there is no answer text (tool-only turn)
  if (!text.trim()) {
    for (const result of toolResults) {
      if (result.action === 'link' || result.action === 'mailto') {
        if (!lines.some((l) => l.includes(result.url))) {
          lines.push(`${result.label}: ${result.url}`);
        }
      }
    }
  }

  if (!lines.length) return text;
  return `${text}\n\n${lines.join('\n')}`.trim();
}
