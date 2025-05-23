import { Destination } from '@/payload-types'
import { getTranslations } from 'next-intl/server'
import { getRegularFlight } from '@/lib/utils'
import { HeroBanner } from '@/components/shared/hero-banner'
import BookingForm from '@/components/regular-line/reservation/booking-form'
import { redirect } from '@/i18n/navigation'
import React from 'react'

const RegularBooking = async ({
  params,
  searchParams,
}: {
  params: Promise<{
    locale: string
    slug: [Destination['slug'], Destination['slug']]
  }>
  searchParams: Promise<{
    passengers?: string[]
    oneway?: string
    date?: string
    flex?: string
  }>
}) => {
  const t = await getTranslations('RegularLine')
  const query = await searchParams.then((res) => ({
    // TODO: Implement missing flight features into the booking form (i.e., possibly preselected date and flex tariff).
    passengers: {
      adults: res.passengers ? parseInt(res.passengers[0], 10) : 1,
      children: res.passengers ? parseInt(res.passengers[1], 10) : 0,
      infants: res.passengers ? parseInt(res.passengers[2], 10) : 0,
    },
    oneway: res.oneway === 'true',
    date: res.date && new Date(res.date),
    flex: res.flex === 'true',
  }))
  const routeDetails = await getRegularFlight([(await params).slug[0], (await params).slug[1]])

  return routeDetails ? (
    <>
      <HeroBanner
        title={t('heroBanner.title')}
        subtitle={t('heroBanner.subtitle')}
        buttonText={t('heroBanner.buttonText')}
        buttonHref="/regular-line/reservation"
        imageSrc="/images/index/hero.webp"
        imageAlt={t('heroBanner.imageAlt')}
      />

      {typeof routeDetails.start_point !== 'string' &&
        typeof routeDetails.end_point !== 'string' && (
          <BookingForm
            initialFlightType={'ligne-reguliere'}
            initialDepartureId={routeDetails.start_point.id}
            initialArrivalId={routeDetails.end_point.id}
            initialAdults={query.passengers.adults}
            isRouteInitiallyReversed={routeDetails.reversed}
            initialRouteDetails={routeDetails}
            initialDepartureDetails={routeDetails.start_point}
            initialArrivalDetails={routeDetails.end_point}
            dataFetchingError={null}
          />
        )}
    </>
  ) : (
    redirect({ href: '/flights', locale: (await params).locale })
  )
}

export default RegularBooking
