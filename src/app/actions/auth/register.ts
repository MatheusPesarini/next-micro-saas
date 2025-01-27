"use server";

export async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
