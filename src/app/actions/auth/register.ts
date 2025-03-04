"use server";

import {
	RegisterFormSchema,
	type RegisterFormState,
} from "@/lib/auth/definitions";
import { redirect } from "next/navigation";
import { registerUser } from "@/lib/auth/registerUser";

export async function handleSubmit(
	currentState: RegisterFormState,
	data: FormData,
) {
	const validatedFields = RegisterFormSchema.safeParse({
		name: data.get("name") as string,
		email: data.get("email") as string,
		password: data.get("password") as string,
	});

	// Se os campos não forem válidos, retornar os erros antes de fazer a requisição
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const result = await registerUser(validatedFields.data);

	if (!result.success) {
		// Retorna erro para o formulário, em vez de redirecionar
		return {
			message: result.message,
			errors: {},
		};
	}

	console.log(result.data);

	redirect("/login");
}
