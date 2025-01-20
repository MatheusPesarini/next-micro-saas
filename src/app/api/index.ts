import Fastify from "fastify";
import { userRoutes } from "./users/user";

const fastify = Fastify({ logger: true });

fastify.register(userRoutes);

const start = async () => {
	try {
		await fastify.listen({ port: 3000 });
		fastify.log.info(
			`Servidor rodando no endereco: ${fastify.server.address()}`,
		);
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
};

start();