import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"
import { Activity, CreditCard, DollarSign, Users, TrendingUp } from "lucide-react"

export default async function AdminDashboard() {
  const [totalOrders, pendingOrders, totalWorkers, totalRevenue] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "WAITING" } }),
    prisma.user.count({ where: { role: "WORKER" } }),
    prisma.order.aggregate({
      _sum: { price: true },
      where: { status: "COMPLETED" }
    })
  ])

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 mb-2">Overview</h1>
        <p className="text-zinc-500 text-lg font-medium">Pantau performa dan ringkasan sistem joki Anda hari ini.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Revenue */}
        <Card className="bg-white border-zinc-200/60 shadow-sm overflow-hidden relative group hover:shadow-md transition-shadow">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-bold text-zinc-500">Total Revenue</CardTitle>
            <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
              <DollarSign className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-black text-zinc-900 mt-2">{formatCurrency(totalRevenue._sum.price || 0)}</div>
            <div className="flex items-center mt-3 text-sm font-semibold text-emerald-600">
               <TrendingUp className="w-4 h-4 mr-1" />
               <span>Transaksi Berhasil</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Orders */}
        <Card className="bg-white border-zinc-200/60 shadow-sm overflow-hidden relative group hover:shadow-md transition-shadow">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-bold text-zinc-500">Total Orders</CardTitle>
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
              <Activity className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-black text-zinc-900 mt-2">+{totalOrders}</div>
            <div className="flex items-center mt-3 text-sm font-semibold text-emerald-600">
               <TrendingUp className="w-4 h-4 mr-1" />
               <span>Order berjalan</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Pending */}
        <Card className="bg-white border-zinc-200/60 shadow-sm overflow-hidden relative group hover:shadow-md transition-shadow">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-bold text-zinc-500">Pending Orders</CardTitle>
            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-100 text-amber-600 group-hover:bg-amber-100 transition-colors">
              <CreditCard className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-black text-zinc-900 mt-2">{pendingOrders}</div>
             <p className="text-sm font-medium text-zinc-500 mt-3">Perlu konfirmasi admin</p>
          </CardContent>
        </Card>

        {/* Card 4: Workers */}
        <Card className="bg-white border-zinc-200/60 shadow-sm overflow-hidden relative group hover:shadow-md transition-shadow">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-bold text-zinc-500">Active Workers</CardTitle>
            <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-100 text-purple-600 group-hover:bg-purple-100 transition-colors">
              <Users className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-black text-zinc-900 mt-2">{totalWorkers}</div>
            <p className="text-sm font-medium text-zinc-500 mt-3">Partner yang terdaftar</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
