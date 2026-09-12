/**
 * ============================================================================
 *  EDIT EVERYTHING HERE: names, assets, numbers, wording.
 *  Every figure below comes from the PFE report; nothing is invented.
 * ============================================================================
 */

export const project = {
  title: 'Intelligent Similarity Search System',
  subtitle: 'for the Gemba Walk Assistant',
  author: 'Mohamed Mortadha Agoubi',
  company: 'iObeya',
  degree: 'Engineering in Computer Science, Networking and Multimedia',
  specialty: 'Information Systems and Software Engineering',
  institution: 'International Private Polytechnic School of Tunis',
  academicYear: '2025 / 2026',
}

export const supervisors = [
  { role: 'Academic Supervisor', name: 'Ms. Fatma MOALLA' },
  { role: 'Industrial Supervisor', name: 'Mr. Mohamed MELKI' },
]

export const jury = [
  { role: 'President', name: 'Mr. Haithem GHAZOUANI' },
  { role: 'Reviewer', name: 'Ms. Imen MERDASSI' },
]

/** Assets live in /public/assets. Swap a path and the slide updates. */
export const assets = {
  iobeyaLogo: '/assets/iobeya-logo.png' as string | null,
  gembaLogo: '/assets/gemba-logo.jpg' as string | null,
  schoolLogo: '/assets/school-logo.png' as string | null, // drop the Polytech logo in and point here
  problemVideo: '/assets/problem-video.mp4',
  buriedGif: '/assets/buried-in-issues.gif',
  gembaScene: '/assets/gemba-walk-scene.png',
  boards: {
    physical1: '/assets/board-physical-1.png',
    physical2: '/assets/board-physical-2.png',
    iobeya1: '/assets/board-iobeya-1.png',
    iobeya2: '/assets/board-iobeya-2.png',
  },
  clips: {
    capture: '/assets/clip-1-capture.mp4',
    search: '/assets/clip-2-search.mp4',
    reuse: '/assets/clip-3-reuse.mp4',
    full: '/assets/full-demo.mp4',
  },
}

/** Client logos we have artwork for; the rest are shown as wordmarks. */
export const clientLogos = [
  { name: 'Sanofi', src: '/assets/client-sanofi.png' },
  { name: 'Air France', src: '/assets/client-airfrance.png' },
  { name: 'Renault', src: '/assets/client-renault.png' },
]

/** Report, Table 4.2: every technology, its version and its role. Grouped by the layer it lives in. */
export type Tech = { name: string; version?: string; role: string; src: string }
export const techStack: { group: string; items: Tech[] }[] = [
  {
    group: 'AI similarity service',
    items: [
      { name: 'Python', version: '3.10', role: 'Language of the AI microservice', src: '/assets/tech/python.png' },
      { name: 'Flask', version: '3.0', role: 'REST API of the microservice', src: '/assets/tech/flask.png' },
      { name: 'sentence-transformers', version: 'all-MiniLM-L6-v2', role: 'Default embedding model: free, offline, on CPU', src: '/assets/tech/huggingface.png' },
      { name: 'OpenAI API', version: 'optional', role: 'Higher-quality embeddings, opt-in only', src: '/assets/tech/openai.png' },
    ],
  },
  {
    group: 'Data',
    items: [
      { name: 'PostgreSQL + pgvector', version: '16', role: 'Stores each issue and its vectors in one row', src: '/assets/tech/postgresql.png' },
      { name: 'Docker Compose', role: 'Runs the database in an isolated container', src: '/assets/tech/docker.png' },
    ],
  },
  {
    group: 'iObeya integration',
    items: [
      { name: 'Vue.js', version: '3', role: 'NextGen front end, hosts the similar-issues panel', src: '/assets/tech/vuejs.png' },
      { name: 'Node.js', role: 'Existing NextGen backend', src: '/assets/tech/nodejs.png' },
    ],
  },
  {
    group: 'Tooling',
    items: [
      { name: 'Git', role: 'Version control', src: '/assets/tech/git.png' },
      { name: 'Visual Studio Code', role: 'Main code editor', src: '/assets/tech/vscode.png' },
    ],
  },
]

/* ========================== CONTEXT ========================== */

export const leanPrinciples = [
  { n: '01', label: 'Identify value' },
  { n: '02', label: 'Map the value stream' },
  { n: '03', label: 'Create flow' },
  { n: '04', label: 'Establish pull' },
  { n: '05', label: 'Seek perfection' },
]

export const clients = ['Airbus', 'Thales', 'Volvo']

export const fiveW2H = [
  { key: 'what', label: 'What', q: 'What happened?' },
  { key: 'who', label: 'Who', q: 'Who is involved?' },
  { key: 'where', label: 'Where', q: 'Where did it happen?' },
  { key: 'when', label: 'When', q: 'When did it happen?' },
  { key: 'how', label: 'How', q: 'How did it occur?' },
  { key: 'howMany', label: 'How many', q: 'How much / how often?' },
  { key: 'why', label: 'Why', q: 'Why does it matter?' },
]

export const resolutionStages = [
  { label: 'Statement', detail: 'The problem, described with 5W2H' },
  { label: 'Secure', detail: 'Contain the immediate impact' },
  { label: 'Root cause', detail: 'Why it really happened' },
  { label: 'Solution', detail: 'The corrective action plan' },
  { label: 'Standardize', detail: 'Share the best practice' },
]

/* ========================== SCORING ========================== */

/** Real weights from the implementation (report, Table 3.3). Sum = 1.00 */
export type FieldWeight = {
  key: string
  label: string
  weight: number
  kind: 'semantic' | 'temporal' | 'numeric'
  why: string
}

export const fieldWeights: FieldWeight[] = [
  { key: 'what', label: 'What', weight: 0.32, kind: 'semantic', why: 'The nature of the problem: the primary discriminator' },
  { key: 'why', label: 'Why / Impact', weight: 0.2, kind: 'semantic', why: 'Same consequence usually means the same problem' },
  { key: 'how', label: 'How', weight: 0.15, kind: 'semantic', why: 'How the failure showed up or was detected' },
  { key: 'where', label: 'Where', weight: 0.1, kind: 'semantic', why: 'Same line or zone raises the odds of a shared cause' },
  { key: 'who', label: 'Who', weight: 0.06, kind: 'semantic', why: 'Deliberately low: the observer does not define the problem' },
  { key: 'howMany', label: 'How many', weight: 0.05, kind: 'numeric', why: 'Compared as a ratio, not a difference' },
  { key: 'rootCause', label: 'Root cause', weight: 0.05, kind: 'semantic', why: 'Known only after analysis, so rarely in a query' },
  { key: 'when', label: 'When', weight: 0.04, kind: 'temporal', why: 'Time proximity, not text proximity' },
  { key: 'frequency', label: 'Frequency', weight: 0.03, kind: 'semantic', why: 'One-off incident versus recurring pattern' },
]

export const ALPHA = 0.75
export const COVERAGE_PENALTY = 0.25
export const globalEmbeddingFields = ['What', 'Root cause', 'Solution']

/* ========================== RESULTS ========================== */

export const evaluation = {
  indexedIssues: 1000,
  queries: 207,
  unitTests: 48,
  latencyMs: { min: 25, max: 40 },
  baseline: { precisionAt5: 0.598, recallAt5: 0.655 },
  reformulated: { precisionAt5: 0.597, recallAt5: 0.654 },
  degradation: { semantic: 0.002, lexical: 0.14 },
}

export const limitations = [
  'The evaluation corpus is largely synthetic.',
  'It comes from 1 000 issues in a single room.',
  'Relevance was derived from root cause + solution, not expert annotation.',
  'Synonyms are a controlled proxy for real user rewording.',
]

export const futureWork = [
  { title: 'Real-world corpus', detail: 'Evaluate on production history across several rooms and sites.' },
  { title: 'Expert-annotated relevance', detail: 'Replace derived ground truth with Lean-practitioner judgement.' },
  { title: 'Hybrid retrieval', detail: 'Add keyword matching to catch part codes and machine IDs.' },
  { title: 'Scale-up indexing', detail: 'Re-evaluate approximate vector indexing, measuring recall first.' },
]
