import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
	const user = await prisma.user.upsert({
		where: {
			// Chegando se o usuário já existe na hora de rodar o migrate para não criar um usuário duplicado
			email: "test@test.com",
		},
		update: {},
		create: {
			email: "test@test.com",
			name: "Test User",
			password: "password",
		},
	})
	console.log(user)
}
main()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
