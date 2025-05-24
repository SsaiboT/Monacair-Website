import { Destination } from '@/payload-types'
import { getTranslations } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import BookingForm from '@/components/regular-line/reservation/booking-form'
import { redirect } from '@/i18n/navigation'
import React from 'react'
import { getRegularFlight } from '@/app/(frontend)/[locale]/flights/regular/[...slug]/actions'

const Regular = async ({
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
    isReturn?: string
    datetime?: string
    returndatetime?: string
    date?: string
    flex?: string
  }>
}) => {
  const t = await getTranslations('RegularLine.Reservation')
  const query = await searchParams.then((res) => ({
    passengers: {
      adults: res.passengers && res.passengers[0] ? parseInt(res.passengers[0], 10) || 1 : 1,
      children: res.passengers && res.passengers[1] ? parseInt(res.passengers[1], 10) || 0 : 0,
      infants: res.passengers && res.passengers[2] ? parseInt(res.passengers[2], 10) || 0 : 0,
    },
    oneway: res.oneway === 'true',
    isReturn: res.isReturn === 'true',
    datetime: res.datetime ? new Date(res.datetime) : null,
    returndatetime: res.returndatetime ? new Date(res.returndatetime) : null,
    date: res.date && new Date(res.date),
    flex: res.flex === 'true',
  }))
  const routeDetails = await getRegularFlight([(await params).slug[0], (await params).slug[1]])

  return routeDetails ? (
    <>
      <Hero
        title={t('heroBanner.title')}
        subtitle={t('heroBanner.subtitle')}
        buttonText={t('heroBanner.buttonText')}
        buttonLink="/regular-line/reservation"
        imageSrc="/images/index/hero.webp"
      />

      {typeof routeDetails.start_point !== 'string' &&
        typeof routeDetails.end_point !== 'string' && (
          <BookingForm
            initialFlightType={'ligne-reguliere'}
            initialDepartureId={routeDetails.start_point.id}
            initialArrivalId={routeDetails.end_point.id}
            initialAdults={query.passengers.adults}
            initialChildren={query.passengers.children}
            initialNewborns={query.passengers.infants}
            initialFlex={query.flex}
            initialDate={
              query.datetime
                ? query.datetime.toISOString().split('T')[0]
                : query.date
                  ? query.date.toISOString().split('T')[0]
                  : ''
            }
            initialTime={
              query.datetime ? query.datetime.toISOString().split('T')[1].substring(0, 5) : ''
            }
            initialReturnDate={
              query.returndatetime ? query.returndatetime.toISOString().split('T')[0] : ''
            }
            initialReturnTime={
              query.returndatetime
                ? query.returndatetime.toISOString().split('T')[1].substring(0, 5)
                : ''
            }
            initialIsReturn={query.isReturn || !query.oneway}
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

export default Regular
