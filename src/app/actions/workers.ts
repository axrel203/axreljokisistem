"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function getWorkers() {
  return prisma.user.findMany({
    where: { role: "WORKER" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { orders: true }
      }
    }
  })
}

export async function createWorker(formData: FormData) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized")

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const phone = formData.get("phone") as string
  const bank = formData.get("bank") as string
  const accountNumber = formData.get("accountNumber") as string
  const commissionRate = parseFloat(formData.get("commissionRate") as string)

  if (!name || !email || !password) throw new Error("Name, email, and password are required")

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
      bank,
      accountNumber,
      commissionRate: isNaN(commissionRate) ? 70 : commissionRate,
      role: "WORKER",
    }
  })

  revalidatePath("/admin/workers")
}

export async function deleteWorker(id: string) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized")

  await prisma.user.delete({
    where: { id }
  })

  revalidatePath("/admin/workers")
}
