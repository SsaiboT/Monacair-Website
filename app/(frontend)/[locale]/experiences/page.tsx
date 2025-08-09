import { getLocale, getTranslations } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import IntroSection from '@/components/experiences/intro-section'
import ExperiencesListing from '@/components/experiences/listing'
import CustomSection from '@/components/experiences/custom-section'
import CTASection from '@/components/experiences/cta-section'
import FeaturesSection from '@/components/experiences/gastronomy/features-section'
import FeaturesSectionLifestyle from '@/components/experiences/lifestyle/features-section'
import Footer from '@/components/shared/footer'
import { getPayloadClient } from '@/lib/payload'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const response = await payload.findGlobal({
    slug: 'experiencesSEO',
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

export default async function ExperiencesPage() {
  const t = await getTranslations('Experiences.page')
  const indexT = await getTranslations('Index')
  const contactT = await getTranslations('Booking.contact.info')
  const experiencesT = await getTranslations('Experiences')
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const payload = await getPayloadClient()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('title'),
    description: experiencesT('intro.description'),
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
        availableLanguage: ['English', 'French'],
      },
    },
    mainEntity: {
      '@type': 'OfferCatalog',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: experiencesT('gastronomy.title'),
            description: experiencesT('gastronomy.description'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: experiencesT('sport.title'),
            description: experiencesT('sport.description'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: experiencesT('lifestyle.title'),
            description: experiencesT('lifestyle.description'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: experiencesT('culture.title'),
            description: experiencesT('culture.description'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: experiencesT('custom.title'),
            description: experiencesT('custom.description'),
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

      <div className="flex flex-col min-h-screen">
        <Hero
          title={t('title')}
          subtitle={t('subtitle')}
          buttonText={t('cta')}
          buttonLink="#gastronomy-section"
          imageSrc="/images/index/culture.webp"
        />
        <IntroSection />
        <ExperiencesListing
          data={{
            experience: await payload.find({
              collection: 'experiences',
              locale,
              fallbackLocale: 'fr',
              limit: 0,
            }),
          }}
        />
        <FeaturesSection />
        <FeaturesSectionLifestyle />
        <CustomSection />
        <CTASection />
        <Footer />
      </div>
    </>
  )
}
