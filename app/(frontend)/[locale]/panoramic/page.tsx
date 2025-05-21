import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { PanoramicFlight, Destination } from '@/payload-types'
import Footer from '@/components/shared/footer'
import FlightBooking from '@/components/panoramic/flight-booking'
import FlightRoute from '@/components/panoramic/flight-route'
import HelicopterTour from '@/components/panoramic/helicopter-tour'
import { PanoramicHero } from '@/components/panoramic/panoramic-hero'

interface PanoramicPageProps {
  params: { locale: string }
  searchParams: {
    from?: string
    to?: string
  }
}

export default async function PanoramicPage({
  params,
  searchParams: initialSearchParams,
}: PanoramicPageProps) {
  const t = await getTranslations('Panoramic')
  const payload = await getPayload({ config })

  const searchParams = await Promise.resolve(initialSearchParams)

  let panoramicFlight: PanoramicFlight | null = null
  let error: string | null = null

  const fromParam = searchParams.from
  const toParam = searchParams.to

  if (fromParam && toParam) {
    try {
      const panoramicFlightsData = await payload.find({
        collection: 'panoramic-flights',
        limit: 1000,
        depth: 2,
        overrideAccess: true,
      })

      if (panoramicFlightsData.docs && Array.isArray(panoramicFlightsData.docs)) {
        const foundFlight = panoramicFlightsData.docs.find((flight) => {
          const startPoint = flight.routes?.[0]?.start as Destination | undefined | string
          const startId = typeof startPoint === 'string' ? startPoint : startPoint?.id

          let hasDestination = false
          flight.routes?.forEach((route) => {
            route.end?.forEach((endpoint) => {
              const destinationPoint = endpoint.point_of_interest?.destination as
                | Destination
                | undefined
                | string
              const destId =
                typeof destinationPoint === 'string' ? destinationPoint : destinationPoint?.id
              if (destId === toParam) {
                hasDestination = true
              }
            })
          })
          return startId === fromParam && hasDestination
        })

        if (foundFlight) {
          panoramicFlight = foundFlight
        } else {
        }
      }
    } catch (err: any) {
      console.error('[PanoramicPage] Error fetching data:', err)
      error = `Failed to load panoramic flight data: ${err.message || 'Unknown error'}`
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PanoramicHero imageSrc="/images/index/hero.webp" />

      {error && (
        <div className="container mx-auto py-12 text-center">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      )}

      <div className="container mx-auto py-16">
        <FlightBooking panoramicFlight={panoramicFlight} />
      </div>

      <div className="container mx-auto py-16">
        <FlightRoute panoramicFlight={panoramicFlight} />
      </div>

      <div className="py-16">
        <HelicopterTour panoramicFlight={panoramicFlight} />
      </div>

      <Footer />
    </div>
  )
}
