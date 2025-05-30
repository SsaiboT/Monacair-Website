import Hero from '@/components/shared/hero'
import OurHistory from '@/components/about-us/our-history'
import MonacairLeader from '@/components/about-us/monacair-leader'
import OurServices from '@/components/about-us/our-services'
import Alliance from '@/components/about-us/alliance'
import CTASection from '@/components/about-us/cta-section'
import Footer from '@/components/shared/footer'
import { getTranslations } from 'next-intl/server'

export default async function AboutPage() {
  const t = await getTranslations('AboutUs')

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        buttonText={t('hero.buttonText')}
        buttonLink="#our-history"
        imageSrc="/images/index/panoramique.webp"
      />

      <div id="our-history">
        <OurHistory />
      </div>
      <MonacairLeader />
      <OurServices />
      <Alliance />
      <CTASection />

      <Footer />
    </div>
  )
}
