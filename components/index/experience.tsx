'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { WobbleCard } from '@/components/ui/wobble-card'
import { Button } from '@/components/ui/button'

const Experience = () => {
  const t = useTranslations('Index.experience')
  return (
    <section
      className={'px-6 sm:px-10 md:px-20 lg:px-40 py-10 md:py-20 bg-royalblue rounded-t-4xl'}
    >
      <div className={'flex flex-col md:flex-row justify-between items-start md:items-center'}>
        <h1 className={'font-brother font-normal text-3xl md:text-5xl text-white mb-6 md:mb-0'}>
          {t.rich('title', {
            span: (chunks) => (
              <span className={'font-caslon text-redmonacair'}>
                {chunks}
                <br />
              </span>
            ),
          })}
        </h1>
        <Link href={'/experiences'}>
          <Button className={'hover:bg-white hover:text-black text-sm md:text-base'}>
            {t('CTA')}
          </Button>
        </Link>
      </div>
      <div className={'grid grid-cols-1 md:grid-cols-2 gap-5 items-center py-10 md:py-20'}>
        <Link href={'/experiences'}>
          <WobbleCard
            containerClassName={
              "h-[400px] sm:h-[600px] md:h-[700px] bg-[url('../../public/images/index/culture.webp')] bg-cover bg-center"
            }
            className={'col-span-2'}
          >
            <div className={'flex-col items-start justify-center'}>
              <h1 className={'text-white font-brother text-xl md:text-3xl pb-3'}>
                {t('sport.title')}
              </h1>
              <h2 className={'text-white font-brother text-sm md:text-md'}>
                {t('sport.subtitle')}
              </h2>
            </div>
          </WobbleCard>
        </Link>
        <Link href={'/experiences'}>
          <WobbleCard
            containerClassName={
              "h-[400px] sm:h-[600px] md:h-[700px] bg-[url('../../public/images/experiences/gastronomy.webp')] bg-cover bg-center"
            }
            className={'col-span-2 md:col-span-2'}
          >
            <div className={'flex-col items-start justify-center'}>
              <h1 className={'text-white font-brother text-xl md:text-3xl pb-3'}>
                {t('gastronomie.title')}
              </h1>
              <h2 className={'text-white font-brother text-sm md:text-md'}>
                {t('gastronomie.subtitle')}
              </h2>
            </div>
          </WobbleCard>
        </Link>
      </div>
    </section>
  )
}

export default Experience
