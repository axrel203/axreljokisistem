"use client"

import { useState } from "react"
import { updateOrderStatus } from "@/app/actions/orders"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Loader2, ChevronDown } from "lucide-react"

const statuses = [
  { value: "WAITING", label: "Menunggu" },
  { value: "WAITING_DATE", label: "Menunggu Tanggal" },
  { value: "IN_PROGRESS", label: "Sedang Dikerjakan" },
  { value: "COMPLETED", label: "Selesai" },
  { value: "CANCELLED", label: "Cancel" },
]

export function OrderStatusDropdown({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false)

  async function handleStatusChange(status: string) {
    if (status === currentStatus) return
    setLoading(true)
    try {
      await updateOrderStatus(orderId, status)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const currentLabel = statuses.find(s => s.value === currentStatus)?.label || currentStatus

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="h-8 w-full justify-between" disabled={loading}>{loading ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : null}{currentLabel}<ChevronDown className="h-4 w-4 opacity-50" /></Button>} />
      <DropdownMenuContent align="end">
        {statuses.map(status => (
          <DropdownMenuItem key={status.value} onClick={() => handleStatusChange(status.value)}>
            {status.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
