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
  const searchParams = useSearchParams()

  const [isReturn, setIsReturn] = useState(false)
  const [returnDate, setReturnDate] = useState('')
  const [returnTime, setReturnTime] = useState('')
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [routeData, setRouteData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [availableRoutes, setAvailableRoutes] = useState<any[]>([])
  const [maxPassengers, setMaxPassengers] = useState(6)
  const [maxBaggage, setMaxBaggage] = useState(2)
  const [baggagePrice, setBaggagePrice] = useState(15)

  const getMinDate = () => {
    const minDate = new Date()
    minDate.setDate(minDate.getDate() + 1)
    return minDate.toISOString().split('T')[0]
  }

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/regular-flights')
        const data = await response.json()
        setAvailableRoutes(data.docs || [])
      } catch (error) {
        console.error('Error fetching routes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRoutes()
  }, [])

  useEffect(() => {
    const updateRouteData = async () => {
      if (!availableRoutes.length) return

      const route = availableRoutes.find(
        (r) =>
          (typeof r.start_point === 'string' ? r.start_point : r.start_point.id) === departure &&
          (typeof r.end_point === 'string' ? r.end_point : r.end_point.id) === arrival,
      )

      if (route) {
        setRouteData(route)

        if (route.tariffs) {
          setBaggagePrice(route.tariffs.price_per_baggage || 15)
          setMaxPassengers(route.tariffs.max_persons || 6)
          setMaxBaggage(route.tariffs.max_baggages || 2)
        }

        if (route.time_frames) {
          const firstDeparture = route.time_frames.first_departure || '08:00'
          const lastDeparture = route.time_frames.last_departure || '20:00'
          const frequency = route.time_frames.frequency || 30

          generateTimeSlots(firstDeparture, lastDeparture, frequency)
        } else {
          generateTimeSlots('08:00', '20:00', 30)
        }
      } else {
        generateTimeSlots('08:00', '20:00', 30)
      }
    }

    updateRouteData()
  }, [availableRoutes, departure, arrival])

  useEffect(() => {
    const fromParam = searchParams.get('from')
    const toParam = searchParams.get('to')
    const passengersParam = searchParams.get('passengers')

    if (fromParam) {
      setDeparture(fromParam)
    }

    if (toParam) {
      setArrival(toParam)
    }

    if (passengersParam) {
      const parsedPassengers = parseInt(passengersParam, 10)
      if (!isNaN(parsedPassengers)) {
        setAdults(Math.min(parsedPassengers, maxPassengers))
      }
    }
  }, [searchParams, setDeparture, setArrival, setAdults, maxPassengers])

  const generateTimeSlots = (firstDeparture: string, lastDeparture: string, frequency: number) => {
    const times: string[] = []
    const [firstHour, firstMinute] = firstDeparture.split(':').map(Number)
    const [lastHour, lastMinute] = lastDeparture.split(':').map(Number)

    const lastTimeInMinutes = lastHour * 60 + lastMinute
    let currentTimeInMinutes = firstHour * 60 + firstMinute

    while (currentTimeInMinutes <= lastTimeInMinutes) {
      const hour = Math.floor(currentTimeInMinutes / 60)
      const minute = currentTimeInMinutes % 60
      const formattedHour = hour.toString().padStart(2, '0')
      const formattedMinute = minute.toString().padStart(2, '0')
      times.push(`${formattedHour}:${formattedMinute}`)

      currentTimeInMinutes += frequency
    }

    setAvailableTimes(times)
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t('flightDetails.title')}</CardTitle>
        <CardDescription>{t('flightDetails.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="departure">{t('flightDetails.departure')}</Label>
            <Select value={departure} onValueChange={setDeparture}>
              <SelectTrigger id="departure" className="w-full">
                <SelectValue placeholder={t('flightDetails.selectDeparture')} />
              </SelectTrigger>
              <SelectContent>
                {availableRoutes
                  .filter((route, index, self) => {
                    const startPoint =
                      typeof route.start_point === 'string'
                        ? route.start_point
                        : route.start_point.id

                    return (
                      self.findIndex(
                        (r) =>
                          (typeof r.start_point === 'string' ? r.start_point : r.start_point.id) ===
                          startPoint,
                      ) === index
                    )
                  })
                  .map((route) => {
                    const startPoint =
                      typeof route.start_point === 'object'
                        ? route.start_point
                        : { id: route.start_point, title: route.start_point }

                    return (
                      <SelectItem key={startPoint.id} value={startPoint.id}>
                        {startPoint.title}
                      </SelectItem>
                    )
                  })}
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
                {availableRoutes
                  .filter(
                    (route) =>
                      (typeof route.start_point === 'string'
                        ? route.start_point
                        : route.start_point.id) === departure,
                  )
                  .map((route) => {
                    const endPoint =
                      typeof route.end_point === 'object'
                        ? route.end_point
                        : { id: route.end_point, title: route.end_point }

                    return (
                      <SelectItem key={endPoint.id} value={endPoint.id}>
                        {endPoint.title}
                      </SelectItem>
                    )
                  })}
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
              <Select value={returnTime} onValueChange={setReturnTime}>
                <SelectTrigger id="returnTime" className="w-full">
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
                {baggagePrice}€ {t('flightDetails.perItem')} - {t('flightDetails.maxItems')}{' '}
                {maxBaggage} {t('flightDetails.perPerson')}
              </p>
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
