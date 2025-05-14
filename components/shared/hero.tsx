import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

interface HeroProps {
  title: string | React.ReactNode
  subtitle: string | React.ReactNode
  buttonText: string
  buttonLink: string
  imageSrc: string
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, buttonText, buttonLink, imageSrc }) => {
  return (
    <div
      className={`px-40 h-screen flex items-center bg-cover bg-center`}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <div>
        <h1 className={'text-white text-7xl font-brother pb-5'}>{title}</h1>
        <h2 className={'text-white text-lg font-brother font-light pb-5 w-1/3'}>{subtitle}</h2>
        <Link href={buttonLink}>
          <Button>{buttonText}</Button>
        </Link>
      </div>
    </div>
  )
}

export default Hero
