'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AdditionalOptionsProps {
  hasRegistrationFee: boolean
  setHasRegistrationFee: (value: boolean) => void
  hasCancellationInsurance: boolean
  setHasCancellationInsurance: (value: boolean) => void
  promoCode: string
  setPromoCode: (value: string) => void
  isValidPromoCode: boolean
}

export default function AdditionalOptions({
  hasRegistrationFee,
  setHasRegistrationFee,
  hasCancellationInsurance,
  setHasCancellationInsurance,
  promoCode,
  setPromoCode,
  isValidPromoCode,
}: AdditionalOptionsProps) {
  const t = useTranslations('Panoramic.Reservation')

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t('additionalOptions.title')}</CardTitle>
        <CardDescription>{t('additionalOptions.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="registrationFee"
            checked={hasRegistrationFee}
            onCheckedChange={setHasRegistrationFee}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="registrationFee"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t('additionalOptions.registrationFee.label')}
            </label>
            <p className="text-sm text-muted-foreground">
              {t('additionalOptions.registrationFee.description')}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="cancellationInsurance"
            checked={hasCancellationInsurance}
            onCheckedChange={setHasCancellationInsurance}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="cancellationInsurance"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t('additionalOptions.cancellationInsurance.label')}
            </label>
            <p className="text-sm text-muted-foreground">
              {t('additionalOptions.cancellationInsurance.description')}
            </p>
          </div>
        </div>

        <div className="pt-4">
          <Label htmlFor="promoCode">{t('additionalOptions.promoCode.label')}</Label>
          <div className="flex gap-2">
            <Input
              id="promoCode"
              placeholder={t('additionalOptions.promoCode.placeholder')}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button type="button" variant="white">
              {t('additionalOptions.promoCode.apply')}
            </Button>
          </div>
          {isValidPromoCode && (
            <p className="text-sm text-green-600 mt-1">
              {t('additionalOptions.promoCode.applied')}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
