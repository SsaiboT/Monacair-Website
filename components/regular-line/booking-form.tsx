'use client'

import React, { useState, useEffect } from 'react'
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
}

export default function BookingForm({
  initialRouteData,
  initialStartPoint,
  initialEndPoint,
  initialIsReversed,
  initialIsReturn,
}: BookingFormProps) {
  const t = useTranslations('RegularLine.booking-form')

  const [departure, setDeparture] = useState<string>(initialStartPoint?.id || 'nice')
  const [arrival, setArrival] = useState<string>(initialEndPoint?.id || 'monaco')
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('0800')
  const [isReturn, setIsReturn] = useState<boolean>(initialIsReturn || false)
  const [isFlex, setIsFlex] = useState<boolean>(false)
  const [adults, setAdults] = useState<number>(1)
  const [children, setChildren] = useState<number>(0)
  const [newborns, setNewborns] = useState<number>(0)

  const [loading, setLoading] = useState<boolean>(false)
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [routes, setRoutes] = useState<RegularFlight[]>([])
  const [currentRoute, setCurrentRoute] = useState<RegularFlight | null>(initialRouteData || null)
  const [maxPassengers, setMaxPassengers] = useState<number>(6)

  const today = new Date().toISOString().split('T')[0]

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
    const baseUrl = '/regular-line/reservation'
    const params = new URLSearchParams()

    params.append('from', departure)
    params.append('to', arrival)
    params.append('date', date)
    params.append('time', time)
    params.append('adults', adults.toString())

    if (children > 0) {
      params.append('children', children.toString())
    }

    if (newborns > 0) {
      params.append('newborns', newborns.toString())
    }

    if (isReturn) {
      params.append('isReturn', 'true')
    }

    if (isFlex) {
      params.append('flex', 'true')
    }

    return `${baseUrl}?${params.toString()}`
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
                        {[
                          '0800',
                          '0830',
                          '0900',
                          '0930',
                          '1000',
                          '1030',
                          '1100',
                          '1130',
                          '1200',
                          '1230',
                          '1300',
                          '1330',
                          '1400',
                          '1430',
                          '1500',
                          '1530',
                          '1600',
                          '1630',
                          '1700',
                          '1730',
                          '1800',
                          '1830',
                          '1900',
                          '1930',
                          '2000',
                        ].map((time) => (
                          <SelectItem key={time} value={time}>
                            {time.slice(0, 2)}:{time.slice(2, 4)}
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
