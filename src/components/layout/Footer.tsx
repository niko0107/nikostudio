const navLinks = [
  { href: '#services', label: 'サービス' },
  { href: '#works', label: '実績' },
  { href: '#pricing', label: '料金' },
  { href: '#faq', label: 'よくある質問' },
  { href: '#contact', label: 'お問い合わせ' },
]

export default function Footer() {
  return (
    <footer className="bg-ink py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="font-display font-medium text-white text-xl mb-2">
              Niko Studio
            </p>
            <p className="text-caption text-white/50">Web制作・AI業務効率化</p>
          </div>

          <nav aria-label="フッターナビゲーション">
            <p className="text-caption text-white/40 tracking-widest mb-4 uppercase">Menu</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-caption text-white/40 tracking-widest mb-4 uppercase">Contact</p>
            <div className="space-y-2 text-sm text-white/60">
              <a
                href="mailto:nikostudio26@gmail.com"
                className="block hover:text-white transition-colors"
              >
                nikostudio26@gmail.com
              </a>
              <p>X: @nikostudio26</p>
              <p>Threads: @nikostudio26</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-caption text-white/40">
            © Niko Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-caption text-white/40">
            <a
              href="/privacy"
              className="hover:text-white/60 transition-colors"
            >
              プライバシーポリシー
            </a>
            <span aria-hidden>｜</span>
            <a href="#" className="hover:text-white/60 transition-colors">
              利用規約
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
