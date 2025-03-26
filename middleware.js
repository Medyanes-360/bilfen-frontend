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

  const isProtected = Object.values(protectedRoutes).some((path) =>
    pathname.startsWith(path)
  );

  // ✅ Allow if route is not protected
  if (!isProtected) return NextResponse.next();

  // 🔐 Not logged in → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const userRole = token?.role;
  const expectedPath = protectedRoutes[userRole];

  // ✅ If user is accessing their own dashboard → allow
  if (pathname.startsWith(expectedPath)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(expectedPath, req.url));
}
