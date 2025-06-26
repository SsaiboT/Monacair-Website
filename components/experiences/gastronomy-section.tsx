import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { Experience } from '@/payload-types'
import { PaginatedDocs } from 'payload'

const GastronomyListing = async ({ data }: { data: { experience: PaginatedDocs<Experience> } }) => {
  const t = await getTranslations('Index.events')
  return (
    <section className={'px-6 sm:px-10 md:px-20 lg:px-40 py-10 md:py-20'}>
      <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'}>
        {data.experience.docs.map((card) => (
          <div
            className={
              'flex-col flex justify-between w-full h-[450px] border-2 border-black rounded-lg p-3'
            }
            key={card.id}
          >
            <div>
              <Image
                src={
                  typeof card.image === 'string'
                    ? card.image
                    : card.image?.url || '/images/placeholder.png'
                }
                alt={(typeof card.image !== 'string' && card.image?.alt) || 'Experience image'}
                width={(typeof card.image === 'string' ? undefined : card.image?.width) || 500}
                height={(typeof card.image === 'string' ? undefined : card.image?.height) || 500}
                className={'rounded-lg h-[250px] w-full object-cover object-center'}
              />
              <h3 className={'font-brother text-sm'}>{card.location}</h3>
              <h2 className={'font-brother text-xl'}>{card.name}</h2>
            </div>
            <div>
              <h2 className={'text-lg font-brother pb-2'}>{card.subtitle}</h2>
              <Link href={`/events`} className="block">
                <Button className={'text-xs'} size={'sm'} variant={'red'}>
                  {t('CTA')}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default GastronomyListing
