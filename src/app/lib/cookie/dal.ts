import { cookies } from "next/headers";
import { decrypt } from "./session";

export async function verifySession() {
	const cookie = (await cookies()).get("session")?.value;
	const session = await decrypt(cookie);

	if (!session?.userId) {
		return { isAuth: false };
	}

	return { isAuth: true, userId: session.userId, userRole: session.userRole };
}
