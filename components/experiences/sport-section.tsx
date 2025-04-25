import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Trophy, ChevronRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SportSection() {
  const t = useTranslations('Experiences.sport')

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-2xl">
            <div className="inline-block mb-4 bg-[color:var(--color-redmonacair)]/10 px-4 py-2 rounded-full">
              <div className="flex items-center">
                <Trophy className="h-5 w-5 text-[color:var(--color-redmonacair)] mr-2" />
                <span className="text-[color:var(--color-redmonacair)] font-medium">
                  {t('badge')}
                </span>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
            <p className="text-lg">{t('description')}</p>
          </div>

          <Link
            href="/experiences/sport"
            className="inline-flex items-center text-[color:var(--color-redmonacair)] font-medium hover:underline mt-4 md:mt-0"
          >
            {t('link')}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg z-20 flex items-center justify-center cursor-pointer">
            <ChevronRight className="h-6 w-6 transform rotate-180" />
          </div>

          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg z-20 flex items-center justify-center cursor-pointer">
            <ChevronRight className="h-6 w-6" />
          </div>

          <div className="flex overflow-x-auto pb-8 space-x-6 snap-x snap-mandatory scrollbar-hide">
            <div className="snap-start flex-shrink-0 w-full sm:w-80 md:w-96">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
                <div className="h-48 relative">
                  <Image
                    src="/images/index/sport.webp"
                    alt={t('events.grandprix.title')}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <span className="bg-[color:var(--color-redmonacair)]/80 text-white text-sm px-2 py-1 rounded">
                        {t('events.grandprix.type')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{t('events.grandprix.title')}</h3>
                  <p className="text-gray-600 mb-4">{t('events.grandprix.description')}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{t('events.grandprix.date')}</span>
                  </div>
                  <Button className="w-full bg-[color:var(--color-redmonacair)] hover:bg-[color:var(--color-redmonacair)]/90 text-white">
                    Découvrir
                  </Button>
                </div>
              </div>
            </div>

            <div className="snap-start flex-shrink-0 w-full sm:w-80 md:w-96">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
                <div className="h-48 relative">
                  <Image
                    src="/images/index/private.webp"
                    alt={t('events.yachtshow.title')}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <span className="bg-[color:var(--color-redmonacair)]/80 text-white text-sm px-2 py-1 rounded">
                        {t('events.yachtshow.type')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{t('events.yachtshow.title')}</h3>
                  <p className="text-gray-600 mb-4">{t('events.yachtshow.description')}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{t('events.yachtshow.date')}</span>
                  </div>
                  <Button className="w-full bg-[color:var(--color-redmonacair)] hover:bg-[color:var(--color-redmonacair)]/90 text-white">
                    Découvrir
                  </Button>
                </div>
              </div>
            </div>

            <div className="snap-start flex-shrink-0 w-full sm:w-80 md:w-96">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
                <div className="h-48 relative">
                  <Image
                    src="/images/index/panoramique.webp"
                    alt={t('events.golf.title')}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <span className="bg-[color:var(--color-redmonacair)]/80 text-white text-sm px-2 py-1 rounded">
                        {t('events.golf.type')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{t('events.golf.title')}</h3>
                  <p className="text-gray-600 mb-4">{t('events.golf.description')}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{t('events.golf.date')}</span>
                  </div>
                  <Button className="w-full bg-[color:var(--color-redmonacair)] hover:bg-[color:var(--color-redmonacair)]/90 text-white">
                    Découvrir
                  </Button>
                </div>
              </div>
            </div>

            <div className="snap-start flex-shrink-0 w-full sm:w-80 md:w-96">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
                <div className="h-48 relative">
                  <Image
                    src="/images/index/regular.webp"
                    alt={t('events.diving.title')}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <span className="bg-[color:var(--color-redmonacair)]/80 text-white text-sm px-2 py-1 rounded">
                        {t('events.diving.type')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{t('events.diving.title')}</h3>
                  <p className="text-gray-600 mb-4">{t('events.diving.description')}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{t('events.diving.date')}</span>
                  </div>
                  <Button className="w-full bg-[color:var(--color-redmonacair)] hover:bg-[color:var(--color-redmonacair)]/90 text-white">
                    Découvrir
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
