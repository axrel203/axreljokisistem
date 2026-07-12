"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { format } from "date-fns"

export async function createOrder(formData: FormData) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized")

  const customerName = formData.get("customerName") as string
  const whatsapp = formData.get("whatsapp") as string
  const description = formData.get("description") as string
  const price = parseFloat(formData.get("price") as string)
  const downPayment = parseFloat(formData.get("downPayment") as string) || 0
  const deadline = new Date(formData.get("deadline") as string)
  const workerId = formData.get("workerId") as string || null

  if (!customerName || !whatsapp || !description || isNaN(price) || !deadline) {
    throw new Error("Missing required fields")
  }

  // Generate Order Number
  const today = new Date()
  const dateString = format(today, "yyyyMMdd")
  const startOfDay = new Date(today.setHours(0, 0, 0, 0))
  const endOfDay = new Date(today.setHours(23, 59, 59, 999))

  const todayOrders = await prisma.order.count({
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      }
    }
  })

  const orderNumber = `AJMS-${dateString}-${(todayOrders + 1).toString().padStart(4, '0')}`

  // Calculate Commissions
  let workerCommission = 0
  let adminProfit = price
  
  if (workerId) {
    const worker = await prisma.user.findUnique({ where: { id: workerId } })
    if (worker) {
      workerCommission = price * (worker.commissionRate / 100)
      adminProfit = price - workerCommission
    }
  }

  const remainingPayment = price - downPayment

  const order = await prisma.order.create({
    data: {
      orderNumber,
      customerName,
      whatsapp,
      description,
      price,
      downPayment,
      remainingPayment,
      workerCommission,
      adminProfit,
      orderDate: new Date(),
      deadline,
      workerId,
      status: "WAITING",
    }
  })

  await prisma.orderLog.create({
    data: {
      orderId: order.id,
      userId: session.user.id,
      action: "ORDER_CREATED",
      details: `Order created with number ${orderNumber}`,
    }
  })

  revalidatePath("/admin/orders")
}

export async function updateOrderStatus(orderId: string, status: string, notes?: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status, ...(notes ? (session.user.role === "ADMIN" ? { adminNotes: notes } : { workerNotes: notes }) : {}) }
  })

  await prisma.orderLog.create({
    data: {
      orderId: order.id,
      userId: session.user.id,
      action: "STATUS_UPDATED",
      details: `Status changed to ${status}`,
    }
  })

  revalidatePath("/admin/orders")
  revalidatePath("/worker/orders")
}
