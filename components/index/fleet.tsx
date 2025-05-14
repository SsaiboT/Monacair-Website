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
    <Carousel className="w-full px-40 pt-20">
      <div className={'pb-16 flex justify-between'}>
        <div>
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
          <Link href={'/our-fleet'}>
            <Button>{t('CTA')}</Button>
          </Link>
        </div>
      </div>
      <CarouselContent className="-ml-4">
        {fleet.docs.map((item: any) => (
          <CarouselItem className=" md:basis-1/2 lg:basis-1/3" key={item.id}>
            <div className={'flex-col flex justify-between w-full h-[450px]'}>
              <div>
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  className={'rounded-lg h-[250px] w-full object-cover object-center'}
                />
                <h2 className={'font-brother text-xl'}>{item.title}</h2>
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
