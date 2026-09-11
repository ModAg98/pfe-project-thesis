import { AnimatePresence, motion } from 'framer-motion'

function Arrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d={dir === 'right' ? 'M6 3l5 5-5 5' : 'M10 3L5 8l5 5'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function NavigationControls({
  visible,
  onPrev,
  onNext,
  onOverview,
  onFullscreen,
  atStart,
  atEnd,
}: {
  visible: boolean
  onPrev: () => void
  onNext: () => void
  onOverview: () => void
  onFullscreen: () => void
  atStart: boolean
  atEnd: boolean
}) {
  const btn =
    'flex h-9 w-9 items-center justify-center rounded-lg border-2 border-surface-line bg-white/90 text-ink-400 shadow-sm backdrop-blur transition hover:border-brand-blue/40 hover:text-brand-blue disabled:opacity-30 disabled:hover:border-surface-line disabled:hover:text-ink-400'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-16 right-10 z-40 flex items-center gap-2"
        >
          <button className={btn} onClick={onOverview} title="Overview (O)" aria-label="Overview">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <rect x="1" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1.3" rx="1" />
              <rect x="8" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1.3" rx="1" />
              <rect x="1" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.3" rx="1" />
              <rect x="8" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.3" rx="1" />
            </svg>
          </button>
          <button className={btn} onClick={onFullscreen} title="Fullscreen (F)" aria-label="Fullscreen">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 5V1h4M13 9v4H9M9 1h4v4M5 13H1V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
          <div className="mx-1 h-5 w-px bg-surface-line" />
          <button className={btn} onClick={onPrev} disabled={atStart} title="Previous (←)" aria-label="Previous">
            <Arrow dir="left" />
          </button>
          <button className={btn} onClick={onNext} disabled={atEnd} title="Next (→)" aria-label="Next">
            <Arrow dir="right" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
