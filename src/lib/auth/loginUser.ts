export async function loginUser(userData: { email: string; password: string }) {
	try {
		const response = await fetch("http://localhost:3001/login", {
			method: "POST",
			credentials: "include",
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
