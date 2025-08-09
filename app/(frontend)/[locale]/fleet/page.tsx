import { getTranslations, getLocale } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import IntroSection from '@/components/fleet/intro-section'
import HelicopterShowcase from '@/components/fleet/helicopter-showcase'
import Footer from '@/components/shared/footer'
import { getPayloadClient } from '@/lib/payload'
import BookingForm from '@/components/booking/booking-form'
import { Fleet } from '@/payload-types'
import React from 'react'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const response = await payload.findGlobal({
    slug: 'fleetSEO',
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

export default async function FleetPage() {
  const [t, locale] = await Promise.all([getTranslations('Fleet.page'), getLocale()])
  const indexT = await getTranslations('Index')
  const contactT = await getTranslations('Booking.contact.info')
  const helicopterT = await getTranslations('Fleet.helicopter.specs')

  const payload = await getPayloadClient()

  const fleetResponse = await payload.find({
    collection: 'Fleet',
    locale: locale as 'en' | 'fr' | 'all',
    sort: 'order',
    fallbackLocale: 'fr',
  })

  const helicopters = fleetResponse.docs || []

  const itemListElement = helicopters.map((helicopter) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: helicopter.name,
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: helicopterT('capacity.title'),
          value: helicopter.speed,
        },
        {
          '@type': 'PropertyValue',
          name: helicopterT('speed.title'),
          value: helicopter.speed,
        },
        {
          '@type': 'PropertyValue',
          name: helicopterT('range.title'),
          value: helicopter.range,
          unitText: 'km',
        },
        {
          '@type': 'PropertyValue',
          name: helicopterT('baggage.title'),
          value: helicopter.baggage,
          unitText: 'km',
        },
      ],
    },
  }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('title'),
    description: t('subtitle'),
    url: t('url'),
    provider: {
      '@type': 'Organization',
      name: indexT('hero.title'),
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
      itemListElement,
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
          title={t('title')}
          subtitle={t('subtitle')}
          buttonText={t('cta')}
          buttonLink="/booking"
          imageSrc="/images/fleet/hero.webp"
        />
        <IntroSection />

        {helicopters.map((helicopter, index) => (
          <HelicopterShowcase
            key={helicopter.id}
            helicopter={helicopter as Fleet}
            reversed={index % 2 !== 0}
          />
        ))}
        <BookingForm
          initialAllDestinations={(await payload.find({ collection: 'destinations' })).docs}
          initialRoutes={(await payload.find({ collection: 'regular-flights' })).docs}
          initialPanoramicFlights={(await payload.find({ collection: 'panoramic-flights' })).docs}
        />

        <Footer />
      </div>
    </>
  )
}
