import { motion } from 'framer-motion'
import { Blobs } from '../components/Media'
import { EASE, Reveal, Section, TitleBlock } from '../components/primitives'
import { assets, clientLogos, clients } from '../data/presentation'

export function S04Obeya({ step }: { step: number; active: boolean }) {
  return (
    <Section tone="soft">
      <Blobs variant="a" />
      <div className="relative">
        <TitleBlock
          kicker="01 · Context"
          title="Obeya: the room where the work is visible"
          lead="Born at Toyota: bring every expert into one room, put the work on the walls, decide together."
          size="md"
        />
      </div>

      {/* before / after */}
      <div className="relative mt-7 grid min-h-0 flex-1 grid-cols-[1fr_auto_1fr] items-center gap-8">
        {/* physical */}
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="chip bg-ink-500/12 text-ink-700">Yesterday</span>
            <span className="text-[15px] font-semibold text-ink-500">Paper, walls, one location</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[assets.boards.physical1, assets.boards.physical2].map((src, i) => (
              <motion.img
                key={src}
                src={src}
                alt="Physical Lean board"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className="h-[228px] w-full rounded-2xl object-cover shadow-card"
              />
            ))}
          </div>
        </div>

        {/* arrow */}
        <motion.div
          initial={false}
          animate={{ opacity: step >= 1 ? 1 : 0.2, scale: step >= 1 ? 1 : 0.9 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-grad text-[26px] font-bold text-white shadow-pop">
            →
          </div>
          <div className="text-[12px] font-bold uppercase tracking-armor text-brand-violet">digitised</div>
        </motion.div>

        {/* iObeya */}
        <Reveal when={step >= 1}>
          <div className="mb-3 flex items-center gap-3">
            <span className="chip bg-brand-blue/12 text-brand-blue">With iObeya</span>
            <span className="text-[15px] font-semibold text-ink-500">Same rituals, no walls</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[assets.boards.iobeya1, assets.boards.iobeya2].map((src, i) => (
              <motion.img
                key={src}
                src={src}
                alt="iObeya digital board"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: EASE }}
                className="h-[228px] w-full rounded-2xl object-cover shadow-card ring-2 ring-brand-blue/15"
              />
            ))}
          </div>
        </Reveal>
      </div>

      {/* clients */}
      <Reveal when={step >= 2} className="relative mt-7">
        <div className="card flex items-center gap-8 px-8 py-5">
          <div className="shrink-0 text-[14px] font-bold leading-tight text-ink-400">
            Used by industrial
            <br />
            leaders
          </div>
          <div className="h-12 w-px bg-surface-line" />
          <div className="flex flex-1 items-center justify-between gap-6">
            {clientLogos.map((c, i) => (
              <motion.img
                key={c.name}
                src={c.src}
                alt={c.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="h-[34px] w-auto object-contain"
              />
            ))}
            {clients.map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.24 + i * 0.08 }}
                className="text-[21px] font-extrabold tracking-tight text-ink-400"
              >
                {c}
              </motion.span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
