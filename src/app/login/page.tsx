export default function Login() {
	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const response = await fetch("http://localhost:3000/login", {
			method: "POST",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				body: formData,
			}),
		});

		const data = await response.json();
		console.log(data);
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<input type="email" placeholder="Digite seu e-mail" name="email" />
				<input type="password" placeholder="Digite sua senha" name="password" />
				<button type="submit">Logar</button>
			</form>
		</div>
	);
}
