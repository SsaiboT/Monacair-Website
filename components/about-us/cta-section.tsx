import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-16 bg-[color:var(--color-redmonacair)] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 font-brother">Prêt à Voler avec Monacair?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto font-brother">
          Découvrez l&apos;excellence du transport en hélicoptère avec notre équipe expérimentée et
          notre flotte moderne.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/reservation"
            className="bg-white text-[color:var(--color-redmonacair)] hover:bg-gray-100 px-8 py-3 rounded-md font-bold text-lg transition-colors font-brother"
          >
            Réserver un Vol
          </Link>
          <Link
            href="/contact"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-[color:var(--color-redmonacair)] px-8 py-3 rounded-md font-bold text-lg transition-colors font-brother"
          >
            Nous Contacter
          </Link>
        </div>
      </div>
    </section>
  )
}
