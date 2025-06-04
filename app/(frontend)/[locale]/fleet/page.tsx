import { getTranslations, getLocale } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import IntroSection from '@/components/fleet/intro-section'
import HelicopterShowcase from '@/components/fleet/helicopter-showcase'
import Footer from '@/components/shared/footer'
import { getPayloadClient } from '@/lib/payload'
import BookingForm from '@/components/booking/booking-form'
import { Fleet } from '@/payload-types'
import React from 'react'

export const dynamic = 'force-dynamic'

export default async function FleetPage() {
  const [t, locale] = await Promise.all([getTranslations('Fleet.page'), getLocale()])

  const payload = await getPayloadClient()

  const fleetResponse = await payload.find({
    collection: 'Fleet',
    locale: locale as 'en' | 'fr' | 'all',
    sort: 'order',
    fallbackLocale: 'fr',
  })

  const helicopters = fleetResponse.docs || []

  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        title={t('title')}
        subtitle={t('subtitle')}
        buttonText={t('cta')}
        buttonLink="/booking"
        imageSrc="/images/fleet/hero.webp"
      />
      <IntroSection />

      {helicopters.map((helicopter, index) => (
        <HelicopterShowcase
          key={helicopter.id}
          helicopter={helicopter as Fleet}
          reversed={index % 2 !== 0}
        />
      ))}
      <BookingForm
        initialAllDestinations={(await payload.find({ collection: 'destinations' })).docs}
        initialRoutes={(await payload.find({ collection: 'regular-flights' })).docs}
        initialPanoramicFlights={(await payload.find({ collection: 'panoramic-flights' })).docs}
      />

      <Footer />
    </div>
  )
}
