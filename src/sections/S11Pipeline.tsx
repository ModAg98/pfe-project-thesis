import { motion } from 'framer-motion'
import { Blobs } from '../components/Media'
import { EASE, Reveal, Section, Term, TitleBlock } from '../components/primitives'

/** Report §3.5 (data flows), §3.4 (embeddings & scoring), §4.7 (generation). */
const stages = [
  {
    n: '01',
    name: 'Ingest',
    tone: 'blue',
    lines: [
      'Issues arrive by API call, or by a live pull of iObeya VMS',
      'A mapper translates VMS enums into the internal 5W2H schema',
      'Text is cleaned, but the % in “15% defect rate” is kept',
    ],
    shape: 'VMS element → { what, why, how, where, who, when, how_many … }',
    stat: { v: '1 000', l: 'issues indexed for the evaluation' },
  },
  {
    n: '02',
    name: 'Embed',
    tone: 'violet',
    lines: [
      'all-MiniLM-L6-v2: Sentence-BERT, 384 dimensions, on CPU, offline',
      '8 vectors per issue: one per textual field + one global (What + Root cause + Solution)',
      'Normalised to unit length, upserted into pgvector with the row',
    ],
    shape: '8 × vector(384),  ‖v‖ = 1',
    stat: { v: '12 KB', l: 'per issue, all eight vectors' },
  },
  {
    n: '03',
    name: 'Search',
    tone: 'sky',
    lines: [
      'The open issue’s 5W2H is embedded with the same model',
      'pgvector ranks every stored issue by cosine distance, an exact scan, 25–40 ms',
      'Field-weighted score, coverage penalty, kept if ≥ 0.45',
    ],
    shape: 'S = S_blend · (1 − 0.25 (1 − κ))  ≥  0.45',
    stat: { v: '25–40 ms', l: 'end to end, embedding included' },
  },
  {
    n: '04',
    name: 'Generate',
    tone: 'purple',
    lines: [
      'The retrieved issues become the only source of what is asserted',
      'Code consolidates causes, solutions and actions; an optional LLM only rephrases',
      'Every statement is checked against its sources and reported as a confidence',
    ],
    shape: 'top-k issues → summary + action plan',
    stat: { v: 'No API key', l: 'a model only improves the wording' },
  },
]

const tones: Record<string, { bg: string; text: string; ring: string; soft: string }> = {
  blue: { bg: 'bg-brand-blue', text: 'text-brand-blue', ring: 'ring-brand-blue/25', soft: 'bg-brand-blue/[0.07]' },
  violet: { bg: 'bg-brand-violet', text: 'text-brand-violet', ring: 'ring-brand-violet/25', soft: 'bg-brand-violet/[0.07]' },
  sky: { bg: 'bg-brand-sky', text: 'text-[#2E90CC]', ring: 'ring-brand-sky/30', soft: 'bg-brand-sky/[0.12]' },
  purple: { bg: 'bg-brand-purple', text: 'text-brand-purple', ring: 'ring-brand-purple/25', soft: 'bg-brand-purple/[0.07]' },
}

export function S11Pipeline({ step }: { step: number; active: boolean }) {
  return (
    <Section>
      <Blobs variant="c" />
      <div className="relative">
        <TitleBlock
          kicker="03 · The solution"
          title="From a reported issue to a proposed plan"
          lead={
            <>
              History goes in <Term>once</Term>. Every search comes back out with an answer, in four stages.
            </>
          }
          size="md"
        />
      </div>

      {/* rail */}
      <div className="relative mt-7 flex items-center">
        {stages.map((s, i) => {
          const on = step >= i + 1
          const active = step === i + 1
          const tone = tones[s.tone]
          return (
            <div key={s.n} className="flex flex-1 items-center">
              <motion.div
                initial={false}
                animate={{ opacity: on ? 1 : 0.35, scale: active ? 1.06 : 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={`flex items-center gap-3 rounded-full py-2 pl-2 pr-5 ${on ? `${tone.bg} text-white shadow-card` : 'bg-surface-soft text-ink-500'}`}
              >
                <span className={`flex h-9 w-9 items-center justify-center rounded-full text-[14px] font-extrabold ${on ? 'bg-white/20' : 'bg-white text-ink-400'}`}>
                  {s.n}
                </span>
                <span className="text-[18px] font-extrabold">{s.name}</span>
              </motion.div>
              {i < stages.length - 1 && (
                <div className="relative mx-3 h-[3px] flex-1 overflow-hidden rounded-full bg-surface-line">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-blue to-brand-violet"
                    initial={false}
                    animate={{ width: step >= i + 2 ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* detail columns */}
      <div className="relative mt-6 grid min-h-0 flex-1 grid-cols-4 gap-4">
        {stages.map((s, i) => {
          const on = step >= i + 1
          const active = step === i + 1
          const tone = tones[s.tone]
          return (
            <motion.div
              key={s.n}
              initial={false}
              animate={{ opacity: on ? 1 : 0.15, y: on ? 0 : 14 }}
              transition={{ duration: 0.45, ease: EASE }}
              className={`card flex flex-col p-5 ${active ? `ring-4 ${tone.ring}` : ''}`}
            >
              <div className="space-y-2.5">
                {s.lines.map((l, j) => (
                  <motion.div
                    key={l}
                    initial={false}
                    animate={{ opacity: on ? 1 : 0, x: on ? 0 : -6 }}
                    transition={{ duration: 0.35, delay: j * 0.08, ease: EASE }}
                    className="flex gap-2.5 text-[15px] leading-snug text-ink-700"
                  >
                    <span className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${tone.bg}`} />
                    {l}
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={false}
                animate={{ opacity: on ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-auto pt-4"
              >
                <div className={`text-[34px] font-extrabold leading-none tracking-tight ${tone.text}`}>{s.stat.v}</div>
                <div className="mt-1.5 text-[13px] font-medium text-ink-500">{s.stat.l}</div>
              </motion.div>
              <div className={`mt-4 rounded-xl px-3 py-2 pt-3 font-mono text-[11.5px] font-semibold leading-snug ${tone.soft} ${tone.text}`}>
                {s.shape}
              </div>
            </motion.div>
          )
        })}
      </div>

      <Reveal when={step >= 4} className="relative mt-5">
        <div className="rounded-2xl bg-brand-grad px-8 py-5 text-white shadow-pop">
          <div className="text-[24px] font-extrabold leading-snug">
            Retrieval is the core. Generation only speaks for what retrieval found.
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
