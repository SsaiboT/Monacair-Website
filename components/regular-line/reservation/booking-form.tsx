'use client'

import { useState, FormEvent } from 'react'
import { useTranslations } from 'next-intl'

import ProgressSteps from '../reservation/progress-steps'
import FlightType from '../reservation/flight-type'
import FlightDetails from '../reservation/flight-details'
import HelicopterSelection from '../reservation/helicopter-selection'
import ContactInformation from '../reservation/contact-information'
import BookingSummary from '../reservation/booking-summary'
import CustomerSupport from '../reservation/customer-support'

export default function BookingForm() {
  const t = useTranslations('RegularLine.Reservation')

  // State for multi-step form
  const [currentStep, setCurrentStep] = useState(1)
  const [flightType, setFlightType] = useState('ligne-reguliere')

  // Flight details
  const [departure, setDeparture] = useState('nice')
  const [arrival, setArrival] = useState('monaco')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [adults, setAdults] = useState(1)
  const [childPassengers, setChildPassengers] = useState(0)
  const [babies, setBabies] = useState(0)
  const [cabinLuggage, setCabinLuggage] = useState(1)
  const [checkedLuggage, setCheckedLuggage] = useState(0)

  // Commercial flight correspondence
  const [hasCommercialFlight, setHasCommercialFlight] = useState(false)
  const [airline, setAirline] = useState('')
  const [flightOriginDestination, setFlightOriginDestination] = useState('')
  const [flightTime, setFlightTime] = useState('')

  // Driver service
  const [needsDriverService, setNeedsDriverService] = useState(false)
  const [pickupLocation, setPickupLocation] = useState('')

  // Helicopter selection
  const [selectedHelicopter, setSelectedHelicopter] = useState('')

  // Additional services
  const [needsVipWelcome, setNeedsVipWelcome] = useState(false)
  const [needsLimousine, setNeedsLimousine] = useState(false)
  const [needsOtherService, setNeedsOtherService] = useState(false)
  const [otherServiceDetails, setOtherServiceDetails] = useState('')

  // Contact details
  const [isCompany, setIsCompany] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false)

  // Calculate prices based on flight type and route
  const getBasePrice = () => {
    if (flightType === 'ligne-reguliere') {
      // Regular line prices
      if (
        (departure === 'nice' && arrival === 'monaco') ||
        (departure === 'monaco' && arrival === 'nice')
      ) {
        return 195
      } else if (
        (departure === 'nice' && arrival === 'cannes') ||
        (departure === 'cannes' && arrival === 'nice')
      ) {
        return 220
      } else {
        return 250 // Default price for other routes
      }
    } else {
      // Private flight prices based on helicopter type
      switch (selectedHelicopter) {
        case 'h125':
          return 1500
        case 'h130':
          return 1800
        case 'as355':
          return 2200
        case 'h135':
          return 2500
        case 'bell429':
          return 3000
        case 'h155':
          return 3500
        default:
          return 1500 // Default price
      }
    }
  }

  const basePrice = getBasePrice()
  const totalPassengers = adults + childPassengers
  const total = flightType === 'ligne-reguliere' ? basePrice * totalPassengers : basePrice // Private flights are charged per helicopter, not per passenger

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real application, this would send the data to a server
    alert('Réservation soumise avec succès ! Un email de confirmation vous sera envoyé.')
  }

  // Handle next step
  const goToNextStep = () => {
    setCurrentStep(currentStep + 1)
    window.scrollTo(0, 0)
  }

  // Handle previous step
  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1)
    window.scrollTo(0, 0)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <ProgressSteps currentStep={currentStep} />

          <form onSubmit={handleSubmit}>
            {/* Step 1: Flight Details */}
            {currentStep === 1 && (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <FlightType flightType={flightType} setFlightType={setFlightType} />
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
                  />
                </div>
                <div className="md:col-span-1">
                  <div className="sticky top-8">
                    <BookingSummary
                      flightType={flightType}
                      departure={departure}
                      arrival={arrival}
                      date={date}
                      time={time}
                      adults={adults}
                      childPassengers={childPassengers}
                      babies={babies}
                      cabinLuggage={cabinLuggage}
                      checkedLuggage={checkedLuggage}
                      selectedHelicopter={selectedHelicopter}
                      basePrice={basePrice}
                      total={total}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Helicopter Selection */}
            {currentStep === 2 && (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <HelicopterSelection
                    flightType={flightType}
                    selectedHelicopter={selectedHelicopter}
                    setSelectedHelicopter={setSelectedHelicopter}
                    needsVipWelcome={needsVipWelcome}
                    setNeedsVipWelcome={setNeedsVipWelcome}
                    needsLimousine={needsLimousine}
                    setNeedsLimousine={setNeedsLimousine}
                    needsOtherService={needsOtherService}
                    setNeedsOtherService={setNeedsOtherService}
                    otherServiceDetails={otherServiceDetails}
                    setOtherServiceDetails={setOtherServiceDetails}
                    goToNextStep={goToNextStep}
                    goToPreviousStep={goToPreviousStep}
                  />
                </div>
                <div className="md:col-span-1">
                  <div className="sticky top-8">
                    <BookingSummary
                      flightType={flightType}
                      departure={departure}
                      arrival={arrival}
                      date={date}
                      time={time}
                      adults={adults}
                      childPassengers={childPassengers}
                      babies={babies}
                      cabinLuggage={cabinLuggage}
                      checkedLuggage={checkedLuggage}
                      selectedHelicopter={selectedHelicopter}
                      basePrice={basePrice}
                      total={total}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
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
                    subscribeNewsletter={subscribeNewsletter}
                    setSubscribeNewsletter={setSubscribeNewsletter}
                    goToPreviousStep={goToPreviousStep}
                  />
                </div>
                <div className="md:col-span-1">
                  <div className="sticky top-8">
                    <BookingSummary
                      flightType={flightType}
                      departure={departure}
                      arrival={arrival}
                      date={date}
                      time={time}
                      adults={adults}
                      childPassengers={childPassengers}
                      babies={babies}
                      cabinLuggage={cabinLuggage}
                      checkedLuggage={checkedLuggage}
                      selectedHelicopter={selectedHelicopter}
                      basePrice={basePrice}
                      total={total}
                    />
                    <CustomerSupport />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
