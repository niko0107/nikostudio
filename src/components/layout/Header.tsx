'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'

const navLinks = [
  { href: '#services', label: 'サービス' },
  { href: '#works', label: '実績' },
  { href: '#pricing', label: '料金' },
  { href: '#faq', label: 'よくある質問' },
  { href: '#contact', label: 'お問い合わせ' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-surface/85 backdrop-blur-md shadow-[0_1px_0_rgba(24,50,50,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            className="font-display font-medium text-ink text-xl tracking-[-0.01em]"
          >
            Niko Studio
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="メインナビゲーション">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-ink transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <MagneticButton
              href="#contact"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-ink text-white text-sm rounded-full hover:bg-ink/90 transition-colors duration-200 font-medium"
            >
              無料相談する
            </MagneticButton>

            <button
              className="md:hidden p-2 -mr-2 text-ink"
              onClick={() => setMobileOpen(true)}
              aria-label="メニューを開く"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-canvas flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-14 border-b border-ink/8">
              <a
                href="#"
                className="font-display font-medium text-ink text-xl"
                onClick={() => setMobileOpen(false)}
              >
                Niko Studio
              </a>
              <button
                className="p-2 -mr-2 text-ink"
                onClick={() => setMobileOpen(false)}
                aria-label="メニューを閉じる"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center flex-1 gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-2xl font-display text-ink hover:text-accent transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.1 }}
              >
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 inline-flex px-8 py-3 bg-ink text-white rounded-full font-medium"
                >
                  無料相談する
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
