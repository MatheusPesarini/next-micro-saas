import "server-only";
import { SignJWT, jwtVerify } from "jose";
import type { SessionPayload } from "../auth/definitions";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7d")
		.sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ["HS256"],
		});

		// Verifique se o token expirou
		const now = Math.floor(Date.now() / 1000);
		if (payload.exp && payload.exp < now) {
			console.log("Token expirado");
			deleteSession();
			return null;
		}

		return payload as SessionPayload;
	} catch (error) {
		console.log("Failed to verify session");
		return null;
	}
}

export async function createUserSession(userId: string) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const session = await encrypt({ userId, expiresAt, userRole: "user" });
	const cookieStore = await cookies();

	cookieStore.set("session", session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
}

export async function deleteSession() {
	const cookieStore = await cookies();
	cookieStore.set("session", "", {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		expires: new Date(0),
		path: "/",
	});
}
