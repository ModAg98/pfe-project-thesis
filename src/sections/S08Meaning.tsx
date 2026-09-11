import { motion } from 'framer-motion'
import { Blobs } from '../components/Media'
import { Check, EASE, Reveal, Section, TitleBlock } from '../components/primitives'

const NEW_ISSUE = 'Scratches on machined parts after the tool change'
const OLD_ISSUE = 'Surface defects on milled components'

function Converge({ active }: { active: boolean }) {
  const left = [[52, 34], [30, 64], [70, 86], [40, 108]]
  const right = [[318, 40], [340, 70], [300, 96], [330, 116]]
  return (
    <svg viewBox="0 0 380 168" className="w-full" fill="none" aria-hidden>
      {left.map(([x, y], i) => (
        <motion.circle
          key={`l${i}`}
          r="6"
          fill="#2342CE"
          initial={false}
          animate={{ cx: active ? 158 + (i % 2) * 12 : x, cy: active ? 58 + i * 13 : y }}
          transition={{ duration: 1.1, delay: 0.1 + i * 0.07, ease: EASE }}
        />
      ))}
      {right.map(([x, y], i) => (
        <motion.circle
          key={`r${i}`}
          r="6"
          fill="#9A66D9"
          initial={false}
          animate={{ cx: active ? 206 - (i % 2) * 12 : x, cy: active ? 58 + i * 13 : y }}
          transition={{ duration: 1.1, delay: 0.1 + i * 0.07, ease: EASE }}
        />
      ))}
      <motion.line
        x1="160" x2="204" y1="88" y2="88"
        stroke="#5C6580" strokeWidth="2" strokeDasharray="4 4"
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 1 }}
      />
      <motion.text
        x="182" y="150" textAnchor="middle"
        className="fill-ink-500 text-[13px] font-semibold"
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 1.1 }}
      >
        close together = same meaning
      </motion.text>
    </svg>
  )
}

export function S08Meaning({ step }: { step: number; active: boolean }) {
  return (
    <Section>
      <Blobs variant="a" />
      <div className="relative">
        <TitleBlock kicker="03 · The idea" title="What if the system searched by meaning?" size="md" />
      </div>

      <div className="relative mt-7 grid grid-cols-2 gap-6">
        {[
          { k: 'New issue', t: NEW_ISSUE, c: 'border-brand-blue/30 bg-brand-blue/[0.05]', dot: 'bg-brand-blue' },
          { k: 'Solved 18 months ago', t: OLD_ISSUE, c: 'border-brand-violet/30 bg-brand-violet/[0.06]', dot: 'bg-brand-violet' },
        ].map((b) => (
          <motion.div
            key={b.k}
            initial={false}
            animate={{ opacity: step >= 2 ? 0.55 : 1, scale: step >= 2 ? 0.98 : 1 }}
            transition={{ duration: 0.45, ease: EASE }}
            className={`rounded-2xl border-2 p-7 ${b.c}`}
          >
            <div className="mb-3 flex items-center gap-2.5">
              <span className={`h-2.5 w-2.5 rounded-full ${b.dot}`} />
              <span className="text-[12px] font-bold uppercase tracking-armor text-ink-500">{b.k}</span>
            </div>
            <div className="text-[24px] font-bold leading-snug text-brand-navy">“{b.t}”</div>
          </motion.div>
        ))}
      </div>

      <Reveal when={step >= 1} className="mt-4">
        <div className="rounded-2xl border-2 border-dashed border-ink-300 bg-surface-soft px-7 py-3.5 text-center">
          <span className="text-[19px] font-bold text-ink-700">Not one word in common. The same problem.</span>
        </div>
      </Reveal>

      <div className="relative mt-auto grid grid-cols-[1fr_380px] items-end gap-12">
        <div>
          <Reveal when={step >= 1}>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center gap-4 rounded-2xl border-2 border-signal-bad/25 bg-signal-bad/[0.05] px-6 py-5">
                <Check ok={false} />
                <div>
                  <div className="text-[18px] font-extrabold text-brand-navy">Keyword search</div>
                  <div className="text-[14px] text-ink-500">Finds nothing unless you guess the words</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border-2 border-signal-good/30 bg-signal-good/[0.06] px-6 py-5">
                <Check ok />
                <div>
                  <div className="text-[18px] font-extrabold text-brand-navy">Semantic search</div>
                  <div className="text-[14px] text-ink-500">Compares meaning, not vocabulary</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal when={step >= 3} className="mt-6">
            <div className="flex items-center gap-3">
              {['Text', 'Meaning vector', 'Compare', 'Ranked matches'].map((s, i, arr) => (
                <div key={s} className="flex items-center gap-3">
                  <motion.span
                    initial={false}
                    animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 8 }}
                    transition={{ duration: 0.4, delay: i * 0.12 }}
                    className="rounded-xl bg-brand-blue/[0.09] px-5 py-3 text-[15px] font-bold text-brand-blue"
                  >
                    {s}
                  </motion.span>
                  {i < arr.length - 1 && <span className="text-[16px] font-bold text-brand-violet">→</span>}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal when={step >= 2}>
          <div className="card p-6">
            <div className="kicker mb-1">Meaning space</div>
            <Converge active={step >= 2} />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
