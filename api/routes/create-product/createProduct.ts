"use server";

import type { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const createProductSchema = z.object({
	name: z.string(),
	price: z.number(),
	quantity: z.number(),
	description: z.string().optional(),
	image: z.string().optional(),
});

export default async function createProductRoutes(fastify: FastifyInstance) {
	fastify.post("/createProduct", async (request, reply) => {
		const result = createProductSchema.safeParse(request.body);

		if (!result.success) {
			reply.status(400).send({ error: "Dados inválidos" });
			return;
		}

		const { name, price, quantity, description, image } = result.data;

		try {
			const product = await prisma.product.create({
				data: {
					name,
					price,
					quantity,
					description,
					image,
				},
			});

			//reply.redirect("/", 303);
			reply.send({ message: "Produto criado com sucesso" });
		} catch (error) {
			fastify.log.error(error);
			reply.status(500).send({ error: "Erro ao criar produto" });
		}
	});
}
