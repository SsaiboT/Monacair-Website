import { Suspense } from 'react'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import '../globals.css'
import Navbar from '@/components/shared/navbar'
import { getPayloadClient } from '@/lib/payload'
import { GoogleAnalytics } from '@next/third-parties/google'

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
    <html lang={locale} className={'bg-royalblue'}>
      <body className={'scroll-smooth'}>
        <NextIntlClientProvider>
          <Suspense>
            <Navbar
              data={{
                destinations: await payload.find({
                  collection: 'destinations',
                  sort: 'order',
                  locale,
                  fallbackLocale: 'fr',
                  limit: 0,
                }),
                events: await payload.find({
                  collection: 'Events',
                  sort: 'order',
                  locale,
                  fallbackLocale: 'fr',
                  limit: 0,
                }),
              }}
            />
          </Suspense>
          {children}
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId={'G-Y0DLDBBKHL'} />
    </html>
  )
}
