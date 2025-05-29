import { useState, useEffect, useMemo } from 'react'
import type { Destination, RegularFlight } from '@/payload-types'
import { getDestinations, getRegularFlights } from '@/app/(frontend)/[locale]/booking/actions'
import {
  findMatchingRoute,
  getAvailableDestinations,
  extractEntityId,
  isRouteReversed,
} from '@/lib/booking-utils'

interface UseFlightDataProps {
  initialRouteData?: RegularFlight | null
  initialStartPoint?: Destination | null
  initialEndPoint?: Destination | null
  initialIsReversed?: boolean
}

interface UseFlightDataReturn {
  destinations: Destination[]
  routes: RegularFlight[]
  availableDepartures: Destination[]
  availableDestinations: Destination[]
  currentRoute: RegularFlight | null
  maxPassengers: number
  loading: boolean
  error: string | null
  getAvailableDestinationsForDeparture: (departureId: string) => Destination[]
  updateCurrentRoute: (departureId: string, arrivalId: string) => void
}

export const useFlightData = ({
  initialRouteData,
  initialStartPoint,
  initialEndPoint,
  initialIsReversed,
}: UseFlightDataProps = {}): UseFlightDataReturn => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [routes, setRoutes] = useState<RegularFlight[]>([])
  const [currentRoute, setCurrentRoute] = useState<RegularFlight | null>(initialRouteData || null)

  const availableDepartures = useMemo(() => {
    if (loading || destinations.length === 0 || routes.length === 0) {
      return []
    }

    const departureIds = new Set<string>()

    routes.forEach((route) => {
      const startId = extractEntityId(route.start_point)
      const endId = extractEntityId(route.end_point)

      if (startId) departureIds.add(startId)
      if (endId) departureIds.add(endId)
    })

    return destinations.filter((dest) => departureIds.has(dest.id))
  }, [loading, destinations, routes])

  const maxPassengers = useMemo(() => {
    return currentRoute?.tariffs?.max_persons || 6
  }, [currentRoute])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [fetchedDestinations, fetchedRoutes] = await Promise.all([
          getDestinations(),
          getRegularFlights(),
        ])

        setDestinations(fetchedDestinations || [])
        setRoutes(fetchedRoutes || [])
      } catch (err) {
        console.error('Error fetching flight data:', err)
        setError('Failed to load flight data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getAvailableDestinationsForDeparture = (departureId: string): Destination[] => {
    if (!departureId || destinations.length === 0 || routes.length === 0) {
      return []
    }

    return getAvailableDestinations(routes, destinations, departureId)
  }

  const updateCurrentRoute = (departureId: string, arrivalId: string) => {
    if (!departureId || !arrivalId || routes.length === 0) {
      setCurrentRoute(null)
      return
    }

    const matchedRoute = findMatchingRoute(routes, departureId, arrivalId)
    setCurrentRoute(matchedRoute)
  }

  return {
    destinations,
    routes,
    availableDepartures,
    availableDestinations: [],
    currentRoute,
    maxPassengers,
    loading,
    error,
    getAvailableDestinationsForDeparture,
    updateCurrentRoute,
  } as UseFlightDataReturn & {
    getAvailableDestinationsForDeparture: (departureId: string) => Destination[]
    updateCurrentRoute: (departureId: string, arrivalId: string) => void
  }
}
