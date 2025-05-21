import { getTranslations } from 'next-intl/server'
import { Destination } from '@/payload-types'
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
import { redirect } from '@/i18n/navigation'
import { searchRoute } from '@/app/(frontend)/[locale]/flights/regular/[...slug]/actions'

const Regular = async ({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: Destination['slug'][] }>
  searchParams: Promise<{ passengers?: string[]; oneway?: string }>
}) => {
  const t = await getTranslations('RegularLine')
  const data = await searchRoute((await params).slug).then(async (res) =>
    res
      ? {
          ...res,
          reversed: !(
            res &&
            typeof res.start_point !== 'string' &&
            typeof res.end_point !== 'string' &&
            res.start_point.slug === (await params).slug[0]
          ),
        }
      : null,
  )

  return data ? (
    <div className="flex flex-col min-h-screen">
      {data.hero_banner &&
        typeof data.hero_banner !== 'string' &&
        data.hero_banner.url &&
        typeof data.start_point !== 'string' &&
        typeof data.end_point !== 'string' && (
          <HeroBanner
            title={`${data.start_point.title} - ${data.start_point.title}`}
            subtitle={t('hero.subtitle')}
            buttonText={t('hero.bookNow')}
            buttonHref={`/booking/regular/${data.start_point.slug}/${data.end_point.slug}${(await searchParams).passengers ? `?passengers=${(await searchParams).passengers}` : ''}${(await searchParams).oneway ? `&oneway=${(await searchParams).oneway}` : ''}`}
            imageUrl={data.hero_banner.url}
            imageAlt={data.hero_banner.alt}
          />
        )}

      {typeof data.start_point !== 'string' && typeof data.end_point !== 'string' && (
        <>
          <Introduction
            routeData={data}
            startPoint={data.start_point}
            endPoint={data.end_point}
            isReversed={data.reversed}
          />
          <Schedule routeData={data} isReversed={data.reversed} />
          <Pricing routeData={data} isReversed={data.reversed} />
          <BookingForm
            initialRouteData={data}
            initialStartPoint={data.start_point}
            initialEndPoint={data.end_point}
            initialIsReversed={data.reversed}
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
