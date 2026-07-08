'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

const faqs = [
  {
    q: '初めてホームページを作ります。',
    a: 'ご安心ください。ヒアリングから丁寧にサポートいたします。専門用語もわかりやすく説明します。',
  },
  {
    q: 'オンラインだけで完結できますか？',
    a: 'はい、全国どこからでもオンラインで対応しております。打ち合わせはビデオ通話またはチャットで行います。',
  },
  {
    q: 'AI業務効率化とは何ですか？',
    a: '日々の業務をAIツールや自動化の仕組みを使って効率化することです。まずはお気軽にご相談ください。',
  },
  {
    q: '相談だけでも大丈夫ですか？',
    a: 'もちろんです。「まだ検討段階」「何から始めればいいかわからない」という方もお気軽にどうぞ。',
  },
  {
    q: '制作期間はどのくらいですか？',
    a: '内容によりますが、ホームページ制作は通常2〜4週間程度です。お急ぎの場合はご相談ください。',
  },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <AnimatedSection delay={index * 0.05}>
      <div className="border-b border-ink/8">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-6 text-left gap-4"
          aria-expanded={open}
        >
          <span className="font-medium text-ink">{q}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 text-muted"
            aria-hidden
          >
            <ChevronDown size={20} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="pb-6 text-body-md text-muted">{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-32 md:py-40 lg:py-48 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>よくあるご質問</SectionLabel>
          <h2 className="mt-4 text-display-md font-display text-ink">
            ご不明な点がございましたら
          </h2>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          <div className="border-t border-ink/8">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
