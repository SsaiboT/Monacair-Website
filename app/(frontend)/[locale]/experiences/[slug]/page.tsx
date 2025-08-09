import { ContextProvider } from '@/context/experiences/experience'
import { redirect } from '@/i18n/navigation'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { getExperience } from '@/app/(frontend)/[locale]/experiences/[slug]/actions'
import { getLocale } from 'next-intl/server'
import { Hero, Tabs } from '@/components/experiences/experience'
import dynamic from 'next/dynamic'

const Card = dynamic(() => import('@/components/experiences/experience').then((mod) => mod.Card))
const Footer = dynamic(() =>
  import('@/components/experiences/experience').then((mod) => mod.Footer),
)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const locale = (await getLocale()) as 'en' | 'fr' | 'all' | undefined

  const expereincesResponse = await payload.find({
    collection: 'experiences',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale,
    fallbackLocale: 'fr',
  })

  const experience = expereincesResponse.docs[0]

  if (!experience) {
    return {
      title: 'Experience Not Found',
      description: 'The requested experience could not be found.',
    }
  }
  return {
    title: experience.meta.title,
    description: experience.meta.description,
    keywords: experience.meta.keywords,
    openGraph: {
      type: 'website',
      title: experience.meta.title || undefined,
      description: experience.meta.description || undefined,
      // @ts-ignore
      images: experience.meta.image || undefined,
    },
  }
}

const Experience = async ({ params }: { params: Promise<{ slug: string }> }) => {
  return await getExperience((await params).slug, (await getLocale()) as 'en' | 'fr').then((res) =>
    res.status === 200 ? (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: res.experience.name,
              description: res.experience.description,
              image:
                typeof res.experience.image !== 'string'
                  ? res.experience.image?.url
                  : res.experience.image,
              provider: {
                '@type': 'Organization',
                name: 'Monacair',
                description: 'Helicopter transportation.',
                url: 'PlaceHolder',
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+377 97 97 39 00',
                  contactType: 'booking',
                  email: 'info@monacair.mc',
                  availableLanguage: ['English', 'French'],
                },
              },
              areaServed: {
                '@type': 'Place',
                name: res.experience.location,
              },
              additionalProperty: [
                {
                  '@type': 'PropertyValue',
                  name: 'Duration',
                  value: res.experience.duration,
                  unitText: 'Minutes',
                },
                {
                  '@type': 'PropertyValue',
                  name: 'Minimum guests',
                  value: res.experience.guests.minimum,
                },
                {
                  '@type': 'PropertyValue',
                  name: 'Maximum guests',
                  value: res.experience.guests.maximum,
                },
              ],
              offers: {
                '@type': 'Offer',
                price: res.experience.price,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                eligibleQuantity: {
                  '@type': 'QuantitativeValue',
                  minValue: res.experience.guests.minimum,
                  maxValue: res.experience.guests.maximum,
                  unitText: 'persons',
                },
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: `More ${res.experience.type} experiences`,
                itemListElement: res.experiences.map((exp) => ({
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: exp.name,
                    url: `/experiences/${exp.slug}`,
                  },
                })),
              },
            }),
          }}
        />
        <main className={'w-full flex flex-col justify-start items-start'}>
          <ContextProvider data={res}>
            <Hero data={res} />
            <article className="w-full bg-gray-50 mb-4">
              <div
                className={
                  'w-full lg:w-2/3 lg:mx-auto flex flex-col lg:flex-row justify-start items-start'
                }
              >
                <div className={'absolute -translate-y-24'} id={'experience'} />
                <div className={'w-full h-full flex flex-col justify-start items-start'}>
                  <div className={'w-full lg:w-2/3 pr-4'}>
                    <Tabs data={res} />
                  </div>
                  <Card data={res} />
                </div>
              </div>
            </article>
          </ContextProvider>
          <Footer />
        </main>
      </>
    ) : (
      redirect({ href: '/experiences', locale: res.locale })
    ),
  )
}

export default Experience
