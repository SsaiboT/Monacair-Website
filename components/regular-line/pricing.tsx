import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

export default function Pricing() {
  const regularFlightFeatures = [
    'Vol régulier de 7 minutes entre Nice et Monaco',
    'Bagage de 15kg inclus par passager',
    'Lounge VIP aux terminaux de départ',
    "Service de transfert vers votre hôtel à l'arrivée",
  ]

  const privateCharterFeatures = [
    'Hélicoptère privé exclusif pour votre groupe',
    'Horaires flexibles selon vos besoins',
    "Jusqu'à 6 passagers avec bagages",
    'Service conciergerie personnalisé',
  ]

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gray-50"></div>
      <div className="absolute top-0 left-0 right-0 h-32">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-32"
        >
          <path
            fill="#f9fafb"
            fillOpacity="1"
            d="M0,96L80,106.7C160,117,320,139,480,133.3C640,128,800,96,960,90.7C1120,85,1280,107,1360,117.3L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-brother text-royalblue">Nos Tarifs</h2>
            <p className="text-lg font-brother text-royalblue">
              Choisissez la formule qui correspond le mieux à vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105">
              <div className="bg-redmonacair text-white p-6">
                <h3 className="text-2xl font-bold font-brother">Vol régulier</h3>
                <p className="text-white/80 font-brother">
                  La solution la plus rapide entre Nice et Monaco
                </p>
              </div>
              <div className="p-6">
                <div className="flex justify-center items-center mb-6">
                  <span className="text-4xl font-bold font-brother text-royalblue">140€</span>
                  <span className="text-gray-500 ml-2 font-brother">/ personne</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {regularFlightFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-redmonacair mr-2 flex-shrink-0 mt-0.5" />
                      <span className="font-brother text-royalblue">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/reserver-regulier">
                  <Button className="w-full bg-redmonacair hover:bg-redmonacair/90 text-white font-brother">
                    Réserver maintenant
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105">
              <div className="bg-royalblue text-white p-6">
                <h3 className="text-2xl font-bold font-brother">Charter privé</h3>
                <p className="text-white/80 font-brother">Exclusivité et flexibilité totale</p>
              </div>
              <div className="p-6">
                <div className="flex justify-center items-center mb-6">
                  <span className="text-4xl font-bold font-brother text-royalblue">1 400€</span>
                  <span className="text-gray-500 ml-2 font-brother">/ vol</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {privateCharterFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-redmonacair mr-2 flex-shrink-0 mt-0.5" />
                      <span className="font-brother text-royalblue">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/demande-charter">
                  <Button className="w-full bg-royalblue hover:bg-royalblue/90 text-white font-brother">
                    Demander un devis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
