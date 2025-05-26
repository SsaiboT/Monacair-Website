'use client'
import { WorldMap } from '@/components/ui/world-map'

export function WorldMapDemo() {
  return (
    <div className=" py-10 dark:bg-black bg-white w-full">
      <WorldMap
        dots={[
          {
            // Cannes (French Riviera) to Monaco
            start: { lat: -7.5528, lng: 5.0174 }, // Cannes
            end: { lat: -7.5528, lng: 7.0174 }, // Monaco
          },
          {
            // Cannes (French Riviera) to Corse
            start: { lat: -7.5528, lng: 5.0174 }, // Cannes
            end: { lat: -20.5528, lng: 17.0174 }, // Corse
          },
          {
            // Cannes (French Riviera) to Swiss
            start: { lat: -7.5528, lng: 5.0174 }, // Cannes
            end: { lat: 2.5528, lng: 30.0174 }, // Swiss
          },
          {
            // Cannes (French Riviera) to St Tropez
            start: { lat: -7.5528, lng: 5.0174 }, // Cannes
            end: { lat: -7.5528, lng: 3.0174 }, // St Tropez
          },
          {
            // Cannes (French Riviera) to Alpes
            start: { lat: -7.5528, lng: 5.0174 }, // Cannes
            end: { lat: 15.5528, lng: 3.0174 }, // Alpes
          },
        ]}
      />
    </div>
  )
}
