import { useEffect, useRef, useState, type ReactNode } from 'react'

export const STAGE_W = 1600
export const STAGE_H = 900

/**
 * Scales a fixed 16:9 design canvas to fit the viewport. Guarantees identical
 * composition on any projector, and keeps every layout value deterministic.
 */
export function Stage({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const compute = () => {
      const el = wrapRef.current
      if (!el) return
      const { width, height } = el.getBoundingClientRect()
      setScale(Math.min(width / STAGE_W, height / STAGE_H))
    }
    compute()
    const ro = new ResizeObserver(compute)
    if (wrapRef.current) ro.observe(wrapRef.current)
    window.addEventListener('resize', compute)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', compute)
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative h-full w-full overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </div>
    </div>
  )
}
