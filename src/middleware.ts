import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = { 
  matcher: [
    "/",
    "/journal/:path*",
    "/concepts/:path*",
    "/docs/:path*",
    "/settings/:path*",
  ] 
};
