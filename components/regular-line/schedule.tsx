import React from 'react'
import { Clock } from 'lucide-react'
import { RegularFlight, Destination } from '@/payload-types'
import { useTranslations } from 'next-intl'

interface ScheduleProps {
  routeData: RegularFlight
  startPoint?: Destination | null
  endPoint?: Destination | null
}

export default function Schedule({ routeData, startPoint, endPoint }: ScheduleProps) {
  const t = useTranslations('RegularLine.schedule')

  const frequencyMinutes = routeData?.time_frames?.frequency || 10
  const flightDurationMinutes = routeData?.time_frames?.average_flight_duration || 7

  const startName =
    startPoint?.title ||
    (typeof routeData?.start_point === 'object' ? routeData?.start_point?.title : 'Departure')
  const endName =
    endPoint?.title ||
    (typeof routeData?.end_point === 'object' ? routeData?.end_point?.title : 'Arrival')

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 font-brother text-royalblue">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto font-brother text-royalblue">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="bg-white p-5 sm:p-8 rounded-lg shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-redmonacair"></div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 pl-3 sm:pl-4 font-brother text-royalblue">
              {startName} → {endName}
            </h3>
            <div className="space-y-4 sm:space-y-6 pl-3 sm:pl-4">
              <div className="relative pl-6 sm:pl-8 border-l-2 border-dashed border-gray-300">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-redmonacair"></div>
                <p className="font-semibold font-brother text-royalblue">Premier départ</p>
                <p className="text-gray-600 text-sm sm:text-base font-brother">08:00</p>
              </div>
              <div className="relative pl-6 sm:pl-8 border-l-2 border-dashed border-gray-300">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-redmonacair"></div>
                <p className="font-semibold font-brother text-royalblue">Fréquence</p>
                <p className="text-gray-600 text-sm sm:text-base font-brother">
                  Toutes les {frequencyMinutes} minutes pendant les heures de pointe
                </p>
              </div>
              <div className="relative pl-6 sm:pl-8">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-redmonacair"></div>
                <p className="font-semibold font-brother text-royalblue">Dernier vol</p>
                <p className="text-gray-600 text-sm sm:text-base font-brother">19:00</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 sm:p-8 rounded-lg shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-redmonacair"></div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 pl-3 sm:pl-4 font-brother text-royalblue">
              {endName} → {startName}
            </h3>
            <div className="space-y-4 sm:space-y-6 pl-3 sm:pl-4">
              <div className="relative pl-6 sm:pl-8 border-l-2 border-dashed border-gray-300">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-redmonacair"></div>
                <p className="font-semibold font-brother text-royalblue">Premier départ</p>
                <p className="text-gray-600 text-sm sm:text-base font-brother">08:30</p>
              </div>
              <div className="relative pl-6 sm:pl-8 border-l-2 border-dashed border-gray-300">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-redmonacair"></div>
                <p className="font-semibold font-brother text-royalblue">Fréquence</p>
                <p className="text-gray-600 text-sm sm:text-base font-brother">
                  Toutes les {frequencyMinutes} minutes pendant les heures de pointe
                </p>
              </div>
              <div className="relative pl-6 sm:pl-8">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-redmonacair"></div>
                <p className="font-semibold font-brother text-royalblue">Dernier vol</p>
                <p className="text-gray-600 text-sm sm:text-base font-brother">19:30</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-8 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-4">
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-redmonacair" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold mb-2 font-brother text-royalblue">
                {t('flight-time.title')}
              </h3>
              <p className="font-brother text-sm sm:text-base text-royalblue">
                {t('flight-time.description')} {t('flight-time.average')}: {flightDurationMinutes}{' '}
                minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
