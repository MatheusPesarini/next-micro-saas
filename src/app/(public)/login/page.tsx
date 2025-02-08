"use client";

import { handleSubmit } from "../../actions/auth/login";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
	const router = useRouter();
	const [state, action, pending] = useActionState(handleSubmit, undefined);

	useEffect(() => {
		if (state?.sucess) {
			router.push("/dashboard");
			router.refresh();
		}
	}, [state, router]);

	return (
		<div>
			<h1>Login</h1>
			<form action={action} className="flex flex-col items-center">
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

				<button type="submit" disabled={pending}>
					Logar
				</button>
			</form>
		</div>
	);
}
