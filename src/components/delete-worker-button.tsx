"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { deleteWorker } from "@/app/actions/workers"
import { Loader2, Trash } from "lucide-react"

export function DeleteWorkerButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this worker? This will also delete their orders.")) return
    setLoading(true)
    try {
      await deleteWorker(id)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleDelete} disabled={loading} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4" />}
    </Button>
  )
}
