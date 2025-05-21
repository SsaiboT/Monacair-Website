import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { HeroBanner } from '@/components/shared/hero-banner'
import BookingForm from '@/components/regular-line/reservation/booking-form'
import type { RegularFlight, Destination } from '@/payload-types'

interface RegularLineReservationPageProps {
  params: { locale: string }
  searchParams: {
    flightType?: string
    from?: string
    to?: string
    passengers?: string
    isReversed?: string
  }
}

export default async function RegularLineReservationPage({
  params,
  searchParams: initialSearchParams,
}: RegularLineReservationPageProps) {
  const t = await getTranslations('RegularLine.Reservation')
  const payload = await getPayload({ config })
  const searchParams = await Promise.resolve(initialSearchParams)

  const flightTypeParam = searchParams.flightType
  const fromId = searchParams.from
  const toId = searchParams.to
  const passengersParam = searchParams.passengers
  const isReversedParam = searchParams.isReversed === 'true'

  let routeDetails: RegularFlight | null = null
  let departureDetails: Destination | null = null
  let arrivalDetails: Destination | null = null
  let error: string | null = null

  try {
    if (fromId && toId) {
      const [depData, arrData] = await Promise.all([
        payload.findByID({
          collection: 'destinations',
          id: fromId,
          depth: 0,
          overrideAccess: true,
        }),
        payload.findByID({ collection: 'destinations', id: toId, depth: 0, overrideAccess: true }),
      ])
      departureDetails = depData as Destination
      arrivalDetails = arrData as Destination

      if (departureDetails && arrivalDetails) {
        const routesResponse = await payload.find({
          collection: 'regular-flights',
          where: {
            'start_point.id': { equals: isReversedParam ? toId : fromId },
            'end_point.id': { equals: isReversedParam ? fromId : toId },
          },
          limit: 1,
          depth: 1,
          overrideAccess: true,
        })
        if (routesResponse.docs && routesResponse.docs.length > 0) {
          routeDetails = routesResponse.docs[0] as RegularFlight
        } else {
          const nonReversedRouteResponse = await payload.find({
            collection: 'regular-flights',
            where: {
              'start_point.id': { equals: fromId },
              'end_point.id': { equals: toId },
            },
            limit: 1,
            depth: 1,
            overrideAccess: true,
          })
          if (nonReversedRouteResponse.docs && nonReversedRouteResponse.docs.length > 0) {
            routeDetails = nonReversedRouteResponse.docs[0] as RegularFlight
          } else {
            error = t('errorMessages.routeNotFound')
          }
        }
      } else {
        error = t('errorMessages.destinationNotFound')
      }
    } else {
      error = t('errorMessages.missingParams')
    }
  } catch (err: any) {
    error = t('errorMessages.genericError')
  }

  return (
    <>
      <HeroBanner
        title={t('heroBanner.title')}
        subtitle={t('heroBanner.subtitle')}
        buttonText={t('heroBanner.buttonText')}
        buttonHref="/regular-line/reservation"
        imageSrc="/images/index/hero.webp"
        imageAlt={t('heroBanner.imageAlt')}
      />

      {error && !routeDetails && (
        <div className="container mx-auto py-8 text-center text-red-500">
          <p>{error}</p>
        </div>
      )}
      {fromId && toId && (
        <BookingForm
          initialFlightType={flightTypeParam === 'private-flight' ? 'vol-prive' : 'ligne-reguliere'}
          initialDepartureId={fromId}
          initialArrivalId={toId}
          initialAdults={passengersParam ? parseInt(passengersParam, 10) : 1}
          isRouteInitiallyReversed={isReversedParam}
          initialRouteDetails={routeDetails}
          initialDepartureDetails={departureDetails}
          initialArrivalDetails={arrivalDetails}
          dataFetchingError={
            error && (routeDetails === null || departureDetails === null || arrivalDetails === null)
              ? error
              : null
          }
        />
      )}
      {!fromId ||
        (!toId && !error && (
          <div className="container mx-auto py-8 text-center">
            <p>{t('errorMessages.missingParamsForBooking')}</p>
          </div>
        ))}
    </>
  )
}
