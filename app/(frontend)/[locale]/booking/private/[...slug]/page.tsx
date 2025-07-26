import React from 'react'
import { getTranslations } from 'next-intl/server'
import { getPayloadClient } from '@/lib/payload'
import { notFound, redirect } from 'next/navigation'
import Hero from '@/components/shared/hero'
import Footer from '@/components/shared/footer'
import BookingForm from '@/components/regular-line/reservation/booking-form'
import type { Destination, RegularFlight } from '@/payload-types'
import {
  parseMultipleFlightsFromSlug,
  parseMultipleFlightsFromPath,
  findDestinationBySlug,
  type FlightData,
} from '@/lib/destination-mapping'

interface PageProps {
  params: Promise<{
    locale: string
    slug: string[]
  }>
  searchParams: Promise<{
    passengers?: string[]
    from?: string
    to?: string
    date?: string
    time?: string
    isReturn?: string
    oneway?: string
    returnDate?: string
    returnTime?: string
    [key: string]: string | string[] | undefined
  }>
}

export default async function BookingPage({ params, searchParams }: PageProps) {
  const { locale, slug } = await params
  const searchParamsObj = await searchParams
  const t = await getTranslations()
  const indexT = await getTranslations('Index')
  const contactT = await getTranslations('Booking.contact.info')

  const payload = await getPayloadClient()

  let departureDetails: Destination | null = null
  let arrivalDetails: Destination | null = null
  let multipleFlights: FlightData[] = []

  const [allDestinationsData] = await Promise.all([
    payload.find({
      collection: 'destinations',
      limit: 100,
    }),
  ])

  const allDestinations = allDestinationsData.docs

  const isNewMultipleFlightFormat = slug[0] === 'multi'
  let isMultipleFlights = false

  if (isNewMultipleFlightFormat) {
    isMultipleFlights = true
    const destinationSlugs = slug.slice(1)
    const passengersParams = Array.isArray(searchParamsObj.passengers)
      ? searchParamsObj.passengers
      : searchParamsObj.passengers
        ? [searchParamsObj.passengers]
        : []

    if (destinationSlugs.length === 0 || destinationSlugs.length % 2 !== 0) {
      notFound()
    }

    multipleFlights = parseMultipleFlightsFromPath(
      destinationSlugs,
      passengersParams,
      allDestinations,
    )

    if (multipleFlights.length === 0) {
      notFound()
    }

    departureDetails = findDestinationBySlug(allDestinations, destinationSlugs[0]) || null
    arrivalDetails =
      findDestinationBySlug(allDestinations, destinationSlugs[destinationSlugs.length - 1]) || null
  } else {
    const isComplexSlug = (slug: string) => {
      const parts = slug.split('-')
      return parts.length >= 5 && parts.slice(-3).every((part) => /^\d+$/.test(part))
    }

    isMultipleFlights = slug.length > 2 || (slug.length >= 1 && slug.some((s) => isComplexSlug(s)))

    if (isMultipleFlights && (slug.length > 2 || slug.some((s) => isComplexSlug(s)))) {
      multipleFlights = parseMultipleFlightsFromSlug(slug, allDestinations)

      if (multipleFlights.length === 0) {
        notFound()
      }

      departureDetails = findDestinationBySlug(allDestinations, slug[0].split('-')[0]) || null
      arrivalDetails =
        findDestinationBySlug(allDestinations, slug[slug.length - 1].split('-')[1]) || null
    } else {
      const fromParam = slug.length > 0 ? slug[0] : ''
      const toParam = slug.length > 1 ? slug[1] : ''

      if (fromParam && toParam) {
        departureDetails = findDestinationBySlug(allDestinations, fromParam) || null
        arrivalDetails = findDestinationBySlug(allDestinations, toParam) || null

        if (!departureDetails || !arrivalDetails) {
          notFound()
        }
      } else {
        notFound()
      }
    }
  }

  const passengers = Array.isArray(searchParamsObj.passengers)
    ? searchParamsObj.passengers
    : searchParamsObj.passengers
      ? [searchParamsObj.passengers]
      : ['1', '0', '0']

  const query = {
    passengers: {
      adults: parseInt(passengers[0] || '1'),
      children: parseInt(passengers[1] || '0'),
      infants: parseInt(passengers[2] || '0'),
    },
    from: searchParamsObj.from,
    to: searchParamsObj.to,
    date: searchParamsObj.date,
    time: searchParamsObj.time,
    isReturn: searchParamsObj.isReturn === 'true',
    oneway: searchParamsObj.oneway === 'true',
    returnDate: searchParamsObj.returnDate,
    returnTime: searchParamsObj.returnTime,
    datetime: null as Date | null,
    searchParamsObj,
  }

  if (searchParamsObj.date && searchParamsObj.time) {
    const dateTime = new Date(`${searchParamsObj.date}T${searchParamsObj.time}`)
    if (!isNaN(dateTime.getTime())) {
      query.datetime = dateTime
    }
  }

  const mainTitle = isMultipleFlights
    ? t('Booking.privateFlightMulti.title')
    : t('Booking.privateFlightSingle.title')

  const mainSubtitle = isMultipleFlights
    ? t('Booking.privateFlightMulti.subtitle')
    : t('Booking.privateFlightSingle.subtitle')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name:
      departureDetails && arrivalDetails
        ? `Helicopter Transfer: ${departureDetails.title} to ${arrivalDetails.title}`
        : 'Helicopter Transfer',
    description: arrivalDetails?.custom_text || 'Book your private helicopter transfer',
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
    areaServed: {
      '@type': 'Place',
      name:
        departureDetails && arrivalDetails
          ? `${departureDetails.title}, ${arrivalDetails.title}`
          : 'Helicopter Route',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Available Flights',
      itemListElement:
        departureDetails && arrivalDetails
          ? [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: `${departureDetails.title} to ${arrivalDetails.title}`,
                  areaServed: [
                    {
                      '@type': 'Place',
                      name: departureDetails.title,
                      address: {
                        '@type': 'PostalAddress',
                        addressCountry: departureDetails.country,
                        addressLocality:
                          typeof departureDetails.region !== 'string'
                            ? departureDetails.region?.name
                            : '',
                      },
                    },
                    {
                      '@type': 'Place',
                      name: arrivalDetails.title,
                      address: {
                        '@type': 'PostalAddress',
                        addressCountry: arrivalDetails.country,
                        addressLocality:
                          typeof arrivalDetails.region !== 'string'
                            ? arrivalDetails.region?.name
                            : '',
                      },
                    },
                  ],
                },
              },
            ]
          : [],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <Hero
          title={mainTitle}
          subtitle={mainSubtitle}
          buttonText={t('Booking.hero.buttonText')}
          buttonLink="#booking-form"
          imageSrc="/images/index/private.webp"
        />

        <div className="container mx-auto px-4 py-8 relative z-10">
          <BookingForm
            initialFlightType="vol-prive"
            initialDepartureId={departureDetails?.id || ''}
            initialArrivalId={arrivalDetails?.id || ''}
            initialAdults={
              isMultipleFlights ? multipleFlights[0]?.adults || 1 : query.passengers.adults
            }
            initialChildren={
              isMultipleFlights ? multipleFlights[0]?.children || 0 : query.passengers.children
            }
            initialNewborns={
              isMultipleFlights ? multipleFlights[0]?.newborns || 0 : query.passengers.infants
            }
            initialDate={
              query.datetime && query.datetime instanceof Date
                ? query.datetime.toISOString().split('T')[0]
                : query.date || ''
            }
            initialTime={
              query.datetime && query.datetime instanceof Date
                ? query.datetime.toTimeString().slice(0, 5)
                : query.time || ''
            }
            initialReturnDate={query.returnDate || ''}
            initialReturnTime={query.returnTime || ''}
            initialIsReturn={query.isReturn}
            initialRouteDetails={null}
            initialDepartureDetails={departureDetails}
            initialArrivalDetails={arrivalDetails}
            dataFetchingError={null}
            initialMultipleFlights={isMultipleFlights ? multipleFlights : undefined}
          />
        </div>

        <Footer />
      </div>
    </>
  )
}
