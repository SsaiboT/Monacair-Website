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
      <div
        className={
          'row-span-1 grid grid-cols-1 md:grid-cols-2 items-center px-6 sm:px-10 md:px-20 lg:px-40'
        }
      >
        <Image
          src={Logo}
          alt={'Logo Monacair'}
          width={400}
          className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px]"
        />
        <div className={'mt-6 md:mt-0 flex flex-col items-center md:items-end'}>
          <h1
            className={
              'text-3xl sm:text-4xl md:text-5xl text-royalblue font-brother font-bold text-center md:text-right pb-5'
            }
          >
            {t.rich('title', {
              br: (chunks) => (
                <span>
                  <br />
                  {chunks}
                </span>
              ),
            })}
          </h1>
          <Button size={'lg'} className="text-sm sm:text-base md:text-lg">
            {t('CTA')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
