import React from 'react'
import { getLocale, getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Hero from '@/components/shared/hero'
import Footer from '@/components/shared/footer'
import DetailsPage from '@/components/events/details-page'
import AttractSection from '@/components/shared/attract-section'

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const events = await payload.find({
    collection: 'Events',
    limit: 100,
  })

  return events.docs.map((event) => ({
    slug: event.slug,
  }))
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = await getTranslations('Events')
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const { slug } = await params
  const payload = await getPayload({ config })

  const eventResponse = await payload.find({
    collection: 'Events',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale,
    fallbackLocale: 'fr',
    limit: 1,
  })

  const event = eventResponse.docs[0]

  if (!event) {
    return notFound()
  }

  return (
    <div>
      <Hero
        title={event.title}
        subtitle={event.subtitle}
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
  )
}
