import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import fs from "fs"
import path from "path"

export async function POST(req: Request) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 })

  const formData = await req.formData()
  const file = formData.get("db_file") as File
  
  if (!file) {
    return new NextResponse("No file uploaded", { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const dbPath = path.join(process.cwd(), "prisma", "dev.db")

  fs.writeFileSync(dbPath, buffer)

  // Redirect back to settings with a success param or similar. For now, simple redirect.
  return NextResponse.redirect(new URL("/admin/settings", req.url))
}
