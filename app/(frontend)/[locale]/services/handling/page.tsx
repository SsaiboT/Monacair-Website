import Footer from '@/components/shared/footer'
import Hero from '@/components/shared/hero'
import Handling from '@/components/management/handling'
import HandlingGeneral from '@/components/management/handling-general'
import { getTranslations } from 'next-intl/server'

export default async function HandlingPage() {
  const t = await getTranslations('Handling')
  const indexT = await getTranslations('Index')
  const contactT = await getTranslations('Booking.contact.info')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('hero.title'),
    serviceType: t('hero.subtitle'),
    description: t('description.intro'),
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
        availableLanguage: ['English', 'France'],
      },
    },
    areaServed: {
      '@type': 'Place',
      name: t('description.location'),
    },
    audience: {
      '@type': 'Audience',
      audienceType: t('section.buyDescription'),
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t('servicesRecap.title'),
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t('servicesRecap.hangarage'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t('servicesRecap.fuel'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t('servicesRecap.technical'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t('servicesRecap.coordination'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t('servicesRecap.driver'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t('servicesRecap.lounge'),
          },
        },
      ],
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
          title={t('hero.title')}
          subtitle={t('hero.subtitle')}
          buttonText={t('hero.CTA')}
          buttonLink={'/contact'}
          imageSrc={'/images/fleet/hero.webp'}
        />
        <Handling />
        <HandlingGeneral />
        <Footer />
      </div>
    </>
  )
}
