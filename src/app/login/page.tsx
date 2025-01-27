import { handleSubmit } from "../actions/auth/login";

export default function Login() {
	return (
		<div>
			<h1>Login</h1>
			<form action={handleSubmit} className="flex flex-col items-center">
				<input
					type="email"
					placeholder="Digite seu e-mail"
					name="email"
					className="text-black"
				/>
				<input
					type="password"
					placeholder="Digite sua senha"
					name="password"
					className="text-black"
				/>
				<button type="submit">Logar</button>
			</form>
		</div>
	);
}
