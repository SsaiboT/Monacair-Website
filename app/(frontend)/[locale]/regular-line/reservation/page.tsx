'use client'

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { HeroBanner } from '@/components/shared/hero-banner'
import BookingForm from '@/components/regular-line/reservation/booking-form'

export default function RegularLineReservationPage() {
  const t = useTranslations('RegularLine.Reservation')
  const searchParams = useSearchParams()

  const flightTypeParam = searchParams.get('flightType')
  const fromParam = searchParams.get('from')
  const toParam = searchParams.get('to')
  const passengersParam = searchParams.get('passengers')

  return (
    <>
      <HeroBanner
        title={t('heroBanner.title')}
        subtitle={t('heroBanner.subtitle')}
        buttonText={t('heroBanner.buttonText')}
        buttonHref="/regular-line/reservation"
        imageSrc="/placeholder.svg?height=1080&width=1920"
        imageAlt={t('heroBanner.imageAlt')}
      />
      <BookingForm
        initialFlightType={flightTypeParam === 'private-flight' ? 'vol-prive' : 'ligne-reguliere'}
        initialDeparture={fromParam || 'nice'}
        initialArrival={toParam || 'monaco'}
        initialAdults={passengersParam ? parseInt(passengersParam, 10) : 1}
      />
    </>
  )
}
