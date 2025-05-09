'use client'

import Image from 'next/image'
import { Shield, Eye, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import type { PanoramicFlight, Fleet, Destination } from '@/payload-types'

export default function HelicopterTour() {
  const t = useTranslations('Panoramic.advantages')
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [panoramicFlight, setPanoramicFlight] = useState<PanoramicFlight | null>(null)
  const [helicopters, setHelicopters] = useState<Fleet[]>([])
  const [destination, setDestination] = useState<string>('')
  const [regionName, setRegionName] = useState<string>('')
  const [passengerCount, setPassengerCount] = useState<string>('5 à 6')
  const [helicopterModels, setHelicopterModels] = useState<string[]>([])

  const icons = {
    Eye: <Eye className="w-5 h-5 text-[color:var(--color-redmonacair)]" />,
    Shield: <Shield className="w-5 h-5 text-[color:var(--color-redmonacair)]" />,
    Users: <Users className="w-5 h-5 text-[color:var(--color-redmonacair)]" />,
  }

  const features = [
    {
      icon: 'Eye' as keyof typeof icons,
      title: t('features.0.title'),
      description: t('features.0.description'),
    },
    {
      icon: 'Shield' as keyof typeof icons,
      title: t('features.1.title'),
      description: t('features.1.description'),
    },
    {
      icon: 'Users' as keyof typeof icons,
      title: t('features.2.title'),
      description: t('features.2.description'),
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const fromParam = searchParams.get('from')
        const toParam = searchParams.get('to')

        if (fromParam && toParam) {
          const flightResponse = await fetch(
            `/api/panoramic-flights?where[active][equals]=true&limit=100&depth=3`,
          )
          const flightData = await flightResponse.json()

          if (flightData.docs && Array.isArray(flightData.docs)) {
            const flight = flightData.docs.find((f: PanoramicFlight) => {
              const startId =
                typeof f.routes?.[0]?.start === 'string'
                  ? f.routes[0].start
                  : f.routes?.[0]?.start?.id

              let hasDestination = false
              f.routes?.forEach((route) => {
                route.end?.forEach((endpoint) => {
                  const destId =
                    typeof endpoint.point_of_interest?.destination === 'string'
                      ? endpoint.point_of_interest.destination
                      : endpoint.point_of_interest?.destination?.id

                  if (destId === toParam) {
                    hasDestination = true
                  }
                })
              })

              return startId === fromParam && hasDestination
            })

            if (flight) {
              setPanoramicFlight(flight)

              let foundEndpoint: any = null
              const availableHelicopters: Fleet[] = []

              flight.routes?.forEach((route: any) => {
                route.end?.forEach((endpoint: any) => {
                  const destId =
                    typeof endpoint.point_of_interest?.destination === 'string'
                      ? endpoint.point_of_interest.destination
                      : endpoint.point_of_interest?.destination?.id

                  if (destId === toParam) {
                    foundEndpoint = endpoint

                    if (
                      endpoint.point_of_interest?.fleets &&
                      endpoint.point_of_interest.fleets.length > 0
                    ) {
                      endpoint.point_of_interest.fleets.forEach((fleetItem: any) => {
                        if (
                          fleetItem.fleet?.helicopter &&
                          typeof fleetItem.fleet.helicopter !== 'string'
                        ) {
                          availableHelicopters.push(fleetItem.fleet.helicopter)
                        }
                      })
                    }
                  }
                })
              })

              if (foundEndpoint) {
                const destinationObj =
                  typeof foundEndpoint.point_of_interest?.destination === 'string'
                    ? null
                    : (foundEndpoint.point_of_interest?.destination as Destination)

                if (destinationObj) {
                  setDestination(destinationObj.title || '')

                  if (destinationObj) {
                    setRegionName("Côte d'Azur")
                  }
                }
              }

              const sortedHelicopters = availableHelicopters.sort((a, b) => {
                const passengersA = parseInt(a.passengers.replace(/\D/g, '')) || 0
                const passengersB = parseInt(b.passengers.replace(/\D/g, '')) || 0
                return passengersA - passengersB
              })

              const selectedHelicopters = sortedHelicopters.slice(0, 2)
              setHelicopters(selectedHelicopters)

              if (selectedHelicopters.length > 0) {
                setPassengerCount(selectedHelicopters[0].passengers || '5 à 6')
              }

              const models = selectedHelicopters.map((h) => h.title).filter(Boolean)
              setHelicopterModels(models.length > 0 ? models : ['Airbus H130', 'H125'])
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [searchParams])

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-serif font-caslon font-bold text-[color:var(--color-royalblue)] mb-12 max-w-md">
        {t('title')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {features.map((feature, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg">
            <div className="w-10 h-10 bg-[color:var(--color-redmonacair)]/10 rounded-full flex items-center justify-center mb-4">
              {icons[feature.icon]}
            </div>
            <h3 className="font-bold font-brother text-xl mb-3">{feature.title}</h3>
            <p className="text-gray-700 font-brother">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/images/index/hero.webp"
            alt="Hélicoptère survolant la côte de Nice"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <p className="text-gray-800 font-brother">
            {`Nos hélicoptères ${helicopterModels.join(' ou ')} offrent un vol silencieux et confortable pour ${passengerCount} passagers.`}
          </p>

          <p className="text-gray-800 font-brother">
            {`Prêt à vivre une expérience inoubliable ? Réservez dès maintenant votre vol panoramique en hélicoptère au départ de ${destination || 'Nice'} et découvrez la splendeur de ${regionName || 'la Riviera'} depuis le ciel.`}
          </p>

          <p className="text-gray-800 font-brother">
            {`Pour plus d'informations ou pour effectuer une réservation, contactez-nous par téléphone ou par e-mail.`}
          </p>

          <p className="text-gray-800 font-brother">
            {`Ne manquez pas cette occasion unique de survoler l'une des plus belles régions du monde avec Monacair.`}
          </p>

          <div className="flex justify-end">
            <Button
              variant="red"
              className="bg-[color:var(--color-redmonacair)] hover:bg-[color:var(--color-redmonacair)]/90 text-white font-brother"
            >
              {t('cta.button')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
