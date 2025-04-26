import React from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

const BookingCta = () => {
  const t = useTranslations('PrivateJet.booking')

  return (
    <section className="w-full py-20 bg-royalblue relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-redmonacair/20 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-redmonacair/10 translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-brother font-medium text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-base md:text-lg text-white/80 mb-10 font-brother">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full justify-center">
            <Link href="/private-jet/reservation" className="w-full sm:w-auto">
              <Button
                variant="red"
                size="lg"
                className="w-full sm:w-auto text-base px-8 py-6 h-auto font-medium transition-transform hover:scale-105"
              >
                {t('book_button')}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Button>
            </Link>

            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="blue"
                size="lg"
                className="w-full sm:w-auto text-base px-8 py-6 h-auto font-medium transition-transform hover:scale-105 border border-white/30 bg-white/10 hover:bg-white/20"
              >
                {t('contact_button')}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingCta
