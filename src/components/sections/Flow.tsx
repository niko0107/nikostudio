'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

const steps = [
  {
    number: '01',
    title: 'お問い合わせ',
    description: 'フォームまたはメールでお気軽にご連絡ください。',
  },
  {
    number: '02',
    title: 'ヒアリング',
    description: 'ご要望・ご予算・スケジュールをオンラインでお聞きします。',
  },
  {
    number: '03',
    title: 'お見積り',
    description: '内容をもとに、わかりやすいお見積りをご提案します。',
  },
  {
    number: '04',
    title: '制作・ご提案',
    description: 'デザインを制作し、確認していただきながら進めます。',
  },
  {
    number: '05',
    title: '修正・調整',
    description: 'ご意見をもとに、細部を丁寧に調整します。',
  },
  {
    number: '06',
    title: '公開・納品',
    description: '完成後、公開・納品いたします。',
  },
]

export default function Flow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.7'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="flow" className="py-32 md:py-40 lg:py-48 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-20">
          <SectionLabel>ご依頼の流れ</SectionLabel>
          <h2 className="mt-4 text-display-md font-display text-ink">
            ご依頼から納品まで
          </h2>
        </AnimatedSection>

        <div ref={containerRef} className="relative max-w-2xl mx-auto">
          {/* Background timeline line */}
          <div
            className="absolute left-5 top-5 w-px bg-ink/8"
            style={{ height: 'calc(100% - 2.5rem)' }}
            aria-hidden
          />
          {/* Animated foreground line */}
          <motion.div
            className="absolute left-5 top-5 w-px bg-accent origin-top"
            style={{
              scaleY,
              height: 'calc(100% - 2.5rem)',
            }}
            aria-hidden
          />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 0.06}>
                <div className="flex items-start gap-8">
                  <div className="relative flex-shrink-0 z-10">
                    <div className="w-10 h-10 bg-surface border-2 border-accent/60 rounded-full flex items-center justify-center">
                      <span className="text-[11px] font-bold text-accent">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  <div className="pb-14 pt-1.5">
                    <h3 className="font-medium text-ink text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-body-md text-muted">{step.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
