'use client'

import { useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { PanoramicFlight } from '@/payload-types'

export default function FlightBooking() {
  const t = useTranslations('Panoramic.booking')
  const [flightType, setFlightType] = useState<'shared' | 'private'>('shared')
  const [duration, setDuration] = useState(20)
  const [price, setPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [flightData, setFlightData] = useState<PanoramicFlight | null>(null)

  const fetchFlightData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/panoramic-flights?limit=100')
      const data = await response.json()

      if (data.docs && data.docs.length > 0) {
        const firstFlight = data.docs[0]
        setFlightData(firstFlight)

        if (firstFlight.routes && firstFlight.routes.length > 0) {
          const route = firstFlight.routes[0]
          if (route.end && route.end.length > 0) {
            const pointOfInterest = route.end[0].point_of_interest
            if (pointOfInterest && pointOfInterest.fleets && pointOfInterest.fleets.length > 0) {
              const defaultFleetType = pointOfInterest.fleets[0].fleet.type
              setFlightType(defaultFleetType === 'public' ? 'shared' : 'private')
            }

            if (pointOfInterest && pointOfInterest.flight_duration) {
              setDuration(pointOfInterest.flight_duration)
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching flight data:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculatePrice = () => {
    if (!flightData || !flightData.routes || !flightData.routes.length) {
      return null
    }

    try {
      const route = flightData.routes[0]
      if (!route.end || !route.end.length) return null

      const pointOfInterest = route.end[0].point_of_interest
      if (!pointOfInterest || !pointOfInterest.fleets || !pointOfInterest.fleets.length) return null

      const selectedType = flightType === 'shared' ? 'public' : 'private'
      const matchingFleet = pointOfInterest.fleets.find(
        (fleet) => fleet.fleet.type === selectedType,
      )

      if (!matchingFleet || matchingFleet.fleet.price_on_demand) return null

      const basePrice = matchingFleet.fleet.price || 0
      const baseDuration = pointOfInterest.flight_duration || 20

      const durationFactor = duration / baseDuration
      const calculatedPrice = Math.round(basePrice * durationFactor)

      return calculatedPrice
    } catch (error) {
      console.error('Error calculating price:', error)
      return null
    }
  }

  useEffect(() => {
    fetchFlightData()
  }, [])

  useEffect(() => {
    if (flightData) {
      const calculatedPrice = calculatePrice()
      setPrice(calculatedPrice)
    }
  }, [flightData, flightType, duration])

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
                {t('startingFrom')} {t('sharedPrice')}
              </span>
            </label>

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
                {t('startingFrom')} {t('privatePrice')}
              </span>
            </label>
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

            <div className="w-full px-2">
              <Slider
                defaultValue={[duration]}
                max={60}
                min={10}
                step={5}
                onValueChange={(value) => setDuration(value[0])}
                className="w-full [&_[data-slot=slider-range]]:bg-[color:var(--color-redmonacair)] [&_[data-slot=slider-thumb]]:border-[color:var(--color-redmonacair)]"
              />
            </div>
          </div>
        </div>

        <div className="bg-[color:var(--color-royalblue)]/80 rounded-2xl p-6 flex-1 flex flex-col justify-between">
          <div className="flex flex-col items-center justify-center h-[calc(100%-4rem)]">
            <div className="flex flex-col items-center">
              <span className="text-[color:var(--color-redmonacair)] text-7xl font-bold font-brother">
                {loading ? '...' : price ? `${price}€` : t('price')}
              </span>
              <span className="text-white text-xl font-brother">{t('perFlight')}</span>
            </div>
          </div>

          <Button
            variant="red"
            className="text-white py-4 px-6 rounded-full text-xl font-medium w-full bg-[color:var(--color-redmonacair)] hover:bg-[color:var(--color-redmonacair)]/90 transition-colors font-brother uppercase"
          >
            {t('bookButton')}
          </Button>
        </div>
      </div>
    </div>
  )
}
