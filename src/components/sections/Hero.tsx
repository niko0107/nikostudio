'use client'

import { useRef } from 'react'
import Image from 'next/image'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import FadeIn from '@/components/ui/FadeIn'
import RevealText from '@/components/ui/RevealText'
import Aurora from '@/components/ui/Aurora'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Price' },
  { href: '#works', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export function ContactButton({ className }: { className?: string }) {
  return (
    <motion.a
      href="#contact"
      className={`group relative inline-block overflow-hidden rounded-full text-white font-medium uppercase tracking-widest px-7 py-2.5 sm:px-9 sm:py-3 md:px-10 md:py-3.5 text-xs sm:text-sm ${className ?? ''}`}
      style={{
        backgroundColor: '#183232',
        boxShadow: '0 6px 20px rgba(24,50,50,0.18)',
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0 10px 28px rgba(24,50,50,0.25)',
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* sheen sweep on hover */}
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
        style={{
          background:
            'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
        }}
      />
      <span className="relative">Contact Me</span>
    </motion.a>
  )
}

function RotatableLaptop() {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 70, damping: 11 })
  const sry = useSpring(ry, { stiffness: 70, damping: 11 })

  return (
    <motion.div
      className="cursor-grab active:cursor-grabbing select-none"
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
        // 横パンで回転、縦スワイプはスクロールに残す
        touchAction: 'pan-y',
        willChange: 'transform',
      }}
      onPan={(_, info) => {
        ry.set(Math.max(-45, Math.min(45, ry.get() + info.delta.x * 0.35)))
        rx.set(Math.max(-25, Math.min(25, rx.get() - info.delta.y * 0.25)))
      }}
      onPanEnd={() => {
        rx.set(0)
        ry.set(0)
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src="/laptop-floating.png"
        alt="Laptop"
        width={680}
        height={440}
        className="w-full h-auto drop-shadow-2xl pointer-events-none"
        priority
        draggable={false}
      />
    </motion.div>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  // parallax: laptop drifts down slower than scroll, heading drifts up
  const laptopY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="h-screen flex flex-col bg-canvas relative"
      style={{ overflowX: 'clip' }}
    >
      <Aurora variant="light" />

      {/* Nav */}
      <FadeIn y={-20} delay={0}>
        <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 z-20 relative">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-muted font-medium uppercase tracking-wider text-sm md:text-base lg:text-lg transition-colors duration-300 hover:text-ink"
            >
              {link.label}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out bg-accent"
              />
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Heading — centered, two-line clip reveal */}
      <motion.div
        style={{ y: headingY }}
        className="relative z-10 text-center mt-8 sm:mt-10 md:mt-12 px-4"
      >
        <div style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.15rem)' }}>
          <RevealText
            as="p"
            text="Hello, this is"
            by="char"
            delay={0.2}
            stagger={0.03}
            className="text-muted font-medium uppercase tracking-[0.35em] block mb-2 sm:mb-3"
          />
        </div>
        <div style={{ fontSize: 'clamp(2.5rem, 8.5vw, 7.25rem)' }}>
          <RevealText
            as="h1"
            text="Niko Studio"
            by="char"
            delay={0.4}
            stagger={0.05}
            className="hero-heading font-display font-bold uppercase tracking-tight leading-none whitespace-nowrap block"
          />
        </div>
      </motion.div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom bar */}
      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 relative z-20">
        <FadeIn y={20} delay={0.55}>
          <p
            className="text-muted font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1vw, 1rem)' }}
          >
            a web &amp; ai studio crafting striking digital experiences
          </p>
        </FadeIn>

        <FadeIn y={20} delay={0.7}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* Center: laptop — fixed center, drag to rotate in 3D */}
      <motion.div
        style={{ y: laptopY, opacity: fadeOut }}
        className="absolute left-1/2 -translate-x-1/2 z-10 top-[55%] -translate-y-1/2 w-[320px] sm:w-[440px] md:w-[560px] lg:w-[680px]"
      >
        <FadeIn y={30} delay={0.9}>
          {/* glow halo */}
          <div
            aria-hidden
            className="absolute inset-[-18%] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(102,217,212,0.3) 0%, rgba(155,184,240,0.15) 45%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
          <RotatableLaptop />
        </FadeIn>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 hidden md:block"
        style={{ opacity: fadeOut }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <span className="text-muted text-[0.65rem] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <div className="w-[1px] h-10 bg-ink/15 overflow-hidden">
            <motion.div
              className="w-full h-1/2 bg-accent"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
