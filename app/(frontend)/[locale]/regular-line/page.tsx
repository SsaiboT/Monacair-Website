'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { HeroBanner } from '@/components/shared/hero-banner'
import Introduction from '@/components/regular-line/introduction'
import Schedule from '@/components/regular-line/schedule'
import Pricing from '@/components/regular-line/pricing'
import BookingForm from '@/components/booking/booking-form'
import CharterSection from '@/components/regular-line/charter-section'
import Benefits from '@/components/regular-line/benefits'
import FAQ from '@/components/regular-line/faq'
import CTASection from '@/components/regular-line/cta-section'
import Footer from '@/components/shared/footer'
import { RegularFlight, Destination } from '@/payload-types'

export default function RegularLinePage() {
  const searchParams = useSearchParams()
  const t = useTranslations('RegularLine')

  const [routeData, setRouteData] = useState<RegularFlight | null>(null)
  const [startPoint, setStartPoint] = useState<Destination | null>(null)
  const [endPoint, setEndPoint] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        setLoading(true)

        const routeId = searchParams.get('routeId')
        const fromId = searchParams.get('from')
        const toId = searchParams.get('to')

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

          const startResponse = await fetch(`/api/destinations/${startPointId}`)
          const startData = await startResponse.json()
          setStartPoint(startData)

          const endResponse = await fetch(`/api/destinations/${endPointId}`)
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
            `/api/regular-flights?where[start_point][equals]=${fromId}&where[end_point][equals]=${toId}&where[active][equals]=true&limit=1`,
          )
          const routesData = await routesResponse.json()

          if (routesData.docs && routesData.docs.length > 0) {
            const routeData = routesData.docs[0]
            setRouteData(routeData)
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
    routeData?.hero?.title ||
    (startPoint && endPoint ? `${startPoint.title} - ${endPoint.title}` : t('hero.title'))
  const heroSubtitle = routeData?.hero?.subtitle || t('hero.subtitle')

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner
        title={heroTitle}
        subtitle={heroSubtitle}
        buttonText={t('hero.CTA')}
        buttonHref="#book"
        imageUrl="/images/regular-line/hero.webp"
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
          <Introduction routeData={routeData} startPoint={startPoint} endPoint={endPoint} />
          <Schedule routeData={routeData} />
          <Pricing routeData={routeData} />
        </>
      ) : (
        <div id="book" className="container mx-auto py-12 text-center">
          <p className="text-lg">Select your route to see flight information.</p>
          <div className="mt-8">
            <BookingForm />
          </div>
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
