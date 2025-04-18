import Image from 'next/image'

export default function OurServices() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 font-brother">Nos Services</h2>

            <p className="text-gray-600 mb-6 font-brother">
              Depuis janvier 2016, Monacair est l&apos;opérateur officiel et unique monégasque de la
              Ligne Régulière entre Monaco et l&apos;Aéroport International Nice Côte d&apos;Azur.
            </p>
            <p className="text-gray-600 mb-6 font-brother">
              La compagnie opère plus de 40 vols quotidiens, programmés toutes les 15 minutes. Basée
              à l&apos;héliport de Monaco et dans tous les terminaux de l&apos;Aéroport Nice Côte
              d&apos;Azur.
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2 font-brother">
              <li>
                Prise en charge des passagers, y compris l&apos;embarquement/débarquement et la
                gestion des bagages.
              </li>
              <li>Prise en charge de l&apos;équipage des hélicoptères privés non basés.</li>
              <li>Entretien d&apos;hélicoptères.</li>
            </ul>

            <p className="text-gray-600 font-brother">
              En septembre 2015, peu après que Monacair ait remporté l&apos;appel d&apos;offres du
              Gouvernement Princier de Monaco, une commande de six hélicoptères monomoteurs H130
              flambant neufs, dotés de coffres élargis, a été passée. La livraison a été reçue entre
              décembre 2015 et fin avril 2016. Ces hélicoptères sont climatisés et sont
              principalement utilisés pour les transferts des lignes régulières : Monaco-Nice et
              Nice-Monaco.
            </p>
          </div>
          <div className="md:w-1/2 w-full h-[300px] md:h-[500px] relative mt-6 md:mt-0">
            <Image
              src="/images/index/regular.webp"
              alt="Hélicoptère H130 de Monacair"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
