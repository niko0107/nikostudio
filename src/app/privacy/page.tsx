import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | Niko Studio',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 pt-36 pb-32">
        <h1 className="font-display text-display-md text-ink mb-12">
          プライバシーポリシー
        </h1>

        <div className="space-y-10 text-body-md text-muted">
          <section>
            <h2 className="font-medium text-ink text-xl mb-3">
              個人情報の取り扱いについて
            </h2>
            <p>
              Niko Studio（以下「当スタジオ」）は、お客様の個人情報を適切に管理・保護することを重要な責務と考えております。
            </p>
          </section>

          <section>
            <h2 className="font-medium text-ink text-xl mb-3">収集する情報</h2>
            <p>
              お問い合わせフォームを通じて、お名前・メールアドレス・ご用件・メッセージを収集します。
            </p>
          </section>

          <section>
            <h2 className="font-medium text-ink text-xl mb-3">利用目的</h2>
            <p>
              収集した個人情報は、お問い合わせへの返答および当スタジオのサービス提供のために利用します。
            </p>
          </section>

          <section>
            <h2 className="font-medium text-ink text-xl mb-3">第三者への提供</h2>
            <p>
              法令に基づく場合を除き、お客様の同意なく第三者に個人情報を提供することはありません。
            </p>
          </section>

          <section>
            <h2 className="font-medium text-ink text-xl mb-3">お問い合わせ</h2>
            <p>
              個人情報に関するお問い合わせは{' '}
              <a
                href="mailto:nikostudio26@gmail.com"
                className="text-accent hover:underline"
              >
                nikostudio26@gmail.com
              </a>{' '}
              までご連絡ください。
            </p>
          </section>
        </div>

        <div className="mt-16">
          <a
            href="/"
            className="text-accent hover:text-accent/80 transition-colors text-sm"
          >
            ← トップページに戻る
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}
