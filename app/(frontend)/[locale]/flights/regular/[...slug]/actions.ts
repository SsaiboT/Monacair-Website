'use server'

import payload from '@/lib/payload'
import { Destination } from '@/payload-types'

export const searchRoute = async (slug: Destination['slug'][]) => {
  try {
    console.log('slug', slug)
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
    })

    if (flight.docs.length !== 0) return flight.docs[0]

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
    })

    if (flight.docs.length !== 0) return flight.docs[0]

    throw new Error('No route found for the following slug.')
  } catch (e) {
    console.error(e, slug)
    return null
  }
}
