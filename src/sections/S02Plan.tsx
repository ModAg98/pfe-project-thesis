import { motion } from 'framer-motion'
import { Blobs } from '../components/Media'
import { EASE, Section, TitleBlock } from '../components/primitives'

const plan = [
  { n: '01', label: 'Context', detail: 'Lean, Obeya, and where the data comes from', tone: 'blue' },
  { n: '02', label: 'The problem', detail: 'The knowledge exists — nobody can find it', tone: 'violet' },
  { n: '03', label: 'The solution', detail: 'Search by meaning, see it work', tone: 'sky' },
  { n: '04', label: 'What makes it different', detail: 'Built around Lean 5W2H, grounded AI', tone: 'violet' },
  { n: '05', label: 'Results', detail: 'What we measured, and what is next', tone: 'blue' },
]

const tones: Record<string, string> = {
  blue: 'from-brand-blue to-[#3A5BE0]',
  violet: 'from-brand-violet to-brand-purple',
  sky: 'from-brand-sky to-[#3E9FD8]',
}

export function S02Plan({ step }: { step: number; active: boolean }) {
  return (
    <Section tone="soft">
      <Blobs variant="b" />
      <div className="relative">
        <TitleBlock kicker="Agenda" title="From a factory problem to reusable knowledge" />
      </div>

      <div className="relative my-auto grid grid-cols-5 gap-5">
        {plan.map((p, i) => (
          <motion.div
            key={p.n}
            initial={false}
            animate={{
              opacity: step >= 1 || i === 0 ? 1 : 0.25,
              y: step >= 1 || i === 0 ? 0 : 14,
            }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
            className="flex flex-col"
          >
            <div
              className={`flex h-[86px] items-center justify-center rounded-2xl bg-gradient-to-br ${
                tones[p.tone]
              } text-[28px] font-extrabold text-white shadow-card`}
            >
              {p.n}
            </div>
            <div className="mt-4 text-[21px] font-extrabold leading-tight text-brand-navy">{p.label}</div>
            <div className="mt-2 text-[14px] leading-snug text-ink-500">{p.detail}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 14 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative mt-10 rounded-2xl bg-brand-grad px-9 py-6 text-white shadow-pop"
      >
        <div className="text-[26px] font-extrabold leading-snug">
          Every solved problem is an asset. Today it is filed away and forgotten.
        </div>
      </motion.div>
    </Section>
  )
}
