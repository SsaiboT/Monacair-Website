import React from 'react'
import Hero from '@/components/shared/hero'
import Footer from '@/components/shared/footer'
import AttractSection from '@/components/shared/attract-section'
import { getLocale, getTranslations } from 'next-intl/server'
import Listing from '@/components/destinations/listing'
import Description from '@/components/destinations/description'
import Bases from '@/components/destinations/bases'
import BookingForm from '@/components/booking/booking-form'
import { WorldMapDemo } from '@/components/destinations/map'
import { getPayloadClient } from '@/lib/payload'

export default async function DestinationsPage() {
  const t = await getTranslations('Destinations')
  const baseUrl = t('hero.url')
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const payload = await getPayloadClient()
  const indexT = await getTranslations('Index')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('hero.title'),
    description: t('description.subtitle'),
    url: baseUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Monacair',
      url: indexT('hero.url'),
    },
    mainEntity: {
      '@type': 'ItemList',
      name: t('destinations.title'),
      itemListElement: (await payload.find({ collection: 'destinations' })).docs.map(
        (dest, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Place',
            name: dest.title, // adjust to actual field name
            url: `${baseUrl}/${dest.slug}`, // adjust to your routing
          },
        }),
      ),
    },
  }

  return (
    <>
      <script
        key="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <div>
        <Hero
          title={t('hero.title')}
          subtitle={t.rich('hero.subtitle', {
            br: (chunks) => (
              <span>
                <br />
                {chunks}
              </span>
            ),
          })}
          buttonText={t('hero.CTA')}
          buttonLink={'/'}
          imageSrc={'/images/destinations/hero.webp'}
        />
        <BookingForm
          initialAllDestinations={(await payload.find({ collection: 'destinations' })).docs}
          initialRoutes={(await payload.find({ collection: 'regular-flights' })).docs}
          initialPanoramicFlights={(await payload.find({ collection: 'panoramic-flights' })).docs}
        />
        <Description />
        <Bases />
        <WorldMapDemo />
        <Listing
          data={{
            destinations: await payload.find({
              collection: 'destinations',
              locale,
              sort: 'order',
              fallbackLocale: 'fr',
              limit: 0,
            }),
            regions: await payload.find({
              collection: 'regions',
              locale,
              fallbackLocale: 'fr',
              limit: 0,
            }),
          }}
        />
        <AttractSection
          title={t('AttractSection.title')}
          subtitle={t('AttractSection.subtitle')}
          buttonText={t('AttractSection.CTA')}
          buttonLink={'/'}
          imageSrc={'/images/index/hero.webp'}
        />
        <Footer />
      </div>
    </>
  )
}
