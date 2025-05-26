'use server'

import { getPayloadClient } from '@/lib/payload'
import type { Destination, RegularFlight } from '@/payload-types'

export async function getDestinations() {
  try {
    const payload = await getPayloadClient()
    const response = await payload.find({
      collection: 'destinations',
      limit: 100,
    })
    return response.docs || []
  } catch (error) {
    console.error('Error fetching destinations:', error)
    return []
  }
}

export async function getRegularFlights() {
  try {
    const payload = await getPayloadClient()
    const response = await payload.find({
      collection: 'regular-flights',
      limit: 100,
    })
    return response.docs || []
  } catch (error) {
    console.error('Error fetching regular flights:', error)
    return []
  }
}

export async function getRouteDetails(departureId: string, arrivalId: string) {
  try {
    const payload = await getPayloadClient()
    const response = await payload.find({
      collection: 'regular-flights',
      where: {
        $or: [
          {
            $and: [
              { 'start_point.id': { equals: departureId } },
              { 'end_point.id': { equals: arrivalId } },
            ],
          },
          {
            $and: [
              { 'start_point.id': { equals: arrivalId } },
              { 'end_point.id': { equals: departureId } },
            ],
          },
        ],
      },
      depth: 2,
    })

    if (response.docs.length === 0) return null

    const routeData = response.docs[0]
    const isReversed =
      routeData.start_point &&
      typeof routeData.start_point !== 'string' &&
      routeData.start_point.id === arrivalId

    return {
      ...routeData,
      reversed: isReversed,
    }
  } catch (error) {
    console.error('Error fetching route details:', error)
    return null
  }
}

export async function getRouteDetailsBySlug(slug: Destination['slug'][]) {
  try {
    const payload = await getPayloadClient()
    let flight = await payload.find({
      collection: 'regular-flights',
      where: {
        start_point__slug: {
          equals: slug[0],
        },
        end_point__slug: {
          equals: slug[1],
        },
      },
      depth: 2,
    })

    if (flight.docs.length !== 0) {
      return {
        ...flight.docs[0],
        reversed: false,
      }
    }

    flight = await payload.find({
      collection: 'regular-flights',
      where: {
        start_point__slug: {
          equals: slug[1],
        },
        end_point__slug: {
          equals: slug[0],
        },
      },
      depth: 2,
    })

    if (flight.docs.length !== 0) {
      return {
        ...flight.docs[0],
        reversed: true,
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching route details by slug:', error)
    return null
  }
}

export async function getDestinationByID(id: string) {
  try {
    const payload = await getPayloadClient()
    const destination = await payload.findByID({
      collection: 'destinations',
      id,
      depth: 1,
    })
    return destination as Destination
  } catch (error) {
    console.error(`Error fetching destination with ID ${id}:`, error)
    return null
  }
}

export async function getFlightTimeslots(routeData: RegularFlight) {
  try {
    if (!routeData || !routeData.time_frames) {
      return generateDefaultTimeSlots()
    }

    const firstDeparture = routeData.time_frames.first_departure || '08:00'
    const lastDeparture = routeData.time_frames.last_departure || '20:00'
    const frequency = routeData.time_frames.frequency || 30

    return generateTimeSlots(firstDeparture, lastDeparture, frequency)
  } catch (error) {
    console.error('Error generating flight timeslots:', error)
    return generateDefaultTimeSlots()
  }
}

function generateDefaultTimeSlots() {
  return generateTimeSlots('08:00', '20:00', 30)
}

function generateTimeSlots(firstDeparture: string, lastDeparture: string, frequency: number) {
  const times: string[] = []

  const firstTime = parseTimeString(firstDeparture)
  const lastTime = parseTimeString(lastDeparture)

  if (!firstTime || !lastTime) {
    console.error('Invalid time format in time frames')
    return []
  }

  const firstTimeMinutes = firstTime.hour * 60 + firstTime.minute
  const lastTimeMinutes = lastTime.hour * 60 + lastTime.minute

  if (firstTimeMinutes > lastTimeMinutes) {
    console.error('First departure time is after last departure time')
    return []
  }

  let currentTimeInMinutes = firstTimeMinutes

  times.push(formatTime(firstTime.hour, firstTime.minute))

  currentTimeInMinutes += frequency
  while (currentTimeInMinutes < lastTimeMinutes) {
    const hour = Math.floor(currentTimeInMinutes / 60)
    const minute = currentTimeInMinutes % 60
    times.push(formatTime(hour, minute))
    currentTimeInMinutes += frequency
  }

  if (currentTimeInMinutes - frequency < lastTimeMinutes) {
    times.push(formatTime(lastTime.hour, lastTime.minute))
  }

  return times
}

function parseTimeString(timeString: string) {
  const match = timeString.match(/^(\d{1,2}):(\d{2})$/)
  if (!match) return null

  const hour = parseInt(match[1], 10)
  const minute = parseInt(match[2], 10)

  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null

  return { hour, minute }
}

function formatTime(hour: number, minute: number) {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
}
