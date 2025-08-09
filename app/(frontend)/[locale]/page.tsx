import React from 'react'
import Hero from '@/components/index/hero'
import Footer from '@/components/shared/footer'
import OurFlights from '@/components/index/our-flights'
import Experience from '@/components/index/experience'
import Destinations from '@/components/index/destinations'
import Events from '@/components/index/events'
import FleetCarousel from '@/components/index/fleet'
import AttractSection from '@/components/shared/attract-section'
import BookingForm from '@/components/booking/booking-form'
import { getPayloadClient } from '@/lib/payload'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getTranslations, getLocale } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config })
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const response = await payload.findGlobal({
    slug: 'indexSEO',
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

export default async function Home() {
  const t = await getTranslations('Destinations')
  const payload = await getPayloadClient()
  const indexT = await getTranslations('Index')
  const contactT = await getTranslations('Booking.contact.info')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: indexT('hero.title'),
    url: indexT('hero.url'),
    publisher: {
      '@type': 'Organization',
      name: 'Monacair',
      description: 'Helicopter transportation.',
      url: indexT('hero.url'),
      foundingDate: '1988',
      founder: {
        '@type': 'Person',
        name: 'Stefano Casiraghi',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: contactT('address.line1'),
        addressLocality: contactT('address.line2'),
        addressCountry: 'MC',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: contactT('phone.number'),
        contactType: 'booking',
        email: contactT('email.address'),
      },
      sameAs: [
        'https://www.instagram.com/monacair',
        'https://www.facebook.com/MonacairMonacoDesk',
        'https://www.linkedin.com/company/monacair',
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
      <main>
        <Hero />
        <BookingForm
          initialAllDestinations={(await payload.find({ collection: 'destinations' })).docs}
          initialRoutes={(await payload.find({ collection: 'regular-flights' })).docs}
          initialPanoramicFlights={(await payload.find({ collection: 'panoramic-flights' })).docs}
        />
        <OurFlights />
        <Destinations />
        <Experience />
        <Events />
        <FleetCarousel />
        <AttractSection
          title={t('AttractSection.title')}
          subtitle={t('AttractSection.subtitle')}
          buttonText={t('AttractSection.CTA')}
          buttonLink={'/contact'}
          imageSrc={'/images/index/hero.webp'}
        />
        <Footer />
      </main>
    </>
  )
}
