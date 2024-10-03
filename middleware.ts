import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  
  const protectedRoutes = ["/signin", "/signup"];

  if (!accessToken && ["/dashboard"].includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (accessToken && protectedRoutes.includes(req.nextUrl.pathname)) { 
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  console.log("Proceeding with the request");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
};