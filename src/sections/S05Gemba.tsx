import { motion } from 'framer-motion'
import { AppFrame, Blobs, Clip } from '../components/Media'
import { EASE, Reveal, Section, Term, TitleBlock } from '../components/primitives'
import { assets, fiveW2H, resolutionStages } from '../data/presentation'

export function S05Gemba({ step, active }: { step: number; active: boolean }) {
  return (
    <Section>
      <Blobs variant="b" />
      <div className="relative">
        <div className="mb-4 flex items-center gap-4">
          <img
            src={assets.gembaLogo ?? ''}
            alt="Gemba by iObeya"
            className="h-[46px] w-auto rounded-lg border border-surface-line object-contain px-2"
          />
        </div>
        <TitleBlock
          kicker="01 · Context"
          title="Go and see: the Gemba Walk"
          lead={
            <>
              A manager walks the floor and records what they see, not as free text but as a{' '}
              <Term>structured 5W2H statement</Term>.
            </>
          }
          size="md"
        />
      </div>

      <div className="relative mt-6 grid min-h-0 flex-1 grid-cols-[1.05fr_1fr] gap-12">
        <div className="flex flex-col justify-center">
          <AppFrame label="Gemba Walk Assistant · capturing an issue">
            <Clip src={assets.clips.capture} active={active} className="aspect-[900/506] w-full" rounded="" />
          </AppFrame>
        </div>

        <div className="flex flex-col justify-center gap-5 py-1">
          <img
            src={assets.gembaScene}
            alt="A manager and an operator at the machine"
            className="h-[132px] w-full rounded-2xl object-cover shadow-card"
          />

          <div>
            <div className="kicker mb-2.5">The 5W2H frame</div>
            <div className="grid grid-cols-4 gap-2">
              {fiveW2H.map((f, i) => (
                <motion.div
                  key={f.key}
                  initial={false}
                  animate={{ opacity: step >= 1 ? 1 : 0.15, y: step >= 1 ? 0 : 10 }}
                  transition={{ duration: 0.35, delay: i * 0.06, ease: EASE }}
                  className={`rounded-xl bg-brand-blue/[0.08] px-2 py-2.5 text-center ${
                    i === fiveW2H.length - 1 ? 'col-span-4' : ''
                  }`}
                >
                  <div className="text-[14px] font-extrabold text-brand-blue">{f.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <Reveal when={step >= 2}>
            <div className="kicker mb-2.5">Then the team resolves it</div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
              {resolutionStages.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={false}
                  animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 8 }}
                  transition={{ duration: 0.35, delay: i * 0.07, ease: EASE }}
                  className="flex items-center gap-2"
                >
                  <span
                    className={`rounded-lg px-3 py-1.5 text-[13px] font-bold text-white ${
                      i >= 2 ? 'bg-brand-violet' : 'bg-brand-blue/80'
                    }`}
                  >
                    {s.label}
                  </span>
                  {i < resolutionStages.length - 1 && (
                    <span className="text-[13px] font-bold text-ink-300">→</span>
                  )}
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal when={step >= 3}>
            <div className="rounded-2xl bg-brand-grad px-6 py-5 text-white shadow-pop">
              <div className="text-[19px] font-extrabold leading-snug">
                Solved issues stay on the board, with the root cause, the solution and the actions that worked.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
