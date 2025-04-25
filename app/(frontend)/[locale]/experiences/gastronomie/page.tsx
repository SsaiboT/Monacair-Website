import { HeroBanner } from '@/components/shared/hero-banner'
import IntroSection from '@/components/experiences/gastronomy/intro-section'
import FeaturesSection from '@/components/experiences/gastronomy/features-section'
import ExperiencesSection from '@/components/experiences/gastronomy/experiences-section'
import CtaSection from '@/components/experiences/gastronomy/cta-section'
import { useTranslations } from 'next-intl'

export default function GastronomieExperiencePage() {
  const t = useTranslations('Experiences.gastronomy')

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        buttonText={t('hero.buttonText')}
        buttonLink="/booking"
        imageSrc={t('hero.imageSrc')}
        imageAlt={t('hero.imageAlt')}
      />
      <IntroSection />
      <FeaturesSection />
      <ExperiencesSection />
      <CtaSection />
    </div>
  )
}
