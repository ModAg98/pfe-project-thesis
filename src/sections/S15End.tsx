import { motion } from 'framer-motion'
import { Blobs } from '../components/Media'
import { Chevrons, LogoSlot, Section, T } from '../components/primitives'
import { assets, jury, project, supervisors } from '../data/presentation'

export function S15End(_: { step: number; active: boolean }) {
  return (
    <Section padded={false}>
      <Blobs variant="a" />
      <Chevrons corner="tr" />

      <div className="relative flex h-full flex-col items-center justify-center px-[88px] pb-[64px]">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={T(0.75)}
          className="text-[84px] font-extrabold tracking-[-0.035em] text-grad"
        >
          Thank you
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={T(0.7, 0.2)}
          className="mt-2 text-[32px] font-bold text-ink-500"
        >
          Questions?
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={T(0.8, 0.35)}
          className="mt-9 h-[5px] w-[200px] rounded-full bg-brand-grad"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={T(0.7, 0.5)}
          className="mt-9 text-center"
        >
          <div className="text-[24px] font-extrabold text-brand-navy">{project.author}</div>
          <div className="mt-1.5 text-[15px] text-ink-500">
            {project.institution} · {project.company} · {project.academicYear}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={T(0.7, 0.62)}
          className="mt-10 grid w-full max-w-[960px] grid-cols-4 gap-5 border-t-2 border-surface-line pt-6"
        >
          {[...supervisors, ...jury].map((p, i) => (
            <div key={p.role} className="text-center">
              <div className={`text-[11px] font-bold uppercase tracking-armor ${i < 2 ? 'text-brand-violet' : 'text-brand-blue'}`}>
                {p.role}
              </div>
              <div className="mt-1.5 text-[15px] font-bold text-ink-900">{p.name}</div>
            </div>
          ))}
        </motion.div>

        <div className="absolute bottom-[40px] left-[88px] right-[88px] flex items-end justify-between">
          <LogoSlot label="[ school logo ]" src={assets.schoolLogo} className="h-[42px] w-[146px]" />
          <LogoSlot label="[ iObeya logo ]" src={assets.iobeyaLogo} className="h-[42px] w-[136px]" />
        </div>
      </div>
    </Section>
  )
}
