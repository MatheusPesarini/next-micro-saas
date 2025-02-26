"use server";

import { LoginFormSchema, type LoginFormState } from "@/lib/auth/definitions";
import { loginUser } from "@/lib/auth/loginUser";

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

	const user = await loginUser({ data: validatedFields.data });

	if ("message" in user) {
		return {
			message: user.message,
		};
	}
}
