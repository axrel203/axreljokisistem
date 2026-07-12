import { prisma } from "@/lib/prisma"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { KeyRound, ShieldAlert } from "lucide-react"
import { CreateOrderDialog } from "@/components/create-order-dialog"

export default async function AdminAccountsPage() {
  const orders = await prisma.order.findMany({
    where: {
      OR: [
        { gameUsername: { not: null, not: "" } },
        { gamePassword: { not: null, not: "" } },
      ]
    },
    include: {
      worker: true,
    },
    orderBy: { createdAt: "desc" }
  })

  const workers = await prisma.user.findMany({ where: { role: "WORKER", isActive: true } })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Game Accounts</h1>
          <p className="text-zinc-500 text-sm mt-1">Daftar semua akun game dari pesanan masuk.</p>
        </div>
        <CreateOrderDialog workers={workers} />
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
        <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <strong>Perhatian:</strong> Halaman ini berisi informasi rahasia. Pastikan Anda menjaga kerahasiaan password pelanggan dan tidak membagikannya ke pihak luar yang tidak berkepentingan.
        </div>
      </div>

      <div className="rounded-md border bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-zinc-50">
              <TableRow>
                <TableHead className="w-[120px]">Tanggal</TableHead>
                <TableHead>Order No</TableHead>
                <TableHead>Pelanggan</TableHead>
                <TableHead>Username / Email / UID</TableHead>
                <TableHead>Password</TableHead>
                <TableHead>Pekerja (Worker)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    Belum ada akun game yang terdaftar dari pesanan.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-zinc-50/50">
                    <TableCell className="text-xs text-zinc-500 font-medium whitespace-nowrap">
                      {format(new Date(order.orderDate), "dd MMM yyyy, HH:mm")}
                    </TableCell>
                    <TableCell className="font-semibold text-zinc-900 whitespace-nowrap">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell className="font-medium">
                      {order.customerName}
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-xs bg-zinc-100 text-zinc-800 px-2 py-1 rounded inline-block border border-zinc-200">
                        {order.gameUsername || "-"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-xs bg-zinc-100 text-zinc-800 px-2 py-1 rounded inline-block border border-zinc-200">
                        {order.gamePassword || "-"}
                      </div>
                    </TableCell>
                    <TableCell>
                      {order.worker ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium ring-1 ring-inset ring-emerald-600/20">
                          {order.worker.name}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-100 text-zinc-600 text-xs font-medium ring-1 ring-inset ring-zinc-500/10">
                          Unassigned
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
