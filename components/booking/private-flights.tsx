import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

const PrivateFlights: React.FC = () => {
  const t = useTranslations('Booking')

  const features = [
    {
      key: 'flexibility',
      title: t('private-flights.flexibility.title'),
      description: t('private-flights.flexibility.description'),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-redmonacair"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      key: 'service',
      title: t('private-flights.service.title'),
      description: t('private-flights.service.description'),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-redmonacair"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      key: 'confidentiality',
      title: t('private-flights.confidentiality.title'),
      description: t('private-flights.confidentiality.description'),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-redmonacair"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[46px] font-bold font-brother mb-4">{t('private-flights.title')}</h2>
          <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
            {t('private-flights.description')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="w-full max-w-lg">
              <div className="grid grid-cols-1 gap-4">
                {features.map(({ key, title, description, icon }) => (
                  <div
                    key={key}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col justify-between"
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-redmonacair/10 flex items-center justify-center mr-3">
                        {icon}
                      </div>
                      <h3 className="text-base font-bold text-gray-900">{title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 w-full">
                <Link href="/booking/private">
                  <Button size="lg" variant="red" className="w-full">
                    {t('private-flights.book-now')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/index/private.webp"
                alt={t('private-flights.image-alt')}
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

export default PrivateFlights
