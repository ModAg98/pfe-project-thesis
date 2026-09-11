import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE } from './primitives'

/**
 * A video framed like a device screen. Autoplays muted (so browsers allow it),
 * loops, and can be paused/replayed by clicking — which is all a presenter needs.
 */
export function Clip({
  src,
  active = true,
  loop = true,
  className = '',
  rounded = 'rounded-2xl',
  controls = false,
  onEnded,
}: {
  src: string
  /** When false the clip pauses and rewinds — used to stop off-screen sections. */
  active?: boolean
  loop?: boolean
  className?: string
  rounded?: string
  controls?: boolean
  onEnded?: () => void
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (active) {
      v.play().catch(() => {})
    } else {
      v.pause()
      v.currentTime = 0
      setPaused(false)
    }
  }, [active])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) {
      v.play().catch(() => {})
      setPaused(false)
    } else {
      v.pause()
      setPaused(true)
    }
  }

  return (
    <div className={`group relative overflow-hidden bg-ink-900 ${rounded} ${className}`}>
      <video
        ref={ref}
        src={src}
        muted
        loop={loop}
        playsInline
        preload="auto"
        controls={controls}
        onEnded={onEnded}
        onClick={controls ? undefined : toggle}
        className="h-full w-full cursor-pointer object-cover"
      />
      {paused && !controls && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink-900/35">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 pl-1 text-[22px] text-brand-blue shadow-lift">
            ▶
          </span>
        </div>
      )}
    </div>
  )
}

/** A browser-ish chrome around a product clip, so it reads as the real app. */
export function AppFrame({
  children,
  label,
  className = '',
}: {
  children: React.ReactNode
  label?: string
  className?: string
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-surface-line bg-white shadow-lift ${className}`}>
      <div className="flex items-center gap-2 border-b border-surface-line bg-surface-soft px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        {label && (
          <span className="ml-3 font-mono text-[11px] font-medium tracking-wide text-ink-400">{label}</span>
        )}
      </div>
      <div className="relative bg-ink-900">{children}</div>
    </div>
  )
}

/** Soft decorative blobs — adds warmth without noise. */
export function Blobs({ variant = 'a' }: { variant?: 'a' | 'b' | 'c' }) {
  const sets = {
    a: [
      { c: 'bg-brand-sky/25', s: 'h-[380px] w-[380px]', p: '-top-28 -right-24' },
      { c: 'bg-brand-violet/15', s: 'h-[300px] w-[300px]', p: 'bottom-[-90px] left-[-70px]' },
    ],
    b: [
      { c: 'bg-brand-violet/18', s: 'h-[420px] w-[420px]', p: '-bottom-32 -right-20' },
      { c: 'bg-brand-blue/10', s: 'h-[260px] w-[260px]', p: 'top-[-60px] left-[38%]' },
    ],
    c: [
      { c: 'bg-brand-mint/18', s: 'h-[340px] w-[340px]', p: 'top-[20%] -right-28' },
      { c: 'bg-brand-sky/20', s: 'h-[280px] w-[280px]', p: '-bottom-24 left-[12%]' },
    ],
  }
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {sets[variant].map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${b.c} ${b.s} ${b.p}`}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 9 + i * 2, repeat: Infinity, ease: EASE }}
        />
      ))}
    </div>
  )
}
