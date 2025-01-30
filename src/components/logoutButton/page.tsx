"use client";

export default function LogoutButton() {
	const handleLogout = async () => {
		const response = await fetch("/logout", {
			method: "POST",
		});

		if (response.ok) {
			// Redirecionar para a página de login ou outra página apropriada
			window.location.href = "/login";
		} else {
			console.error("Erro ao fazer logout");
		}
	};

	return <button type="button" onClick={handleLogout}>Logout</button>;
}
