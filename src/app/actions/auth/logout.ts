// "use server";

export async function handleSubmit() {
	try {
		const response = await fetch("http://localhost:3001/logout", {
			method: "POST",
			credentials: "include",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ action: "logout" }),
		});

		if (!response.ok) {
			throw new Error("Erro ao fazer logout");
		}

		const result = await response.json();
		console.log(result);
	} catch (error) {
		console.error("Erro ao fazer logout", error);
		throw error;
	}
}
