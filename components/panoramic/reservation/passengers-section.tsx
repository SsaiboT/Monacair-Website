'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Info } from 'lucide-react'

interface PassengersSectionProps {
  adults: number
  setAdults: (value: number) => void
  childrenCount: number
  setChildren: (value: number) => void
  babies: number
  setBabies: (value: number) => void
}

export default function PassengersSection({
  adults,
  setAdults,
  childrenCount,
  setChildren,
  babies,
  setBabies,
}: PassengersSectionProps) {
  const t = useTranslations('Panoramic.Reservation')

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{t('passengers.title')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="adults">{t('passengers.adults.label')}</Label>
          <div className="flex items-center mt-2">
            <Button
              type="button"
              variant="white"
              size="sm"
              onClick={() => setAdults(Math.max(1, adults - 1))}
              className="h-10 w-10"
            >
              -
            </Button>
            <div className="w-12 text-center">{adults}</div>
            <Button
              type="button"
              variant="white"
              size="sm"
              onClick={() => setAdults(Math.min(6, adults + 1))}
              className="h-10 w-10"
              disabled={adults + childrenCount >= 6}
            >
              +
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="children">{t('passengers.children.label')}</Label>
          <div className="flex items-center mt-2">
            <Button
              type="button"
              variant="white"
              size="sm"
              onClick={() => setChildren(Math.max(0, childrenCount - 1))}
              className="h-10 w-10"
            >
              -
            </Button>
            <div className="w-12 text-center">{childrenCount}</div>
            <Button
              type="button"
              variant="white"
              size="sm"
              onClick={() => setChildren(Math.min(5, childrenCount + 1))}
              className="h-10 w-10"
              disabled={adults + childrenCount >= 6}
            >
              +
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="babies">{t('passengers.babies.label')}</Label>
          <div className="flex items-center mt-2">
            <Button
              type="button"
              variant="white"
              size="sm"
              onClick={() => setBabies(Math.max(0, babies - 1))}
              className="h-10 w-10"
            >
              -
            </Button>
            <div className="w-12 text-center">{babies}</div>
            <Button
              type="button"
              variant="white"
              size="sm"
              onClick={() => setBabies(Math.min(adults, babies + 1))}
              className="h-10 w-10"
              disabled={babies >= adults}
            >
              +
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">{t('passengers.babies.note')}</p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start mt-4">
        <Info className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-yellow-800">{t('passengers.warning')}</p>
        </div>
      </div>
    </div>
  )
}
