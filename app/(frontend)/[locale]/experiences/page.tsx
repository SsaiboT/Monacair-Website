import { getTranslations } from 'next-intl/server'
import { HeroBanner } from '@/components/shared/hero-banner'
import IntroSection from '@/components/experiences/intro-section'
import GastronomySection from '@/components/experiences/gastronomy-section'
import CultureSection from '@/components/experiences/culture-section'
import LifestyleSection from '@/components/experiences/lifestyle-section'
import CustomSection from '@/components/experiences/custom-section'
import CTASection from '@/components/experiences/cta-section'
import FeaturedSection from '@/components/experiences/featured-section'
import Footer from '@/components/shared/footer'

export default async function ExperiencesPage() {
  const t = await getTranslations('Experiences.page')

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner
        title={t('title')}
        subtitle={t('subtitle')}
        buttonText={t('cta')}
        buttonHref="/experiences"
        imageSrc="/images/index/culture.webp"
        imageAlt="Expériences Monacair"
      />

      <IntroSection />

      <GastronomySection />

      <LifestyleSection />

      <CustomSection />

      <CTASection />

      <FeaturedSection />

      <Footer />
    </div>
  )
}
