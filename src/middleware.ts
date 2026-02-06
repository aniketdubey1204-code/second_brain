export { default } from "next-auth/middleware"

export const config = { 
  matcher: [
    "/",
    "/journal/:path*",
    "/concepts/:path*",
    "/docs/:path*",
    "/settings/:path*",
  ] 
}
