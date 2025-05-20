'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextNav,
  CarouselPreviousNav,
} from '@/components/ui/carousel'
import { Event } from '@/payload-types'

const EventsCarousel = () => {
  const locale = useLocale()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/Events?limit=100&locale=${locale}`)
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        const data = await response.json()
        setEvents(data.docs || [])
      } catch (error) {
        console.error('Error fetching events:', error)
        setError('Failed to load events')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [locale])

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading events...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center h-full">{error}</div>
  }

  if (events.length === 0) {
    return <div className="flex items-center justify-center h-full">No events found</div>
  }

  return (
    <Carousel className={'w-full flex flex-col'}>
      <div>
        <CarouselPreviousNav />
        <CarouselNextNav />
      </div>
      <CarouselContent className="h-full">
        {events.map((item: any) => (
          <CarouselItem
            className="xl:basis-1/4 2xl:basis-1/5 relative h-[300px] sm:h-[400px]"
            key={item.id}
          >
            <div className="absolute">
              <Image
                src={item.carousel_image.url || '/images/placeholder.png'}
                alt={item.carousel_image.alt || 'Event image'}
                width={item.carousel_image.width}
                height={item.carousel_image.height}
                className="object-cover object-center h-[300px] sm:h-[400px] w-full rounded-md"
              />
              <div className="absolute inset-0 bg-black/20 rounded-md" />
            </div>
            <div className="relative p-3">
              <h2 className="font-brother font text-2xl text-white">{item.title}</h2>
              <h3 className="font-brother text-sm text-white w-2/3">{item.carousel_subtitle}</h3>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default EventsCarousel
