'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Calendar, Clock, Users, Baby, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

interface FlightDetailsProps {
  departure: string
  setDeparture: (departure: string) => void
  arrival: string
  setArrival: (arrival: string) => void
  date: string
  setDate: (date: string) => void
  time: string
  setTime: (time: string) => void
  adults: number
  setAdults: (adults: number) => void
  childPassengers: number
  setChildPassengers: (children: number) => void
  babies: number
  setBabies: (babies: number) => void
  cabinLuggage: number
  setCabinLuggage: (luggage: number) => void
  checkedLuggage: number
  setCheckedLuggage: (luggage: number) => void
  hasCommercialFlight: boolean
  setHasCommercialFlight: (has: boolean) => void
  airline: string
  setAirline: (airline: string) => void
  flightOriginDestination: string
  setFlightOriginDestination: (origin: string) => void
  flightTime: string
  setFlightTime: (time: string) => void
  needsDriverService: boolean
  setNeedsDriverService: (needs: boolean) => void
  pickupLocation: string
  setPickupLocation: (location: string) => void
  goToNextStep: () => void
}

export default function FlightDetails({
  departure,
  setDeparture,
  arrival,
  setArrival,
  date,
  setDate,
  time,
  setTime,
  adults,
  setAdults,
  childPassengers,
  setChildPassengers,
  babies,
  setBabies,
  cabinLuggage,
  setCabinLuggage,
  checkedLuggage,
  setCheckedLuggage,
  hasCommercialFlight,
  setHasCommercialFlight,
  airline,
  setAirline,
  flightOriginDestination,
  setFlightOriginDestination,
  flightTime,
  setFlightTime,
  needsDriverService,
  setNeedsDriverService,
  pickupLocation,
  setPickupLocation,
  goToNextStep,
}: FlightDetailsProps) {
  const t = useTranslations('RegularLine.Reservation')

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t('flightDetails.title')}</CardTitle>
        <CardDescription>{t('flightDetails.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="departure">{t('flightDetails.departure')}</Label>
            <Select value={departure} onValueChange={setDeparture}>
              <SelectTrigger id="departure">
                <SelectValue placeholder={t('flightDetails.selectDeparture')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nice">Nice</SelectItem>
                <SelectItem value="monaco">Monaco</SelectItem>
                <SelectItem value="cannes">Cannes</SelectItem>
                <SelectItem value="sttropez">Saint-Tropez</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="arrival">{t('flightDetails.arrival')}</Label>
            <Select value={arrival} onValueChange={setArrival}>
              <SelectTrigger id="arrival">
                <SelectValue placeholder={t('flightDetails.selectArrival')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monaco">Monaco</SelectItem>
                <SelectItem value="nice">Nice</SelectItem>
                <SelectItem value="cannes">Cannes</SelectItem>
                <SelectItem value="sttropez">Saint-Tropez</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">{t('flightDetails.date')}</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="time">{t('flightDetails.time')}</Label>
            <Input
              id="time"
              type="text"
              placeholder="Ex: 14:30"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">{t('flightDetails.passengers')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="adults">{t('flightDetails.adults')}</Label>
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
                  disabled={adults + childPassengers >= 6}
                >
                  +
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="childPassengers">{t('flightDetails.children')}</Label>
              <div className="flex items-center mt-2">
                <Button
                  type="button"
                  variant="white"
                  size="sm"
                  onClick={() => setChildPassengers(Math.max(0, childPassengers - 1))}
                  className="h-10 w-10"
                >
                  -
                </Button>
                <div className="w-12 text-center">{childPassengers}</div>
                <Button
                  type="button"
                  variant="white"
                  size="sm"
                  onClick={() => setChildPassengers(Math.min(5, childPassengers + 1))}
                  className="h-10 w-10"
                  disabled={adults + childPassengers >= 6}
                >
                  +
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="babies">{t('flightDetails.babies')}</Label>
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
              <p className="text-xs text-gray-500 mt-1">{t('flightDetails.babiesNote')}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="commercialFlight"
              checked={hasCommercialFlight}
              onCheckedChange={setHasCommercialFlight}
            />
            <Label
              htmlFor="commercialFlight"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t('flightDetails.commercialFlight')}
            </Label>
          </div>

          {hasCommercialFlight && (
            <div className="pl-6 space-y-4 border-l-2 border-gray-200">
              <div>
                <Label htmlFor="airline">{t('flightDetails.airline')}</Label>
                <Input
                  id="airline"
                  value={airline}
                  onChange={(e) => setAirline(e.target.value)}
                  placeholder={t('flightDetails.airlinePlaceholder')}
                />
              </div>
              <div>
                <Label htmlFor="flightOriginDestination">
                  {t('flightDetails.flightOriginDestination')}
                </Label>
                <Input
                  id="flightOriginDestination"
                  value={flightOriginDestination}
                  onChange={(e) => setFlightOriginDestination(e.target.value)}
                  placeholder={t('flightDetails.flightOriginDestinationPlaceholder')}
                />
              </div>
              <div>
                <Label htmlFor="flightTime">{t('flightDetails.flightTime')}</Label>
                <Input
                  id="flightTime"
                  value={flightTime}
                  onChange={(e) => setFlightTime(e.target.value)}
                  placeholder={t('flightDetails.flightTimePlaceholder')}
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 pt-4">
          <div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="driverService"
                checked={needsDriverService}
                onCheckedChange={setNeedsDriverService}
              />
              <Label
                htmlFor="driverService"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('flightDetails.driverService')}
              </Label>
            </div>
          </div>

          {needsDriverService && (
            <div className="pl-6 space-y-4 border-l-2 border-gray-200">
              <div>
                <Label htmlFor="pickupLocation">{t('flightDetails.pickupLocation')}</Label>
                <Input
                  id="pickupLocation"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder={t('flightDetails.pickupLocationPlaceholder')}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button variant="red" onClick={goToNextStep} className=" text-white">
            {t('buttons.nextStep')} <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
