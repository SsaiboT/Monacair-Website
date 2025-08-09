import Hero from '@/components/shared/hero'
import OurHistory from '@/components/about-us/our-history'
import MonacairLeader from '@/components/about-us/monacair-leader'
import OurServices from '@/components/about-us/our-services'
import Alliance from '@/components/about-us/alliance'
import CTASection from '@/components/about-us/cta-section'
import Footer from '@/components/shared/footer'
import { getTranslations, getLocale } from 'next-intl/server'
import { getPayloadClient } from '@/lib/payload'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const response = await payload.findGlobal({
    slug: 'aboutSEO',
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

export default async function AboutPage() {
  const t = await getTranslations('AboutUs')
  const indexT = await getTranslations('Index')
  const contactT = await getTranslations('Booking.contact.info')
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: t('hero.title'),
    description: t('hero.subtitle'),
    url: t('hero.url'),
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
      address: {
        '@type': 'PostalAddress',
        streetAddress: contactT('address.line1'),
        addressLocality: contactT('address.line2'),
        addressCountry: 'MC',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: contactT('phone.number'),
        contactType: 'booking',
        email: contactT('email.address'),
      },
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
