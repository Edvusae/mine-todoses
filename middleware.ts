import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // If no token, let NextAuth handle the redirect
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    // Redirect base /dashboard to role-specific dashboard
    if (path === "/dashboard") {
      if (token.role === "admin") {
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));
      } else if (token.role === "user") {
        return NextResponse.redirect(new URL("/dashboard/user", req.url));
      }
    }

    // Protect admin routes
    if (path.startsWith("/dashboard/admin")) {
      if (token.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard/user", req.url));
      }
    }

    // Protect user routes
    if (path.startsWith("/dashboard/user")) {
      if (token.role !== "user") {
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Allow access if token exists
        return !!token;
      },
    },
    pages: {
      signIn: "/signin",
    },
  }
);

// Only protect dashboard routes
export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
};