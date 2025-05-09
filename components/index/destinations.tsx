import * as React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const DestinationsCarousel = async () => {
  const t = useTranslations('Index.destinations')
  const locale = useLocale() as 'en' | 'fr' | 'all' | undefined
  const payload = await getPayload({ config })
  const destinations = await payload.find({
    collection: 'destinations',
    locale,
    fallbackLocale: 'fr',
  })
  return (
    <Carousel className="w-full pl-40 py-20">
      <div className={'pb-16 flex justify-between pr-40'}>
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
        <div className={'flex items-center gap-5'}>
          <CarouselPrevious />
          <CarouselNext />
          <Link href={'/destinations'}>
            <Button>{t('CTA')}</Button>
          </Link>
        </div>
      </div>
      <CarouselContent className="-ml-4">
        {destinations.docs.map((item) => (
          <CarouselItem className=" md:basis-1/2 lg:basis-2/9 relative h-[600px]" key={item.id}>
            <div className={'absolute'}>
              <Image
                src={item.image.url || '/images/placeholder.png'}
                alt={item.image.alt || 'Destination image'}
                width={item.image.width || 500}
                height={item.image.height || 500}
                className={'rounded-lg object-cover object-center'}
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg" />
            </div>
            <div className={'relative p-3'}>
              <h2 className={'font-brother text-xl text-white'}>{item.title}</h2>
              <h3 className={'font-brother text-sm text-white w-2/3'}>{item.subtitle}</h3>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

const DestinationsSection = () => {
  return (
    <section>
      <DestinationsCarousel />
    </section>
  )
}

export default DestinationsSection
