import { useTranslations } from 'next-intl'

export default function MonacairLeader() {
  const t = useTranslations('AboutUs.monacair-leader')

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 font-brother">{t('title')}</h2>

        <div className="space-y-6 text-gray-600 font-brother">
          <p>{t('operational-bases')}</p>
          <p>{t('team-goal')}</p>
          <p>{t('services')}</p>
          <p>{t('maintenance')}</p>
          <p>{t('modern-fleet')}</p>
          <p>{t('trust')}</p>
        </div>
      </div>
    </section>
  )
}
