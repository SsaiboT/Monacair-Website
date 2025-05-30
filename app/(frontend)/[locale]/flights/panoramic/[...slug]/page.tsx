import type { Destination } from '@/payload-types'
import Footer from '@/components/shared/footer'
import DynamicFlightSections from '@/components/panoramic/dynamic-flight-sections'
import { PanoramicHero } from '@/components/panoramic/panoramic-hero'
import { getPayloadClient } from '@/lib/payload'
import { redirect } from '@/i18n/navigation'

const Panoramic = async ({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: Destination['slug'][] }>
  searchParams: Promise<{
    passengers?: string[]
  }>
}) => {
  const fromParam = (await params).slug[0]
  const toParam = (await params).slug[1]

  const query = await searchParams.then((res) => ({
    passengers: {
      adults: res.passengers && res.passengers[0] ? parseInt(res.passengers[0], 10) || 1 : 1,
      children: res.passengers && res.passengers[1] ? parseInt(res.passengers[1], 10) || 0 : 0,
      infants: res.passengers && res.passengers[2] ? parseInt(res.passengers[2], 10) || 0 : 0,
    },
  }))

  const payload = await getPayloadClient()
  const panoramicFlightsData = await payload.find({
    collection: 'panoramic-flights',
    limit: 0,
    depth: 2,
    overrideAccess: true,
  })

  const panoramicFlight = (() => {
    if (panoramicFlightsData.docs && Array.isArray(panoramicFlightsData.docs)) {
      const foundFlight = panoramicFlightsData.docs.find((flight) => {
        const startPoint = flight.start
        const startId = typeof startPoint === 'string' ? startPoint : startPoint?.slug

        if (fromParam === toParam) {
          return startId === fromParam
        }

        let hasDestination = false
        flight.routes?.forEach((route) => {
          route.end?.forEach((endpoint) => {
            const poi = endpoint.point_of_interest
            if (poi && typeof poi !== 'string' && poi.stops) {
              poi.stops.forEach((stop) => {
                const stopId = typeof stop === 'string' ? stop : stop?.slug
                if (stopId === toParam) {
                  hasDestination = true
                }
              })
            }
          })
        })

        return startId === fromParam && hasDestination
      })

      if (foundFlight) {
        if (fromParam === toParam) {
          return foundFlight
        }

        foundFlight.routes = foundFlight.routes
          .map((route) => {
            return {
              ...route,
              end: route.end.filter((endpoint) => {
                const poi = endpoint.point_of_interest
                if (poi && typeof poi !== 'string' && poi.stops) {
                  return poi.stops.some((stop) => {
                    const stopId = typeof stop === 'string' ? stop : stop?.slug
                    return stopId === toParam
                  })
                }
                return false
              }),
            }
          })
          .filter((route) => route.end.length > 0)

        return foundFlight
      }
      return null
    }
  })()

  return panoramicFlight ? (
    <div className="flex flex-col min-h-screen">
      <PanoramicHero imageSrc="/images/index/hero.webp" />

      <DynamicFlightSections
        initialPanoramicFlight={panoramicFlight}
        passengers={query.passengers}
      />

      <Footer />
    </div>
  ) : (
    redirect({ href: '/flights', locale: (await params).locale })
  )
}

export default Panoramic
