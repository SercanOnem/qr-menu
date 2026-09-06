import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_session")?.value;
  const secret = process.env.ADMIN_SECRET;

  if (!token || !secret) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  try {
    const secretKey = new TextEncoder().encode(secret);

    await jwtVerify(token, secretKey);

    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(
      new URL("/admin/login", request.url)
    );

    response.cookies.delete("admin_session");

    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};