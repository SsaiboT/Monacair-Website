import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Regular from '@/public/images/index/regular.webp'
import Panoramique from '@/public/images/index/panoramique.webp'
import Private from '@/public/images/index/private.webp'
import Jet from '@/public/images/index/jet.webp'
import { Link } from '@/i18n/navigation'

const OurFlights = () => {
  const t = useTranslations('Index.our-flights')
  return (
    <section className={'px-40 py-20 bg-white'}>
      <div className={'pb-16'}>
        <h3 className={'font-brother font-normal'}>{t('subtitle')}</h3>
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
      <div className={'grid grid-cols-4 items-center gap-5'}>
        <div>
          <h2 className={'font-caslon text-3xl mb-3'}>{t('private.title')}</h2>
          <p className={'font-brother '}>{t('private.description')}</p>
          <Link href={'/private-jet'}>
            <Image
              src={Private}
              alt={'Private flight'}
              className={'h-[600px] object-cover rounded-md my-5'}
            />
          </Link>
        </div>
        <div>
          <Link href={'/panoramic'}>
            <Image
              src={Panoramique}
              alt={'Private flight'}
              className={'h-[600px] object-cover rounded-md my-5'}
            />
          </Link>
          <h2 className={'font-caslon text-3xl my-3'}>{t('pano.title')}</h2>
          <p className={'font-brother '}>{t('pano.description')}</p>
        </div>
        <div>
          <h2 className={'font-caslon text-3xl my-3'}>{t('regular.title')}</h2>
          <p className={'font-brother '}>{t('regular.description')}</p>
          <Link href={'/regular-line'}>
            <Image
              src={Regular}
              alt={'Private flight'}
              className={'h-[600px] object-cover rounded-md my-5'}
            />
          </Link>
        </div>
        <div>
          <Link href={'/private-jet'}>
            <Image
              src={Jet}
              alt={'Private jet'}
              className={'h-[600px] object-cover rounded-md my-5'}
            />
          </Link>
          <h2 className={'font-caslon text-3xl my-3'}>{t('jet.title')}</h2>
          <p className={'font-brother '}>{t('jet.description')}</p>
        </div>
      </div>
    </section>
  )
}

export default OurFlights
