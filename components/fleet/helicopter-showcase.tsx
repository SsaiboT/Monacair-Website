import React from 'react'
import Image from 'next/image'
import { Users, Gauge, MapPin, Luggage, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import TechSpecs from './tech-specs'

interface HelicopterShowcaseProps {
  model: 'h130' | 'h125' | 'h145'
  reversed?: boolean
  bgColor?: string
  accentColor?: string
}

export default function HelicopterShowcase({
  model,
  reversed = false,
  bgColor = 'bg-gray-50',
  accentColor = '#002841',
}: HelicopterShowcaseProps) {
  const t = useTranslations(`Fleet.helicopter.${model}`)

  const equipment = {
    title: t('equipment.title'),
    items: t.raw('equipment.items') as string[],
  }

  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className={reversed ? 'order-2 md:order-1 relative' : ''}>
              {!reversed ? (
                <>
                  <div className="inline-block mb-4 bg-[#002841]/10 px-4 py-2 rounded-full">
                    <span className="text-[#002841] font-medium">{t('badge')}</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-6">{t('title')}</h2>
                  <p className="text-lg mb-6">{t('description')}</p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[color:var(--color-redmonacair)]/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <Users className="h-5 w-5 text-[color:var(--color-redmonacair)]" />
                      </div>
                      <div>
                        <h4 className="font-bold">{t('specs.capacity.title')}</h4>
                        <p className="text-gray-600">{t('specs.capacity.value')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[color:var(--color-redmonacair)]/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <Gauge className="h-5 w-5 text-[color:var(--color-redmonacair)]" />
                      </div>
                      <div>
                        <h4 className="font-bold">{t('specs.speed.title')}</h4>
                        <p className="text-gray-600">{t('specs.speed.value')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[color:var(--color-redmonacair)]/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <MapPin className="h-5 w-5 text-[color:var(--color-redmonacair)]" />
                      </div>
                      <div>
                        <h4 className="font-bold">{t('specs.range.title')}</h4>
                        <p className="text-gray-600">{t('specs.range.value')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[color:var(--color-redmonacair)]/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <Luggage className="h-5 w-5 text-[color:var(--color-redmonacair)]" />
                      </div>
                      <div>
                        <h4 className="font-bold">{t('specs.baggage.title')}</h4>
                        <p className="text-gray-600">{t('specs.baggage.value')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <h4 className="font-bold text-lg">{equipment.title}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {equipment.items.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-[color:var(--color-redmonacair)] mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href="/booking">
                    <Button
                      variant="red"
                      className="font-brother bg-[color:var(--color-redmonacair)] hover:bg-[color:var(--color-redmonacair)]/90 text-white"
                    >
                      {t('cta')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="relative w-full h-auto mx-auto md:mx-0 max-w-[90%] md:max-w-full">
                  <div className="absolute inset-0 bg-[color:var(--color-redmonacair)]/10 rounded-lg transform rotate-3"></div>
                  <div className="relative transform -rotate-3 rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src="/images/index/regular.webp"
                      alt={`Airbus ${model.toUpperCase()}`}
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-lg overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src="/images/index/private.webp"
                      alt={`Intérieur Airbus ${model.toUpperCase()}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className={reversed ? 'order-1 md:order-2' : 'relative'}>
              {reversed ? (
                <>
                  <div className="inline-block mb-4 bg-[color:var(--color-redmonacair)]/10 px-4 py-2 rounded-full">
                    <span className="text-[color:var(--color-redmonacair)] font-medium">
                      {t('badge')}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-6">{t('title')}</h2>
                  <p className="text-lg mb-6">{t('description')}</p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[color:var(--color-redmonacair)]/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <Users className="h-5 w-5 text-[color:var(--color-redmonacair)]" />
                      </div>
                      <div>
                        <h4 className="font-bold">{t('specs.capacity.title')}</h4>
                        <p className="text-gray-600">{t('specs.capacity.value')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[color:var(--color-redmonacair)]/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <Gauge className="h-5 w-5 text-[color:var(--color-redmonacair)]" />
                      </div>
                      <div>
                        <h4 className="font-bold">{t('specs.speed.title')}</h4>
                        <p className="text-gray-600">{t('specs.speed.value')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[color:var(--color-redmonacair)]/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <MapPin className="h-5 w-5 text-[color:var(--color-redmonacair)]" />
                      </div>
                      <div>
                        <h4 className="font-bold">{t('specs.range.title')}</h4>
                        <p className="text-gray-600">{t('specs.range.value')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[color:var(--color-redmonacair)]/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <Luggage className="h-5 w-5 text-[color:var(--color-redmonacair)]" />
                      </div>
                      <div>
                        <h4 className="font-bold">{t('specs.baggage.title')}</h4>
                        <p className="text-gray-600">{t('specs.baggage.value')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <h4 className="font-bold text-lg">{equipment.title}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {equipment.items.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-[color:var(--color-redmonacair)] mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href="/booking">
                    <Button
                      variant="red"
                      className="font-brother bg-[color:var(--color-redmonacair)] hover:bg-[color:var(--color-redmonacair)]/90 text-white"
                    >
                      {t('cta')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="relative w-full h-auto mx-auto md:mx-0 max-w-[90%] md:max-w-full">
                  <div className="absolute inset-0 bg-[#002841]/10 rounded-lg transform rotate-3"></div>
                  <div className="relative transform -rotate-3 rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src="/images/index/regular.webp"
                      alt={`Airbus ${model.toUpperCase()}`}
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-lg overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src="/images/index/private.webp"
                      alt={`Intérieur Airbus ${model.toUpperCase()}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <TechSpecs model={model} bgColor={reversed ? 'bg-gray-50' : 'bg-white'} />
        </div>
      </div>
    </section>
  )
}
