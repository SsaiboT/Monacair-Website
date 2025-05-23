import type { Destination } from '@/payload-types'
import Footer from '@/components/shared/footer'
import FlightBooking from '@/components/panoramic/flight-booking'
import FlightRoute from '@/components/panoramic/flight-route'
import HelicopterTour from '@/components/panoramic/helicopter-tour'
import { PanoramicHero } from '@/components/panoramic/panoramic-hero'
import payload from '@/lib/payload'
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

        let hasDestination = false
        flight.routes?.forEach((route) => {
          route.end?.forEach((endpoint) => {
            const destinationPoint = endpoint.point_of_interest?.destination
            const destId =
              typeof destinationPoint === 'string' ? destinationPoint : destinationPoint?.slug
            if (destId === toParam) {
              hasDestination = true
            }
          })
        })

        return startId === fromParam && hasDestination
      })

      if (foundFlight) {
        foundFlight.routes = foundFlight.routes
          .map((route) => {
            return {
              ...route,
              end: route.end.filter((endpoint) => {
                const destinationPoint = endpoint.point_of_interest?.destination as
                  | Destination
                  | undefined
                  | string
                const destId =
                  typeof destinationPoint === 'string' ? destinationPoint : destinationPoint?.slug
                return destId === toParam
              }),
            }
          })
          .filter((route) => route.end.length > 0)

        return foundFlight
      }
      return null
    }
  })()

  return panoramicFlight ? ( // TODO: Make the flight itinerary's stops dynamic depending on the selected route length and type (public / private)
    <div className="flex flex-col min-h-screen">
      <PanoramicHero imageSrc="/images/index/hero.webp" />

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
  ) : (
    redirect({ href: '/flights', locale: (await params).locale })
  )
}

export default Panoramic
