'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const BookingForm = () => {
  const t = useTranslations('Booking')
  const [flightType, setFlightType] = useState('regular-line')

  const handleFlightTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFlightType(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Form submitted with flight type:', flightType)
  }

  return (
    <div className="py-8 relative -mt-32 z-20">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="bg-royalblue shadow-md rounded-lg p-4">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end"
          >
            <div className="md:col-span-5 relative">
              <label className="sr-only">{t('booking-form.departure')}</label>
              <select
                className="block w-full rounded-md border-0 shadow-sm py-3 px-4 bg-white text-gray-900"
                defaultValue=""
              >
                <option value="" disabled>
                  Départ
                </option>
                <option value="nice">{t('booking-form.nice-airport')}</option>
                <option value="monaco">{t('booking-form.monaco-heliport')}</option>
              </select>
            </div>

            <div className="md:col-span-5 relative">
              <label className="sr-only">{t('booking-form.destination')}</label>
              <select
                className="block w-full rounded-md border-0 shadow-sm py-3 px-4 bg-white text-gray-900"
                defaultValue=""
              >
                <option value="" disabled>
                  Destination
                </option>
                <option value="monaco">{t('booking-form.monaco-heliport')}</option>
                <option value="nice">{t('booking-form.nice-airport')}</option>
              </select>
            </div>

            <div className="md:col-span-1 relative">
              <label className="sr-only">{t('booking-form.passengers')}</label>
              <select
                className="block w-full rounded-md border-0 shadow-sm py-3 px-4 bg-white text-gray-900"
                defaultValue=""
              >
                <option value="" disabled>
                  Invites
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>

            <div className="md:col-span-1 relative">
              <Button
                type="submit"
                variant="red"
                size="icon"
                className="w-12 h-12 p-0 flex items-center justify-center rounded-md"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookingForm
