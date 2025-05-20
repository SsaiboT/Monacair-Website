'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import Logo from '@/public/logos/primary.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import DestinationsCarousel from '@/components/nav/carousel'
import EventsCarousel from '@/components/nav/carousel-events'

export default function Navbar() {
  const t = useTranslations('Nav')
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false)
  const [isEventsOpen, setIsEventsOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const toggleDestinations = () => {
    if (isEventsOpen) setIsEventsOpen(false)
    if (isBookingOpen) setIsBookingOpen(false)
    setIsDestinationsOpen((prev) => !prev)
  }

  const toggleEvents = () => {
    if (isDestinationsOpen) setIsDestinationsOpen(false)
    if (isBookingOpen) setIsBookingOpen(false)
    setIsEventsOpen((prev) => !prev)
  }

  const toggleBooking = () => {
    if (isDestinationsOpen) setIsDestinationsOpen(false)
    if (isEventsOpen) setIsEventsOpen(false)
    setIsBookingOpen((prev) => !prev)
  }

  return (
    <nav className={'top-5 fixed left-0 right-0 z-50'}>
      <div className={'bg-white rounded-xl top-5 shadow-md lg:mx-20 xl:mx-40 h-16'}>
        <div className={'flex h-full items-center justify-between px-10'}>
          <Link href={'/'}>
            <Image src={Logo} alt={'logo'} width={200} height={50} />
          </Link>
          <menu className={'flex gap-5 font-brother text-sm'}>
            <div className="relative">
              <button onClick={toggleBooking} className="cursor-pointer">
                {t('book')}
              </button>
            </div>
            <div className="relative">
              <button onClick={toggleDestinations} className="cursor-pointer">
                {t('destinations')}
              </button>
            </div>
            <div className="relative">
              <button onClick={toggleEvents} className="cursor-pointer">
                {t('events')}
              </button>
            </div>
            <Link href="/experiences">{t('experience')}</Link>
            <Link href="/private-jet">{t('jet')}</Link>
            <Link href="/fleet">{t('fleet')}</Link>
            <Link href="/management">{t('services')}</Link>
            <Link href="/about">{t('about')}</Link>
          </menu>
          <div className={'flex items-center justify-center gap-5'}>
            <Link href="/contact">
              <Button size={'sm'} variant={'blue'} className={'font-brother font-light '}>
                {t('CTA')}
              </Button>
            </Link>
            <a href={'tel:+37797973900'}>
              <Phone />
            </a>
          </div>
        </div>
      </div>

      {/* Dropdown panel for Booking with animation */}
      <div
        className={`absolute overflow-hidden rounded-b-2xl transition-all duration-300 ease-in-out left-0 right-0 bg-white shadow-md -translate-y-3 z-40 lg:mx-20 xl:mx-40 ${
          isBookingOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="py-10 px-10">
          {/* Content will be fetched from payload later */}
          <div className="h-[600px] flex items-center justify-center">
            <p className="text-gray-500">Booking content will appear here</p>
          </div>
        </div>
      </div>

      {/* Dropdown panel for Destinations with animation */}
      <div
        className={`absolute overflow-hidden rounded-b-2xl transition-all duration-1000 ease-in-out left-0 right-0 bg-white shadow-md -translate-y-3 z-40 lg:mx-20 xl:mx-40 ${
          isDestinationsOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pt-20 px-10">
          <div className="h-[600px] flex flex-col items-start justify-items-start">
            {isDestinationsOpen && <DestinationsCarousel />}
            <hr className="h-[2px] bg-black mt-5 mb-2 w-full" />
            <div className={'flex justify-between items-center w-full'}>
              <Link href={'/contact'} className={'font-brother text-xs '}>
                {t('CTA')}
              </Link>
              <div className={'flex gap-3'}>
                <a href={'https://www.instagram.com/monacair/'} className={'font-brother text-xs '}>
                  Instagram
                </a>
                <a
                  href={'https://www.facebook.com/MonacairMonacoDesk'}
                  className={'font-brother text-xs '}
                >
                  Facebook
                </a>
                <a
                  href={'https://www.linkedin.com/company/monacair'}
                  className={'font-brother text-xs '}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown panel for Events with animation */}
      <div
        className={`absolute overflow-hidden rounded-b-2xl transition-all duration-1000 ease-in-out left-0 right-0 bg-white shadow-md -translate-y-3 z-40 lg:mx-20 xl:mx-40 ${
          isEventsOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pt-20 px-10">
          <div className="h-[600px] flex flex-col items-start justify-items-start">
            {isEventsOpen && <EventsCarousel />}
            <hr className="h-[2px] bg-black mt-5 mb-2 w-full" />
            <div className={'flex justify-between items-center w-full'}>
              <Link href={'/contact'} className={'font-brother text-xs '}>
                {t('CTA')}
              </Link>
              <div className={'flex gap-3'}>
                <a href={'https://www.instagram.com/monacair/'} className={'font-brother text-xs '}>
                  Instagram
                </a>
                <a
                  href={'https://www.facebook.com/MonacairMonacoDesk'}
                  className={'font-brother text-xs '}
                >
                  Facebook
                </a>
                <a
                  href={'https://www.linkedin.com/company/monacair'}
                  className={'font-brother text-xs '}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
