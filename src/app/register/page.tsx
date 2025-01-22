"use client";

export default function Register() {
	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const data = Object.fromEntries(formData.entries());

		const response = await fetch("http://localhost:3001/register", {
			method: "POST",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const result = await response.json();
		console.log(result);
	}

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
