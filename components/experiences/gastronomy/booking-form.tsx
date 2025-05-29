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
import { Checkbox } from '@/components/ui/checkbox'
import { useTranslations, useLocale } from 'next-intl'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Experience } from '@/payload-types'
import { validateForm, validationConfigs, hasFieldError, getFieldError } from '@/lib/validation'

interface BookingFormProps {
  experiences?: Experience[]
}

export default function BookingForm({ experiences = [] }: BookingFormProps) {
  const t = useTranslations('Experiences.gastronomy.Reservation')
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [selectedExperienceId, setSelectedExperienceId] = useState('')
  const [date, setDate] = useState('')
  const [passengers, setPassengers] = useState('2')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [isCompany, setIsCompany] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const getPassengerOptions = () => {
    if (!selectedExperience) return []

    const options = []
    for (let i = selectedExperience.guests.minimum; i <= selectedExperience.guests.maximum; i++) {
      options.push({
        value: i.toString(),
        label:
          i === 1
            ? t('passengers.one')
            : i === 2
              ? t('passengers.two')
              : i === 3
                ? t('passengers.three')
                : i === 4
                  ? t('passengers.four')
                  : i === 5
                    ? t('passengers.five')
                    : t('passengers.sixOrMore'),
      })
    }
    return options
  }

  const isDateAvailable = (dateString: string) => {
    if (!selectedExperience?.availability || !dateString) return true

    if (selectedExperience.availability.anytime) return true

    if (selectedExperience.availability.minimum && selectedExperience.availability.maximum) {
      const selectedDate = new Date(dateString)
      const minDate = new Date(selectedExperience.availability.minimum)
      const maxDate = new Date(selectedExperience.availability.maximum)
      return selectedDate >= minDate && selectedDate <= maxDate
    }

    return true
  }

  const getDateRangeText = () => {
    if (!selectedExperience?.availability) return ''

    if (selectedExperience.availability.anytime) {
      return "Disponible toute l'année"
    }

    if (selectedExperience.availability.minimum && selectedExperience.availability.maximum) {
      const minDate = new Date(selectedExperience.availability.minimum).toLocaleDateString('fr-FR')
      const maxDate = new Date(selectedExperience.availability.maximum).toLocaleDateString('fr-FR')
      return `Disponible du ${minDate} au ${maxDate}`
    }

    return ''
  }

  const handleExperienceChange = (experienceId: string) => {
    setSelectedExperienceId(experienceId)
    const experience = experiences.find((exp) => exp.id === experienceId)
    setSelectedExperience(experience || null)

    setDate('')
    if (experience) {
      setPassengers(experience.guests.minimum.toString())
    }

    setErrors({})
  }

  const validateFormData = () => {
    const formData = {
      name,
      phone,
      email,
      companyName,
      isCompany,
      experienceId: selectedExperienceId,
      date,
      passengers,
    }

    const validation = validateForm(formData, validationConfigs.gastronomy)

    // Additional custom validation for date availability
    if (date && !isDateAvailable(date)) {
      validation.errors.date = t('validation.dateAvailable')
      validation.isValid = false
    }

    setErrors(validation.errors)
    return validation.isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateFormData()) return
    ;(e.target as HTMLFormElement).submit()
  }

  return (
    <div className="bg-royalblue py-20" id="booking-form">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center font-brother text-white">
          {t('title')}
        </h2>
        <form
          action="https://formsubmit.co/danyamas07@gmail.com"
          method="POST"
          onSubmit={handleSubmit}
          className="bg-white rounded-lg p-8 shadow-lg"
        >
          <input
            type="hidden"
            name="_subject"
            value="Nouvelle réservation d'expérience gastronomique - Monacair"
          />
          <input type="hidden" name="_template" value="table" />
          <input
            type="hidden"
            name="_autoresponse"
            value="Merci pour votre réservation d'expérience gastronomique avec Monacair ! Nous avons bien reçu votre demande et nous vous contacterons dans les plus brefs délais pour confirmer les détails de votre expérience. À bientôt !"
          />

          <input type="hidden" name="experienceName" value={selectedExperience?.name || ''} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium font-brother text-royalblue">
                {t('fields.name')} *
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={cn(
                  'w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-redmonacair focus:border-transparent',
                  hasFieldError(errors, 'name') && 'border-red-500',
                )}
                placeholder={t('placeholders.name')}
                required
              />
              {hasFieldError(errors, 'name') && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {getFieldError(errors, 'name')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium font-brother text-royalblue">
                {t('fields.phone')} *
              </label>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={cn(
                  'w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-redmonacair focus:border-transparent',
                  hasFieldError(errors, 'phone') && 'border-red-500',
                )}
                placeholder={t('placeholders.phone')}
                required
              />
              {hasFieldError(errors, 'phone') && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {getFieldError(errors, 'phone')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium font-brother text-royalblue">
                {t('fields.email')} *
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  'w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-redmonacair focus:border-transparent',
                  hasFieldError(errors, 'email') && 'border-red-500',
                )}
                placeholder={t('placeholders.email')}
                required
              />
              {hasFieldError(errors, 'email') && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {getFieldError(errors, 'email')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isCompany"
                  checked={isCompany}
                  onChange={(e) => setIsCompany(e.target.checked)}
                  className="rounded"
                />
                <label
                  htmlFor="isCompany"
                  className="text-sm font-medium font-brother text-royalblue"
                >
                  {t('fields.companyLabel')}
                </label>
              </div>
              {isCompany && (
                <>
                  <input
                    type="text"
                    name="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={cn(
                      'w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-redmonacair focus:border-transparent',
                      hasFieldError(errors, 'companyName') && 'border-red-500',
                    )}
                    placeholder={t('placeholders.companyName')}
                  />
                  {hasFieldError(errors, 'companyName') && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {getFieldError(errors, 'companyName')}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium font-brother text-royalblue">
                {t('fields.experience')} *
              </label>
              <select
                name="experienceId"
                value={selectedExperienceId}
                onChange={(e) => handleExperienceChange(e.target.value)}
                className={cn(
                  'w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-redmonacair focus:border-transparent',
                  hasFieldError(errors, 'experienceId') && 'border-red-500',
                )}
                required
              >
                <option value="">{t('placeholders.experience')}</option>
                {experiences.map((experience) => (
                  <option key={experience.id} value={experience.id}>
                    {experience.name}
                  </option>
                ))}
              </select>
              {hasFieldError(errors, 'experienceId') && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {getFieldError(errors, 'experienceId')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium font-brother text-royalblue">
                {t('fields.date')} *
              </label>
              <input
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={cn(
                  'w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-redmonacair focus:border-transparent',
                  hasFieldError(errors, 'date') && 'border-red-500',
                )}
                min={selectedExperience?.availability?.minimum || undefined}
                max={selectedExperience?.availability?.maximum || undefined}
                required
              />
              {hasFieldError(errors, 'date') && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {getFieldError(errors, 'date')}
                </p>
              )}
              {selectedExperience && getDateRangeText() && (
                <p className="text-sm text-gray-500">{getDateRangeText()}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium font-brother text-royalblue">
                {t('fields.passengers')} *
              </label>
              <select
                name="passengers"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                disabled={!selectedExperience}
                className={cn(
                  'w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-redmonacair focus:border-transparent',
                  hasFieldError(errors, 'passengers') && 'border-red-500',
                )}
                required
              >
                <option value="">{t('placeholders.passengers')}</option>
                {getPassengerOptions().map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {hasFieldError(errors, 'passengers') && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {getFieldError(errors, 'passengers')}
                </p>
              )}
              {selectedExperience && (
                <p className="text-sm text-gray-500">
                  {t('info.passengerRange', {
                    min: selectedExperience.guests.minimum,
                    max: selectedExperience.guests.maximum,
                  })}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-6 bg-redmonacair hover:bg-redmonacair/90 text-white font-brother rounded-md transition-colors"
          >
            {t('button.submit')}
          </button>

          <div className="mt-6 text-center text-sm text-gray-600 font-brother">
            <p>{t('footer.message')}</p>
          </div>
        </form>
      </div>
    </div>
  )
}
