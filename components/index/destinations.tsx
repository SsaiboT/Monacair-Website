'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import useEmblaCarousel from 'embla-carousel-react'
import config from '@payload-config'
import { getPayload } from 'payload'

const Card: React.FC = () => {
  return (
    <div>
      <div></div>
    </div>
  )
}

const Destinations = () => {
  const t = useTranslations('Index.destinations')
  const [emblaRef] = useEmblaCarousel()
  return (
    <div className={'pl-40 py-20'}>
      <h2 className={'font-brother font-normal'}>{t('subtitle')}</h2>
      <h1 className={'font-brother font-normal text-5xl'}>
        {t.rich('title', {
          span: (chunks) => <span className={'font-caslon text-redmonacair'}>{chunks}</span>,
        })}
      </h1>
    </div>
  )
}

export default Destinations
