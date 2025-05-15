import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

interface AttractSectionProps {
  title: string | React.ReactNode
  subtitle: string | React.ReactNode
  buttonText: string
  buttonLink: string
  imageSrc: string
}

const AttractSection: React.FC<AttractSectionProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  imageSrc,
}) => {
  return (
    <div
      className={
        'flex items-center justify-center px-10 md:px-20 lg:px-40 py-20 h-[50vh] bg-cover bg-center'
      }
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <div className={'flex flex-col items-center justify-center'}>
        <h1 className={'text-3xl md:text-5xl lg:text-6xl font-caslon text-white pb-5'}>{title}</h1>
        <p
          className={
            'text-sm lg:text-lg font-brother font-light text-center w-100 md:w-150 lg:w-200 text-white pb-5'
          }
        >
          {subtitle}
        </p>
        <Link href={buttonLink}>
          <Button variant={'white'}>{buttonText}</Button>
        </Link>
      </div>
    </div>
  )
}

export default AttractSection
