'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Calendar, Clock, Users, MapPin, CreditCard, Shield, Check, Baby } from 'lucide-react'

interface BookingSummaryProps {
  destination: string
  date: string
  time: string
  adults: number
  childrenCount: number
  babies: number
  hasRegistrationFee: boolean
  hasGiftPackage: boolean
  hasCancellationInsurance: boolean
  promoCode: string
  isValidPromoCode: boolean
}

export default function BookingSummary({
  destination,
  date,
  time,
  adults,
  childrenCount,
  babies,
  hasRegistrationFee,
  hasGiftPackage,
  hasCancellationInsurance,
  promoCode,
  isValidPromoCode,
}: BookingSummaryProps) {
  const t = useTranslations('Panoramic.Reservation')

  const destinationPrices = {
    monaco: 390,
    nice: 490,
    cannes: 870,
    esterel: 1090,
    sttropez: 1900,
  }

  const basePrice = destinationPrices[destination as keyof typeof destinationPrices] || 390
  const registrationFee = hasRegistrationFee ? 30 : 0
  const giftPackageFee = hasGiftPackage ? 30 : 0
  const cancellationInsuranceFee = hasCancellationInsurance ? 45 : 0
  const totalPassengers = adults + childrenCount

  const subtotal =
    basePrice + registrationFee * totalPassengers + giftPackageFee + cancellationInsuranceFee

  let discount = 0
  if (isValidPromoCode && promoCode === 'PANORAMIC2023') {
    discount = Math.round(subtotal * 0.1) // 10% discount
  }

  const total = subtotal - discount

  return (
    <Card>
      <CardHeader className="bg-[#002841] text-white rounded-t-lg">
        <CardTitle>{t('summary.title')}</CardTitle>
        <CardDescription className="text-white/80">{t('summary.description')}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg mb-2">
              {t('summary.flightType')} -{' '}
              {destination === 'monaco' && t('flightDetails.destination.options.monaco')}
              {destination === 'nice' && t('flightDetails.destination.options.nice')}
              {destination === 'cannes' && t('flightDetails.destination.options.cannes')}
              {destination === 'esterel' && t('flightDetails.destination.options.esterel')}
              {destination === 'sttropez' && t('flightDetails.destination.options.sttropez')}
            </h3>
            {date && time && (
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{date}</span>
                <Clock className="h-4 w-4 ml-2 mr-1" />
                <span>{time}</span>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium mb-2">{t('summary.passengers')}</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{t('passengers.adults.label')}</span>
                </div>
                <div>
                  <span>{adults}</span>
                </div>
              </div>

              {childrenCount > 0 && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{t('passengers.children.label')}</span>
                  </div>
                  <div>
                    <span>{childrenCount}</span>
                  </div>
                </div>
              )}

              {babies > 0 && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Baby className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{t('passengers.babies.label')}</span>
                  </div>
                  <div>
                    <span>{babies}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium mb-2">{t('summary.priceDetails')}</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{t('summary.panoramicFlight')}</span>
                </div>
                <div>
                  <span className="text-gray-500">{basePrice}€</span>
                </div>
              </div>

              {hasRegistrationFee && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{t('additionalOptions.registrationFee.label')}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">30€ x {totalPassengers}</span>
                  </div>
                </div>
              )}

              {hasGiftPackage && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <span className="text-gray-500">
                      {t('additionalOptions.giftPackage.label')}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">30€</span>
                  </div>
                </div>
              )}

              {hasCancellationInsurance && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{t('additionalOptions.cancellationInsurance.label')}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">45€</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {discount > 0 && (
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-green-600">
                <span>{t('summary.discount')}</span>
                <span>-{discount}€</span>
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>{t('summary.total')}</span>
              <span>{total}€</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{t('summary.paymentNote')}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <div className="w-full">
          <div className="flex items-center mb-2">
            <Check className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm">{t('summary.cancellationPolicy')}</span>
          </div>
          <div className="flex items-center">
            <Check className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm">{t('summary.confirmationPolicy')}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
