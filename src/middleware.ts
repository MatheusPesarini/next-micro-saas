import { type NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/cookie/session";
import { cookies } from "next/headers";
import { verifySession } from "./app/lib/cookie/dal";

const protectedRoutes = ["/profile"];
const publicRoutes = [
	{ path: "/login", whenAuthenticated: "redirect" },
	{
		path: "/register",
		whenAuthenticated: "redirect",
	},
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/register";

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const publicRoute = publicRoutes.find((route) => route.path === path);
	const authToken = (await cookies()).get("session")?.value;
	const session = await decrypt(authToken);

	if (!session && publicRoute) {
		return NextResponse.next();
	}

	if (!session && !publicRoute) {
		const redirectUrl = req.nextUrl.clone();

		redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

		return NextResponse.redirect(redirectUrl);
	}

	if (session && publicRoute && publicRoute.whenAuthenticated === "redirect") {
		const redirectUrl = req.nextUrl.clone();

		redirectUrl.pathname = "/";

		return NextResponse.redirect(redirectUrl);
	}

	if (session && !publicRoute) {
		verifySession();
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
