import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { RegularFlight, Destination } from '@/payload-types'

interface BookingFormProps {
  initialRouteData?: RegularFlight | null
  initialStartPoint?: Destination | null
  initialEndPoint?: Destination | null
  initialIsReversed?: boolean
}

export default function BookingForm({
  initialRouteData,
  initialStartPoint,
  initialEndPoint,
  initialIsReversed,
}: BookingFormProps) {
  const t = useTranslations('RegularLine.booking-form')

  return (
    <section className="py-8 sm:py-12 md:py-16 relative">
      <div className="absolute inset-0 bg-royalblue transform -skew-y-3 origin-top-right z-0"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-4 sm:pt-6 md:pt-12">
        <div className="max-w-4xl mx-auto text-white">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 font-brother">
              {t('title')}
            </h2>
            <p className="text-sm sm:text-lg max-w-2xl mx-auto font-brother">{t('subtitle')}</p>
          </div>

          <div className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 sm:p-6 md:p-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 font-brother text-royalblue">
                {t('form.title')}
              </h3>
              <div className="grid gap-3 sm:gap-4 md:gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  <div className="w-full">
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 font-brother text-royalblue">
                      {t('form.departure.label')}
                    </label>
                    <Select defaultValue="nice">
                      <SelectTrigger className="border-royalblue w-full h-10">
                        <SelectValue placeholder={t('form.departure.placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nice">{t('form.departure.options.nice')}</SelectItem>
                        <SelectItem value="monaco">{t('form.departure.options.monaco')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full">
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 font-brother text-royalblue">
                      {t('form.arrival.label')}
                    </label>
                    <Select defaultValue="monaco">
                      <SelectTrigger className="border-royalblue w-full h-10">
                        <SelectValue placeholder={t('form.arrival.placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monaco">{t('form.arrival.options.monaco')}</SelectItem>
                        <SelectItem value="nice">{t('form.arrival.options.nice')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  <div className="w-full">
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 font-brother text-royalblue">
                      {t('form.date.label')}
                    </label>
                    <Input type="date" className="border-royalblue w-full h-10" />
                  </div>
                  <div className="w-full">
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 font-brother text-royalblue">
                      {t('form.time.label')}
                    </label>
                    <Select defaultValue="0800">
                      <SelectTrigger className="border-royalblue w-full h-10">
                        <SelectValue placeholder={t('form.time.placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          '0800',
                          '0830',
                          '0900',
                          '0930',
                          '1000',
                          '1030',
                          '1100',
                          '1130',
                          '1200',
                        ].map((time) => (
                          <SelectItem key={time} value={time}>
                            {time.slice(0, 2)}:{time.slice(2, 4)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full sm:col-span-2 md:col-span-1">
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 font-brother text-royalblue">
                      {t('form.passengers.label')}
                    </label>
                    <Select defaultValue="1">
                      <SelectTrigger className="border-royalblue w-full h-10">
                        <SelectValue placeholder={t('form.passengers.placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}{' '}
                            {num > 1 ? t('form.passengers.multiple') : t('form.passengers.single')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Link href="/regular-line/reservation" className="inline-block w-full">
                  <Button
                    size="lg"
                    className="bg-redmonacair hover:bg-redmonacair/90 text-white font-brother w-full mt-2 sm:mt-4 h-12"
                  >
                    {t('form.bookNow')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
