import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Landmark, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CultureSection() {
  const t = useTranslations('Experiences.culture')

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <div className="inline-block mb-4 bg-[color:var(--color-redmonacair)]/10 px-4 py-2 rounded-full">
            <div className="flex items-center">
              <Landmark className="h-5 w-5 text-[color:var(--color-redmonacair)] mr-2" />
              <span className="text-[color:var(--color-redmonacair)] font-medium">
                {t('badge')}
              </span>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min mb-8">
          <div className="md:col-span-2 relative group overflow-hidden rounded-xl shadow-lg">
            <div className="relative h-80">
              <Image
                src="/images/index/culture.webp"
                alt={t('events.opera.title')}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:translate-y-0">
              <h3 className="text-2xl font-bold mb-2">{t('events.opera.title')}</h3>
              <p className="mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {t('events.opera.description')}
              </p>
              <Button className="bg-[color:var(--color-redmonacair)] hover:bg-[color:var(--color-redmonacair)]/90 text-white">
                En savoir plus
              </Button>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-xl shadow-lg">
            <div className="relative h-80">
              <Image
                src="/images/index/gastronomie.webp"
                alt={t('events.oceanographic.title')}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:translate-y-0">
              <h3 className="text-xl font-bold mb-2">{t('events.oceanographic.title')}</h3>
              <p className="mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {t('events.oceanographic.description')}
              </p>
              <Button className="bg-[color:var(--color-redmonacair)] hover:bg-[color:var(--color-redmonacair)]/90 text-white">
                En savoir plus
              </Button>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-xl shadow-lg">
            <div className="relative h-80">
              <Image
                src="/images/index/jet.webp"
                alt={t('events.cannes.title')}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:translate-y-0">
              <h3 className="text-xl font-bold mb-2">{t('events.cannes.title')}</h3>
              <p className="mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {t('events.cannes.description')}
              </p>
              <Button className="bg-[color:var(--color-redmonacair)] hover:bg-[color:var(--color-redmonacair)]/90 text-white">
                En savoir plus
              </Button>
            </div>
          </div>

          <div className="md:col-span-2 relative group overflow-hidden rounded-xl shadow-lg">
            <div className="relative h-80">
              <Image
                src="/images/index/sport.webp"
                alt={t('events.maeght.title')}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:translate-y-0">
              <h3 className="text-2xl font-bold mb-2">{t('events.maeght.title')}</h3>
              <p className="mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {t('events.maeght.description')}
              </p>
              <Button className="bg-[color:var(--color-redmonacair)] hover:bg-[color:var(--color-redmonacair)]/90 text-white">
                En savoir plus
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/experiences/culture"
            className="inline-flex items-center text-[color:var(--color-redmonacair)] font-medium hover:underline"
          >
            {t('link')}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
