import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Clock, Smile, Plane, Shield, Eye } from 'lucide-react'

const WhyChoose = () => {
  const t = useTranslations('PrivateJet.whyChoose')

  return (
    <section className="w-full py-16 md:py-24 bg-white relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/destinations/hero.webp"
          alt="Private jet interior"
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white"></div>
      </div>

      <div className="container px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 mx-auto relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-brother font-medium text-royalblue mb-6 text-center">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          <div className="flex flex-col items-start p-6 rounded-lg border border-gray-200 relative overflow-hidden group">
            <div className="absolute inset-0 bg-royalblue translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500" />

            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-royalblue mb-6 group-hover:bg-white transition-colors relative z-10">
              <Clock className="w-8 h-8 text-white group-hover:text-royalblue transition-colors" />
            </div>
            <h3 className="text-xl font-brother font-medium mb-3 text-royalblue group-hover:text-white transition-colors relative z-10">
              {t('reasons.flexibility.title')}
            </h3>
            <p className="text-gray-700 font-brother group-hover:text-white/90 transition-colors relative z-10">
              {t('reasons.flexibility.description')}
            </p>
          </div>

          <div className="hidden lg:flex lg:items-center lg:justify-center p-6 rounded-lg border border-gray-200 relative overflow-hidden group">
            <div className="absolute inset-0 bg-royalblue translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500" />
            <div className="w-48 h-48 absolute top-4/5 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full  z-10">
              <Image
                src="/logos/primary.png"
                alt="Monacair Logo"
                width={800}
                height={600}
                className="object-contain group-hover:opacity-0 transition-opacity duration-500 absolute inset-0"
              />
              <Image
                src="/logos/white.png"
                alt="Monacair Logo White"
                width={800}
                height={600}
                className="object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0"
              />
            </div>
          </div>

          <div className="flex flex-col items-start p-6 rounded-lg border border-gray-200 relative overflow-hidden group">
            <div className="absolute inset-0 bg-royalblue translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500" />

            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-royalblue mb-6 group-hover:bg-white transition-colors relative z-10">
              <Smile className="w-8 h-8 text-white group-hover:text-royalblue transition-colors" />
            </div>
            <h3 className="text-xl font-brother font-medium mb-3 text-royalblue group-hover:text-white transition-colors relative z-10">
              {t('reasons.service.title')}
            </h3>
            <p className="text-gray-700 font-brother group-hover:text-white/90 transition-colors relative z-10">
              {t('reasons.service.description')}
            </p>
          </div>

          <div className="flex flex-col items-start p-6 rounded-lg border border-gray-200 relative overflow-hidden group">
            <div className="absolute inset-0 bg-royalblue translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500" />

            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-royalblue mb-6 group-hover:bg-white transition-colors relative z-10">
              <Plane className="w-8 h-8 text-white group-hover:text-royalblue transition-colors" />
            </div>
            <h3 className="text-xl font-brother font-medium mb-3 text-royalblue group-hover:text-white transition-colors relative z-10">
              {t('reasons.jets.title')}
            </h3>
            <p className="text-gray-700 font-brother group-hover:text-white/90 transition-colors relative z-10">
              {t('reasons.jets.description')}
            </p>
          </div>

          <div className="flex flex-col items-start p-6 rounded-lg border border-gray-200 relative overflow-hidden group">
            <div className="absolute inset-0 bg-royalblue translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500" />

            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-royalblue mb-6 group-hover:bg-white transition-colors relative z-10">
              <Shield className="w-8 h-8 text-white group-hover:text-royalblue transition-colors" />
            </div>
            <h3 className="text-xl font-brother font-medium mb-3 text-royalblue group-hover:text-white transition-colors relative z-10">
              {t('reasons.security.title')}
            </h3>
            <p className="text-gray-700 font-brother group-hover:text-white/90 transition-colors relative z-10">
              {t('reasons.security.description')}
            </p>
          </div>

          <div className="flex flex-col items-start p-6 rounded-lg border border-gray-200 relative overflow-hidden group">
            <div className="absolute inset-0 bg-royalblue translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500" />

            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-royalblue mb-6 group-hover:bg-white transition-colors relative z-10">
              <Eye className="w-8 h-8 text-white group-hover:text-royalblue transition-colors" />
            </div>
            <h3 className="text-xl font-brother font-medium mb-3 text-royalblue group-hover:text-white transition-colors relative z-10">
              {t('reasons.discretion.title')}
            </h3>
            <p className="text-gray-700 font-brother group-hover:text-white/90 transition-colors relative z-10">
              {t('reasons.discretion.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChoose
