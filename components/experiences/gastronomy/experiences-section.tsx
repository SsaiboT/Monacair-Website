import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Clock, Users, Calendar, ArrowRight } from 'lucide-react'

export default function ExperiencesSection() {
  const t = useTranslations('Experiences.gastronomy')

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('experiences.title')}</h2>
          <p className="text-lg">{t('experiences.description')}</p>
        </div>

        <div className="space-y-16">
          {/* Experience 1 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-[color:var(--color-redmonacair)] text-white text-sm px-3 py-1 rounded-full mb-4">
                {t('experiences.first.badge')}
              </span>
              <h3 className="text-2xl font-bold mb-4">{t('experiences.first.title')}</h3>
              <p className="mb-6">{t('experiences.first.description')}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-primary mr-1" />
                  <span>{t('experiences.first.duration')}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 text-primary mr-1" />
                  <span>{t('experiences.first.participants')}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-primary mr-1" />
                  <span>{t('experiences.first.availability')}</span>
                </div>
              </div>
              <Button variant="red" className="text-white">
                {t('experiences.first.cta')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[color:var(--color-redmonacair)]/10 rounded-lg transform rotate-3"></div>
              <div className="relative transform -rotate-3 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={t('experiences.first.imageSrc')}
                  alt={t('experiences.first.imageAlt')}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Experience 2 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-[color:var(--color-redmonacair)]/10 rounded-lg transform rotate-3"></div>
              <div className="relative transform -rotate-3 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={t('experiences.second.imageSrc')}
                  alt={t('experiences.second.imageAlt')}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="order-1 md:order-2">
              <span className="inline-block bg-[color:var(--color-redmonacair)] text-white text-sm px-3 py-1 rounded-full mb-4">
                {t('experiences.second.badge')}
              </span>
              <h3 className="text-2xl font-bold mb-4">{t('experiences.second.title')}</h3>
              <p className="mb-6">{t('experiences.second.description')}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-primary mr-1" />
                  <span>{t('experiences.second.duration')}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 text-primary mr-1" />
                  <span>{t('experiences.second.participants')}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-primary mr-1" />
                  <span>{t('experiences.second.availability')}</span>
                </div>
              </div>
              <Button variant="red" className="text-white">
                {t('experiences.second.cta')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Experience 3 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-[color:var(--color-redmonacair)] text-white text-sm px-3 py-1 rounded-full mb-4">
                {t('experiences.third.badge')}
              </span>
              <h3 className="text-2xl font-bold mb-4">{t('experiences.third.title')}</h3>
              <p className="mb-6">{t('experiences.third.description')}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-primary mr-1" />
                  <span>{t('experiences.third.duration')}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 text-primary mr-1" />
                  <span>{t('experiences.third.participants')}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-primary mr-1" />
                  <span>{t('experiences.third.availability')}</span>
                </div>
              </div>
              <Button variant="red" className="text-white">
                {t('experiences.third.cta')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[color:var(--color-redmonacair)]/10 rounded-lg transform rotate-3"></div>
              <div className="relative transform -rotate-3 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={t('experiences.third.imageSrc')}
                  alt={t('experiences.third.imageAlt')}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
