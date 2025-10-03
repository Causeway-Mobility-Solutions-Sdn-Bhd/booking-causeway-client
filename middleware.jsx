import { NextResponse } from "next/server";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const env = process.env.STAGE;
  console.log("Current Environment:", env);

  const token = req.cookies.get("refreshToken")?.value;
  console.log("refreshToken:", token);

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
  } 
  // else if (env === "staging") {
  //   const authRoutes = ["/login", "/signup", "/otp-verify"];
  //   const manageRoutes = ["/profile", "/manage-booking"];

  //   if (token) {
  //     if (authRoutes.some((route) => pathname.startsWith(route))) {
  //       return NextResponse.redirect(new URL("/profile", req.url));
  //     }
  //   } else {
  //     if (manageRoutes.some((route) => pathname.startsWith(route))) {
  //       return NextResponse.redirect(new URL("/login", req.url));
  //     }
  //   }
  // }

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
