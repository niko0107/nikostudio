'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

const row1Images = [
  '/marquee/space-voyage.jpg',
  '/marquee/codenest.jpg',
  '/marquee/vex-ventures.jpg',
  '/marquee/stellar-ai-v2.jpg',
  '/marquee/asme.jpg',
  '/marquee/transform-data.jpg',
  '/marquee/vitara.jpg',
  '/marquee/terra.jpg',
  '/marquee/skyelite.jpg',
  '/marquee/aethera.jpg',
  '/marquee/designpro.jpg',
]

const row2Images = [
  '/marquee/stellar-ai.jpg',
  '/marquee/xportfolio.jpg',
  '/marquee/orbit-web3.jpg',
  '/marquee/nexora.jpg',
  '/marquee/evr-ventures.jpg',
  '/marquee/planet-orbit.jpg',
  '/marquee/new-era.jpg',
  '/marquee/wealth.jpg',
  '/marquee/luminex.jpg',
  '/marquee/celestia.jpg',
]

const tripled1 = [...row1Images, ...row1Images, ...row1Images]
const tripled2 = [...row2Images, ...row2Images, ...row2Images]

export default function Marquee() {
  const sectionRef = useRef<HTMLElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      const el = sectionRef.current
      if (!el || !row1Ref.current || !row2Ref.current) return
      const sectionTop = el.getBoundingClientRect().top + window.scrollY
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      row1Ref.current.style.transform = `translate3d(${offset - 200}px, 0, 0)`
      row2Ref.current.style.transform = `translate3d(${-(offset - 200)}px, 0, 0)`
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-canvas overflow-hidden pt-24 sm:pt-32 md:pt-40 pb-10"
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
    >
      <div className="flex flex-col gap-3">
        {/* Row 1 — moves right */}
        <div ref={row1Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
          {tripled1.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt=""
              width={340}
              height={218}
              sizes="340px"
              className="rounded-2xl object-cover flex-shrink-0 transition-[transform,box-shadow] duration-500 ease-out hover:scale-[1.03] hover:shadow-[0_16px_48px_rgba(24,50,50,0.18)]"
              style={{ width: 340, height: 218 }}
            />
          ))}
        </div>

        {/* Row 2 — moves left */}
        <div ref={row2Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
          {tripled2.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt=""
              width={340}
              height={218}
              sizes="340px"
              className="rounded-2xl object-cover flex-shrink-0 transition-[transform,box-shadow] duration-500 ease-out hover:scale-[1.03] hover:shadow-[0_16px_48px_rgba(24,50,50,0.18)]"
              style={{ width: 340, height: 218 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
