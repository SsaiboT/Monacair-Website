'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

interface ProgressStepsProps {
  currentStep: number
}

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const t = useTranslations('RegularLine.Reservation')

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        <div
          className={`flex flex-col items-center ${currentStep >= 1 ? 'text-primary' : 'text-gray-400'}`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}
          >
            1
          </div>
          <span className="text-sm font-medium">{t('steps.flightDetails')}</span>
        </div>
        <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
        <div
          className={`flex flex-col items-center ${currentStep >= 2 ? 'text-primary' : 'text-gray-400'}`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}
          >
            2
          </div>
          <span className="text-sm font-medium">{t('steps.helicopter')}</span>
        </div>
        <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
        <div
          className={`flex flex-col items-center ${currentStep >= 3 ? 'text-primary' : 'text-gray-400'}`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}
          >
            3
          </div>
          <span className="text-sm font-medium">{t('steps.contact')}</span>
        </div>
      </div>
    </div>
  )
}
