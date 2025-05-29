'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import type { PanoramicFlight, Fleet } from '@/payload-types'

interface FleetSelectionProps {
  currentPanoramicFlight: PanoramicFlight | null
  flightType: 'shared' | 'private'
  duration: number
  selectedFleetId: string
  setSelectedFleetId: (fleetId: string) => void
}

export default function FleetSelection({
  currentPanoramicFlight,
  flightType,
  duration,
  selectedFleetId,
  setSelectedFleetId,
}: FleetSelectionProps) {
  const t = useTranslations('Panoramic.Reservation')

  console.log('FleetSelection render:', {
    currentPanoramicFlight: !!currentPanoramicFlight,
    flightType,
    duration,
    selectedFleetId,
    routes: currentPanoramicFlight?.routes?.length,
    panoramicFlightData: currentPanoramicFlight
      ? {
          id: currentPanoramicFlight.id,
          title:
            typeof currentPanoramicFlight.start === 'string'
              ? currentPanoramicFlight.start
              : currentPanoramicFlight.start?.title,
          routesCount: currentPanoramicFlight.routes?.length || 0,
        }
      : null,
  })

  const availableFleets = React.useMemo(() => {
    if (!currentPanoramicFlight || !currentPanoramicFlight.routes) {
      console.log('FleetSelection: No current panoramic flight or routes')
      return []
    }

    console.log('FleetSelection: Processing flight data:', {
      flightId: currentPanoramicFlight.id,
      routesCount: currentPanoramicFlight.routes.length,
      selectedType: flightType === 'shared' ? 'public' : 'private',
      targetDuration: duration,
    })

    const fleets: Array<{
      id: string
      helicopter: Fleet
      price: number | null
      priceOnDemand: boolean
    }> = []

    const selectedType = flightType === 'shared' ? 'public' : 'private'

    currentPanoramicFlight.routes.forEach((route, routeIndex) => {
      console.log(`Route ${routeIndex}:`, { endpointsCount: route.end?.length || 0 })

      route.end?.forEach((endpoint, endpointIndex) => {
        const poi = endpoint.point_of_interest
        console.log(`  Endpoint ${endpointIndex}:`, {
          hasPoi: !!poi,
          poiType: typeof poi,
          duration: poi && typeof poi === 'object' ? poi.flight_duration : 'N/A',
          fleetsCount: poi && typeof poi === 'object' && poi.fleets ? poi.fleets.length : 0,
        })

        if (poi && typeof poi === 'object' && poi.flight_duration === duration && poi.fleets) {
          poi.fleets.forEach((fleetEntry, fleetIndex) => {
            const fleet = fleetEntry.fleet
            console.log(`    Fleet ${fleetIndex}:`, {
              hasFleet: !!fleet,
              fleetType: typeof fleet,
              fleetDetails:
                fleet && typeof fleet === 'object'
                  ? {
                      type: fleet.type,
                      price: fleet.price,
                      priceOnDemand: fleet.price_on_demand,
                      helicopterExists: !!fleet.helicopter,
                    }
                  : null,
            })

            if (fleet && typeof fleet === 'object' && fleet.type === selectedType) {
              const helicopter = fleet.helicopter
              if (helicopter && typeof helicopter === 'object') {
                console.log(`      Adding helicopter: ${helicopter.name}`)
                fleets.push({
                  id: helicopter.id,
                  helicopter,
                  price: fleet.price || null,
                  priceOnDemand: fleet.price_on_demand || false,
                })
              }
            }
          })
        }
      })
    })

    const uniqueFleets = fleets.filter(
      (fleet, index, self) => self.findIndex((f) => f.id === fleet.id) === index,
    )

    console.log('Available fleets:', uniqueFleets.length, uniqueFleets)

    return uniqueFleets
  }, [currentPanoramicFlight, flightType, duration])

  const selectedFleet = availableFleets.find((fleet) => fleet.id === selectedFleetId)

  React.useEffect(() => {
    if (availableFleets.length > 0 && !selectedFleetId) {
      setSelectedFleetId(availableFleets[0].id)
    }
  }, [availableFleets, selectedFleetId, setSelectedFleetId])

  if (availableFleets.length === 0) {
    return null
  }

  return (
    <div className="card mb-8 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        {t('fleet.title', { defaultValue: "Sélection de l'hélicoptère" })}
      </h3>

      {availableFleets.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Aucun hélicoptère disponible pour cette configuration</p>
          <p className="text-sm mt-2">
            Type: {flightType}, Durée: {duration}min, Routes:{' '}
            {currentPanoramicFlight?.routes?.length || 0}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t('fleet.selectHelicopter', { defaultValue: 'Choisir un hélicoptère' })}
            </label>
            <div className="relative">
              <select
                value={selectedFleetId}
                onChange={(e) => setSelectedFleetId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royalblue appearance-none bg-white"
              >
                {availableFleets.map((fleet) => (
                  <option key={fleet.id} value={fleet.id}>
                    {fleet.helicopter.name}
                    {fleet.priceOnDemand
                      ? ` - ${t('fleet.priceOnDemand', { defaultValue: 'Prix sur demande' })}`
                      : fleet.price
                        ? ` - ${fleet.price}€`
                        : ''}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {selectedFleet && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">{selectedFleet.helicopter.name}</h4>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {t('fleet.helicopter', { defaultValue: 'Hélicoptère sélectionné' })}
                  </span>
                  <span className="font-medium text-royalblue">
                    {selectedFleet.priceOnDemand
                      ? t('fleet.priceOnDemand', { defaultValue: 'Prix sur demande' })
                      : selectedFleet.price
                        ? `${selectedFleet.price}€`
                        : t('fleet.included', { defaultValue: 'Inclus' })}
                  </span>
                </div>
              </div>
            )}
          </div>

          {selectedFleet && selectedFleet.helicopter.image && (
            <div className="flex justify-center items-center">
              <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                {typeof selectedFleet.helicopter.image === 'object' &&
                selectedFleet.helicopter.image.url ? (
                  <Image
                    src={selectedFleet.helicopter.image.url}
                    alt={selectedFleet.helicopter.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <span>{t('fleet.noImage', { defaultValue: 'Aucune image disponible' })}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
