import { getTranslations } from 'next-intl/server'
import { Destination } from '@/payload-types'
import Hero from '@/components/shared/hero'
import Introduction from '@/components/regular-line/introduction'
import Schedule from '@/components/regular-line/schedule'
import Pricing from '@/components/regular-line/pricing'
import BookingForm from '@/components/regular-line/booking-form'
import CharterSection from '@/components/regular-line/charter-section'
import Benefits from '@/components/regular-line/benefits'
import FAQ from '@/components/regular-line/faq'
import CTASection from '@/components/regular-line/cta-section'
import Footer from '@/components/shared/footer'
import { redirect } from '@/i18n/navigation'

import { getRegularFlight } from '@/app/(frontend)/[locale]/flights/regular/[...slug]/actions'

const Regular = async ({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: Destination['slug'][] }>
  searchParams: Promise<{
    passengers?: string[] // TODO: Use the passengers' array to map to adults, children, and newborns (i.e., [adults, children, newborn]; instead of using query params for each
    adults?: string
    children?: string
    newborns?: string
    oneway?: string
    isReturn?: string
  }>
}) => {
  const t = await getTranslations('RegularLine')
  const data = await getRegularFlight((await params).slug)

  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  const getDisplayOrder = () => {
    if (!data) {
      return { start: null, end: null }
    }

    if (typeof data.start_point === 'string' || typeof data.end_point === 'string') {
      return { start: data.start_point, end: data.end_point }
    }

    if (data.reversed) {
      return { start: data.end_point, end: data.start_point }
    }

    return { start: data.start_point, end: data.end_point }
  }

  const displayOrder = getDisplayOrder()

  return data ? (
    <div className="flex flex-col min-h-screen">
      {data.hero_banner &&
        typeof data.hero_banner !== 'string' &&
        data.hero_banner.url &&
        displayOrder.start &&
        displayOrder.end &&
        typeof displayOrder.start !== 'string' &&
        typeof displayOrder.end !== 'string' && (
          <Hero
            title={`${displayOrder.start.title} - ${displayOrder.end.title}`}
            subtitle={t('hero.subtitle')}
            buttonText={t('hero.bookNow')}
            buttonLink={`/booking/regular/${resolvedParams.slug[0]}/${resolvedParams.slug[1]}${resolvedSearchParams.passengers ? `?passengers=${resolvedSearchParams.passengers}` : ''}${resolvedSearchParams.oneway ? `&oneway=${resolvedSearchParams.oneway}` : ''}`}
            imageSrc={data.hero_banner.url}
          />
        )}

      {typeof data.start_point !== 'string' && typeof data.end_point !== 'string' && (
        <>
          <Introduction
            routeData={data}
            startPoint={data.reversed ? data.end_point : data.start_point}
            endPoint={data.reversed ? data.start_point : data.end_point}
            isReversed={data.reversed}
          />
          <Schedule
            routeData={data}
            startPoint={data.reversed ? data.end_point : data.start_point}
            endPoint={data.reversed ? data.start_point : data.end_point}
            isReversed={data.reversed}
          />
          <Pricing routeData={data} isReversed={data.reversed} />
          <BookingForm
            initialRouteData={data}
            initialStartPoint={data.start_point}
            initialEndPoint={data.end_point}
            initialIsReversed={data.reversed}
            initialIsReturn={resolvedSearchParams.isReturn === 'true'}
            initialAdults={
              Number(resolvedSearchParams.adults) ||
              (resolvedSearchParams.passengers && resolvedSearchParams.passengers[0]
                ? Number(resolvedSearchParams.passengers[0])
                : 1)
            }
            initialChildren={
              Number(resolvedSearchParams.children) ||
              (resolvedSearchParams.passengers && resolvedSearchParams.passengers[1]
                ? Number(resolvedSearchParams.passengers[1])
                : 0)
            }
            initialNewborns={
              Number(resolvedSearchParams.newborns) ||
              (resolvedSearchParams.passengers && resolvedSearchParams.passengers[2]
                ? Number(resolvedSearchParams.passengers[2])
                : 0)
            }
          />
        </>
      )}

      <CharterSection />
      <Benefits />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  ) : (
    redirect({ href: '/flights', locale: (await params).locale })
  )
}

export default Regular
