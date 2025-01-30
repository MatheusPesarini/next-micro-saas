import type { FastifyInstance } from "fastify";
import { deleteSession } from "../../../src/app/lib/cookie/session";

export default async function logoutRoutes(fastify: FastifyInstance) {
  fastify.post("/logout", async (request, reply) => {
    await deleteSession();
    reply.send({ message: "Logout bem-sucedido" });
  });
}