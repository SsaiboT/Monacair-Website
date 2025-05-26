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
import type { Destination } from '@/payload-types'

interface FlightDetailsProps {
  destination: string
  setDestination: (value: string) => void
  flightType: 'shared' | 'private'
  setFlightType: (value: 'shared' | 'private') => void
  duration: number
  setDuration: (value: number) => void
  date: string
  setDate: (value: string) => void
  time: string
  setTime: (value: string) => void
  availableDestinations: Destination[]
  availableFlightTypes: { shared: boolean; private: boolean }
  availableDurations: number[]
  currentPrice: number
}

export default function FlightDetails({
  destination,
  setDestination,
  flightType,
  setFlightType,
  duration,
  setDuration,
  date,
  setDate,
  time,
  setTime,
  availableDestinations,
  availableFlightTypes,
  availableDurations,
  currentPrice,
}: FlightDetailsProps) {
  const t = useTranslations('Panoramic.Reservation')

  const formatTimeInput = (value: string) => {
    const digits = value.replace(/\D/g, '')
    if (digits.length <= 2) {
      return digits
    } else if (digits.length <= 4) {
      return `${digits.slice(0, 2)}:${digits.slice(2)}`
    }
    return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t('flightDetails.title')}</CardTitle>
        <CardDescription>{t('flightDetails.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="destination">{t('flightDetails.destination.label')}</Label>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger id="destination" className="w-full">
                <SelectValue placeholder={t('flightDetails.destination.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {availableDestinations.length > 0 ? (
                  availableDestinations.map((dest) => (
                    <SelectItem key={dest.slug} value={dest.slug}>
                      {dest.title}
                    </SelectItem>
                  ))
                ) : (
                  <>
                    <SelectItem value="monaco">Monaco</SelectItem>
                    <SelectItem value="nice">Nice</SelectItem>
                    <SelectItem value="cannes">Cannes</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="flightType">Type de vol</Label>
            <Select value={flightType} onValueChange={setFlightType}>
              <SelectTrigger id="flightType" className="w-full">
                <SelectValue placeholder="Sélectionner le type" />
              </SelectTrigger>
              <SelectContent>
                {availableFlightTypes.shared && <SelectItem value="shared">Vol partagé</SelectItem>}
                {availableFlightTypes.private && <SelectItem value="private">Vol privé</SelectItem>}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="duration">Durée (minutes)</Label>
            <Select
              value={duration.toString()}
              onValueChange={(value) => setDuration(parseInt(value))}
            >
              <SelectTrigger id="duration" className="w-full">
                <SelectValue placeholder="Sélectionner la durée" />
              </SelectTrigger>
              <SelectContent>
                {availableDurations.map((dur) => (
                  <SelectItem key={dur} value={dur.toString()}>
                    {dur} minutes
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">{t('flightDetails.date.label')}</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={getMinDate()}
              required
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="time">{t('flightDetails.time.label')}</Label>
            <Input
              id="time"
              type="text"
              placeholder="00:00"
              value={time}
              onChange={(e) => setTime(formatTimeInput(e.target.value))}
              maxLength={5}
              required
              className="w-full"
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
