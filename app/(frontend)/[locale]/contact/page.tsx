import React from 'react'
import { getTranslations, getLocale } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import Form from '@/components/contact/form'
import Footer from '@/components/shared/footer'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const response = await payload.findGlobal({
    slug: 'contactSEO',
    locale,
    fallbackLocale: 'fr',
  })
  return {
    title: response.meta.title,
    description: response.meta.description,
    keywords: response.meta.keywords,
    openGraph: {
      type: 'website',
      title: response.meta.title || undefined,
      description: response.meta.description || undefined,
      // @ts-ignore
      images: response.meta.image || undefined,
    },
  }
}

export default async function ContactPage() {
  const t = useTranslations('Contact')
  const indexT = useTranslations('Index')
  const contactT = useTranslations('Booking.contact.info')
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: t('title'),
    description: t('subtitle'),
    url: t('url'),
    mainEntity: {
      '@type': 'Organization',
      name: 'Monacair',
      description: 'Helicopter transportation.',
      url: indexT('hero.url'),
      foundingDate: '1988',
      founder: {
        '@type': 'Person',
        name: 'Stefano Casiraghi',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: contactT('phone.number'),
          contactType: 'booking',
          email: contactT('email.address'),
          availableLanguage: ['English', 'French'],
        },
      ],
      sameAs: [
        'https://www.instagram.com/monacair',
        'https://www.facebook.com/MonacairMonacoDesk',
        'https://www.linkedin.com/company/monacair',
      ],
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
          name: 'About',
          item: t('hero.url'),
        },
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Monacair',
    },
  }
  return (
    <>
      <script
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
