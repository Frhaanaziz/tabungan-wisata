import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  // function middleware(req) {
  //   console.log(req.nextauth.token);
  // },
  {
    callbacks: {
      authorized: ({ token }: any) => token?.data?.role === "admin",
    },
  },
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|auth|images|icons).*)",
  ],
};
