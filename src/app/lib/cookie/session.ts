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
		if (!session) {
			console.log("Sessão indefinida ou vazia");
			return null;
		}

		console.log("Token recebido:", session);
		console.log("Chave secreta:", secretKey); // Remova em produção

		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ["HS256"],
		});

		console.log("Payload decodificado:", payload);

		// Verifique se o token expirou
		const now = Math.floor(Date.now() / 1000);
		if (payload.exp && payload.exp < now) {
			console.log("Token expirado");
			fetch("http://localhost:3001/logout", {
				method: "POST",
				credentials: "include",
				cache: "no-cache",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ action: "logout" }),
			});
			return null;
		}

		return payload as SessionPayload;
	} catch (error) {
		console.log("Erro ao verificar sessão:", error);
		return null;
	}
}

export async function createUserSession(userId: string) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const session = await encrypt({ userId, expiresAt, userRole: "user" });
	console.log("Token gerado:", session);
	return session;
}
