import {
	LoginFormSchema,
	type LoginFormState,
} from "@/app/lib/auth/definitions";

export async function handleSubmit(state: LoginFormState, formData: FormData) {
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

	const response = await fetch("http://localhost:3001/login", {
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
