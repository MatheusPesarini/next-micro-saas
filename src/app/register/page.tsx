import { handleSubmit } from "../actions/auth/register";

export default function Register() {
	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSubmit} className="flex flex-col items-center">
				<input
					type="text"
					placeholder="Digite seu nome"
					name="name"
					className="text-black"
				/>
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
				<button type="submit">Cadastrar</button>
			</form>
		</div>
	);
}
