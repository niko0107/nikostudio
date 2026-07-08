'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Menu, X, MapPin, Clock, Phone, ArrowLeft, Check, AtSign } from 'lucide-react'

// ─── Shared fade-up helper ────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Salon data ───────────────────────────────────────────────────────────────
const navLinks = [
  { href: '#concept', label: 'コンセプト' },
  { href: '#menu', label: 'メニュー' },
  { href: '#gallery', label: 'ギャラリー' },
  { href: '#access', label: 'アクセス' },
]

const menuCategories = [
  {
    name: 'カット',
    items: [
      { name: 'カット', price: '¥6,600〜' },
      { name: 'カット＋シャンプー・ブロー', price: '¥7,700〜' },
    ],
  },
  {
    name: 'カラー',
    items: [
      { name: 'フルカラー', price: '¥11,000〜' },
      { name: 'ハイライト・バレイヤージュ', price: '¥16,500〜' },
      { name: 'グレイカラー', price: '¥12,100〜' },
    ],
  },
  {
    name: 'パーマ・縮毛矯正',
    items: [
      { name: 'デジタルパーマ', price: '¥17,600〜' },
      { name: '縮毛矯正', price: '¥22,000〜' },
    ],
  },
  {
    name: 'トリートメント',
    items: [
      { name: 'ダメージケアトリートメント', price: '¥5,500〜' },
      { name: 'ヘッドスパ（60分）', price: '¥8,800〜' },
    ],
  },
]

const features = [
  '完全予約制・プライベート空間',
  '厳選した薬剤・オーガニック製品を使用',
  'カウンセリングに十分なお時間',
  '全国対応のオンライン予約',
]

// ─── Page component ───────────────────────────────────────────────────────────
export default function BloomPage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  // Track scroll for header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#FDF5F5] text-[#3D2525] font-sans">

      {/* ── Demo badge ─────────────────────────────────────── */}
      <Link
        href="/#works"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#C07880]/20 rounded-full px-4 py-2 text-xs text-[#C07880] hover:bg-white transition-colors shadow-sm"
      >
        <ArrowLeft size={12} />
        Niko Studio 制作サンプル
      </Link>

      {/* ── Header ─────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(192,120,128,0.08)]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-display text-xl font-medium text-[#3D2525] tracking-wider">
            Bloom
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-[#8A6060] hover:text-[#3D2525] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#reserve"
              className="hidden md:inline-flex px-5 py-2 rounded-full border border-[#C07880] text-[#C07880] text-sm hover:bg-[#C07880] hover:text-white transition-all duration-200"
            >
              ご予約
            </a>
            <button
              className="md:hidden p-2 text-[#3D2525]"
              onClick={() => setMobileOpen(true)}
              aria-label="メニューを開く"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#FDF5F5] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16">
              <span className="font-display text-xl font-medium text-[#3D2525]">Bloom</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2"
                aria-label="閉じる"
              >
                <X size={22} className="text-[#3D2525]" />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 gap-10">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                  className="text-2xl font-display text-[#3D2525]"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#reserve"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-8 py-3 rounded-full border border-[#C07880] text-[#C07880]"
              >
                ご予約
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-svh overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src="/bloom-styling.jpg"
            alt="Bloom Hair Salon スタイリングエリア"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Warm overlay — 全体を淡くヴェールで包み文字を立たせる */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDF5F5]/45 via-[#FDF5F5]/55 to-[#FDF5F5]/90" />
          {/* テキスト背後のソフトな白グロー */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 75% 55% at 50% 52%, rgba(253,245,245,0.8) 0%, rgba(253,245,245,0) 72%)',
            }}
          />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6 text-xs tracking-[0.3em] text-[#C07880] font-medium"
          >
            HAIR SALON
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[1.1] tracking-[-0.02em] text-[#3D2525] mb-6"
          >
            あなたらしい美しさを、
            <br />
            丁寧に。
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-[#6E4848] text-base mb-10 tracking-wide"
          >
            表参道の静かな路地に佇む、上質な美容室
          </motion.p>

          <motion.a
            href="#reserve"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="px-8 py-4 bg-[#3D2525] text-white rounded-full text-sm font-medium hover:bg-[#5A3535] transition-colors duration-200"
          >
            ご予約はこちら
          </motion.a>
        </div>
      </section>

      {/* ── Concept ────────────────────────────────────────── */}
      <section id="concept" className="py-20 sm:py-28 md:py-40 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeUp>
              <span className="text-xs tracking-[0.2em] text-[#C07880] font-medium">CONCEPT</span>
              <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.25] tracking-[-0.01em] text-[#3D2525] mb-8">
                一人ひとりの美しさを
                <br />
                引き出す場所。
              </h2>
              <div className="space-y-5 text-[#8A6060] leading-[1.85] text-[0.95rem]">
                <p>
                  Bloomは、表参道に佇む完全予約制の美容室です。慌ただしい日常から離れ、あなただけのためのプライベートな時間を過ごしていただけます。
                </p>
                <p>
                  カウンセリングを大切に、お一人おひとりの髪質・ライフスタイルに合ったスタイルをご提案します。
                </p>
                <p>
                  厳選したオーガニック製品と熟練のスタイリストの技術で、来るたびに美しくなれる。そんなサロンを目指しています。
                </p>
              </div>

              <ul className="mt-10 space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[#3D2525]">
                    <Check size={14} className="text-[#C07880] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.15}>
              {/* モバイルは横長で低め、デスクトップは縦長 */}
              <div className="group relative aspect-[4/3] md:aspect-[3/4] rounded-3xl overflow-hidden">
                <Image
                  src="/bloom-reception.jpg"
                  alt="Bloom 受付カウンター"
                  fill
                  className="object-cover object-left transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Menu ───────────────────────────────────────────── */}
      <section id="menu" className="py-20 sm:py-28 md:py-40 bg-[#FDF5F5]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] text-[#C07880] font-medium">MENU</span>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.01em] text-[#3D2525]">
              メニュー・料金
            </h2>
            <p className="mt-3 text-sm text-[#8A6060]">
              ※ 表示価格は税込です。ご来店時のカウンセリングにて最終的な金額をご案内します。
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-6">
            {menuCategories.map((cat, ci) => (
              <FadeUp key={cat.name} delay={ci * 0.08}>
                <div className="bg-white rounded-2xl p-8 border border-[rgba(160,100,100,0.1)]"
                  style={{ boxShadow: '0 1px 3px rgba(160,100,100,0.04), 0 4px 16px rgba(160,100,100,0.04)' }}>
                  <h3 className="text-xs tracking-[0.18em] text-[#C07880] font-medium mb-5 uppercase">
                    {cat.name}
                  </h3>
                  <div className="space-y-4">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex justify-between items-center border-b border-[rgba(160,100,100,0.08)] pb-4 last:border-0 last:pb-0"
                      >
                        <span className="text-[0.9rem] text-[#3D2525]">{item.name}</span>
                        <span className="font-display text-[#C07880] text-lg ml-4 flex-shrink-0">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ────────────────────────────────────────── */}
      <section id="gallery" className="py-20 sm:py-28 md:py-40 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] text-[#C07880] font-medium">GALLERY</span>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.01em] text-[#3D2525]">
              サロンギャラリー
            </h2>
          </FadeUp>

          <div className="grid grid-cols-12 gap-4">
            {/* Large image */}
            <FadeUp className="col-span-12 md:col-span-7">
              <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/bloom-styling.jpg"
                  alt="スタイリングエリア — バックライトミラーと施術チェア"
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
            </FadeUp>

            {/* Right column */}
            <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
              <FadeUp delay={0.1} className="flex-1">
                <div className="group relative h-full min-h-[200px] rounded-2xl overflow-hidden">
                  <Image
                    src="/bloom-wash.jpg"
                    alt="シャンプーブース"
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </FadeUp>
              <FadeUp delay={0.18} className="flex-1">
                <div className="group relative h-full min-h-[200px] rounded-2xl overflow-hidden">
                  <Image
                    src="/bloom-reception.jpg"
                    alt="受付カウンター"
                    fill
                    className="object-cover object-left transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── Access ─────────────────────────────────────────── */}
      <section id="access" className="py-20 sm:py-28 md:py-40 bg-[#F5E6E6]/40">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] text-[#C07880] font-medium">ACCESS</span>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.01em] text-[#3D2525]">
              アクセス
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <FadeUp>
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="w-10 h-10 bg-[#F5E6E6] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-[#C07880]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest text-[#C07880] mb-1.5 uppercase">Address</p>
                    <p className="text-[#3D2525] leading-loose text-sm">
                      〒150-0001
                      <br />
                      東京都渋谷区神宮前1-1-1
                      <br />
                      表参道ビル 3F
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-10 h-10 bg-[#F5E6E6] rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-[#C07880]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest text-[#C07880] mb-1.5 uppercase">Hours</p>
                    <p className="text-[#3D2525] leading-loose text-sm">
                      月・水〜日　10:00 〜 20:00
                      <br />
                      <span className="text-[#8A6060]">火曜定休</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-10 h-10 bg-[#F5E6E6] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-[#C07880]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest text-[#C07880] mb-1.5 uppercase">Tel</p>
                    <a
                      href="tel:0300000000"
                      className="text-[#3D2525] text-sm hover:text-[#C07880] transition-colors"
                    >
                      03-0000-0000
                    </a>
                    <p className="text-xs text-[#8A6060] mt-1">※ 完全予約制</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-10 h-10 bg-[#F5E6E6] rounded-full flex items-center justify-center flex-shrink-0">
                    <AtSign size={16} className="text-[#C07880]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest text-[#C07880] mb-1.5 uppercase">Instagram</p>
                    <p className="text-[#3D2525] text-sm">@bloom.hairsalon</p>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.12}>
              {/* Map placeholder */}
              <div
                className="w-full h-64 md:h-full min-h-[240px] rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: '#F5E6E6' }}
              >
                <div className="text-center">
                  <MapPin size={28} className="text-[#C07880] mx-auto mb-3" />
                  <p className="text-xs text-[#8A6060]">Google Map</p>
                  <p className="text-xs text-[#8A6060] mt-1">表参道駅 A2出口 徒歩3分</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Reserve ────────────────────────────────────────── */}
      <section id="reserve" className="py-20 sm:py-28 md:py-40 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] text-[#C07880] font-medium">RESERVATION</span>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.01em] text-[#3D2525]">
              ご予約
            </h2>
            <p className="mt-3 text-sm text-[#8A6060]">
              ご予約はオンラインまたはお電話にて承っております。
            </p>
          </FadeUp>

          <div className="max-w-xl mx-auto">
            <AnimatePresence mode="wait">
              {formSent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="w-16 h-16 bg-[#F5E6E6] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={26} className="text-[#C07880]" />
                  </div>
                  <h3 className="font-display text-xl text-[#3D2525] mb-3">
                    ご予約リクエストを受け付けました
                  </h3>
                  <p className="text-sm text-[#8A6060]">
                    確認メールをお送りします。
                    <br />
                    2営業日以内にご連絡いたします。
                  </p>
                </motion.div>
              ) : (
                <FadeUp>
                  <form
                    className="space-y-5"
                    onSubmit={(e) => {
                      e.preventDefault()
                      setFormSent(true)
                    }}
                  >
                    {[
                      { id: 'name', label: 'お名前', type: 'text' },
                      { id: 'email', label: 'メールアドレス', type: 'email' },
                      { id: 'date', label: 'ご希望日時', type: 'text', placeholder: '例：7月15日（火）14:00〜' },
                    ].map((f) => (
                      <div key={f.id}>
                        <label
                          htmlFor={f.id}
                          className="block text-xs tracking-widest text-[#C07880] mb-2 uppercase"
                        >
                          {f.label}
                        </label>
                        <input
                          id={f.id}
                          type={f.type}
                          placeholder={f.placeholder}
                          required
                          className="w-full border border-[rgba(160,100,100,0.2)] rounded-xl px-4 py-3.5 text-[#3D2525] bg-[#FDF5F5] focus:outline-none focus:border-[#C07880] transition-colors text-sm placeholder:text-[#C0A0A0]"
                        />
                      </div>
                    ))}

                    <div>
                      <label
                        htmlFor="menu-select"
                        className="block text-xs tracking-widest text-[#C07880] mb-2 uppercase"
                      >
                        ご希望メニュー
                      </label>
                      <select
                        id="menu-select"
                        className="w-full border border-[rgba(160,100,100,0.2)] rounded-xl px-4 py-3.5 text-[#3D2525] bg-[#FDF5F5] focus:outline-none focus:border-[#C07880] transition-colors text-sm appearance-none"
                      >
                        <option value="">選択してください</option>
                        <option>カット</option>
                        <option>カット＋カラー</option>
                        <option>カット＋パーマ</option>
                        <option>カラーのみ</option>
                        <option>トリートメント</option>
                        <option>ヘッドスパ</option>
                        <option>その他（ご相談）</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs tracking-widest text-[#C07880] mb-2 uppercase"
                      >
                        ご要望・ご質問（任意）
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full border border-[rgba(160,100,100,0.2)] rounded-xl px-4 py-3.5 text-[#3D2525] bg-[#FDF5F5] focus:outline-none focus:border-[#C07880] transition-colors text-sm resize-none placeholder:text-[#C0A0A0]"
                        placeholder="お気軽にどうぞ"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#3D2525] text-white rounded-xl text-sm font-medium hover:bg-[#5A3535] transition-colors duration-200"
                    >
                      予約リクエストを送る
                    </button>
                  </form>
                </FadeUp>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="bg-[#3D2525] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            <div>
              <p className="font-display text-white text-xl mb-2 tracking-wider">Bloom</p>
              <p className="text-xs text-white/50">Hair Salon</p>
            </div>

            <nav>
              <p className="text-xs tracking-widest text-white/40 mb-4 uppercase">Menu</p>
              <ul className="space-y-3">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-xs tracking-widest text-white/40 mb-4 uppercase">Info</p>
              <div className="space-y-2 text-sm text-white/60">
                <p>東京都渋谷区神宮前1-1-1</p>
                <p>月・水〜日 10:00〜20:00</p>
                <p>火曜定休</p>
                <p className="mt-3">@bloom.hairsalon</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-xs text-white/30">
            © Bloom Hair Salon. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
