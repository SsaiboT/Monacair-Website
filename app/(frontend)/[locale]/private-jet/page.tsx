import { getTranslations } from 'next-intl/server'
import { HeroBanner } from '@/components/shared/hero-banner'
import CustomJets from '@/components/private-jet/custom-jets'
import ExclusiveDestinations from '@/components/private-jet/destinations'
import BookingCta from '@/components/private-jet/booking-cta'
import WhyChoose from '@/components/private-jet/why-choose'
import TravelWith from '@/components/private-jet/travel-with'
import Footer from '@/components/shared/footer'

export default async function PrivateJetPage() {
  const t = await getTranslations('PrivateJet.page')

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner
        title={t('title')}
        subtitle={t('subtitle')}
        buttonText={t('cta')}
        buttonLink="/private-jet/reservation"
        imageSrc="/images/index/jet.webp"
        imageAlt="Monacair Private Jet"
      />

      <CustomJets />

      <ExclusiveDestinations />

      <BookingCta />

      <WhyChoose />

      <TravelWith />

      <Footer />
    </div>
  )
}
