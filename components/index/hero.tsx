import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Logo from '@/public/logos/white.png'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

const Hero = () => {
  const t = useTranslations('Index.hero')

  return (
    <div
      className={`px-10 lg:px-40 h-screen flex items-center bg-cover bg-center`}
      style={{ backgroundImage: `url('/images/index/hero.webp')` }}
    >
      <div>
        <Image src={Logo} alt={'Logo of Monacair and Alliance'} width={800} className={'pb-6'} />
        <Link href="/booking">
          <Button variant={'white'}>{t('CTA')}</Button>
        </Link>
      </div>
    </div>
  )
}

export default Hero
