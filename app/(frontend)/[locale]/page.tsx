import React from 'react'
import Hero from '@/components/index/hero'
import Footer from '@/components/shared/footer'
import OurFlights from '@/components/index/our-flights'

export default function Home() {
  return (
    <main>
      <Hero />
      <OurFlights />
      <Footer />
    </main>
  )
}
