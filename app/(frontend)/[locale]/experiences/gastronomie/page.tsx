import { HeroBanner } from '@/components/shared/hero-banner'
import IntroSection from '@/components/experiences/gastronomy/intro-section'
import FeaturesSection from '@/components/experiences/gastronomy/features-section'
import ExperiencesSection from '@/components/experiences/gastronomy/experiences-section'
import CtaSection from '@/components/experiences/gastronomy/cta-section'
import { useTranslations } from 'next-intl'
import Footer from '@/components/shared/footer'
import TestimonialsSection from '@/components/experiences/gastronomy/testimonials-section'
import PricingSection from '@/components/experiences/gastronomy/pricing-section'
import BookingForm from '@/components/experiences/gastronomy/booking-form'

export default function GastronomieExperiencePage() {
  const t = useTranslations('Experiences.gastronomy')

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        buttonText={t('hero.buttonText')}
        buttonHref="/booking"
        imageSrc={t('hero.imageSrc')}
        imageAlt={t('hero.imageAlt')}
      />
      <IntroSection />
      <FeaturesSection />
      <ExperiencesSection />
      <TestimonialsSection />
      <PricingSection />
      <BookingForm />
      <CtaSection />
      <Footer />
    </div>
  )
}
