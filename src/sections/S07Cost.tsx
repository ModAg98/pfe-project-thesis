import { motion } from 'framer-motion'
import { Blobs } from '../components/Media'
import { EASE, Reveal, Section, TitleBlock } from '../components/primitives'
import { assets } from '../data/presentation'

const costs = [
  { icon: '⏱', title: 'Time lost', body: 'Scrolling a board of thousands of cards, one by one.', c: 'bg-brand-blue' },
  { icon: '🔁', title: 'Solved twice', body: 'Two teams pay for the same investigation.', c: 'bg-brand-violet' },
  { icon: '📦', title: 'Knowledge buried', body: 'Proven solutions sit in issues nobody reopens.', c: 'bg-brand-sky' },
  { icon: '🌫', title: 'No overview', body: 'Recurring problems stay invisible.', c: 'bg-brand-purple' },
]

export function S07Cost({ step }: { step: number; active: boolean }) {
  return (
    <Section tone="soft">
      <Blobs variant="b" />
      <div className="relative">
        <TitleBlock kicker="02 — The problem" title="What manual search really costs" size="md" />
      </div>

      <div className="relative mt-5 grid min-h-0 flex-1 grid-cols-[1fr_1.02fr] items-center gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="overflow-hidden rounded-3xl shadow-lift"
        >
          <img src={assets.buriedGif} alt="Buried under archived issues" className="w-full object-cover" />
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {costs.map((c, i) => (
            <motion.div
              key={c.title}
              initial={false}
              animate={{ opacity: step >= 1 ? 1 : 0.12, y: step >= 1 ? 0 : 16 }}
              transition={{ duration: 0.45, delay: i * 0.09, ease: EASE }}
              className="card p-6"
            >
              <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl text-[20px] ${c.c}`}>
                {c.icon}
              </div>
              <div className="text-[20px] font-extrabold leading-tight text-brand-navy">{c.title}</div>
              <div className="mt-1.5 text-[14px] leading-snug text-ink-500">{c.body}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <Reveal when={step >= 2} className="relative mt-7">
        <div className="rounded-2xl bg-brand-grad px-9 py-7 text-white shadow-pop">
          <div className="text-[30px] font-extrabold leading-snug">
            The company is not short of knowledge. It is short of a way to reach it.
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
