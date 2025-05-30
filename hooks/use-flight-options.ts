import { useMemo } from 'react'
import type { PanoramicFlight } from '@/payload-types'

interface FlightOption {
  type: 'shared' | 'private'
  minPrice: number
  availableDurations: number[]
}

interface FlightOptionsReturn {
  shared: FlightOption | null
  private: FlightOption | null
  allDurations: number[]
}

export const useFlightOptions = (panoramicFlight: PanoramicFlight | null): FlightOptionsReturn => {
  return useMemo(() => {
    if (!panoramicFlight || !panoramicFlight.routes || panoramicFlight.routes.length === 0) {
      return { shared: null, private: null, allDurations: [] }
    }

    const sharedOptions: FlightOption = {
      type: 'shared',
      minPrice: Infinity,
      availableDurations: [],
    }

    const privateOptions: FlightOption = {
      type: 'private',
      minPrice: Infinity,
      availableDurations: [],
    }

    const allDurations = new Set<number>()

    panoramicFlight.routes.forEach((route) => {
      if (!route.end || route.end.length === 0) return

      route.end.forEach((endpoint) => {
        const poi = endpoint.point_of_interest
        if (!poi || typeof poi === 'string') return

        if (poi.flight_duration) {
          allDurations.add(poi.flight_duration)
        }

        if (poi.fleets && Array.isArray(poi.fleets)) {
          poi.fleets.forEach((fleetEntry) => {
            const fleet = fleetEntry.fleet
            if (!fleet || typeof fleet === 'string') return

            const duration = poi.flight_duration || 0
            const flightType = fleet.type === 'public' ? 'shared' : 'private'
            const option = flightType === 'shared' ? sharedOptions : privateOptions

            if (duration > 0 && !option.availableDurations.includes(duration)) {
              option.availableDurations.push(duration)
            }

            if (!fleet.price_on_demand && typeof fleet.price === 'number' && fleet.price > 0) {
              option.minPrice = Math.min(option.minPrice, fleet.price)
            }
          })
        }
      })
    })

    if (sharedOptions.minPrice === Infinity) {
      sharedOptions.minPrice = 0
    }
    if (privateOptions.minPrice === Infinity) {
      privateOptions.minPrice = 0
    }

    sharedOptions.availableDurations.sort((a, b) => a - b)
    privateOptions.availableDurations.sort((a, b) => a - b)
    const sortedDurations = Array.from(allDurations).sort((a, b) => a - b)

    return {
      shared: sharedOptions.minPrice > 0 ? sharedOptions : null,
      private: privateOptions.minPrice > 0 ? privateOptions : null,
      allDurations: sortedDurations,
    }
  }, [panoramicFlight])
}
