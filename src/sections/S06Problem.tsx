import { motion } from 'framer-motion'
import { Clip } from '../components/Media'
import { Reveal, Section, T } from '../components/primitives'
import { assets } from '../data/presentation'

export function S06Problem({ step, active }: { step: number; active: boolean }) {
  return (
    <Section padded={false} className="!bg-ink-900">
      <Clip src={assets.problemVideo} active={active} className="absolute inset-0 h-full w-full" rounded="" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0B0E1C]/95 via-[#0B0E1C]/72 to-[#0B0E1C]/30" />

      <div className="pointer-events-none relative flex h-full flex-col justify-center px-[88px] pb-[80px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={T(0.6)}
          className="mb-5 inline-flex w-fit items-center gap-3 rounded-full bg-white/14 px-5 py-2 backdrop-blur"
        >
          <span className="h-2 w-2 rounded-full bg-brand-sky" />
          <span className="text-[13px] font-bold uppercase tracking-armor text-white/90">02 — The problem</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={T(0.8, 0.15)}
          className="max-w-[900px] text-[58px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
        >
          The answer already exists.
          <br />
          <span className="text-brand-sky">Nobody can find it.</span>
        </motion.h2>

        <Reveal when={step >= 1} className="mt-8">
          <div className="max-w-[620px] text-[21px] font-medium leading-relaxed text-white/85">
            A problem is reported. Somewhere in thousands of archived issues, the same problem was already solved —
            with a root cause and a proven action plan attached.
          </div>
        </Reveal>

        <Reveal when={step >= 2} className="mt-6">
          <div className="text-[28px] font-extrabold text-white">
            So the team investigates it <span className="text-brand-sky">all over again.</span>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
