import { AnimatePresence, motion } from 'framer-motion'
import { AppFrame, Blobs, Clip } from '../components/Media'
import { EASE, Reveal, Section, TitleBlock } from '../components/primitives'
import { assets } from '../data/presentation'

const steps = [
  {
    n: '01', verb: 'Capture',
    title: 'The problem is described once',
    body: 'The operator fills the 5W2H on the spot, exactly as they do today. Nothing new to learn.',
    clip: assets.clips.capture,
    label: 'Gemba Walk Assistant — reporting an issue',
    tone: 'blue',
  },
  {
    n: '02', verb: 'Find',
    title: 'One click finds what happened before',
    body: 'The system compares this issue to the whole history — by meaning, field by field — and ranks what matches.',
    clip: assets.clips.search,
    label: 'Similar issues — 5W2H similarity search',
    tone: 'violet',
  },
  {
    n: '03', verb: 'Reuse',
    title: 'It hands back what actually worked',
    body: 'Root causes, proven solutions and a ready action plan — each line traced to the issue it came from.',
    clip: assets.clips.reuse,
    label: 'AI summary and consolidated action plan',
    tone: 'sky',
  },
]

const tones: Record<string, { bg: string; text: string; ring: string }> = {
  blue: { bg: 'bg-brand-blue', text: 'text-brand-blue', ring: 'ring-brand-blue/25' },
  violet: { bg: 'bg-brand-violet', text: 'text-brand-violet', ring: 'ring-brand-violet/25' },
  sky: { bg: 'bg-brand-sky', text: 'text-[#2E90CC]', ring: 'ring-brand-sky/30' },
}

export function S09Solution({ step, active }: { step: number; active: boolean }) {
  const idx = Math.min(Math.max(step - 1, 0), 2)
  const showing = step >= 1 && step <= 3
  const cur = steps[idx]
  const tone = tones[cur.tone]

  return (
    <Section tone="soft">
      <Blobs variant="c" />

      <div className="relative flex items-end justify-between gap-8">
        <TitleBlock
          kicker="03 — The solution"
          title={step === 0 ? 'Turn the archive into an answer' : step >= 4 ? 'Three steps, inside the tool they already use' : cur.title}
          size="md"
        />
        <Reveal when={step >= 1} className="shrink-0 pb-2">
          <div className="flex items-center gap-2.5">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`flex items-center gap-2 rounded-full px-4 py-2 transition ${
                  i === idx ? `${tones[s.tone].bg} text-white` : 'bg-white text-ink-400'
                }`}
              >
                <span className="text-[12px] font-extrabold">{s.n}</span>
                <span className="text-[13px] font-bold">{s.verb}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {step === 0 && (
        <div className="relative mt-auto grid grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
              className="card p-8"
            >
              <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-[20px] font-extrabold text-white ${tones[s.tone].bg}`}>
                {s.n}
              </div>
              <div className={`text-[28px] font-extrabold ${tones[s.tone].text}`}>{s.verb}</div>
              <div className="mt-2 text-[17px] font-bold leading-snug text-brand-navy">{s.title}</div>
              <div className="mt-2.5 text-[14px] leading-relaxed text-ink-500">{s.body}</div>
            </motion.div>
          ))}
        </div>
      )}

      {showing && (
        <div className="relative mt-5 grid min-h-0 flex-1 grid-cols-[1fr_340px] items-center gap-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.n}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <AppFrame label={cur.label} className={`ring-4 ${tone.ring}`}>
                <Clip src={cur.clip} active={active} className="aspect-[900/506] w-full" rounded="" />
              </AppFrame>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={cur.n + 't'}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className={`text-[50px] font-extrabold leading-none ${tone.text}`}>{cur.verb}</div>
              <p className="mt-5 text-[18px] leading-relaxed text-ink-700">{cur.body}</p>
              <div className={`mt-7 h-1.5 w-24 rounded-full ${tone.bg}`} />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {step >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative m-auto text-center"
        >
          <div className="flex items-center justify-center gap-7">
            {['Capture', 'Find', 'Reuse'].map((w, i, arr) => (
              <div key={w} className="flex items-center gap-7">
                <motion.span
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.15, ease: EASE }}
                  className="text-[70px] font-extrabold tracking-tight text-grad"
                >
                  {w}
                </motion.span>
                {i < arr.length - 1 && <span className="text-[38px] font-bold text-brand-violet/50">→</span>}
              </div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-[25px] font-bold text-ink-700"
          >
            Inside the tool people already use. No new habit required.
          </motion.div>
        </motion.div>
      )}
    </Section>
  )
}
