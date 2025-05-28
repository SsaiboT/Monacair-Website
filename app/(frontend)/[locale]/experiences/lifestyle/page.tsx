import Hero from '@/components/shared/hero'
import IntroSection from '@/components/experiences/lifestyle/intro-section'
import FeaturesSection from '@/components/experiences/lifestyle/features-section'
import ExperiencesSection from '@/components/experiences/lifestyle/experiences-section'
import CtaSection from '@/components/experiences/lifestyle/cta-section'
import { getLocale, getTranslations } from 'next-intl/server'
import Footer from '@/components/shared/footer'
import TestimonialsSection from '@/components/experiences/lifestyle/testimonials-section'
import PricingSection from '@/components/experiences/lifestyle/pricing-section'
import BookingForm from '@/components/experiences/lifestyle/booking-form'
import { getPayloadClient } from '@/lib/payload'
import type { Experience } from '@/payload-types'

export default async function LifestyleExperiencePage() {
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const t = await getTranslations('Experiences.lifestyle')
  const payload = await getPayloadClient()

  const { docs: experiences } = (await payload.find({
    collection: 'experiences',
    where: {
      type: {
        equals: 'lifestyle',
      },
    },
    depth: 1,
    locale,
    fallbackLocale: 'fr',
  })) as { docs: Experience[] }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        buttonText={t('hero.buttonText')}
        buttonLink="#booking-form"
        imageSrc={t('hero.imageSrc')}
      />
      <IntroSection />
      <FeaturesSection />
      <ExperiencesSection />
      <TestimonialsSection />
      <PricingSection />
      <BookingForm experiences={experiences} />
      <CtaSection />
      <Footer />
    </div>
  )
}
