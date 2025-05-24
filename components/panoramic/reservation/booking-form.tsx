'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

import FlightDetails from './flight-details'
import PassengersSection from './passengers-section'
import AdditionalOptions from './additional-options'
import ContactInformation from './contact-information'
import TermsValidation from './terms-validation'
import BookingSummary from './booking-summary'
import CustomerSupport from './customer-support'

interface BookingFormProps {
  fromParam?: string
  toParam?: string
  initialAdults?: number
  initialChildren?: number
  initialNewborns?: number
  initialDate?: string
  initialTime?: string
  initialFlex?: boolean
}

export default function BookingForm({
  fromParam,
  toParam,
  initialAdults = 2,
  initialChildren = 0,
  initialNewborns = 0,
  initialDate = '',
  initialTime = '',
  initialFlex = false,
}: BookingFormProps) {
  const t = useTranslations('Panoramic.Reservation')

  const [destination, setDestination] = useState(toParam || 'monaco')
  const [date, setDate] = useState(initialDate)
  const [time, setTime] = useState(initialTime)
  const [adults, setAdults] = useState(initialAdults)
  const [childrenCount, setChildrenCount] = useState(initialChildren)
  const [babies, setBabies] = useState(initialNewborns)
  const [hasRegistrationFee, setHasRegistrationFee] = useState(true)
  const [hasGiftPackage, setHasGiftPackage] = useState(false)
  const [hasCancellationInsurance, setHasCancellationInsurance] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)

  const isValidPromoCode = promoCode === 'PANORAMIC2023'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(t('formSubmitted'))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit}>
                <FlightDetails
                  destination={destination}
                  setDestination={setDestination}
                  date={date}
                  setDate={setDate}
                  time={time}
                  setTime={setTime}
                />

                <div className="card mb-8 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <PassengersSection
                    adults={adults}
                    setAdults={setAdults}
                    childrenCount={childrenCount}
                    setChildren={setChildrenCount}
                    babies={babies}
                    setBabies={setBabies}
                  />
                </div>

                <AdditionalOptions
                  hasRegistrationFee={hasRegistrationFee}
                  setHasRegistrationFee={setHasRegistrationFee}
                  hasGiftPackage={hasGiftPackage}
                  setHasGiftPackage={setHasGiftPackage}
                  hasCancellationInsurance={hasCancellationInsurance}
                  setHasCancellationInsurance={setHasCancellationInsurance}
                  promoCode={promoCode}
                  setPromoCode={setPromoCode}
                  isValidPromoCode={isValidPromoCode}
                />

                <ContactInformation />

                <TermsValidation
                  acceptTerms={acceptTerms}
                  setAcceptTerms={setAcceptTerms}
                  onSubmit={handleSubmit}
                />
              </form>
            </div>

            <div className="md:col-span-1">
              <div className="sticky top-8">
                <BookingSummary
                  destination={destination}
                  date={date}
                  time={time}
                  adults={adults}
                  childrenCount={childrenCount}
                  babies={babies}
                  hasRegistrationFee={hasRegistrationFee}
                  hasGiftPackage={hasGiftPackage}
                  hasCancellationInsurance={hasCancellationInsurance}
                  promoCode={promoCode}
                  isValidPromoCode={isValidPromoCode}
                />
                <CustomerSupport />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
