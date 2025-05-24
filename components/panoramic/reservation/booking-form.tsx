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

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('france')
  const [createAccount, setCreateAccount] = useState(false)

  const isValidPromoCode = promoCode === 'PANORAMIC2023'

  const basePrice = 150
  const childPrice = basePrice * 0.8
  const babyPrice = 0

  const registrationFee = hasRegistrationFee ? 25 : 0
  const giftPackagePrice = hasGiftPackage ? 50 : 0
  const insurancePrice = hasCancellationInsurance ? 30 : 0

  const adultCost = adults * basePrice
  const childCost = childrenCount * childPrice
  const babyCost = babies * babyPrice

  const subtotal =
    adultCost + childCost + babyCost + registrationFee + giftPackagePrice + insurancePrice
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

                <ContactInformation
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  email={email}
                  setEmail={setEmail}
                  phone={phone}
                  setPhone={setPhone}
                  address={address}
                  setAddress={setAddress}
                  postalCode={postalCode}
                  setPostalCode={setPostalCode}
                  city={city}
                  setCity={setCity}
                  country={country}
                  setCountry={setCountry}
                  createAccount={createAccount}
                  setCreateAccount={setCreateAccount}
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
                <input type="hidden" name="hasGiftPackage" value={hasGiftPackage ? 'Oui' : 'Non'} />
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

                <input type="hidden" name="firstName" value={firstName} />
                <input type="hidden" name="lastName" value={lastName} />
                <input type="hidden" name="email" value={email} />
                <input type="hidden" name="phone" value={phone} />
                <input type="hidden" name="address" value={address} />
                <input type="hidden" name="postalCode" value={postalCode} />
                <input type="hidden" name="city" value={city} />
                <input type="hidden" name="country" value={country} />
                <input type="hidden" name="createAccount" value={createAccount ? 'Oui' : 'Non'} />

                <input type="hidden" name="basePrice" value={`${basePrice}€`} />
                <input type="hidden" name="childPrice" value={`${childPrice}€`} />
                <input type="hidden" name="babyPrice" value={`${babyPrice}€`} />
                <input type="hidden" name="adultCost" value={`${adultCost}€`} />
                <input type="hidden" name="childCost" value={`${childCost}€`} />
                <input type="hidden" name="babyCost" value={`${babyCost}€`} />
                <input type="hidden" name="registrationFee" value={`${registrationFee}€`} />
                <input type="hidden" name="giftPackagePrice" value={`${giftPackagePrice}€`} />
                <input type="hidden" name="insurancePrice" value={`${insurancePrice}€`} />
                <input type="hidden" name="subtotal" value={`${subtotal}€`} />
                <input type="hidden" name="discount" value={`${discount}€`} />
                <input type="hidden" name="totalPrice" value={`${total}€`} />

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
