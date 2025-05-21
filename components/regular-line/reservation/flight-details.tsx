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
  isReversed?: boolean
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
  isReversed,
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
  const [destinations, setDestinations] = useState<any[]>([])
  const [maxPassengers, setMaxPassengers] = useState(6)
  const [maxBaggage, setMaxBaggage] = useState(2)
  const [baggagePrice, setBaggagePrice] = useState(15)

  const getMinDate = () => {
    const minDate = new Date()
    minDate.setDate(minDate.getDate() + 1)
    return minDate.toISOString().split('T')[0]
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const routesResponse = await fetch('/api/regular-flights')
        const routesData = await routesResponse.json()
        setAvailableRoutes(routesData.docs || [])

        const destinationsResponse = await fetch('/api/destinations')
        const destinationsData = await destinationsResponse.json()
        setDestinations(destinationsData.docs || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const updateRouteData = async () => {
      if (!availableRoutes.length) return

      const directRoute = availableRoutes.find(
        (r) =>
          (typeof r.start_point === 'string' ? r.start_point : r.start_point.id) === departure &&
          (typeof r.end_point === 'string' ? r.end_point : r.end_point.id) === arrival,
      )

      if (directRoute) {
        setRouteData(directRoute)

        if (directRoute.tariffs) {
          setBaggagePrice(directRoute.tariffs.price_per_baggage || 15)
          setMaxPassengers(directRoute.tariffs.max_persons || 6)
          setMaxBaggage(directRoute.tariffs.max_baggages || 2)
        }

        if (directRoute.time_frames) {
          const firstDeparture = directRoute.time_frames.first_departure || '08:00'
          const lastDeparture = directRoute.time_frames.last_departure || '20:00'
          const frequency = directRoute.time_frames.frequency || 30

          console.log('Direct route time frames:', { firstDeparture, lastDeparture, frequency })
          generateTimeSlots(firstDeparture, lastDeparture, frequency)
        } else {
          generateTimeSlots('08:00', '20:00', 30)
        }
      } else {
        const reverseRoute = availableRoutes.find(
          (r) =>
            (typeof r.start_point === 'string' ? r.start_point : r.start_point.id) === arrival &&
            (typeof r.end_point === 'string' ? r.end_point : r.end_point.id) === departure,
        )

        if (reverseRoute) {
          setRouteData(reverseRoute)

          if (reverseRoute.tariffs) {
            setBaggagePrice(reverseRoute.tariffs.price_per_baggage || 15)
            setMaxPassengers(reverseRoute.tariffs.max_persons || 6)
            setMaxBaggage(reverseRoute.tariffs.max_baggages || 2)
          }

          if (reverseRoute.time_frames) {
            const firstDeparture = reverseRoute.time_frames.first_departure || '08:00'
            const lastDeparture = reverseRoute.time_frames.last_departure || '20:00'
            const frequency = reverseRoute.time_frames.frequency || 30

            console.log('Reverse route time frames:', { firstDeparture, lastDeparture, frequency })
            generateTimeSlots(firstDeparture, lastDeparture, frequency)
          } else {
            generateTimeSlots('08:00', '20:00', 30)
          }
        } else {
          generateTimeSlots('08:00', '20:00', 30)
        }
      }
    }

    updateRouteData()
  }, [availableRoutes, departure, arrival])

  useEffect(() => {
    const fromParam = searchParams.get('from')
    const toParam = searchParams.get('to')
    const passengersParam = searchParams.get('passengers')
    const adultsParam = searchParams.get('adults')
    const childrenParam = searchParams.get('children')
    const newbornsParam = searchParams.get('newborns')
    const isReturnParam = searchParams.get('isReturn')

    if (fromParam) {
      setDeparture(fromParam)
    }

    if (toParam) {
      setArrival(toParam)
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
  }, [
    searchParams,
    setDeparture,
    setArrival,
    setAdults,
    setChildPassengers,
    setBabies,
    maxPassengers,
  ])

  const generateTimeSlots = (firstDeparture: string, lastDeparture: string, frequency: number) => {
    const times: string[] = []

    const firstTime = parseTimeString(firstDeparture)
    const lastTime = parseTimeString(lastDeparture)

    if (!firstTime || !lastTime) {
      console.error('Invalid time format in time frames')
      return
    }

    const firstTimeMinutes = firstTime.hour * 60 + firstTime.minute
    const lastTimeMinutes = lastTime.hour * 60 + lastTime.minute

    if (firstTimeMinutes > lastTimeMinutes) {
      console.error('First departure time is after last departure time')
      return
    }

    let currentTimeInMinutes = firstTimeMinutes

    times.push(formatTime(firstTime.hour, firstTime.minute))

    currentTimeInMinutes += frequency
    while (currentTimeInMinutes < lastTimeMinutes) {
      const hour = Math.floor(currentTimeInMinutes / 60)
      const minute = currentTimeInMinutes % 60
      times.push(formatTime(hour, minute))
      currentTimeInMinutes += frequency
    }

    if (currentTimeInMinutes - frequency < lastTimeMinutes) {
      times.push(formatTime(lastTime.hour, lastTime.minute))
    }

    console.log('Generated time slots:', times)
    setAvailableTimes(times)
  }

  const parseTimeString = (timeString: string) => {
    const match = timeString.match(/^(\d{1,2}):(\d{2})$/)
    if (!match) return null

    const hour = parseInt(match[1], 10)
    const minute = parseInt(match[2], 10)

    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null

    return { hour, minute }
  }

  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
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
                {destinations.map((dest) => (
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
                {destinations
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
