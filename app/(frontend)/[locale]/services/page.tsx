import { getTranslations } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import Maintenance from '@/components/management/maintenance'
import Management from '@/components/management/management'
import Handling from '@/components/management/handling'
import CTASection from '@/components/management/cta-section'
import Footer from '@/components/shared/footer'
import { Description } from '@radix-ui/react-dialog'
import { url } from 'inspector'

export default async function ServicesPage() {
  const t = await getTranslations('Management.hero')
  const managmentT = await getTranslations('Management')
  const indexT = await getTranslations('Index')
  const contactT = await getTranslations('Booking.contact.info')
  const handelingT = await getTranslations('Handling')
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: managmentT('hero.title'),
    description: managmentT('hero.description'),
    provider: {
      '@type': 'Organization',
      name: 'Monacair',
      description: 'Helicopter transportation.',
      url: indexT('Management.hero.url'),
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: contactT('phone.number'),
        contactType: 'booking',
        email: contactT('email.address'),
        availableLanguage: ['English', 'France'],
      },
    },
    mainEntity: {
      '@type': 'OfferCatalog',
      name: managmentT('hero.title'),
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: handelingT('hero.title'),
            Description: handelingT('description.intro'),
            url: indexT('hero.url'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: managmentT('maintenance.title'),
            description: managmentT('maintenance.description'),
            url: managmentT('maintenance.url'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: managmentT('Management.hero.title'),
            description: managmentT('Management.hero.subtitle'),
            url: managmentT('Management.hero.url'),
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
      <main>
        <Hero
          title={t('title')}
          subtitle={t('subtitle')}
          buttonText={t('CTA')}
          buttonLink="/contact"
          imageSrc="/images/index/services.webp"
        />
        <Management />
        <Maintenance />
        <Handling />
        <CTASection />
        <Footer />
      </main>
    </>
  )
}
