'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { HeroBanner } from '@/components/shared/hero-banner'
import Introduction from '@/components/regular-line/introduction'
import Schedule from '@/components/regular-line/schedule'
import Pricing from '@/components/regular-line/pricing'
import BookingForm from '@/components/regular-line/booking-form'
import CharterSection from '@/components/regular-line/charter-section'
import Benefits from '@/components/regular-line/benefits'
import FAQ from '@/components/regular-line/faq'
import CTASection from '@/components/regular-line/cta-section'
import Footer from '@/components/shared/footer'
import { RegularFlight, Destination, Media } from '@/payload-types'

export default function RegularLinePage() {
  const searchParams = useSearchParams()
  const t = useTranslations('RegularLine')

  const [routeData, setRouteData] = useState<RegularFlight | null>(null)
  const [startPoint, setStartPoint] = useState<Destination | null>(null)
  const [endPoint, setEndPoint] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isReversed, setIsReversed] = useState(false)

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        setLoading(true)

        const routeId = searchParams.get('routeId')
        const fromId = searchParams.get('from')
        const toId = searchParams.get('to')
        const isRouteReversed = searchParams.get('isReversed') === 'true'

        setIsReversed(isRouteReversed)

        if (routeId) {
          const routeResponse = await fetch(`/api/regular-flights/${routeId}`)
          const routeData = await routeResponse.json()
          setRouteData(routeData)

          const startPointId =
            typeof routeData.start_point === 'string'
              ? routeData.start_point
              : routeData.start_point.id

          const endPointId =
            typeof routeData.end_point === 'string' ? routeData.end_point : routeData.end_point.id

          const actualStartId = isRouteReversed ? endPointId : startPointId
          const actualEndId = isRouteReversed ? startPointId : endPointId

          const startResponse = await fetch(`/api/destinations/${actualStartId}`)
          const startData = await startResponse.json()
          setStartPoint(startData)

          const endResponse = await fetch(`/api/destinations/${actualEndId}`)
          const endData = await endResponse.json()
          setEndPoint(endData)
        } else if (fromId && toId) {
          const startResponse = await fetch(`/api/destinations/${fromId}`)
          const startData = await startResponse.json()
          setStartPoint(startData)

          const endResponse = await fetch(`/api/destinations/${toId}`)
          const endData = await endResponse.json()
          setEndPoint(endData)

          const routesResponse = await fetch(
            `/api/regular-flights?where[start_point][equals]=${fromId}&where[end_point][equals]=${toId}&limit=1`,
          )
          const routesData = await routesResponse.json()

          if (routesData.docs && routesData.docs.length > 0) {
            const routeData = routesData.docs[0]
            setRouteData(routeData)
            setIsReversed(false)
          } else {
            const reversedRoutesResponse = await fetch(
              `/api/regular-flights?where[start_point][equals]=${toId}&where[end_point][equals]=${fromId}&limit=1`,
            )
            const reversedRoutesData = await reversedRoutesResponse.json()

            if (reversedRoutesData.docs && reversedRoutesData.docs.length > 0) {
              const routeData = reversedRoutesData.docs[0]
              setRouteData(routeData)
              setIsReversed(true)
            }
          }
        }
      } catch (err) {
        console.error('Error fetching route data:', err)
        setError('Failed to load route data')
      } finally {
        setLoading(false)
      }
    }

    fetchRouteData()
  }, [searchParams])

  const heroTitle =
    startPoint && endPoint ? `${startPoint.title} - ${endPoint.title}` : t('hero.title')
  const heroSubtitle = t('hero.subtitle')

  const heroImageUrl = routeData?.hero_banner
    ? typeof routeData.hero_banner === 'string'
      ? `/api/media/${routeData.hero_banner}`
      : `/api/media/${(routeData.hero_banner as Media).id}`
    : '/images/regular-line/hero.webp'

  const bookingUrl =
    startPoint && endPoint
      ? `/regular-line/reservation?from=${startPoint.id}&to=${endPoint.id}&passengers=1${isReversed ? '&isReversed=true' : ''}`
      : '/regular-line/reservation'

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner
        title={heroTitle}
        subtitle={heroSubtitle}
        buttonText={t('hero.bookNow')}
        buttonHref={bookingUrl}
        imageUrl={heroImageUrl}
        imageAlt="Regular Line Monaco-Nice"
      />

      {loading ? (
        <div className="container mx-auto py-12 text-center">
          <p className="text-lg">Loading route information...</p>
        </div>
      ) : error ? (
        <div className="container mx-auto py-12 text-center">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      ) : routeData ? (
        <>
          <Introduction
            routeData={routeData}
            startPoint={startPoint}
            endPoint={endPoint}
            isReversed={isReversed}
          />
          <Schedule routeData={routeData} isReversed={isReversed} />
          <Pricing routeData={routeData} isReversed={isReversed} />
          <BookingForm />
        </>
      ) : (
        <div id="book" className="container mx-auto py-12 text-center">
          <p className="text-lg">Select your route to see flight information.</p>
        </div>
      )}

      <CharterSection />
      <Benefits />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  )
}
