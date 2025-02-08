import { type NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/cookie/session";
import { cookies } from "next/headers";
import { verifySession } from "./app/lib/cookie/dal";

const protectedRoutes = ["/dashboard"];
const publicRoutes = [
	{ path: "/" },
	{ path: "/login", whenAuthenticated: "redirect" },
	{
		path: "/register",
		whenAuthenticated: "redirect",
	},
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	console.log("Verificando rota:", path);
	const publicRoute = publicRoutes.find((route) => route.path === path);
	const cookieStore = await cookies();
  const authToken = req.cookies.get("session")?.value;
	const session = await decrypt(authToken);

	console.log("Token encontrado no cookie:", authToken);
  console.log("Resultado da decodificação:", session);

	if (!session && publicRoute) {
		return NextResponse.next();
	}

	if (!session && !publicRoute) {
		const redirectUrl = req.nextUrl.clone();
		redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
		return NextResponse.redirect(redirectUrl);
	}

	if (session && publicRoute && 'whenAuthenticated' in publicRoute && publicRoute.whenAuthenticated === "redirect") {
		const redirectUrl = req.nextUrl.clone();
		redirectUrl.pathname = "/";
		return NextResponse.redirect(redirectUrl);
	}

	if (session && !publicRoute) {
		const sessionVerification = await verifySession();
		if (!sessionVerification.isAuth) {
			const redirectUrl = req.nextUrl.clone();
			redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
			return NextResponse.redirect(redirectUrl);
		}
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
