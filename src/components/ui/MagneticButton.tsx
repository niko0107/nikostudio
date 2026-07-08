'use client'

import { type MouseEvent } from 'react'
import { motion, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit'
}

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  type = 'button',
}: MagneticButtonProps) {
  const x = useSpring(0, { stiffness: 300, damping: 25 })
  const y = useSpring(0, { stiffness: 300, damping: 25 })

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = (e.clientX - rect.left - rect.width / 2) * 0.4
    const offsetY = (e.clientY - rect.top - rect.height / 2) * 0.4
    x.set(Math.max(-8, Math.min(8, offsetX)))
    y.set(Math.max(-8, Math.min(8, offsetY)))
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const commonProps = {
    style: { x, y } as React.CSSProperties & { x: typeof x; y: typeof y },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className,
  }

  if (href) {
    return (
      <motion.a href={href} {...commonProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} onClick={onClick} {...commonProps}>
      {children}
    </motion.button>
  )
}
