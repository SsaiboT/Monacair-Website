import React from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'

const ListingCard = async () => {
  const t = useTranslations('Index.events')
  const locale = useLocale() as 'en' | 'fr' | 'all' | undefined
  const payload = await getPayload({ config })
  const destinations = await payload.find({
    collection: 'destinations',
    locale,
    fallbackLocale: 'fr',
  })
  return (
    <div>
      {destinations.docs.map((card) => (
        <div className={'relative z-0 flex-col flex w-full rounded-lg p-3'} key={card.id}>
          <div className={'absolute'}>
            <Image
              src={card.image.url}
              alt={'Test'}
              width={100}
              height={100}
              className={'rounded-lg h-[250px] w-full object-cover object-center'}
            />
            <div className={'absolute inset-0 bg-black/20 '} />
          </div>
          <div className={'relative z-50'}>
            <h2 className={'font-brother text-xl'}>{card.title}</h2>
          </div>
        </div>
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
