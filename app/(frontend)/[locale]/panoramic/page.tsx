'use client'

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import Footer from '@/components/shared/footer'
import FlightBooking from '@/components/panoramic/flight-booking'
import FlightRoute from '@/components/panoramic/flight-route'
import HelicopterTour from '@/components/panoramic/helicopter-tour'
import { PanoramicHero } from '@/components/panoramic/panoramic-hero'

export default function PanoramicPage() {
  const t = useTranslations('Panoramic')
  const searchParams = useSearchParams()

  return (
    <div className="flex flex-col min-h-screen">
      <PanoramicHero imageSrc="/images/index/hero.webp" />

      <div className="container mx-auto py-16">
        <FlightBooking />
      </div>

      <div className="container mx-auto py-16">
        <FlightRoute />
      </div>

      <div className="py-16">
        <HelicopterTour />
      </div>

      <Footer />
    </div>
  )
}
