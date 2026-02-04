import { NextResponse, NextRequest } from "next/server";

function decodeToken(token: string) {
  try {
    const payload = token.split(".")[1];

    // ✅ middleware-safe base64 decode
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = Buffer.from(base64, "base64").toString("utf-8");

    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ cookie name must match your setAuthToken()
  const token = req.cookies.get("auth_token")?.value;

  const decoded = token ? decodeToken(token) : null;

  // ✅ /admin routes - only admin
  if (pathname.startsWith("/admin")) {
    if (!decoded) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // ✅ /dashboard - logged in users only
  if (pathname.startsWith("/dashboard")) {
    if (!decoded) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // ✅ /login + /register - if already logged in redirect
  if (pathname === "/login" || pathname === "/register") {
    if (decoded) {
      if (decoded.role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
