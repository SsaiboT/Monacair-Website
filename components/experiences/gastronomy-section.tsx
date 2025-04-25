import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Utensils, ChevronRight, Wine, Calendar } from 'lucide-react'

export default function GastronomySection() {
  const t = useTranslations('Experiences.gastronomy')

  return (
    <section className="py-20 relative overflow-hidden bg-gray-50">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[color:var(--color-redmonacair)]/5 to-transparent z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 items-center gap-12">
          <div className="order-2 md:order-1">
            <div className="inline-block mb-4 bg-[color:var(--color-redmonacair)]/10 px-4 py-2 rounded-full">
              <div className="flex items-center">
                <Utensils className="h-5 w-5 text-[color:var(--color-redmonacair)] mr-2" />
                <span className="text-[color:var(--color-redmonacair)] font-medium">
                  {t('badge')}
                </span>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6">{t('title')}</h2>
            <p className="text-lg mb-6">{t('description')}</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 bg-white p-2 rounded-full shadow-md">
                  <Wine className="h-6 w-6 text-[color:var(--color-redmonacair)]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{t('features.starred.title')}</h3>
                  <p className="text-gray-600">{t('features.starred.description')}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 bg-white p-2 rounded-full shadow-md">
                  <Utensils className="h-6 w-6 text-[color:var(--color-redmonacair)]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{t('features.cooking.title')}</h3>
                  <p className="text-gray-600">{t('features.cooking.description')}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 bg-white p-2 rounded-full shadow-md">
                  <Calendar className="h-6 w-6 text-[color:var(--color-redmonacair)]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{t('features.tasting.title')}</h3>
                  <p className="text-gray-600">{t('features.tasting.description')}</p>
                </div>
              </div>
            </div>

            <Link
              href="/experiences/gastronomie"
              className="inline-flex items-center text-[color:var(--color-redmonacair)] font-medium hover:underline"
            >
              {t('link')}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="order-1 md:order-2 relative">
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl transform md:rotate-3">
              <Image
                src="/images/index/gastronomie.webp"
                alt="Expérience gastronomique"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 md:w-64 md:h-64 rounded-lg overflow-hidden shadow-xl transform -rotate-6 border-4 border-white">
              <Image
                src="/images/index/culture.webp"
                alt="Plat gastronomique"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
