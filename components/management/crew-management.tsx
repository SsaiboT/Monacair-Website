import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Users } from 'lucide-react'

export default function CrewManagement() {
  const t = useTranslations('Management.crewManagement')

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-[color:var(--color-redmonacair)]/10 flex items-center justify-center mb-6">
            <Users className="h-8 w-8 text-[color:var(--color-redmonacair)]" />
          </div>
          <h2 className="text-3xl font-bold text-black mb-4 font-brother">{t('title')}</h2>
          <div className="max-w-3xl">
            <p className="text-black font-brother">{t('description')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/index/sport.webp"
              alt="Équipage certifié"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0  flex items-end p-6">
              <h3 className="text-white text-xl font-bold font-brother drop-shadow-lg">
                Formation et Certification
              </h3>
            </div>
          </div>

          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/index/gastronomie.webp"
              alt="Équipage dédié"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0  flex items-end p-6">
              <h3 className="text-white text-xl font-bold font-brother drop-shadow-lg">
                Équipage Dédié
              </h3>
            </div>
          </div>

          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/index/culture.webp"
              alt="Service flexible"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0  flex items-end p-6">
              <h3 className="text-white text-xl font-bold font-brother drop-shadow-lg">
                Service Flexible
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
