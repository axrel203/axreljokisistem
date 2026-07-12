"use server"

import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid"
import fs from "fs"

export async function uploadScreenshot(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const orderId = formData.get("orderId") as string
  const file = formData.get("file") as File
  const type = formData.get("type") as string // PROGRESS, COMPLETED

  if (!file || !orderId || !type) {
    throw new Error("Missing required fields")
  }

  // Ensure upload directory exists
  const uploadDir = join(process.cwd(), "public", "uploads")
  if (!fs.existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const extension = file.name.split('.').pop()
  const filename = `${uuidv4()}.${extension}`
  const path = join(uploadDir, filename)

  await writeFile(path, buffer)

  // Save to DB
  await prisma.attachment.create({
    data: {
      orderId,
      userId: session.user.id,
      url: `/uploads/${filename}`,
      type
    }
  })

  // Add Log
  await prisma.orderLog.create({
    data: {
      orderId,
      userId: session.user.id,
      action: "FILE_UPLOADED",
      details: `Uploaded ${type.toLowerCase()} screenshot`,
    }
  })

  revalidatePath("/worker/orders")
  revalidatePath("/admin/orders")
}
