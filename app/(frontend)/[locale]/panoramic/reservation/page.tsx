import React from 'react'
import { useTranslations } from 'next-intl'
import { HeroBanner } from '@/components/shared/hero-banner'
import BookingForm from '@/components/panoramic/reservation/booking-form'
import Footer from '@/components/shared/footer'

export default function PanoramicFlightReservationPage() {
  const t = useTranslations('Panoramic.Reservation')

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        buttonText={t('hero.buttonText')}
        buttonLink="/panoramic"
        imageSrc="/images/index/hero.webp"
        imageAlt={t('hero.imageAlt')}
      />

      <BookingForm />

      <Footer />
    </div>
  )
}
