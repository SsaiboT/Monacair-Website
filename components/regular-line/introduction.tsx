import React from 'react'
import { Clock, Calendar, Euro } from 'lucide-react'

export default function Introduction() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50 -skew-x-12 transform origin-top-right z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 font-brother text-royalblue">
              La Liaison Aérienne la Plus Rapide
            </h2>
            <p className="text-lg mb-6 font-brother text-royalblue">
              Notre service de vol régulier entre Nice et Monaco offre le moyen le plus rapide et
              confortable de voyager entre l'aéroport international de Nice et la Principauté. En
              seulement 7 minutes, vous survolez les embouteillages et profitez d'une vue imprenable
              sur la Côte d'Azur.
            </p>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-royalblue/10 flex items-center justify-center mr-4">
                  <Clock className="h-6 w-6 text-royalblue" />
                </div>
                <div className="font-brother text-royalblue">
                  <span className="font-medium">Durée de vol :</span> 7 minutes
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-royalblue/10 flex items-center justify-center mr-4">
                  <Calendar className="h-6 w-6 text-royalblue" />
                </div>
                <div className="font-brother text-royalblue">
                  <span className="font-medium">Fréquence :</span> Vols toutes les 15 minutes en
                  période de pointe
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-royalblue/10 flex items-center justify-center mr-4">
                  <Euro className="h-6 w-6 text-royalblue" />
                </div>
                <div className="font-brother text-royalblue">
                  <span className="font-medium">Tarif :</span> À partir de 140€ par personne
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-royalblue/10 rounded-full z-0"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-royalblue/10 rounded-full z-0"></div>
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img
                src="/images/index/regular.webp"
                alt="Hélicoptère survolant la baie de Nice"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
