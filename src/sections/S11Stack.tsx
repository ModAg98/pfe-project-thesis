import { motion } from 'framer-motion'
import { Blobs } from '../components/Media'
import { EASE, Reveal, Section, TitleBlock } from '../components/primitives'
import { techStack } from '../data/presentation'

/** Report, Table 4.2 (stack) and §4.2.3 (rationale for the choices). */
const groupTone: Record<string, string> = {
  'AI similarity service': 'bg-brand-blue',
  Data: 'bg-brand-violet',
  'iObeya integration': 'bg-brand-sky',
  Tooling: 'bg-ink-400',
}

const rationale = [
  {
    t: 'Flask, not FastAPI or Django',
    d: 'A handful of JSON endpoints and no UI: Django would be unused weight. The work is synchronous and CPU-bound (embedding), so async buys nothing.',
  },
  {
    t: 'Inherited, not chosen',
    d: 'Vue.js 3, because the panel had to live inside the existing NextGen front end. Docker, because the platform already runs that way.',
  },
  {
    t: 'What is deliberately absent',
    d: 'No GPU: a 384-dimension model on CPU stays inside the latency budget. No dedicated vector database. No paid API required for search to work.',
  },
]

function TechRow({ name, version, role, src, delay }: { name: string; version?: string; role: string; src: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: EASE }}
      className="flex items-center gap-4"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-surface-line bg-white p-2">
        <img src={src} alt={name} className="max-h-full max-w-full object-contain" />
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-[16px] font-extrabold text-brand-navy">{name}</span>
          {version && <span className="font-mono text-[11.5px] font-semibold text-brand-violet">{version}</span>}
        </div>
        <div className="text-[13px] leading-snug text-ink-500">{role}</div>
      </div>
    </motion.div>
  )
}

export function S11Stack({ step }: { step: number; active: boolean }) {
  const [service, ...rest] = techStack
  let n = 0
  return (
    <Section>
      <Blobs variant="c" />
      <div className="relative">
        <TitleBlock
          kicker="03 · The solution"
          title="Built with"
          lead="Every piece of the stack, and the layer it belongs to."
          size="md"
        />
      </div>

      <div className="relative mt-6 grid min-h-0 flex-1 grid-cols-[1.1fr_1fr] gap-6">
        {/* the service gets its own column: it is where the project's own code lives */}
        <div className="card flex flex-col p-6">
          <div className="mb-4 flex items-center gap-2.5">
            <span className={`h-2.5 w-2.5 rounded-full ${groupTone[service.group]}`} />
            <span className="text-[12px] font-bold uppercase tracking-armor text-ink-500">{service.group}</span>
          </div>
          <div className="flex flex-1 flex-col justify-around gap-4">
            {service.items.map((t) => (
              <TechRow key={t.name} {...t} delay={0.05 * n++} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {rest.map((g) => (
            <div key={g.group} className="card flex-1 p-5">
              <div className="mb-3 flex items-center gap-2.5">
                <span className={`h-2.5 w-2.5 rounded-full ${groupTone[g.group]}`} />
                <span className="text-[12px] font-bold uppercase tracking-armor text-ink-500">{g.group}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {g.items.map((t) => (
                  <TechRow key={t.name} {...t} delay={0.05 * n++} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Reveal when={step >= 1} className="relative mt-5">
        <div className="grid grid-cols-3 gap-4">
          {rationale.map((r, i) => (
            <motion.div
              key={r.t}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
              className="rounded-2xl border-2 border-brand-violet/25 bg-brand-violet/[0.06] px-5 py-3.5"
            >
              <div className="text-[15px] font-extrabold text-brand-violet">{r.t}</div>
              <div className="mt-0.5 text-[13px] leading-snug text-ink-700">{r.d}</div>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
