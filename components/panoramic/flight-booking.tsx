'use client'

import { useState, useEffect, useMemo } from 'react'
import { Slider } from '@/components/ui/slider'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { PanoramicFlight } from '@/payload-types'
import { Link } from '@/i18n/navigation'

interface FlightOption {
  type: 'shared' | 'private'
  minPrice: number
  availableDurations: number[]
}

interface FlightBookingProps {
  panoramicFlight: PanoramicFlight | null
  passengers?: {
    adults: number
    children: number
    infants: number
  }
}

export default function FlightBooking({ panoramicFlight, passengers }: FlightBookingProps) {
  const t = useTranslations('Panoramic.booking')

  const flightOptions = useMemo(() => {
    if (!panoramicFlight || !panoramicFlight.routes || panoramicFlight.routes.length === 0) {
      return { shared: null, private: null, allDurations: [] }
    }

    const route = panoramicFlight.routes[0]
    if (!route.end || route.end.length === 0) {
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

  const [flightType, setFlightType] = useState<'shared' | 'private'>('shared')
  const [duration, setDuration] = useState<number>(0)
  const [price, setPrice] = useState<number | null>(null)

  useEffect(() => {
    if (flightOptions.shared) {
      setFlightType('shared')
    } else if (flightOptions.private) {
      setFlightType('private')
    }
  }, [flightOptions])

  useEffect(() => {
    const currentOption = flightType === 'shared' ? flightOptions.shared : flightOptions.private

    if (currentOption && currentOption.availableDurations.length > 0) {
      setDuration(currentOption.availableDurations[0])
    } else if (flightOptions.allDurations.length > 0) {
      setDuration(flightOptions.allDurations[0])
    } else {
      setDuration(0)
    }
  }, [flightType, flightOptions])

  useEffect(() => {
    if (!panoramicFlight || !panoramicFlight.routes || panoramicFlight.routes.length === 0) {
      setPrice(null)
      return
    }

    try {
      const route = panoramicFlight.routes[0]
      const selectedType = flightType === 'shared' ? 'public' : 'private'

      let matchingPrice = null

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

      setPrice(matchingPrice)
    } catch (error) {
      console.error('Error calculating price:', error)
      setPrice(null)
    }
  }, [panoramicFlight, flightType, duration])

  const availableDurations = useMemo(() => {
    const currentOption = flightType === 'shared' ? flightOptions.shared : flightOptions.private
    return currentOption?.availableDurations || flightOptions.allDurations
  }, [flightType, flightOptions])

  const handleDurationChange = (newValue: number[]) => {
    const value = newValue[0]

    if (availableDurations.length > 0) {
      const closestDuration = availableDurations.reduce((prev, curr) =>
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev,
      )
      setDuration(closestDuration)
    }
  }

  if (!panoramicFlight) {
    return (
      <div className="w-full px-30">
        <div className="bg-[color:var(--color-royalblue)] rounded-3xl p-8 text-white text-center">
          <p>{t('noFlightSelected')}</p>
        </div>
      </div>
    )
  }

  const hasSharedOption = flightOptions.shared !== null
  const hasPrivateOption = flightOptions.private !== null
  const hasDurations = availableDurations.length > 0

  if (!hasSharedOption && !hasPrivateOption) {
    return (
      <div className="w-full px-30">
        <div className="bg-[color:var(--color-royalblue)] rounded-3xl p-8 text-white text-center">
          <p>{t('noFlightOptions')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-30">
      <div className="bg-[color:var(--color-royalblue)] rounded-3xl p-8 flex flex-col md:flex-row gap-6">
        <div className="bg-[color:var(--color-royalblue)]/80 rounded-2xl p-6 flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[color:var(--color-redmonacair)] rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
              1
            </div>
            <h2 className="text-white text-2xl font-medium font-brother">{t('flightType')}</h2>
          </div>

          <RadioGroup
            value={flightType}
            onValueChange={(value) => setFlightType(value as 'shared' | 'private')}
            className="space-y-4"
          >
            {hasSharedOption && (
              <label
                className={`flex items-center justify-between bg-[color:var(--color-royalblue)]/80 rounded-xl p-4 cursor-pointer border ${
                  flightType === 'shared'
                    ? 'border-[color:var(--color-redmonacair)]'
                    : 'border-[color:var(--color-royalblue)]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    value="shared"
                    className="border-[color:var(--color-redmonacair)] data-[state=checked]:bg-[color:var(--color-redmonacair)]"
                  />
                  <span className="text-white text-xl font-brother">{t('sharedTour')}</span>
                </div>
                <span className="text-gray-400 font-brother">
                  {t('startingFrom')} {flightOptions.shared?.minPrice}€
                </span>
              </label>
            )}

            {hasPrivateOption && (
              <label
                className={`flex items-center justify-between bg-[color:var(--color-royalblue)]/80 rounded-xl p-4 cursor-pointer border ${
                  flightType === 'private'
                    ? 'border-[color:var(--color-redmonacair)]'
                    : 'border-[color:var(--color-royalblue)]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    value="private"
                    className="border-[color:var(--color-redmonacair)] data-[state=checked]:bg-[color:var(--color-redmonacair)]"
                  />
                  <span className="text-white text-xl font-brother">{t('privateTour')}</span>
                </div>
                <span className="text-gray-400 font-brother">
                  {t('startingFrom')} {flightOptions.private?.minPrice}€
                </span>
              </label>
            )}
          </RadioGroup>
        </div>

        <div className="bg-[color:var(--color-royalblue)]/80 rounded-2xl p-6 flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[color:var(--color-redmonacair)] rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
              2
            </div>
            <h2 className="text-white text-2xl font-medium font-brother">{t('duration')}</h2>
          </div>

          <div className="flex flex-col items-center justify-center h-[calc(100%-4rem)]">
            <div className="flex items-end gap-2 mb-8">
              <span className="text-[color:var(--color-redmonacair)] text-7xl font-bold font-brother">
                {duration}
              </span>
              <span className="text-white text-2xl mb-2 font-brother">{t('minutes')}</span>
            </div>

            {hasDurations && (
              <div className="w-full px-2">
                <Slider
                  value={[duration]}
                  max={Math.max(...availableDurations)}
                  min={Math.min(...availableDurations)}
                  step={1}
                  onValueChange={handleDurationChange}
                  disabled={availableDurations.length <= 1}
                  className="w-full [&_[data-slot=slider-range]]:bg-[color:var(--color-redmonacair)] [&_[data-slot=slider-thumb]]:border-[color:var(--color-redmonacair)]"
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-[color:var(--color-royalblue)]/80 rounded-2xl p-6 flex-1 flex flex-col justify-between">
          <div className="flex flex-col items-center justify-center h-[calc(100%-4rem)]">
            <div className="flex flex-col items-center">
              <span className="text-[color:var(--color-redmonacair)] text-7xl font-bold font-brother">
                {price ? `${price}€` : t('price')}
              </span>
              <span className="text-white text-xl font-brother">{t('perFlight')}</span>
            </div>
          </div>

          {typeof panoramicFlight.start !== 'string' &&
            panoramicFlight.routes[0]?.end[0]?.point_of_interest?.stops &&
            panoramicFlight.routes[0].end[0].point_of_interest.stops.length > 0 && (
              <Link
                href={{
                  pathname: `/booking/panoramic/${panoramicFlight.start.slug}/${
                    typeof panoramicFlight.routes[0].end[0].point_of_interest.stops[0] === 'string'
                      ? panoramicFlight.routes[0].end[0].point_of_interest.stops[0]
                      : panoramicFlight.routes[0].end[0].point_of_interest.stops[0].slug
                  }`,
                  query: passengers
                    ? {
                        passengers: [
                          passengers.adults.toString(),
                          passengers.children.toString(),
                          passengers.infants.toString(),
                        ],
                      }
                    : undefined,
                }}
              >
                <Button
                  variant={'red'}
                  className="text-white py-4 px-6 rounded-full text-xl font-medium w-full bg-[color:var(--color-redmonacair)] hover:bg-[color:var(--color-redmonacair)]/90 transition-colors font-brother uppercase"
                >
                  {t('bookButton')}
                </Button>
              </Link>
            )}
        </div>
      </div>
    </div>
  )
}
