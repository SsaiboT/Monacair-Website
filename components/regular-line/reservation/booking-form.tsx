'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useTranslations } from 'next-intl'

import ProgressSteps from '../reservation/progress-steps'
import FlightType from '../reservation/flight-type'
import FlightDetails from '../reservation/flight-details'
import ContactInformation from '../reservation/contact-information'
import BookingSummary from '../reservation/booking-summary'
import CustomerSupport from '../reservation/customer-support'

interface BookingFormProps {
  initialFlightType?: string
  initialDeparture?: string
  initialArrival?: string
  initialAdults?: number
}

export default function BookingForm({
  initialFlightType = 'ligne-reguliere',
  initialDeparture = 'nice',
  initialArrival = 'monaco',
  initialAdults = 1,
}: BookingFormProps) {
  const t = useTranslations('RegularLine.Reservation')

  const [currentStep, setCurrentStep] = useState(1)

  const [flightType, setFlightType] = useState('ligne-reguliere')

  const [departure, setDeparture] = useState(initialDeparture)
  const [arrival, setArrival] = useState(initialArrival)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [adults, setAdults] = useState(initialAdults)
  const [childPassengers, setChildPassengers] = useState(0)
  const [babies, setBabies] = useState(0)
  const [cabinLuggage, setCabinLuggage] = useState(1)
  const [checkedLuggage, setCheckedLuggage] = useState(0)

  const [isReturn, setIsReturn] = useState(false)
  const [returnDate, setReturnDate] = useState('')
  const [returnTime, setReturnTime] = useState('')

  const [hasCommercialFlight, setHasCommercialFlight] = useState(false)
  const [airline, setAirline] = useState('')
  const [flightOriginDestination, setFlightOriginDestination] = useState('')
  const [flightTime, setFlightTime] = useState('')

  const [needsDriverService, setNeedsDriverService] = useState(false)
  const [pickupLocation, setPickupLocation] = useState('')

  const [isCompany, setIsCompany] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const getBasePrice = () => {
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
      return 250
    }
  }

  const basePrice = getBasePrice()
  const totalPassengers = adults + childPassengers
  const baggagePrice = 15
  const baggageCost = checkedLuggage * baggagePrice

  const singleTripTotal = basePrice * totalPassengers + baggageCost
  const total = isReturn ? singleTripTotal * 2 : singleTripTotal

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      const bookingData = {
        flightType: 'regular-line',
        departure,
        arrival,
        date,
        time,
        returnDate: isReturn ? returnDate : null,
        returnTime: isReturn ? returnTime : null,
        isReturn,
        passengers: {
          adults,
          children: childPassengers,
          babies,
        },
        luggage: {
          cabin: cabinLuggage,
          checked: checkedLuggage,
        },
        commercialFlight: hasCommercialFlight
          ? {
              airline,
              originDestination: flightOriginDestination,
              time: flightTime,
            }
          : null,
        driverService: needsDriverService
          ? {
              pickupLocation,
            }
          : null,
        contact: {
          type: isCompany ? 'company' : 'individual',
          firstName,
          lastName,
          companyName: isCompany ? companyName : '',
          email,
          phone,
        },
        pricing: {
          basePrice,
          baggagePrice,
          totalPrice: total,
        },
      }

      const emailBody = `
        Nouvelle réservation :
        
        Type : Ligne Régulière
        Trajet : ${departure} -> ${arrival}
        Date : ${date}
        Heure : ${time}
        ${
          isReturn
            ? `
        Trajet retour : ${arrival} -> ${departure}
        Date : ${returnDate}
        Heure : ${returnTime}
        `
            : ''
        }
        Passagers : ${adults} adultes, ${childPassengers} enfants, ${babies} bébés
        Bagages : ${checkedLuggage} unités enregistrées
        
        Contact : ${isCompany ? companyName : `${firstName} ${lastName}`}
        Email : ${email}
        Téléphone : ${phone}
        
        Coût total : ${total}€
      `

      console.log('Envoi des données de réservation à booking@monacair.mc', bookingData)

      alert(t('formSubmitted'))

      window.location.href = '/booking/success'
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error)
      alert("Une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const goToNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2)
    } else {
      setCurrentStep(currentStep + 1)
    }
    window.scrollTo(0, 0)
  }

  const goToPreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1)
    } else {
      setCurrentStep(currentStep - 1)
    }
    window.scrollTo(0, 0)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <ProgressSteps
            currentStep={currentStep}
            steps={[t('steps.flightDetails'), t('steps.contact')]}
          />

          <form onSubmit={handleSubmit}>
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
                      isReturn={isReturn}
                      returnDate={returnDate}
                      returnTime={returnTime}
                      adults={adults}
                      childPassengers={childPassengers}
                      babies={babies}
                      cabinLuggage={cabinLuggage}
                      checkedLuggage={checkedLuggage}
                      basePrice={basePrice}
                      baggagePrice={baggagePrice}
                      total={total}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
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
                      isReturn={isReturn}
                      returnDate={returnDate}
                      returnTime={returnTime}
                      adults={adults}
                      childPassengers={childPassengers}
                      babies={babies}
                      cabinLuggage={cabinLuggage}
                      checkedLuggage={checkedLuggage}
                      basePrice={basePrice}
                      baggagePrice={baggagePrice}
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
