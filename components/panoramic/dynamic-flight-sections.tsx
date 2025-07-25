'use client'

import { useState, useEffect } from 'react'
import FlightBooking from './flight-booking'
import FlightRoute from './flight-route'
import HelicopterTour from './helicopter-tour'
import type { PanoramicFlight } from '@/payload-types'
import { describe } from 'node:test'

interface DynamicFlightSectionsProps {
  initialPanoramicFlight: PanoramicFlight
  passengers?: {
    adults: number
    children: number
    infants: number
  }
}

export default function DynamicFlightSections({
  initialPanoramicFlight,
  passengers,
}: DynamicFlightSectionsProps) {
  const [selectedFlightType, setSelectedFlightType] = useState<'shared' | 'private'>('shared')
  const [selectedDuration, setSelectedDuration] = useState<number>(0)
  const [dynamicPanoramicFlight, setDynamicPanoramicFlight] =
    useState<PanoramicFlight>(initialPanoramicFlight)

  useEffect(() => {
    if (!initialPanoramicFlight || !initialPanoramicFlight.routes) return

    const filteredFlight = { ...initialPanoramicFlight }

    filteredFlight.routes = initialPanoramicFlight.routes
      .map((route) => {
        return {
          ...route,
          end: route.end.filter((endpoint) => {
            const poi = endpoint.point_of_interest
            if (!poi || typeof poi === 'string') return false

            if (selectedDuration > 0 && poi.flight_duration !== selectedDuration) {
              return false
            }

            if (poi.fleets && Array.isArray(poi.fleets)) {
              const hasMatchingFleet = poi.fleets.some((fleetEntry) => {
                const fleet = fleetEntry.fleet
                if (!fleet || typeof fleet === 'string') return false

                const fleetType = fleet.type === 'public' ? 'shared' : 'private'
                return fleetType === selectedFlightType
              })
              return hasMatchingFleet
            }

            return false
          }),
        }
      })
      .filter((route) => route.end.length > 0)

    setDynamicPanoramicFlight(filteredFlight)
  }, [selectedFlightType, selectedDuration, initialPanoramicFlight])

  const handleFlightSelectionChange = (flightType: 'shared' | 'private', duration: number) => {
    setSelectedFlightType(flightType)
    setSelectedDuration(duration)
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Trip',
    description: selectedFlightType,
    itinerary: [
      {
        '@type': 'Place',
        name:
          typeof initialPanoramicFlight.start !== 'string'
            ? initialPanoramicFlight.start.title
            : initialPanoramicFlight.start,
        address: {
          '@type': 'PostalAddress',
          addressLocality:
            typeof initialPanoramicFlight?.start !== 'string'
              ? typeof initialPanoramicFlight?.start.region !== 'string'
                ? initialPanoramicFlight?.start.region.name
                : initialPanoramicFlight?.start.region
              : initialPanoramicFlight?.start,
          addressCountry:
            typeof initialPanoramicFlight.start !== 'string'
              ? initialPanoramicFlight.start.country
              : initialPanoramicFlight.start,
        },
      },
    ],
    provider: {
      '@type': 'Organization',
      name: 'Monacair',
      description: 'Helicopter transportation.',
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
      <div className="container mx-auto py-16">
        <FlightBooking
          panoramicFlight={initialPanoramicFlight}
          passengers={passengers}
          onFlightSelectionChange={handleFlightSelectionChange}
        />
      </div>

      <div className="container mx-auto py-16">
        <FlightRoute panoramicFlight={dynamicPanoramicFlight} />
      </div>

      <div className="py-16">
        <HelicopterTour panoramicFlight={dynamicPanoramicFlight} passengers={passengers} />
      </div>
    </>
  )
}
