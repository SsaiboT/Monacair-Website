'use client'

import React, { useState, useEffect } from 'react'
import { Clock, Calendar, Euro } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import type { RegularFlight, Destination } from '@/payload-types'

interface IntroductionProps {
  routeData: RegularFlight
  startPoint: Destination | null
  endPoint: Destination | null
}

export default function Introduction({ routeData, startPoint, endPoint }: IntroductionProps) {
  const t = useTranslations('RegularLine.introduction')
  const [imageSrc, setImageSrc] = useState('/images/index/regular.webp')

  useEffect(() => {
    if (routeData?.about?.image) {
      const imageUrl =
        typeof routeData.about.image === 'string'
          ? `/api/media/${routeData.about.image}`
          : routeData.about.image.url

      if (imageUrl) {
        setImageSrc(imageUrl)
      }
    }
  }, [routeData])

  const formatFlightDuration = () => {
    if (routeData?.time_frames?.average_flight_duration) {
      return `${routeData.time_frames.average_flight_duration} minutes`
    }
    return t('flight-info.duration.value')
  }

  const formatFrequency = () => {
    if (routeData?.time_frames?.frequency) {
      return `Vols toutes les ${routeData.time_frames.frequency} minutes en période de pointe`
    }
    return t('flight-info.frequency.value')
  }

  const formatPrice = () => {
    if (routeData?.tariffs?.price_per_adult) {
      return `À partir de ${routeData.tariffs.price_per_adult}€ par personne`
    }
    return t('flight-info.price.value')
  }

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gray-50 md:-skew-x-12 transform origin-top-right z-0"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 font-brother text-royalblue">
              {t('title')}
            </h2>
            <p className="text-base sm:text-lg mb-6 font-brother text-royalblue">
              {routeData?.about?.description || t('description')}
            </p>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <div className="w-12 h-12 rounded-full bg-royalblue/10 flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-royalblue" />
                </div>
                <div className="font-brother text-royalblue text-center sm:text-left">
                  <span className="font-medium">{t('flight-info.duration.label')}</span>{' '}
                  {formatFlightDuration()}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <div className="w-12 h-12 rounded-full bg-royalblue/10 flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-royalblue" />
                </div>
                <div className="font-brother text-royalblue text-center sm:text-left">
                  <span className="font-medium">{t('flight-info.frequency.label')}</span>{' '}
                  {formatFrequency()}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <div className="w-12 h-12 rounded-full bg-royalblue/10 flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
                  <Euro className="h-5 w-5 sm:h-6 sm:w-6 text-royalblue" />
                </div>
                <div className="font-brother text-royalblue text-center sm:text-left">
                  <span className="font-medium">{t('flight-info.price.label')}</span>{' '}
                  {formatPrice()}
                </div>
              </div>
            </div>
          </div>
          <div className="relative mt-8 md:mt-0">
            <div className="absolute -top-6 -left-6 w-24 h-24 sm:w-32 sm:h-32 bg-royalblue/10 rounded-full z-0 hidden sm:block"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 sm:w-32 sm:h-32 bg-royalblue/10 rounded-full z-0 hidden sm:block"></div>
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <Image
                src={imageSrc}
                alt={t('image-alt')}
                width={800}
                height={600}
                className="w-full h-auto"
              />
              {startPoint && endPoint && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3">
                  <h3 className="text-lg font-medium">
                    {startPoint.title} → {endPoint.title}
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
