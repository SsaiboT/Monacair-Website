import { useState, useEffect, useMemo } from 'react'
import type { RegularFlight, Destination } from '@/payload-types'
import {
  getDestinations,
  getRegularFlights,
  getFlightTimeslots,
} from '@/app/(frontend)/[locale]/booking/actions'
import { generateTimeSlots, generateReturnTimeSlots } from '@/lib/time-utils'
import { findMatchingRoute, isRouteReversed } from '@/lib/booking-utils'
import { usePricing } from './use-pricing'

interface FlightData {
  id: string
  departure: string
  destination: string
  adults: number
  children: number
  newborns: number
  isReturn: boolean
  date?: string
  time?: string
  returnDate?: string
  returnTime?: string
  cabinLuggage?: number
  checkedLuggage?: number
}

interface UseReservationFormProps {
  initialFlightType?: string
  initialDepartureId: string
  initialArrivalId: string
  initialAdults?: number
  initialChildren?: number
  initialNewborns?: number
  initialFlex?: boolean
  initialDate?: string
  isRouteInitiallyReversed?: boolean
  initialTime?: string
  initialReturnDate?: string
  initialReturnTime?: string
  initialIsReturn?: boolean
  initialMultipleFlights?: FlightData[]
  initialRouteDetails: RegularFlight | null
  initialDepartureDetails: Destination | null
  initialArrivalDetails: Destination | null
  dataFetchingError?: string | null
}

export const useReservationForm = ({
  initialFlightType = 'ligne-reguliere',
  initialDepartureId,
  initialArrivalId,
  initialAdults = 1,
  initialChildren = 0,
  initialNewborns = 0,
  initialFlex = false,
  initialDate = '',
  isRouteInitiallyReversed = false,
  initialTime = '',
  initialReturnDate = '',
  initialReturnTime = '',
  initialIsReturn = false,
  initialMultipleFlights,
  initialRouteDetails,
  initialDepartureDetails,
  initialArrivalDetails,
  dataFetchingError,
}: UseReservationFormProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [flightType, setFlightType] = useState(initialFlightType)
  const [multipleFlights, setMultipleFlights] = useState<FlightData[]>(initialMultipleFlights || [])

  const [departure, setDeparture] = useState(initialDepartureId)
  const [arrival, setArrival] = useState(initialArrivalId)
  const [date, setDate] = useState(initialDate)
  const [time, setTime] = useState(initialTime)
  const [adults, setAdults] = useState(initialAdults)
  const [childPassengers, setChildPassengers] = useState(initialChildren)
  const [babies, setBabies] = useState(initialNewborns)
  const [cabinLuggage, setCabinLuggage] = useState(0)
  const [checkedLuggage, setCheckedLuggage] = useState(0)
  const [flex, setFlex] = useState(initialFlex)

  const [isReturn, setIsReturn] = useState(initialIsReturn)
  const [returnDate, setReturnDate] = useState(initialReturnDate)
  const [returnTime, setReturnTime] = useState(initialReturnTime)

  const [hasCommercialFlight, setHasCommercialFlight] = useState(false)
  const [airline, setAirline] = useState('')
  const [flightOriginDestination, setFlightOriginDestination] = useState('')
  const [flightTime, setFlightTime] = useState('')

  const [needsDriverService, setNeedsDriverService] = useState(false)
  const [pickupLocation, setPickupLocation] = useState('')

  const [isCompany, setIsCompany] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  const [allDestinations, setAllDestinations] = useState<Destination[]>([])
  const [routes, setRoutes] = useState<RegularFlight[]>([])
  const [availableDestinations, setAvailableDestinations] = useState<Destination[]>([])
  const [availableArrivalDestinations, setAvailableArrivalDestinations] = useState<Destination[]>(
    [],
  )
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [availableReturnTimes, setAvailableReturnTimes] = useState<string[]>([])

  const currentRoute = useMemo(() => {
    return findMatchingRoute(routes, departure, arrival)
  }, [routes, departure, arrival])

  const isMultipleFlight = multipleFlights.length > 1

  const departureTitle = isRouteInitiallyReversed
    ? initialArrivalDetails?.title || arrival
    : initialDepartureDetails?.title || departure
  const arrivalTitle = isRouteInitiallyReversed
    ? initialDepartureDetails?.title || departure
    : initialArrivalDetails?.title || arrival

  const pricing = usePricing({
    routeDetails: initialRouteDetails,
    departure,
    arrival,
    flightType,
  })

  const allDestinationsIds = useMemo(
    () => allDestinations.map((destination) => destination.id).join(','),
    [allDestinations],
  )
  const routesIds = useMemo(() => routes.map((route) => route.id).join(','), [routes])

  useEffect(() => {
    const loadData = async () => {
      if (dataFetchingError) {
        console.error('Data fetching error:', dataFetchingError)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const [destinations, flights] = await Promise.all([getDestinations(), getRegularFlights()])

        setAllDestinations(destinations || [])
        setRoutes(flights || [])

        if (!initialRouteDetails && destinations && flights) {
          const matchedRoute = flights.find(
            (route: RegularFlight) =>
              (typeof route.start_point === 'string'
                ? route.start_point
                : route.start_point?.id) === departure &&
              (typeof route.end_point === 'string' ? route.end_point : route.end_point?.id) ===
                arrival,
          )

          if (matchedRoute) {
            const timeslots = await getFlightTimeslots(matchedRoute)
            setAvailableTimes(timeslots || [])
            setAvailableReturnTimes(timeslots || [])
          }
        } else if (initialRouteDetails) {
          const timeslots = await getFlightTimeslots(initialRouteDetails)
          setAvailableTimes(timeslots || [])
          setAvailableReturnTimes(timeslots || [])
        }

        if (destinations) {
          setAvailableDestinations(destinations)
          setAvailableArrivalDestinations(destinations)
        }
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [departure, arrival, allDestinationsIds, routesIds])

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const updateMultipleFlight = (flightId: string, updates: Partial<FlightData>) => {
    setMultipleFlights((prev) =>
      prev.map((flight) => (flight.id === flightId ? { ...flight, ...updates } : flight)),
    )
  }

  const getDestinationTitle = (idOrSlug: string) => {
    const destination = allDestinations.find(
      (dest) => dest.id === idOrSlug || dest.slug === idOrSlug,
    )
    return destination?.title || idOrSlug
  }

  return {
    // Step management
    currentStep,
    setCurrentStep,
    goToNextStep,
    goToPreviousStep,

    // Flight details
    flightType,
    setFlightType,
    multipleFlights,
    setMultipleFlights,
    isMultipleFlight,
    updateMultipleFlight,

    // Basic flight info
    departure,
    setDeparture,
    arrival,
    setArrival,
    date,
    setDate,
    time,
    setTime,
    isReturn,
    setIsReturn,
    returnDate,
    setReturnDate,
    returnTime,
    setReturnTime,

    // Passengers
    adults,
    setAdults,
    childPassengers,
    setChildPassengers,
    babies,
    setBabies,

    // Baggage
    cabinLuggage,
    setCabinLuggage,
    checkedLuggage,
    setCheckedLuggage,
    flex,
    setFlex,

    // Additional services
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

    // Contact info
    isCompany,
    setIsCompany,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    companyName,
    setCompanyName,
    email,
    setEmail,
    phone,
    setPhone,
    acceptTerms,
    setAcceptTerms,

    // Loading states
    isSubmitting,
    setIsSubmitting,
    loading,

    // Data
    allDestinations,
    routes,
    availableDestinations,
    availableArrivalDestinations,
    availableTimes,
    availableReturnTimes,
    currentRoute,

    // Display helpers
    departureTitle,
    arrivalTitle,
    getDestinationTitle,

    // Pricing
    pricing,
  }
}
