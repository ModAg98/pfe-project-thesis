import { motion } from 'framer-motion'
import { Blobs } from '../components/Media'
import { EASE, Reveal, Section, Stat, TitleBlock } from '../components/primitives'
import { evaluation, limitations } from '../data/presentation'

const pct = (v: number) => `${(v * 100).toFixed(1)}`

export function S12Results({ step }: { step: number; active: boolean }) {
  const maxBar = 0.16
  const bars = [
    { label: 'Our semantic engine', value: evaluation.degradation.semantic, tone: 'bg-signal-good', text: 'text-signal-good' },
    { label: 'Keyword search', value: evaluation.degradation.lexical, tone: 'bg-signal-bad', text: 'text-signal-bad' },
  ]

  return (
    <Section>
      <Blobs variant="c" />
      <div className="relative">
        <TitleBlock kicker="05 · Results" title="Does it actually work?" size="md" />
      </div>

      <div className="relative mt-5 grid grid-cols-4 gap-4">
        {[
          { v: evaluation.indexedIssues.toLocaleString('en-US'), l: 'issues indexed', t: 'brand' as const },
          { v: evaluation.queries, l: 'queries evaluated', t: 'violet' as const },
          { v: pct(evaluation.baseline.precisionAt5), u: '%', l: 'Precision@5', t: 'brand' as const },
          { v: pct(evaluation.baseline.recallAt5), u: '%', l: 'Recall@5', t: 'violet' as const },
        ].map((m, i) => (
          <motion.div
            key={m.l}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
          >
            <Stat value={m.v} unit={m.u} label={m.l} tone={m.t} />
          </motion.div>
        ))}
      </div>

      <div className="relative mt-6 grid min-h-0 flex-1 grid-cols-[1.1fr_1fr] gap-10">
        <Reveal when={step >= 1}>
          <div className="card flex h-full flex-col p-8">
            <div className="text-[22px] font-extrabold text-brand-navy">
              Now ask the same questions in different words
            </div>
            <div className="mt-1.5 text-[15px] text-ink-500">
              The 207 queries, reworded with industry synonyms. How much quality is lost?
            </div>

            <div className="mt-8 space-y-7">
              {bars.map((b, i) => (
                <div key={b.label}>
                  <div className="mb-2.5 flex items-baseline justify-between">
                    <span className="text-[18px] font-bold text-brand-navy">{b.label}</span>
                    <span className={`text-[32px] font-extrabold leading-none ${b.text}`}>
                      −{(b.value * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full bg-surface-soft">
                    <motion.div
                      className={`h-full rounded-full ${b.tone}`}
                      initial={{ width: 0 }}
                      animate={{ width: step >= 1 ? `${(b.value / maxBar) * 100}%` : 0 }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.2, ease: EASE }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Reveal when={step >= 2} className="mt-auto pt-7">
              <div className="rounded-2xl bg-brand-grad px-7 py-5 text-white">
                <div className="text-[21px] font-extrabold leading-snug">
                  People never reuse the exact words. That gap is the whole point.
                </div>
              </div>
            </Reveal>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4">
          <Reveal when={step >= 1}>
            <div className="card flex items-center gap-6 p-7">
              <div>
                <div className="text-[42px] font-extrabold leading-none text-brand-blue">
                  {evaluation.latencyMs.min}–{evaluation.latencyMs.max}
                  <span className="text-[22px]"> ms</span>
                </div>
                <div className="mt-2 text-[14px] font-medium leading-snug text-ink-500">
                  to search the whole history
                </div>
              </div>
              <div className="ml-auto h-16 w-px bg-surface-line" />
              <div>
                <div className="text-[42px] font-extrabold leading-none text-brand-violet">
                  {evaluation.unitTests}
                </div>
                <div className="mt-2 text-[14px] font-medium text-ink-500">automated tests</div>
              </div>
            </div>
          </Reveal>

          <Reveal when={step >= 3}>
            <div className="rounded-2xl border-2 border-signal-warn/35 bg-signal-warn/[0.07] p-7">
              <div className="mb-3.5 text-[13px] font-bold uppercase tracking-armor text-[#B9710F]">
                Where these numbers stop
              </div>
              <div className="space-y-2.5">
                {limitations.map((l) => (
                  <div key={l} className="flex gap-3 text-[15px] leading-snug text-ink-700">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal-warn" />
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
