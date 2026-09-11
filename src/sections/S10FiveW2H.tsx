import { motion } from 'framer-motion'
import { Blobs } from '../components/Media'
import { EASE, Reveal, Section, Term, TitleBlock } from '../components/primitives'
import { fieldWeights, globalEmbeddingFields } from '../data/presentation'

const max = Math.max(...fieldWeights.map((f) => f.weight))
const kindLabel: Record<string, string> = { semantic: 'meaning', temporal: 'dates', numeric: 'quantities' }
const kindTone: Record<string, string> = {
  semantic: 'bg-brand-blue', temporal: 'bg-brand-violet', numeric: 'bg-brand-sky',
}

export function S10FiveW2H({ step }: { step: number; active: boolean }) {
  return (
    <Section>
      <Blobs variant="a" />
      <div className="relative">
        <TitleBlock
          kicker="04 · What makes it different"
          title="A problem is not a paragraph. It has structure."
          lead={
            <>
              Most tools flatten an issue into one block of text. We compare it <Term>field by field</Term>, the way
              a Lean practitioner actually judges two problems.
            </>
          }
          size="md"
        />
      </div>

      <div className="relative mt-6 grid min-h-0 flex-1 grid-cols-[1.1fr_1fr] gap-12">
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <div className="kicker">How much each field counts</div>
            <div className="text-[12px] font-semibold text-ink-400">tunable per deployment</div>
          </div>
          <div className="space-y-2">
            {fieldWeights.map((f, i) => (
              <motion.div
                key={f.key}
                initial={false}
                animate={{ opacity: step >= 1 ? 1 : 0.12, x: step >= 1 ? 0 : -10 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                className="flex items-center gap-4"
              >
                <span className="w-[104px] shrink-0 text-right text-[15px] font-bold text-brand-navy">
                  {f.label}
                </span>
                <div className="h-6 flex-1 overflow-hidden rounded-lg bg-surface-soft">
                  <motion.div
                    className={`h-full rounded-lg ${i === 0 ? 'bg-brand-grad' : 'bg-brand-blue/70'}`}
                    initial={{ width: 0 }}
                    animate={{ width: step >= 1 ? `${(f.weight / max) * 100}%` : 0 }}
                    transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: EASE }}
                  />
                </div>
                <span className="w-[44px] shrink-0 font-mono text-[14px] font-bold text-ink-500">
                  {f.weight.toFixed(2)}
                </span>
              </motion.div>
            ))}
          </div>

          <Reveal when={step >= 2} className="mt-5">
            <div className="flex flex-wrap gap-2.5">
              {(['semantic', 'temporal', 'numeric'] as const).map((k) => (
                <span key={k} className={`inline-flex items-center rounded-full px-4 py-2 text-[13px] font-bold text-white ${kindTone[k]}`}>
                  compared by {kindLabel[k]}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center gap-4">
          <Reveal when={step >= 1}>
            <div className="card p-7">
              <div className="text-[22px] font-extrabold text-brand-navy">What dominates. Who barely counts.</div>
              <p className="mt-2.5 text-[16px] leading-relaxed text-ink-500">
                The same failure spotted by two different operators is still{' '}
                <span className="font-bold text-ink-700">one failure</span>. So <em>Who</em> weighs 0.06, while{' '}
                <em>What</em> carries a third of the score.
              </p>
            </div>
          </Reveal>

          <Reveal when={step >= 2}>
            <div className="card p-7">
              <div className="text-[22px] font-extrabold text-brand-navy">Dates and counts are not text.</div>
              <p className="mt-2.5 text-[16px] leading-relaxed text-ink-500">
                Two dates a day apart look nothing alike as strings. <em>When</em> decays over time,{' '}
                <em>How many</em> compares as a ratio: 1 000 vs 1 002 is a near-match, 10 vs 12 is not.
              </p>
            </div>
          </Reveal>

          <Reveal when={step >= 3}>
            <div className="rounded-2xl bg-brand-grad px-7 py-6 text-white shadow-pop">
              <div className="text-[13px] font-bold uppercase tracking-armor text-white/75">Result</div>
              <div className="mt-2 text-[21px] font-extrabold leading-snug">
                The system can say <span className="underline decoration-white/40">why</span> two problems match,
                field by field, not just hand over a number.
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal when={step >= 4} className="relative mt-5">
        <div className="rounded-2xl border-2 border-brand-violet/25 bg-brand-violet/[0.06] px-8 py-4">
          <span className="text-[16px] leading-relaxed text-ink-700">
            <span className="font-extrabold text-brand-violet">Found by testing:</span> putting all nine fields into
            one vector made well-documented issues rank <em>below</em> sparse ones. The overall vector now carries
            only{' '}
            {globalEmbeddingFields.map((f, i) => (
              <span key={f} className="font-bold text-brand-navy">
                {f}{i < globalEmbeddingFields.length - 1 ? ' + ' : ''}
              </span>
            ))}
            .
          </span>
        </div>
      </Reveal>
    </Section>
  )
}
