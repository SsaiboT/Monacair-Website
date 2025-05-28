import React from 'react'
import { getTranslations } from 'next-intl/server'
import { getPayloadClient } from '@/lib/payload'
import { notFound, redirect } from 'next/navigation'
import Hero from '@/components/shared/hero'
import Footer from '@/components/shared/footer'
import BookingForm from '@/components/regular-line/reservation/booking-form'
import type { Destination, RegularFlight } from '@/payload-types'

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
    datetime?: string
    returndatetime?: string
    flex?: string
    flights?: string
    count?: string
  }>
}

interface FlightData {
  id: string
  departure: string
  destination: string
  adults: number
  children: number
  newborns: number
  isReturn: boolean
}

export default async function PrivateFlightBookingPage({ params, searchParams }: PageProps) {
  const { locale, slug } = await params
  const searchParamsObj = await searchParams
  const query = {
    passengers: {
      adults:
        searchParamsObj.passengers && searchParamsObj.passengers[0]
          ? parseInt(searchParamsObj.passengers[0], 10) || 1
          : 1,
      children:
        searchParamsObj.passengers && searchParamsObj.passengers[1]
          ? parseInt(searchParamsObj.passengers[1], 10) || 0
          : 0,
      infants:
        searchParamsObj.passengers && searchParamsObj.passengers[2]
          ? parseInt(searchParamsObj.passengers[2], 10) || 0
          : 0,
    },
    from: searchParamsObj.from,
    to: searchParamsObj.to,
    date: searchParamsObj.date,
    time: searchParamsObj.time,
    oneway: searchParamsObj.oneway === 'true',
    isReturn: searchParamsObj.isReturn === 'true',
    datetime: searchParamsObj.datetime ? new Date(searchParamsObj.datetime) : null,
    returndatetime: searchParamsObj.returndatetime
      ? new Date(searchParamsObj.returndatetime)
      : null,
    flex: searchParamsObj.flex === 'true',
    flights: searchParamsObj.flights,
    count: searchParamsObj.count ? parseInt(searchParamsObj.count, 10) : 0,
    searchParamsObj,
  }
  const t = await getTranslations('RegularLine.Reservation')
  const payload = await getPayloadClient()

  const isMultipleFlights =
    slug.length === 1 && slug[0] === 'multi' && (query.flights || query.count > 0)

  let multipleFlights: FlightData[] = []
  let routeDetails: RegularFlight | null = null
  let departureDetails: Destination | null = null
  let arrivalDetails: Destination | null = null
  let error: string | null = null

  try {
    if (isMultipleFlights) {
      if (query.count > 0) {
        multipleFlights = []
        for (let i = 1; i <= query.count; i++) {
          const flightKey = `flight${i}`
          const passengersKey = `passengers${i}`
          const returnKey = `return${i}`

          const flightRoute = (query.searchParamsObj as any)[flightKey]
          const passengersData = (query.searchParamsObj as any)[passengersKey]
          const isReturn = (query.searchParamsObj as any)[returnKey] === 'true'

          if (flightRoute && passengersData) {
            const [departure, destination] = flightRoute.split('-')
            const [adults, children, newborns] = passengersData
              .split('-')
              .map((x: string) => parseInt(x, 10) || 0)

            multipleFlights.push({
              id: i.toString(),
              departure,
              destination,
              adults,
              children,
              newborns,
              isReturn,
            })
          }
        }
      } else if (query.flights) {
        try {
          multipleFlights = JSON.parse(decodeURIComponent(query.flights))
        } catch {
          return redirect(`/${locale}/flights`)
        }
      }

      const allDestinationSlugs = new Set<string>()
      multipleFlights.forEach((flight) => {
        allDestinationSlugs.add(flight.departure)
        allDestinationSlugs.add(flight.destination)
      })

      const destinationsData = await payload.find({
        collection: 'destinations',
        where: {
          slug: {
            in: Array.from(allDestinationSlugs),
          },
        },
      })

      const firstFlight = multipleFlights[0]
      departureDetails =
        destinationsData.docs.find((dest) => dest.slug === firstFlight.departure) || null
      arrivalDetails =
        destinationsData.docs.find((dest) => dest.slug === firstFlight.destination) || null
    } else {
      const fromParam = query.from || (slug.length > 0 ? slug[0] : '')
      const toParam = query.to || (slug.length > 1 ? slug[1] : '')

      if (fromParam && toParam) {
        const [destinationsData, routesData] = await Promise.all([
          payload.find({
            collection: 'destinations',
            where: {
              slug: {
                in: [fromParam, toParam],
              },
            },
            limit: 2,
          }),
          payload.find({
            collection: 'regular-flights',
            depth: 2,
          }),
        ])

        const destinations = destinationsData.docs
        departureDetails = destinations.find((dest) => dest.slug === fromParam) || null
        arrivalDetails = destinations.find((dest) => dest.slug === toParam) || null

        if (!departureDetails || !arrivalDetails) {
          error = 'Destination not found'
        }

        const route = routesData.docs.find((route) => {
          const startSlug =
            typeof route.start_point === 'string' ? route.start_point : route.start_point?.slug
          const endSlug =
            typeof route.end_point === 'string' ? route.end_point : route.end_point?.slug

          return (
            (startSlug === fromParam && endSlug === toParam) ||
            (startSlug === toParam && endSlug === fromParam)
          )
        })

        if (route) {
          routeDetails = route
        }
      }
    }
  } catch (err) {
    console.error('Error fetching data:', err)
    error = 'Failed to load flight data'
  }

  if (error === 'Destination not found') {
    return notFound()
  }

  if (!isMultipleFlights && (!slug[0] || !slug[1])) {
    return redirect(`/${locale}/flights`)
  }

  if (isMultipleFlights && multipleFlights.length === 0) {
    return redirect(`/${locale}/flights`)
  }

  const isRouteReversed = !!(
    routeDetails &&
    typeof routeDetails.start_point === 'object' &&
    routeDetails.start_point.slug === (slug[1] || multipleFlights[0]?.destination)
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        title="Réservation Vol Privé"
        subtitle="Réservez votre hélicoptère privé pour un service exclusif et personnalisé."
        buttonText={t('heroBanner.buttonText')}
        buttonLink="/flights"
        imageSrc="/images/index/hero.webp"
      />

      <BookingForm
        initialFlightType="vol-prive"
        initialDepartureId={departureDetails?.id || slug[0] || multipleFlights[0]?.departure || ''}
        initialArrivalId={arrivalDetails?.id || slug[1] || multipleFlights[0]?.destination || ''}
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
            ? query.datetime.toISOString().split('T')[1].substring(0, 5)
            : query.time || ''
        }
        initialReturnDate={
          query.returndatetime && query.returndatetime instanceof Date
            ? query.returndatetime.toISOString().split('T')[0]
            : ''
        }
        initialReturnTime={
          query.returndatetime && query.returndatetime instanceof Date
            ? query.returndatetime.toISOString().split('T')[1].substring(0, 5)
            : ''
        }
        initialIsReturn={
          isMultipleFlights
            ? multipleFlights[0]?.isReturn || false
            : query.isReturn || !query.oneway
        }
        initialFlex={query.flex}
        isRouteInitiallyReversed={isRouteReversed}
        initialRouteDetails={routeDetails}
        initialDepartureDetails={departureDetails}
        initialArrivalDetails={arrivalDetails}
        dataFetchingError={error}
        initialMultipleFlights={isMultipleFlights ? multipleFlights : undefined}
      />

      <Footer />
    </div>
  )
}
