import { notFound } from 'next/navigation'
import { SHOW_BLOOM_SAMPLE } from '@/config/site'

export default function BloomLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!SHOW_BLOOM_SAMPLE) {
    notFound()
  }

  return children
}
