import Hero from '@/components/shared/hero'
import OurHistory from '@/components/about-us/our-history'
import MonacairLeader from '@/components/about-us/monacair-leader'
import OurServices from '@/components/about-us/our-services'
import Alliance from '@/components/about-us/alliance'
import CTASection from '@/components/about-us/cta-section'
import Footer from '@/components/shared/footer'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Hero
        title="Qui Sommes-Nous?"
        subtitle="Découvrez l'histoire et les services de Monacair"
        buttonText="En savoir plus"
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
