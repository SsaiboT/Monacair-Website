import { getTranslations } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import BookingForm from '@/components/panoramic/reservation/booking-form'
import Footer from '@/components/shared/footer'
import { getPayloadClient } from '@/lib/payload'
import type { PanoramicFlight, Destination } from '@/payload-types'
import React from 'react'

interface PageProps {
  params: Promise<{
    locale: string
    slug: string[]
  }>
  searchParams: Promise<{
    passengers?: string[]
    date?: string
    time?: string
    datetime?: string
    flex?: string
    type?: string
    duration?: string
  }>
}

export default async function PanoramicFlightBookingPage({ params, searchParams }: PageProps) {
  const { locale, slug } = await params
  const query = await searchParams.then((res) => ({
    passengers: {
      adults: res.passengers && res.passengers[0] ? parseInt(res.passengers[0], 10) || 1 : 1,
      children: res.passengers && res.passengers[1] ? parseInt(res.passengers[1], 10) || 0 : 0,
      infants: res.passengers && res.passengers[2] ? parseInt(res.passengers[2], 10) || 0 : 0,
    },
    datetime: res.datetime ? new Date(res.datetime) : null,
    date: res.date && new Date(res.date),
    time: res.time,
    flex: res.flex === 'true',
    type: res.type as 'shared' | 'private' | undefined,
    duration: res.duration ? parseInt(res.duration, 10) : undefined,
  }))

  const payload = await getPayloadClient()

  const panoramicFlightsData = await payload.find({
    collection: 'panoramic-flights',
    limit: 0,
    depth: 2,
    overrideAccess: true,
  })

  const destinationsData = await payload.find({
    collection: 'destinations',
    limit: 0,
    overrideAccess: true,
  })

  const availableStartPoints: Destination[] = []
  const startIds = new Set<string>()

  panoramicFlightsData.docs.forEach((flight: PanoramicFlight) => {
    const startId = typeof flight.start === 'string' ? flight.start : flight.start.id
    if (!startIds.has(startId)) {
      startIds.add(startId)

      const startDestination = destinationsData.docs.find(
        (dest: Destination) => dest.id === startId,
      )
      if (startDestination) {
        availableStartPoints.push(startDestination)
      }
    }
  })

  const fromParam = slug[0]
  const currentPanoramicFlight = panoramicFlightsData.docs.find((flight: PanoramicFlight) => {
    const startSlug = typeof flight.start === 'string' ? flight.start : flight.start.slug
    return startSlug === fromParam
  })

  const defaultDestination = currentPanoramicFlight
    ? typeof currentPanoramicFlight.start === 'string'
      ? currentPanoramicFlight.start
      : currentPanoramicFlight.start.slug
    : fromParam || 'monaco'

  const t = await getTranslations('Panoramic.Reservation')
  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        buttonText={t('hero.buttonText')}
        buttonLink="/panoramic"
        imageSrc="/images/index/hero.webp"
      />

      <BookingForm
        fromParam={slug[0]}
        toParam={slug[1]}
        initialAdults={query.passengers.adults}
        initialChildren={query.passengers.children}
        initialNewborns={query.passengers.infants}
        initialDate={
          query.datetime
            ? query.datetime.toISOString().split('T')[0]
            : query.date
              ? query.date.toISOString().split('T')[0]
              : ''
        }
        initialTime={
          query.datetime
            ? query.datetime.toISOString().split('T')[1].substring(0, 5)
            : query.time || ''
        }
        initialFlex={query.flex}
        initialFlightType={query.type}
        initialDuration={query.duration}
        panoramicFlights={panoramicFlightsData.docs}
        availableDestinations={availableStartPoints}
        defaultDestination={defaultDestination}
      />

      <Footer />
    </div>
  )
}
