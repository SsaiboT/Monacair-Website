'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function FlightBooking() {
  const t = useTranslations('Panoramic.booking')
  const [flightType, setFlightType] = useState<'shared' | 'private'>('shared')
  const [duration, setDuration] = useState(20)

  return (
    <div className="w-full max-w-full mx-auto">
      <div className="bg-[#002841] rounded-3xl p-8 flex flex-col md:flex-row gap-6">
        <div className="bg-[#003a5c] rounded-2xl p-6 flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#da291c] rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
              1
            </div>
            <h2 className="text-white text-2xl font-medium">{t('flightType')}</h2>
          </div>

          <RadioGroup
            value={flightType}
            onValueChange={(value) => setFlightType(value as 'shared' | 'private')}
            className="space-y-4"
          >
            <label
              className={`flex items-center justify-between bg-[#003a5c] rounded-xl p-4 cursor-pointer border ${
                flightType === 'shared' ? 'border-[#da291c]' : 'border-[#1e5c80]'
              }`}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="shared"
                  className="border-[#da291c] data-[state=checked]:bg-[#da291c]"
                />
                <span className="text-white text-xl">{t('sharedTour')}</span>
              </div>
              <span className="text-gray-400">
                {t('startingFrom')} {t('sharedPrice')}
              </span>
            </label>

            <label
              className={`flex items-center justify-between bg-[#003a5c] rounded-xl p-4 cursor-pointer border ${
                flightType === 'private' ? 'border-[#da291c]' : 'border-[#1e5c80]'
              }`}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="private"
                  className="border-[#da291c] data-[state=checked]:bg-[#da291c]"
                />
                <span className="text-white text-xl">{t('privateTour')}</span>
              </div>
              <span className="text-gray-400">
                {t('startingFrom')} {t('privatePrice')}
              </span>
            </label>
          </RadioGroup>
        </div>

        <div className="bg-[#003a5c] rounded-2xl p-6 flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#da291c] rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
              2
            </div>
            <h2 className="text-white text-2xl font-medium">{t('duration')}</h2>
          </div>

          <div className="flex flex-col items-center justify-center h-[calc(100%-4rem)]">
            <div className="flex items-end gap-2 mb-8">
              <span className="text-[#da291c] text-7xl font-bold">{duration}</span>
              <span className="text-white text-2xl mb-2">{t('minutes')}</span>
            </div>

            <div className="w-full px-2">
              <Slider
                defaultValue={[20]}
                max={60}
                min={10}
                step={5}
                onValueChange={(value) => setDuration(value[0])}
                className="w-full [&_[data-slot=slider-range]]:bg-[color:var(--color-redmonacair)] [&_[data-slot=slider-thumb]]:border-[color:var(--color-redmonacair)]"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#003a5c] rounded-2xl p-6 flex-1 flex flex-col justify-between">
          <div className="flex flex-col items-center justify-center h-[calc(100%-4rem)]">
            <div className="flex flex-col items-center">
              <span className="text-[#da291c] text-7xl font-bold">{t('price')}</span>
              <span className="text-white text-xl">{t('perFlight')}</span>
            </div>
          </div>

          <Button
            variant="red"
            className="text-white py-4 px-6 rounded-full text-xl font-medium w-full bg-[#da291c] hover:bg-red-600 transition-colors"
          >
            {t('bookButton')}
          </Button>
        </div>
      </div>
    </div>
  )
}
