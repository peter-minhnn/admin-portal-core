import { NextRequest, NextResponse } from "next/server";
import {getLocale, getSession, getToken} from "@/actions/cookies.action";
import { pageRoutes } from "@/shared/routes/pages.route";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/shared/configs/i18n/routing";
import {UserType} from "@/types/user.type";

const publicRoutes = [pageRoutes.auth.login];
const errorRoutes = [pageRoutes.maintenance];

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const token = await getToken();
  const session = await getSession();
  const locale = await getLocale();

  if (errorRoutes.includes(path)) {
    return handleI18nRouting(req);
  }

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL(`/${locale}/${pageRoutes.auth.login}`, req.nextUrl));
  }
  //
  if (path === "/" && token) {
    return NextResponse.redirect(new URL(`/${locale}/${pageRoutes.dashboard}`, req.nextUrl));
  }

  const user = session?.user as UserType ?? null;
  if (
    [
      pageRoutes.settings,
      // pageRoutes.sample.input,
      // pageRoutes.sample.grid,
      // pageRoutes.sample.multipleSelector,
      // pageRoutes.sample.datePicker,
    ].includes(path) &&
    token &&
      user?.userName !== "minhnn"
  ) {
    return NextResponse.redirect(new URL(`/${locale}/${pageRoutes.dashboard}`, req.nextUrl));
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: [
    "/(en|vi|ko)/:path*",
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
  ],
};
