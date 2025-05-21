import { getPayload } from 'payload'
import config from '@payload-config'
import BookingForm from '@/components/regular-line/reservation/booking-form'
import { HeroBanner } from '@/components/shared/hero-banner'
import { getTranslations } from 'next-intl/server'

interface RegularBookingPageProps {
  params: {
    locale: string
    slug: string[]
  }
  searchParams: {
    passengers?: string
    oneway?: string
    flex?: string
    time?: string
    date?: string
  }
}

export default async function RegularBookingPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: RegularBookingPageProps) {
  const params = await Promise.resolve(paramsPromise)
  const searchParams = await Promise.resolve(searchParamsPromise)
  const t = await getTranslations('RegularLine.Reservation')

  const [fromSlug, toSlug] = params.slug || []

  if (!fromSlug || !toSlug) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p>{t('errorMessages.missingParams')}</p>
      </div>
    )
  }

  const payload = await getPayload({ config })

  const [fromDestination, toDestination] = await Promise.all([
    payload.find({
      collection: 'destinations',
      where: {
        slug: { equals: fromSlug },
      },
      limit: 1,
      depth: 1,
    }),
    payload.find({
      collection: 'destinations',
      where: {
        slug: { equals: toSlug },
      },
      limit: 1,
      depth: 1,
    }),
  ])

  const fromData = fromDestination.docs[0]
  const toData = toDestination.docs[0]

  if (!fromData || !toData) {
    return (
      <div className="container mx-auto py-8 text-center text-red-500">
        <p>{t('errorMessages.destinationNotFound')}</p>
      </div>
    )
  }

  // Шукаємо маршрут
  const routeResponse = await payload.find({
    collection: 'regular-flights',
    where: {
      'start_point.id': { equals: fromData.id },
      'end_point.id': { equals: toData.id },
    },
    limit: 1,
    depth: 1,
  })

  const routeDetails = routeResponse.docs[0]

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

      <BookingForm
        initialFlightType={searchParams?.flex === 'true' ? 'vol-prive' : 'ligne-reguliere'}
        initialDepartureId={fromData.id}
        initialArrivalId={toData.id}
        initialAdults={searchParams?.passengers ? parseInt(searchParams.passengers, 10) : 1}
        initialTime={searchParams?.time || ''}
        initialDate={searchParams?.date || ''}
        initialRouteDetails={routeDetails}
        initialDepartureDetails={fromData}
        initialArrivalDetails={toData}
        dataFetchingError={!routeDetails ? t('errorMessages.routeNotFound') : null}
      />
    </>
  )
}
