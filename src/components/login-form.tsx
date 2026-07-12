"use client"

import { useActionState } from "react"
import { authenticate } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Mail, Lock } from "lucide-react"

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)

  return (
    <form action={formAction} className="space-y-6 w-full">
      {redirectTo && <input type="hidden" name="redirectTo" value={redirectTo} />}
      
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Email Address</Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400 group-focus-within:text-indigo-500 transition-colors">
              <Mail className="h-5 w-5" />
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="nama@axrel.com"
              required
              disabled={isPending}
              className="pl-11 h-12 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-indigo-500 transition-all shadow-sm"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Password</Label>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400 group-focus-within:text-indigo-500 transition-colors">
              <Lock className="h-5 w-5" />
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              disabled={isPending}
              className="pl-11 h-12 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-indigo-500 transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 text-base font-semibold shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100" 
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Memproses...
          </>
        ) : (
          "Masuk Sekarang"
        )}
      </Button>
      
      {errorMessage && (
        <div className="p-3 mt-4 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 text-sm text-red-600 dark:text-red-400 text-center font-medium animate-in fade-in slide-in-from-top-2">
          {errorMessage}
        </div>
      )}
    </form>
  )
}
