'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronDown, ArrowUpDown } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

const BookingForm = () => {
  const t = useTranslations('Booking')
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const [flightType, setFlightType] = useState('private-flight')
  const [departure, setDeparture] = useState('')
  const [destination, setDestination] = useState('')
  const [passengers, setPassengers] = useState('1')

  const handleFlightTypeChange = (value: string) => {
    setFlightType(value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const basePath = `/${locale}`

    const queryParams = new URLSearchParams({
      from: departure,
      to: destination,
      passengers: passengers,
    })

    switch (flightType) {
      case 'private-flight':
        router.push(
          `${basePath}/regular-line/reservation?${queryParams.toString()}&flightType=private-flight`,
        )
        break
      case 'regular-line':
        router.push(`${basePath}/regular-line?${queryParams.toString()}`)
        break
      case 'panoramic-flight':
        router.push(`${basePath}/panoramic?${queryParams.toString()}`)
        break
      case 'private-jet':
        router.push(`${basePath}/private-jet?${queryParams.toString()}`)
        break
      default:
        router.push(`${basePath}/regular-line?${queryParams.toString()}`)
    }

    console.log('Form submitted with:', {
      flightType,
      departure,
      destination,
      passengers,
    })
  }

  const switchLocations = () => {
    const temp = departure
    setDeparture(destination)
    setDestination(temp)
  }

  return (
    <div className="py-6 relative -mt-16 z-20">
      <div className="container mx-auto px-2 sm:px-12">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden border-4 border-royalblue">
            <div className="relative flex-1 bg-white">
              <div className="absolute top-3 left-4 text-xs text-gray-500">Du</div>
              <div className="flex items-center h-full">
                <select
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="w-full h-full pt-6 pb-2 px-4 text-2xl text-gray-500 focus:outline-none appearance-none"
                >
                  <option value="" disabled>
                    Départ
                  </option>
                  <option value="nice">{t('booking-form.nice-airport')}</option>
                  <option value="monaco">{t('booking-form.monaco-heliport')}</option>
                </select>
                <button type="button" className="px-4">
                  <ChevronDown className="h-6 w-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center bg-royalblue px-2">
              <button type="button" onClick={switchLocations} className="bg-white rounded-full p-2">
                <ArrowUpDown className="h-5 w-5 text-royalblue" />
              </button>
            </div>

            <div className="relative flex-1 bg-white">
              <div className="absolute top-3 left-4 text-xs text-gray-500">À</div>
              <div className="flex items-center h-full">
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full h-full pt-6 pb-2 px-4 text-2xl text-gray-500 focus:outline-none appearance-none"
                >
                  <option value="" disabled>
                    Destination
                  </option>
                  <option value="monaco">{t('booking-form.monaco-heliport')}</option>
                  <option value="nice">{t('booking-form.nice-airport')}</option>
                </select>
                <button type="button" className="px-4">
                  <ChevronDown className="h-6 w-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="relative bg-white border-l-2 border-gray-200">
              <div className="absolute top-3 left-4 text-xs text-gray-500">
                {t('booking-form.passengers')}
              </div>
              <div className="flex items-center h-full">
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full h-full pt-6 pb-2 px-4 text-2xl text-gray-500 focus:outline-none appearance-none"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
                <button type="button" className="px-4">
                  <ChevronDown className="h-6 w-6 text-gray-500" />
                </button>
              </div>
            </div>

            <button type="submit" className="bg-red-600 p-6 flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input
                  type="radio"
                  name="flightType"
                  className="sr-only"
                  checked={flightType === 'private-flight'}
                  onChange={() => handleFlightTypeChange('private-flight')}
                />
                <div className="w-5 h-5 rounded-full border-2 border-red-600"></div>
                {flightType === 'private-flight' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
                  </div>
                )}
              </div>
              <span>Vol privé</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input
                  type="radio"
                  name="flightType"
                  className="sr-only"
                  checked={flightType === 'regular-line'}
                  onChange={() => handleFlightTypeChange('regular-line')}
                />
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                {flightType === 'regular-line' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
                  </div>
                )}
              </div>
              <span>Ligne régulière</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input
                  type="radio"
                  name="flightType"
                  className="sr-only"
                  checked={flightType === 'panoramic-flight'}
                  onChange={() => handleFlightTypeChange('panoramic-flight')}
                />
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                {flightType === 'panoramic-flight' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
                  </div>
                )}
              </div>
              <span>Vol panoramique</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input
                  type="radio"
                  name="flightType"
                  className="sr-only"
                  checked={flightType === 'private-jet'}
                  onChange={() => handleFlightTypeChange('private-jet')}
                />
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                {flightType === 'private-jet' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
                  </div>
                )}
              </div>
              <span>Jet privé</span>
            </label>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookingForm
