import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/actions/cookies.action";
import { pageRoutes } from "@/shared/routes/pages.route";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/shared/configs/i18n/routing";

const publicRoutes = [pageRoutes.auth.login];
const handleI18nRouting = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const session = await getSession();

  if (!isPublicRoute && !session?.phoneNumber) {
    return NextResponse.redirect(new URL(pageRoutes.auth.login, req.nextUrl));
  }
  //
  if (path === "/" && session?.phoneNumber) {
    return NextResponse.redirect(new URL(pageRoutes.dashboard, req.nextUrl));
  }

  if (path === "/sample" && session?.phoneNumber !== "0764849787") {
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
