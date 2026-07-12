"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"
import { LayoutDashboard, ShoppingBag, CreditCard, LogOut, Gamepad2 } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/worker", icon: LayoutDashboard },
  { name: "My Orders", href: "/worker/orders", icon: ShoppingBag },
  { name: "Payments", href: "/worker/payments", icon: CreditCard },
]

export function WorkerSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-72 flex-col bg-white border-r border-zinc-200 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-50/50 to-transparent pointer-events-none" />
      
      <div className="flex h-20 shrink-0 items-center px-8 border-b border-zinc-100 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-xl border border-emerald-200">
            <Gamepad2 className="w-6 h-6 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
            Worker<span className="text-emerald-600">.</span>
          </h1>
        </div>
      </div>
      
      <nav className="flex flex-1 flex-col px-4 py-6 space-y-2 overflow-y-auto relative z-10">
        <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 px-4">Menu Utama</div>
        {navigation.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== '/worker')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                isActive
                  ? "bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                  isActive ? "text-emerald-600" : "text-zinc-400 group-hover:text-zinc-600"
                )}
                aria-hidden="true"
              />
              {item.name}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              )}
            </Link>
          )
        })}
      </nav>
      
      <div className="p-6 border-t border-zinc-100 relative z-10 bg-white/80 backdrop-blur-sm">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="group flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-all border border-red-100 shadow-sm"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Keluar Sistem
        </button>
      </div>
    </div>
  )
}
