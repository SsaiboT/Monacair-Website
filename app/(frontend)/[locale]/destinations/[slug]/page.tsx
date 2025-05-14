// app/(frontend)/[locale]/destinations/[slug]/page.tsx
import React from 'react'
import { getLocale, getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Hero from '@/components/shared/hero'
import Footer from '@/components/shared/footer'
import DetailsPage from '@/components/destinations/details-page'
import AttractSection from '@/components/shared/attract-section'

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const destinations = await payload.find({
    collection: 'destinations',
    limit: 100,
  })

  return destinations.docs.map((destination) => ({
    slug: destination.slug,
  }))
}

export default async function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const t = await getTranslations('Destinations')
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const { slug } = await Promise.resolve(params)
  const payload = await getPayload({ config })

  const destinationResponse = await payload.find({
    collection: 'destinations',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale,
    fallbackLocale: 'en',
    limit: 1,
  })

  const destination = destinationResponse.docs[0]

  if (!destination) {
    return notFound()
  }

  return (
    <div>
      <Hero
        title={destination.title}
        subtitle={destination.subtitle}
        buttonText="RESERVER"
        buttonLink="/booking"
        imageSrc={destination.heroImage?.url || '/images/placeholder.png'}
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
  )
}
