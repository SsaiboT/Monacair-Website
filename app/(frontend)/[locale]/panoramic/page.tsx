'use client'

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import Footer from '@/components/shared/footer'
import FlightBooking from '@/components/panoramic/flight-booking'
import FlightRoute from '@/components/panoramic/flight-route'
import HelicopterTour from '@/components/panoramic/helicopter-tour'
import { PanoramicHero } from '@/components/panoramic/panoramic-hero'
import { useState, useEffect } from 'react'
import type { PanoramicFlight } from '@/payload-types'

export default function PanoramicPage() {
  const t = useTranslations('Panoramic')
  const searchParams = useSearchParams()
  const [panoramicFlight, setPanoramicFlight] = useState<PanoramicFlight | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const fromParam = searchParams.get('from')
        const toParam = searchParams.get('to')

        if (fromParam && toParam) {
          const response = await fetch(`/api/panoramic-flights?limit=100`)
          const data = await response.json()

          if (data.docs && Array.isArray(data.docs)) {
            const flight = data.docs.find((flight: PanoramicFlight) => {
              const startId =
                typeof flight.routes?.[0]?.start === 'string'
                  ? flight.routes[0].start
                  : flight.routes?.[0]?.start?.id

              let hasDestination = false
              flight.routes?.forEach((route) => {
                route.end?.forEach((endpoint) => {
                  const destId =
                    typeof endpoint.point_of_interest?.destination === 'string'
                      ? endpoint.point_of_interest.destination
                      : endpoint.point_of_interest?.destination?.id

                  if (destId === toParam) {
                    hasDestination = true
                  }
                })
              })

              return startId === fromParam && hasDestination
            })

            if (flight) {
              setPanoramicFlight(flight)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [searchParams])

  return (
    <div className="flex flex-col min-h-screen">
      <PanoramicHero imageSrc="/images/index/hero.webp" />

      <div className="container mx-auto py-16">
        <FlightBooking />
      </div>

      <div className="container mx-auto py-16">
        <FlightRoute />
      </div>

      <div className="py-16">
        <HelicopterTour />
      </div>

      <Footer />
    </div>
  )
}
