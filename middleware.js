import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const protectedRoutes = {
  student: "/student-dashboard",
  teacher: "/teacher-dashboard",
  admin: "/admin-dashboard",
};

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // 👉 Root sayfadaysa ve giriş yapılmışsa yönlendir
  if (pathname === "/" && token) {
    const userRole = token?.role;
    const expectedPath = protectedRoutes[userRole];

    return NextResponse.redirect(new URL(expectedPath, req.url));
  }

  const isProtected = Object.values(protectedRoutes).some((path) =>
    pathname.startsWith(path)
  );

  if (!isProtected) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const userRole = token?.role;
  const expectedPath = protectedRoutes[userRole];

  if (pathname.startsWith(expectedPath)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(expectedPath, req.url));
}
