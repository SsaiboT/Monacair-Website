import { HeroBanner } from '@/components/shared/hero-banner'
import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RegularFlight, Destination, PanoramicFlight } from '@/payload-types'
import BookingForm from 'components/booking/booking-form'
import RegularLineSection from 'components/booking/regular-line-section'
import VipService from 'components/booking/vip-service'
import PrivateFlights from 'components/booking/private-flights'
import Destinations from 'components/booking/destinations'
import JetPrive from 'components/booking/jet-prive'
import PanoramicFlights from 'components/booking/panoramic-flights'
import Footer from '@/components/shared/footer'

export default async function BookingPage() {
  const t = await getTranslations('Booking')
  const payload = await getPayload({ config })

  let initialAllDestinations: Destination[] = []
  let initialRoutes: RegularFlight[] = []
  let initialPanoramicFlights: PanoramicFlight[] = []

  try {
    const [destinationsData, routesData, panoramicData] = await Promise.all([
      payload.find({
        collection: 'destinations',
        limit: 0,
        overrideAccess: true,
      }),
      payload.find({
        collection: 'regular-flights',
        limit: 0,
        overrideAccess: true,
      }),
      payload.find({
        collection: 'panoramic-flights',
        limit: 0,
        overrideAccess: true,
      }),
    ])

    initialAllDestinations = destinationsData.docs || []
    initialRoutes = routesData.docs || []
    initialPanoramicFlights = panoramicData.docs || []
  } catch (error) {
    console.error('[BookingPage] Error fetching data:', error)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        buttonText={t('hero.buttonText')}
        buttonHref="/reservation"
        imageUrl="/images/index/hero.webp"
        imageAlt="Vue aérienne de Monaco"
      />

      <BookingForm
        initialAllDestinations={initialAllDestinations}
        initialRoutes={initialRoutes}
        initialPanoramicFlights={initialPanoramicFlights}
      />

      <PrivateFlights />

      <RegularLineSection />

      <VipService />

      <Destinations />

      <JetPrive />

      <PanoramicFlights />

      <Footer />
    </div>
  )
}
