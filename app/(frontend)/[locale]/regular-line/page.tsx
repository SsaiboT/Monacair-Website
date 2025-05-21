import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RegularFlight, Destination, Media } from '@/payload-types'
import { HeroBanner } from '@/components/shared/hero-banner'
import Introduction from '@/components/regular-line/introduction'
import Schedule from '@/components/regular-line/schedule'
import Pricing from '@/components/regular-line/pricing'
import BookingForm from '@/components/regular-line/booking-form'
import CharterSection from '@/components/regular-line/charter-section'
import Benefits from '@/components/regular-line/benefits'
import FAQ from '@/components/regular-line/faq'
import CTASection from '@/components/regular-line/cta-section'
import Footer from '@/components/shared/footer'

interface RegularLinePageProps {
  params: { locale: string }
  searchParams: {
    routeId?: string
    from?: string
    to?: string
    isReversed?: string
  }
}

export default async function RegularLinePage({
  params,
  searchParams: initialSearchParams,
}: RegularLinePageProps) {
  const t = await getTranslations('RegularLine')
  const payload = await getPayload({ config })

  const searchParams = await Promise.resolve(initialSearchParams)

  let routeData: RegularFlight | null = null
  let pageStartPoint: Destination | null = null
  let pageEndPoint: Destination | null = null
  let error: string | null = null
  let isRouteDisplayReversed = searchParams.isReversed === 'true'

  try {
    const routeId = searchParams.routeId
    const fromId = searchParams.from
    const toId = searchParams.to

    if (routeId) {
      const fetchedRouteData = await payload.findByID({
        collection: 'regular-flights',
        id: routeId,
        depth: 2,
        overrideAccess: true,
      })
      if (fetchedRouteData) {
        routeData = fetchedRouteData as RegularFlight

        const routeStartPoint = routeData.start_point as Destination
        const routeEndPoint = routeData.end_point as Destination

        pageStartPoint = isRouteDisplayReversed ? routeEndPoint : routeStartPoint
        pageEndPoint = isRouteDisplayReversed ? routeStartPoint : routeEndPoint
      } else {
        error = 'Route not found with the given ID.'
      }
    } else if (fromId && toId) {
      const startPointData = await payload.findByID({
        collection: 'destinations',
        id: fromId,
        depth: 1,
        overrideAccess: true,
      })
      pageStartPoint = startPointData as Destination

      const endPointData = await payload.findByID({
        collection: 'destinations',
        id: toId,
        depth: 1,
        overrideAccess: true,
      })
      pageEndPoint = endPointData as Destination

      if (pageStartPoint && pageEndPoint) {
        const routesResponse = await payload.find({
          collection: 'regular-flights',
          where: {
            'start_point.id': { equals: fromId },
            'end_point.id': { equals: toId },
          },
          limit: 1,
          depth: 2,
          overrideAccess: true,
        })

        if (routesResponse.docs && routesResponse.docs.length > 0) {
          routeData = routesResponse.docs[0] as RegularFlight
          isRouteDisplayReversed = false
        } else {
          const reversedRoutesResponse = await payload.find({
            collection: 'regular-flights',
            where: {
              'start_point.id': { equals: toId },
              'end_point.id': { equals: fromId },
            },
            limit: 1,
            depth: 2,
            overrideAccess: true,
          })
          if (reversedRoutesResponse.docs && reversedRoutesResponse.docs.length > 0) {
            routeData = reversedRoutesResponse.docs[0] as RegularFlight
            isRouteDisplayReversed = true
            const temp = pageStartPoint
            pageStartPoint = pageEndPoint
            pageEndPoint = temp
          } else {
            error = 'No direct or reverse route found between the specified destinations.'
          }
        }
      } else {
        error = 'Start or end destination not found.'
      }
    }
  } catch (err: any) {
    console.error('Error fetching route data on server:', err)
    error = `Failed to load route data: ${err.message || 'Unknown error'}`
  }

  const heroTitle =
    pageStartPoint && pageEndPoint
      ? `${pageStartPoint.title} - ${pageEndPoint.title}`
      : t('hero.title')
  const heroSubtitle = t('hero.subtitle')

  const heroImage = routeData?.hero_banner as Media | undefined
  const heroImageUrl = heroImage?.url ? heroImage.url : '/images/regular-line/hero.webp'

  const bookingUrl =
    pageStartPoint && pageEndPoint
      ? `/regular-line/reservation?from=${pageStartPoint.id}&to=${pageEndPoint.id}&passengers=1${isRouteDisplayReversed ? '&isReversed=true' : ''}`
      : '/regular-line/reservation'

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner
        title={heroTitle}
        subtitle={heroSubtitle}
        buttonText={t('hero.bookNow')}
        buttonHref={bookingUrl}
        imageUrl={heroImageUrl}
        imageAlt={heroImage?.alt || 'Regular Line Monaco-Nice'}
      />

      {error && !routeData && (
        <div className="container mx-auto py-12 text-center">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      )}

      {!error && !routeData && !searchParams.routeId && !searchParams.from && !searchParams.to && (
        <div id="book" className="container mx-auto py-12 text-center">
          <p className="text-lg">Select your route to see flight information.</p>
        </div>
      )}

      {routeData && pageStartPoint && pageEndPoint && (
        <>
          <Introduction
            routeData={routeData}
            startPoint={pageStartPoint}
            endPoint={pageEndPoint}
            isReversed={isRouteDisplayReversed}
          />
          <Schedule routeData={routeData} isReversed={isRouteDisplayReversed} />
          <Pricing routeData={routeData} isReversed={isRouteDisplayReversed} />
          <BookingForm
            initialRouteData={routeData}
            initialStartPoint={pageStartPoint}
            initialEndPoint={pageEndPoint}
            initialIsReversed={isRouteDisplayReversed}
          />
        </>
      )}

      <CharterSection />
      <Benefits />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  )
}
