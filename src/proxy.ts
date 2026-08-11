import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// TODO(Lesson 16): this checks for a placeholder cookie only.
// Real session validation (signature check, expiry, etc.) comes with Auth.js.
const PROTECTED_PREFIXES = ["/dashboard", "/settings", "/profile/edit"];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("devconnect_session");

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isProtected && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/profile/edit/:path*", "/login"],
};