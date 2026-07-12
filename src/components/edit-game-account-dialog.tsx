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
import { updateGameAccount } from "@/app/actions/orders"
import { Loader2, Edit } from "lucide-react"

export function EditGameAccountDialog({ 
  orderId, 
  currentUsername, 
  currentPassword 
}: { 
  orderId: string, 
  currentUsername: string | null, 
  currentPassword: string | null 
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    try {
      await updateGameAccount(orderId, formData)
      setOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"><Edit className="h-4 w-4" /></Button>} />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Game Account</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="gameUsername">Username / Email / UID</Label>
            <Input 
              id="gameUsername" 
              name="gameUsername" 
              defaultValue={currentUsername || ""} 
              disabled={loading} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gamePassword">Password</Label>
            <Input 
              id="gamePassword" 
              name="gamePassword" 
              defaultValue={currentPassword || ""} 
              disabled={loading} 
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
