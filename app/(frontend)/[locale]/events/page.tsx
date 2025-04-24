import React from 'react'
import Hero from '@/components/shared/hero'
import Footer from '@/components/shared/footer'
import { useTranslations } from 'next-intl'

export default function EventsPage() {
  const t = useTranslations('Events.hero')
  return (
    <div>
      <Hero
        title={t.rich('title', {
          br: (chunks) => (
            <span>
              <br />
              {chunks}
            </span>
          ),
        })}
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
        imageSrc={'/images/events/hero.webp'}
      />
      <Footer />
    </div>
  )
}
