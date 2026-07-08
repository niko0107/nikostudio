'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface RevealTextProps {
  text: string
  className?: string
  /** split unit — chars for short headings, words for sentences */
  by?: 'char' | 'word'
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'p' | 'span'
}

/**
 * Clip-reveal text: each unit slides up from behind an overflow mask.
 * The signature "premium" heading animation.
 */
export default function RevealText({
  text,
  className,
  by = 'char',
  delay = 0,
  stagger = 0.035,
  as: Tag = 'span',
}: RevealTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const units = by === 'char' ? text.split('') : text.split(' ')

  return (
    <Tag className={className} aria-label={text}>
      <span ref={ref} aria-hidden className="inline">
        {units.map((unit, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            style={{ whiteSpace: 'pre' }}
          >
            <motion.span
              className="inline-block"
              initial={{ y: '110%' }}
              animate={isInView ? { y: '0%' } : { y: '110%' }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + i * stagger,
              }}
            >
              {by === 'word' && i < units.length - 1 ? unit + ' ' : unit}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
