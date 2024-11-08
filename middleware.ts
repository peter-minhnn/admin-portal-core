import { NextRequest, NextResponse } from "next/server";
import { getSession, getToken } from "@/actions/cookies.action";
import { pageRoutes } from "@/shared/routes/pages.route";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/shared/configs/i18n/routing";

const publicRoutes = [pageRoutes.auth.login];
const errorRoutes = [pageRoutes.maintenance];

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const token = await getToken();
  const session = await getSession();

  if (errorRoutes.includes(path)) {
    return handleI18nRouting(req);
  }

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL(pageRoutes.auth.login, req.nextUrl));
  }
  //
  if (path === "/" && token) {
    return NextResponse.redirect(new URL(pageRoutes.dashboard, req.nextUrl));
  }

  if (
    [
      pageRoutes.settings,
      pageRoutes.sample.input,
      pageRoutes.sample.grid,
      pageRoutes.sample.multipleSelector,
      pageRoutes.sample.datePicker,
    ].includes(path) &&
    token &&
    session?.username !== "minhnn"
  ) {
    return NextResponse.redirect(new URL(pageRoutes.dashboard, req.nextUrl));
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: [
    "/(en|vi)/:path*",
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
  ],
};
