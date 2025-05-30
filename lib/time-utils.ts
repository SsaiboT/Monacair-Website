export interface TimeFrames {
  first_departure: string
  last_departure: string
  frequency: number
  average_flight_duration?: number
  return_departure_delay?: number
}

export const parseTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export const formatMinutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}

export const generateDefaultTimeSlots = (): string[] => [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
]

export const generateTimeSlots = (
  timeFrames: TimeFrames | null,
  isReversed: boolean = false,
): string[] => {
  if (!timeFrames?.first_departure || !timeFrames?.last_departure || !timeFrames?.frequency) {
    return generateDefaultTimeSlots()
  }

  const {
    first_departure,
    last_departure,
    frequency,
    average_flight_duration = 0,
    return_departure_delay = 0,
  } = timeFrames

  let startMinutes = parseTimeToMinutes(first_departure)

  if (isReversed && average_flight_duration && return_departure_delay) {
    startMinutes += average_flight_duration + return_departure_delay
  }

  const endMinutes = parseTimeToMinutes(last_departure)
  const timeSlots: string[] = []
  let currentMinutes = startMinutes

  const adjustment = isReversed ? average_flight_duration + return_departure_delay : 0

  while (currentMinutes <= endMinutes + adjustment) {
    timeSlots.push(formatMinutesToTime(currentMinutes))
    currentMinutes += frequency
  }

  return timeSlots.length > 0 ? timeSlots : generateDefaultTimeSlots()
}

export const generateReturnTimeSlots = (
  timeFrames: TimeFrames | null,
  isReversed: boolean = false,
): string[] => {
  return generateTimeSlots(timeFrames, !isReversed)
}

export const getMinDate = (daysOffset: number = 1): string => {
  const date = new Date()
  date.setDate(date.getDate() + daysOffset)
  return date.toISOString().split('T')[0]
}

export const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0]
}
