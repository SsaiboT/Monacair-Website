import React from 'react'
import { useTranslations } from 'next-intl'
import Hero from '@/components/shared/hero'
import CostControl from '@/components/management/cost-control'
import HelicopterSales from '@/components/management/helicopter-sales'
import CrewManagement from '@/components/management/crew-management'
import Maintenance from '@/components/management/maintenance'
import Charter from '@/components/management/charter'
import CTASection from '@/components/management/cta-section'
import Footer from '@/components/shared/footer'

export default function ManagementPage() {
  const t = useTranslations('Management.hero')

  return (
    <main>
      <Hero
        title={t('title')}
        subtitle={t('subtitle')}
        buttonText={t('CTA')}
        buttonLink="/contact"
        imageSrc="/images/index/hero.webp"
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
