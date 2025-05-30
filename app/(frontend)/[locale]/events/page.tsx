import React from 'react'
import Hero from '@/components/shared/hero'
import Footer from '@/components/shared/footer'
import AttractSection from '@/components/shared/attract-section'
import Listing from '@/components/events/listing'
import { getTranslations } from 'next-intl/server'
import BookingForm from '@/components/booking/booking-form'
import { getPayloadClient } from '@/lib/payload'

export default async function EventsPage() {
  const t = await getTranslations('Events')
  const payload = await getPayloadClient()
  return (
    <div>
      <Hero
        title={t.rich('hero.title', {
          br: (chunks) => (
            <span>
              <br />
              {chunks}
            </span>
          ),
        })}
        subtitle={t.rich('hero.subtitle', {
          br: (chunks) => (
            <span>
              <br />
              {chunks}
            </span>
          ),
        })}
        buttonText={t('hero.CTA')}
        buttonLink={'/'}
        imageSrc={'/images/events/hero.webp'}
      />
      <BookingForm
        initialAllDestinations={(await payload.find({ collection: 'destinations' })).docs}
        initialRoutes={(await payload.find({ collection: 'regular-flights' })).docs}
        initialPanoramicFlights={(await payload.find({ collection: 'panoramic-flights' })).docs}
      />
      <Listing />
      <AttractSection
        title={t('AttractSection.title')}
        subtitle={t('AttractSection.subtitle')}
        buttonText={t('AttractSection.CTA')}
        buttonLink={'/'}
        imageSrc={'/images/index/hero.webp'}
      />
      <Footer />
    </div>
  )
}
