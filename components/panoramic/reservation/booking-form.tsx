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

export default function BookingForm() {
  const t = useTranslations('Panoramic.Reservation')

  const [destination, setDestination] = useState('monaco')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [adults, setAdults] = useState(2)
  const [childrenCount, setChildrenCount] = useState(0)
  const [babies, setBabies] = useState(0)
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
