import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { searchRoute } from '@/app/(frontend)/[locale]/flights/regular/[...slug]/actions'
import { Destination } from '@/payload-types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRegularFlight = async (slug: Destination['slug'][]) =>
  await searchRoute(slug).then(async (res) =>
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
