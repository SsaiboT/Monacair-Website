import React from 'react'
import { Clock } from 'lucide-react'

export default function Schedule() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-brother text-royalblue">Horaires des Vols</h2>
          <p className="text-lg max-w-2xl mx-auto font-brother text-royalblue">
            Profitez de vols fréquents tout au long de la journée entre Nice et Monaco
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-redmonacair"></div>
            <h3 className="text-xl font-bold mb-4 pl-4 font-brother text-royalblue">
              Nice → Monaco
            </h3>
            <div className="space-y-6 pl-4">
              <div className="relative pl-8 border-l-2 border-dashed border-gray-300">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-redmonacair"></div>
                <p className="font-semibold font-brother text-royalblue">Premier départ</p>
                <p className="text-gray-600 font-brother">08:00</p>
              </div>
              <div className="relative pl-8 border-l-2 border-dashed border-gray-300">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-redmonacair"></div>
                <p className="font-semibold font-brother text-royalblue">Fréquence</p>
                <p className="text-gray-600 font-brother">
                  Toutes les 15-30 minutes pendant les heures de pointe
                </p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-redmonacair"></div>
                <p className="font-semibold font-brother text-royalblue">Dernier vol</p>
                <p className="text-gray-600 font-brother">19:00</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-redmonacair"></div>
            <h3 className="text-xl font-bold mb-4 pl-4 font-brother text-royalblue">
              Monaco → Nice
            </h3>
            <div className="space-y-6 pl-4">
              <div className="relative pl-8 border-l-2 border-dashed border-gray-300">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-redmonacair"></div>
                <p className="font-semibold font-brother text-royalblue">Premier départ</p>
                <p className="text-gray-600 font-brother">08:30</p>
              </div>
              <div className="relative pl-8 border-l-2 border-dashed border-gray-300">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-redmonacair"></div>
                <p className="font-semibold font-brother text-royalblue">Fréquence</p>
                <p className="text-gray-600 font-brother">
                  Toutes les 15-30 minutes pendant les heures de pointe
                </p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-redmonacair"></div>
                <p className="font-semibold font-brother text-royalblue">Dernier vol</p>
                <p className="text-gray-600 font-brother">19:30</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <Clock className="h-8 w-8 text-redmonacair" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 font-brother text-royalblue">
                Durée de vol exceptionnelle
              </h3>
              <p className="font-brother text-royalblue">
                Seulement 7 minutes de vol entre Nice et Monaco, offrant un gain de temps
                considérable par rapport aux autres moyens de transport.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
