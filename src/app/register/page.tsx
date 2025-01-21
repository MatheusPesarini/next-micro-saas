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
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="Digite seu nome" name="name" />
				<input type="email" placeholder="Digite seu e-mail" name="email" />
				<input type="password" placeholder="Digite sua senha" name="password" />
				<button type="submit">Cadastrar</button>
			</form>
		</div>
	);
}
