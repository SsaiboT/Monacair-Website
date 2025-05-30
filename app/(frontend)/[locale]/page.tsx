import React from 'react'
import Hero from '@/components/index/hero'
import Footer from '@/components/shared/footer'
import OurFlights from '@/components/index/our-flights'
import Experience from '@/components/index/experience'
import Destinations from '@/components/index/destinations'
import Events from '@/components/index/events'
import FleetCarousel from '@/components/index/fleet'
import AttractSection from '@/components/shared/attract-section'
import BookingForm from '@/components/booking/booking-form'
import { getPayloadClient } from '@/lib/payload'
import { getTranslations } from 'next-intl/server'

export default async function Home() {
  const t = await getTranslations('Destinations')
  const payload = await getPayloadClient()
  return (
    <main>
      <Hero />
      <BookingForm
        initialAllDestinations={(await payload.find({ collection: 'destinations' })).docs}
        initialRoutes={(await payload.find({ collection: 'regular-flights' })).docs}
        initialPanoramicFlights={(await payload.find({ collection: 'panoramic-flights' })).docs}
      />
      <OurFlights />
      <Destinations />
      <Experience />
      <Events />
      <FleetCarousel />
      <AttractSection
        title={t('AttractSection.title')}
        subtitle={t('AttractSection.subtitle')}
        buttonText={t('AttractSection.CTA')}
        buttonLink={'/contact'}
        imageSrc={'/images/index/hero.webp'}
      />
      <Footer />
    </main>
  )
}
