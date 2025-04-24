'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Users, Luggage, Briefcase, Check, ChevronRight, ChevronLeft } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface HelicopterSelectionProps {
  flightType: string
  selectedHelicopter: string
  setSelectedHelicopter: (helicopter: string) => void
  needsVipWelcome: boolean
  setNeedsVipWelcome: (needs: boolean) => void
  needsLimousine: boolean
  setNeedsLimousine: (needs: boolean) => void
  needsOtherService: boolean
  setNeedsOtherService: (needs: boolean) => void
  otherServiceDetails: string
  setOtherServiceDetails: (details: string) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
}

export default function HelicopterSelection({
  flightType,
  selectedHelicopter,
  setSelectedHelicopter,
  needsVipWelcome,
  setNeedsVipWelcome,
  needsLimousine,
  setNeedsLimousine,
  needsOtherService,
  setNeedsOtherService,
  otherServiceDetails,
  setOtherServiceDetails,
  goToNextStep,
  goToPreviousStep,
}: HelicopterSelectionProps) {
  const t = useTranslations('RegularLine.Reservation')

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t('helicopterSelection.title')}</CardTitle>
        <CardDescription>{t('helicopterSelection.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {flightType === 'vol-prive' ? (
          <>
            <div className="grid grid-cols-1 gap-6">
              <div
                className={`border rounded-lg p-4 ${selectedHelicopter === 'h125' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/3">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="H125 Mono moteur"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">H125 Mono moteur</h3>
                      <span className="text-xl font-bold text-primary">1 500€</span>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center mb-1">
                        <Users className="h-4 w-4 text-gray-500 mr-2" />
                        <span>
                          {t('helicopterSelection.capacity')}: 5{' '}
                          {t('helicopterSelection.passengers')}
                        </span>
                      </div>
                      <div className="flex items-center mb-1">
                        <Luggage className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{t('helicopterSelection.suitcases')}: 3</span>
                        <Briefcase className="h-4 w-4 text-gray-500 ml-4 mr-2" />
                        <span>{t('helicopterSelection.cabin')}: 5</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">{t('helicopterSelection.included')}:</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <span>{t('helicopterSelection.vipWelcome')}</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <span>{t('helicopterSelection.driverService')}</span>
                        </li>
                      </ul>
                    </div>
                    <Button
                      type="button"
                      className={`${selectedHelicopter === 'h125' ? 'bg-primary/90 hover:bg-primary' : 'bg-primary hover:bg-primary/90'} text-white`}
                      onClick={() => setSelectedHelicopter('h125')}
                    >
                      {selectedHelicopter === 'h125'
                        ? t('helicopterSelection.selected')
                        : t('helicopterSelection.book')}
                    </Button>
                  </div>
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 ${selectedHelicopter === 'h130' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/3">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="H130 Mono moteur"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">H130 Mono moteur</h3>
                      <span className="text-xl font-bold text-primary">1 800€</span>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center mb-1">
                        <Users className="h-4 w-4 text-gray-500 mr-2" />
                        <span>
                          {t('helicopterSelection.capacity')}: 6{' '}
                          {t('helicopterSelection.passengers')}
                        </span>
                      </div>
                      <div className="flex items-center mb-1">
                        <Luggage className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{t('helicopterSelection.suitcases')}: 4</span>
                        <Briefcase className="h-4 w-4 text-gray-500 ml-4 mr-2" />
                        <span>{t('helicopterSelection.cabin')}: 6</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">{t('helicopterSelection.included')}:</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <span>{t('helicopterSelection.vipWelcome')}</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <span>{t('helicopterSelection.driverService')}</span>
                        </li>
                      </ul>
                    </div>
                    <Button
                      type="button"
                      className={`${selectedHelicopter === 'h130' ? 'bg-primary/90 hover:bg-primary' : 'bg-primary hover:bg-primary/90'} text-white`}
                      onClick={() => setSelectedHelicopter('h130')}
                    >
                      {selectedHelicopter === 'h130'
                        ? t('helicopterSelection.selected')
                        : t('helicopterSelection.book')}
                    </Button>
                  </div>
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 ${selectedHelicopter === 'as355' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/3">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="AS355 Bi-moteur"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">AS355 Bi-moteur</h3>
                      <span className="text-xl font-bold text-primary">2 200€</span>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center mb-1">
                        <Users className="h-4 w-4 text-gray-500 mr-2" />
                        <span>
                          {t('helicopterSelection.capacity')}: 5{' '}
                          {t('helicopterSelection.passengers')}
                        </span>
                      </div>
                      <div className="flex items-center mb-1">
                        <Luggage className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{t('helicopterSelection.suitcases')}: 3</span>
                        <Briefcase className="h-4 w-4 text-gray-500 ml-4 mr-2" />
                        <span>{t('helicopterSelection.cabin')}: 5</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">{t('helicopterSelection.included')}:</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <span>{t('helicopterSelection.vipWelcome')}</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <span>{t('helicopterSelection.driverService')}</span>
                        </li>
                      </ul>
                    </div>
                    <Button
                      type="button"
                      className={`${selectedHelicopter === 'as355' ? 'bg-primary/90 hover:bg-primary' : 'bg-primary hover:bg-primary/90'} text-white`}
                      onClick={() => setSelectedHelicopter('as355')}
                    >
                      {selectedHelicopter === 'as355'
                        ? t('helicopterSelection.selected')
                        : t('helicopterSelection.book')}
                    </Button>
                  </div>
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 ${selectedHelicopter === 'h135' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/3">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="H135 Bi-moteur"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">H135 Bi-moteur</h3>
                      <span className="text-xl font-bold text-primary">2 500€</span>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center mb-1">
                        <Users className="h-4 w-4 text-gray-500 mr-2" />
                        <span>
                          {t('helicopterSelection.capacity')}: 6{' '}
                          {t('helicopterSelection.passengers')}
                        </span>
                      </div>
                      <div className="flex items-center mb-1">
                        <Luggage className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{t('helicopterSelection.suitcases')}: 4</span>
                        <Briefcase className="h-4 w-4 text-gray-500 ml-4 mr-2" />
                        <span>{t('helicopterSelection.cabin')}: 6</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">{t('helicopterSelection.included')}:</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <span>{t('helicopterSelection.vipWelcome')}</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <span>{t('helicopterSelection.driverService')}</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <span>{t('helicopterSelection.snacks')}</span>
                        </li>
                      </ul>
                    </div>
                    <Button
                      type="button"
                      className={`${selectedHelicopter === 'h135' ? 'bg-primary/90 hover:bg-primary' : 'bg-primary hover:bg-primary/90'} text-white`}
                      onClick={() => setSelectedHelicopter('h135')}
                    >
                      {selectedHelicopter === 'h135'
                        ? t('helicopterSelection.selected')
                        : t('helicopterSelection.book')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-4">
                {t('helicopterSelection.customizeTitle')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vipWelcome"
                    checked={needsVipWelcome}
                    onCheckedChange={setNeedsVipWelcome}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="vipWelcome"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('helicopterSelection.vipWelcomeAtDoor')}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {t('helicopterSelection.onRequest')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="limousine"
                    checked={needsLimousine}
                    onCheckedChange={setNeedsLimousine}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="limousine"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('helicopterSelection.limousineService')}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {t('helicopterSelection.onRequest')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="otherService"
                    checked={needsOtherService}
                    onCheckedChange={setNeedsOtherService}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="otherService"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('helicopterSelection.otherService')}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {t('helicopterSelection.onRequest')}
                    </p>
                  </div>
                </div>

                {needsOtherService && (
                  <div className="pl-6 border-l-2 border-gray-200">
                    <Label htmlFor="otherServiceDetails">
                      {t('helicopterSelection.specifyRequest')}
                    </Label>
                    <Textarea
                      id="otherServiceDetails"
                      value={otherServiceDetails}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setOtherServiceDetails(e.target.value)
                      }
                      placeholder={t('helicopterSelection.describeService')}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <h3 className="text-xl font-medium mb-4">{t('helicopterSelection.regularLine')}</h3>
            <p className="text-gray-600 mb-6">{t('helicopterSelection.regularLineDescription')}</p>
            <div className="relative h-64 max-w-md mx-auto rounded-lg overflow-hidden mb-6">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt={t('helicopterSelection.regularLineHelicopter')}
                fill
                className="object-cover"
              />
            </div>
            <div className="max-w-md mx-auto">
              <h4 className="font-medium mb-2">{t('helicopterSelection.includedInFlight')}:</h4>
              <ul className="space-y-2 text-left">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>{t('helicopterSelection.luggageTransport')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>{t('helicopterSelection.transferToCenter')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>{t('helicopterSelection.panoramicView')}</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 border-t border-gray-200 rounded-b-lg flex justify-between">
        <Button type="button" onClick={goToPreviousStep} variant="white">
          <ChevronLeft className="mr-2 h-4 w-4" /> {t('buttons.previousStep')}
        </Button>
        <Button
          type="button"
          onClick={goToNextStep}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          {t('buttons.nextStep')} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
