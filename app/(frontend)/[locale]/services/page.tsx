import React from 'react'
import { getTranslations } from 'next-intl/server'
import Hero from '@/components/shared/hero'
import CostControl from '@/components/management/cost-control'
import HelicopterSales from '@/components/management/helicopter-sales'
import CrewManagement from '@/components/management/crew-management'
import Maintenance from '@/components/management/maintenance'
import Charter from '@/components/management/charter'
import CTASection from '@/components/management/cta-section'
import Footer from '@/components/shared/footer'

export default async function ServicesPage() {
  const t = await getTranslations('Management.hero')

  return (
    <main>
      <Hero
        title={t('title')}
        subtitle={t('subtitle')}
        buttonText={t('CTA')}
        buttonLink="/contact"
        imageSrc="/images/index/services.webp"
      />
      <CostControl />
      <HelicopterSales />
      <CrewManagement />
      <Maintenance />
      <Charter />
      <CTASection />
      <Footer />
    </main>
  )
}
