import React from 'react'
import { useTranslations } from 'next-intl'

const Hero = () => {
  const t = useTranslations('HomePage')

  return (
    <div className="">
      <h1>{t('title')}</h1>
      <p className={'font-brother text-primary'}>Your one-stop solution for all your needs.</p>
      <button className="btn-primary">Get Started</button>
    </div>
  )
}

export default Hero
