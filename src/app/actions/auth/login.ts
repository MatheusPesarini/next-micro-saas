"use server";

import {
	LoginFormSchema,
	type LoginFormState,
} from "@/app/actions/definitions";

export async function submitAction(prevState: LoginFormState, data: FormData) {
	const validatedFields = LoginFormSchema.safeParse({
		email: data.get("email") as string,
		password: data.get("password") as string,
	});

	if (!validatedFields.success) {
		return {
			message: "Falha ao validar dados de login",
			errors: {},
		};
	}

	const result = await fetch("http://localhost:3001/login", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(validatedFields.data),
	});

	if (!result.ok) {
		return {
			message: "Erro ao fazer login",
			errors: {},
		};
	}

	return {
		success: true,
		message: "Login feito com sucesso",
	};
}
