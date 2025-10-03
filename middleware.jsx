import { NextResponse } from "next/server";

export function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const env = process.env.STAGE;
  console.log("Current Environment:", env);
  
  const refreshToken = req.cookies.get("refreshToken")?.value;
  console.log("Refresh Token from middleware:", refreshToken);

  if (env === "production") {
    const devRoutes = ["/login", "/signup", "/otp-verify", "/profile", "/manage-booking"];
    const isDevRoute = devRoutes.some((route) => pathname.startsWith(route));

    if (isDevRoute) {
      return NextResponse.redirect(new URL("/feature-development", req.url));
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
