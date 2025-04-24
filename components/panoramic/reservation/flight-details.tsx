'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Info } from 'lucide-react'

interface FlightDetailsProps {
  destination: string
  setDestination: (value: string) => void
  date: string
  setDate: (value: string) => void
  time: string
  setTime: (value: string) => void
}

export default function FlightDetails({
  destination,
  setDestination,
  date,
  setDate,
  time,
  setTime,
}: FlightDetailsProps) {
  const t = useTranslations('Panoramic.Reservation')

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t('flightDetails.title')}</CardTitle>
        <CardDescription>{t('flightDetails.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="destination">{t('flightDetails.destination.label')}</Label>
          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger id="destination">
              <SelectValue placeholder={t('flightDetails.destination.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monaco">
                {t('flightDetails.destination.options.monaco')}
              </SelectItem>
              <SelectItem value="nice">{t('flightDetails.destination.options.nice')}</SelectItem>
              <SelectItem value="cannes">
                {t('flightDetails.destination.options.cannes')}
              </SelectItem>
              <SelectItem value="esterel">
                {t('flightDetails.destination.options.esterel')}
              </SelectItem>
              <SelectItem value="sttropez">
                {t('flightDetails.destination.options.sttropez')}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">{t('flightDetails.date.label')}</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="time">{t('flightDetails.time.label')}</Label>
            <Input
              id="time"
              type="text"
              placeholder={t('flightDetails.time.placeholder')}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start">
          <Info className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-yellow-800">{t('flightDetails.note')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
