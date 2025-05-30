import React from 'react'
import type { Experience } from '@/payload-types'
import { ExperienceBookingForm } from '@/components/shared/experiences/experience-booking-form'

interface BookingFormProps {
  experiences?: Experience[]
}

export default function BookingForm({ experiences = [] }: BookingFormProps) {
  return <ExperienceBookingForm experiences={experiences} experienceType="lifestyle" />
}
