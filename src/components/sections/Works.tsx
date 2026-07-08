'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import RevealText from '@/components/ui/RevealText'
import TiltCard from '@/components/ui/TiltCard'
import Aurora from '@/components/ui/Aurora'

const TOTAL = 2

const projects = [
  {
    num: '01',
    category: 'Hair Salon',
    name: 'Bloom Hair Salon',
    href: '/works/bloom',
    images: ['/bloom-wash.jpg', '/bloom-reception.jpg', '/bloom-styling.jpg'],
    positions: ['object-center', 'object-left', 'object-center'],
  },
  {
    num: '02',
    category: 'Italian Restaurant',
    name: 'Trattoria Sole',
    href: '/works/trattoria',
    images: ['/trattoria-carbonara.jpg', '/trattoria-kitchen.jpg', '/trattoria-dining.jpg'],
    positions: ['object-center', 'object-center', 'object-center'],
  },
]

function ImagePanel({
  src,
  alt,
  position,
  height,
}: {
  src: string
  alt: string
  position?: string
  height: string
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-[18px] sm:rounded-[22px] md:rounded-[26px]"
      style={{ height }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${position ?? ''} transition-transform duration-700 ease-out group-hover:scale-[1.06]`}
      />
      {/* hover light sweep */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'linear-gradient(120deg, rgba(102,217,212,0.12) 0%, transparent 50%)',
        }}
      />
    </div>
  )
}

function StickyCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end start'],
  })
  const targetScale = 1 - (TOTAL - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])
  const topPx = 24 + index * 28

  return (
    <div ref={outerRef} className="h-[85vh]">
      <div className="sticky" style={{ top: topPx }}>
        <motion.div style={{ scale }}>
          <TiltCard
            max={2}
            className="relative rounded-[28px] sm:rounded-[32px] md:rounded-[40px] border border-ink/10 bg-white p-4 sm:p-6 md:p-8"
          >
            {/* soft shadow */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-[inherit] pointer-events-none"
              style={{
                boxShadow: '0 16px 56px rgba(24,50,50,0.10)',
              }}
            />

            {/* Top row */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4 sm:mb-6">
              {/* Number */}
              <span
                className="font-display font-bold leading-none text-ink/15"
                style={{ fontSize: 'clamp(2rem, 5vw, 60px)' }}
              >
                {project.num}
              </span>

              {/* Title block */}
              <div className="flex flex-col flex-1 px-4">
                <span className="text-muted text-caption uppercase tracking-widest">
                  {project.category}
                </span>
                <span
                  className="text-ink font-display font-medium"
                  style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)' }}
                >
                  {project.name}
                </span>
              </div>

              {/* Live button */}
              {project.href ? (
                <motion.a
                  href={project.href}
                  className="relative overflow-hidden rounded-full border border-ink/20 text-ink font-medium uppercase tracking-widest px-5 py-2 sm:px-7 sm:py-2.5 text-xs sm:text-sm"
                  whileHover={{
                    scale: 1.03,
                    backgroundColor: 'rgba(24,50,50,0.05)',
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                >
                  Live Project
                </motion.a>
              ) : (
                <span className="rounded-full border border-ink/15 text-ink/35 font-medium uppercase tracking-widest px-5 py-2 sm:px-7 sm:py-2.5 text-xs sm:text-sm cursor-default">
                  Coming Soon
                </span>
              )}
            </div>

            {/* Image grid */}
            <div className="flex gap-3 sm:gap-4">
              {/* Left col: 2 stacked */}
              <div className="flex flex-col gap-3 sm:gap-4" style={{ width: '40%' }}>
                <ImagePanel
                  src={project.images[0]}
                  alt={project.name}
                  position={project.positions[0]}
                  height="clamp(110px, 12vw, 170px)"
                />
                <ImagePanel
                  src={project.images[1]}
                  alt={project.name}
                  position={project.positions[1]}
                  height="clamp(140px, 17vw, 250px)"
                />
              </div>

              {/* Right col: 1 tall */}
              <div className="flex-1">
                <ImagePanel
                  src={project.images[2]}
                  alt={project.name}
                  position={project.positions[2]}
                  height="clamp(260px, 30vw, 440px)"
                />
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </div>
  )
}

export default function Works() {
  return (
    <section
      id="works"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32 sm:pb-40 md:pb-48"
      style={{ backgroundColor: '#D9EDF7' }}
    >
      <Aurora variant="light" />

      <div className="relative" style={{ fontSize: 'clamp(2.25rem, 6.5vw, 80px)' }}>
        <RevealText
          as="h2"
          text="Projects"
          by="char"
          stagger={0.04}
          className="hero-heading font-display font-bold uppercase text-center mb-16 sm:mb-20 md:mb-28 block"
        />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {projects.map((p, i) => (
          <StickyCard key={p.num} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
