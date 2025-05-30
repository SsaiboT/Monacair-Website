import { useMemo } from 'react'
import type { RegularFlight } from '@/payload-types'
import { calculatePricing, calculateTotal, PricingData } from '@/lib/pricing-utils'

interface UsePricingProps {
  routeDetails: RegularFlight | null
  departure: string
  arrival: string
  flightType?: string
  isPrivateFlight?: boolean
}

interface PassengerCounts {
  adults: number
  children: number
  newborns: number
}

interface BaggageCounts {
  cabin: number
  checked: number
}

interface UsePricingReturn {
  pricing: PricingData
  calculateFlightTotal: (
    passengers: PassengerCounts,
    baggage?: BaggageCounts,
    hasFlex?: boolean,
    isReturn?: boolean,
  ) => number
  calculateMultipleFlightsTotal: (flights: FlightData[]) => number
  getAdultPrice: () => number
  getChildPrice: () => number
  getBabyPrice: () => number
  getFlexPrice: () => number
  getBaggagePrice: () => number
  getCabinBaggagePrice: () => number
}

interface FlightData {
  adults: number
  children: number
  newborns: number
  isReturn: boolean
  cabinLuggage?: number
  checkedLuggage?: number
}

export const usePricing = ({
  routeDetails,
  departure,
  arrival,
  flightType = 'ligne-reguliere',
  isPrivateFlight = false,
}: UsePricingProps): UsePricingReturn => {
  const pricing = useMemo(() => {
    const isPrivate = isPrivateFlight || flightType === 'vol-prive'
    return calculatePricing(routeDetails, departure, arrival, isPrivate)
  }, [routeDetails, departure, arrival, flightType, isPrivateFlight])

  const calculateFlightTotal = (
    passengers: PassengerCounts,
    baggage: BaggageCounts = { cabin: 0, checked: 0 },
    hasFlex: boolean = false,
    isReturn: boolean = false,
  ): number => {
    return calculateTotal(pricing, passengers, baggage, hasFlex, isReturn)
  }

  const calculateMultipleFlightsTotal = (flights: FlightData[]): number => {
    return flights.reduce((total, flight) => {
      const passengers = {
        adults: flight.adults,
        children: flight.children,
        newborns: flight.newborns,
      }
      const baggage = {
        cabin: flight.cabinLuggage || 0,
        checked: flight.checkedLuggage || 0,
      }

      return total + calculateFlightTotal(passengers, baggage, false, flight.isReturn)
    }, 0)
  }

  const getAdultPrice = (): number => pricing.baseAdultPrice

  const getChildPrice = (): number => pricing.childPrice

  const getBabyPrice = (): number => pricing.babyPrice

  const getFlexPrice = (): number => pricing.flexPrice

  const getBaggagePrice = (): number => pricing.baggagePrice

  const getCabinBaggagePrice = (): number => pricing.cabinBaggagePrice

  return {
    pricing,
    calculateFlightTotal,
    calculateMultipleFlightsTotal,
    getAdultPrice,
    getChildPrice,
    getBabyPrice,
    getFlexPrice,
    getBaggagePrice,
    getCabinBaggagePrice,
  }
}
