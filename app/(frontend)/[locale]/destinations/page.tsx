import React from 'react'
import Hero from '@/components/shared/hero'
import Footer from '@/components/shared/footer'
import AttractSection from '@/components/shared/attract-section'
import { useTranslations } from 'next-intl'
import Listing from '@/components/destinations/listing'
import Description from '@/components/destinations/description'
import Bases from '@/components/destinations/bases'
import { WorldMapDemo } from '@/components/destinations/map'

export default function DestinationsPage() {
  const t = useTranslations('Destinations')
  return (
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
      <Description />
      <Bases />
      <WorldMapDemo />
      <Listing />
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
