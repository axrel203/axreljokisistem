"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/utils"
import { Download, FileText, Search } from "lucide-react"
import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { format } from "date-fns"

export function ReportTable({ initialOrders, startDateStr, endDateStr }: { initialOrders: any[], startDateStr: string, endDateStr: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [start, setStart] = useState(searchParams.get("start") || startDateStr.split("T")[0])
  const [end, setEnd] = useState(searchParams.get("end") || endDateStr.split("T")[0])

  function handleFilter() {
    router.push(`/admin/reports?start=${start}&end=${end}`)
  }

  function exportExcel() {
    const wsData = initialOrders.map(order => ({
      "Order No": order.orderNumber,
      "Tanggal": format(new Date(order.createdAt), "dd/MM/yyyy"),
      "Customer": order.customerName,
      "Worker": order.worker?.name || "-",
      "Status": order.status,
      "Harga": order.price,
      "Profit Admin": order.adminProfit,
      "Komisi Worker": order.workerCommission
    }))
    const ws = XLSX.utils.json_to_sheet(wsData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Laporan")
    XLSX.writeFile(wb, `Laporan_AJMS_${start}_to_${end}.xlsx`)
  }

  function exportPDF() {
    const doc = new jsPDF()
    doc.text(`Laporan Order AJMS (${start} - ${end})`, 14, 15)
    
    const tableColumn = ["Order No", "Tanggal", "Customer", "Status", "Harga", "Profit Admin"]
    const tableRows = initialOrders.map(order => [
      order.orderNumber,
      format(new Date(order.createdAt), "dd/MM/yyyy"),
      order.customerName,
      order.status,
      formatCurrency(order.price),
      formatCurrency(order.adminProfit)
    ])

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20
    })

    doc.save(`Laporan_AJMS_${start}_to_${end}.pdf`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-end justify-between bg-white dark:bg-zinc-950 p-4 rounded-md border shadow-sm">
        <div className="flex gap-4 items-end">
          <div className="space-y-1">
            <label className="text-sm font-medium">Start Date</label>
            <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">End Date</label>
            <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
          </div>
          <Button onClick={handleFilter}><Search className="h-4 w-4 mr-2"/> Filter</Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportExcel} className="text-green-600 border-green-600 hover:bg-green-50"><Download className="h-4 w-4 mr-2"/> Excel</Button>
          <Button variant="outline" onClick={exportPDF} className="text-red-600 border-red-600 hover:bg-red-50"><FileText className="h-4 w-4 mr-2"/> PDF</Button>
        </div>
      </div>

      <div className="rounded-md border bg-white dark:bg-zinc-950 max-h-[60vh] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total Price</TableHead>
              <TableHead className="text-right">Admin Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No orders found in this period.
                </TableCell>
              </TableRow>
            ) : (
              initialOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{format(new Date(order.createdAt), "dd MMM yyyy")}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell className="text-right">{formatCurrency(order.price)}</TableCell>
                  <TableCell className="text-right font-semibold text-green-600">{formatCurrency(order.adminProfit)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
