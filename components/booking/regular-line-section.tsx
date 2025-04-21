import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

const RegularLineSection = () => {
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

            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-full bg-redmonacair flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-bold">{t('regular-line.flight-time.label')}</span>
                  <span> {t('regular-line.flight-time.value')}</span>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-full bg-redmonacair flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-bold">{t('regular-line.price.label')}</span>
                  <span> {t('regular-line.price.value')}</span>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-full bg-redmonacair flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-bold">{t('regular-line.schedule.label')}</span>
                  <span> {t('regular-line.schedule.value')}</span>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-redmonacair flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-bold">{t('regular-line.luggage.label')}</span>
                  <span> {t('regular-line.luggage.value')}</span>
                </div>
              </div>
            </div>

            <Link href="/booking/regular-line">
              <Button variant="red" size="lg">
                {t('regular-line.book-now')}
              </Button>
            </Link>
          </div>

          <div className="w-full lg:w-1/2 relative">
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
