import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, CheckCircle, CreditCard, Clock, TrendingUp } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default async function WorkerDashboard() {
  const session = await auth()
  const workerId = session?.user?.id

  const [activeOrders, completedOrders, totalCommissions] = await Promise.all([
    prisma.order.count({
      where: { workerId, status: { in: ["IN_PROGRESS", "WAITING_DATE"] } }
    }),
    prisma.order.count({
      where: { workerId, status: "COMPLETED" }
    }),
    prisma.order.aggregate({
      _sum: { workerCommission: true },
      where: { workerId, status: "COMPLETED" }
    })
  ])

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 mb-2">Worker Overview</h1>
        <p className="text-zinc-500 text-lg font-medium">Pantau tugas joki dan penghasilan Anda di sini.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Active Orders */}
        <Card className="bg-white border-zinc-200/60 shadow-sm overflow-hidden relative group hover:shadow-md transition-shadow">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-bold text-zinc-500">Tugas Aktif</CardTitle>
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
              <Clock className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-black text-zinc-900 mt-2">{activeOrders}</div>
             <p className="text-sm font-semibold text-emerald-600 mt-3 flex items-center">
              <Activity className="w-4 h-4 mr-1" /> Sedang dikerjakan
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Completed Orders */}
        <Card className="bg-white border-zinc-200/60 shadow-sm overflow-hidden relative group hover:shadow-md transition-shadow">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-bold text-zinc-500">Order Selesai</CardTitle>
            <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
              <CheckCircle className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-black text-zinc-900 mt-2">{completedOrders}</div>
            <p className="text-sm font-medium text-zinc-500 mt-3">Total joki selesai</p>
          </CardContent>
        </Card>

        {/* Card 3: Total Commissions */}
        <Card className="bg-white border-zinc-200/60 shadow-sm overflow-hidden relative group hover:shadow-md transition-shadow md:col-span-2 lg:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-bold text-zinc-500">Total Penghasilan (Komisi)</CardTitle>
            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-100 text-amber-600 group-hover:bg-amber-100 transition-colors">
              <CreditCard className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-black text-zinc-900 mt-2">{formatCurrency(totalCommissions._sum.workerCommission || 0)}</div>
            <div className="flex items-center mt-3 text-sm font-semibold text-emerald-600">
               <TrendingUp className="w-4 h-4 mr-1" />
               <span>Siap dicairkan / Sudah dicairkan</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
