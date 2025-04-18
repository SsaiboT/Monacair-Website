import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

export default function CTASection() {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-royalblue z-0"></div>
      <div className="absolute top-0 left-0 right-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6 font-brother">Prêt à Prendre les Airs ?</h2>
          <p className="text-xl mb-8 font-brother">
            Réservez dès maintenant et découvrez le luxe et l'efficacité de nos vols réguliers entre
            Nice et Monaco.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/reserver">
              <Button
                size="lg"
                className="bg-redmonacair hover:bg-redmonacair/90 text-white font-brother"
              >
                Réserver un vol
              </Button>
            </Link>
            {/* <Link href="/contact">
              <Button
                size="lg"
                variant="white"
                className="border-white text-white hover:bg-white/10 font-brother"
              >
                Nous contacter
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  )
}
