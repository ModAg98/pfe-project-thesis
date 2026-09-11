import { motion, type Transition } from 'framer-motion'
import type { ReactNode } from 'react'

export const EASE = [0.22, 0.61, 0.36, 1] as const
export const T = (d = 0.6, delay = 0): Transition => ({ duration: d, delay, ease: EASE })

/* -------------------------------------------------------------------------- */
/*  Layout                                                                     */
/* -------------------------------------------------------------------------- */

export function Section({
  children,
  className = '',
  padded = true,
  tone = 'white',
}: {
  children: ReactNode
  className?: string
  padded?: boolean
  tone?: 'white' | 'soft' | 'brand'
}) {
  const tones = {
    white: 'bg-white',
    soft: 'bg-surface-soft',
    brand: 'bg-brand-grad',
  }
  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden ${tones[tone]} ${
        padded ? 'px-[88px] pb-[84px] pt-[58px]' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

/** The geometric chevron motif, echoing the school/company deck identity. */
export function Chevrons({
  corner = 'tl',
  className = '',
}: {
  corner?: 'tl' | 'tr'
  className?: string
}) {
  const flip = corner === 'tr'
  return (
    <svg
      className={`pointer-events-none absolute ${flip ? 'right-0' : 'left-0'} top-0 ${className}`}
      width="420"
      height="168"
      viewBox="0 0 420 168"
      fill="none"
      aria-hidden
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path d="M0 0h150l84 168H84z" fill="#17287E" />
      <path d="M126 0h150l84 168H210z" fill="#9A66D9" />
      <path d="M262 0h158v44H284z" fill="#6FBCEB" />
    </svg>
  )
}

export function Kicker({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`kicker ${className}`}>{children}</div>
}

export function TitleBlock({
  kicker,
  title,
  lead,
  align = 'left',
  size = 'lg',
  invert = false,
}: {
  kicker?: ReactNode
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  size?: 'md' | 'lg' | 'xl'
  invert?: boolean
}) {
  const sizes = {
    md: 'text-[40px] leading-[1.1]',
    lg: 'text-[52px] leading-[1.06]',
    xl: 'text-[64px] leading-[1.03]',
  }
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      {kicker && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={T(0.45)} className="mb-3">
          <Kicker className={invert ? '!text-white/75' : ''}>{kicker}</Kicker>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={T(0.6, 0.05)}
        className={`max-w-[1120px] font-extrabold tracking-[-0.025em] text-balance ${sizes[size]} ${
          invert ? 'text-white' : 'text-brand-navy'
        } ${align === 'center' ? 'mx-auto' : ''}`}
      >
        {title}
      </motion.h2>
      {lead && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={T(0.6, 0.14)}
          className={`mt-4 max-w-[820px] text-[19px] leading-relaxed text-balance ${
            invert ? 'text-white/85' : 'text-ink-500'
          } ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {lead}
        </motion.p>
      )}
    </div>
  )
}

/** Progressive disclosure helper. */
export function Reveal({
  when = true,
  delay = 0,
  y = 16,
  x = 0,
  duration = 0.55,
  className = '',
  children,
}: {
  when?: boolean
  delay?: number
  y?: number
  x?: number
  duration?: number
  className?: string
  children: ReactNode
}) {
  return (
    <motion.div
      className={className}
      initial={false}
      animate={when ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
      transition={T(duration, delay)}
      style={{ pointerEvents: when ? 'auto' : 'none' }}
    >
      {children}
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Content atoms                                                              */
/* -------------------------------------------------------------------------- */

export function Stat({
  value,
  unit,
  label,
  tone = 'brand',
  className = '',
}: {
  value: ReactNode
  unit?: string
  label: string
  tone?: 'brand' | 'violet' | 'good' | 'bad' | 'sky'
  className?: string
}) {
  const tones = {
    brand: 'text-brand-blue',
    violet: 'text-brand-violet',
    good: 'text-signal-good',
    bad: 'text-signal-bad',
    sky: 'text-brand-sky',
  }
  return (
    <div className={`card flex flex-col justify-center px-7 py-6 ${className}`}>
      <div className="flex items-baseline gap-1">
        <span className={`text-[46px] font-extrabold leading-none tracking-tight ${tones[tone]}`}>{value}</span>
        {unit && <span className={`text-[22px] font-bold ${tones[tone]}`}>{unit}</span>}
      </div>
      <div className="mt-2.5 text-[14px] font-medium leading-snug text-ink-500">{label}</div>
    </div>
  )
}

export function Pill({
  children,
  tone = 'brand',
}: {
  children: ReactNode
  tone?: 'brand' | 'violet' | 'sky' | 'good' | 'bad' | 'warn' | 'ghost'
}) {
  const tones = {
    brand: 'bg-brand-blue/10 text-brand-blue',
    violet: 'bg-brand-violet/12 text-brand-violet',
    sky: 'bg-brand-sky/20 text-[#1B7FB8]',
    good: 'bg-signal-good/12 text-signal-good',
    bad: 'bg-signal-bad/12 text-signal-bad',
    warn: 'bg-signal-warn/14 text-[#B9710F]',
    ghost: 'bg-surface-soft text-ink-500',
  }
  return <span className={`chip ${tones[tone]}`}>{children}</span>
}

export function Callout({
  tone = 'brand',
  title,
  children,
  className = '',
}: {
  tone?: 'brand' | 'violet' | 'good' | 'warn' | 'bad'
  title?: ReactNode
  children?: ReactNode
  className?: string
}) {
  const tones = {
    brand: 'border-brand-blue/25 bg-brand-blue/[0.05]',
    violet: 'border-brand-violet/25 bg-brand-violet/[0.06]',
    good: 'border-signal-good/30 bg-signal-good/[0.07]',
    warn: 'border-signal-warn/35 bg-signal-warn/[0.08]',
    bad: 'border-signal-bad/30 bg-signal-bad/[0.06]',
  }
  return (
    <div className={`rounded-2xl border-2 px-7 py-5 ${tones[tone]} ${className}`}>
      {title && <div className="mb-1.5 text-[17px] font-bold text-brand-navy">{title}</div>}
      {children && <div className="text-[15px] leading-relaxed text-ink-700">{children}</div>}
    </div>
  )
}

export function Term({ children }: { children: ReactNode }) {
  return <span className="font-bold text-brand-violet">{children}</span>
}

export function Check({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white ${
        ok ? 'bg-signal-good' : 'bg-signal-bad'
      }`}
    >
      {ok ? '✓' : '✕'}
    </span>
  )
}

/** Numbered step badge with the deck's geometric feel. */
export function StepBadge({ n, tone = 'brand' }: { n: ReactNode; tone?: 'brand' | 'violet' | 'sky' }) {
  const tones = {
    brand: 'bg-brand-blue',
    violet: 'bg-brand-violet',
    sky: 'bg-brand-sky',
  }
  return (
    <span
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[15px] font-extrabold text-white ${tones[tone]}`}
    >
      {n}
    </span>
  )
}

export function LogoSlot({
  label,
  src,
  className = '',
}: {
  label: string
  src: string | null
  className?: string
}) {
  if (src) return <img src={src} alt={label} className={`object-contain ${className}`} />
  return (
    <div
      className={`flex items-center justify-center rounded-xl border-2 border-dashed border-brand-blue/30 bg-brand-blue/[0.04] px-4 text-center font-mono text-[10px] font-semibold uppercase tracking-armor text-brand-blue/70 ${className}`}
    >
      {label}
    </div>
  )
}
