'use client'

import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import type { PanoramicFlight, Destination } from '../../payload-types'

interface Stop {
  title?: string
  id: string
}

export default function FlightRoute() {
  const t = useTranslations('Panoramic.route')
  const searchParams = useSearchParams()

  const [loading, setLoading] = useState(true)
  const [panoramicFlights, setPanoramicFlights] = useState<PanoramicFlight[]>([])
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [stops, setStops] = useState<Array<{ name: string; isMainStop: boolean }>>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [panoramicResponse, destinationsResponse] = await Promise.all([
          fetch('/api/panoramic-flights?where[active][equals]=true&limit=100'),
          fetch('/api/destinations?limit=100'),
        ])

        const panoramicData = await panoramicResponse.json()
        const destinationsData = await destinationsResponse.json()

        if (panoramicData.docs && Array.isArray(panoramicData.docs)) {
          setPanoramicFlights(panoramicData.docs)
        }

        if (destinationsData.docs && Array.isArray(destinationsData.docs)) {
          setDestinations(destinationsData.docs)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (panoramicFlights.length > 0 && destinations.length > 0) {
      const fromParam = searchParams.get('from')
      const toParam = searchParams.get('to')

      if (fromParam && toParam) {
        const flight = panoramicFlights.find((f) => {
          const startId =
            typeof f.routes?.[0]?.start === 'string' ? f.routes[0].start : f.routes?.[0]?.start?.id
          return startId === fromParam
        })

        if (flight) {
          let foundRoute: (typeof flight.routes)[0] | undefined
          let foundEndpoint: (typeof flight.routes)[0]['end'][0] | undefined

          flight.routes?.forEach((route) => {
            route.end?.forEach((endpoint) => {
              const destId =
                typeof endpoint.point_of_interest?.destination === 'string'
                  ? endpoint.point_of_interest.destination
                  : endpoint.point_of_interest?.destination?.id

              if (destId === toParam) {
                foundRoute = route
                foundEndpoint = endpoint
              }
            })
          })

          if (foundRoute && foundEndpoint) {
            const startDestination = destinations.find((dest) => {
              const startId =
                foundRoute && foundRoute.start
                  ? typeof foundRoute.start === 'string'
                    ? foundRoute.start
                    : (foundRoute.start as { id: string })?.id
                  : ''
              return dest.id === startId
            })

            const endDestination = destinations.find((dest) => {
              const destId =
                foundEndpoint && foundEndpoint.point_of_interest?.destination
                  ? typeof foundEndpoint.point_of_interest.destination === 'string'
                    ? foundEndpoint.point_of_interest.destination
                    : foundEndpoint.point_of_interest.destination?.id
                  : ''
              return dest.id === destId
            })

            const stopsArray = foundEndpoint?.point_of_interest?.stops || []
            const stopDestinations = stopsArray
              .map((stop) => {
                const stopId = typeof stop === 'string' ? stop : stop.id
                return destinations.find((d) => d.id === stopId)
              })
              .filter(Boolean) as Destination[]

            const routeStops = [{ name: startDestination?.title || 'Start', isMainStop: true }]

            stopDestinations.forEach((stop) => {
              if (stop) {
                routeStops.push({ name: stop.title || '', isMainStop: false })
              }
            })

            routeStops.push({ name: endDestination?.title || 'End', isMainStop: true })

            setStops(routeStops)
          }
        }
      }
    }
  }, [panoramicFlights, destinations, searchParams])

  if (loading || stops.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-[color:var(--color-royalblue)] text-5xl font-serif font-caslon mb-16 tracking-tight">
          {t('title')}
        </h1>
        <div className="text-center py-8">
          {loading ? 'Chargement des itinéraires...' : 'Sélectionnez un vol panoramique'}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-[color:var(--color-royalblue)] text-5xl font-serif font-caslon mb-16 tracking-tight">
        {t('title')}
      </h1>

      <div className="relative">
        <div className="flex justify-between mb-8">
          <h2 className="text-3xl font-bold font-brother">{stops[0]?.name || ''}</h2>
          <h2 className="text-3xl font-bold font-brother">{stops[stops.length - 1]?.name || ''}</h2>
        </div>

        <div className="relative">
          <div className="absolute top-[14px] left-0 right-0 border-t-4 border-dashed border-[color:var(--color-redmonacair)] z-0"></div>

          <div className="flex justify-between relative z-10">
            {stops.map((stop, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full border-4 border-[color:var(--color-redmonacair)] bg-white ${index === 0 || index === stops.length - 1 ? 'ring-4 ring-[color:var(--color-redmonacair)] ring-opacity-30' : ''}`}
                ></div>
                {!stop.isMainStop && (
                  <div className="mt-6 text-center text-gray-600 max-w-[120px] font-brother">
                    {stop.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
