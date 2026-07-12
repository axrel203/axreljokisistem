"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { KeyRound, Copy, Check } from "lucide-react"

interface ViewCredentialsDialogProps {
  gameUsername?: string | null
  gamePassword?: string | null
}

export function ViewCredentialsDialog({ gameUsername, gamePassword }: ViewCredentialsDialogProps) {
  const [open, setOpen] = useState(false)
  const [copiedUser, setCopiedUser] = useState(false)
  const [copiedPass, setCopiedPass] = useState(false)

  const copyToClipboard = (text: string, isUser: boolean) => {
    navigator.clipboard.writeText(text)
    if (isUser) {
      setCopiedUser(true)
      setTimeout(() => setCopiedUser(false), 2000)
    } else {
      setCopiedPass(true)
      setTimeout(() => setCopiedPass(false), 2000)
    }
  }

  if (!gameUsername && !gamePassword) {
    return (
      <Button variant="ghost" size="icon" disabled title="No credentials provided">
        <KeyRound className="h-4 w-4 text-zinc-300" />
      </Button>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" title="View Game Credentials">
          <KeyRound className="h-4 w-4 text-indigo-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Game Account Credentials</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-500">Username / Email / UID</p>
            <div className="flex items-center justify-between p-3 bg-zinc-50 border border-zinc-200 rounded-md">
              <span className="font-mono text-sm text-zinc-900">{gameUsername || "-"}</span>
              {gameUsername && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-zinc-500 hover:text-indigo-600"
                  onClick={() => copyToClipboard(gameUsername, true)}
                >
                  {copiedUser ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-500">Password</p>
            <div className="flex items-center justify-between p-3 bg-zinc-50 border border-zinc-200 rounded-md">
              <span className="font-mono text-sm text-zinc-900">{gamePassword || "-"}</span>
              {gamePassword && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-zinc-500 hover:text-indigo-600"
                  onClick={() => copyToClipboard(gamePassword, false)}
                >
                  {copiedPass ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>
          
          <div className="p-3 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-xs">
            <strong>Warning:</strong> These credentials are provided for the boosting service. Do not share them with unauthorized parties.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
