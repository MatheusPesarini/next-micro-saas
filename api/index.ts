import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";

// import { userRoutes } from "./routes/get-user-DEPRECATED/user";
import loginUserRoutes from "./routes/login-user/login";
import createUserRoutes from "./routes/create-user/register";

const fastify = Fastify({ logger: true });

fastify.register(helmet);
fastify.register(cors, { origin: true });

// fastify.register(userRoutes);
fastify.register(loginUserRoutes);
fastify.register(createUserRoutes);

const start = async () => {
	try {
		await fastify.listen({ port: 3001 });
		const address = fastify.server.address();
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
};

start();
