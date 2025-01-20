import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";

import { userRoutes } from "./routes/get-user/user";

const fastify = Fastify({ logger: true });

fastify.register(helmet);
fastify.register(cors, {origin: true});

fastify.register(userRoutes);

const start = async () => {
	try {
		await fastify.listen({ port: 3000 });
		const address = fastify.server.address();
    const port = typeof address === "string" ? address : address?.port;
    fastify.log.info(`Server listening on port ${port}`);
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
};

start();
