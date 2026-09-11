import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { sections } from '../sections'
import { NavigationControls } from './NavigationControls'
import { ProgressIndicator } from './ProgressIndicator'
import { Stage } from './Stage'

const total = sections.length

/** Deep link format: #14 (section) or #14.3 (section.step), both 1-based. */
function readHash(): { index: number; step: number } {
  const m = /^#(\d+)(?:\.(\d+))?$/.exec(window.location.hash)
  if (!m) return { index: 0, step: 0 }
  const i = Math.max(0, Math.min(total - 1, parseInt(m[1], 10) - 1))
  const s = Math.max(0, Math.min(sections[i].steps - 1, (parseInt(m[2] ?? '1', 10) || 1) - 1))
  return { index: i, step: s }
}

export function PresentationShell() {
  const initial = readHash()
  const [index, setIndex] = useState(initial.index)
  const [step, setStep] = useState(initial.step)
  const [dir, setDir] = useState(1)
  const [overview, setOverview] = useState(false)
  const [blackout, setBlackout] = useState(false)
  const [help, setHelp] = useState(false)
  const [chromeVisible, setChromeVisible] = useState(true)
  const hideTimer = useRef<number | null>(null)
  const wheelLock = useRef(false)

  const current = sections[index]

  /* ------------------------------ navigation ------------------------------ */

  const goSection = useCallback((i: number, atLastStep = false) => {
    const clamped = Math.max(0, Math.min(total - 1, i))
    setDir(clamped >= index ? 1 : -1)
    setIndex(clamped)
    setStep(atLastStep ? sections[clamped].steps - 1 : 0)
  }, [index])

  const next = useCallback(() => {
    if (step < current.steps - 1) {
      setDir(1)
      setStep((s) => s + 1)
    } else if (index < total - 1) {
      goSection(index + 1)
    }
  }, [step, current.steps, index, goSection])

  const prev = useCallback(() => {
    if (step > 0) {
      setDir(-1)
      setStep((s) => s - 1)
    } else if (index > 0) {
      goSection(index - 1, true)
    }
  }, [step, index, goSection])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {})
    else document.exitFullscreen?.().catch(() => {})
  }, [])

  /* ------------------------------ deep linking ----------------------------- */

  useEffect(() => {
    const hash = `#${index + 1}${current.steps > 1 ? `.${step + 1}` : ''}`
    if (window.location.hash !== hash) window.history.replaceState(null, '', hash)
  }, [index, step, current.steps])

  /* ------------------------------- keyboard ------------------------------- */

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault()
          overview ? setOverview(false) : next()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          prev()
          break
        case 'ArrowDown':
          e.preventDefault()
          goSection(index + 1)
          break
        case 'ArrowUp':
          e.preventDefault()
          goSection(index - 1)
          break
        case 'Home':
          e.preventDefault()
          goSection(0)
          break
        case 'End':
          e.preventDefault()
          goSection(total - 1)
          break
        case 'f':
        case 'F':
          toggleFullscreen()
          break
        case 'o':
        case 'O':
          setOverview((v) => !v)
          break
        case 'b':
        case 'B':
          setBlackout((v) => !v)
          break
        case '?':
        case 'h':
        case 'H':
          setHelp((v) => !v)
          break
        case 'Escape':
          setOverview(false)
          setHelp(false)
          setBlackout(false)
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, goSection, index, overview, toggleFullscreen])

  /* --------------------------- wheel / touch nav --------------------------- */

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (overview) return
      const target = e.target as HTMLElement | null
      if (target?.closest('[data-scrollable]')) return
      if (Math.abs(e.deltaY) < 12 || wheelLock.current) return
      wheelLock.current = true
      window.setTimeout(() => (wheelLock.current = false), 620)
      e.deltaY > 0 ? next() : prev()
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [next, prev, overview])

  useEffect(() => {
    let startX = 0
    let startY = 0
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX
      const dy = e.changedTouches[0].clientY - startY
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next : prev)()
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [next, prev])

  /* ------------------------- auto-hide the chrome -------------------------- */

  useEffect(() => {
    const show = () => {
      setChromeVisible(true)
      if (hideTimer.current) window.clearTimeout(hideTimer.current)
      hideTimer.current = window.setTimeout(() => setChromeVisible(false), 2600)
    }
    show()
    window.addEventListener('mousemove', show)
    return () => {
      window.removeEventListener('mousemove', show)
      if (hideTimer.current) window.clearTimeout(hideTimer.current)
    }
  }, [])

  /* --------------------------------- render -------------------------------- */

  const Current = current.Component

  return (
    <div className="relative h-full w-full select-none bg-white">
      {/* light ambient ground */}
      <div className="pointer-events-none absolute inset-0 bg-white" />

      <Stage>
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={current.id}
            className="absolute inset-0"
            custom={dir}
            initial={{ opacity: 0, x: dir * 26 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -26 }}
            transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <Current step={step} active />
          </motion.div>
        </AnimatePresence>
      </Stage>

      <ProgressIndicator
        index={index}
        total={total}
        title={current.title}
        step={step}
        steps={current.steps}
      />

      <NavigationControls
        visible={chromeVisible && !overview}
        onPrev={prev}
        onNext={next}
        onOverview={() => setOverview(true)}
        onFullscreen={toggleFullscreen}
        atStart={index === 0 && step === 0}
        atEnd={index === total - 1 && step === current.steps - 1}
      />

      {/* Overview grid */}
      <AnimatePresence>
        {overview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-50 overflow-auto bg-white/97 backdrop-blur-md"
            data-scrollable
          >
            <div className="mx-auto max-w-[1180px] px-12 py-14">
              <div className="kicker mb-8">Overview · press O or Esc to close</div>
              <div className="grid grid-cols-4 gap-3">
                {sections.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      goSection(i)
                      setOverview(false)
                    }}
                    className={`group rounded-xl border-2 p-4 text-left transition ${
                      i === index
                        ? 'border-brand-violet bg-brand-violet/[0.07]'
                        : 'border-surface-line hover:border-brand-blue/40 hover:bg-surface-soft'
                    }`}
                  >
                    <div className="font-mono text-[11px] font-bold tracking-armor text-brand-violet">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="mt-2 text-[13px] font-bold leading-snug text-brand-navy">{s.title}</div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help */}
      <AnimatePresence>
        {help && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="absolute bottom-28 left-10 z-50 rounded-xl border-2 border-surface-line bg-white p-5 font-mono text-[12px] leading-relaxed text-ink-500 shadow-lift"
          >
            {[
              ['→ / Space', 'next step'],
              ['←', 'previous step'],
              ['↑ / ↓', 'jump section'],
              ['Home / End', 'first / last'],
              ['F', 'fullscreen'],
              ['O', 'overview'],
              ['B', 'black screen'],
              ['H', 'this help'],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-4">
                <span className="w-24 font-bold text-brand-navy">{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blackout for Q&A */}
      <AnimatePresence>
        {blackout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-[60] bg-black"
            onClick={() => setBlackout(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
