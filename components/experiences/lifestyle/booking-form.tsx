'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useTranslations } from 'next-intl'

export default function BookingForm() {
  const t = useTranslations('Experiences.lifestyle.Reservation')
  const [date, setDate] = useState('')

  return (
    <div className="bg-royalblue py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center font-brother text-white">
          {t('title')}
        </h2>
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium font-brother text-royalblue">
                {t('flightDetails.experienceType')}
              </label>
              <Select defaultValue="luxury-shopping">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('flightDetails.selectExperience')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="luxury-shopping">{t('experiences.shopping')}</SelectItem>
                  <SelectItem value="spa-wellness">{t('experiences.spa')}</SelectItem>
                  <SelectItem value="yacht-cruise">{t('experiences.yacht')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium font-brother text-royalblue">
                {t('flightDetails.date')}
              </label>
              <Input
                type="text"
                placeholder="JJ/MM/AAAA"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium font-brother text-royalblue">
                {t('flightDetails.passengers')}
              </label>
              <Select defaultValue="2">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('flightDetails.selectPassengers')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">{t('passengers.one')}</SelectItem>
                  <SelectItem value="2">{t('passengers.two')}</SelectItem>
                  <SelectItem value="3">{t('passengers.three')}</SelectItem>
                  <SelectItem value="4">{t('passengers.four')}</SelectItem>
                  <SelectItem value="5">{t('passengers.five')}</SelectItem>
                  <SelectItem value="6">{t('passengers.sixOrMore')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium font-brother text-royalblue">
                {t('flightDetails.package')}
              </label>
              <Select defaultValue="decouverte">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('flightDetails.selectPackage')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="decouverte">{t('packages.discovery')}</SelectItem>
                  <SelectItem value="prestige">{t('packages.prestige')}</SelectItem>
                  <SelectItem value="excellence">{t('packages.excellence')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium font-brother text-royalblue">
                {t('flightDetails.transfer')}
              </label>
              <Select defaultValue="aller-simple">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('flightDetails.selectTransfer')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aller-simple">{t('transfers.oneWay')}</SelectItem>
                  <SelectItem value="aller-retour">{t('transfers.roundTrip')}</SelectItem>
                  <SelectItem value="non">{t('transfers.none')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="w-full py-6 bg-redmonacair hover:bg-redmonacair/90 text-white font-brother">
            {t('checkAvailability')}
          </Button>

          <div className="mt-6 text-center text-sm text-gray-600 font-brother">
            <p>{t('contactInfo')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
