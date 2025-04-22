import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { Clock, Euro, Calendar, Briefcase } from 'lucide-react'

const RegularLineSection: React.FC = () => {
  const t = useTranslations('Booking')

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-bold font-brother mb-6 text-royalblue">
              {t('regular-line.title')}
            </h2>
            <p className="mb-8 text-gray-700">{t('regular-line.description')}</p>
            <div className="mb-8 space-y-5">
              <div className="flex items-center">
                <div className="w-10 h-10 aspect-square rounded-full bg-redmonacair flex items-center justify-center mr-4">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-bold">{t('regular-line.flight-time.label')}</span>
                  <span> {t('regular-line.flight-time.value')}</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 aspect-square rounded-full bg-redmonacair flex items-center justify-center mr-4">
                  <Euro className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-bold">{t('regular-line.price.label')}</span>
                  <span> {t('regular-line.price.value')}</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 aspect-square rounded-full bg-redmonacair flex items-center justify-center mr-4">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-bold">{t('regular-line.schedule.label')}</span>
                  <span> {t('regular-line.schedule.value')}</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 aspect-square rounded-full bg-redmonacair flex items-center justify-center mr-4">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-bold">{t('regular-line.luggage.label')}</span>
                  <span> {t('regular-line.luggage.value')}</span>
                </div>
              </div>
            </div>
            <Link href="/booking/regular-line">
              <Button variant="red" size="lg" className="rounded-lg">
                {t('regular-line.book-now')}
              </Button>
            </Link>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/index/regular.webp"
                alt={t('regular-line.image-alt')}
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

export default RegularLineSection
