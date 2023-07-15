import { PrismaClient } from "@prisma/client";
import sha256Hash from "../utils/passwordVerification";

const prisma = new PrismaClient();

async function seed() {
  const alice = await prisma.user.create({
    data: {
      email: "alice@example.com",
      firstName: "Alice",
      lastName: "Smith",
      phoneNumber: "123456789",
      password: await sha256Hash("test123"),
    },
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
