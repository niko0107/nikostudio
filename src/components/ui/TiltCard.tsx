'use client'

import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  /** max tilt in degrees */
  max?: number
  /** show a light sheen that follows the cursor */
  glare?: boolean
}

/**
 * 3D tilt on hover with an optional cursor-following sheen.
 * Fine-pointer only by nature (mouse events); no-op on touch.
 */
export default function TiltCard({
  children,
  className,
  max = 6,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const srx = useSpring(rx, { stiffness: 200, damping: 20 })
  const sry = useSpring(ry, { stiffness: 200, damping: 20 })
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 55%)`

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    ry.set((px - 0.5) * 2 * max)
    rx.set(-(py - 0.5) * 2 * max)
    gx.set(px * 100)
    gy.set(py * 100)
  }

  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
        willChange: 'transform',
      }}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  )
}
