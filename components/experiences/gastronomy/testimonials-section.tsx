import { Star } from 'lucide-react'

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      stars: 5,
      quote:
        '"Une expérience gastronomique inoubliable ! Le dîner étoilé à Monaco était exceptionnel, et le vol en hélicoptère a ajouté une touche magique à cette soirée."',
      name: 'Sophie L.',
      experience: 'Dîner Étoilé à Monaco',
    },
    {
      id: 2,
      stars: 5,
      quote:
        '"Le cours de cuisine avec le chef étoilé était fantastique. J\'ai appris des techniques que j\'utilise maintenant chez moi. Une expérience enrichissante et délicieuse !"',
      name: 'Jean-Pierre M.',
      experience: 'Cours de Cuisine',
    },
    {
      id: 3,
      stars: 5,
      quote:
        '"La dégustation de vins en Provence était une expérience exceptionnelle. Survoler les vignobles en hélicoptère puis déguster des vins d\'exception, c\'était parfait !"',
      name: 'Amélie D.',
      experience: 'Dégustation de Vins',
    },
  ]

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que nos clients disent</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Découvrez les témoignages de nos clients qui ont vécu nos expériences gastronomiques
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col"
          >
            <div className="flex text-amber-400 mb-3">
              {[...Array(testimonial.stars)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <p className="italic text-gray-700 mb-4 flex-grow">{testimonial.quote}</p>
            <div className="mt-auto">
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">{testimonial.experience}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
