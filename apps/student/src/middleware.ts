import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { User } from "@repo/types";
import { NextResponse } from "next/server";

const middleware = (req: NextRequestWithAuth) => {
  const user = req.nextauth.token?.data as User | undefined;
  if (!user) return NextResponse.redirect(new URL("/auth/signin", req.url));
  if (!user.schoolId)
    return NextResponse.redirect(new URL("/auth/school", req.url));
};

export default withAuth(middleware);
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|auth|monitoring|images|icons).*)",
  ],
};
