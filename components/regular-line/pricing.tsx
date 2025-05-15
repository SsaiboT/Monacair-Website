'use client'

import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import type { RegularFlight } from '@/payload-types'

interface PricingProps {
  routeData: RegularFlight
}

export default function Pricing({ routeData }: PricingProps) {
  const t = useTranslations('RegularLine.pricing')

  const formatAdultPrice = () => {
    if (routeData?.tariffs?.price_per_adult) {
      return `${routeData.tariffs.price_per_adult}€`
    }
    return t('regular.price') || '195€'
  }

  const formatFlexPrice = () => {
    if (routeData?.tariffs?.price_per_flex) {
      return `${routeData.tariffs.price_per_flex}€`
    }
    return t('charter.price') || '245€'
  }

  const getMaxPersons = () => {
    if (routeData?.tariffs?.max_persons) {
      return routeData.tariffs.max_persons
    }
    return 6
  }

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 font-brother text-royalblue">
              {t('title')}
            </h2>
            <p className="text-base sm:text-lg font-brother text-royalblue">{t('subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105 flex flex-col">
              <div className="bg-redmonacair text-white p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold font-brother">{t('regular.title')}</h3>
                <p className="text-sm sm:text-base text-white/80 font-brother">
                  {t('regular.subtitle')}
                </p>
              </div>
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                <div className="flex justify-center items-center mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl font-bold font-brother text-royalblue">
                    {formatAdultPrice()}
                  </span>
                  <span className="text-sm sm:text-base text-gray-500 ml-2 font-brother">
                    {t('regular.per')}
                  </span>
                </div>
                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-1">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-redmonacair mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base font-brother text-royalblue">
                      {t.raw('regular.features')[0] || 'Durée de vol: 7 minutes'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-redmonacair mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base font-brother text-royalblue">
                      {t.raw('regular.features')[1] || 'Départs toutes les 30 minutes'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-redmonacair mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base font-brother text-royalblue">
                      {t.raw('regular.features')[2] || '1 bagage cabine inclus'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-redmonacair mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base font-brother text-royalblue">
                      {t.raw('regular.features')[3] || 'Vue panoramique garantie'}
                    </span>
                  </li>
                </ul>
                <Link href="/booking?type=regular-line" className="mt-auto">
                  <Button className="w-full bg-redmonacair hover:bg-redmonacair/90 text-white font-brother">
                    {t('regular.cta')}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105 flex flex-col">
              <div className="bg-royalblue text-white p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold font-brother">{t('charter.title')}</h3>
                <p className="text-sm sm:text-base text-white/80 font-brother">
                  {t('charter.subtitle').replace('{max_persons}', getMaxPersons().toString())}
                </p>
              </div>
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                <div className="flex justify-center items-center mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl font-bold font-brother text-royalblue">
                    {formatFlexPrice()}
                  </span>
                  <span className="text-sm sm:text-base text-gray-500 ml-2 font-brother">
                    {t('charter.per')}
                  </span>
                </div>
                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-1">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-redmonacair mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base font-brother text-royalblue">
                      {t.raw('charter.features')[0] || 'Hélicoptère privatisé'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-redmonacair mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base font-brother text-royalblue">
                      {(t.raw('charter.features')[1] || "Jusqu'à {max_persons} passagers").replace(
                        '{max_persons}',
                        getMaxPersons().toString(),
                      )}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-redmonacair mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base font-brother text-royalblue">
                      {t.raw('charter.features')[2] || 'Horaires flexibles'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-redmonacair mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base font-brother text-royalblue">
                      {t.raw('charter.features')[4] || 'Service personnalisé'}
                    </span>
                  </li>
                </ul>
                <Link href="/booking?type=private-flight" className="mt-auto">
                  <Button className="w-full bg-royalblue hover:bg-royalblue/90 text-white font-brother">
                    {t('charter.cta')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
