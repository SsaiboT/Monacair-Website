import { useState, useEffect, useMemo } from 'react'
import type { Destination, RegularFlight } from '@/payload-types'
import {
  generateTimeSlots,
  generateReturnTimeSlots,
  getTodayDate,
  getMinDate,
} from '@/lib/time-utils'
import { generateBookingUrl, getNextDay, isRouteReversed } from '@/lib/booking-utils'
import { useFlightData } from './use-flight-data'

interface UseBookingFormProps {
  initialRouteData?: RegularFlight | null
  initialStartPoint?: Destination | null
  initialEndPoint?: Destination | null
  initialIsReversed?: boolean
  initialIsReturn?: boolean
  initialAdults?: number
  initialChildren?: number
  initialNewborns?: number
}

interface UseBookingFormReturn {
  departure: string
  setDeparture: (value: string) => void
  arrival: string
  setArrival: (value: string) => void
  date: string
  setDate: (value: string) => void
  time: string
  setTime: (value: string) => void
  returnDate: string
  setReturnDate: (value: string) => void
  returnTime: string
  setReturnTime: (value: string) => void
  isReturn: boolean
  setIsReturn: (value: boolean) => void
  isFlex: boolean
  setIsFlex: (value: boolean) => void
  adults: number
  setAdults: (value: number) => void
  children: number
  setChildren: (value: number) => void
  newborns: number
  setNewborns: (value: number) => void
  availableTimeSlots: string[]
  availableReturnTimeSlots: string[]
  destinations: Destination[]
  routes: RegularFlight[]
  availableDepartures: Destination[]
  availableDestinations: Destination[]
  currentRoute: RegularFlight | null
  maxPassengers: number
  loading: boolean
  error: string | null
  todayDate: string
  minDate: string
  getBookingUrl: () => string
  handleTravelersChange: (adults: number, children: number, newborns: number) => void
  getDestinationName: (id: string) => string
}

export const useBookingForm = ({
  initialRouteData,
  initialStartPoint,
  initialEndPoint,
  initialIsReversed,
  initialIsReturn,
  initialAdults = 1,
  initialChildren = 0,
  initialNewborns = 0,
}: UseBookingFormProps = {}): UseBookingFormReturn => {
  const [departure, setDeparture] = useState<string>(
    initialIsReversed ? initialEndPoint?.id || '' : initialStartPoint?.id || '',
  )
  const [arrival, setArrival] = useState<string>(
    initialIsReversed ? initialStartPoint?.id || '' : initialEndPoint?.id || '',
  )
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [returnDate, setReturnDate] = useState<string>('')
  const [returnTime, setReturnTime] = useState<string>('')
  const [isReturn, setIsReturn] = useState<boolean>(initialIsReturn || false)
  const [isFlex, setIsFlex] = useState<boolean>(false)
  const [adults, setAdults] = useState<number>(initialAdults)
  const [children, setChildren] = useState<number>(initialChildren)
  const [newborns, setNewborns] = useState<number>(initialNewborns)

  const {
    destinations,
    routes,
    availableDepartures,
    currentRoute,
    maxPassengers,
    loading,
    error,
    getAvailableDestinationsForDeparture,
    updateCurrentRoute,
  } = useFlightData({
    initialRouteData,
    initialStartPoint,
    initialEndPoint,
    initialIsReversed,
  })

  const availableDestinations = useMemo(() => {
    return getAvailableDestinationsForDeparture(departure)
  }, [departure, getAvailableDestinationsForDeparture])

  const routeIsReversed = useMemo(() => {
    return currentRoute ? isRouteReversed(currentRoute, departure, arrival) : false
  }, [currentRoute, departure, arrival])

  const availableTimeSlots = useMemo(() => {
    return generateTimeSlots(currentRoute?.time_frames || null, routeIsReversed)
  }, [currentRoute, routeIsReversed])

  const availableReturnTimeSlots = useMemo(() => {
    return generateReturnTimeSlots(currentRoute?.time_frames || null, routeIsReversed)
  }, [currentRoute, routeIsReversed])

  const todayDate = useMemo(() => getTodayDate(), [])
  const minDate = useMemo(() => getMinDate(), [])

  useEffect(() => {
    updateCurrentRoute(departure, arrival)
  }, [departure, arrival, updateCurrentRoute])

  useEffect(() => {
    if (availableTimeSlots.length > 0 && !time) {
      setTime(availableTimeSlots[0])
    }
  }, [availableTimeSlots, time])

  useEffect(() => {
    if (availableReturnTimeSlots.length > 0 && !returnTime) {
      setReturnTime(availableReturnTimeSlots[0])
    }
  }, [availableReturnTimeSlots, returnTime])

  useEffect(() => {
    if (date && !returnDate) {
      setReturnDate(getNextDay(date))
    }
  }, [date, returnDate])

  useEffect(() => {
    if (!departure && availableDepartures.length > 0) {
      if (initialIsReversed && initialEndPoint?.id) {
        setDeparture(initialEndPoint.id)
      } else if (!initialIsReversed && initialStartPoint?.id) {
        setDeparture(initialStartPoint.id)
      } else {
        const niceDestination =
          availableDepartures.find((dest) => dest.title.toLowerCase().includes('nice')) ||
          availableDepartures[0]
        setDeparture(niceDestination.id)
      }
    }
  }, [departure, availableDepartures, initialIsReversed, initialStartPoint, initialEndPoint])

  useEffect(() => {
    if (
      (!arrival || !availableDestinations.some((dest: Destination) => dest.id === arrival)) &&
      availableDestinations.length > 0
    ) {
      if (
        initialIsReversed &&
        initialStartPoint?.id &&
        availableDestinations.some((dest: Destination) => dest.id === initialStartPoint.id)
      ) {
        setArrival(initialStartPoint.id)
      } else if (
        !initialIsReversed &&
        initialEndPoint?.id &&
        availableDestinations.some((dest: Destination) => dest.id === initialEndPoint.id)
      ) {
        setArrival(initialEndPoint.id)
      } else {
        const monacoDestination =
          availableDestinations.find((dest: Destination) =>
            dest.title.toLowerCase().includes('monaco'),
          ) || availableDestinations[0]
        setArrival(monacoDestination.id)
      }
    }
  }, [arrival, availableDestinations, initialIsReversed, initialStartPoint, initialEndPoint])

  const handleTravelersChange = (newAdults: number, newChildren: number, newNewborns: number) => {
    setAdults(newAdults)
    setChildren(newChildren)
    setNewborns(newNewborns)
  }

  const getDestinationName = (id: string): string => {
    const destination = destinations.find((dest) => dest.id === id)
    return destination ? destination.title : id
  }

  const getBookingUrl = (): string => {
    return generateBookingUrl(destinations, {
      departure,
      arrival,
      adults,
      children,
      newborns,
      date,
      time,
      isReturn,
      returnDate,
      returnTime,
      isFlex,
    })
  }

  return {
    departure,
    setDeparture,
    arrival,
    setArrival,
    date,
    setDate,
    time,
    setTime,
    returnDate,
    setReturnDate,
    returnTime,
    setReturnTime,
    isReturn,
    setIsReturn,
    isFlex,
    setIsFlex,
    adults,
    setAdults,
    children,
    setChildren,
    newborns,
    setNewborns,
    availableTimeSlots,
    availableReturnTimeSlots,
    destinations,
    routes,
    availableDepartures,
    availableDestinations,
    currentRoute,
    maxPassengers,
    loading,
    error,
    todayDate,
    minDate,
    getBookingUrl,
    handleTravelersChange,
    getDestinationName,
  }
}
