import Hero from '@/components/shared/hero'
import OurHistory from '@/components/about-us/our-history'
import MonacairLeader from '@/components/about-us/monacair-leader'
import OurServices from '@/components/about-us/our-services'
import Alliance from '@/components/about-us/alliance'
import CTASection from '@/components/about-us/cta-section'
import Footer from '@/components/shared/footer'
import { getTranslations } from 'next-intl/server'

export default async function AboutPage() {
  const t = await getTranslations('AboutUs')
  const indexT = await getTranslations('Index')
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: t('hero.title'),
    description: t('hero.subtitle'),
    image: '/images/index/panoramique.webp',
    url: t('hero.url'),
    mainEntity: [
      {
        '@type': 'Organization',
        name: 'Monacair',
        url: indexT('hero.url'),
        logo: '/images/logo.png',
        sameAs: [
          'https://www.facebook.com/Monacair',
          'https://www.instagram.com/monacair',
          'https://www.linkedin.com/company/monacair',
        ],
      },
      {
        '@type': 'Service',
        name: t('our-services.title0'),
        description: t('our-services.text0'),
      },
      {
        '@type': 'Service',
        name: t('our-services.title1'),
        description: t('our-services.text1'),
      },
      {
        '@type': 'Service',
        name: t('our-services.title2'),
        description: t('our-services.text2'),
      },
      {
        '@type': 'Organization',
        name: t('alliance.title'),
        description: t('alliance.subtitle'),
      },
    ],
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

      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Hero
          title={t('hero.title')}
          subtitle={t('hero.subtitle')}
          buttonText={t('hero.buttonText')}
          buttonLink="#our-history"
          imageSrc="/images/index/panoramique.webp"
        />

        <div id="our-history">
          <OurHistory />
        </div>
        <MonacairLeader />
        <OurServices />
        <Alliance />
        <CTASection />

        <Footer />
      </div>
    </>
  )
}
