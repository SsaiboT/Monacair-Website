import React from 'react'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import '../globals.css'
import Navbar from '@/components/shared/navbar'
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

  return (
    <html lang={locale} className={'bg-royalblue'}>
      <body className={'w-full gap-[2vh]'}>
        <NextIntlClientProvider>
          <Navbar />
          {children}
          {/* <Image src={logo} alt={'Alliance BHSM logo'} className={'w-[48vh]'} />
          <h1 className={'text-2xl'}>Site web en construction</h1>
          <h2 className={'text-xl'}>À très bientôt !</h2> */}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
