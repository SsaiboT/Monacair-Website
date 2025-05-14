import React from 'react'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Destination } from '@/payload-types'

interface DestinationProps {
  destination: Destination
}

const DetailsPage: React.FC<DestinationProps> = ({ destination }) => {
  return (
    <div className="w-full h-full py-20 px-40">
      <div className={'grid grid-cols-2 justify-items-center items-center gap-10'}>
        <RichText data={destination.description} className={'rich-text font-brother'} />
        <Image
          src={destination.image.url}
          alt={destination.image.alt}
          width={destination.image.width}
          height={destination.image.height}
          className={'object-center object-cover h-[50vh]'}
        />
      </div>
      <div className="mt-20 flex flex-col items-center justify-center">
        <h3 className="font-brother text-5xl mb-8 ">Les Avantages</h3>
        <div className="grid grid-cols-3 gap-6">
          {destination.advantages.map((advantage, index) => (
            <div
              key={advantage.id || index}
              className="bg-royalblue rounded-lg p-6 shadow-md flex flex-col justify-center items-center"
            >
              <h4 className="font-brother text-redmonacair text-xl mb-3 text-center">
                {advantage.title}
              </h4>
              <p className={'text-center text-white font-brother'}>{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={'mt-20 flex flex-col items-center justify-center'}>
        <RichText data={destination.additional_content} className={'rich-text font-brother'} />
      </div>
    </div>
  )
}

export default DetailsPage
