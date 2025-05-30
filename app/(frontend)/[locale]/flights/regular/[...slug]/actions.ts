'use server'

import { getPayloadClient } from '@/lib/payload'
import { Destination } from '@/payload-types'

export const getRegularFlight = async (slug: Destination['slug'][]) => {
  const searchRoute = async (slug: Destination['slug'][]) => {
    try {
      const payload = await getPayloadClient()
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

  return await searchRoute(slug).then(async (res) =>
    res
      ? {
          ...res,
          reversed: !(
            res &&
            typeof res.start_point !== 'string' &&
            typeof res.end_point !== 'string' &&
            res.start_point.slug === slug[0]
          ),
        }
      : null,
  )
}
