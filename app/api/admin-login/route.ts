import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const username = String(body.username ?? "");
    const password = String(body.password ?? "");

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const authSecret = process.env.ADMIN_SECRET;

    if (!adminUsername || !adminPassword || !authSecret) {
      return NextResponse.json(
        { error: "Admin giriş ayarları yapılandırılmamış." },
        { status: 500 }
      );
    }

    if (
      username !== adminUsername ||
      password !== adminPassword
    ) {
      return NextResponse.json(
        { error: "Kullanıcı adı veya şifre hatalı." },
        { status: 401 }
      );
    }

    const secret = new TextEncoder().encode(authSecret);

    const token = await new SignJWT({
      username,
      role: "admin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { error: "Geçersiz istek." },
      { status: 400 }
    );
  }
}