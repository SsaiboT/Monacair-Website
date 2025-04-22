'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

const PanoramicFlights = () => {
  const t = useTranslations('Booking')

  const destinations = [
    {
      name: 'Cannes',
      image: '/images/index/panoramique.webp',
      alt: t('panoramic-flights.cannes.alt'),
    },
    {
      name: 'Monaco',
      image: '/images/index/panoramique.webp',
      alt: t('panoramic-flights.monaco.alt'),
    },
    {
      name: 'Nice',
      image: '/images/index/hero.webp',
      alt: t('panoramic-flights.nice.alt'),
    },
    {
      name: 'Alpes',
      image: '/images/index/regular.webp',
      alt: t('panoramic-flights.alps.alt'),
    },
  ]

  return (
    <section className="min-h-screen bg-royalblue text-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-5xl md:text-6xl font-bold font-brother text-center mb-8">
          {t('panoramic-flights.title')}
        </h1>

        <p className="text-xl text-center max-w-3xl mx-auto mb-16">
          {t('panoramic-flights.description')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {destinations.map((destination, index) => (
            <div key={index} className="relative rounded-2xl overflow-hidden group cursor-pointer">
              <div className="aspect-[3/4] relative">
                <Image
                  src={destination.image}
                  alt={destination.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 p-6">
                <h2 className="text-3xl font-bold font-brother">{destination.name}</h2>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg mb-8">{t('panoramic-flights.cta-text')}</p>

          <Link href="/booking/panoramic">
            <Button variant="red" size="lg" className="px-8 py-6 text-lg font-bold">
              {t('panoramic-flights.book-now')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PanoramicFlights
