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
  const [loading, setLoading] = useState(false)
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = t('validation.name')
    }

    if (!phone.trim()) {
      newErrors.phone = t('validation.phone')
    }

    if (!email.trim()) {
      newErrors.email = t('validation.email')
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('validation.emailFormat')
    }

    if (isCompany && !companyName.trim()) {
      newErrors.companyName = t('validation.companyName')
    }

    if (!selectedExperienceId) {
      newErrors.experience = t('validation.experience')
    }

    if (!date) {
      newErrors.date = t('validation.date')
    } else if (!isDateAvailable(date)) {
      newErrors.date = t('validation.dateAvailable')
    }

    if (!passengers) {
      newErrors.passengers = t('validation.passengers')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      const formData = {
        name,
        phone,
        email,
        companyName: isCompany ? companyName : '',
        experienceId: selectedExperienceId,
        date,
        passengers: parseInt(passengers),
        experience: selectedExperience,
      }

      const response = await fetch('/api/form-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert(t('success.message'))
        setName('')
        setPhone('')
        setEmail('')
        setCompanyName('')
        setIsCompany(false)
        setSelectedExperienceId('')
        setSelectedExperience(null)
        setDate('')
        setPassengers('2')
      } else {
        throw new Error(t('error.submission'))
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert(t('error.submission'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-royalblue py-20" id="booking-form">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center font-brother text-white">
          {t('title')}
        </h2>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium font-brother text-royalblue">
                {t('fields.name')} *
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={cn('w-full', errors.name && 'border-red-500')}
                placeholder={t('placeholders.name')}
              />
              {errors.name && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium font-brother text-royalblue">
                {t('fields.phone')} *
              </label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={cn('w-full', errors.phone && 'border-red-500')}
                placeholder={t('placeholders.phone')}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium font-brother text-royalblue">
                {t('fields.email')} *
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn('w-full', errors.email && 'border-red-500')}
                placeholder={t('placeholders.email')}
              />
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isCompany"
                  checked={isCompany}
                  onCheckedChange={(checked) => setIsCompany(checked as boolean)}
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
                  <Input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={cn('w-full', errors.companyName && 'border-red-500')}
                    placeholder={t('placeholders.companyName')}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.companyName}
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
              <Select value={selectedExperienceId} onValueChange={handleExperienceChange}>
                <SelectTrigger className={cn('w-full', errors.experience && 'border-red-500')}>
                  <SelectValue placeholder={t('placeholders.experience')} />
                </SelectTrigger>
                <SelectContent>
                  {experiences.map((experience) => (
                    <SelectItem key={experience.id} value={experience.id}>
                      {experience.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.experience && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.experience}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium font-brother text-royalblue">
                {t('fields.date')} *
              </label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={cn('w-full', errors.date && 'border-red-500')}
                min={selectedExperience?.availability?.minimum || undefined}
                max={selectedExperience?.availability?.maximum || undefined}
              />
              {errors.date && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.date}
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
              <Select
                value={passengers}
                onValueChange={setPassengers}
                disabled={!selectedExperience}
              >
                <SelectTrigger className={cn('w-full', errors.passengers && 'border-red-500')}>
                  <SelectValue placeholder={t('placeholders.passengers')} />
                </SelectTrigger>
                <SelectContent>
                  {getPassengerOptions().map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.passengers && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.passengers}
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

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-6 bg-redmonacair hover:bg-redmonacair/90 text-white font-brother"
          >
            {loading ? t('button.loading') : t('button.submit')}
          </Button>

          <div className="mt-6 text-center text-sm text-gray-600 font-brother">
            <p>{t('footer.message')}</p>
          </div>
        </form>
      </div>
    </div>
  )
}
