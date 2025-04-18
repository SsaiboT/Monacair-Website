import Image from 'next/image'

export default function OurHistory() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <p className="text-gray-600 mb-6 text-lg font-brother">
              Monacair a été fondée en 1988 par Stefano Casiraghi.
            </p>
            <p className="text-gray-600 mb-6 font-brother">
              Monacair propose une large gamme de services dans le domaine de l'hélicoptère :
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2 font-brother">
              <li>
                Gestion d'hélicoptères, y compris le conseil, l'hébergement, les pilotes, le
                ravitaillement et la maintenance.
              </li>
              <li>Vols charters privés vers toutes les destinations.</li>
            </ul>
            <p className="text-gray-600 mb-6 font-brother">
              Depuis 1999, l'entreprise est Fournisseur Officiel de S.A.S. le Prince Souverain de
              Monaco, Albert II.
            </p>
            <p className="text-gray-600 font-brother">
              Le 1er janvier 2016, le Gouvernement Princier de Monaco a désigné Monacair comme seul
              opérateur du service de transfert régulier entre l'Aéroport Nice Côte d'Azur et
              Monaco.
            </p>
          </div>
          <div className="md:w-1/2 w-full h-[300px] md:h-[400px] relative mt-6 md:mt-0">
            <Image
              src="/images/index/hero.webp"
              alt="Hélicoptère Monacair"
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
