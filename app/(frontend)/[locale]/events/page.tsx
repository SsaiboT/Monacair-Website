import React from 'react'
import Hero from '@/components/shared/hero'
import Footer from '@/components/shared/footer'
import AttractSection from '@/components/shared/attract-section'
import EventListing from '@/components/events/listing'
import { getLocale, getTranslations } from 'next-intl/server'
import BookingForm from '@/components/booking/booking-form'
import { getPayloadClient } from '@/lib/payload'

export default async function EventsPage() {
  const t = await getTranslations('Events')
  const indexT = await getTranslations('Index')
  const contactT = await getTranslations('Booking.contact.info')
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const payload = await getPayloadClient()

  const events = (await payload.find({ collection: 'destinations' })).docs
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Experience Great Events with Monacair',
    description: 'Access prestigious events by helicopter - A VIP experience from start to finish',
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
    breadcrumb: {
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
          name: 'Events',
          item: t('hero.url'),
        },
      ],
    },
    mainEntity: events.map((event) => ({
      '@type': 'Place',
      name: event.title,
      description: event.custom_text || '',
      url: `https://monacair.mc/events/${event.slug}`,
      address: {
        '@type': 'PostalAddress',
        addressCountry: event.country || 'Monaco',
        addressRegion: typeof event.region !== 'string' ? event.region?.name : undefined,
      },
      image: {
        '@type': 'ImageObject',
        url:
          typeof event.heroImage !== 'string'
            ? `${indexT('hero.url')}${event.heroImage?.url}`
            : undefined,
        width: typeof event.heroImage !== 'string' ? event.heroImage?.width : event.heroImage,
        height: typeof event.heroImage !== 'string' ? event.heroImage?.height : event.heroImage,
        caption: typeof event.heroImage !== 'string' ? event.heroImage?.alt : event.title,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
        <Hero
          title={t.rich('hero.title', {
            br: (chunks) => (
              <span>
                <br />
                {chunks}
              </span>
            ),
          })}
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
          imageSrc={'/images/events/hero.webp'}
        />
        <BookingForm
          initialAllDestinations={(await payload.find({ collection: 'destinations' })).docs}
          initialRoutes={(await payload.find({ collection: 'regular-flights' })).docs}
          initialPanoramicFlights={(await payload.find({ collection: 'panoramic-flights' })).docs}
        />
        <EventListing
          data={{
            events: await payload.find({
              collection: 'Events',
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
