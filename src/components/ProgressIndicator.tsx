import { motion } from 'framer-motion'

export function ProgressIndicator({
  index,
  total,
  title,
  step,
  steps,
}: {
  index: number
  total: number
  title: string
  step: number
  steps: number
}) {
  const pct = ((index + (steps > 1 ? step / (steps - 1) : 1) * 0.999) / total) * 100

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
      {/* hairline progress */}
      <div className="relative h-[3px] w-full bg-surface-line">
        <motion.div
          className="absolute left-0 top-0 h-[3px] rounded-r-full bg-brand-grad"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        />
      </div>

      <div className="flex items-center justify-between px-10 py-5">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[12px] font-bold tracking-armor text-ink-400">
            <span className="text-brand-blue">{String(index + 1).padStart(2, '0')}</span>
            <span className="mx-1.5 text-ink-300">/</span>
            {String(total).padStart(2, '0')}
          </span>
          <span className="text-[12px] font-bold uppercase tracking-armor text-ink-400">{title}</span>
        </div>

        {steps > 1 && (
          <div className="flex items-center gap-1.5">
            {Array.from({ length: steps }).map((_, i) => (
              <motion.span
                key={i}
                className="block h-1 rounded-full"
                animate={{
                  width: i === step ? 16 : 5,
                  backgroundColor: i <= step ? '#7B4FD0' : '#DFE6F5',
                }}
                transition={{ duration: 0.35 }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
