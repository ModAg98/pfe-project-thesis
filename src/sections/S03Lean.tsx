import { motion } from 'framer-motion'
import { Blobs } from '../components/Media'
import { EASE, Reveal, Section, Term, TitleBlock } from '../components/primitives'
import { leanPrinciples } from '../data/presentation'

export function S03Lean({ step }: { step: number; active: boolean }) {
  return (
    <Section>
      <Blobs variant="c" />
      <div className="relative">
        <TitleBlock
          kicker="01 · Context"
          title="It starts with Lean"
          lead={
            <>
              A way of working that creates more value with fewer resources, by removing waste and{' '}
              <Term>solving problems where they happen</Term>.
            </>
          }
        />
      </div>

      <div className="relative my-auto">
        <div className="relative flex items-start justify-between">
          <motion.div
            className="absolute left-[9%] right-[9%] top-[47px] h-[3px] origin-left rounded-full bg-gradient-to-r from-brand-blue via-brand-violet to-brand-sky"
            initial={false}
            animate={{ scaleX: step >= 1 ? 1 : 0 }}
            transition={{ duration: 1, ease: EASE }}
          />
          {leanPrinciples.map((p, i) => (
            <motion.div
              key={p.n}
              initial={false}
              animate={{ opacity: step >= 1 ? 1 : 0.15, y: step >= 1 ? 0 : 12 }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: EASE }}
              className="relative flex w-[19%] flex-col items-center text-center"
            >
              <div className="flex h-[94px] w-[94px] items-center justify-center rounded-full border-[4px] border-white bg-brand-grad text-[26px] font-extrabold text-white shadow-card">
                {p.n}
              </div>
              <div className="mt-4 text-[18px] font-bold leading-tight text-brand-navy">{p.label}</div>
            </motion.div>
          ))}
        </div>

        <Reveal when={step >= 2} className="mt-12">
          <div className="grid grid-cols-3 gap-5">
            {[
              { t: 'Gemba', d: 'The real place, where the work actually happens.', c: 'bg-brand-blue' },
              { t: 'Gemba Walk', d: 'Go and see the problem yourself, with the team.', c: 'bg-brand-violet' },
              { t: 'Continuous improvement', d: 'Every problem solved becomes a standard.', c: 'bg-brand-sky' },
            ].map((c) => (
              <div key={c.t} className="card flex items-start gap-4 p-6">
                <span className={`mt-1 h-11 w-[5px] shrink-0 rounded-full ${c.c}`} />
                <div>
                  <div className="text-[19px] font-extrabold text-brand-navy">{c.t}</div>
                  <div className="mt-1.5 text-[14px] leading-snug text-ink-500">{c.d}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
