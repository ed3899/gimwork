import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/passwordVerification";

const prisma = new PrismaClient();

async function seed() {
  const alice = await prisma.user.create({
    data: {
      email: "alice@example.com",
      password: await hashPassword("test123"),
      firstName: "Alice",
      lastName: "Smith",
      phoneNumber: "123456789",
    },
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })