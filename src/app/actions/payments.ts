"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"

export async function createPayment(formData: FormData) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized")

  const workerId = formData.get("workerId") as string
  const amount = parseFloat(formData.get("amount") as string)
  const paymentMethod = formData.get("paymentMethod") as string
  const notes = formData.get("notes") as string
  const paymentDate = new Date(formData.get("paymentDate") as string || new Date())

  if (!workerId || isNaN(amount) || !paymentMethod) {
    throw new Error("Missing required fields")
  }

  await prisma.workerPayment.create({
    data: {
      workerId,
      amount,
      paymentMethod,
      notes,
      paymentDate,
      status: "PAID"
    }
  })

  // Create Notification for the worker
  await prisma.notification.create({
    data: {
      userId: workerId,
      title: "Pembayaran Komisi Diterima",
      message: `Anda telah menerima pembayaran komisi sebesar Rp${amount.toLocaleString("id-ID")} via ${paymentMethod}.`,
      type: "SUCCESS"
    }
  })

  revalidatePath("/admin/payments")
  revalidatePath("/worker/payments")
}
