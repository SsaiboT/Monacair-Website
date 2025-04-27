import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Wrench } from 'lucide-react'

export default function Maintenance() {
  const t = useTranslations('Management.maintenance')

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[color:var(--color-redmonacair)]/10 flex items-center justify-center mr-4">
                <Wrench className="h-6 w-6 text-[color:var(--color-redmonacair)]" />
              </div>
              <h2 className="text-3xl font-bold text-black font-brother">{t('title')}</h2>
            </div>

            <div className="space-y-6">
              <p className="text-black font-brother">{t('description')}</p>
              <p className="text-black font-brother">{t('certificationDescription')}</p>
              <p className="text-black font-brother">{t('locationsDescription')}</p>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <p className="font-bold mb-1 text-[color:var(--color-redmonacair)]">Grimaud</p>
                <p className="text-sm text-black">Saint-Tropez</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <p className="font-bold mb-1 text-[color:var(--color-redmonacair)]">Cannes</p>
                <p className="text-sm text-black">Côte d&apos;Azur</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <p className="font-bold mb-1 text-[color:var(--color-redmonacair)]">Annecy</p>
                <p className="text-sm text-black">Haute-Savoie</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <p className="font-bold mb-1 text-[color:var(--color-redmonacair)]">Courchevel</p>
                <p className="text-sm text-black">Alpes</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <p className="font-bold mb-1 text-[color:var(--color-redmonacair)]">Monaco</p>
                <p className="text-sm text-black">Principauté</p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 w-full h-[300px] md:h-[500px] relative mb-8 md:mb-0">
            <Image
              src="/images/index/hero.webp"
              alt="Maintenance d'hélicoptères"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
