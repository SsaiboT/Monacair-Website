'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { WobbleCard } from '@/components/ui/wobble-card'
import { Button } from '@/components/ui/button'

const Experience = () => {
  const t = useTranslations('Index.experience')
  return (
    <section className={'px-40 py-20 bg-royalblue rounded-t-4xl'}>
      <div className={'flex justify-between'}>
        <h1 className={'font-brother font-normal text-5xl text-white'}>
          {t.rich('title', {
            span: (chunks) => (
              <span className={'font-caslon text-redmonacair'}>
                {chunks}
                <br />
              </span>
            ),
          })}
        </h1>
        <Button className={'hover:bg-white hover:text-black'}>{t('CTA')}</Button>
      </div>
      <div className={'grid grid-cols-3 grid-rows-2 gap-5 items-center py-20'}>
        <WobbleCard
          containerClassName={
            "col-span-1 row-span-2 h-[1020px] bg-[url('../../public/images/index/sport.webp')] bg-cover bg-center"
          }
          className={'col-span-1'}
        >
          <div className={'flex-col items-start justify-center'}>
            <h1 className={'text-white font-brother text-3xl pb-3'}>{t('sport.title')}</h1>
            <h2 className={'text-white font-brother text-md'}>{t('sport.subtitle')}</h2>
          </div>
        </WobbleCard>
        <WobbleCard
          containerClassName={
            "col-span-2 h-[500px] row-span-1 bg-[url('../../public/images/index/gastronomie.webp')] bg-cover bg-center"
          }
          className={'col-span-2'}
        >
          <div className={'flex-col items-start justify-center'}>
            <h1 className={'text-white font-brother text-3xl pb-3'}>{t('gastronomie.title')}</h1>
            <h2 className={'text-white font-brother text-md'}>{t('gastronomie.subtitle')}</h2>
          </div>
        </WobbleCard>
        <WobbleCard
          containerClassName={
            "col-span-2 h-[500px] row-span-1 bg-[url('../../public/images/index/culture.webp')] bg-cover bg-center"
          }
          className={'col-span-2'}
        >
          <div className={'flex-col items-start justify-center'}>
            <h1 className={'text-white font-brother text-3xl pb-3'}>{t('culture.title')}</h1>
            <h2 className={'text-white font-brother text-md'}>{t('culture.subtitle')}</h2>
          </div>
        </WobbleCard>
      </div>
    </section>
  )
}

export default Experience
