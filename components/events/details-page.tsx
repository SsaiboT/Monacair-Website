import React from 'react'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Event } from '@/payload-types'

interface EventProps {
  event: Event
}

const DetailsPage: React.FC<EventProps> = ({ event }) => {
  return (
    <div className="w-full h-full py-10 px-6 sm:px-10 md:px-20 lg:px-40">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center items-center gap-10">
        <RichText
          data={event.description}
          className="rich-text font-brother text-sm sm:text-base md:text-lg"
        />
        {typeof event.image === 'object' && event.image !== null ? (
          <Image
            src={event.image?.url || '/images/placeholder.png'}
            alt={event.image?.alt || 'Image'}
            width={event.image?.width || 800}
            height={event.image?.height || 600}
            className="object-center object-cover h-[30vh] sm:h-[40vh] md:h-[50vh] w-full rounded-lg"
          />
        ) : (
          <Image
            src="/images/placeholder.png"
            alt="Placeholder"
            width={800}
            height={600}
            className="object-center object-cover h-[30vh] sm:h-[40vh] md:h-[50vh] w-full rounded-lg"
          />
        )}
      </div>
      <div className="mt-10 md:mt-20 flex flex-col items-center justify-center">
        <h3 className="font-brother text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-8">
          Les Avantages
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {event.advantages.map((advantage, index) => (
            <div
              key={advantage.id || index}
              className="bg-royalblue rounded-lg p-4 sm:p-6 shadow-md flex flex-col justify-center items-center"
            >
              <h4 className="font-brother text-redmonacair text-lg sm:text-xl mb-2 sm:mb-3 text-center">
                {advantage.title}
              </h4>
              <p className="text-center text-white font-brother text-sm sm:text-base">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 md:mt-20">
        {event.additional_content ? (
          <RichText
            data={event.additional_content}
            className="rich-text font-brother text-sm sm:text-base md:text-lg"
          />
        ) : null}
      </div>
    </div>
  )
}

export default DetailsPage
