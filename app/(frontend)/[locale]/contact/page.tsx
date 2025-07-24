import React from 'react'
import { useTranslations } from 'next-intl'
import Hero from '@/components/shared/hero'
import Form from '@/components/contact/form'
import Footer from '@/components/shared/footer'

export default function ContactPage() {
  const t = useTranslations('Contact')
  const indexT = useTranslations('Index')
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: t('title'),
    description: t('subtitle'),
    url: t('url'),
    mainEntity: {
      '@type': 'Organization',
      name: 'Monacair',
      url: indexT('hero.url'),
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        url: t('url'),
      },
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
          title={t.rich('title', {
            span: (chunks) => (
              <span className="font-caslon text-redmonacair">
                {chunks}
                <br />
              </span>
            ),
          })}
          subtitle={t('subtitle')}
          imageSrc={'/images/destinations/hero.webp'}
          buttonText={t('CTA')}
          buttonLink={'/booking'}
        />
        <Form />
        <Footer />
      </div>
    </>
  )
}
