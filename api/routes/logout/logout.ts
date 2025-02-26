"use server";

import type { FastifyInstance } from "fastify";

export default async function logoutRoutes(fastify: FastifyInstance) {
	fastify.post("/logout", async (request, reply) => {
		try {
			reply.clearCookie("session", {
				path: "/",
				domain: "localhost",
				secure: true,
				httpOnly: true,
				sameSite: "lax",
			});

			return { sucess: true, message: "Usuário deslogado com sucesso" };
		} catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: "Erro ao deslogar usuário" });
    }
	});
}
