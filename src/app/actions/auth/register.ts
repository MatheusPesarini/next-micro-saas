"use server";

import { RegisterFormSchema, type RegisterFormState } from "@/lib/auth/definitions";

export async function handleSubmit(currentState: RegisterFormState, data: FormData) {
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

	const response = await fetch("http://localhost:3001/register", {
		method: "POST",
		cache: "no-cache",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(validatedFields.data),
	});

	const result = await response.json();
	console.log(result);
}
