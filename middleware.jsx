import { NextResponse } from "next/server";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const env = process.env.STAGE;
  console.log("Current Environment:", env);

  const token = req.cookies.get("refreshToken")?.value;

  if (env === "production") {
    const devRoutes = [
      "/login",
      "/signup",
      "/otp-verify",
      "/profile",
      "/manage-booking",
    ];
    const isDevRoute = devRoutes.some((route) => pathname.startsWith(route));

    if (isDevRoute) {
      return NextResponse.redirect(new URL("/feature-development", req.url));
    }
  } else {
    const protectedRoutes = ["/profile", "/manage-booking"];
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isProtectedRoute && !token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
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
