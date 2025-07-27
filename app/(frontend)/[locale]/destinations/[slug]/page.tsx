import React from 'react'
import { getLocale, getTranslations } from 'next-intl/server'
import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Hero from '@/components/shared/hero'
import Footer from '@/components/shared/footer'
import AttractSection from '@/components/shared/attract-section'
import DetailsPage from '@/components/destinations/details-page'

export const dynamic = 'force-dynamic'

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const t = await getTranslations('Destinations')
  const indexT = await getTranslations('Index')
  const contactT = await getTranslations('Booking.contact.info')
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const payload = await getPayloadClient()
  const destinationResponse = await payload.find({
    collection: 'destinations',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale,
    fallbackLocale: 'fr',
  })

  const destination = destinationResponse.docs[0]

  if (!destination) {
    return notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: destination.title,
    description: destination.custom_text || '',
    url: `${t('hero.url')}${destination.slug}`,
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
      '@type': 'TouristDestination',
      name: destination.title,
      image:
        typeof destination.heroImage === 'object' && destination.heroImage?.url
          ? `${indexT('hero.url')}${destination.heroImage.url}`
          : undefined,
      touristType: 'All',
      address: {
        '@type': 'PostalAddress',
        addressLocality: typeof destination.region !== 'string' ? destination.region?.name : '',
        addressCountry: destination.country || '',
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
          title={destination.title}
          subtitle={destination.carousel.carousel_subtitle}
          buttonText="RESERVER"
          buttonLink="/booking"
          imageSrc={
            typeof destination.heroImage === 'string'
              ? destination.heroImage
              : destination.heroImage?.url || '/images/placeholder.png'
          }
        />
        <DetailsPage destination={destination} />
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
