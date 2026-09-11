import { motion } from 'framer-motion'
import { Blobs } from '../components/Media'
import { EASE, Reveal, Section, TitleBlock } from '../components/primitives'
import { futureWork, techStack } from '../data/presentation'

const pillars = [
  { n: '01', t: 'Semantic', d: 'Finds the problem by meaning, even when nobody reused the same words.', c: 'bg-brand-blue' },
  { n: '02', t: 'Domain-aware', d: 'Built around Lean 5W2H — not a generic text search with an industrial badge.', c: 'bg-brand-violet' },
  { n: '03', t: 'Grounded', d: 'Returns solutions that were really applied, each traced to its source issue.', c: 'bg-brand-sky' },
]

export function S14Conclusion({ step }: { step: number; active: boolean }) {
  return (
    <Section>
      <Blobs variant="b" />
      <div className="relative">
        <TitleBlock kicker="05 — Conclusion" title="The knowledge already existed. Now it is reachable." size="md" />
      </div>

      <div className="relative mt-7 grid grid-cols-3 gap-6">
        {pillars.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
            className="card p-8"
          >
            <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-[17px] font-extrabold text-white ${p.c}`}>
              {p.n}
            </div>
            <div className="text-[30px] font-extrabold text-brand-navy">{p.t}</div>
            <div className="mt-3 text-[15px] leading-relaxed text-ink-500">{p.d}</div>
          </motion.div>
        ))}
      </div>

      <Reveal when={step >= 1} className="relative mt-auto">
        <div className="kicker mb-3">Where it goes next</div>
        <div className="grid grid-cols-4 gap-4">
          {futureWork.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
              className="rounded-2xl border-2 border-surface-line bg-surface-soft p-5"
            >
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 shrink-0 rounded-full bg-brand-violet" />
                <span className="text-[16px] font-extrabold leading-tight text-brand-navy">{f.title}</span>
              </div>
              <div className="mt-2 text-[13px] leading-snug text-ink-500">{f.detail}</div>
            </motion.div>
          ))}
        </div>
      </Reveal>

      <Reveal when={step >= 2} className="relative mt-5">
        <div className="mb-5 flex items-center gap-6">
          <span className="shrink-0 text-[12px] font-bold uppercase tracking-armor text-ink-400">Built with</span>
          <div className="flex flex-1 items-center justify-between gap-5 opacity-80">
            {techStack.map((t, i) => (
              <motion.img
                key={t.name}
                src={t.src}
                alt={t.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="h-[30px] w-auto object-contain"
              />
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-brand-grad px-9 py-6 text-white shadow-pop">
          <div className="text-[31px] font-extrabold leading-snug">
            Every problem a company solves should only have to be solved once.
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
