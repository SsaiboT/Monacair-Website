import React from 'react'
import Hero from '@/components/shared/hero'
import Footer from '@/components/shared/footer'
import { useTranslations } from 'next-intl'

export default function DestinationsPage() {
  const t = useTranslations('Destinations.hero')
  return (
    <div>
      <Hero
        title={t('title')}
        subtitle={t.rich('subtitle', {
          br: (chunks) => (
            <span>
              <br />
              {chunks}
            </span>
          ),
        })}
        buttonText={t('CTA')}
        buttonLink={'/'}
        imageSrc={'/images/destinations/hero.webp'}
      />
      <Footer />
    </div>
  )
}
