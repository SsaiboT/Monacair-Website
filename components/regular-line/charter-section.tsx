import React from 'react'
import { Users, Plane, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

export default function CharterSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img
                src="/images/index/private.webp"
                alt="Hélicoptère de charter privé"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 w-48 h-48 rounded-lg overflow-hidden shadow-xl border-4 border-white z-20">
              <img
                src="/images/index/jet.webp"
                alt="Intérieur d'hélicoptère de luxe"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 font-brother text-royalblue">
              Services de Charter Privé
            </h2>
            <p className="text-lg mb-6 font-brother text-royalblue">
              Optez pour un hélicoptère exclusivement dédié à votre groupe. Notre service de charter
              offre une flexibilité maximale pour vos déplacements professionnels ou privés.
            </p>
            <p className="text-lg mb-6 font-brother text-royalblue">
              Choisissez vos horaires, vos destinations et voyagez en toute intimité avec un service
              entièrement personnalisé selon vos besoins spécifiques.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-4 font-brother text-royalblue">Idéal pour</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-redmonacair text-white flex items-center justify-center mr-3 flex-shrink-0">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="font-brother text-royalblue">
                    <span className="font-medium">Groupes</span> - Transport de groupes jusqu'à 6
                    personnes avec bagages, idéal pour les familles ou équipes professionnelles
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-redmonacair text-white flex items-center justify-center mr-3 flex-shrink-0">
                    <Plane className="h-4 w-4" />
                  </div>
                  <div className="font-brother text-royalblue">
                    <span className="font-medium">Événements spéciaux</span> - Arrivées
                    prestigieuses pour événements VIP, mariages, festivals ou compétitions sportives
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-redmonacair text-white flex items-center justify-center mr-3 flex-shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="font-brother text-royalblue">
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
                className="bg-redmonacair hover:bg-redmonacair/90 text-white font-brother"
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
