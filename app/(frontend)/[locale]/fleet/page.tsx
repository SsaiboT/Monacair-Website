import { useTranslations } from 'next-intl'
import { HeroBanner } from '@/components/shared/hero-banner'
import IntroSection from '@/components/fleet/intro-section'
import HelicopterShowcase from '@/components/fleet/helicopter-showcase'
import Footer from '@/components/shared/footer'

export default function FleetPage() {
  const t = useTranslations('Fleet.page')

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner
        title={t('title')}
        subtitle={t('subtitle')}
        buttonText={t('cta')}
        buttonLink="/booking"
        imageSrc="/images/index/panoramique.webp"
        imageAlt="Flotte d'hélicoptères Monacair"
      />

      <IntroSection />

      <HelicopterShowcase model="h130" bgColor="bg-gray-50" />

      <HelicopterShowcase model="h125" bgColor="bg-white" reversed />

      <HelicopterShowcase model="h145" bgColor="bg-gray-50" />

      <Footer />
    </div>
  )
}
