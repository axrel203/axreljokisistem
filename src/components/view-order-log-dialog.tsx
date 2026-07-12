"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { History } from "lucide-react"

export function ViewOrderLogDialog({ logs }: { logs: any[] }) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="ghost" size="icon" title="View Timeline"><History className="h-4 w-4" /></Button>} />
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Timeline & Activity Log</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          {logs.map((log) => (
            <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-zinc-800 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <div className="h-2 w-2 rounded-full bg-white"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-zinc-900 p-4 rounded border border-slate-200 shadow">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-slate-900 dark:text-zinc-100">{log.action.replace(/_/g, ' ')}</div>
                  <time className="font-caveat font-medium text-xs text-indigo-500">{new Date(log.createdAt).toLocaleString()}</time>
                </div>
                <div className="text-sm text-slate-500 dark:text-zinc-400">{log.details}</div>
                <div className="text-xs text-muted-foreground mt-2 border-t pt-1">User: {log.user?.name || "System"}</div>
              </div>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-center text-sm text-muted-foreground">No logs found.</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
