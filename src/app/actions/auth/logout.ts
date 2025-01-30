import { deleteSession } from "../../lib/cookie/session";

export async function logout() {
	await deleteSession();
}
