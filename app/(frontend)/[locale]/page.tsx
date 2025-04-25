import React from 'react'
import Hero from '@/components/index/hero'
import Footer from '@/components/shared/footer'
import OurFlights from '@/components/index/our-flights'
import Experience from '@/components/index/experience'
import Destinations from '@/components/index/destinations'
import Events from '@/components/index/events'

export default function Home() {
  return (
    <main>
      <Hero />
      <OurFlights />
      <Destinations />
      <Experience />
      <Events />
      <Footer />
    </main>
  )
}
