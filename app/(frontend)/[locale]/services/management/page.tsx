import { getTranslations } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import Footer from '@/components/shared/footer'
import CostControl from '@/components/management/cost-control'
import HelicopterSales from '@/components/management/helicopter-sales'
import CrewManagement from '@/components/management/crew-management'
import Charter from '@/components/management/charter'
import { url } from 'inspector'
import { deserialize } from 'v8'

export default async function Management() {
  const t = await getTranslations('Management')
  const indexT = await getTranslations('Index')
  const contactT = await getTranslations('Booking.contact.info')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('Management.hero.title'),
    serviceType: t('Management.hero.title'),
    description: t('Management.hero.subtitle'),
    url: indexT('hero.url'),
    provider: {
      '@type': 'Organization',
      name: 'Monacair',
      description: 'Helicopter transportation.',
      url: t('hero.url'),
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: contactT('phone.number'),
        contactType: 'booking',
        email: contactT('email.address'),
        availableLanguage: ['English', 'France'],
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t('hero.title'),
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t('costControl.title'),
            description: t('costControl.description'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t('helicopterSales.title'),
            description: t('helicopterSales.buyDescription'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t('crewManagement.title'),
            description: t('crewManagement.description'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t('maintenance.title'),
            url: t('maintenance.url'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t('charter.title'),
            description: t('charter.description'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t('ctaSection.title'),
            description: t('ctaSection.description'),
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
          title={t('Management.hero.title')}
          subtitle={t('Management.hero.subtitle')}
          buttonText={t('Management.hero.CTA')}
          buttonLink={'/contact'}
          imageSrc={'/images/fleet/hero.webp'}
        />
        <CostControl />
        <HelicopterSales />
        <CrewManagement />
        <Charter />
        <Footer />
      </div>
    </>
  )
}
