import { Destination } from '@/payload-types'
import { HeroBanner } from '@/components/shared/hero-banner'
import BookingForm from '@/components/regular-line/reservation/booking-form'
import BookingFormPanoramic from '@/components/panoramic/reservation/booking-form'
// TODO: Combine the two booking forms into one
import Footer from '@/components/shared/footer'
import React from 'react'
import { redirect } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { getRegularFlight } from '@/lib/utils'

const Booking = async ({
  params,
  searchParams,
}: {
  params: Promise<{
    locale: string
    slug: ['private' | 'regular' | 'panoramic', Destination['slug'], Destination['slug']]
  }>
  searchParams: Promise<{
    passengers?: string[]
    oneway?: string
    date?: string
    flex?: string
  }>
}) => {
  const View = async () => {
    switch ((await params).slug[0]) {
      case 'private':
        // TODO: Implement private flight booking form separately, it's code already exists somewhere for this kind of flight.
        break
      case 'regular':
        const tr = await getTranslations('RegularLine')
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
        const routeDetails = await getRegularFlight([
          (await params).slug[1],
          (await params).slug[2],
        ])

        return routeDetails ? (
          <>
            <HeroBanner
              title={tr('heroBanner.title')}
              subtitle={tr('heroBanner.subtitle')}
              buttonText={tr('heroBanner.buttonText')}
              buttonHref="/regular-line/reservation"
              imageSrc="/images/index/hero.webp"
              imageAlt={tr('heroBanner.imageAlt')}
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
      case 'panoramic':
        const tp = await getTranslations('Panoramic.Reservation')
        return (
          <div className="flex flex-col min-h-screen">
            <HeroBanner
              title={tp('hero.title')}
              subtitle={tp('hero.subtitle')}
              buttonText={tp('hero.buttonText')}
              buttonHref="/panoramic"
              imageSrc="/images/index/hero.webp"
              imageAlt={tp('hero.imageAlt')}
            />

            <BookingFormPanoramic />

            <Footer />
          </div>
        )
      default:
        redirect({ href: '/flights', locale: (await params).locale })
        break
    }
  }

  return View()
}

export default Booking
