import type { Destination, RegularFlight } from '@/payload-types'

export interface BookingParams {
  departure: string
  arrival: string
  adults: number
  children: number
  newborns: number
  date?: string
  time?: string
  isReturn?: boolean
  returnDate?: string
  returnTime?: string
  isFlex?: boolean
}

export const extractEntityId = (
  entity: string | { id: string } | undefined,
): string | undefined => {
  if (!entity) return undefined
  return typeof entity === 'string' ? entity : entity.id
}

export const findDestinationBySlug = (
  destinations: Destination[],
  slug: string,
): Destination | undefined => {
  return destinations.find((dest) => dest.slug === slug)
}

export const findDestinationById = (
  destinations: Destination[],
  id: string,
): Destination | undefined => {
  return destinations.find((dest) => dest.id === id)
}

export const getDestinationName = (destinations: Destination[], id: string): string => {
  const destination = findDestinationById(destinations, id)
  return destination?.title || id
}

export const findMatchingRoute = (
  routes: RegularFlight[],
  departureId: string,
  arrivalId: string,
): RegularFlight | null => {
  const directRoute = routes.find((route) => {
    const startId = extractEntityId(route.start_point)
    const endId = extractEntityId(route.end_point)
    return startId === departureId && endId === arrivalId
  })

  if (directRoute) return directRoute

  const reverseRoute = routes.find((route) => {
    const startId = extractEntityId(route.start_point)
    const endId = extractEntityId(route.end_point)
    return startId === arrivalId && endId === departureId
  })

  return reverseRoute || null
}

export const getAvailableDestinations = (
  routes: RegularFlight[],
  destinations: Destination[],
  departureId: string,
): Destination[] => {
  const availableIds = new Set<string>()

  routes.forEach((route) => {
    const startId = extractEntityId(route.start_point)
    const endId = extractEntityId(route.end_point)

    if (startId === departureId && endId) {
      availableIds.add(endId)
    }
    if (endId === departureId && startId) {
      availableIds.add(startId)
    }
  })

  return destinations.filter((dest) => availableIds.has(dest.id))
}

export const generateBookingUrl = (
  destinations: Destination[],
  params: BookingParams,
  basePath: string = '/booking/regular',
): string => {
  const startPoint = findDestinationById(destinations, params.departure)
  const endPoint = findDestinationById(destinations, params.arrival)

  if (!startPoint?.slug || !endPoint?.slug) {
    return `${basePath}/nice/monaco`
  }

  const baseUrl = `${basePath}/${startPoint.slug}/${endPoint.slug}`
  const urlParams = new URLSearchParams()

  urlParams.append('passengers', params.adults.toString())
  urlParams.append('passengers', params.children.toString())
  urlParams.append('passengers', params.newborns.toString())

  if (params.date && params.time) {
    const dateTimeString = `${params.date}T${params.time}:00Z`
    urlParams.append('datetime', dateTimeString)
  }

  if (params.isReturn) {
    urlParams.append('isReturn', 'true')
    if (params.returnDate && params.returnTime) {
      const returnDateTimeString = `${params.returnDate}T${params.returnTime}:00Z`
      urlParams.append('returndatetime', returnDateTimeString)
    }
  } else {
    urlParams.append('oneway', 'true')
  }

  if (params.isFlex) {
    urlParams.append('flex', 'true')
  }

  return `${baseUrl}?${urlParams.toString()}`
}

export const isRouteReversed = (
  route: RegularFlight,
  departureId: string,
  arrivalId: string,
): boolean => {
  const routeStartId = extractEntityId(route.start_point)
  const routeEndId = extractEntityId(route.end_point)

  return departureId === routeEndId && arrivalId === routeStartId
}

export const getNextDay = (dateString: string): string => {
  const date = new Date(dateString)
  date.setDate(date.getDate() + 1)
  return date.toISOString().split('T')[0]
}
