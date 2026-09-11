import { motion } from 'framer-motion'
import { Blobs } from '../components/Media'
import { EASE, Reveal, Section, TitleBlock } from '../components/primitives'

/** Report, Figure 3.1: three layers, all delivered, plus the external system they integrate with. */
const layers = [
  {
    key: 'ui',
    name: 'Search Interface',
    tech: 'Vue.js 3 · iObeya NextGen',
    sub: 'Side panel of the issue editor, in both micro-frontends',
    tone: 'sky',
    card: {
      t: 'Where the user is',
      d: 'A native side module of the iObeya issue editor. It reads the 5W2H of the issue already open and searches from it. The user retypes nothing.',
    },
  },
  {
    key: 'svc',
    name: 'AI Similarity Service',
    tech: 'Python 3.10 · Flask 3.0',
    sub: 'Embeddings · 5W2H scoring · RAG summary · REST API',
    tone: 'blue',
    card: {
      t: 'Where the intelligence is',
      d: 'A standalone microservice. It owns embedding generation, the field-weighted scoring, the generated summary, and four endpoints: ingest, search, summary, VMS sync.',
    },
  },
  {
    key: 'db',
    name: 'Vector Store',
    tech: 'PostgreSQL 16 + pgvector',
    sub: 'One row per issue: its 5W2H fields and its 8 vectors',
    tone: 'violet',
    card: {
      t: 'Where the history lives',
      d: 'The issue and its vectors sit in the same row, so one SQL query filters on category or criticality and ranks by meaning. No second data store to keep consistent.',
    },
  },
]

const tones: Record<string, { bar: string; ring: string; text: string; badge: string }> = {
  sky: { bar: 'bg-brand-sky', ring: 'ring-brand-sky/35', text: 'text-[#2E90CC]', badge: 'bg-brand-sky' },
  blue: { bar: 'bg-brand-blue', ring: 'ring-brand-blue/30', text: 'text-brand-blue', badge: 'bg-brand-blue' },
  violet: { bar: 'bg-brand-violet', ring: 'ring-brand-violet/30', text: 'text-brand-violet', badge: 'bg-brand-violet' },
}

const endpoints = ['/api/ingest', '/api/search', '/api/summary', '/api/vms/sync']

const decisions = [
  { t: 'A separate service', d: 'Python ML ecosystem; restart or re-index without redeploying iObeya' },
  { t: 'pgvector, not Pinecone', d: 'Vectors and metadata in one query, on infrastructure that already exists' },
  { t: 'Offline by default', d: 'all-MiniLM-L6-v2 on CPU, no API key. OpenAI is an opt-in upgrade' },
]

function Connector({ up, down, on }: { up: string; down: string; on: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: on ? 1 : 0.3 }}
      transition={{ duration: 0.35 }}
      className="flex h-9 items-center justify-center gap-4 font-mono text-[11px] font-semibold text-ink-400"
    >
      <span>{down} ↓</span>
      <span className="h-full w-px bg-ink-300" />
      <span>↑ {up}</span>
    </motion.div>
  )
}

export function S10Architecture({ step }: { step: number; active: boolean }) {
  return (
    <Section tone="soft">
      <Blobs variant="a" />
      <div className="relative">
        <TitleBlock
          kicker="03 · The solution"
          title="How it is built"
          lead="A standalone AI microservice, plugged into iObeya, not a rewrite of it."
          size="md"
        />
      </div>

      <div className="relative mt-6 grid min-h-0 flex-1 grid-cols-[1fr_440px] items-start gap-10">
        {/* --------------------------- layered diagram --------------------------- */}
        <div className="grid grid-cols-[1fr_120px_230px] items-center">
          {layers.map((l, i) => {
            const active = step === i + 1
            const tone = tones[l.tone]
            return (
              <div key={l.key} className="contents">
                {i > 0 && (
                  <div className="col-start-1">
                    <Connector
                      down={i === 1 ? '5W2H statement' : 'query vectors'}
                      up={i === 1 ? 'ranked results + summary' : 'candidates'}
                      on={step >= i}
                    />
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0, scale: active ? 1.02 : 1 }}
                  transition={{ duration: 0.45, delay: i * 0.12, ease: EASE }}
                  className={`card col-start-1 flex items-center gap-5 px-6 py-4 ${active ? `ring-4 ${tone.ring}` : ''}`}
                >
                  <span className={`h-14 w-1.5 shrink-0 rounded-full ${tone.bar}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[21px] font-extrabold text-brand-navy">{l.name}</span>
                      <span className={`font-mono text-[12px] font-semibold ${tone.text}`}>{l.tech}</span>
                    </div>
                    <div className="mt-0.5 text-[14px] text-ink-500">{l.sub}</div>
                    {l.key === 'svc' && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {endpoints.map((e) => (
                          <span key={e} className="rounded-md bg-brand-blue/[0.08] px-2 py-0.5 font-mono text-[11px] font-semibold text-brand-blue">
                            {e}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* iObeya VMS sits beside the service layer */}
                {l.key === 'svc' && (
                  <>
                    <motion.div
                      initial={false}
                      animate={{ opacity: step >= 2 ? 1 : 0.3 }}
                      transition={{ duration: 0.35 }}
                      className="flex flex-col items-center gap-1 font-mono text-[11px] font-semibold text-ink-400"
                    >
                      <span>read</span>
                      <span className="text-[18px] leading-none text-ink-300">⟷</span>
                      <span>write</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: 0.4, ease: EASE }}
                      className="rounded-2xl border-2 border-dashed border-ink-300 bg-white/70 px-5 py-4"
                    >
                      <div className="text-[11px] font-bold uppercase tracking-armor text-ink-400">External</div>
                      <div className="mt-1 text-[19px] font-extrabold text-brand-navy">iObeya VMS</div>
                      <div className="mt-1 text-[13px] leading-snug text-ink-500">
                        Read to index the history. Written to place new cards on a board.
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* --------------------------- explanation cards --------------------------- */}
        <div className="flex flex-col gap-3">
          {layers.map((l, i) => (
            <Reveal key={l.key} when={step >= i + 1}>
              <div className="card flex items-start gap-4 p-5">
                <span className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[13px] font-extrabold text-white ${tones[l.tone].badge}`}>
                  {i + 1}
                </span>
                <div>
                  <div className="text-[17px] font-extrabold text-brand-navy">{l.card.t}</div>
                  <div className="mt-1 text-[14px] leading-snug text-ink-500">{l.card.d}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* --------------------------- the three decisions --------------------------- */}
      <Reveal when={step >= 3} className="relative mt-5">
        <div className="grid grid-cols-3 gap-4">
          {decisions.map((d, i) => (
            <motion.div
              key={d.t}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 10 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
              className="rounded-2xl border-2 border-brand-violet/25 bg-brand-violet/[0.06] px-5 py-3.5"
            >
              <div className="text-[15px] font-extrabold text-brand-violet">{d.t}</div>
              <div className="mt-0.5 text-[13px] leading-snug text-ink-700">{d.d}</div>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
