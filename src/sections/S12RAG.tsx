import { motion } from 'framer-motion'
import { Blobs } from '../components/Media'
import { EASE, Section, TitleBlock } from '../components/primitives'
import { ALPHA, COVERAGE_PENALTY, fieldWeights } from '../data/presentation'

/**
 * RAG, step one: retrieval. Report §3.4.4 (field-weighted scoring, Eq. 3.1 to 3.5).
 * The weights are the real ones. The per-field similarities below are a WORKED EXAMPLE
 * chosen to walk the jury through the arithmetic; the slide says so.
 */
const example: Record<string, number> = {
  what: 0.84,
  why: 0.72,
  how: 0.61,
  where: 0.95,
  who: 0.12,
  howMany: 0.8, // 12 units vs 15 units → 12 / 15
  when: 0.5, // 30 days apart → 2^(−30/30)
}
const S_GLOBAL = 0.66
const COVERAGE = 1 // the candidate documents every field the query supplied

const rows = fieldWeights.filter((f) => f.key in example).map((f) => ({ ...f, s: example[f.key], ws: f.weight * example[f.key] }))
const sumW = rows.reduce((a, r) => a + r.weight, 0)
const sumWS = rows.reduce((a, r) => a + r.ws, 0)
const S_FIELD = sumWS / sumW
const lambda = ALPHA * COVERAGE
const S_BLEND = lambda * S_FIELD + (1 - lambda) * S_GLOBAL
const S_FINAL = S_BLEND * (1 - COVERAGE_PENALTY * (1 - COVERAGE))
const label = S_FINAL >= 0.85 ? 'Almost identical' : S_FINAL >= 0.65 ? 'Very similar' : S_FINAL >= 0.45 ? 'Similar' : 'Below cutoff'

const kindLabel: Record<string, string> = { semantic: 'cosine', temporal: '2^(−t/30)', numeric: 'min / max' }
const kindTone: Record<string, string> = {
  semantic: 'bg-brand-blue/[0.09] text-brand-blue',
  temporal: 'bg-brand-violet/[0.10] text-brand-violet',
  numeric: 'bg-brand-sky/[0.18] text-[#1B7FB8]',
}

const f2 = (v: number) => v.toFixed(2)

const formulas = [
  {
    t: 'Embed the new issue',
    d: 'Each 5W2H field becomes its own vector, with the same model used at ingestion. Plus one global vector: What + Root cause + Solution.',
    m: 'q_what, q_why, q_how, … q_when   +   q_global',
  },
  {
    t: 'Compare field to field',
    d: 'Text fields by cosine similarity. When by elapsed time, with a 30-day half-life. How many by ratio of magnitudes.',
    m: 'sᵢ = cos(qᵢ, vᵢ)   ·   2^(−t/30)   ·   min/max',
  },
  {
    t: 'Multiply by the weight, average',
    d: 'What counts a third, Who almost nothing. Only fields both issues filled in are compared: missing data is not dissimilarity.',
    m: `S_field = Σ wᵢ·sᵢ / Σ wᵢ = ${f2(sumWS)} / ${f2(sumW)} = ${f2(S_FIELD)}`,
  },
  {
    t: 'Blend with the global vector',
    d: `The field score carries at most ${ALPHA * 100} % of the result, scaled by coverage κ. An issue with no 5W2H falls back to its global vector alone.`,
    m: `S_blend = ${ALPHA}κ·S_field + (1 − ${ALPHA}κ)·S_global = ${f2(S_BLEND)}`,
  },
  {
    t: 'Penalise gaps, keep what passes',
    d: 'A candidate answering half the query keeps 87.5 % of its score. Results with S ≥ 0.45 are kept; the top-k become the context for generation.',
    m: `S = S_blend·(1 − ${COVERAGE_PENALTY}(1 − κ)) = ${f2(S_FINAL)}  →  ${label}`,
  },
]

export function S12RAG({ step }: { step: number; active: boolean }) {
  return (
    <Section tone="soft">
      <Blobs variant="b" />
      <div className="relative">
        <TitleBlock
          kicker="04 · What makes it different · RAG, step one"
          title="Retrieval: score a candidate, field by field"
          lead="Embed the issue, compare each 5W2H field, multiply by its weight, keep what passes."
          size="md"
        />
      </div>

      <div className="relative mt-5 grid min-h-0 flex-1 grid-cols-[1fr_500px] items-start gap-8">
        {/* --------------------------- worked example --------------------------- */}
        <div className="card flex flex-col px-6 py-4">
          <div className="mb-2 flex items-baseline justify-between">
            <div className="kicker">Worked example · one candidate against the new issue</div>
            <div className="text-[11px] font-semibold text-ink-400">illustrative similarities, real weights</div>
          </div>

          <div className="grid grid-cols-[104px_92px_1fr_64px_64px] items-center gap-x-3 border-b border-surface-line pb-1.5 font-mono text-[10.5px] font-bold uppercase tracking-armor text-ink-400">
            <span>Field</span>
            <span>compared by</span>
            <span>similarity sᵢ</span>
            <span className="text-right">× wᵢ</span>
            <span className="text-right">= wᵢ·sᵢ</span>
          </div>

          <div className="mt-1.5 space-y-1">
            {rows.map((r, i) => (
              <motion.div
                key={r.key}
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05, ease: EASE }}
                className="grid h-[38px] grid-cols-[104px_92px_1fr_64px_64px] items-center gap-x-3"
              >
                <span className="text-[15px] font-bold text-brand-navy">{r.label}</span>
                <span className={`inline-flex w-fit rounded-md px-2 py-0.5 font-mono text-[10.5px] font-semibold ${kindTone[r.kind]}`}>
                  {kindLabel[r.kind]}
                </span>
                <div className="flex items-center gap-2.5">
                  <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-surface-soft">
                    <motion.div
                      className="h-full rounded-full bg-brand-blue/70"
                      initial={false}
                      animate={{ width: step >= 1 ? `${r.s * 100}%` : '0%' }}
                      transition={{ duration: 0.7, delay: 0.05 + i * 0.06, ease: EASE }}
                    />
                  </div>
                  <motion.span
                    initial={false}
                    animate={{ opacity: step >= 1 ? 1 : 0 }}
                    className="w-[38px] font-mono text-[13px] font-bold text-ink-700"
                  >
                    {f2(r.s)}
                  </motion.span>
                </div>
                <motion.span
                  initial={false}
                  animate={{ opacity: step >= 2 ? 1 : 0.18 }}
                  className="text-right font-mono text-[13px] font-bold text-brand-violet"
                >
                  {f2(r.weight)}
                </motion.span>
                <motion.span
                  initial={false}
                  animate={{ opacity: step >= 2 ? 1 : 0, x: step >= 2 ? 0 : 6 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="text-right font-mono text-[13px] font-bold text-brand-navy"
                >
                  {f2(r.ws)}
                </motion.span>
              </motion.div>
            ))}
          </div>

          {/* totals */}
          <motion.div
            initial={false}
            animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 6 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-2 grid grid-cols-[104px_92px_1fr_64px_64px] items-center gap-x-3 border-t-2 border-surface-line pt-2"
          >
            <span className="col-span-3 text-[13px] font-semibold text-ink-500">
              Σ over the {rows.length} fields the query supplied
            </span>
            <span className="text-right font-mono text-[13px] font-bold text-brand-violet">{f2(sumW)}</span>
            <span className="text-right font-mono text-[13px] font-bold text-brand-navy">{f2(sumWS)}</span>
          </motion.div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { k: 'S_field', v: S_FIELD, on: step >= 2, tone: 'text-brand-blue' },
              { k: 'S_blend', v: S_BLEND, on: step >= 3, tone: 'text-brand-violet' },
              { k: 'S', v: S_FINAL, on: step >= 4, tone: 'text-signal-good', tag: label },
            ].map((x) => (
              <motion.div
                key={x.k}
                initial={false}
                animate={{ opacity: x.on ? 1 : 0.15, y: x.on ? 0 : 8 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="rounded-xl bg-surface-soft px-4 py-2.5"
              >
                <div className="font-mono text-[11px] font-bold text-ink-400">{x.k}</div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-[28px] font-extrabold leading-none ${x.tone}`}>{f2(x.v)}</span>
                  {x.tag && <span className="text-[12px] font-bold text-signal-good">{x.tag}</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --------------------------- the five formulas --------------------------- */}
        <div className="flex flex-col justify-center gap-2">
          {formulas.map((f, i) => {
            const on = step >= i
            const current = step === i
            return (
              <motion.div
                key={f.t}
                initial={false}
                animate={{ opacity: on ? 1 : 0.15, x: on ? 0 : 10 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={`rounded-2xl border-2 bg-white px-4 py-2 ${current ? 'border-brand-violet/40 shadow-card' : 'border-surface-line'}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-extrabold text-white ${current ? 'bg-brand-violet' : 'bg-brand-navy/70'}`}>
                    {i + 1}
                  </span>
                  <span className="text-[14.5px] font-extrabold text-brand-navy">{f.t}</span>
                </div>
                <div className="mt-0.5 text-[12px] leading-snug text-ink-500">{f.d}</div>
                <div className="mt-1 rounded-lg bg-brand-blue/[0.06] px-2.5 py-1 font-mono text-[11px] font-semibold text-brand-blue">
                  {f.m}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

    </Section>
  )
}
