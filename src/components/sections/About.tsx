'use client'

import AnimatedText from '@/components/ui/AnimatedText'
import RevealText from '@/components/ui/RevealText'
import Aurora from '@/components/ui/Aurora'
import { ContactButton } from '@/components/sections/Hero'

const aboutText =
  'ウェブ制作とAI活用で、ビジネスを次のステージへ。シンプルで洗練されたデザインと、わかりやすい提案を大切に。小規模事業者・個人事業主の方の「伝えたい」を形にします。一緒に素晴らしいものをつくりましょう。'

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-canvas flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
    >
      <Aurora variant="light" />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <div style={{ fontSize: 'clamp(2.25rem, 6.5vw, 80px)' }}>
          <RevealText
            as="h2"
            text="About me"
            by="char"
            stagger={0.04}
            className="hero-heading font-display font-bold uppercase leading-none tracking-tight text-center block"
          />
        </div>

        <div style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)' }}>
          <AnimatedText
            text={aboutText}
            className="text-ink font-medium text-center leading-relaxed max-w-[560px]"
          />
        </div>

        <div className="mt-6 sm:mt-10 md:mt-14">
          <ContactButton />
        </div>
      </div>
    </section>
  )
}
