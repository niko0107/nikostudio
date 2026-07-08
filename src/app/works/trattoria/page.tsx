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

// ─── Restaurant data ──────────────────────────────────────────────────────────
const navLinks = [
  { href: '#concept', label: 'コンセプト' },
  { href: '#menu', label: 'メニュー' },
  { href: '#gallery', label: 'ギャラリー' },
  { href: '#access', label: 'アクセス' },
]

const signatureMenu = [
  {
    num: '01',
    name: 'Truffle Carbonara',
    desc: '濃厚な卵とパルミジャーノ、黒トリュフの香りを楽しむカルボナーラ',
    price: '¥1,780',
    image: '/trattoria-carbonara.jpg',
  },
  {
    num: '02',
    name: 'Burrata Caprese',
    desc: 'フレッシュブッラータと完熟トマト、バジル、オリーブオイル',
    price: '¥1,580',
    image: '/trattoria-caprese.jpg',
  },
  {
    num: '03',
    name: 'Margherita Pizza',
    desc: '薪窯で焼き上げる王道マルゲリータ',
    price: '¥1,680',
    image: '/trattoria-pizza.jpg',
  },
  {
    num: '04',
    name: 'Beef Bolognese',
    desc: 'じっくり煮込んだ牛肉のボロネーゼ タリアテッレ',
    price: '¥1,920',
    image: '/trattoria-bolognese.jpg',
  },
  {
    num: '05',
    name: 'Tiramisu',
    desc: '自家製マスカルポーネを使用したクラシックティラミス',
    price: '¥780',
    image: '/trattoria-tiramisu.jpg',
  },
]

const features = [
  '薪窯で焼き上げる本格ナポリピッツァ',
  '毎朝仕入れる季節の食材と自家製パスタ',
  'イタリア各地から厳選したワイン',
  'カウンターで愉しむライブ感のあるオープンキッチン',
]

// ─── Page component ───────────────────────────────────────────────────────────
export default function TrattoriaPage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#171310] text-[#EFE7DA] font-sans">

      {/* ── Demo badge ─────────────────────────────────────── */}
      <Link
        href="/#works"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#171310]/90 backdrop-blur-sm border border-[#C89B6A]/30 rounded-full px-4 py-2 text-xs text-[#C89B6A] hover:bg-[#221C17] transition-colors shadow-sm"
      >
        <ArrowLeft size={12} />
        Niko Studio 制作サンプル
      </Link>

      {/* ── Header ─────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#171310]/90 backdrop-blur-md shadow-[0_1px_0_rgba(200,155,106,0.12)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-display text-xl font-medium text-[#EFE7DA] tracking-wider">
            Trattoria Sole
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-[#BBA88E] hover:text-[#EFE7DA] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#reserve"
              className="hidden md:inline-flex px-5 py-2 rounded-full border border-[#C89B6A] text-[#C89B6A] text-sm hover:bg-[#C89B6A] hover:text-[#171310] transition-all duration-200"
            >
              ご予約
            </a>
            <button
              className="md:hidden p-2 text-[#EFE7DA]"
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
            className="fixed inset-0 z-50 bg-[#171310] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16">
              <span className="font-display text-xl font-medium text-[#EFE7DA]">Trattoria Sole</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2"
                aria-label="閉じる"
              >
                <X size={22} className="text-[#EFE7DA]" />
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
                  className="text-2xl font-display text-[#EFE7DA]"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#reserve"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-8 py-3 rounded-full border border-[#C89B6A] text-[#C89B6A]"
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
            src="/trattoria-dining.jpg"
            alt="Trattoria Sole 店内 — 灯りに包まれたダイニング"
            fill
            priority
            className="object-cover object-center"
          />
          {/* 下に向かって暗くフェードし文字を立たせる */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#171310]/30 via-[#171310]/45 to-[#171310]/90" />
          {/* テキスト背後のソフトな影 */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 55%, rgba(23,19,16,0.55) 0%, rgba(23,19,16,0) 72%)',
            }}
          />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6 text-xs tracking-[0.3em] text-[#C89B6A] font-medium"
          >
            ITALIAN RESTAURANT
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.15] tracking-[-0.02em] text-[#F5EDE0] mb-6"
          >
            薪窯の火と、
            <br />
            季節の恵みを一皿に。
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-[#D8C8AE] text-base mb-10 tracking-wide"
          >
            神楽坂の路地裏に灯る、小さなイタリアン
          </motion.p>

          <motion.a
            href="#reserve"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="px-8 py-4 bg-[#C89B6A] text-[#171310] rounded-full text-sm font-medium hover:bg-[#D8B084] transition-colors duration-200"
          >
            ご予約はこちら
          </motion.a>
        </div>
      </section>

      {/* ── Concept ────────────────────────────────────────── */}
      <section id="concept" className="py-20 sm:py-28 md:py-40 bg-[#1E1813]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeUp>
              <span className="text-xs tracking-[0.2em] text-[#C89B6A] font-medium">CONCEPT</span>
              <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.25] tracking-[-0.01em] text-[#F5EDE0] mb-8">
                火を囲む、
                <br />
                イタリアの食卓を。
              </h2>
              <div className="space-y-5 text-[#BBA88E] leading-[1.85] text-[0.95rem]">
                <p>
                  Trattoria Soleは、神楽坂の路地裏に佇む小さなトラットリアです。店の中心には薪窯。パチパチと爆ぜる火の音と、立ちのぼる香ばしい薫りが、イタリアの田舎町の食堂のような時間をつくります。
                </p>
                <p>
                  毎朝仕入れる季節の食材と、打ちたての自家製パスタ。派手さはなくても、素材の力を信じた、まっすぐな料理をお出しします。
                </p>
                <p>
                  一人でふらりと、大切な人と、仲間とにぎやかに。どんな夜にも寄り添える店でありたいと思っています。
                </p>
              </div>

              <ul className="mt-10 space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[#EFE7DA]">
                    <Check size={14} className="text-[#C89B6A] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.15}>
              {/* モバイルは横長で低め、デスクトップは縦長 */}
              <div className="group relative aspect-[4/3] md:aspect-[3/4] rounded-3xl overflow-hidden">
                <Image
                  src="/trattoria-kitchen.jpg"
                  alt="薪窯とオープンキッチン"
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Menu ───────────────────────────────────────────── */}
      <section id="menu" className="py-20 sm:py-28 md:py-40 bg-[#171310]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] text-[#C89B6A] font-medium">MENU</span>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.01em] text-[#F5EDE0]">
              シグネチャーメニュー
            </h2>
            <p className="mt-3 text-sm text-[#BBA88E]">
              ※ 表示価格は税込です。仕入れにより内容が変わる場合があります。
            </p>
          </FadeUp>

          {/* Featured: Truffle Carbonara */}
          <FadeUp>
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center mb-16 bg-[#1E1813] rounded-3xl overflow-hidden border border-[#C89B6A]/10">
              <div className="group relative aspect-[4/3] md:aspect-auto md:h-full min-h-[240px] overflow-hidden">
                <Image
                  src={signatureMenu[0].image}
                  alt={signatureMenu[0].name}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-8 md:p-10 lg:p-12">
                <span className="text-xs tracking-[0.25em] text-[#C89B6A]">SPECIALITÀ</span>
                <h3 className="mt-3 font-display text-[clamp(1.4rem,2.4vw,2rem)] text-[#F5EDE0]">
                  {signatureMenu[0].name}
                </h3>
                <p className="mt-4 text-[#BBA88E] leading-relaxed text-[0.95rem]">
                  {signatureMenu[0].desc}
                </p>
                <p className="mt-6 font-display text-2xl text-[#C89B6A]">
                  {signatureMenu[0].price}
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Rest of menu */}
          <div className="grid sm:grid-cols-2 gap-6">
            {signatureMenu.slice(1).map((item, i) => (
              <FadeUp key={item.num} delay={i * 0.08}>
                <div className="group bg-[#1E1813] rounded-3xl overflow-hidden border border-[#C89B6A]/10">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-lg md:text-xl text-[#F5EDE0]">
                        {item.name}
                      </h3>
                      <span className="font-display text-lg text-[#C89B6A] flex-shrink-0">
                        {item.price}
                      </span>
                    </div>
                    <p className="mt-2.5 text-sm text-[#BBA88E] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ────────────────────────────────────────── */}
      <section id="gallery" className="py-20 sm:py-28 md:py-40 bg-[#1E1813]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] text-[#C89B6A] font-medium">GALLERY</span>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.01em] text-[#F5EDE0]">
              店内の風景
            </h2>
          </FadeUp>

          <div className="grid grid-cols-12 gap-4">
            {/* Large image */}
            <FadeUp className="col-span-12 md:col-span-7">
              <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/trattoria-table.jpg"
                  alt="石壁とテーブルセッティング"
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
                    src="/trattoria-entrance.jpg"
                    alt="夜のエントランス"
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </FadeUp>
              <FadeUp delay={0.18} className="flex-1">
                <div className="group relative h-full min-h-[200px] rounded-2xl overflow-hidden">
                  <Image
                    src="/trattoria-kitchen.jpg"
                    alt="薪窯のあるオープンキッチン"
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── Access ─────────────────────────────────────────── */}
      <section id="access" className="py-20 sm:py-28 md:py-40 bg-[#171310]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] text-[#C89B6A] font-medium">ACCESS</span>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.01em] text-[#F5EDE0]">
              アクセス
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <FadeUp>
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="w-10 h-10 bg-[#2A2119] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-[#C89B6A]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest text-[#C89B6A] mb-1.5 uppercase">Address</p>
                    <p className="text-[#EFE7DA] leading-loose text-sm">
                      〒162-0825
                      <br />
                      東京都新宿区神楽坂3-3-3
                      <br />
                      ソーレビル 1F
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-10 h-10 bg-[#2A2119] rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-[#C89B6A]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest text-[#C89B6A] mb-1.5 uppercase">Hours</p>
                    <p className="text-[#EFE7DA] leading-loose text-sm">
                      火〜日　17:00 〜 23:00（L.O. 22:00）
                      <br />
                      <span className="text-[#BBA88E]">月曜定休</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-10 h-10 bg-[#2A2119] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-[#C89B6A]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest text-[#C89B6A] mb-1.5 uppercase">Tel</p>
                    <a
                      href="tel:0300000000"
                      className="text-[#EFE7DA] text-sm hover:text-[#C89B6A] transition-colors"
                    >
                      03-0000-0000
                    </a>
                    <p className="text-xs text-[#BBA88E] mt-1">※ 当日のご予約はお電話にて</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-10 h-10 bg-[#2A2119] rounded-full flex items-center justify-center flex-shrink-0">
                    <AtSign size={16} className="text-[#C89B6A]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest text-[#C89B6A] mb-1.5 uppercase">Instagram</p>
                    <p className="text-[#EFE7DA] text-sm">@trattoria.sole</p>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.12}>
              {/* Map placeholder */}
              <div
                className="w-full h-64 md:h-full min-h-[240px] rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: '#2A2119' }}
              >
                <div className="text-center">
                  <MapPin size={28} className="text-[#C89B6A] mx-auto mb-3" />
                  <p className="text-xs text-[#BBA88E]">Google Map</p>
                  <p className="text-xs text-[#BBA88E] mt-1">神楽坂駅 1番出口 徒歩4分</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Reserve ────────────────────────────────────────── */}
      <section id="reserve" className="py-20 sm:py-28 md:py-40 bg-[#1E1813]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] text-[#C89B6A] font-medium">RESERVATION</span>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.01em] text-[#F5EDE0]">
              ご予約
            </h2>
            <p className="mt-3 text-sm text-[#BBA88E]">
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
                  <div className="w-16 h-16 bg-[#2A2119] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={26} className="text-[#C89B6A]" />
                  </div>
                  <h3 className="font-display text-xl text-[#F5EDE0] mb-3">
                    ご予約リクエストを受け付けました
                  </h3>
                  <p className="text-sm text-[#BBA88E]">
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
                      { id: 'date', label: 'ご希望日時', type: 'text', placeholder: '例：7月15日（火）19:00〜' },
                    ].map((f) => (
                      <div key={f.id}>
                        <label
                          htmlFor={f.id}
                          className="block text-xs tracking-widest text-[#C89B6A] mb-2 uppercase"
                        >
                          {f.label}
                        </label>
                        <input
                          id={f.id}
                          type={f.type}
                          placeholder={f.placeholder}
                          required
                          className="w-full border border-[#C89B6A]/20 rounded-xl px-4 py-3.5 text-[#EFE7DA] bg-[#171310] focus:outline-none focus:border-[#C89B6A] transition-colors text-sm placeholder:text-[#6E5F4D]"
                        />
                      </div>
                    ))}

                    <div>
                      <label
                        htmlFor="guests"
                        className="block text-xs tracking-widest text-[#C89B6A] mb-2 uppercase"
                      >
                        人数
                      </label>
                      <select
                        id="guests"
                        className="w-full border border-[#C89B6A]/20 rounded-xl px-4 py-3.5 text-[#EFE7DA] bg-[#171310] focus:outline-none focus:border-[#C89B6A] transition-colors text-sm appearance-none"
                      >
                        <option value="">選択してください</option>
                        <option>1名</option>
                        <option>2名</option>
                        <option>3名</option>
                        <option>4名</option>
                        <option>5名</option>
                        <option>6名以上（ご相談）</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs tracking-widest text-[#C89B6A] mb-2 uppercase"
                      >
                        ご要望・アレルギーなど（任意）
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full border border-[#C89B6A]/20 rounded-xl px-4 py-3.5 text-[#EFE7DA] bg-[#171310] focus:outline-none focus:border-[#C89B6A] transition-colors text-sm resize-none placeholder:text-[#6E5F4D]"
                        placeholder="お気軽にどうぞ"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#C89B6A] text-[#171310] rounded-xl text-sm font-medium hover:bg-[#D8B084] transition-colors duration-200"
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
      <footer className="bg-[#100D0A] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            <div>
              <p className="font-display text-[#F5EDE0] text-xl mb-2 tracking-wider">Trattoria Sole</p>
              <p className="text-xs text-[#EFE7DA]/50">Italian Restaurant</p>
            </div>

            <nav>
              <p className="text-xs tracking-widest text-[#EFE7DA]/40 mb-4 uppercase">Menu</p>
              <ul className="space-y-3">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-[#EFE7DA]/60 hover:text-[#EFE7DA] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-xs tracking-widest text-[#EFE7DA]/40 mb-4 uppercase">Info</p>
              <div className="space-y-2 text-sm text-[#EFE7DA]/60">
                <p>東京都新宿区神楽坂3-3-3</p>
                <p>火〜日 17:00〜23:00</p>
                <p>月曜定休</p>
                <p className="mt-3">@trattoria.sole</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-xs text-[#EFE7DA]/30">
            © Trattoria Sole. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
