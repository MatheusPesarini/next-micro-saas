import { z } from "zod";

export const LoginFormSchema = z.object({
	email: z
		.string()
		.email({ message: "Por favor digite um e-mail válido." })
		.trim(),
	password: z
		.string()
		.min(1, { message: "Precisa ter 1 caractér no minímo" })
		// .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
		// .regex(/[0-9]/, { message: 'Contain at least one number.' })
		// .regex(/[^a-zA-Z0-9]/, {
		//   message: 'Contain at least one special character.',
		// })
		.trim(),
});

export type FormState =
	| {
			errors?: {
				email?: string[];
				password?: string[];
			};
			message?: string;
	  }
	| undefined;
