import { Suspense } from 'react'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import '../globals.css'
import Navbar from '@/components/shared/navbar'
import { getPayloadClient } from '@/lib/payload'
import Image from 'next/image'
import logo from '@/public/logos/primary.png'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const payload = await getPayloadClient()

  return (
    <html lang={locale} className={'bg-royalblue scroll-smooth'}>
      <body className={'w-full'}>
        <NextIntlClientProvider>
          <Suspense>
            <Navbar
              data={{
                destinations: await payload.find({
                  collection: 'destinations',
                  locale,
                  fallbackLocale: 'fr',
                  limit: 0,
                }),
                events: await payload.find({
                  collection: 'Events',
                  locale,
                  fallbackLocale: 'fr',
                  limit: 0,
                }),
              }}
            />
          </Suspense>
          {children}
        </NextIntlClientProvider>
        {/* <Image src={logo} alt={'Alliance BHSM logo'} className={'w-[48vh]'} />
        <h1 className={'text-2xl'}>Site web en construction</h1>
        <h2 className={'text-xl'}>À très bientôt !</h2> */}
      </body>
    </html>
  )
}
