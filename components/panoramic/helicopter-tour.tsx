'use client'

import Image from 'next/image'
import { Shield, Eye, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import type { PanoramicFlight, Fleet, Destination as PayloadDestination } from '@/payload-types'

interface HelicopterTourProps {
  panoramicFlight: PanoramicFlight | null
}

export default function HelicopterTour({ panoramicFlight }: HelicopterTourProps) {
  const t = useTranslations('Panoramic.advantages')
  const [helicopters, setHelicopters] = useState<Fleet[]>([])
  const [destinationName, setDestinationName] = useState<string>('')
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
    if (panoramicFlight) {
      let foundEndpoint: any = null
      const availableHelicopters: Fleet[] = []

      panoramicFlight.routes?.forEach((route: any) => {
        route.end?.forEach((endpoint: any) => {
          if (!foundEndpoint) {
            foundEndpoint = endpoint
          }

          if (endpoint.point_of_interest?.fleets && endpoint.point_of_interest.fleets.length > 0) {
            endpoint.point_of_interest.fleets.forEach((fleetItem: any) => {
              if (fleetItem.fleet?.helicopter && typeof fleetItem.fleet.helicopter === 'object') {
                availableHelicopters.push(fleetItem.fleet.helicopter)
              }
            })
          }
        })
      })

      if (panoramicFlight.routes && panoramicFlight.routes.length > 0) {
        const firstRoute = panoramicFlight.routes[0]
        if (firstRoute && firstRoute.end && firstRoute.end.length > 0) {
          foundEndpoint = firstRoute.end[0]
        }
      }

      if (
        foundEndpoint &&
        foundEndpoint.point_of_interest &&
        typeof foundEndpoint.point_of_interest === 'object'
      ) {
        const poi = foundEndpoint.point_of_interest
        const destinationObj = poi.destination as PayloadDestination | string | undefined

        if (destinationObj && typeof destinationObj === 'object') {
          setDestinationName(destinationObj.title || '')
          setRegionName("Côte d'Azur")
        }

        const currentEndpointHelicopters: Fleet[] = []
        if (poi.fleets && poi.fleets.length > 0) {
          poi.fleets.forEach((fleetItem: any) => {
            if (fleetItem.fleet?.helicopter && typeof fleetItem.fleet.helicopter === 'object') {
              currentEndpointHelicopters.push(fleetItem.fleet.helicopter)
            }
          })
        }
        setHelicopters(
          currentEndpointHelicopters
            .sort((a, b) => {
              const passengersA = parseInt(a.passengers?.replace(/\D/g, '') || '0')
              const passengersB = parseInt(b.passengers?.replace(/\D/g, '') || '0')
              return passengersA - passengersB
            })
            .slice(0, 2),
        )
      }

      const finalHelicopters = helicopters
      if (finalHelicopters.length > 0) {
        setPassengerCount(finalHelicopters[0].passengers || '5 à 6')
        const models = finalHelicopters.map((h) => h.title).filter(Boolean) as string[]
        setHelicopterModels(models.length > 0 ? models : ['Airbus H130', 'H125'])
      } else {
        setPassengerCount('5 à 6')
        setHelicopterModels(['Airbus H130', 'H125'])
      }
    } else {
      setHelicopters([])
      setDestinationName('')
      setRegionName('')
      setPassengerCount('5 à 6')
      setHelicopterModels(['Airbus H130', 'H125'])
    }
  }, [panoramicFlight])

  if (!panoramicFlight) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-serif font-caslon font-bold text-[color:var(--color-royalblue)] mb-12 max-w-md">
          {t('title')}
        </h1>
        <p className="text-center">{t('noFlightDataAvailable')}</p>
      </div>
    )
  }

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
            {`Prêt à vivre une expérience inoubliable ? Réservez dès maintenant votre vol panoramique en hélicoptère au départ de ${destinationName || 'Nice'} et découvrez la splendeur de ${regionName || 'la Riviera'} depuis le ciel.`}
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
