import Image from 'next/image'
import { Shield, Eye, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export default function HelicopterTour() {
  const t = useTranslations('Panoramic.advantages')

  const icons = {
    Eye: <Eye className="w-5 h-5 text-red-500" />,
    Shield: <Shield className="w-5 h-5 text-red-500" />,
    Users: <Users className="w-5 h-5 text-red-500" />,
  }

  const features = [
    {
      icon: 'Eye' as keyof typeof icons,
      title: t('features.0.title'),
      description: t('features.0.description'),
    },
    {
      icon: 'Shield' as keyof typeof icons,
      title: t('features.1.title'),
      description: t('features.1.description'),
    },
    {
      icon: 'Users' as keyof typeof icons,
      title: t('features.2.title'),
      description: t('features.2.description'),
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-12 max-w-md">
        {t('title')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {features.map((feature, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-4">
              {icons[feature.icon]}
            </div>
            <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/images/index/hero.webp"
            alt="Hélicoptère survolant la côte de Nice"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <p className="text-gray-800">{t('cta.paragraph1')}</p>

          <p className="text-gray-800">{t('cta.paragraph2')}</p>

          <p className="text-gray-800">{t('cta.paragraph3')}</p>

          <div className="flex justify-end">
            <Button className="bg-red-600 hover:bg-red-700 text-white">{t('cta.button')}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
