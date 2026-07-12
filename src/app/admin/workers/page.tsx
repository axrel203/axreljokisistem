import { getWorkers } from "@/app/actions/workers"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreateWorkerDialog } from "@/components/create-worker-dialog"
import { DeleteWorkerButton } from "@/components/delete-worker-button"

export default async function WorkersPage() {
  const workers = await getWorkers()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Workers</h1>
        <CreateWorkerDialog />
      </div>

      <div className="rounded-md border bg-white dark:bg-zinc-950">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Bank Info</TableHead>
              <TableHead className="text-center">Commission %</TableHead>
              <TableHead className="text-center">Total Orders</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  No workers found.
                </TableCell>
              </TableRow>
            ) : (
              workers.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell className="font-medium">{worker.name}</TableCell>
                  <TableCell>{worker.email}</TableCell>
                  <TableCell>{worker.phone || "-"}</TableCell>
                  <TableCell>{worker.bank ? `${worker.bank} - ${worker.accountNumber}` : "-"}</TableCell>
                  <TableCell className="text-center">{worker.commissionRate}%</TableCell>
                  <TableCell className="text-center">{worker._count.orders}</TableCell>
                  <TableCell className="text-right">
                    <DeleteWorkerButton id={worker.id} />
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
