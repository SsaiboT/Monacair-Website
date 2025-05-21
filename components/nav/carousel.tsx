import Image from 'next/image'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextNav,
  CarouselPreviousNav,
} from '@/components/ui/carousel'
import { Destination, Event } from '@/payload-types'
import { PaginatedDocs } from 'payload'

const DestinationsCarousel = ({ data }: { data: PaginatedDocs<Destination> }) => (
  <Carousel className={'w-full flex flex-col'}>
    <div className={'right-0'}>
      <CarouselPreviousNav />
      <CarouselNextNav />
    </div>
    <CarouselContent className="h-full">
      {data.docs.map((item: any) => (
        <CarouselItem
          className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 relative h-[300px] sm:h-[400px]"
          key={item.id}
        >
          <Link href={`/destinations/${item.slug}`}>
            <div className="absolute">
              <Image
                src={item.carousel_image.url}
                alt={item.carousel_image.alt}
                width={item.carousel_image.width}
                height={item.carousel_image.height}
                className="object-cover object-center h-[300px] sm:h-[400px] w-full rounded-md"
              />
              <div className="absolute inset-0 bg-black/20 rounded-md" />
            </div>
          </Link>
          <div className="relative p-3">
            <h2 className="font-brother text-2xl text-white">{item.title}</h2>
            <h3 className="font-brother text-sm text-white w-2/3">{item.carousel_subtitle}</h3>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
)

const EventsCarousel = ({ data }: { data: PaginatedDocs<Event> }) => (
  <Carousel className={'w-full flex flex-col'}>
    <div>
      <CarouselPreviousNav />
      <CarouselNextNav />
    </div>
    <CarouselContent className="h-full">
      {data.docs.map((item: any) => (
        <CarouselItem
          className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 relative h-[300px] sm:h-[400px]"
          key={item.id}
        >
          <Link href={`/events/${item.slug}`}>
            <div className="absolute">
              <Image
                src={item.carousel_image.url}
                alt={item.carousel_image.alt}
                width={item.carousel_image.width}
                height={item.carousel_image.height}
                className="object-cover object-center h-[300px] sm:h-[400px] w-full rounded-md"
              />
              <div className="absolute inset-0 bg-black/20 rounded-md" />
            </div>
          </Link>
          <div className="relative p-3">
            <h2 className="font-brother text-2xl text-white">{item.title}</h2>
            <h3 className="font-brother text-sm text-white w-2/3">{item.carousel_subtitle}</h3>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
)

export { DestinationsCarousel, EventsCarousel }
