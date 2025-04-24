'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Plane, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface FlightTypeProps {
  flightType: string
  setFlightType: (type: string) => void
}

export default function FlightType({ flightType, setFlightType }: FlightTypeProps) {
  const t = useTranslations('RegularLine.Reservation')

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t('flightType.title')}</CardTitle>
        <CardDescription>{t('flightType.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={flightType}
          onValueChange={setFlightType}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <RadioGroupItem value="ligne-reguliere" id="ligne-reguliere" className="peer sr-only" />
            <Label
              htmlFor="ligne-reguliere"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-redmonacair [&:has([data-state=checked])]:border-redmonacair cursor-pointer"
            >
              <div className="mb-3 w-12 h-12 rounded-full bg-redmonacair/10 flex items-center justify-center">
                <Plane className="h-6 w-6 text-redmonacair" />
              </div>
              <div className="text-center">
                <p className="font-medium">{t('flightType.regularLine')}</p>
                <p className="text-sm text-gray-500">{t('flightType.regularLineDesc')}</p>
              </div>
            </Label>
          </div>
          <div>
            <RadioGroupItem value="vol-prive" id="vol-prive" className="peer sr-only" />
            <Label
              htmlFor="vol-prive"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-redmonacair [&:has([data-state=checked])]:border-redmonacair cursor-pointer"
            >
              <div className="mb-3 w-12 h-12 rounded-full bg-redmonacair/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-redmonacair" />
              </div>
              <div className="text-center">
                <p className="font-medium">{t('flightType.privateFlight')}</p>
                <p className="text-sm text-gray-500">{t('flightType.privateFlightDesc')}</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
