'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { ArrowRight, Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const BookingForm = () => {
  const t = useTranslations('Booking')
  const [flightType, setFlightType] = useState('regular-line')
  const [departure, setDeparture] = useState('')
  const [destination, setDestination] = useState('')
  const [passengers, setPassengers] = useState('')

  const handleFlightTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFlightType(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Form submitted with:', {
      flightType,
      departure,
      destination,
      passengers,
    })
  }

  return (
    <div className="py-6 relative -mt-16 z-20">
      <div className="container mx-auto px-2 sm:px-12">
        <div className="bg-royalblue shadow-md rounded-lg p-2">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center"
          >
            <div className="md:col-span-5 relative">
              <label className="sr-only">{t('booking-form.departure')}</label>
              <Select value={departure} onValueChange={setDeparture}>
                <SelectTrigger className="w-full rounded-md border-0 bg-white text-gray-900 h-[42px]">
                  <SelectValue placeholder="Départ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nice">{t('booking-form.nice-airport')}</SelectItem>
                  <SelectItem value="monaco">{t('booking-form.monaco-heliport')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-5 relative">
              <label className="sr-only">{t('booking-form.destination')}</label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger className="w-full rounded-md border-0 bg-white text-gray-900 h-[42px]">
                  <SelectValue placeholder="Destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monaco">{t('booking-form.monaco-heliport')}</SelectItem>
                  <SelectItem value="nice">{t('booking-form.nice-airport')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-1 relative">
              <label className="sr-only">{t('booking-form.passengers')}</label>
              <Select value={passengers} onValueChange={setPassengers}>
                <SelectTrigger className="w-full rounded-md border-0 bg-white text-gray-900 h-[42px]">
                  <SelectValue placeholder="Inv" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:hidden col-span-1 mt-2">
              <Button
                type="submit"
                variant="red"
                className="w-full p-2 flex items-center justify-center rounded-lg"
              >
                <Search className="w-4 h-4 mr-2" />
                {t('booking-form.search')}
              </Button>
            </div>

            <div className="hidden md:block md:col-span-1 relative">
              <Button
                type="submit"
                variant="red"
                className="w-full h-10 flex items-center justify-center rounded-lg"
                aria-label={t('booking-form.search')}
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookingForm
