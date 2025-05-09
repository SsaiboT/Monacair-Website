import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { getPayload } from 'payload'
import config from '@payload-config'

const EventListing = async () => {
  const t = useTranslations('Index.events')
  const locale = useLocale() as 'en' | 'fr' | 'all' | undefined
  const payload = await getPayload({ config })
  const events = await payload.find({
    collection: 'Events',
    locale,
    fallbackLocale: 'fr',
  })
  return (
    <div className={'grid grid-cols-3 gap-5'}>
      {events.docs.map((event) => (
        <div
          className={
            'flex-col flex justify-between w-full h-[450px] border-2 border-black rounded-lg p-3'
          }
          key={event.id}
        >
          <div>
            <Image
              src={
                typeof event.image === 'string'
                  ? event.image
                  : event.image?.url || '/images/placeholder.png'
              }
              alt={(typeof event.image !== 'string' && event.image?.alt) || 'Event image'}
              width={(typeof event.image === 'string' ? undefined : event.image?.width) || 500}
              height={(typeof event.image === 'string' ? undefined : event.image?.height) || 500}
              className={'rounded-lg h-[250px] w-full object-cover object-center'}
            />
            <h3 className={'font-brother text-sm'}>{event.date}</h3>
            <h2 className={'font-brother text-xl'}>{event.title}</h2>
          </div>
          <div>
            <h2 className={'text-lg font-brother pb-2'}>{event.city}</h2>
            <Button className={'text-xs'} size={'sm'} variant={'blue'}>
              {t('CTA')}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

const Listing = () => {
  const t = useTranslations('Index.events')
  return (
    <section className={'px-40 py-20'}>
      <div className={'pb-16 flex justify-between'}>
        <div>
          <h3 className={'font-brother font-normal'}>{t('subtitle')}</h3>
          <h2 className={'font-brother font-normal text-5xl'}>
            {t.rich('title', {
              span: (chunks) => (
                <span className={'font-caslon text-redmonacair'}>
                  {chunks}
                  <br />
                </span>
              ),
            })}
          </h2>
        </div>
      </div>
      <EventListing />
    </section>
  )
}

export default Listing
