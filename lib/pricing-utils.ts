import type { RegularFlight } from '@/payload-types'

export interface PricingData {
  baseAdultPrice: number
  childPrice: number
  babyPrice: number
  flexPrice: number
  baggagePrice: number
  cabinBaggagePrice: number
}

export interface TariffConfig {
  price_per_adult?: number
  price_per_child?: number
  price_per_flex?: number
  price_per_baggage?: number
  price_per_cabin_baggage?: number
}

const DEFAULT_PRICES = {
  nice_monaco: 195,
  nice_cannes: 220,
  default: 250,
}

const getDefaultPrice = (departure: string, arrival: string): number => {
  const route = `${departure}_${arrival}`.toLowerCase()
  const reverseRoute = `${arrival}_${departure}`.toLowerCase()

  if (route.includes('nice') && route.includes('monaco')) return DEFAULT_PRICES.nice_monaco
  if (route.includes('nice') && route.includes('cannes')) return DEFAULT_PRICES.nice_cannes
  if (reverseRoute.includes('nice') && reverseRoute.includes('monaco'))
    return DEFAULT_PRICES.nice_monaco
  if (reverseRoute.includes('nice') && reverseRoute.includes('cannes'))
    return DEFAULT_PRICES.nice_cannes

  return DEFAULT_PRICES.default
}

export const calculatePricing = (
  routeDetails: RegularFlight | null,
  departure: string,
  arrival: string,
  isPrivateFlight: boolean = false,
): PricingData => {
  const tariffs = routeDetails?.tariffs
  const multiplier = isPrivateFlight ? 1.5 : 1
  const baggageMultiplier = isPrivateFlight ? 1.2 : 1

  const baseAdultPrice = tariffs?.price_per_adult
    ? Math.round(tariffs.price_per_adult * multiplier)
    : Math.round(getDefaultPrice(departure, arrival) * multiplier)

  const childPrice = tariffs?.price_per_child
    ? Math.round(tariffs.price_per_child * multiplier)
    : Math.round(baseAdultPrice * 0.8)

  const flexPrice = tariffs?.price_per_flex
    ? Math.round(tariffs.price_per_flex * multiplier)
    : baseAdultPrice + 50

  const baggagePrice = tariffs?.price_per_baggage
    ? Math.round(tariffs.price_per_baggage * baggageMultiplier)
    : Math.round(15 * baggageMultiplier)

  const cabinBaggagePrice = tariffs?.price_per_cabin_baggage
    ? Math.round(tariffs.price_per_cabin_baggage * baggageMultiplier)
    : Math.round(10 * baggageMultiplier)

  return {
    baseAdultPrice,
    childPrice,
    babyPrice: 0,
    flexPrice,
    baggagePrice,
    cabinBaggagePrice,
  }
}

export const calculateTotal = (
  pricing: PricingData,
  passengers: { adults: number; children: number; newborns: number },
  baggage: { cabin: number; checked: number } = { cabin: 0, checked: 0 },
  hasFlex: boolean = false,
  isReturn: boolean = false,
): number => {
  const { adults, children } = passengers
  const { cabin, checked } = baggage

  let total = 0

  const pricePerAdult = hasFlex ? pricing.flexPrice : pricing.baseAdultPrice
  total += adults * pricePerAdult
  total += children * pricing.childPrice
  total += cabin * pricing.cabinBaggagePrice
  total += checked * pricing.baggagePrice

  if (isReturn) {
    total *= 2
  }

  return total
}

export const formatPrice = (price: number, currency: string = '€'): string => {
  return `${price.toLocaleString('fr-FR')} ${currency}`
}
