import { getTranslations, getLocale } from 'next-intl/server'
import { HeroBanner } from '@/components/shared/hero-banner'
import IntroSection from '@/components/fleet/intro-section'
import HelicopterShowcase from '@/components/fleet/helicopter-showcase'
import Footer from '@/components/shared/footer'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Fleet } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function FleetPage() {
  const [t, locale, payload] = await Promise.all([
    getTranslations('Fleet.page'),
    getLocale(),
    getPayload({ config }),
  ])

  const fleetResponse = await payload.find({
    collection: 'Fleet',
    locale: locale as 'en' | 'fr' | 'all',
    fallbackLocale: 'fr',
  })

  const helicopters = fleetResponse.docs || []

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner
        title={t('title')}
        subtitle={t('subtitle')}
        buttonText={t('cta')}
        buttonHref="/booking"
        imageSrc="/images/index/panoramique.webp"
        imageAlt="Flotte d'hélicoptères Monacair"
      />

      <IntroSection />

      {helicopters.map((helicopter, index) => (
        <HelicopterShowcase
          key={helicopter.id}
          helicopter={helicopter as Fleet}
          reversed={index % 2 !== 0}
        />
      ))}

      <Footer />
    </div>
  )
}
