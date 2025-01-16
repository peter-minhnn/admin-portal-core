import { NextRequest, NextResponse } from 'next/server';
import {
  getLocale,
  getSession,
  getToken,
  getUserInfoLogin,
} from '@/actions/cookies.action';
import { pageRoutes } from '@/shared/routes/pages.route';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/shared/configs/i18n/routing';
import { deleteSession } from '@/shared/lib/session';
import { AuthUserType } from '@/types/user.type';

const errorRoutes = [pageRoutes.maintenance];

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken();
  const locale = await getLocale();
  const isValidUser = await getUserInfoLogin();
  const session = await getSession();
  const defaultLocale = locale ? `/${locale}` : '/vi';
  const publicRoutes = [
    `${defaultLocale}${pageRoutes.auth.login}`,
    `${defaultLocale}${pageRoutes.withdraw}`,
  ];
  const isPublicRoute = publicRoutes.includes(path);

  if (errorRoutes.includes(path)) {
    return handleI18nRouting(req);
  }

  if ((!isPublicRoute && !token) || (!isValidUser && !isPublicRoute)) {
    await deleteSession();
    return NextResponse.redirect(
      new URL(`${defaultLocale}${pageRoutes.auth.login}`, req.nextUrl)
    );
  }

  const user = session?.user as AuthUserType;
  if (
    [
      pageRoutes.settings,
      pageRoutes.rolesPermissions,
      pageRoutes.sample.input,
      pageRoutes.sample.grid,
      pageRoutes.sample.datePicker,
      pageRoutes.sample.multipleSelector,
    ].includes(path?.replace(defaultLocale, '')) &&
    token &&
    user?.userName !== process.env.NEXT_PUBLIC_AUTH_ID &&
    user?.pwd !== process.env.NEXT_PUBLIC_AUTH_PWD
  ) {
    return NextResponse.redirect(
      new URL(`${defaultLocale}${pageRoutes.notFound}`, req.nextUrl)
    );
  }

  if (path === '/' && token) {
    return NextResponse.redirect(
      new URL(`${defaultLocale}${pageRoutes.dashboard}`, req.nextUrl)
    );
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: [
    '/(vi|ko)/:path*',
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
};
