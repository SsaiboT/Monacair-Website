'use client'

import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Plane } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

interface FlightTypeProps {
  flightType: string
  setFlightType: (type: string) => void
}

export default function FlightType({ flightType, setFlightType }: FlightTypeProps) {
  const t = useTranslations('RegularLine.Reservation')

  useEffect(() => {
    if (flightType !== 'ligne-reguliere') {
      setFlightType('ligne-reguliere')
    }
  }, [flightType, setFlightType])

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t('flightType.title')}</CardTitle>
        <CardDescription>{t('flightType.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center justify-between rounded-md border-2 border-redmonacair bg-white p-4">
              <div className="mb-3 w-12 h-12 rounded-full bg-redmonacair/10 flex items-center justify-center">
                <Plane className="h-6 w-6 text-redmonacair" />
              </div>
              <div className="text-center">
                <p className="font-medium">{t('flightType.regularLine')}</p>
                <p className="text-sm text-gray-500">{t('flightType.regularLineDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
