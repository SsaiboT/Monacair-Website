import React from 'react'
import { getLocale, getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'

const ListingCard = async () => {
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const payload = await getPayload({ config })
  const destinations = await payload.find({
    collection: 'destinations',
    locale,
    fallbackLocale: 'fr',
  })
  return (
    <div className={'px-40 grid grid-cols-4 gap-5 pb-20'}>
      {destinations.docs.map((card) => (
        <Link href={`/destinations/${card.slug}`} className="block" key={card.id}>
          <div className={'w-full rounded-lg'}>
            <div className="relative w-full h-[350px]">
              <Image
                src={
                  typeof card.image === 'string'
                    ? card.image
                    : card.image?.url || '/images/placeholder.png'
                }
                alt={
                  typeof card.image === 'string'
                    ? 'Destination image'
                    : card.image?.alt || 'Destination image'
                }
                width={typeof card.image === 'string' ? 500 : card.image?.width || 500}
                height={typeof card.image === 'string' ? 500 : card.image?.height || 500}
                className="rounded-lg h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-4">
                <h2 className="font-brother text-2xl text-white">{card.city}</h2>
                <h3 className={'text-white font-brother text-lg font-light'}>{card.title}</h3>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

const Listing = () => {
  return (
    <div>
      <ListingCard />
    </div>
  )
}

export default Listing
