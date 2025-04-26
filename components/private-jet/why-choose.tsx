import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

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
          <div className="flex flex-col items-start">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-royalblue mb-6 group-hover:bg-redmonacair transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-brother font-medium mb-3 text-royalblue">
              {t('reasons.flexibility.title')}
            </h3>
            <p className="text-gray-700 font-brother">{t('reasons.flexibility.description')}</p>
          </div>

          <div className="flex flex-col items-start">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-royalblue mb-6 group-hover:bg-redmonacair transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-brother font-medium mb-3 text-royalblue">
              {t('reasons.service.title')}
            </h3>
            <p className="text-gray-700 font-brother">{t('reasons.service.description')}</p>
          </div>

          <div className="flex flex-col items-start">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-royalblue mb-6 group-hover:bg-redmonacair transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </div>
            <h3 className="text-xl font-brother font-medium mb-3 text-royalblue">
              {t('reasons.jets.title')}
            </h3>
            <p className="text-gray-700 font-brother">{t('reasons.jets.description')}</p>
          </div>

          <div className="flex flex-col items-start">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-royalblue mb-6 group-hover:bg-redmonacair transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-brother font-medium mb-3 text-royalblue">
              {t('reasons.security.title')}
            </h3>
            <p className="text-gray-700 font-brother">{t('reasons.security.description')}</p>
          </div>

          <div className="flex flex-col items-start">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-royalblue mb-6 group-hover:bg-redmonacair transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-brother font-medium mb-3 text-royalblue">
              {t('reasons.discretion.title')}
            </h3>
            <p className="text-gray-700 font-brother">{t('reasons.discretion.description')}</p>
          </div>

          <div className="hidden lg:flex lg:items-center lg:justify-center">
            <div className="w-64 h-64 rounded-full flex items-center justify-center">
              <Image
                src="/logos/primary.png"
                alt="Monacair Logo"
                width={800}
                height={600}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChoose
