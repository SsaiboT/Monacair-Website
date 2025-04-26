import React from 'react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'

const CustomJets = () => {
  const t = useTranslations('PrivateJet.customJets')

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 mx-auto">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-brother font-medium text-royalblue mb-6 text-center">
            {t('title')}
          </h2>
          <p className="text-base md:text-lg text-center max-w-3xl text-gray-700 font-brother">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-royalblue/20 hover:border-royalblue group overflow-hidden">
            <div className="flex flex-col h-full">
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
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-brother font-medium mb-2 text-royalblue">
                {t('features.personalized.title')}
              </h3>
              <p className="text-gray-700 font-brother flex-grow">
                {t('features.personalized.description')}
              </p>
            </div>
          </Card>

          <Card className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-royalblue/20 hover:border-royalblue group overflow-hidden">
            <div className="flex flex-col h-full">
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
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-brother font-medium mb-2 text-royalblue">
                {t('features.vip.title')}
              </h3>
              <p className="text-gray-700 font-brother flex-grow">
                {t('features.vip.description')}
              </p>
            </div>
          </Card>

          <Card className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-royalblue/20 hover:border-royalblue group overflow-hidden">
            <div className="flex flex-col h-full">
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
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-brother font-medium mb-2 text-royalblue">
                {t('features.comfort.title')}
              </h3>
              <p className="text-gray-700 font-brother flex-grow">
                {t('features.comfort.description')}
              </p>
            </div>
          </Card>

          <Card className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-royalblue/20 hover:border-royalblue group overflow-hidden">
            <div className="flex flex-col h-full">
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
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-brother font-medium mb-2 text-royalblue">
                {t('features.discretion.title')}
              </h3>
              <p className="text-gray-700 font-brother flex-grow">
                {t('features.discretion.description')}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default CustomJets
