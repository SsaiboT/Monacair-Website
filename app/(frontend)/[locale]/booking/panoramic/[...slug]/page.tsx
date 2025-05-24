import { getTranslations } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import BookingForm from '@/components/panoramic/reservation/booking-form'
import Footer from '@/components/shared/footer'
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
  }))

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
      />

      <Footer />
    </div>
  )
}
