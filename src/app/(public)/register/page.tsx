"use client";

import { submitAction } from "@/app/actions/auth/register";
import { useActionState } from "react";

const initialState = {
	errors: {},
	message: "",
};

export default function Register() {
	const [state, formAction, isPending] = useActionState(
		submitAction,
		initialState,
	);

	return (
		<div>
			<h1>Registro</h1>
			<form className="flex flex-col items-center" action={formAction}>
				<input
					type="text"
					placeholder="Digite seu nome"
					name="name"
					className="text-black bg-amber-50"
				/>

				<input
					type="email"
					placeholder="Digite seu e-mail"
					name="email"
					className="text-black bg-amber-50"
				/>

				<input
					type="password"
					placeholder="Digite sua senha"
					name="password"
					className="text-black bg-amber-50"
				/>

				{state?.message && <p>{state.message}</p>}
				<button type="submit" disabled={isPending}>
					Cadastrar
				</button>
			</form>
		</div>
	);
}
