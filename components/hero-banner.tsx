import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

interface HeroBannerProps {
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
  imageSrc: string
  imageAlt: string
}

export function HeroBanner({
  title,
  subtitle,
  buttonText,
  buttonLink,
  imageSrc,
  imageAlt,
}: HeroBannerProps) {
  return (
    <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full">
      <div className="absolute inset-0 z-0">
        <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-brother">
            {title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto font-brother">
            {subtitle}
          </p>
          <Link href={buttonLink} className="w-full sm:w-auto inline-block">
            <Button size="lg" variant="red" className="w-full sm:w-auto font-brother">
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
