'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeIn from '@/components/ui/FadeIn'
import RevealText from '@/components/ui/RevealText'
import Aurora from '@/components/ui/Aurora'

const inputClass =
  'w-full bg-white/[0.03] border border-accent/20 rounded-xl px-4 py-3 text-surface placeholder:text-muted/40 focus:outline-none focus:border-accent/70 focus:shadow-[0_0_0_3px_rgba(102,217,212,0.12),0_0_24px_rgba(102,217,212,0.15)] transition-[border-color,box-shadow] duration-300'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch('https://formspree.io/f/mwvdjrrz', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className="bg-ink relative z-10 -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 sm:pb-32 md:pb-40 overflow-hidden"
    >
      <Aurora variant="dark" />

      <div className="relative" style={{ fontSize: 'clamp(2.25rem, 6.5vw, 80px)' }}>
        <RevealText
          as="h2"
          text="Contact"
          by="char"
          stagger={0.04}
          className="font-display font-bold uppercase text-center text-surface block"
        />
      </div>

      <FadeIn y={20} delay={0.1} className="relative">
        <p className="text-center text-muted leading-relaxed mt-6 mb-14 sm:mb-16 md:mb-20 px-4">
          ホームページのこと、AI活用のこと、
          <br className="sm:hidden" />
          まだ漠然としたイメージでも大丈夫です。
          <br />
          お気軽にご相談ください。
        </p>
      </FadeIn>

      <FadeIn y={30} delay={0.15} className="relative">
        <div className="max-w-2xl mx-auto glass-panel-dark rounded-[32px] p-6 sm:p-10 md:p-12">
          {status === 'success' ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="aurora-text font-display font-medium"
                style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)' }}
              >
                送信が完了しました。
              </p>
              <p className="text-muted mt-4">
                お問い合わせありがとうございます。3営業日以内にご連絡いたします。
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block text-surface text-sm font-medium mb-2 uppercase tracking-widest">
                  お名前
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="山田 太郎"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-surface text-sm font-medium mb-2 uppercase tracking-widest">
                  メールアドレス
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="taro@example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-surface text-sm font-medium mb-2 uppercase tracking-widest">
                  ご用件
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="ご相談内容をお聞かせください..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm">
                  送信に失敗しました。時間をおいてもう一度お試しください。
                </p>
              )}

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                className="self-start rounded-full bg-accent text-ink font-medium uppercase tracking-widest px-10 py-3.5 text-sm disabled:opacity-50"
                whileHover={{
                  scale: 1.04,
                  boxShadow: '0 0 32px rgba(102,217,212,0.5)',
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                {status === 'sending' ? '送信中...' : '送信する'}
              </motion.button>
            </form>
          )}
        </div>
      </FadeIn>

      <FadeIn y={20} delay={0.3} className="relative">
        <p className="text-center text-muted text-sm mt-20 sm:mt-28 md:mt-36 uppercase tracking-widest">
          © {new Date().getFullYear()} Niko Studio. All rights reserved.
        </p>
      </FadeIn>
    </section>
  )
}
