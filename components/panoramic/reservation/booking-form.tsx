'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { PanoramicFlight, Destination } from '@/payload-types'

import FlightDetails from './flight-details'
import PassengersSection from './passengers-section'
import AdditionalOptions from './additional-options'
import ContactInformation from './contact-information'
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
  panoramicFlights?: PanoramicFlight[]
  availableDestinations?: Destination[]
  defaultDestination?: string
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
  panoramicFlights,
  availableDestinations,
  defaultDestination,
}: BookingFormProps) {
  const t = useTranslations('Panoramic.Reservation')

  const [destination, setDestination] = useState(defaultDestination || toParam || 'monaco')
  const [date, setDate] = useState(initialDate)
  const [time, setTime] = useState(initialTime)
  const [adults, setAdults] = useState(initialAdults)
  const [childrenCount, setChildrenCount] = useState(initialChildren)
  const [babies, setBabies] = useState(initialNewborns)
  const [hasRegistrationFee, setHasRegistrationFee] = useState(true)
  const [hasCancellationInsurance, setHasCancellationInsurance] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)

  const [isCompany, setIsCompany] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const isValidPromoCode = promoCode === 'PANORAMIC2023'

  const basePrice = 150
  const childPrice = basePrice * 0.8
  const babyPrice = 0

  const registrationFee = hasRegistrationFee ? 25 : 0
  const insurancePrice = hasCancellationInsurance ? 30 : 0

  const adultCost = adults * basePrice
  const childCost = childrenCount * childPrice
  const babyCost = babies * babyPrice

  const subtotal = adultCost + childCost + babyCost + registrationFee + insurancePrice
  const discount = isValidPromoCode ? subtotal * 0.1 : 0
  const total = subtotal - discount

  const handleSubmit = (e: React.FormEvent) => {
    if (!acceptTerms) {
      e.preventDefault()
      alert('Veuillez accepter les conditions générales')
      return
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <form
                action="https://formsubmit.co/danyamas07@gmail.com"
                method="POST"
                onSubmit={handleSubmit}
              >
                <FlightDetails
                  destination={destination}
                  setDestination={setDestination}
                  date={date}
                  setDate={setDate}
                  time={time}
                  setTime={setTime}
                  availableDestinations={availableDestinations || []}
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
                  hasCancellationInsurance={hasCancellationInsurance}
                  setHasCancellationInsurance={setHasCancellationInsurance}
                  promoCode={promoCode}
                  setPromoCode={setPromoCode}
                  isValidPromoCode={isValidPromoCode}
                />

                <ContactInformation
                  isCompany={isCompany}
                  setIsCompany={setIsCompany}
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  companyName={companyName}
                  setCompanyName={setCompanyName}
                  email={email}
                  setEmail={setEmail}
                  phone={phone}
                  setPhone={setPhone}
                  acceptTerms={acceptTerms}
                  setAcceptTerms={setAcceptTerms}
                />

                <input
                  type="hidden"
                  name="_subject"
                  value={`Nouvelle réservation de vol: Vol Panoramique - ${destination}`}
                />
                <input
                  type="hidden"
                  name="_next"
                  value={`${typeof window !== 'undefined' ? window.location.origin : ''}/booking/success`}
                />
                <input type="hidden" name="_captcha" value="true" />
                <input type="hidden" name="_template" value="table" />

                <input type="hidden" name="flightType" value="Vol Panoramique" />
                <input type="hidden" name="destination" value={destination} />
                <input type="hidden" name="date" value={date} />
                <input type="hidden" name="time" value={time} />

                <input type="hidden" name="adultsCount" value={adults.toString()} />
                <input type="hidden" name="childrenCount" value={childrenCount.toString()} />
                <input type="hidden" name="babiesCount" value={babies.toString()} />

                <input
                  type="hidden"
                  name="hasRegistrationFee"
                  value={hasRegistrationFee ? 'Oui' : 'Non'}
                />
                <input
                  type="hidden"
                  name="hasCancellationInsurance"
                  value={hasCancellationInsurance ? 'Oui' : 'Non'}
                />
                <input type="hidden" name="promoCode" value={promoCode} />
                <input
                  type="hidden"
                  name="isValidPromoCode"
                  value={isValidPromoCode ? 'Oui' : 'Non'}
                />

                <input type="hidden" name="isCompany" value={isCompany ? 'Oui' : 'Non'} />
                <input type="hidden" name="firstName" value={firstName} />
                <input type="hidden" name="lastName" value={lastName} />
                <input type="hidden" name="companyName" value={companyName} />
                <input type="hidden" name="email" value={email} />
                <input type="hidden" name="phone" value={phone} />

                <input type="hidden" name="basePrice" value={`${basePrice}€`} />
                <input type="hidden" name="childPrice" value={`${childPrice}€`} />
                <input type="hidden" name="babyPrice" value={`${babyPrice}€`} />
                <input type="hidden" name="adultCost" value={`${adultCost}€`} />
                <input type="hidden" name="childCost" value={`${childCost}€`} />
                <input type="hidden" name="babyCost" value={`${babyCost}€`} />
                <input type="hidden" name="registrationFee" value={`${registrationFee}€`} />
                <input type="hidden" name="insurancePrice" value={`${insurancePrice}€`} />
                <input type="hidden" name="subtotal" value={`${subtotal}€`} />
                <input type="hidden" name="discount" value={`${discount}€`} />
                <input type="hidden" name="totalPrice" value={`${total}€`} />

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start mb-8">
                  <div>
                    <p className="text-sm text-yellow-800">{t('termsValidation.paymentInfo')}</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-royalblue hover:bg-redmonacair text-white py-3 px-6 rounded-lg font-medium"
                  disabled={!acceptTerms}
                >
                  {t('termsValidation.submit')}
                </button>
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
