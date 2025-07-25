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
  const indexT = await getTranslations('Index')
  const contactT = await getTranslations('Booking.contact.info')
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Trip',
    name: t('hero.title'),
    description: data?.about.description,
    itinerary: [
      {
        '@type': 'Place',
        name: typeof data?.start_point !== 'string' ? data?.start_point.title : data?.start_point,
        address: {
          '@type': 'PostalAddress',
          addressLocality:
            typeof data?.start_point !== 'string'
              ? typeof data?.start_point.region !== 'string'
                ? data?.start_point.region.name
                : data?.start_point.region
              : data?.start_point,
          addressCountry:
            typeof data?.start_point !== 'string' ? data?.start_point.country : data?.start_point,
        },
      },
      {
        '@type': 'Place',
        name: typeof data?.end_point !== 'string' ? data?.end_point.title : data?.end_point,
        address: {
          '@type': 'PostalAddress',
          addressLocality:
            typeof data?.end_point !== 'string'
              ? typeof data?.end_point.region !== 'string'
                ? data?.end_point.region.name
                : data?.end_point.region
              : data?.end_point,
          addressCountry:
            typeof data?.end_point !== 'string' ? data?.end_point.country : data?.end_point,
        },
      },
    ],
    provider: {
      '@type': 'Organization',
      name: 'Monacair',
      description: 'Helicopter transportation.',
      url: indexT('hero.url'),
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: contactT('phone.number'),
        contactType: 'booking',
        email: contactT('email.address'),
        availableLanguage: ['English', 'France'],
      },
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: data?.tariffs.price_per_child,
      highPrice: data?.tariffs.price_per_adult,
      offerCount: data?.tariffs.max_persons,
      offers: [
        {
          '@type': 'Offer',
          name: 'Adult ticket',
          price: data?.tariffs.price_per_adult,
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          name: 'Child ticket',
          price: data?.tariffs.price_per_child,
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          name: 'Newborn ticket',
          price: data?.tariffs.price_per_newborn,
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          name: 'Cabin baggage',
          price: data?.tariffs.price_per_cabin_baggage,
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          name: 'Hold baggage',
          price: data?.tariffs.price_per_baggage,
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          name: 'Flex fare upgrade',
          price: data?.tariffs.price_per_flex,
          priceCurrency: 'EUR',
        },
      ],
    },
  }

  return data ? (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <div className="flex flex-col min-h-screen">
        {displayOrder.start &&
          displayOrder.end &&
          typeof displayOrder.start !== 'string' &&
          typeof displayOrder.end !== 'string' &&
          data.hero_banner &&
          typeof data.hero_banner !== 'string' &&
          data.hero_banner.url && (
            <Hero
              title={`${displayOrder.start.title} - ${displayOrder.end.title}`}
              subtitle={t('hero.subtitle')}
              buttonText={t('hero.bookNow')}
              buttonLink={`/booking/regular/${resolvedParams.slug[0]}/${resolvedParams.slug[1]}${resolvedSearchParams.passengers ? `?passengers=${resolvedSearchParams.passengers[0] || '1'}&passengers=${resolvedSearchParams.passengers[1] || '0'}&passengers=${resolvedSearchParams.passengers[2] || '0'}` : '?passengers=1&passengers=0&passengers=0'}${resolvedSearchParams.isReturn === 'true' ? '&isReturn=true' : resolvedSearchParams.oneway ? '&oneway=true' : ''}`}
              imageSrc={`'${data.hero_banner.url}'`}
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
        <Benefits routeData={data} isReversed={data.reversed} />
        <FAQ />
        <CTASection routeData={data} isReversed={data.reversed} />
        <Footer />
      </div>
    </>
  ) : (
    redirect({ href: '/flights', locale: (await params).locale })
  )
}

export default Regular
