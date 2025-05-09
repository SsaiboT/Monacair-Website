import React from 'react'
import { useTranslations } from 'next-intl'

const Bases = () => {
  const t = useTranslations('Destinations.description.bases')
  return (
    <section className={'bg-white flex flex-col items-center justify-center px-40 py-20'}>
      <h1 className={'font-brother text-5xl'}>
        {t.rich('title', {
          span: (chunks) => <span className={'font-caslon text-redmonacair'}>{chunks}</span>,
        })}
      </h1>
      <h3 className={'font-brother text-lg text-center py-3'}>{t('description')}</h3>
    </section>
  )
}

export default Bases
