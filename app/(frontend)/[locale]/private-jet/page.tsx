import { getTranslations } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import CustomJets from '@/components/private-jet/custom-jets'
import ExclusiveDestinations from '@/components/private-jet/destinations'
import BookingCta from '@/components/private-jet/booking-cta'
import WhyChoose from '@/components/private-jet/why-choose'
import TravelWith from '@/components/private-jet/travel-with'
import AttractSection from '@/components/shared/attract-section'
import Footer from '@/components/shared/footer'

export default async function PrivateJetPage() {
  const t = await getTranslations('PrivateJet.page')

  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        title={t('title')}
        subtitle={t('subtitle')}
        buttonText={t('cta')}
        buttonLink="/private-jet/reservation"
        imageSrc="/images/index/jet.webp"
      />

      <CustomJets />

      <ExclusiveDestinations />

      <BookingCta />

      <WhyChoose />

      <TravelWith />
      <AttractSection
        title={t('AttractSection.title')}
        subtitle={t('AttractSection.subtitle')}
        buttonText={t('AttractSection.CTA')}
        buttonLink="/booking"
        imageSrc="/images/index/hero.webp"
      />
      <Footer />
    </div>
  )
}
