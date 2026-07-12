import { prisma } from "@/lib/prisma"
import { ReportTable } from "@/components/report-table"
import { startOfMonth, endOfMonth } from "date-fns"

export default async function AdminReportsPage({
  searchParams
}: {
  searchParams: Promise<{ start?: string, end?: string }>
}) {
  const { start, end } = await searchParams
  
  const startDate = start ? new Date(start) : startOfMonth(new Date())
  const endDate = end ? new Date(end) : endOfMonth(new Date())

  const orders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      }
    },
    include: {
      worker: true,
    },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Laporan Order</h1>
      <ReportTable initialOrders={orders} startDateStr={startDate.toISOString()} endDateStr={endDate.toISOString()} />
    </div>
  )
}
