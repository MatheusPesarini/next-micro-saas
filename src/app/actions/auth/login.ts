// "use server";

import { LoginFormSchema, type LoginFormState } from "@/lib/auth/definitions";

export async function handleSubmit(state: LoginFormState, formData: FormData) {
	console.log("Executando handleSubmit no servidor");

	const validatedFields = LoginFormSchema.safeParse({
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	});

	// Se os campos não forem válidos, retornar os erros antes de fazer a requisição
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Erro ao validar campos antes do envio",
		};
	}

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
