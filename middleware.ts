import { NextRequest, NextResponse } from "next/server";
import { toast } from "sonner";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  const protectedRoutes = ["/signin", "/signup"];

  if (!accessToken) {
    toast.message("Please sign in again");
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (accessToken && protectedRoutes.includes(req.nextUrl.pathname)) { 
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
};
