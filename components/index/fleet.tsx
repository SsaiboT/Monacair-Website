import * as React from 'react'
import { getLocale, getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const FleetCarousel = async () => {
  const t = await getTranslations('Index.fleet')
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined
  const payload = await getPayload({ config })
  const fleet = await payload.find({
    collection: 'Fleet',
    locale,
    fallbackLocale: 'fr',
  })
  return (
    <Carousel className="w-full px-6 sm:px-10 md:px-20 lg:px-40 pt-10 md:pt-20">
      <div
        className={
          'pb-8 md:pb-16 flex flex-col md:flex-row justify-between items-start md:items-center'
        }
      >
        <div>
          <h2 className={'font-brother font-normal text-3xl md:text-5xl'}>
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
        <div className={'flex items-center gap-1 md:gap-5 mt-6 md:mt-0'}>
          <CarouselPrevious />
          <CarouselNext />
          <Link href={'/our-fleet'}>
            <Button className="text-sm md:text-base">{t('CTA')}</Button>
          </Link>
        </div>
      </div>
      <CarouselContent className="-ml-4">
        {fleet.docs.map((item: any) => (
          <CarouselItem
            className="basis-full sm:basis-1/2 lg:basis-1/3 relative h-[300px] sm:h-[400px] md:h-[500px]"
            key={item.id}
          >
            <div className={'flex flex-col justify-between w-full h-full'}>
              <div>
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  className={
                    'rounded-lg h-[200px] sm:h-[250px] md:h-[300px] w-full object-cover object-center'
                  }
                />
                <h2 className={'font-brother text-lg md:text-xl mt-3'}>{item.title}</h2>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

const FleetSection = () => {
  return (
    <section>
      <FleetCarousel />
    </section>
  )
}

export default FleetSection
