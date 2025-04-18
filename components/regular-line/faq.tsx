import React from 'react'

export default function FAQ() {
  const faqs = [
    {
      question: 'Quelle est la durée du vol entre Nice et Monaco ?',
      answer:
        "Le vol entre l'aéroport de Nice et l'héliport de Monaco dure environ 7 minutes. C'est le moyen le plus rapide pour relier ces deux destinations.",
    },
    {
      question: 'Combien de bagages puis-je emporter ?',
      answer:
        "Chaque passager peut emporter un bagage de 15kg et un bagage à main. Pour des bagages supplémentaires, veuillez nous contacter à l'avance.",
    },
    {
      question: "Les vols sont-ils disponibles toute l'année ?",
      answer:
        "Oui, nos vols réguliers fonctionnent toute l'année, 7 jours sur 7, avec plusieurs rotations quotidiennes entre Nice et Monaco.",
    },
    {
      question: 'Comment puis-je modifier ou annuler ma réservation ?',
      answer:
        "Les modifications et annulations sont possibles jusqu'à 24h avant le départ. Contactez notre service client par téléphone ou email pour toute assistance.",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-brother text-royalblue">
            Questions Fréquentes
          </h2>
          <p className="text-lg max-w-2xl mx-auto font-brother text-royalblue">
            Tout ce que vous devez savoir sur nos services de vols réguliers entre Nice et Monaco
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-l-4 border-redmonacair">
                <h3 className="text-xl font-bold mb-2 font-brother text-royalblue">
                  {faq.question}
                </h3>
                <p className="font-brother text-royalblue">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
