import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Destination } from '@/payload-types'
import { getRouteDetailsBySlug } from '@/app/(frontend)/[locale]/booking/actions'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRegularFlight = async (slug: Destination['slug'][]) =>
  await getRouteDetailsBySlug(slug)
