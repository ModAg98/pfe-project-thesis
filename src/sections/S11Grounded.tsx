import { motion } from 'framer-motion'
import { Blobs } from '../components/Media'
import { Check, EASE, Reveal, Section, TitleBlock } from '../components/primitives'

const may = ['Summarise what was found', 'Rephrase it clearly', 'Explain the pattern']
const mayNot = ['Invent a corrective action', 'Decide what should be done', 'Make up historical evidence']

export function S11Grounded({ step }: { step: number; active: boolean }) {
  return (
    <Section tone="soft">
      <Blobs variant="b" />
      <div className="relative">
        <TitleBlock
          kicker="04 · What makes it different"
          title="The AI writes. It never decides."
          lead="Every proposed action already exists on a retrieved issue, and says which one."
          size="md"
        />
      </div>

      <div className="relative mt-6 grid min-h-0 flex-1 grid-cols-2 gap-12">
        <div className="flex flex-col justify-center gap-2">
          {[
            { t: 'Retrieved historical issues', d: 'Root causes · solutions · actions', c: 'bg-brand-blue', on: true },
            { t: 'Consolidated by code', d: 'Merged, ordered, de-duplicated. Deterministic', c: 'bg-brand-violet', on: step >= 1 },
            { t: 'Proposed action plan', d: 'Created as real iObeya Actions in one click', c: 'bg-brand-sky', on: step >= 1 },
          ].map((b, i) => (
            <div key={b.t}>
              {i > 0 && (
                <div className="flex h-6 justify-center">
                  <motion.div
                    className="w-[3px] origin-top rounded-full bg-brand-violet/40"
                    initial={false}
                    animate={{ scaleY: b.on ? 1 : 0 }}
                    transition={{ duration: 0.35 }}
                  />
                </div>
              )}
              <motion.div
                initial={false}
                animate={{ opacity: b.on ? 1 : 0.15, y: b.on ? 0 : 10 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="card flex items-center gap-5 p-6"
              >
                <span className={`h-12 w-1.5 shrink-0 rounded-full ${b.c}`} />
                <div>
                  <div className="text-[20px] font-extrabold text-brand-navy">{b.t}</div>
                  <div className="mt-1 text-[14px] text-ink-500">{b.d}</div>
                </div>
              </motion.div>
            </div>
          ))}

          <Reveal when={step >= 2} className="mt-3">
            <div className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-signal-warn/45 bg-signal-warn/[0.08] px-6 py-4">
              <span className="text-[22px]">✨</span>
              <div>
                <div className="text-[17px] font-extrabold text-brand-navy">Optional language model</div>
                <div className="text-[14px] text-ink-500">Improves the wording. Nothing else.</div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center gap-4">
          <Reveal when={step >= 2}>
            <div className="rounded-2xl border-2 border-signal-good/30 bg-signal-good/[0.06] p-7">
              <div className="mb-4 text-[13px] font-bold uppercase tracking-armor text-signal-good">The AI may</div>
              <div className="space-y-3">
                {may.map((m, i) => (
                  <motion.div
                    key={m}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                    className="flex items-center gap-3 text-[18px] font-semibold text-brand-navy"
                  >
                    <Check ok /> {m}
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal when={step >= 3}>
            <div className="rounded-2xl border-2 border-signal-bad/30 bg-signal-bad/[0.06] p-7">
              <div className="mb-4 text-[13px] font-bold uppercase tracking-armor text-signal-bad">The AI may not</div>
              <div className="space-y-3">
                {mayNot.map((m, i) => (
                  <motion.div
                    key={m}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                    className="flex items-center gap-3 text-[18px] font-semibold text-brand-navy"
                  >
                    <Check ok={false} /> {m}
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal when={step >= 4} className="relative mt-6">
        <div className="rounded-2xl bg-brand-grad px-9 py-6 text-white shadow-pop">
          <div className="text-[28px] font-extrabold leading-snug">
            It runs with no paid API and no internet. The expert always makes the call.
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
