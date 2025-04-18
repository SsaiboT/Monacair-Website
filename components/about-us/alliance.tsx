import Link from 'next/link'
import Image from 'next/image'

export default function Alliance() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 font-brother">ALLIANCE MONACAIR</h2>
        <p className="text-xl font-semibold text-gray-700 mb-8 font-brother">
          3 Entreprises renommées pour un service unique.
        </p>

        <div className="flex justify-center">
          <div className="w-128 h-48 relative">
            <Image src="/logos/primary.png" alt="Logo Monacair" fill className="object-contain" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-6 text-gray-600 font-brother">
          <p>
            L'alliance Heli Securite Blade Monacair vous propose une expérience de vols sur-mesure,
            combinant flexibilité, confort et sécurité.
          </p>
          <p>
            Envolez-vous à bord de l'un de nos hélicoptères performants et de toute dernière
            génération pour un transfert vers ou depuis tous les aéroports français, corses,
            italiens, suisses mais également vers toutes vos destinations hivernales.
          </p>
          <p>
            Direction Les Alpes et ses sommets enneigés. Chaussez vos skis et profitez des plus
            belles pistes de ski au monde, profitez d'activités de plein air, découvrez la riche
            culture & la gastronomie des Alpes.
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/alliance"
            className="bg-[color:var(--color-redmonacair)] hover:bg-red-700 text-white px-8 py-3 rounded-md font-bold text-lg transition-colors font-brother"
          >
            En savoir plus sur l'ALLIANCE
          </Link>
        </div>
      </div>
    </section>
  )
}
