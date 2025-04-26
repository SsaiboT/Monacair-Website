import React from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { ArrowRight, CheckSquare } from 'lucide-react'

const TravelWith = () => {
  const t = useTranslations('PrivateJet.travelWith')

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="container px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-brother font-medium text-royalblue mb-6">
              {t('title')}
            </h2>
            <p className="text-base md:text-lg text-gray-700 font-brother mb-8">
              {t('description')}
            </p>

            <div className="mb-10">
              <h3 className="text-xl font-brother font-medium mb-4 text-royalblue">
                {t('about.title')}
              </h3>
              <p className="text-gray-700 font-brother mb-4">{t('about.description')}</p>
              <Link
                href="/about"
                className="inline-flex items-center text-redmonacair font-brother hover:text-royalblue transition-colors"
              >
                {t('about.link')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <p className="text-gray-700 font-brother mb-6">{t('cta_text')}</p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link href="/private-jet/reservation">
                <Button variant="red" size="lg" className="w-full sm:w-auto">
                  {t('book_button')}
                </Button>
              </Link>

              <Link href="/contact">
                <Button variant="blue" size="lg" className="w-full sm:w-auto">
                  {t('contact_button')}
                </Button>
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/index/jet.webp"
                alt="Luxury private jet interior"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute -top-5 -right-5 w-32 h-32 rounded-full bg-redmonacair/20 z-0"></div>
            <div className="absolute -bottom-5 -left-5 w-24 h-24 rounded-full bg-royalblue/20 z-0"></div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-royalblue flex items-center justify-center">
                  <CheckSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-brother text-royalblue font-medium">
                    {t('badge.title')}
                  </p>
                  <p className="text-xs font-brother text-gray-500">{t('badge.subtitle')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TravelWith
