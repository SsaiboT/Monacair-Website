import { Star } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Testimonial {
  quote: string
  name: string
  experience: string
}

export default function TestimonialsSection() {
  const t = useTranslations('Experiences.lifestyle.testimonials')

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-brother">{t('title')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto font-brother">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {t.raw('items').map((testimonial: Testimonial, index: number) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col"
          >
            <div className="flex text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <p className="italic text-gray-700 mb-4 flex-grow font-brother">{testimonial.quote}</p>
            <div className="mt-auto">
              <p className="font-semibold font-brother">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground font-brother">{testimonial.experience}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
