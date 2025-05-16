'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Calendar, Clock, Users, Baby, MapPin, Luggage, Briefcase, Check } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface BookingSummaryProps {
  flightType: string
  departure: string
  arrival: string
  date: string
  time: string
  isReturn?: boolean
  returnDate?: string
  returnTime?: string
  adults: number
  childPassengers: number
  babies: number
  cabinLuggage: number
  checkedLuggage: number
  selectedHelicopter?: string
  basePrice: number
  baggagePrice?: number
  total: number
}

export default function BookingSummary({
  flightType,
  departure,
  arrival,
  date,
  time,
  isReturn,
  returnDate,
  returnTime,
  adults,
  childPassengers,
  babies,
  cabinLuggage,
  checkedLuggage,
  selectedHelicopter,
  basePrice,
  baggagePrice,
  total,
}: BookingSummaryProps) {
  const t = useTranslations('RegularLine.Reservation')

  const getLocationName = (code: string) => {
    switch (code) {
      case 'nice':
        return 'Nice'
      case 'monaco':
        return 'Monaco'
      case 'cannes':
        return 'Cannes'
      case 'sttropez':
        return 'Saint-Tropez'
      default:
        return code
    }
  }

  const getHelicopterName = (code: string) => {
    switch (code) {
      case 'h125':
        return 'H125 Mono moteur'
      case 'h130':
        return 'H130 Mono moteur'
      case 'as355':
        return 'AS355 Bi-moteur'
      case 'h135':
        return 'H135 Bi-moteur'
      case 'bell429':
        return 'Bell 429 Bi-moteur'
      case 'h155':
        return 'H155 Bi-moteur'
      default:
        return ''
    }
  }

  const getHelicopterPrice = (code: string) => {
    switch (code) {
      case 'h125':
        return '1 500€'
      case 'h130':
        return '1 800€'
      case 'as355':
        return '2 200€'
      case 'h135':
        return '2 500€'
      case 'bell429':
        return '3 000€'
      case 'h155':
        return '3 500€'
      default:
        return ''
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader className="bg-[#002841] text-white rounded-t-lg">
        <CardTitle>{t('summary.title')}</CardTitle>
        <CardDescription className="text-white/80">{t('summary.description')}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg mb-2">
              {flightType === 'ligne-reguliere'
                ? t('summary.regularLine')
                : t('summary.privateFlight')}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                {t('summary.from')} {getLocationName(departure)} {t('summary.to')}{' '}
                {getLocationName(arrival)}
              </span>
            </div>
            {date && time && (
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{date}</span>
                <Clock className="h-4 w-4 ml-2 mr-1" />
                <span>{time}</span>
              </div>
            )}

            {isReturn && returnDate && returnTime && (
              <div className="mt-2 pt-2 border-t border-dashed border-gray-200">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>
                    {t('summary.from')} {getLocationName(arrival)} {t('summary.to')}{' '}
                    {getLocationName(departure)}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{returnDate}</span>
                  <Clock className="h-4 w-4 ml-2 mr-1" />
                  <span>{returnTime}</span>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium mb-2">{t('summary.passengers')}</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{t('summary.adults')}</span>
                </div>
                <div>
                  <span>{adults}</span>
                </div>
              </div>

              {childPassengers > 0 && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{t('summary.children')}</span>
                  </div>
                  <div>
                    <span>{childPassengers}</span>
                  </div>
                </div>
              )}

              {babies > 0 && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Baby className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{t('summary.babies')}</span>
                  </div>
                  <div>
                    <span>{babies}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium mb-2">{t('summary.luggage')}</h4>
            <div className="space-y-2">
              {cabinLuggage > 0 && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{t('summary.cabinLuggage')}</span>
                  </div>
                  <div>
                    <span>{cabinLuggage}</span>
                  </div>
                </div>
              )}

              {checkedLuggage > 0 && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Luggage className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{t('summary.checkedLuggage')}</span>
                  </div>
                  <div>
                    <span>{checkedLuggage}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {flightType === 'vol-prive' && selectedHelicopter && (
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium mb-2">{t('summary.helicopter')}</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{getHelicopterName(selectedHelicopter)}</span>
                  <span className="font-medium">{getHelicopterPrice(selectedHelicopter)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium mb-2">{t('summary.estimatedTotal')}</h4>

            {flightType === 'ligne-reguliere' && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>
                    {adults + childPassengers} {t('summary.passengers')}
                  </span>
                  <span>
                    {basePrice}€ x {adults + childPassengers} ={' '}
                    {basePrice * (adults + childPassengers)}€
                  </span>
                </div>

                {checkedLuggage > 0 && baggagePrice && (
                  <div className="flex justify-between">
                    <span>
                      {t('summary.checkedLuggage')} ({checkedLuggage})
                    </span>
                    <span>
                      {baggagePrice}€ x {checkedLuggage} = {baggagePrice * checkedLuggage}€
                    </span>
                  </div>
                )}

                {isReturn && (
                  <div className="flex justify-between font-medium">
                    <span>{t('summary.returnMultiplier')}</span>
                    <span>x 2</span>
                  </div>
                )}

                <div className="flex justify-between font-bold border-t border-gray-200 pt-2 text-lg">
                  <span>{t('summary.estimatedTotal')}</span>
                  <span>{total}€</span>
                </div>
              </div>
            )}

            {flightType === 'vol-prive' && selectedHelicopter && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{getHelicopterName(selectedHelicopter)}</span>
                  <span>{getHelicopterPrice(selectedHelicopter)}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-gray-200 pt-2 text-lg">
                  <span>{t('summary.estimatedTotal')}</span>
                  <span>{total}€</span>
                </div>
              </div>
            )}

            <div className="text-xs text-gray-500 mt-5 space-y-2">
              <div className="flex items-center">
                <Check className="h-3 w-3 mr-1" />
                <span>{t('summary.paymentOnSiteNote')}</span>
              </div>
              <div className="flex items-center">
                <Check className="h-3 w-3 mr-1" />
                <span>{t('summary.freeCancellation')}</span>
              </div>
              <div className="flex items-center">
                <Check className="h-3 w-3 mr-1" />
                <span>{t('summary.instantConfirmation')}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t border-gray-200 rounded-b-lg pt-6">
        <div className="w-full">
          <div className="flex items-center mb-3">
            <Check className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm">{t('summary.freeCancellation')}</span>
          </div>
          <div className="flex items-center">
            <Check className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm">{t('summary.instantConfirmation')}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
