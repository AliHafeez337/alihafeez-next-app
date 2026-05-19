const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior)\s+instructions/i,
  /you\s+are\s+now\s+(dan|a\s+new)/i,
  /system\s+prompt/i,
  /jailbreak/i,
  /pretend\s+you\s+are/i,
  /reveal\s+(your\s+)?(system|hidden)\s+prompt/i,
];

const CODE_PATTERNS = [
  /```/,
  /\bfunction\s*\(/i,
  /\b(import\s+|export\s+|require\s*\()/i,
  /<\s*script/i,
  /javascript:/i,
  /onerror\s*=/i,
  /\bSELECT\s+.+\s+FROM\b/i,
  /\bDROP\s+TABLE\b/i,
  /#\s*include\s*</i,
  /<\?php/i,
  /\beval\s*\(/i,
  /\bexec\s*\(/i,
  /\bcurl\s+.+\|/i,
  /\bwget\s+/i,
];

const TOPIC_ALLOW_KEYWORDS = [
  'ali',
  'hafeez',
  'you',
  'your',
  'career',
  'work',
  'job',
  'project',
  'experience',
  'skill',
  'education',
  'qualification',
  'qualifications',
  'degree',
  'thesis',
  'lorawan',
  'cyber',
  'security',
  'react',
  'angular',
  'vue',
  'node',
  'flutter',
  'grapes',
  'grapesjs',
  'sumo',
  'hamah',
  'pieas',
  'university',
  'ms',
  'bs',
  'fyp',
  'portfolio',
  'developer',
  'frontend',
  'fullstack',
  'full-stack',
  'consult',
  'hire',
  'interview',
  'cv',
  'resume',
  'recommendation',
  'github',
  'upwork',
  'flowtack',
  'airvi',
  'healthcare',
  'proposal',
  'grapesjs',
  'open source',
  'ns-3',
  'ns3',
  'iot',
  'lora',
];

const OFF_TOPIC_PATTERNS = [
  /\bweather\b/i,
  /\bwrite\s+(me\s+)?code\b/i,
  /\bhomework\b/i,
  /\brecipe\b/i,
  /\bwho\s+is\s+(elon|trump|messi)\b/i,
  /\btranslate\s+this\b/i,
  /\bgenerate\s+an?\s+image\b/i,
];

export function hasInjectionPattern(text) {
  return INJECTION_PATTERNS.some((p) => p.test(text));
}

export function hasCodePattern(text) {
  return CODE_PATTERNS.some((p) => p.test(text));
}

export function countUrls(text) {
  const matches = text.match(/https?:\/\/|www\./gi);
  return matches ? matches.length : 0;
}

export function symbolRatio(text) {
  if (!text.length) return 0;
  const letters = (text.match(/[a-zA-Z]/g) || []).length;
  return 1 - letters / text.length;
}

export function hasAllowTopicSignal(text) {
  const lower = text.toLowerCase();
  return TOPIC_ALLOW_KEYWORDS.some((kw) => lower.includes(kw));
}

export function looksOffTopic(text) {
  // Only block obvious non-portfolio intents — do NOT require allowlist keywords.
  // (Requiring words like "career" would wrongly treat valid questions as off-topic.)
  return OFF_TOPIC_PATTERNS.some((p) => p.test(text));
}

export function hasRepeatedChars(text) {
  return /(.)\1{9,}/.test(text);
}
