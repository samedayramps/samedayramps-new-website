import Header from '@/components/layout/Header'
import Hero from '@/components/layout/Hero'
import TrustBar from '@/components/layout/TrustBar'
import Benefits from '@/components/layout/Benefits'
import PerfectFor from '@/components/layout/PerfectFor'
import HowItWorks from '@/components/layout/HowItWorks'
import FAQ from '@/components/layout/FAQ'
import Footer from '@/components/layout/Footer'
import QuoteCalculator from '@/components/layout/QuoteCalculator'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Benefits />
        <PerfectFor />
        <HowItWorks />
        <QuoteCalculator />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
