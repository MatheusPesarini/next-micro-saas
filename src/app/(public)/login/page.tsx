"use client";

import { submitAction } from "@/app/actions/auth/login";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const initialState = {
	errors: {},
	message: "",
};

export default function Login() {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(submitAction, initialState);

	useEffect(() => {
		if (state?.success) {
			router.push("/dashboard");
			router.refresh();
		}
	}, [state, router]);

	return (
		<div>
			<h1>Login</h1>
			<form action={formAction} className="flex flex-col items-center">
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
					Logar
				</button>
			</form>
		</div>
	);
}
