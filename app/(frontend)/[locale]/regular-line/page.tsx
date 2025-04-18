import React from 'react'

import { HeroBanner } from '@/components/hero-banner'
import Introduction from '@/components/regular-line/introduction'
import Schedule from '@/components/regular-line/schedule'
import Pricing from '@/components/regular-line/pricing'
import BookingForm from '@/components/regular-line/booking-form'
import CharterSection from '@/components/regular-line/charter-section'
import Benefits from '@/components/regular-line/benefits'
import FAQ from '@/components/regular-line/faq'
import CTASection from '@/components/regular-line/cta-section'
import Footer from '@/components/shared/footer'

export default function RegularLinePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner
        title="Ligne Régulière Nice - Monaco"
        subtitle="Le moyen le plus rapide et élégant de rejoindre la Principauté"
        buttonText="Réserver maintenant"
        buttonLink="/reservation"
        imageSrc="/images/index/hero.webp"
        imageAlt="Hélicoptère survolant Monaco"
      />

      <Introduction />
      <Schedule />
      <Pricing />
      <BookingForm />
      <CharterSection />
      <Benefits />
      <FAQ />
      <CTASection />

      <Footer />
    </div>
  )
}
