import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { OrderStatusDropdown } from "@/components/order-status-dropdown"

import { UploadScreenshotDialog } from "@/components/upload-screenshot-dialog"

import { ViewOrderLogDialog } from "@/components/view-order-log-dialog"
import { ViewAttachmentsDialog } from "@/components/view-attachments-dialog"

export default async function WorkerOrdersPage() {
  const session = await auth()
  
  if (!session?.user?.id) return null
  
  const orders = await prisma.order.findMany({
    where: { workerId: session.user.id },
    include: {
      attachments: true,
      logs: {
        include: { user: true },
        orderBy: { createdAt: "desc" }
      }
    },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
      </div>

      <div className="rounded-md border bg-white dark:bg-zinc-950">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order No</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="w-[200px]">Status</TableHead>
              <TableHead className="text-right">Commission</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
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
                  <TableCell className="text-right text-green-600 font-semibold">{formatCurrency(order.workerCommission)}</TableCell>
                  <TableCell className="text-right space-x-1 whitespace-nowrap">
                    <UploadScreenshotDialog orderId={order.id} type="PROGRESS" />
                    <UploadScreenshotDialog orderId={order.id} type="COMPLETED" />
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
