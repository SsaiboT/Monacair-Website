import React from 'react'
import { useTranslations } from 'next-intl'

const VipService = () => {
  const t = useTranslations('Booking')

  return (
    <section className="py-16 bg-white">
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-royalblue rounded-2xl shadow-lg p-8 sm:p-12 max-w-full w-full text-white">
          <h2 className="text-3xl sm:text-4xl font-bold font-brother mb-2">
            {t('vip-service.title')}{' '}
            <span className="text-redmonacair">{t('vip-service.title-highlight')}</span>{' '}
            {t('vip-service.title-end')}
          </h2>

          <p className="mb-12 text-lg opacity-90">{t('vip-service.description')}</p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                id: 1,
                title: t('vip-service.lounges.title'),
                desc: t('vip-service.lounges.description'),
              },
              {
                id: 2,
                title: t('vip-service.airport.title'),
                desc: t('vip-service.airport.description'),
              },
            ].map(({ id, title, desc }) => (
              <div key={id} className="p-6 rounded-lg border border-white/20 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-redmonacair text-white flex items-center justify-center font-bold mr-3">
                    {id}
                  </div>
                  <h3 className="text-xl font-bold font-brother">{title}</h3>
                </div>
                <p className="opacity-90">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default VipService
