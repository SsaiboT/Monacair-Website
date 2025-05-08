import { HeroBanner } from '@/components/shared/hero-banner'
import { useTranslations } from 'next-intl'
import BookingForm from 'components/booking/booking-form'
import RegularLineSection from 'components/booking/regular-line-section'
import VipService from 'components/booking/vip-service'
import PrivateFlights from 'components/booking/private-flights'
import Destinations from 'components/booking/destinations'
import JetPrive from 'components/booking/jet-prive'
import PanoramicFlights from 'components/booking/panoramic-flights'
import Footer from '@/components/shared/footer'

export default function BookingPage() {
  const t = useTranslations('Booking')

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        buttonText={t('hero.buttonText')}
        buttonHref="/reservation"
        imageUrl="/images/index/hero.webp"
        imageAlt="Vue aérienne de Monaco"
      />

      <BookingForm />

      <PrivateFlights />

      <RegularLineSection />

      <VipService />

      <Destinations />

      <JetPrive />

      <PanoramicFlights />

      <Footer />
    </div>
  )
}
