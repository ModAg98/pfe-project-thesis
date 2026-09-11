import { motion } from 'framer-motion'
import { Blobs } from '../components/Media'
import { EASE, Reveal, Section, TitleBlock } from '../components/primitives'

/** RAG, step two: generation. Report §3.3 (RAG extension) and §4.7 (Sprint 5). */
const stages = [
  {
    n: '01',
    name: 'Context',
    who: 'the retrieved issues',
    d: 'The top-k issues from the previous step, with their root causes, solutions and action plans. Recomputed server-side, so the summary can never describe a ranking other than the one displayed.',
    tone: 'blue',
  },
  {
    n: '02',
    name: 'Consolidate',
    who: 'deterministic code',
    d: 'Repeated root causes and solutions are grouped and counted. Actions are merged (issues carrying one = priority), weakly ranked ones dropped, ordered Secure → Solution → Standardize.',
    tone: 'violet',
  },
  {
    n: '03',
    name: 'Narrate',
    who: 'optional language model',
    d: 'If a model is configured, it rewrites that material under a strict JSON contract. Timeout, malformed answer or no model: silent fallback to the deterministic text, flagged as such.',
    tone: 'sky',
  },
  {
    n: '04',
    name: 'Verify',
    who: 'embedding similarity',
    d: 'Each statement is compared to the individual source fields, not the whole issue. The confidence shown is how well the text is anchored, attenuated when evidence is thin.',
    tone: 'purple',
  },
]

const tones: Record<string, { bg: string; text: string; line: string }> = {
  blue: { bg: 'bg-brand-blue', text: 'text-brand-blue', line: 'bg-brand-blue/40' },
  violet: { bg: 'bg-brand-violet', text: 'text-brand-violet', line: 'bg-brand-violet/40' },
  sky: { bg: 'bg-brand-sky', text: 'text-[#2E90CC]', line: 'bg-brand-sky/50' },
  purple: { bg: 'bg-brand-purple', text: 'text-brand-purple', line: 'bg-brand-purple/40' },
}

/** Measured on the indexed corpus with the same embedding model (report §4.7.3). */
const anchoring = [
  { label: 'Quoted verbatim', value: 1.0, text: '1.00', tone: 'bg-signal-good', color: 'text-signal-good' },
  { label: 'Faithful rewording', value: 0.865, text: '0.84–0.89', tone: 'bg-brand-blue', color: 'text-brand-blue' },
  { label: 'Invented statement', value: 0.36, text: '0.34–0.38', tone: 'bg-signal-bad', color: 'text-signal-bad' },
]

export function S13RAGGenerate({ step }: { step: number; active: boolean }) {
  return (
    <Section tone="soft">
      <Blobs variant="c" />
      <div className="relative">
        <TitleBlock
          kicker="04 · What makes it different · RAG, step two"
          title="Generation: speak only for what was retrieved"
          lead="The retrieved issues are the only source. A model may phrase them, never supply them."
          size="md"
        />
      </div>

      <div className="relative mt-5 grid min-h-0 flex-1 grid-cols-[1.15fr_1fr] gap-8">
        {/* --------------------------- the four stages --------------------------- */}
        <div className="flex flex-col justify-center">
          {stages.map((s, i) => {
            const on = step >= i
            const tone = tones[s.tone]
            return (
              <div key={s.n}>
                {i > 0 && (
                  <div className="flex h-4 justify-center pl-[22px]">
                    <motion.div
                      className={`w-[3px] origin-top rounded-full ${tone.line}`}
                      initial={false}
                      animate={{ scaleY: on ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
                <motion.div
                  initial={false}
                  animate={{ opacity: on ? 1 : 0.12, y: on ? 0 : 10 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="card flex items-start gap-4 px-5 py-3"
                >
                  <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[14px] font-extrabold text-white ${tone.bg}`}>
                    {s.n}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[18px] font-extrabold text-brand-navy">{s.name}</span>
                      <span className={`text-[12px] font-bold uppercase tracking-armor ${tone.text}`}>{s.who}</span>
                    </div>
                    <div className="mt-0.5 text-[13.5px] leading-snug text-ink-700">{s.d}</div>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* --------------------------- evidence panels --------------------------- */}
        <div className="flex flex-col justify-center gap-4">
          <Reveal when={step >= 2}>
            <div className="card p-5">
              <div className="kicker mb-2.5">Two generators, one contract</div>
              <div className="space-y-2">
                {[
                  { k: 'always', t: 'Deterministic generator', d: 'Aggregates and orders what the issues already contain. Invents nothing.', c: 'bg-brand-violet' },
                  { k: 'if configured', t: 'Language model', d: 'Rewrites the same material into a narration. Strict JSON output.', c: 'bg-brand-sky' },
                  { k: 'on any failure', t: 'Silent fallback', d: 'The deterministic text is returned, flagged as such.', c: 'bg-ink-400' },
                ].map((r, i) => (
                  <motion.div
                    key={r.t}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.1 }}
                    className="flex items-center gap-3 rounded-xl bg-surface-soft px-4 py-2"
                  >
                    <span className={`h-8 w-1.5 shrink-0 rounded-full ${r.c}`} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] font-extrabold text-brand-navy">{r.t}</div>
                      <div className="text-[12px] leading-snug text-ink-500">{r.d}</div>
                    </div>
                    <span className="shrink-0 rounded-full bg-white px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-armor text-ink-500">
                      {r.k}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal when={step >= 3}>
            <div className="card p-5">
              <div className="mb-2.5 flex items-baseline justify-between">
                <div className="kicker">How anchored is a statement?</div>
                <div className="text-[11px] font-semibold text-ink-400">measured on this corpus</div>
              </div>
              <div className="space-y-2">
                {anchoring.map((a, i) => (
                  <div key={a.label} className="flex items-center gap-3">
                    <span className="w-[136px] shrink-0 text-[13px] font-bold text-brand-navy">{a.label}</span>
                    <div className="h-4 flex-1 overflow-hidden rounded-full bg-surface-soft">
                      <motion.div
                        className={`h-full rounded-full ${a.tone}`}
                        initial={{ width: 0 }}
                        animate={{ width: step >= 3 ? `${a.value * 100}%` : 0 }}
                        transition={{ duration: 0.8, delay: 0.15 + i * 0.15, ease: EASE }}
                      />
                    </div>
                    <span className={`w-[76px] shrink-0 text-right font-mono text-[12.5px] font-bold ${a.color}`}>{a.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2.5 text-[12px] leading-snug text-ink-500">
                The confidence scale is set between the last two bands, so it separates quoting from inventing.
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal when={step >= 4} className="relative mt-4">
        <div className="flex items-center gap-6 rounded-2xl bg-brand-grad px-8 py-4 text-white shadow-pop">
          <div className="shrink-0 rounded-xl bg-white/15 px-4 py-2 font-mono text-[12px] font-bold uppercase tracking-armor">
            05 · Act
          </div>
          <div className="text-[20px] font-extrabold leading-snug">
            One click turns the retained actions into real iObeya Actions on the open issue. No API key, no network, and
            never an action a model invented.
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
