import { Destination } from '@/payload-types'

const Booking = ({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: Destination['slug'][] }>
  searchParams: Promise<{
    passengers?: string[]
    oneway?: string
    date?: string
    flex?: string
  }>
}) => {}

export default Booking
