import { prisma } from "@/lib/prisma"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { CreatePaymentDialog } from "@/components/create-payment-dialog"

export default async function AdminPaymentsPage() {
  const payments = await prisma.workerPayment.findMany({
    include: { worker: true },
    orderBy: { createdAt: "desc" }
  })

  const workers = await prisma.user.findMany({
    where: { role: "WORKER", isActive: true },
    select: { id: true, name: true }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Worker Payments</h1>
        <CreatePaymentDialog workers={workers} />
      </div>

      <div className="rounded-md border bg-white dark:bg-zinc-950">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Worker</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No payments found.
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{new Date(payment.paymentDate).toLocaleDateString("id-ID")}</TableCell>
                  <TableCell className="font-medium">{payment.worker?.name}</TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>{payment.notes || "-"}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-green-600 font-semibold">{formatCurrency(payment.amount)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
