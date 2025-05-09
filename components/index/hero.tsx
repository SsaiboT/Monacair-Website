import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Logo from '@/public/logos/primary.png'
import { Button } from '@/components/ui/button'

const Hero = () => {
  const t = useTranslations('Index.hero')

  return (
    <div className="grid grid-rows-4 h-screen bg-white">
      <div
        className={"row-span-3 bg-[url('../../public/images/index/hero.webp')] bg-cover bg-center"}
      ></div>
      <div className={'row-span-1 grid grid-cols-2 items-center px-40'}>
        <Image src={Logo} alt={'Logo Monacair'} width={650} />
        <div className={'items-end justify-items-end'}>
          <h1 className={'text-5xl text-royalblue font-brother font-bold text-right pb-5'}>
            {t.rich('title', {
              br: (chunks) => (
                <span>
                  <br />
                  {chunks}
                </span>
              ),
            })}
          </h1>
          <Button size={'lg'}>{t('CTA')}</Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
