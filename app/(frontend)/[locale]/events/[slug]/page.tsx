import React from 'react'
import { getLocale, getTranslations } from 'next-intl/server'
import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Hero from '@/components/shared/hero'
import Footer from '@/components/shared/footer'
import AttractSection from '@/components/shared/attract-section'
import DetailsPage from '@/components/events/details-page'

export const dynamic = 'force-dynamic'

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const t = await getTranslations('Events')
  const indexT = await getTranslations('Index')
  const contactT = await getTranslations('Booking.contact.info')
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const payload = await getPayloadClient()
  const eventResponse = await payload.find({
    collection: 'Events',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale,
    fallbackLocale: 'fr',
  })

  const event = eventResponse.docs[0]

  if (!event) {
    return notFound()
  }

  const eventDate = new Date(event.date)
  const isoDate = isNaN(eventDate.getTime()) ? undefined : eventDate.toISOString()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.custom_text || event.carousel.carousel_subtitle,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    startDate: event.date,
    location: {
      '@type': 'Place',
      name: event.city,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.city,
      },
    },
    image: [
      typeof event.image !== 'string'
        ? event.image?.url ||
          (typeof event.heroImage !== 'string' ? event.heroImage?.url : undefined)
        : undefined,
    ],
    organizer: {
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
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
        <Hero
          title={event.title}
          subtitle={event.carousel.carousel_subtitle}
          buttonText="RESERVER"
          buttonLink="/booking"
          imageSrc={
            typeof event.heroImage === 'string'
              ? event.heroImage
              : event.heroImage?.url || '/images/placeholder.png'
          }
        />
        <DetailsPage event={event} />
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
