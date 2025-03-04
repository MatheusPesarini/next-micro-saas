"use server";

import { LoginFormSchema, type LoginFormState } from "@/lib/auth/definitions";
import { loginUser } from "@/lib/auth/loginUser";

export async function handleSubmit(
	currentState: LoginFormState,
	data: FormData,
) {
	const validatedFields = LoginFormSchema.safeParse({
		email: data.get("email") as string,
		password: data.get("password") as string,
	});

	// Se os campos não forem válidos, retornar os erros antes de fazer a requisição
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Erro ao validar campos antes do envio",
		};
	}

	const result = await loginUser(validatedFields.data);

	if (!result.success) {
		// Retorna erro para o formulário, em vez de redirecionar
		return {
			message: result.message,
			errors: {},
		};
	}

	console.log(result.data);

	return {
		success: true,
		message: "Login feito com sucesso",
		data: result.data,
	};
}
