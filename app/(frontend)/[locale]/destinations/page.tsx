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
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const payload = await getPayloadClient()
  const indexT = await getTranslations('Index')
  const contactT = await getTranslations('Booking.contact.info')

  const destinations = (await payload.find({ collection: 'destinations' })).docs
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Provider/Organization
      {
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

      // 2. Breadcrumb
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: indexT('hero.url'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Destinations',
            item: t('hero.url'),
          },
        ],
      },

      // 3. Destination listing
      {
        '@type': 'ItemList',
        name: t('hero.title'),
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: destinations.length,
        itemListElement: destinations.map((destination, index) => ({
          '@type': 'TouristDestination',
          name: destination.title,
          url: `${t('hero.url')}${destination.slug}`,
          image:
            typeof destination.heroImage === 'object' && destination.heroImage?.url
              ? `${indexT('hero.url')}${destination.heroImage.url}`
              : undefined,
          description: destination.custom_text || '',
          touristType: 'Luxury Traveler',
          address: {
            '@type': 'PostalAddress',
            addressCountry: destination.country,
            addressLocality:
              typeof destination.region !== 'string' ? destination.region?.name : undefined,
          },
        })),
      },
    ],
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
