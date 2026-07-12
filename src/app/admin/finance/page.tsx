import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { CreditCard, DollarSign, Wallet, TrendingUp } from "lucide-react"
import { startOfDay, startOfWeek, startOfMonth, startOfYear } from "date-fns"

export default async function AdminFinancePage() {
  const today = new Date()
  
  const [
    todayOrders,
    weekOrders,
    monthOrders,
    yearOrders,
    allOrders,
    allPayments
  ] = await Promise.all([
    prisma.order.aggregate({
      _sum: { price: true },
      where: { createdAt: { gte: startOfDay(today) }, status: "COMPLETED" }
    }),
    prisma.order.aggregate({
      _sum: { price: true },
      where: { createdAt: { gte: startOfWeek(today) }, status: "COMPLETED" }
    }),
    prisma.order.aggregate({
      _sum: { price: true },
      where: { createdAt: { gte: startOfMonth(today) }, status: "COMPLETED" }
    }),
    prisma.order.aggregate({
      _sum: { price: true },
      where: { createdAt: { gte: startOfYear(today) }, status: "COMPLETED" }
    }),
    prisma.order.aggregate({
      _sum: { adminProfit: true, workerCommission: true, downPayment: true, remainingPayment: true },
      where: { status: "COMPLETED" }
    }),
    prisma.workerPayment.aggregate({
      _sum: { amount: true },
      where: { status: "PAID" }
    })
  ])

  const totalCommission = allOrders._sum.workerCommission || 0
  const paidCommission = allPayments._sum.amount || 0
  const unpaidCommission = totalCommission - paidCommission

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Financial Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Omzet Hari Ini</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(todayOrders._sum.price || 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Omzet Minggu Ini</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(weekOrders._sum.price || 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Omzet Bulan Ini</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(monthOrders._sum.price || 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Omzet Tahun Ini</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(yearOrders._sum.price || 0)}</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold tracking-tight mt-8 mb-4">Profit & Komisi (All Time Completed)</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-zinc-900 text-white border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-300">Total Profit Admin</CardTitle>
            <TrendingUp className="h-4 w-4 text-zinc-300" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">{formatCurrency(allOrders._sum.adminProfit || 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Komisi Worker</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalCommission)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-500">Komisi Belum Dibayar</CardTitle>
            <Wallet className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(unpaidCommission)}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
