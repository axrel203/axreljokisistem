"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ImageIcon } from "lucide-react"

export function ViewAttachmentsDialog({ attachments }: { attachments: { id: string, url: string, type: string, createdAt: Date }[] }) {
  if (!attachments || attachments.length === 0) return null

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="ghost" size="icon" title="View Screenshots"><ImageIcon className="h-4 w-4" /></Button>} />
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Screenshots</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 mt-4">
          {attachments.map((file) => (
            <div key={file.id} className="space-y-2 border rounded-md p-4 bg-zinc-50 dark:bg-zinc-900">
              <div className="flex justify-between">
                <h4 className="font-semibold text-sm capitalize">{file.type.toLowerCase()} Screenshot</h4>
                <span className="text-xs text-muted-foreground">{new Date(file.createdAt).toLocaleString()}</span>
              </div>
              <div className="relative aspect-video bg-zinc-200 dark:bg-zinc-800 rounded-md overflow-hidden">
                <img src={file.url} alt={file.type} className="object-contain w-full h-full" />
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
