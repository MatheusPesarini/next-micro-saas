import type { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function userRoutes(fastify: FastifyInstance) {
	fastify.post("/users", async (request, reply) => {
		const { name, email, password } = request.body as {
			name?: string;
			email: string;
			password: string;
		};

		try {
			if (!email || !password) {
				reply.status(400).send({ error: "Dados inválidos" });
				return;
			}

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      reply.send(user);
		} catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: "Erro ao criar usuário" });
    }
	});
}
