'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { Calendar, Clock, Users, Baby, ChevronRight, Briefcase } from 'lucide-react'
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
import { Switch } from '@/components/ui/switch'
import { getFlightTimeslots } from '@/app/(frontend)/[locale]/booking/actions'

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
  flex: boolean
  setFlex: (flex: boolean) => void
  isReturn: boolean
  setIsReturn: (isReturn: boolean) => void
  returnDate: string
  setReturnDate: (returnDate: string) => void
  returnTime: string
  setReturnTime: (returnTime: string) => void
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
  isReversed?: boolean
  isPanoramic?: boolean
  availableDestinations?: any[]
  availableArrivalDestinations?: any[]
  availableTimes?: string[]
  availableReturnTimes?: string[]
  routeData?: any
  maxPassengers?: number
  maxBaggage?: number
  maxCabinBaggage?: number
  baggagePrice?: number
  cabinBaggagePrice?: number
  flightType?: string
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
  flex,
  setFlex,
  isReturn,
  setIsReturn,
  returnDate,
  setReturnDate,
  returnTime,
  setReturnTime,
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
  isReversed,
  isPanoramic = false,
  availableDestinations = [],
  availableArrivalDestinations = [],
  availableTimes = [],
  availableReturnTimes = [],
  routeData = null,
  maxPassengers = 6,
  maxBaggage = 2,
  maxCabinBaggage = 2,
  baggagePrice = 15,
  cabinBaggagePrice = 10,
  flightType = 'ligne-reguliere',
}: FlightDetailsProps) {
  const t = useTranslations('RegularLine.Reservation')
  const searchParams = useSearchParams()

  const getMinDate = () => {
    const minDate = new Date()
    minDate.setDate(minDate.getDate() + 1)
    return minDate.toISOString().split('T')[0]
  }

  const formatTimeInput = (value: string) => {
    const digits = value.replace(/\D/g, '')
    if (digits.length <= 2) {
      return digits
    } else if (digits.length <= 4) {
      return `${digits.slice(0, 2)}:${digits.slice(2)}`
    }
    return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`
  }

  useEffect(() => {
    const fromParam = searchParams.get('from')
    const toParam = searchParams.get('to')
    const passengersParam = searchParams.get('passengers')
    const adultsParam = searchParams.get('adults')
    const childrenParam = searchParams.get('children')
    const newbornsParam = searchParams.get('newborns')
    const isReturnParam = searchParams.get('isReturn')
    const timeParam = searchParams.get('time')
    const dateParam = searchParams.get('date')
    const datetimeParam = searchParams.get('datetime')
    const returndatetimeParam = searchParams.get('returndatetime')
    const flexParam = searchParams.get('flex')

    if (fromParam) {
      setDeparture(fromParam)
    }

    if (toParam) {
      setArrival(toParam)
    }

    if (datetimeParam) {
      try {
        const dateObj = new Date(datetimeParam)
        setDate(dateObj.toISOString().split('T')[0])
        setTime(dateObj.toISOString().split('T')[1].substr(0, 5))
      } catch (error) {
        console.error('Error parsing datetime parameter:', error)
      }
    } else {
      if (timeParam) {
        setTime(timeParam)
      }

      if (dateParam) {
        setDate(dateParam)
      }
    }

    if (returndatetimeParam) {
      try {
        const dateObj = new Date(returndatetimeParam)
        setReturnDate(dateObj.toISOString().split('T')[0])
        setReturnTime(dateObj.toISOString().split('T')[1].substr(0, 5))
        setIsReturn(true)
      } catch (error) {
        console.error('Error parsing returndatetime parameter:', error)
      }
    }

    if (adultsParam) {
      const parsedAdults = parseInt(adultsParam, 10)
      if (!isNaN(parsedAdults)) {
        setAdults(Math.min(parsedAdults, maxPassengers))
      }
    } else if (passengersParam) {
      const parsedPassengers = parseInt(passengersParam, 10)
      if (!isNaN(parsedPassengers)) {
        setAdults(Math.min(parsedPassengers, maxPassengers))
      }
    }

    if (childrenParam) {
      const parsedChildren = parseInt(childrenParam, 10)
      if (!isNaN(parsedChildren)) {
        setChildPassengers(parsedChildren)
      }
    }

    if (newbornsParam) {
      const parsedNewborns = parseInt(newbornsParam, 10)
      if (!isNaN(parsedNewborns)) {
        setBabies(parsedNewborns)
      }
    }

    if (isReturnParam === 'true') {
      setIsReturn(true)
    }

    if (flexParam === 'true') {
      setFlex(true)
    }
  }, [
    searchParams,
    setDeparture,
    setArrival,
    setAdults,
    setChildPassengers,
    setBabies,
    maxPassengers,
    setDate,
    setTime,
    setReturnDate,
    setReturnTime,
    setIsReturn,
    setFlex,
  ])

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t('flightDetails.title')}</CardTitle>
        <CardDescription>{t('flightDetails.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isPanoramic && (
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-md">
            <div className="space-y-0.5">
              <h4 className="font-medium text-sm">
                {isReturn
                  ? t('booking-form.flight-type.return')
                  : t('booking-form.flight-type.one-way')}
              </h4>
              <p className="text-sm text-gray-500">{isReturn ? 'Aller-retour' : 'Aller simple'}</p>
            </div>
            <Switch checked={isReturn} onCheckedChange={setIsReturn} />
          </div>
        )}

        {flightType !== 'vol-prive' && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="flex-tariff"
              checked={flex}
              onCheckedChange={(checked) => setFlex(checked === true)}
            />
            <Label htmlFor="flex-tariff" className="text-sm font-medium leading-none">
              {t('booking-form.flex.label')}
            </Label>
            <p className="text-xs text-gray-500 ml-2">{t('booking-form.flex.description')}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="departure">{t('flightDetails.departure')}</Label>
            <Select value={departure} onValueChange={setDeparture}>
              <SelectTrigger id="departure" className="w-full">
                <SelectValue placeholder={t('flightDetails.selectDeparture')} />
              </SelectTrigger>
              <SelectContent>
                {availableDestinations.map((dest) => (
                  <SelectItem key={dest.id} value={dest.id}>
                    {dest.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="arrival">{t('flightDetails.arrival')}</Label>
            <Select value={arrival} onValueChange={setArrival}>
              <SelectTrigger id="arrival" className="w-full">
                <SelectValue placeholder={t('flightDetails.selectArrival')} />
              </SelectTrigger>
              <SelectContent>
                {(flightType === 'vol-prive' ? availableDestinations : availableArrivalDestinations)
                  .filter((dest) => dest.id !== departure)
                  .map((dest) => (
                    <SelectItem key={dest.id} value={dest.id}>
                      {dest.title}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className={`grid grid-cols-1 ${isReturn ? 'md:grid-cols-2' : 'md:grid-cols-2'} gap-4`}>
          <div>
            <Label htmlFor="date">{t('flightDetails.date')}</Label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={getMinDate()}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div>
            <Label htmlFor="time">{t('flightDetails.time')}</Label>
            {flightType === 'vol-prive' ? (
              <Input
                id="time"
                type="text"
                placeholder="00:00"
                value={time}
                onChange={(e) => setTime(formatTimeInput(e.target.value))}
                maxLength={5}
                required
              />
            ) : (
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger id="time" className="w-full">
                  <SelectValue placeholder={t('flightDetails.time')} />
                </SelectTrigger>
                <SelectContent>
                  {availableTimes.map((timeOption) => (
                    <SelectItem key={timeOption} value={timeOption}>
                      {timeOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {isReturn && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-200 pt-4">
            <div>
              <Label htmlFor="returnDate">{t('flightDetails.returnDate')}</Label>
              <input
                id="returnDate"
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={date || getMinDate()}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div>
              <Label htmlFor="returnTime">{t('flightDetails.returnTime')}</Label>
              {flightType === 'vol-prive' ? (
                <Input
                  id="returnTime"
                  type="text"
                  placeholder="00:00"
                  value={returnTime}
                  onChange={(e) => setReturnTime(formatTimeInput(e.target.value))}
                  maxLength={5}
                  required
                />
              ) : (
                <Select value={returnTime} onValueChange={setReturnTime}>
                  <SelectTrigger id="returnTime" className="w-full">
                    <SelectValue placeholder={t('flightDetails.time')} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableReturnTimes.map((timeOption) => (
                      <SelectItem key={timeOption} value={timeOption}>
                        {timeOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        )}

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
                  onClick={() => setAdults(Math.min(maxPassengers, adults + 1))}
                  className="h-10 w-10"
                  disabled={adults + childPassengers >= maxPassengers}
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
                  onClick={() =>
                    setChildPassengers(Math.min(maxPassengers - adults, childPassengers + 1))
                  }
                  className="h-10 w-10"
                  disabled={adults + childPassengers >= maxPassengers}
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

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium mb-4">{t('flightDetails.luggage')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cabinLuggage">{t('flightDetails.cabinLuggage')}</Label>
              <div className="flex items-center mt-2">
                <Button
                  type="button"
                  variant="white"
                  size="sm"
                  onClick={() => setCabinLuggage(Math.max(0, cabinLuggage - 1))}
                  className="h-10 w-10"
                >
                  -
                </Button>
                <div className="w-12 text-center">{cabinLuggage}</div>
                <Button
                  type="button"
                  variant="white"
                  size="sm"
                  onClick={() =>
                    setCabinLuggage(
                      Math.min(maxCabinBaggage * (adults + childPassengers), cabinLuggage + 1),
                    )
                  }
                  className="h-10 w-10"
                  disabled={cabinLuggage >= maxCabinBaggage * (adults + childPassengers)}
                >
                  +
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {cabinBaggagePrice}€ {t('flightDetails.perItem')} -{' '}
                {maxCabinBaggage * (adults + childPassengers)} {t('flightDetails.maxItems')}
              </p>
            </div>
            <div>
              <Label htmlFor="checkedLuggage">{t('flightDetails.checkedLuggage')}</Label>
              <div className="flex items-center mt-2">
                <Button
                  type="button"
                  variant="white"
                  size="sm"
                  onClick={() => setCheckedLuggage(Math.max(0, checkedLuggage - 1))}
                  className="h-10 w-10"
                >
                  -
                </Button>
                <div className="w-12 text-center">{checkedLuggage}</div>
                <Button
                  type="button"
                  variant="white"
                  size="sm"
                  onClick={() =>
                    setCheckedLuggage(
                      Math.min(maxBaggage * (adults + childPassengers), checkedLuggage + 1),
                    )
                  }
                  className="h-10 w-10"
                  disabled={checkedLuggage >= maxBaggage * (adults + childPassengers)}
                >
                  +
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {baggagePrice}€ {t('flightDetails.perItem')} -{' '}
                {maxBaggage * (adults + childPassengers)} {t('flightDetails.maxItems')}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="commercialFlight"
              checked={hasCommercialFlight}
              onCheckedChange={(checked) => setHasCommercialFlight(checked === true)}
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
                onCheckedChange={(checked) => setNeedsDriverService(checked === true)}
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
          <Button variant="red" onClick={goToNextStep} className="text-white">
            {t('buttons.nextStep')} <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
