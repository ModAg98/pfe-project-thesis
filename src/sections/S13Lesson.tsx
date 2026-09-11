import { motion } from 'framer-motion'
import { Blobs } from '../components/Media'
import { EASE, Reveal, Section, TitleBlock } from '../components/primitives'

function Partitions({ on, missed }: { on: boolean; missed: boolean }) {
  return (
    <div className="grid grid-cols-10 gap-1.5">
      {Array.from({ length: 100 }).map((_, i) => {
        const probed = i === 43
        const target = i === 71
        return (
          <motion.div
            key={i}
            initial={false}
            animate={{
              opacity: on ? 1 : 0.2,
              backgroundColor: probed ? '#2342CE' : target && missed ? '#E2514F' : 'rgba(35,66,206,0.09)',
              scale: (probed || (target && missed)) && on ? 1.14 : 1,
            }}
            transition={{ duration: 0.35, delay: (i % 10) * 0.01, ease: EASE }}
            className="aspect-square rounded-[3px]"
          />
        )
      })}
    </div>
  )
}

export function S13Lesson({ step }: { step: number; active: boolean }) {
  return (
    <Section tone="soft">
      <Blobs variant="a" />
      <div className="relative">
        <TitleBlock kicker="05 — Results" title="Testing changed the architecture" size="md" />
      </div>

      <div className="relative mt-6 grid min-h-0 flex-1 grid-cols-2 gap-12">
        <div className="flex min-h-0 flex-col justify-center gap-2.5">
          {[
            { k: 'The design', t: 'A standard vector index, added for speed.', on: true, tone: 'n' },
            { k: 'The test', t: '500+ issues indexed. Obvious matches came back missing.', on: step >= 1, tone: 'n' },
            { k: 'The cause', t: 'The index split the data into 100 partitions and searched only 1 — about 1 % of the history.', on: step >= 2, tone: 'bad' },
            { k: 'The fix', t: 'Drop the index. Search everything, exactly, in 25–40 ms.', on: step >= 4, tone: 'good' },
          ].map((b) => (
            <motion.div
              key={b.k}
              initial={false}
              animate={{ opacity: b.on ? 1 : 0.12, y: b.on ? 0 : 12 }}
              transition={{ duration: 0.45, ease: EASE }}
              className={`rounded-2xl border-2 px-7 py-5 ${
                b.tone === 'bad'
                  ? 'border-signal-bad/30 bg-signal-bad/[0.06]'
                  : b.tone === 'good'
                    ? 'border-signal-good/30 bg-signal-good/[0.06]'
                    : 'border-surface-line bg-white'
              }`}
            >
              <div className={`text-[12px] font-bold uppercase tracking-armor ${
                b.tone === 'bad' ? 'text-signal-bad' : b.tone === 'good' ? 'text-signal-good' : 'text-brand-violet'
              }`}>
                {b.k}
              </div>
              <div className="mt-1.5 text-[17px] font-semibold leading-snug text-ink-700">{b.t}</div>
            </motion.div>
          ))}
        </div>

        <div className="flex min-h-0 flex-col justify-center gap-4">
          <div className="card shrink-0 p-6">
            <div className="mb-4 flex items-baseline justify-between">
              <div className="kicker">What the index actually searched</div>
              <motion.span
                initial={false}
                animate={{ opacity: step >= 2 ? 1 : 0 }}
                className="font-mono text-[15px] font-bold text-brand-blue"
              >
                1 / 100
              </motion.span>
            </div>
            <div className="mx-auto w-[330px]"><Partitions on={step >= 2} missed={step >= 3} /></div>
            <div className="mt-4 flex gap-6 text-[13px] font-semibold text-ink-500">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-[3px] bg-brand-blue" /> searched
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-[3px] bg-signal-bad" /> the answer, never reached
              </span>
            </div>
          </div>

          <Reveal when={step >= 3}>
            <div className="rounded-2xl border-2 border-signal-bad/35 bg-signal-bad/[0.07] px-8 py-5">
              <div className="text-[25px] font-bold leading-tight text-ink-700">Nothing crashed.</div>
              <div className="mt-1 text-[25px] font-extrabold leading-tight text-signal-bad">
                The answers were simply wrong.
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal when={step >= 4} className="relative mt-4">
        <div className="text-center text-[16px] font-bold uppercase tracking-armor text-ink-400">
          design → build → measure → fail → investigate → correct → validate
        </div>
      </Reveal>
    </Section>
  )
}
