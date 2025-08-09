import { getPayloadClient } from '@/lib/payload'
import { getLocale, getTranslations } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import CustomJets from '@/components/private-jet/custom-jets'
import ExclusiveDestinations from '@/components/private-jet/destinations'
import BookingCta from '@/components/private-jet/booking-cta'
import BookingForm from '@/components/booking/booking-form'
import WhyChoose from '@/components/private-jet/why-choose'
import TravelWith from '@/components/private-jet/travel-with'
import AttractSection from '@/components/shared/attract-section'
import Footer from '@/components/shared/footer'
import React from 'react'
import { url } from 'inspector'
import { Description } from '@radix-ui/react-dialog'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const response = await payload.findGlobal({
    slug: 'jetSEO',
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

export default async function PrivateJetPage() {
  const t = await getTranslations('PrivateJet.page')
  const privateJetT = await getTranslations('PrivateJet')
  const payload = await getPayloadClient()
  const indexT = await getTranslations('Index')
  const contactT = await getTranslations('Booking.contact.info')
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('title'),
    description: t('subtitle'),
    url: t('url'),
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
            name: privateJetT('customJets.title'),
            description: privateJetT('customJets.description'),
            url: t('url'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: privateJetT('booking.title'),
            description: privateJetT('booking.description'),
            url: t('url'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: privateJetT('travelWith.title'),
            description: privateJetT('travelWith.description'),
            url: t('url'),
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
          title={t('title')}
          subtitle={t('subtitle')}
          buttonText={t('cta')}
          buttonLink="/contact"
          imageSrc="/images/index/jet.webp"
        />
        <BookingForm
          initialAllDestinations={(await payload.find({ collection: 'destinations' })).docs}
          initialRoutes={(await payload.find({ collection: 'regular-flights' })).docs}
          initialPanoramicFlights={(await payload.find({ collection: 'panoramic-flights' })).docs}
        />

        <CustomJets />

        <ExclusiveDestinations />

        <BookingCta />

        <WhyChoose />

        <TravelWith />
        <AttractSection
          title={t('AttractSection.title')}
          subtitle={t('AttractSection.subtitle')}
          buttonText={t('AttractSection.CTA')}
          buttonLink="/booking"
          imageSrc="/images/index/hero.webp"
        />
        <Footer />
      </div>
    </>
  )
}
