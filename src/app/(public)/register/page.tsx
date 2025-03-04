"use client";

import { handleSubmit } from "../../actions/auth/register";
import { useActionState } from "react";

export default function Register() {
	const [state, formAction] = useActionState(handleSubmit, { errors: {} });

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
				{state?.errors?.name && <p>{state.errors.name}</p>}

				<input
					type="email"
					placeholder="Digite seu e-mail"
					name="email"
					className="text-black bg-amber-50"
				/>
				{state?.errors?.email && <p>{state.errors.email}</p>}

				<input
					type="password"
					placeholder="Digite sua senha"
					name="password"
					className="text-black bg-amber-50"
				/>
				{state?.errors?.password && (
					<div>
						<p>A senha deve ter:</p>
						<ul>
							{state.errors.password.map((error) => (
								<li key={error}>- {error}</li>
							))}
						</ul>
					</div>
				)}

				<button type="submit">Cadastrar</button>
			</form>
		</div>
	);
}
