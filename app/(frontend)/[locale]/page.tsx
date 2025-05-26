import React from 'react'
import Hero from '@/components/index/hero'
import Footer from '@/components/shared/footer'
import OurFlights from '@/components/index/our-flights'
import Experience from '@/components/index/experience'
import Destinations from '@/components/index/destinations'
import Events from '@/components/index/events'
import FleetCarousel from '@/components/index/fleet'
import AttractSection from '@/components/shared/attract-section'
import BookingForm from '@/components/booking/booking-form'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('Destinations')
  return (
    <main>
      <Hero />
      <OurFlights />
      <Destinations />
      <Experience />
      <Events />
      <FleetCarousel />
      <AttractSection
        title={t('AttractSection.title')}
        subtitle={t('AttractSection.subtitle')}
        buttonText={t('AttractSection.CTA')}
        buttonLink={'/'}
        imageSrc={'/images/index/hero.webp'}
      />
      <Footer />
    </main>
  )
}
