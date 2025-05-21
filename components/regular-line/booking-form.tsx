'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { RegularFlight, Destination } from '@/payload-types'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { TravelersDropdown } from './travelers-dropdown'

interface BookingFormProps {
  initialRouteData?: RegularFlight | null
  initialStartPoint?: Destination | null
  initialEndPoint?: Destination | null
  initialIsReversed?: boolean
  initialIsReturn?: boolean
  initialAdults?: number
  initialChildren?: number
  initialNewborns?: number
}

export default function BookingForm({
  initialRouteData,
  initialStartPoint,
  initialEndPoint,
  initialIsReversed,
  initialIsReturn,
  initialAdults = 1,
  initialChildren = 0,
  initialNewborns = 0,
}: BookingFormProps) {
  const t = useTranslations('RegularLine.booking-form')

  const [departure, setDeparture] = useState<string>(initialStartPoint?.id || 'nice')
  const [arrival, setArrival] = useState<string>(initialEndPoint?.id || 'monaco')
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [isReturn, setIsReturn] = useState<boolean>(initialIsReturn || false)
  const [isFlex, setIsFlex] = useState<boolean>(false)
  const [adults, setAdults] = useState<number>(initialAdults)
  const [children, setChildren] = useState<number>(initialChildren)
  const [newborns, setNewborns] = useState<number>(initialNewborns)

  const [loading, setLoading] = useState<boolean>(false)
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [routes, setRoutes] = useState<RegularFlight[]>([])
  const [currentRoute, setCurrentRoute] = useState<RegularFlight | null>(initialRouteData || null)
  const [maxPassengers, setMaxPassengers] = useState<number>(6)

  const today = new Date().toISOString().split('T')[0]

  const generateTimeSlots = useMemo(() => {
    if (!currentRoute || !currentRoute.time_frames) {
      return [
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
      ]
    }

    const { first_departure, last_departure, frequency } = currentRoute.time_frames

    if (!first_departure || !last_departure || !frequency) {
      return [
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
      ]
    }

    const parseTimeToMinutes = (time: string): number => {
      const [hours, minutes] = time.split(':').map(Number)
      return hours * 60 + minutes
    }

    const formatMinutesToTime = (minutes: number): string => {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
    }

    const startMinutes = parseTimeToMinutes(first_departure)
    const endMinutes = parseTimeToMinutes(last_departure)
    const frequencyMinutes = frequency

    const timeSlots: string[] = []
    let currentMinutes = startMinutes

    while (currentMinutes <= endMinutes) {
      timeSlots.push(formatMinutesToTime(currentMinutes))
      currentMinutes += frequencyMinutes
    }

    return timeSlots
  }, [currentRoute])

  useEffect(() => {
    if (generateTimeSlots.length > 0 && !time) {
      setTime(generateTimeSlots[0])
    }
  }, [generateTimeSlots, time])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const destinationsResponse = await fetch('/api/destinations')
        const destinationsData = await destinationsResponse.json()
        if (destinationsData.docs) {
          setDestinations(destinationsData.docs)
        }

        const routesResponse = await fetch('/api/regular-flights')
        const routesData = await routesResponse.json()
        if (routesData.docs) {
          setRoutes(routesData.docs)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!routes.length) return

    const matchedRoute = routes.find(
      (route) =>
        (typeof route.start_point === 'string' ? route.start_point : route.start_point.id) ===
          departure &&
        (typeof route.end_point === 'string' ? route.end_point : route.end_point.id) === arrival,
    )

    if (matchedRoute) {
      setCurrentRoute(matchedRoute)

      if (matchedRoute.tariffs && matchedRoute.tariffs.max_persons) {
        setMaxPassengers(matchedRoute.tariffs.max_persons)
      }
    } else {
      const reverseRoute = routes.find(
        (route) =>
          (typeof route.start_point === 'string' ? route.start_point : route.start_point.id) ===
            arrival &&
          (typeof route.end_point === 'string' ? route.end_point : route.end_point.id) ===
            departure,
      )

      if (reverseRoute) {
        setCurrentRoute(reverseRoute)

        if (reverseRoute.tariffs && reverseRoute.tariffs.max_persons) {
          setMaxPassengers(reverseRoute.tariffs.max_persons)
        }
      } else {
        setCurrentRoute(null)
      }
    }
  }, [departure, arrival, routes])

  const handleTravelersChange = (newAdults: number, newChildren: number, newNewborns: number) => {
    setAdults(newAdults)
    setChildren(newChildren)
    setNewborns(newNewborns)
  }

  const getDestinationName = (id: string): string => {
    const destination = destinations.find((dest) => dest.id === id)
    return destination ? destination.title : id
  }

  const getBookingUrl = () => {
    const startPoint = destinations.find((dest) => dest.id === departure)
    const endPoint = destinations.find((dest) => dest.id === arrival)

    if (!startPoint?.slug || !endPoint?.slug) {
      return '/booking/regular/nice/monaco'
    }

    const baseUrl = `/booking/regular/${startPoint.slug}/${endPoint.slug}`
    const params = new URLSearchParams()

    if (adults > 0) {
      params.set('passengers', adults.toString())
    }

    if (time) {
      params.set('time', time)
    }

    if (date) {
      params.set('date', date)
    }

    if (!isReturn) {
      params.set('oneway', 'true')
    }

    if (isFlex) {
      params.set('flex', 'true')
    }

    return `${baseUrl}${params.toString() ? `?${params.toString()}` : ''}`
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 relative">
      <div className="absolute inset-0 bg-royalblue transform -skew-y-3 origin-top-right z-0"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-4 sm:pt-6 md:pt-12">
        <div className="max-w-4xl mx-auto text-white">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 font-brother">
              {t('title')}
            </h2>
            <p className="text-sm sm:text-lg max-w-2xl mx-auto font-brother">{t('subtitle')}</p>
          </div>

          <div className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 sm:p-6 md:p-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 font-brother text-royalblue">
                {t('form.title')}
              </h3>
              <div className="grid gap-3 sm:gap-4 md:gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  <div className="w-full">
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 font-brother text-royalblue">
                      {t('form.departure.label')}
                    </label>
                    <Select defaultValue={departure} onValueChange={(value) => setDeparture(value)}>
                      <SelectTrigger className="border-royalblue w-full h-10">
                        <SelectValue placeholder={t('form.departure.placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {destinations.length > 0 ? (
                          destinations.map((dest) => (
                            <SelectItem key={dest.id} value={dest.id}>
                              {dest.title}
                            </SelectItem>
                          ))
                        ) : (
                          <>
                            <SelectItem value="nice">{t('form.departure.options.nice')}</SelectItem>
                            <SelectItem value="monaco">
                              {t('form.departure.options.monaco')}
                            </SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full">
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 font-brother text-royalblue">
                      {t('form.arrival.label')}
                    </label>
                    <Select defaultValue={arrival} onValueChange={(value) => setArrival(value)}>
                      <SelectTrigger className="border-royalblue w-full h-10">
                        <SelectValue placeholder={t('form.arrival.placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {destinations.length > 0 ? (
                          destinations
                            .filter((dest) => dest.id !== departure)
                            .map((dest) => (
                              <SelectItem key={dest.id} value={dest.id}>
                                {dest.title}
                              </SelectItem>
                            ))
                        ) : (
                          <>
                            <SelectItem value="monaco">
                              {t('form.arrival.options.monaco')}
                            </SelectItem>
                            <SelectItem value="nice">{t('form.arrival.options.nice')}</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  <div className="w-full">
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 font-brother text-royalblue">
                      {t('form.date.label')}
                    </label>
                    <Input
                      type="date"
                      className="border-royalblue w-full h-10"
                      min={today}
                      onChange={(e) => setDate(e.target.value)}
                      value={date}
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 font-brother text-royalblue">
                      {t('form.time.label')}
                    </label>
                    <Select defaultValue={time} onValueChange={(value) => setTime(value)}>
                      <SelectTrigger className="border-royalblue w-full h-10">
                        <SelectValue placeholder={t('form.time.placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {generateTimeSlots.map((timeSlot) => (
                          <SelectItem key={timeSlot} value={timeSlot}>
                            {timeSlot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full sm:col-span-2 md:col-span-1">
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 font-brother text-royalblue">
                      {t('form.passengers.label')}
                    </label>
                    <TravelersDropdown
                      maxAdults={maxPassengers}
                      maxTotal={maxPassengers}
                      onChange={handleTravelersChange}
                      initialAdults={adults}
                      initialChildren={children}
                      initialNewborns={newborns}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-2">
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-md">
                    <div className="space-y-0.5">
                      <h4 className="font-medium text-sm font-brother text-royalblue">
                        {isReturn ? t('form.flight-type.return') : t('form.flight-type.one-way')}
                      </h4>
                    </div>
                    <Switch checked={isReturn} onCheckedChange={setIsReturn} />
                  </div>

                  <div className="flex items-center space-x-2 px-4 py-3 bg-gray-50 rounded-md">
                    <Checkbox
                      id="flex"
                      checked={isFlex}
                      onCheckedChange={(checked) => setIsFlex(!!checked)}
                    />
                    <div>
                      <label
                        htmlFor="flex"
                        className="font-medium text-sm font-brother text-royalblue cursor-pointer"
                      >
                        {t('form.flex.label')}
                      </label>
                      <p className="text-xs text-gray-600">{t('form.flex.description')}</p>
                    </div>
                  </div>
                </div>

                <Link href={getBookingUrl()} className="inline-block w-full">
                  <Button
                    size="lg"
                    className="bg-redmonacair hover:bg-redmonacair/90 text-white font-brother w-full mt-2 sm:mt-4 h-12"
                  >
                    {t('form.bookNow')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
