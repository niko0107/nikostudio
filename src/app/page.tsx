import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Works from '@/components/sections/Works'
import Contact from '@/components/sections/Contact'
import SmoothScroll from '@/components/ui/SmoothScroll'
import CursorGlow from '@/components/ui/CursorGlow'

export default function Home() {
  return (
    <main style={{ overflowX: 'clip' }}>
      <SmoothScroll />
      <CursorGlow />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Works />
      <Contact />
    </main>
  )
}
