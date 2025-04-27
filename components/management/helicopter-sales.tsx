import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function HelicopterSales() {
  const t = useTranslations('Management.helicopterSales')

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 h-[300px] md:h-[500px] relative mb-8 md:mb-0">
            <Image
              src="/images/index/private.webp"
              alt="Achat et vente d'hélicoptères"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-black mb-6 font-brother">{t('title')}</h2>

            <div className="space-y-6">
              <div>
                <p className="text-black font-brother mb-4">{t('buyDescription')}</p>
              </div>

              <div>
                <p className="text-black font-brother mb-4">{t('inspectionDescription')}</p>
              </div>

              <div>
                <p className="text-black font-brother">{t('sellDescription')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
