'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { staggerContainer, fadeUp } from '@/lib/animations'

const plans = [
  {
    name: 'ホームページ制作',
    price: '¥19,800',
    suffix: '〜',
    priceNote: '税込',
    items: [
      'レスポンシブ対応',
      'お問い合わせフォーム',
      'SEO基本設定',
      'SNS連携',
      '修正2回まで含む',
    ],
    featured: false,
  },
  {
    name: 'ランディングページ',
    price: '¥29,800',
    suffix: '〜',
    priceNote: '税込',
    items: [
      '1ページ完結',
      'コピーライティング相談',
      'CVR最適化',
      '修正2回まで含む',
    ],
    featured: true,
    badge: '人気',
  },
  {
    name: 'AI業務効率化',
    price: '要相談',
    suffix: '',
    priceNote: 'まずはお気軽に',
    items: [
      'ヒアリングから提案まで',
      'ツール選定',
      '運用サポート',
      '継続サポート相談可',
    ],
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 md:py-40 lg:py-48 bg-canvas">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>料金</SectionLabel>
          <h2 className="mt-4 text-display-md font-display text-ink">
            シンプルな料金体系
          </h2>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid lg:grid-cols-3 gap-6 mb-8"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              whileHover={
                !plan.featured
                  ? {
                      borderColor: 'rgba(102,217,212,0.35)',
                      boxShadow: '0 8px 32px rgba(24,50,50,0.08)',
                      transition: { duration: 0.3 },
                    }
                  : {}
              }
              className={`relative bg-surface rounded-2xl p-8 border transition-all ${
                plan.featured
                  ? 'border-accent/40 shadow-[0_4px_32px_rgba(102,217,212,0.15)]'
                  : 'border-ink/8'
              }`}
              style={
                !plan.featured
                  ? { boxShadow: '0 1px 3px rgba(24,50,50,0.04)' }
                  : undefined
              }
            >
              {plan.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-ink text-caption font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                  {plan.badge}
                </span>
              )}

              <p className="text-caption text-muted tracking-[0.12em] mb-4">
                {plan.name}
              </p>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-display text-display-lg text-ink">
                  {plan.price}
                </span>
                {plan.suffix && (
                  <span className="text-muted text-xl">{plan.suffix}</span>
                )}
              </div>
              <p className="text-caption text-muted mb-8">{plan.priceNote}</p>

              <ul className="space-y-3 mb-8">
                {plan.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-body-md text-ink"
                  >
                    <Check
                      size={16}
                      className="text-accent flex-shrink-0 mt-0.5"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="group inline-flex items-center gap-1.5 text-accent text-sm font-medium hover:gap-2.5 transition-all duration-200"
              >
                相談してみる
                <span aria-hidden>→</span>
              </a>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection>
          <p className="text-center text-caption text-muted">
            ※ 表示価格はすべて税込です。内容により別途お見積りとなる場合があります。
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
