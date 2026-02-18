import { NextResponse, NextRequest } from "next/server";

function decodeToken(token: string | undefined) {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
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
  const token = req.cookies.get("auth_token")?.value;
  const decoded = decodeToken(token);

  if (pathname.startsWith("/admin")) {
    if (!decoded) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/app/dashboard", req.url));
    }
  }

  if (pathname.startsWith("/app/dashboard")) {
    if (!decoded) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (pathname === "/login" || pathname === "/register") {
    if (decoded) {
      if (decoded.role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      } else {
        return NextResponse.redirect(new URL("/app/dashboard", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};