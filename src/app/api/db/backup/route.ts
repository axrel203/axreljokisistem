import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import fs from "fs"
import path from "path"

export async function GET() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 })

  const dbPath = path.join(process.cwd(), "prisma", "dev.db")
  
  if (!fs.existsSync(dbPath)) {
    return new NextResponse("Database not found", { status: 404 })
  }

  const fileBuffer = fs.readFileSync(dbPath)

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/x-sqlite3",
      "Content-Disposition": `attachment; filename="backup_${new Date().toISOString().split('T')[0]}.db"`,
    },
  })
}
