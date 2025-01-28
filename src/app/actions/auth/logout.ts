import { cookies } from "next/headers";
import { deleteSession } from "../../lib/cookie/session";

export async function logout() {
	deleteSession();
}
