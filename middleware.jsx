import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  console.log("Middleware is running" , refreshToken);

  const authPages = ["/login", "/signup"];
  const otpVerify = pathname.startsWith("/otp-verify");

  if (authPages.includes(pathname) || otpVerify) {
    if (refreshToken) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
    return NextResponse.next(); 
  }

  const protectPages = ["/profile"]
  if (protectPages.includes(pathname)) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: ["/login", "/signup", "/otp-verify/:id*", "/profile",]
};
