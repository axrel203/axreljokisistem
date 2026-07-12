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
import { uploadScreenshot } from "@/app/actions/upload"
import { Loader2, Upload } from "lucide-react"

export function UploadScreenshotDialog({ orderId, type }: { orderId: string, type: "PROGRESS" | "COMPLETED" }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    formData.append("orderId", orderId)
    formData.append("type", type)
    try {
      await uploadScreenshot(formData)
      setOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size="sm"><Upload className="mr-2 h-4 w-4" /> Upload {type === "PROGRESS" ? "Progress" : "Completed"}</Button>} />
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload {type === "PROGRESS" ? "Progress" : "Completed"} Screenshot</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Select File</Label>
            <Input id="file" name="file" type="file" accept="image/*" required disabled={loading} />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Upload
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
