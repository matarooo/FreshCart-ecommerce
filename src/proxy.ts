import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const authPages = new Set([
  "/login",
  "/sign-up",
  "/register",
  "/forgot-password",
  "/verify-code",
  "/reset-password",
]);

export async function proxy(req: NextRequest) {
  const { pathname, protocol, search } = req.nextUrl;
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
    secureCookie: protocol === "https:",
  });

  if (authPages.has(pathname)) {
    return token
      ? NextResponse.redirect(new URL("/", req.url))
      : NextResponse.next();
  }

  if (token) return NextResponse.next();

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("callbackUrl", pathname + search);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/login",
    "/sign-up",
    "/register",
    "/forgot-password",
    "/verify-code",
    "/reset-password",
    "/checkout/:path*",
    "/orders/:path*",
    "/allorders/:path*",
    "/account/:path*",
  ],
};
