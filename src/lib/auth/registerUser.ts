export async function registerUser(userData: {
	name: string;
	email: string;
	password: string;
}) {
	try {
		const response = await fetch("http://localhost:3001/register", {
			method: "POST",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		const result = await response.json();

		if (!response.ok) {
			throw new Error(result.error || "Erro desconhecido");
		}

		return { success: true, data: result };
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error ? error.message : "Erro ao fazer registro",
		};
	}
}
