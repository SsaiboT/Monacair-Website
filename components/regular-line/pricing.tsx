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

  const regularFeatures = t.raw('regular.features') as string[]
  const charterFeatures = t.raw('charter.features') as string[]

  const formatAdultPrice = () => {
    if (routeData?.tariffs?.price_per_adult) {
      return `${routeData.tariffs.price_per_adult}€`
    }
    return t('regular.price') || '140€'
  }

  const formatCharterPrice = () => {
    return t('charter.price') || 'Sur devis'
  }

  const getMaxPersons = () => {
    if (routeData?.tariffs?.max_persons) {
      return routeData.tariffs.max_persons
    }
    return 6
  }

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gray-50"></div>
      <div className="absolute top-0 left-0 right-0 h-32">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-32"
        >
          <path
            fill="#f9fafb"
            fillOpacity="1"
            d="M0,96L80,106.7C160,117,320,139,480,133.3C640,128,800,96,960,90.7C1120,85,1280,107,1360,117.3L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 font-brother text-royalblue">
              {t('title')}
            </h2>
            <p className="text-base sm:text-lg font-brother text-royalblue">{t('subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105">
              <div className="bg-redmonacair text-white p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold font-brother">{t('regular.title')}</h3>
                <p className="text-sm sm:text-base text-white/80 font-brother">
                  {t('regular.subtitle')}
                </p>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex justify-center items-center mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl font-bold font-brother text-royalblue">
                    {formatAdultPrice()}
                  </span>
                  <span className="text-sm sm:text-base text-gray-500 ml-2 font-brother">
                    {t('regular.per')}
                  </span>
                </div>
                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {regularFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-redmonacair mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base font-brother text-royalblue">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href="/reserver-regulier">
                  <Button className="w-full bg-redmonacair hover:bg-redmonacair/90 text-white font-brother">
                    {t('regular.cta')}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105">
              <div className="bg-royalblue text-white p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold font-brother">{t('charter.title')}</h3>
                <p className="text-sm sm:text-base text-white/80 font-brother">
                  {t('charter.subtitle')}
                </p>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex justify-center items-center mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl font-bold font-brother text-royalblue">
                    {formatCharterPrice()}
                  </span>
                  <span className="text-sm sm:text-base text-gray-500 ml-2 font-brother">
                    {t('charter.per')}
                  </span>
                </div>
                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {charterFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-redmonacair mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base font-brother text-royalblue">
                        {feature.replace('{max_persons}', getMaxPersons().toString())}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href="/demande-charter">
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
