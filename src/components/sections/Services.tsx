'use client'

import { motion } from 'framer-motion'
import FadeIn from '@/components/ui/FadeIn'
import RevealText from '@/components/ui/RevealText'

const services = [
  {
    num: '01',
    name: 'ホームページ制作',
    price: '¥49,800〜',
    desc: '企業・店舗・個人事業主向けのレスポンシブ対応ウェブサイトを制作します。SEO基本設定・お問い合わせフォーム・SNS連携を含みます。',
  },
  {
    num: '02',
    name: 'ランディングページ',
    price: '¥29,800〜',
    desc: '商品・採用・イベントなど、ひとつのゴールに特化したコンバージョン重視のランディングページを制作します。',
  },
  {
    num: '03',
    name: 'AI業務効率化',
    price: '要相談',
    desc: 'AIツールや自動化の仕組みを活用し、日々の業務をスマートに改善します。ヒアリングから提案・導入まで一貫サポート。',
  },
  {
    num: '04',
    name: '保守・運用サポート',
    price: '要相談',
    desc: '公開後のサイト管理・コンテンツ更新・技術サポートを継続的に提供します。',
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="bg-white relative z-10 -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* subtle top light */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(102,217,212,0.12) 0%, transparent 65%)',
        }}
      />
      <div className="noise-overlay" />

      <div style={{ fontSize: 'clamp(2.25rem, 6.5vw, 80px)' }}>
        <RevealText
          as="h2"
          text="Services"
          by="char"
          stagger={0.04}
          className="font-display font-bold uppercase text-center text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28 block"
        />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {services.map((s, i) => (
          <FadeIn key={s.num} delay={i * 0.08}>
            <motion.div
              className="group relative flex gap-6 md:gap-10 items-start py-8 sm:py-10 md:py-12 border-t border-[rgba(12,12,12,0.15)] last:border-b px-4 sm:px-6 md:px-8 -mx-4 sm:-mx-6 md:-mx-8 rounded-3xl"
              initial="rest"
              whileHover="hover"
            >
              {/* hover wash */}
              <motion.div
                aria-hidden
                className="absolute inset-2 rounded-3xl pointer-events-none"
                variants={{
                  rest: { opacity: 0 },
                  hover: { opacity: 1 },
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background:
                    'linear-gradient(100deg, rgba(102,217,212,0.08) 0%, rgba(155,184,240,0.06) 60%, transparent 100%)',
                }}
              />

              {/* Number */}
              <motion.span
                className="font-display font-bold leading-none text-[#0C0C0C]/20 flex-shrink-0 relative"
                style={{ fontSize: 'clamp(2rem, 5vw, 64px)' }}
                variants={{
                  rest: { x: 0, opacity: 1 },
                  hover: { x: 8, opacity: 0.85 },
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {s.num}
              </motion.span>

              {/* Content */}
              <div className="pt-2 flex-1 relative">
                <div className="flex items-center gap-3">
                  <motion.p
                    className="font-medium uppercase text-[#0C0C0C] leading-tight"
                    style={{ fontSize: 'clamp(1rem, 1.7vw, 1.5rem)' }}
                    variants={{
                      rest: { x: 0 },
                      hover: { x: 6 },
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {s.name}
                  </motion.p>
                  {/* arrow appears on hover */}
                  <motion.span
                    aria-hidden
                    className="text-accent hidden md:inline-block"
                    style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)' }}
                    variants={{
                      rest: { opacity: 0, x: -12 },
                      hover: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    →
                  </motion.span>
                </div>
                <p
                  className="font-light leading-relaxed text-[#0C0C0C] opacity-60 max-w-2xl mt-2"
                  style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1.05rem)' }}
                >
                  {s.desc}
                </p>
                <motion.span
                  className="inline-block mt-3 border border-[rgba(12,12,12,0.3)] rounded-full px-3 py-1 text-sm font-medium text-[#0C0C0C]"
                  variants={{
                    rest: { backgroundColor: 'rgba(102,217,212,0)' },
                    hover: { backgroundColor: 'rgba(102,217,212,0.18)' },
                  }}
                  transition={{ duration: 0.35 }}
                >
                  {s.price}
                </motion.span>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
