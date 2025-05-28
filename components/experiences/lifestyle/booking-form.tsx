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
import { useTranslations, useLocale } from 'next-intl'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Experience } from '@/payload-types'

interface BookingFormProps {
  experiences?: Experience[]
}

export default function BookingForm({ experiences = [] }: BookingFormProps) {
  const t = useTranslations('Experiences.lifestyle.Reservation')
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [date, setDate] = useState('')
  const [selectedExperienceId, setSelectedExperienceId] = useState('')
  const [passengers, setPassengers] = useState('2')
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

    if (!selectedExperienceId) {
      newErrors.experience = 'Veuillez sélectionner une expérience'
    }

    if (!date) {
      newErrors.date = 'Veuillez sélectionner une date'
    } else if (!isDateAvailable(date)) {
      newErrors.date = "Cette date n'est pas disponible"
    }

    if (!passengers) {
      newErrors.passengers = 'Veuillez sélectionner le nombre de personnes'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log('Booking data:', {
        experienceId: selectedExperienceId,
        date: date,
        passengers: parseInt(passengers),
        experience: selectedExperience,
      })

      alert('Réservation soumise avec succès!')
    } catch (error) {
      console.error('Booking error:', error)
      alert('Erreur lors de la réservation')
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
                {t('flightDetails.experienceType')}
              </label>
              <Select value={selectedExperienceId} onValueChange={handleExperienceChange}>
                <SelectTrigger className={cn('w-full', errors.experience && 'border-red-500')}>
                  <SelectValue placeholder={t('flightDetails.selectExperience')} />
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
                {t('flightDetails.date')}
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium font-brother text-royalblue">
                {t('flightDetails.passengers')}
              </label>
              <Select
                value={passengers}
                onValueChange={setPassengers}
                disabled={!selectedExperience}
              >
                <SelectTrigger className={cn('w-full', errors.passengers && 'border-red-500')}>
                  <SelectValue placeholder={t('flightDetails.selectPassengers')} />
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
                  Min: {selectedExperience.guests.minimum}, Max: {selectedExperience.guests.maximum}{' '}
                  personnes
                </p>
              )}
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

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-6 bg-redmonacair hover:bg-redmonacair/90 text-white font-brother"
          >
            {loading ? 'Chargement...' : t('checkAvailability')}
          </Button>

          <div className="mt-6 text-center text-sm text-gray-600 font-brother">
            <p>{t('contactInfo')}</p>
          </div>
        </form>
      </div>
    </div>
  )
}
