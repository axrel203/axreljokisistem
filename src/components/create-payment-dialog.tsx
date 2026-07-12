"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createPayment } from "@/app/actions/payments"
import { Loader2, Plus } from "lucide-react"

export function CreatePaymentDialog({ workers }: { workers: { id: string, name: string | null }[] }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    try {
      await createPayment(formData)
      setOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button><Plus className="mr-2 h-4 w-4" /> Add Payment</Button>} />
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Record Payment</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="workerId">Select Worker</Label>
            <Select name="workerId" required disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder="Select Worker" />
              </SelectTrigger>
              <SelectContent>
                {workers.map(worker => (
                  <SelectItem key={worker.id} value={worker.id}>{worker.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (Rp)</Label>
            <Input id="amount" name="amount" type="number" required disabled={loading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method (e.g. BCA, DANA)</Label>
            <Input id="paymentMethod" name="paymentMethod" required disabled={loading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentDate">Date</Label>
            <Input id="paymentDate" name="paymentDate" type="date" required disabled={loading} defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input id="notes" name="notes" disabled={loading} />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Payment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
