import type { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

export const cardHover: Variants = {
  rest: {
    y: 0,
    boxShadow:
      '0 1px 3px rgba(24,50,50,0.04), 0 4px 16px rgba(24,50,50,0.04)',
  },
  hover: {
    y: -4,
    boxShadow:
      '0 8px 32px rgba(24,50,50,0.1), 0 4px 16px rgba(24,50,50,0.06)',
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
}
