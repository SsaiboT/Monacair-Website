import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Plane } from 'lucide-react'

export default function Charter() {
  const t = useTranslations('Management.charter')

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="md:w-1/2 order-2 md:order-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[color:var(--color-redmonacair)]/10 flex items-center justify-center mr-4">
                <Plane className="h-6 w-6 text-[color:var(--color-redmonacair)]" />
              </div>
              <h2 className="text-3xl font-bold text-black font-brother">{t('title')}</h2>
            </div>

            <p className="text-black font-brother">{t('description')}</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-[color:var(--color-redmonacair)]">
                  Sud de la France
                </h3>
                <p className="text-black">Monaco, Nice, Cannes, Saint-Tropez, Marseille</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-[color:var(--color-redmonacair)]">
                  Les Alpes
                </h3>
                <p className="text-black">Courchevel, Megève, Val d&apos;Isère, Chamonix</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-[color:var(--color-redmonacair)]">
                  Italie
                </h3>
                <p className="text-black">Milan, Portofino, Sardaigne, Toscane</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-[color:var(--color-redmonacair)]">
                  Corse
                </h3>
                <p className="text-black">Ajaccio, Calvi, Figari, Bastia</p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 w-full h-[300px] md:h-[500px] relative mb-8 md:mb-0 order-1 md:order-2">
            <Image
              src="/images/index/private.webp"
              alt="Charter et affrètement"
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
