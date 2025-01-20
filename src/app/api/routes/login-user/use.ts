import type { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import argon2 from "argon2";

const prisma = new PrismaClient();

const loginUserSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
});

export default async function userRoutes(fastify: FastifyInstance) {
	fastify.post("/login", async (request, reply) => {
		const result = loginUserSchema.safeParse(request.body);

		if (!result.success) {
			reply.status(400).send({ error: "Dados inválidos" });
			return;
		}

		const { email, password } = result.data;

		try {
			const user = await prisma.user.findUnique({
				where: {
					email,
				},
			});

			if (!user) {
				reply.status(404).send({ error: "Usuário não encontrado" });
				return;
			}

			const isPasswordValid = await argon2.verify(user.password, password);

			if (!isPasswordValid) {
				reply.status(401).send({ error: "Senha inválida" });
				return;
			}

			//reply.redirect("/", 303);
			reply.send({ message: "Usuário logado com sucesso" });
		} catch (error) {
			fastify.log.error(error);
			reply.status(500).send({ error: "Erro ao fazer login" });
		}
	});
}
