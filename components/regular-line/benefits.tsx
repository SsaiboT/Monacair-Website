import React from 'react'
import { Clock, Users, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

export default function Benefits() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 font-brother text-royalblue">
            Avantages de Nos Vols
          </h2>
          <p className="text-lg max-w-2xl mx-auto font-brother text-royalblue">
            Découvrez pourquoi notre service de transfert entre Nice et Monaco est le moyen de
            transport privilégié des voyageurs exigeants.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative">
            <div className="absolute inset-0 transform rotate-3 bg-royalblue/10 rounded-lg"></div>
            <div className="relative bg-white p-6 rounded-lg shadow-md z-10">
              <div className="w-16 h-16 bg-royalblue/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Clock className="h-8 w-8 text-royalblue" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4 font-brother text-royalblue">
                Gain de Temps Significatif
              </h3>
              <p className="text-center font-brother text-royalblue">
                Évitez les embouteillages et réduisez considérablement votre temps de trajet. En
                seulement 7 minutes, vous rejoignez votre destination.
              </p>
            </div>
          </div>
          <div className="relative mt-8 md:mt-12">
            <div className="absolute inset-0 transform -rotate-2 bg-royalblue/10 rounded-lg"></div>
            <div className="relative bg-white p-6 rounded-lg shadow-md z-10">
              <div className="w-16 h-16 bg-royalblue/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Users className="h-8 w-8 text-royalblue" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4 font-brother text-royalblue">
                Confort et Élégance
              </h3>
              <p className="text-center font-brother text-royalblue">
                Voyagez dans un environnement luxueux avec des sièges confortables, une cabine
                climatisée et un service attentionné qui fait toute la différence.
              </p>
            </div>
          </div>
          <div className="relative mt-4">
            <div className="absolute inset-0 transform rotate-1 bg-royalblue/10 rounded-lg"></div>
            <div className="relative bg-white p-6 rounded-lg shadow-md z-10">
              <div className="w-16 h-16 bg-royalblue/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <MapPin className="h-8 w-8 text-royalblue" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4 font-brother text-royalblue">
                Vues Spectaculaires
              </h3>
              <p className="text-center font-brother text-royalblue">
                Profitez d'une perspective unique de la Côte d'Azur avec des panoramas
                époustouflants sur la Méditerranée et le littoral monégasque.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg font-medium mb-6 font-brother text-royalblue">
            Prêt à transformer votre façon de voyager entre Nice et Monaco ?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/reservation">
              <Button
                size="lg"
                className="bg-redmonacair hover:bg-redmonacair/90 text-white font-brother"
              >
                Réserver Maintenant
              </Button>
            </Link>
            <Link href="/horaires">
              <Button
                size="lg"
                variant="white"
                className="border-royalblue text-royalblue hover:bg-royalblue/10 font-brother"
              >
                Consulter les Horaires
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
