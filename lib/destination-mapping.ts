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
  return destination?.id || slug
}

export const convertIdToSlug = (destinations: Destination[], id: string): string => {
  const destination = findDestinationById(destinations, id)
  return destination?.slug || id
}

export const mapMultipleFlightsSlugToId = (
  flights: FlightData[],
  destinations: Destination[],
): FlightData[] => {
  return flights.map((flight) => ({
    ...flight,
    departure: convertSlugToId(destinations, flight.departure),
    destination: convertSlugToId(destinations, flight.destination),
  }))
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

export const getDestinationTitle = (destinations: Destination[], idOrSlug: string): string => {
  const destinationById = findDestinationById(destinations, idOrSlug)
  if (destinationById) return destinationById.title

  const destinationBySlug = findDestinationBySlug(destinations, idOrSlug)
  if (destinationBySlug) return destinationBySlug.title

  return idOrSlug
}

export const validateMultipleFlights = (flights: FlightData[]): boolean => {
  return flights.every((flight) => {
    const hasBasicInfo = flight.departure && flight.destination && flight.date && flight.time
    const hasReturnInfo = !flight.isReturn || (flight.returnDate && flight.returnTime)
    return hasBasicInfo && hasReturnInfo
  })
}
