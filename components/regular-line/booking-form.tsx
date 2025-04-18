import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function BookingForm() {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-royalblue transform -skew-y-3 origin-top-right z-0"></div>
      <div className="container mx-auto px-4 relative z-10 pt-12">
        <div className="max-w-4xl mx-auto text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-brother">Réservez Votre Vol</h2>
            <p className="text-lg max-w-2xl mx-auto font-brother">
              Réservez en quelques clics et préparez-vous à vivre une expérience de vol inoubliable.
            </p>
          </div>

          <div className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-xl">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6 font-brother text-royalblue">
                Détails de votre voyage
              </h3>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 font-brother text-royalblue">
                      Lieu de départ
                    </label>
                    <Select defaultValue="nice">
                      <SelectTrigger className="border-royalblue">
                        <SelectValue placeholder="Choisir un lieu de départ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nice">Aéroport de Nice</SelectItem>
                        <SelectItem value="monaco">Héliport de Monaco</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 font-brother text-royalblue">
                      Lieu d'arrivée
                    </label>
                    <Select defaultValue="monaco">
                      <SelectTrigger className="border-royalblue">
                        <SelectValue placeholder="Choisir un lieu d'arrivée" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monaco">Héliport de Monaco</SelectItem>
                        <SelectItem value="nice">Aéroport de Nice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 font-brother text-royalblue">
                      Date
                    </label>
                    <Input type="date" className="border-royalblue" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 font-brother text-royalblue">
                      Heure
                    </label>
                    <Select defaultValue="0800">
                      <SelectTrigger className="border-royalblue">
                        <SelectValue placeholder="Choisir une heure" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          '0800',
                          '0830',
                          '0900',
                          '0930',
                          '1000',
                          '1030',
                          '1100',
                          '1130',
                          '1200',
                        ].map((time) => (
                          <SelectItem key={time} value={time}>
                            {time.slice(0, 2)}:{time.slice(2, 4)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 font-brother text-royalblue">
                      Nombre de passagers
                    </label>
                    <Select defaultValue="1">
                      <SelectTrigger className="border-royalblue">
                        <SelectValue placeholder="Combien de passagers?" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} passager{num > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="bg-redmonacair hover:bg-redmonacair/90 text-white font-brother"
                >
                  Rechercher des vols disponibles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
