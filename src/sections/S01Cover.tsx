import { motion } from 'framer-motion'
import { Blobs } from '../components/Media'
import { Chevrons, LogoSlot, Section, T } from '../components/primitives'
import { assets, jury, project, supervisors } from '../data/presentation'

export function S01Cover(_: { step: number; active: boolean }) {
  return (
    <Section padded={false}>
      <Blobs variant="a" />
      <Chevrons corner="tr" />

      <div className="relative flex h-full flex-col px-[88px] pb-[76px] pt-[52px]">
        {/* logos */}
        <div className="flex items-start justify-between">
          <LogoSlot label="[ school logo ]" src={assets.schoolLogo} className="h-[62px] w-[210px]" />
          <LogoSlot label="[ iObeya logo ]" src={assets.iobeyaLogo} className="h-[62px] w-[190px]" />
        </div>

        {/* title */}
        <div className="mt-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={T(0.5)}
            className="mb-5 inline-flex items-center gap-3 rounded-full bg-brand-blue/10 px-5 py-2"
          >
            <span className="h-2 w-2 rounded-full bg-brand-violet" />
            <span className="text-[13px] font-bold uppercase tracking-armor text-brand-blue">
              End-of-Studies Project · {project.academicYear}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={T(0.85, 0.1)}
            className="max-w-[1120px] text-[68px] font-extrabold leading-[1.03] tracking-[-0.03em] text-brand-navy"
          >
            <span className="text-grad">Intelligent Similarity Search</span>
            <br />
            System for the Gemba Walk Assistant
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={T(0.8, 0.35)}
            className="mt-7 h-[5px] w-[180px] origin-left rounded-full bg-brand-grad"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={T(0.7, 0.45)}
            className="mt-7"
          >
            <div className="text-[15px] font-semibold uppercase tracking-armor text-ink-400">Presented by</div>
            <div className="mt-1 text-[30px] font-extrabold tracking-tight text-brand-navy">{project.author}</div>
            <div className="mt-1 text-[15px] text-ink-500">
              {project.degree} · {project.specialty}
            </div>
          </motion.div>
        </div>

        {/* people */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={T(0.7, 0.62)}
          className="mt-9 grid grid-cols-4 gap-5 border-t-2 border-surface-line pt-6"
        >
          {[...supervisors, ...jury].map((p, i) => (
            <div key={p.role}>
              <div
                className={`text-[11px] font-bold uppercase tracking-armor ${
                  i < 2 ? 'text-brand-violet' : 'text-brand-blue'
                }`}
              >
                {p.role}
              </div>
              <div className="mt-1.5 text-[16px] font-bold text-ink-900">{p.name}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
