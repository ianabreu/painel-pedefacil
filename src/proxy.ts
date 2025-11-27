import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const publicRoutes = ["/", "/_next", "/login", "/cadastro"];
  const isPublic = publicRoutes.some((route) => pathname === route);
  const token = await getCookieServer();
  if (isPublic) {
    if (["/login", "/cadastro"].some((r) => pathname.startsWith(r))) {
      if (token && (await validateToken(token))) {
        return NextResponse.redirect(new URL("/painel", req.url));
      }
    }

    return NextResponse.next();
  }
  if (pathname.startsWith("/painel")) {
    if (!token || !(await validateToken(token))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

async function validateToken(token: string) {
  if (!token) return false;

  try {
    await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch {
    return false;
  }
}
