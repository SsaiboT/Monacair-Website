import Hero from '@/components/shared/hero'
import { getTranslations, getLocale } from 'next-intl/server'
import BookingForm from 'components/booking/booking-form'
import RegularLineSection from 'components/booking/regular-line-section'
import VipService from 'components/booking/vip-service'
import PrivateFlights from 'components/booking/private-flights'
import JetPrive from 'components/booking/jet-prive'
import PanoramicFlights from 'components/booking/panoramic-flights'
import Footer from '@/components/shared/footer'
import { getPayloadClient } from '@/lib/payload'
import { url } from 'inspector'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const response = await payload.findGlobal({
    slug: 'bookingSEO',
    locale,
    fallbackLocale: 'fr',
  })
  return {
    title: response.meta.title,
    description: response.meta.description,
    keywords: response.meta.keywords,
    openGraph: {
      type: 'website',
      title: response.meta.title || undefined,
      description: response.meta.description || undefined,
      // @ts-ignore
      images: response.meta.image || undefined,
    },
  }
}

export default async function BookingPage() {
  const t = await getTranslations('Booking')
  const payload = await getPayloadClient()
  const indexT = await getTranslations('Index')
  const contactT = await getTranslations('Booking.contact.info')

  const panoramicFlightsData = await payload.find({
    collection: 'panoramic-flights',
    depth: 2,
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('hero.title'),
    description: t('hero.subtitle'),
    url: t('hero.url'),
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
        availableLanguage: ['English', 'French'],
      },
    },
    mainEntity: {
      '@type': 'OfferCatalog',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t('privateFlightSingle.title'),
            description: t('privateFlightSingle.subtitle'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t('privateFlightMulti.title'),
            description: t('privateFlightMulti.subtitle'),
          },
        },
        {
          '@type': 'Offer',
          price: t('regular-line.flight-time.value'),
          priceCurrency: 'EUR',
          itemOffered: {
            '@type': 'Service',
            name: t('regular-line.title'),
            description: t('regular-line.description'),
            url: t('regular-line.url'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t('private-flights.title'),
            description: t('private-flights.description'),
            url: t('private-flights.url'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t('jet-prive.title'),
            description: t('jet-prive.description'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t('panoramic-flights.title'),
            description: t('panoramic-flights.description'),
            url: t('panoramic-flights.url'),
          },
        },
      ],
    },
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <div className="flex flex-col min-h-screen">
        <Hero
          title={t('hero.title')}
          subtitle={t('hero.subtitle')}
          buttonText={t('hero.buttonText')}
          buttonLink="#booking-form"
          imageSrc="/images/index/hero.webp"
        />

        <BookingForm
          initialAllDestinations={(await payload.find({ collection: 'destinations' })).docs}
          initialRoutes={(await payload.find({ collection: 'regular-flights' })).docs}
          initialPanoramicFlights={(await payload.find({ collection: 'panoramic-flights' })).docs}
        />

        <PrivateFlights />

        <RegularLineSection />

        <VipService />

        {/* <Destinations /> */}

        <JetPrive />

        <PanoramicFlights panoramicFlights={panoramicFlightsData.docs} />

        <Footer />
      </div>
    </>
  )
}
