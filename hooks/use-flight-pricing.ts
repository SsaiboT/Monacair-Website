import { useState, useEffect } from 'react'
import type { PanoramicFlight } from '@/payload-types'

export const useFlightPricing = (
  panoramicFlight: PanoramicFlight | null,
  flightType: 'shared' | 'private',
  duration: number,
) => {
  const [price, setPrice] = useState<number | null>(null)

  useEffect(() => {
    if (!panoramicFlight || !panoramicFlight.routes || panoramicFlight.routes.length === 0) {
      setPrice(null)
      return
    }

    try {
      const selectedType = flightType === 'shared' ? 'public' : 'private'
      let matchingPrice = null

      for (const route of panoramicFlight.routes) {
        if (!route.end || route.end.length === 0) continue

        for (const endpoint of route.end) {
          const poi = endpoint.point_of_interest
          if (!poi || typeof poi === 'string' || !poi.fleets || poi.flight_duration !== duration)
            continue

          for (const fleetEntry of poi.fleets) {
            const fleet = fleetEntry.fleet
            if (!fleet || typeof fleet === 'string' || fleet.type !== selectedType) continue

            if (fleet.price_on_demand) continue

            if (typeof fleet.price === 'number' && fleet.price > 0) {
              matchingPrice = fleet.price
              break
            }
          }

          if (matchingPrice !== null) break
        }

        if (matchingPrice !== null) break
      }

      setPrice(matchingPrice)
    } catch (error) {
      console.error('Error calculating price:', error)
      setPrice(null)
    }
  }, [panoramicFlight, flightType, duration])

  return price
}
