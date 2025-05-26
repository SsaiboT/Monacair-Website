'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { Destination, RegularFlight } from '@/payload-types'
import FlightType from '@/components/regular-line/reservation/flight-type'
import FlightDetails from '@/components/regular-line/reservation/flight-details'
import {
  getDestinations,
  getRegularFlights,
  getRouteDetails,
  getFlightTimeslots,
} from '@/app/(frontend)/[locale]/booking/actions'

type FlightTypeOption = 'ligne-reguliere' | 'vol-panoramique' | 'jet-prive'

interface BookingFormProps {
  initialFlightType?: FlightTypeOption
  initialDepartureId?: string
  initialArrivalId?: string
  initialAdults?: number
  initialChildren?: number
  initialBabies?: number
  initialDate?: string
  initialTime?: string
  initialIsReturn?: boolean
  isRouteInitiallyReversed?: boolean
  initialRouteDetails?: RegularFlight
  initialDepartureDetails?: Destination
  initialArrivalDetails?: Destination
  isPanoramicView?: boolean
  dataFetchingError?: string | null
}

const BookingForm: React.FC<BookingFormProps> = ({
  initialFlightType = 'ligne-reguliere',
  initialDepartureId,
  initialArrivalId,
  initialAdults = 1,
  initialChildren = 0,
  initialBabies = 0,
  initialDate,
  initialTime,
  initialIsReturn = false,
  isRouteInitiallyReversed = false,
  initialRouteDetails,
  initialDepartureDetails,
  initialArrivalDetails,
  isPanoramicView = false,
  dataFetchingError = null,
}) => {
  const t = useTranslations('RegularLine.Reservation')
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(1)
  const [flightType, setFlightType] = useState<FlightTypeOption>(initialFlightType)
  const [departure, setDeparture] = useState(initialDepartureId || '')
  const [arrival, setArrival] = useState(initialArrivalId || '')
  const [date, setDate] = useState(initialDate || '')
  const [time, setTime] = useState(initialTime || '')
  const [adults, setAdults] = useState(initialAdults)
  const [childPassengers, setChildPassengers] = useState(initialChildren)
  const [babies, setBabies] = useState(initialBabies)
  const [cabinLuggage, setCabinLuggage] = useState(0)
  const [checkedLuggage, setCheckedLuggage] = useState(0)
  const [hasCommercialFlight, setHasCommercialFlight] = useState(false)
  const [airline, setAirline] = useState('')
  const [flightOriginDestination, setFlightOriginDestination] = useState('')
  const [flightTime, setFlightTime] = useState('')
  const [needsDriverService, setNeedsDriverService] = useState(false)
  const [pickupLocation, setPickupLocation] = useState('')
  const [selectedFlexFare, setSelectedFlexFare] = useState(false)
  const [flex, setFlex] = useState(false)
  const [isReturn, setIsReturn] = useState(initialIsReturn)
  const [returnDate, setReturnDate] = useState('')
  const [returnTime, setReturnTime] = useState('')

  const [availableDestinations, setAvailableDestinations] = useState<any[]>([])
  const [availableRoutes, setAvailableRoutes] = useState<any[]>([])
  const [routeData, setRouteData] = useState<any>(initialRouteDetails || null)
  const [departureDetails, setDepartureDetails] = useState<any>(initialDepartureDetails || null)
  const [arrivalDetails, setArrivalDetails] = useState<any>(initialArrivalDetails || null)
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(dataFetchingError)

  const handleFlightTypeChange = (type: string) => {
    setFlightType(type as FlightTypeOption)
    goToNextStep()
  }

  useEffect(() => {
    const loadInitialData = async () => {
      if (loading && (!availableDestinations.length || !availableRoutes.length)) {
        try {
          setLoading(true)

          const [destinations, routes] = await Promise.all([getDestinations(), getRegularFlights()])

          setAvailableDestinations(destinations || [])
          setAvailableRoutes(routes || [])

          if (initialDepartureId && initialArrivalId && !routeData) {
            const routeDetails = await getRouteDetails(
              isRouteInitiallyReversed ? initialArrivalId : initialDepartureId,
              isRouteInitiallyReversed ? initialDepartureId : initialArrivalId,
            )

            if (routeDetails) {
              setRouteData(routeDetails)

              const times = await getFlightTimeslots(routeDetails as RegularFlight)
              setAvailableTimes(times || [])

              if (times && times.length > 0 && !time) {
                setTime(times[0])
              }
            }
          }
        } catch (err) {
          console.error('Error loading initial data:', err)
          setError('Failed to load initial data')
        } finally {
          setLoading(false)
        }
      }
    }

    loadInitialData()
  }, [
    initialDepartureId,
    initialArrivalId,
    isRouteInitiallyReversed,
    loading,
    time,
    routeData,
    availableDestinations.length,
    availableRoutes.length,
  ])

  useEffect(() => {
    const updateRouteData = async () => {
      if (!departure || !arrival || departure === arrival) return

      try {
        const routeDetails = await getRouteDetails(departure, arrival)

        if (routeDetails) {
          setRouteData(routeDetails)

          const times = await getFlightTimeslots(routeDetails as RegularFlight)
          setAvailableTimes(times || [])

          if (times && times.length > 0 && !time) {
            setTime(times[0])
          }
        } else {
          setRouteData(null)
          setAvailableTimes([])
        }
      } catch (err) {
        console.error('Error updating route data:', err)
      }
    }

    updateRouteData()
  }, [departure, arrival, time])

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 2))
  }

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  if (isPanoramicView) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{t('panoramic.title')}</h2>
          <p className="mt-2 text-lg text-gray-600">{t('panoramic.subtitle')}</p>
        </div>

        {currentStep === 1 && (
          <FlightDetails
            departure={departure}
            setDeparture={setDeparture}
            arrival={arrival}
            setArrival={setArrival}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            adults={adults}
            setAdults={setAdults}
            childPassengers={childPassengers}
            setChildPassengers={setChildPassengers}
            babies={babies}
            setBabies={setBabies}
            cabinLuggage={cabinLuggage}
            setCabinLuggage={setCabinLuggage}
            checkedLuggage={checkedLuggage}
            setCheckedLuggage={setCheckedLuggage}
            flex={flex}
            setFlex={setFlex}
            isReturn={isReturn}
            setIsReturn={setIsReturn}
            returnDate={returnDate}
            setReturnDate={setReturnDate}
            returnTime={returnTime}
            setReturnTime={setReturnTime}
            hasCommercialFlight={hasCommercialFlight}
            setHasCommercialFlight={setHasCommercialFlight}
            airline={airline}
            setAirline={setAirline}
            flightOriginDestination={flightOriginDestination}
            setFlightOriginDestination={setFlightOriginDestination}
            flightTime={flightTime}
            setFlightTime={setFlightTime}
            needsDriverService={needsDriverService}
            setNeedsDriverService={setNeedsDriverService}
            pickupLocation={pickupLocation}
            setPickupLocation={setPickupLocation}
            goToNextStep={goToNextStep}
            isPanoramic={true}
            availableDestinations={availableDestinations}
            availableTimes={availableTimes}
            routeData={routeData}
          />
        )}
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{t('title')}</h2>
        <p className="mt-2 text-lg text-gray-600">{t('subtitle')}</p>
      </div>

      {currentStep === 1 && (
        <FlightType flightType={flightType} setFlightType={handleFlightTypeChange} />
      )}

      {currentStep === 2 && (
        <FlightDetails
          departure={departure}
          setDeparture={setDeparture}
          arrival={arrival}
          setArrival={setArrival}
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          adults={adults}
          setAdults={setAdults}
          childPassengers={childPassengers}
          setChildPassengers={setChildPassengers}
          babies={babies}
          setBabies={setBabies}
          cabinLuggage={cabinLuggage}
          setCabinLuggage={setCabinLuggage}
          checkedLuggage={checkedLuggage}
          setCheckedLuggage={setCheckedLuggage}
          flex={flex}
          setFlex={setFlex}
          isReturn={isReturn}
          setIsReturn={setIsReturn}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          returnTime={returnTime}
          setReturnTime={setReturnTime}
          hasCommercialFlight={hasCommercialFlight}
          setHasCommercialFlight={setHasCommercialFlight}
          airline={airline}
          setAirline={setAirline}
          flightOriginDestination={flightOriginDestination}
          setFlightOriginDestination={setFlightOriginDestination}
          flightTime={flightTime}
          setFlightTime={setFlightTime}
          needsDriverService={needsDriverService}
          setNeedsDriverService={setNeedsDriverService}
          pickupLocation={pickupLocation}
          setPickupLocation={setPickupLocation}
          goToNextStep={goToNextStep}
          availableDestinations={availableDestinations}
          availableTimes={availableTimes}
          routeData={routeData}
        />
      )}
    </div>
  )
}

export default BookingForm
