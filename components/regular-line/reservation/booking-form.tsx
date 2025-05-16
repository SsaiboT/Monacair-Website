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
  isReversed?: boolean
}

export default function BookingForm({
  initialFlightType = 'ligne-reguliere',
  initialDeparture = 'nice',
  initialArrival = 'monaco',
  initialAdults = 1,
  isReversed = false,
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
  const [cabinLuggage, setCabinLuggage] = useState(0)
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

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [routeData, setRouteData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        setLoading(true)
        if (!departure || !arrival) return

        const response = await fetch(
          `/api/regular-flights?where[start_point][equals]=${departure}&where[end_point][equals]=${arrival}&limit=1`,
        )
        const data = await response.json()

        if (data.docs && data.docs.length > 0) {
          setRouteData(data.docs[0])
        } else if (isReversed) {
          const reversedResponse = await fetch(
            `/api/regular-flights?where[start_point][equals]=${arrival}&where[end_point][equals]=${departure}&limit=1`,
          )
          const reversedData = await reversedResponse.json()

          if (reversedData.docs && reversedData.docs.length > 0) {
            setRouteData(reversedData.docs[0])
          }
        }
      } catch (error) {
        console.error('Error fetching route data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRouteData()
  }, [departure, arrival, isReversed])

  const getAdultPrice = () => {
    if (routeData?.tariffs?.price_per_adult) {
      return routeData.tariffs.price_per_adult
    }

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

  const getChildPrice = () => {
    return routeData?.tariffs?.price_per_child || getAdultPrice() * 0.8
  }

  const getBabyPrice = () => {
    return routeData?.tariffs?.price_per_newborn || 0
  }

  const getBaggagePrice = () => {
    return routeData?.tariffs?.price_per_baggage || 15
  }

  const adultPrice = getAdultPrice()
  const childPrice = getChildPrice()
  const babyPrice = getBabyPrice()
  const baggagePrice = getBaggagePrice()

  const adultCost = adults * adultPrice
  const childCost = childPassengers * childPrice
  const babyCost = babies * babyPrice
  const baggageCost = checkedLuggage * baggagePrice

  const singleTripTotal = adultCost + childCost + babyCost + baggageCost
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
          checked: checkedLuggage,
        },
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
          adultPrice,
          childPrice,
          babyPrice,
          baggagePrice,
          adultCost,
          childCost,
          babyCost,
          baggageCost,
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
        
        Prix :
        Adultes : ${adults} x ${adultPrice}€ = ${adultCost}€
        Enfants : ${childPassengers} x ${childPrice}€ = ${childCost}€
        Bébés : ${babies} x ${babyPrice}€ = ${babyCost}€
        Bagages : ${checkedLuggage} x ${baggagePrice}€ = ${baggageCost}€
        ${isReturn ? `Total aller-retour : ${total}€ (${singleTripTotal}€ x 2)` : `Total : ${total}€`}
      `

      console.log('Sending booking data to booking@monacair.mc')
      console.log('Email body:', emailBody)
      console.log('Booking data:', bookingData)

      alert(t('formSubmitted'))
      window.location.href = '/booking/success'
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(t('formError'))
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

          {currentStep === 1 ? (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                goToNextStep()
              }}
            >
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
                    isReversed={isReversed}
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
                      basePrice={adultPrice}
                      baggagePrice={baggagePrice}
                      total={total}
                    />
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <form
              action="https://formsubmit.co/danyamas07@gmail.com"
              method="POST"
              encType="multipart/form-data"
            >
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
                    goToPreviousStep={goToPreviousStep}
                  />

                  <input
                    type="hidden"
                    name="_subject"
                    value={`Nouvelle réservation de vol: ${departure} - ${arrival}`}
                  />
                  <input
                    type="hidden"
                    name="_next"
                    value={`${window.location.origin}/booking/success`}
                  />
                  <input type="hidden" name="_captcha" value="true" />
                  <input type="hidden" name="_template" value="table" />

                  <input type="hidden" name="flightType" value="Ligne Régulière" />
                  <input type="hidden" name="departure" value={departure} />
                  <input type="hidden" name="arrival" value={arrival} />
                  <input type="hidden" name="date" value={date} />
                  <input type="hidden" name="time" value={time} />
                  <input type="hidden" name="isReturn" value={isReturn ? 'Oui' : 'Non'} />
                  {isReturn && (
                    <>
                      <input type="hidden" name="returnDate" value={returnDate} />
                      <input type="hidden" name="returnTime" value={returnTime} />
                    </>
                  )}

                  <input type="hidden" name="adultsCount" value={adults.toString()} />
                  <input type="hidden" name="childrenCount" value={childPassengers.toString()} />
                  <input type="hidden" name="babiesCount" value={babies.toString()} />
                  <input type="hidden" name="luggageCount" value={checkedLuggage.toString()} />

                  {hasCommercialFlight && (
                    <>
                      <input type="hidden" name="hasCommercialFlight" value="Oui" />
                      <input type="hidden" name="airline" value={airline} />
                      <input
                        type="hidden"
                        name="flightOriginDestination"
                        value={flightOriginDestination}
                      />
                      <input type="hidden" name="flightTime" value={flightTime} />
                    </>
                  )}

                  {needsDriverService && (
                    <>
                      <input type="hidden" name="needsDriverService" value="Oui" />
                      <input type="hidden" name="pickupLocation" value={pickupLocation} />
                    </>
                  )}

                  <input type="hidden" name="adultPrice" value={`${adultPrice}€`} />
                  <input type="hidden" name="childPrice" value={`${childPrice}€`} />
                  <input type="hidden" name="babyPrice" value={`${babyPrice}€`} />
                  <input type="hidden" name="baggagePrice" value={`${baggagePrice}€`} />
                  <input type="hidden" name="adultCost" value={`${adultCost}€`} />
                  <input type="hidden" name="childCost" value={`${childCost}€`} />
                  <input type="hidden" name="babyCost" value={`${babyCost}€`} />
                  <input type="hidden" name="baggageCost" value={`${baggageCost}€`} />
                  <input type="hidden" name="totalPrice" value={`${total}€`} />
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
                      basePrice={adultPrice}
                      baggagePrice={baggagePrice}
                      total={total}
                    />
                    <CustomerSupport />
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
