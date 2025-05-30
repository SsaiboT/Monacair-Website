import type { Destination } from '@/payload-types'

export interface FlightData {
  id: string
  departure: string
  destination: string
  adults: number
  children: number
  newborns: number
  isReturn: boolean
  date?: string
  time?: string
  returnDate?: string
  returnTime?: string
  cabinLuggage?: number
  checkedLuggage?: number
}

export const findDestinationBySlug = (
  destinations: Destination[],
  slug: string,
): Destination | null => {
  return destinations.find((dest) => dest.slug === slug) || null
}

export const findDestinationById = (
  destinations: Destination[],
  id: string,
): Destination | null => {
  return destinations.find((dest) => dest.id === id) || null
}

export const convertSlugToId = (destinations: Destination[], slug: string): string => {
  const destination = findDestinationBySlug(destinations, slug)
  return destination?.id || ''
}

export const convertIdToSlug = (destinations: Destination[], id: string): string => {
  const destination = findDestinationById(destinations, id)
  return destination?.slug || ''
}

export const getDestinationTitle = (destinations: Destination[], id: string): string => {
  const destination = findDestinationById(destinations, id)
  return destination?.title || ''
}

export const parseFlightSlug = (slug: string, destinations: Destination[]): FlightData | null => {
  const parts = slug.split('-')
  if (parts.length < 5) return null

  const departureSlug = parts[0]
  const destinationSlug = parts[1]
  const adults = parseInt(parts[2]) || 1
  const children = parseInt(parts[3]) || 0
  const newborns = parseInt(parts[4]) || 0

  const departureId = convertSlugToId(destinations, departureSlug)
  const destinationId = convertSlugToId(destinations, destinationSlug)

  if (!departureId || !destinationId) return null

  return {
    id: `${departureSlug}-${destinationSlug}`,
    departure: departureId,
    destination: destinationId,
    adults,
    children,
    newborns,
    isReturn: false,
  }
}

export const generateFlightSlug = (
  departureId: string,
  destinationId: string,
  adults: number,
  children: number,
  newborns: number,
  destinations: Destination[],
): string => {
  const departureSlug = convertIdToSlug(destinations, departureId)
  const destinationSlug = convertIdToSlug(destinations, destinationId)
  return `${departureSlug}-${destinationSlug}-${adults}-${children}-${newborns}`
}

export const parseMultipleFlightsFromSlug = (
  slugs: string[],
  destinations: Destination[],
): FlightData[] => {
  return slugs
    .map((slug) => parseFlightSlug(slug, destinations))
    .filter((flight): flight is FlightData => flight !== null)
}

export const mapMultipleFlightsSlugToId = (
  searchParams: any,
  destinations: Destination[],
): FlightData[] => {
  const flights: FlightData[] = []

  for (let i = 1; i <= 10; i++) {
    const flightKey = `flight${i}`
    const passengersKey = `passengers${i}`

    const flightRoute = searchParams[flightKey]
    const passengersData = searchParams[passengersKey]

    if (!flightRoute || !passengersData) break

    const [departureSlug, destinationSlug] = flightRoute.split('-')
    const [adults, children, newborns] = passengersData.split('-').map(Number)

    const departureId = convertSlugToId(destinations, departureSlug)
    const destinationId = convertSlugToId(destinations, destinationSlug)

    if (departureId && destinationId) {
      flights.push({
        id: flightRoute,
        departure: departureId,
        destination: destinationId,
        adults: adults || 1,
        children: children || 0,
        newborns: newborns || 0,
        isReturn: false,
      })
    }
  }

  return flights
}

export const mapMultipleFlightsIdToSlug = (
  flights: FlightData[],
  destinations: Destination[],
): FlightData[] => {
  return flights.map((flight) => ({
    ...flight,
    departure: convertIdToSlug(destinations, flight.departure),
    destination: convertIdToSlug(destinations, flight.destination),
  }))
}

export const validateMultipleFlights = (flights: FlightData[]): boolean => {
  return flights.every((flight) => {
    const hasBasicInfo = flight.departure && flight.destination && flight.date && flight.time
    const hasReturnInfo = !flight.isReturn || (flight.returnDate && flight.returnTime)
    return hasBasicInfo && hasReturnInfo
  })
}
