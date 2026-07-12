import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@axrel.com" },
    update: {},
    create: {
      email: "admin@axrel.com",
      name: "Super Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  
  const workerPassword = await bcrypt.hash("worker123", 10);
  const worker = await prisma.user.upsert({
    where: { email: "worker@axrel.com" },
    update: {},
    create: {
      email: "worker@axrel.com",
      name: "Worker 1",
      password: workerPassword,
      role: "WORKER",
      commissionRate: 70,
    },
  });

  console.log({ admin, worker });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
