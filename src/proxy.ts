import NextAuth from "next-auth"
import { authConfig } from "./lib/auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthRoute = req.nextUrl.pathname.startsWith("/login")
  
  if (isAuthRoute) {
    if (isLoggedIn) {
      if (req.auth?.user?.role === "ADMIN") {
        return Response.redirect(new URL("/admin", req.nextUrl))
      }
      return Response.redirect(new URL("/worker", req.nextUrl))
    }
    return
  }
  
  if (!isLoggedIn && req.nextUrl.pathname !== "/") {
    return Response.redirect(new URL("/login", req.nextUrl))
  }
  
  if (isLoggedIn) {
    const role = req.auth?.user?.role
    if (req.nextUrl.pathname === "/") {
       if (role === "ADMIN") return Response.redirect(new URL("/admin", req.nextUrl))
       return Response.redirect(new URL("/worker", req.nextUrl))
    }
    if (req.nextUrl.pathname.startsWith("/admin") && role !== "ADMIN") {
      return Response.redirect(new URL("/worker", req.nextUrl))
    }
    if (req.nextUrl.pathname.startsWith("/worker") && role !== "WORKER") {
      return Response.redirect(new URL("/admin", req.nextUrl))
    }
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
