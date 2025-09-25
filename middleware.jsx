import { NextResponse } from "next/server";

export function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const env = process.env.STAGE;
  console.log("Current Environment:", env);

  if (env === "staging") {
    const devRoutes = ["/login", "/signup", "/otp-verify", "/profile", "/manage-booking"];
    const isDevRoute = devRoutes.some((route) => pathname.startsWith(route));

    if (isDevRoute) {
      return NextResponse.redirect(new URL("/feature-development", req.url));
    }
  } else if (env === "production") {
    return NextResponse.redirect(new URL("/under-development", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/otp-verify/:id*",
    "/profile",
    "/manage-booking",
    "/",
  ],
};
