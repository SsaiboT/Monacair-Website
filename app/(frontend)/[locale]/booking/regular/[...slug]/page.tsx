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
  const indexT = await getTranslations('Index')
  const contactT = await getTranslations('Booking.contact.info')
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

  console.log('routeDetails', routeDetails)
  console.log('query', query)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name:
      routeDetails &&
      typeof routeDetails.start_point !== 'string' &&
      typeof routeDetails.end_point !== 'string'
        ? `Regular Helicopter Line: ${routeDetails.start_point.title} to ${routeDetails.end_point.title}`
        : 'Regular Helicopter Line',
    description:
      typeof routeDetails?.end_point !== 'string'
        ? routeDetails?.end_point?.custom_text
        : 'Book your regular helicopter flight.',
    provider: {
      '@type': 'Organization',
      name: 'Monacair',
      description: 'Helicopter transportation.',
      url: indexT('hero.url'),
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: contactT('phone.number'),
        contactType: 'booking',
        email: contactT('email.address'),
        availableLanguage: ['English', 'French'],
      },
    },
    areaServed: routeDetails
      ? [
          {
            '@type': 'Place',
            name:
              typeof routeDetails.start_point !== 'string' ? routeDetails.start_point.title : '',
            address: {
              '@type': 'PostalAddress',
              addressCountry:
                typeof routeDetails.start_point !== 'string'
                  ? routeDetails.start_point.country
                  : '',
              addressLocality:
                typeof routeDetails.start_point !== 'string' &&
                typeof routeDetails.start_point.region !== 'string'
                  ? routeDetails.start_point.region?.name || ''
                  : '',
            },
          },
          {
            '@type': 'Place',
            name: typeof routeDetails.end_point !== 'string' ? routeDetails.end_point.title : '',
            address: {
              '@type': 'PostalAddress',
              addressCountry:
                typeof routeDetails.end_point !== 'string' ? routeDetails.end_point.country : '',
              addressLocality:
                typeof routeDetails.end_point !== 'string' &&
                typeof routeDetails.end_point.region !== 'string'
                  ? routeDetails.end_point.region?.name || ''
                  : '',
            },
          },
        ]
      : undefined,

    hasOfferCatalog: routeDetails
      ? {
          '@type': 'OfferCatalog',
          name: 'Available Regular Flights',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name:
                  typeof routeDetails.start_point !== 'string' &&
                  typeof routeDetails.end_point !== 'string'
                    ? `${routeDetails.start_point.title} → ${routeDetails.end_point.title}`
                    : 'Regular Flight',

                description:
                  routeDetails.about?.description || 'Scenic and regular helicopter flights.',
                areaServed: [
                  {
                    '@type': 'Place',
                    name:
                      typeof routeDetails.start_point !== 'string'
                        ? routeDetails.start_point.title
                        : '',
                  },
                  {
                    '@type': 'Place',
                    name:
                      typeof routeDetails.end_point !== 'string'
                        ? routeDetails.end_point.title
                        : 'r',
                  },
                ],
              },
              priceSpecification: {
                '@type': 'PriceSpecification',
                priceCurrency: 'EUR',
                price: routeDetails.tariffs.price_per_adult || 0,
              },
            },
          ],
        }
      : undefined,
  }

  return routeDetails ? (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
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
            initialDepartureId={
              routeDetails.reversed ? routeDetails.end_point.id : routeDetails.start_point.id
            }
            initialArrivalId={
              routeDetails.reversed ? routeDetails.start_point.id : routeDetails.end_point.id
            }
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
