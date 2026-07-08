import type { Metadata } from 'next'
import { Noto_Sans_JP, Shippori_Mincho } from 'next/font/google'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto',
  display: 'swap',
})

const shipporiMincho = Shippori_Mincho({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-shippori',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Niko Studio | Web制作・AI業務効率化',
  description:
    '小規模事業者・個人事業主向けのWeb制作・AI業務効率化サービス。ホームページ制作からAIを活用した業務改善まで、あなたのビジネスをサポートします。',
  keywords:
    'ホームページ制作, Web制作, AI業務効率化, LP制作, 個人事業主, 小規模事業者',
  openGraph: {
    title: 'Niko Studio | Web制作・AI業務効率化',
    description:
      '小規模事業者・個人事業主向けのWeb制作・AI業務効率化サービス。ホームページ制作からAIを活用した業務改善まで。',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'Niko Studio',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nikostudio26',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${shipporiMincho.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Niko Studio',
              description: 'Web制作・AI業務効率化サービス',
              email: 'nikostudio26@gmail.com',
              areaServed: '日本全国',
              priceRange: '¥¥',
            }),
          }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
