"use client";

export async function loginUser(validatedFields: { data: { email: string; password: string } }) {
  try {
		const response = await fetch("http://localhost:3001/login", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(validatedFields.data),
		});

		const result = await response.json();

		if (!response.ok) {
			throw new Error(result.error);
		}

		return { sucess: true };
	} catch (error) {
		return {
			message: "Erro ao fazer login",
		};
	}
}