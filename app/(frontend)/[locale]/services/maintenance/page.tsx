import { getTranslations } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import Footer from '@/components/shared/footer'
import Maintenance from '@/components/management/maintenance'

export default async function MaintenancePage() {
  const t = await getTranslations('Management.maintenance')

  const indexT = await getTranslations('Index')
  const contactT = await getTranslations('Booking.contact.info')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('title'),
    serviceType: t('subtitle'),
    description: t('description'),
    url: t('url'),
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
      name: t('locationsDescription'),
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
          title={t('title')}
          subtitle={t('subtitle')}
          buttonText={t('CTA')}
          buttonLink={'/contact'}
          imageSrc={'/images/fleet/hero.webp'}
        />
        <Maintenance />
        <Footer />
      </div>
    </>
  )
}
