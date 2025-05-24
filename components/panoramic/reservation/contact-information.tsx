'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ContactInformationProps {
  firstName: string
  setFirstName: (value: string) => void
  lastName: string
  setLastName: (value: string) => void
  email: string
  setEmail: (value: string) => void
  phone: string
  setPhone: (value: string) => void
  address: string
  setAddress: (value: string) => void
  postalCode: string
  setPostalCode: (value: string) => void
  city: string
  setCity: (value: string) => void
  country: string
  setCountry: (value: string) => void
  createAccount: boolean
  setCreateAccount: (value: boolean) => void
}

export default function ContactInformation({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  address,
  setAddress,
  postalCode,
  setPostalCode,
  city,
  setCity,
  country,
  setCountry,
  createAccount,
  setCreateAccount,
}: ContactInformationProps) {
  const t = useTranslations('Panoramic.Reservation')

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t('contactInformation.title')}</CardTitle>
        <CardDescription>{t('contactInformation.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="new">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="new">{t('contactInformation.tabs.new')}</TabsTrigger>
            <TabsTrigger value="existing">{t('contactInformation.tabs.existing')}</TabsTrigger>
          </TabsList>
          <TabsContent value="new" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">{t('contactInformation.firstName')}</Label>
                <Input
                  id="firstName"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lastName">{t('contactInformation.lastName')}</Label>
                <Input
                  id="lastName"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">{t('contactInformation.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">{t('contactInformation.phone')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">{t('contactInformation.address')}</Label>
              <Input
                id="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="postalCode">{t('contactInformation.postalCode')}</Label>
                <Input
                  id="postalCode"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="city">{t('contactInformation.city')}</Label>
                <Input id="city" required value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
            </div>
            <div>
              <Label htmlFor="country">{t('contactInformation.country')}</Label>
              <Select defaultValue={country} onValueChange={(value) => setCountry(value)}>
                <SelectTrigger id="country">
                  <SelectValue placeholder={t('contactInformation.countryPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="france">{t('contactInformation.countries.france')}</SelectItem>
                  <SelectItem value="monaco">{t('contactInformation.countries.monaco')}</SelectItem>
                  <SelectItem value="italy">{t('contactInformation.countries.italy')}</SelectItem>
                  <SelectItem value="switzerland">
                    {t('contactInformation.countries.switzerland')}
                  </SelectItem>
                  <SelectItem value="uk">{t('contactInformation.countries.uk')}</SelectItem>
                  <SelectItem value="usa">{t('contactInformation.countries.usa')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="createAccount"
                checked={createAccount}
                onCheckedChange={(checked) => setCreateAccount(!!checked)}
              />
              <label
                htmlFor="createAccount"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('contactInformation.createAccount')}
              </label>
            </div>
          </TabsContent>
          <TabsContent value="existing" className="space-y-6">
            <div>
              <Label htmlFor="loginEmail">{t('contactInformation.loginEmail')}</Label>
              <Input id="loginEmail" type="email" required />
            </div>
            <div>
              <Label htmlFor="loginPassword">{t('contactInformation.loginPassword')}</Label>
              <Input id="loginPassword" type="password" required />
            </div>
            <div>
              <button type="button" className="text-royalblue hover:underline p-0">
                {t('contactInformation.forgotPassword')}
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
