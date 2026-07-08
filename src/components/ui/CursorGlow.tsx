'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Soft light that follows the cursor. Desktop (fine pointer) only.
 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 120, damping: 25, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 120, damping: 25, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - 300)
      y.set(e.clientY - 300)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 z-[60] pointer-events-none"
      style={{
        x: sx,
        y: sy,
        width: 600,
        height: 600,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(102,217,212,0.10) 0%, rgba(155,184,240,0.06) 40%, rgba(255,255,255,0) 70%)',
        willChange: 'transform',
      }}
    />
  )
}
