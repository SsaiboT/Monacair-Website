import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest, NextResponse } from 'next/server'

const middleware = (req: NextRequest) => {
  const { pathname } = req.nextUrl

  const pathParts = pathname.split('/')
  const potentialLocale = pathParts[1] as 'en' | 'fr'
  const isLocalePresent = routing.locales?.includes(potentialLocale)

  const pathWithoutLocale = isLocalePresent ? `/${pathParts.slice(2).join('/')}` : pathname

  if (
    [
      '/booking',
      '/booking/panoramic',
      '/booking/regular',
      '/booking/private',
      '/flights/panoramic',
      '/flights/regular',
    ].includes(pathWithoutLocale)
  ) {
    const redirectPath = isLocalePresent ? `/${potentialLocale}/flights` : '/flights'

    return NextResponse.redirect(new URL(redirectPath, req.url))
  }

  const handleI18nRouting = createMiddleware(routing)
  return handleI18nRouting(req)
}

export const config = {
  matcher: '/((?!api|admin|trpc|_next|_vercel|.*\\..*).*)',
}

export default middleware
