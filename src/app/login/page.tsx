"use client";

import { handleSubmit } from "../actions/auth/login";
import { useActionState } from "react";

export default function Login() {
	const [state, action, pending] = useActionState(handleSubmit, undefined);

	return (
		<div>
			<h1>Login</h1>
			<form action={action} className="flex flex-col items-center">
				<input
					type="email"
					placeholder="Digite seu e-mail"
					name="email"
					className="text-black"
				/>
				{state?.errors?.email && <p>{state.errors.email}</p>}

				<input
					type="password"
					placeholder="Digite sua senha"
					name="password"
					className="text-black"
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

				<button type="submit" disabled={pending}>
					Logar
				</button>
			</form>
		</div>
	);
}
