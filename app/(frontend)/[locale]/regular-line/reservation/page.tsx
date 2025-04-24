import { useTranslations } from 'next-intl'
import { HeroBanner } from '@/components/shared/hero-banner'
import BookingForm from '@/components/regular-line/reservation/booking-form'

export default function RegularLineReservationPage() {
  const t = useTranslations('RegularLine.Reservation')

  return (
    <>
      <HeroBanner
        title={t('heroBanner.title')}
        subtitle={t('heroBanner.subtitle')}
        buttonText={t('heroBanner.buttonText')}
        buttonLink="/regular-line/reservation"
        imageSrc="/placeholder.svg?height=1080&width=1920"
        imageAlt={t('heroBanner.imageAlt')}
      />
      <BookingForm />
    </>
  )
}
