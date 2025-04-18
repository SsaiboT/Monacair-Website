import React from 'react'
import { Users, Plane, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

export default function CharterSection() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative order-2 md:order-1">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img
                src="/images/index/private.webp"
                alt="Hélicoptère de charter privé"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute top-1/2 -right-6 sm:-right-12 transform -translate-y-1/2 w-24 h-24 sm:w-36 md:w-48 sm:h-36 md:h-48 rounded-lg overflow-hidden shadow-xl border-4 border-white z-20 hidden sm:block">
              <img
                src="/images/index/jet.webp"
                alt="Intérieur d'hélicoptère de luxe"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 font-brother text-royalblue">
              Services de Charter Privé
            </h2>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 font-brother text-royalblue">
              Optez pour un hélicoptère exclusivement dédié à votre groupe. Notre service de charter
              offre une flexibilité maximale pour vos déplacements professionnels ou privés.
            </p>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 font-brother text-royalblue">
              Choisissez vos horaires, vos destinations et voyagez en toute intimité avec un service
              entièrement personnalisé selon vos besoins spécifiques.
            </p>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 font-brother text-royalblue">
                Idéal pour
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-redmonacair text-white flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <div className="font-brother text-royalblue text-sm sm:text-base">
                    <span className="font-medium">Groupes</span> - Transport de groupes jusqu'à 6
                    personnes avec bagages, idéal pour les familles ou équipes professionnelles
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-redmonacair text-white flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                    <Plane className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <div className="font-brother text-royalblue text-sm sm:text-base">
                    <span className="font-medium">Événements spéciaux</span> - Arrivées
                    prestigieuses pour événements VIP, mariages, festivals ou compétitions sportives
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-redmonacair text-white flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <div className="font-brother text-royalblue text-sm sm:text-base">
                    <span className="font-medium">Voyages d'affaires</span> - Optimisation du temps
                    pour réunions multiples ou visites de sites dans différentes localités en une
                    journée
                  </div>
                </li>
              </ul>
            </div>
            <Link href="/charter">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-redmonacair hover:bg-redmonacair/90 text-white font-brother"
              >
                Demander un devis personnalisé
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
