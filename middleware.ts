import { NextRequest, NextResponse } from 'next/server'
import { getLocale, getToken } from '@/actions/cookies.action'
import { pageRoutes } from '@/shared/routes/pages.route'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/shared/configs/i18n/routing'

const errorRoutes = [pageRoutes.maintenance]

const handleI18nRouting = createMiddleware(routing)

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const token = await getToken()
    const locale = await getLocale()
    const defaultLocale = locale ? `/${locale}` : '/vi'
    const publicRoutes = [`${defaultLocale}${pageRoutes.auth.login}`]
    const isPublicRoute = publicRoutes.includes(path)

    if (errorRoutes.includes(path)) {
        return handleI18nRouting(req)
    }

    if (!isPublicRoute && !token) {
        return NextResponse.redirect(
            new URL(`${defaultLocale}${pageRoutes.auth.login}`, req.nextUrl)
        )
    }
    //
    if (path === '/' && token) {
        return NextResponse.redirect(
            new URL(`${defaultLocale}${pageRoutes.dashboard}`, req.nextUrl)
        )
    }

    return handleI18nRouting(req)
}

export const config = {
    matcher: [
        '/(vi|ko)/:path*',
        '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
    ],
}
