import React from 'react'
import Image from 'next/image'
import { Users, Gauge, MapPin, Luggage, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Fleet } from '@/payload-types'

interface ExtendedFleet extends Omit<Fleet, 'range' | 'equipment'> {
  description?: any
  range?: string | null
  equipment?: Array<{ item: string; id?: string | null }> | null
}

interface HelicopterShowcaseProps {
  helicopter: ExtendedFleet
  reversed?: boolean
}

export default function HelicopterShowcase({
  helicopter,
  reversed = false,
}: HelicopterShowcaseProps) {
  const t = useTranslations('Fleet.helicopter')

  const HelicopterContent = () => (
    <>
      <div className="inline-block mb-4 bg-[color:var(--color-redmonacair)]/10 px-4 py-2 rounded-full">
        <span className="text-[color:var(--color-redmonacair)] font-medium">
          {helicopter.badge || t('badge')}
        </span>
      </div>
      <h2 className="text-3xl font-bold mb-6">{helicopter.name}</h2>

      {helicopter.description ? (
        <div className="text-lg mb-6">
          <RichText data={helicopter.description} />
        </div>
      ) : (
        <p className="text-lg mb-6">{t('description')}</p>
      )}

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-[color:var(--color-redmonacair)]/10 flex items-center justify-center mr-3 flex-shrink-0">
            <Users className="h-5 w-5 text-[color:var(--color-redmonacair)]" />
          </div>
          <div>
            <h4 className="font-bold">{t('specs.capacity.title')}</h4>
            <p className="text-gray-600">{helicopter.passengers}</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-[color:var(--color-redmonacair)]/10 flex items-center justify-center mr-3 flex-shrink-0">
            <Gauge className="h-5 w-5 text-[color:var(--color-redmonacair)]" />
          </div>
          <div>
            <h4 className="font-bold">{t('specs.speed.title')}</h4>
            <p className="text-gray-600">{helicopter.speed}</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-[color:var(--color-redmonacair)]/10 flex items-center justify-center mr-3 flex-shrink-0">
            <MapPin className="h-5 w-5 text-[color:var(--color-redmonacair)]" />
          </div>
          <div>
            <h4 className="font-bold">{t('specs.range.title')}</h4>
            <p className="text-gray-600">{helicopter.range || t('specs.range.default')}</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-[color:var(--color-redmonacair)]/10 flex items-center justify-center mr-3 flex-shrink-0">
            <Luggage className="h-5 w-5 text-[color:var(--color-redmonacair)]" />
          </div>
          <div>
            <h4 className="font-bold">{t('specs.baggage.title')}</h4>
            <p className="text-gray-600">{helicopter.baggage}</p>
          </div>
        </div>
      </div>

      {helicopter.equipment && helicopter.equipment.length > 0 && (
        <div className="space-y-3 mb-8">
          <h4 className="font-bold text-lg">{t('equipment.title')}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {helicopter.equipment.map((equip, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-[color:var(--color-redmonacair)] mr-2 flex-shrink-0" />
                <span>{equip.item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link href="/booking">
        <Button
          variant="red"
          className="font-brother bg-[color:var(--color-redmonacair)] hover:bg-[color:var(--color-redmonacair)]/90 text-white"
        >
          {t('cta')} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </>
  )

  const HelicopterImage = () => (
    <div className="relative w-full h-auto mx-auto md:mx-0 max-w-[90%] md:max-w-full">
      <div className="absolute inset-0 bg-[color:var(--color-redmonacair)]/10 rounded-lg transform rotate-3"></div>
      <div className="relative transform -rotate-3 rounded-lg overflow-hidden shadow-xl">
        {typeof helicopter.image === 'object' && helicopter.image?.url ? (
          <Image
            src={helicopter.image.url}
            alt={helicopter.name}
            width={600}
            height={400}
            className="w-full h-auto"
          />
        ) : (
          <Image
            src="/images/index/regular.webp"
            alt={helicopter.name}
            width={600}
            height={400}
            className="w-full h-auto"
          />
        )}
      </div>
    </div>
  )

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className={reversed ? 'order-2 md:order-1' : ''}>
              {reversed ? <HelicopterImage /> : <HelicopterContent />}
            </div>
            <div className={reversed ? 'order-1 md:order-2' : ''}>
              {reversed ? <HelicopterContent /> : <HelicopterImage />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
