/** Map user terms to words that appear in the knowledge base */
const SYNONYMS = {
  qualification: [
    'education',
    'degree',
    'university',
    'cgpa',
    'graduate',
    'master',
    'bachelor',
    'ms',
    'bs',
    'pieas',
    'thesis',
  ],
  qualifications: [
    'education',
    'degree',
    'university',
    'cgpa',
    'graduate',
    'master',
    'bachelor',
  ],
  qualified: ['education', 'degree', 'experience', 'skills'],
  study: ['education', 'university', 'semester', 'course'],
  studied: ['education', 'university', 'semester'],
  college: ['university', 'education', 'bs', 'ms'],
  university: ['education', 'pieas', 'degree', 'ms', 'bs'],
  degree: ['education', 'ms', 'bs', 'cgpa', 'university'],
  job: ['experience', 'developer', 'work', 'company', 'role'],
  jobs: ['experience', 'work', 'company'],
  hire: ['experience', 'consultation', 'upwork'],
  skills: ['react', 'angular', 'python', 'security', 'technical'],
  skill: ['react', 'angular', 'technical'],
  grapes: ['grapesjs', 'flowtack', 'open source'],
  sumo: ['traffic', 'simulation', 'airvi', 'digital twin'],
  lora: ['lorawan', 'thesis', 'iot'],
  thesis: ['lorawan', 'ms', 'research', 'pieas'],
  fyp: ['final year', 'project', 'social network'],
  hamah: ['hamah', 'creative', 'react'],
  dotnet: ['net', 'core', 'pta', 'csharp', 'framework', 'microsoft'],
  dot: ['net', 'dotnet', 'core', 'pta'],
  net: ['dotnet', 'core', 'pta', 'csharp', 'framework'],
  csharp: ['net', 'dotnet', 'core'],
  pta: ['pakistan', 'telecommunication', 'authority', 'whatsapp', 'blocking', 'meta'],
  telecommunication: ['pta', 'pakistan', 'authority'],
  whatsapp: ['pta', 'blocking', 'meta', 'batch'],
  meta: ['pta', 'whatsapp', 'blocking', 'facebook'],
  employee: ['management', 'system', 'pta', 'sample'],
  blocking: ['whatsapp', 'pta', 'meta'],
  approver: ['pta', 'user', 'admin', 'approval'],
  identity: ['microsoft', 'authentication', '2fa', 'pta'],
};

export function expandQueryTokens(tokens) {
  const expanded = new Set(tokens);

  for (const token of tokens) {
    const extras = SYNONYMS[token];
    if (extras) {
      extras.forEach((w) => expanded.add(w));
    }
  }

  return [...expanded];
}
