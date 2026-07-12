import { prisma } from "@/lib/prisma"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"

import { CreateOrderDialog } from "@/components/create-order-dialog"
import { OrderStatusDropdown } from "@/components/order-status-dropdown"
import { ViewAttachmentsDialog } from "@/components/view-attachments-dialog"
import { ViewOrderLogDialog } from "@/components/view-order-log-dialog"

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      worker: true,
      attachments: true,
      logs: {
        include: { user: true },
        orderBy: { createdAt: "desc" }
      }
    },
    orderBy: { createdAt: "desc" }
  })

  const workers = await prisma.user.findMany({ where: { role: "WORKER", isActive: true } })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <CreateOrderDialog workers={workers} />
      </div>

      <div className="rounded-md border bg-white dark:bg-zinc-950">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order No</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="w-[200px]">Status</TableHead>
              <TableHead>Worker</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>
                    <OrderStatusDropdown orderId={order.id} currentStatus={order.status} />
                  </TableCell>
                  <TableCell>{order.worker?.name || "Unassigned"}</TableCell>
                  <TableCell className="text-right">{formatCurrency(order.price)}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <ViewAttachmentsDialog attachments={order.attachments} />
                    <ViewOrderLogDialog logs={order.logs} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
