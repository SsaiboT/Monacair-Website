import { useTranslations } from 'next-intl'

export default function FlightRoute() {
  const t = useTranslations('Panoramic.route')

  const stops = [
    { name: 'Nice', isMainStop: true },
    { name: 'Monaco', isMainStop: false },
    { name: 'Cap Martin', isMainStop: false },
    { name: 'La Turbie', isMainStop: false },
    { name: 'la Baie de Villefranche', isMainStop: false },
    { name: 'Saint-Jean-Cap-Ferrat', isMainStop: false },
    { name: 'Beaulieu', isMainStop: false },
    { name: 'Eze Village', isMainStop: false },
    { name: 'la Baie des Anges', isMainStop: true },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-[#002841] text-5xl font-serif mb-16 tracking-tight">{t('title')}</h1>

      <div className="relative">
        <div className="flex justify-between mb-8">
          <h2 className="text-3xl font-bold">{stops[0].name}</h2>
          <h2 className="text-3xl font-bold">{stops[stops.length - 1].name}</h2>
        </div>

        <div className="relative">
          <div className="absolute top-[14px] left-0 right-0 border-t-4 border-dashed border-[#d1222a] z-0"></div>

          <div className="flex justify-between relative z-10">
            {stops.map((stop, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full border-4 border-[#d1222a] bg-white ${index === 0 || index === stops.length - 1 ? 'ring-4 ring-[#d1222a] ring-opacity-30' : ''}`}
                ></div>
                {!stop.isMainStop && (
                  <div className="mt-6 text-center text-gray-600 max-w-[120px]">{stop.name}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
