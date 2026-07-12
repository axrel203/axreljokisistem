"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X, LayoutDashboard, Users, ShoppingBag, Settings, LogOut, CreditCard, Wallet, Calendar as CalendarIcon, FileText, ShieldCheck, Gamepad2 } from "lucide-react"
import { signOut } from "next-auth/react"

const adminNavigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Finance", href: "/admin/finance", icon: Wallet },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Workers", href: "/admin/workers", icon: Users },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
  { name: "Calendar", href: "/admin/calendar", icon: CalendarIcon },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

const workerNavigation = [
  { name: "Dashboard", href: "/worker", icon: LayoutDashboard },
  { name: "My Orders", href: "/worker/orders", icon: ShoppingBag },
  { name: "Payments", href: "/worker/payments", icon: CreditCard },
]

export function MobileNav({ role }: { role: "ADMIN" | "WORKER" }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  
  const navigation = role === "ADMIN" ? adminNavigation : workerNavigation
  const themeColor = role === "ADMIN" ? "indigo" : "emerald"

  return (
    <div className="lg:hidden flex items-center mr-4">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 -ml-2 rounded-md text-zinc-500 hover:bg-zinc-100 focus:outline-none"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-zinc-900/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-xl border", role === "ADMIN" ? "bg-indigo-100 border-indigo-200" : "bg-emerald-100 border-emerald-200")}>
              {role === "ADMIN" ? (
                <ShieldCheck className="w-6 h-6 text-indigo-600" />
              ) : (
                <Gamepad2 className="w-6 h-6 text-emerald-600" />
              )}
            </div>
            <h1 className="text-xl font-black text-zinc-900 tracking-tight">
              {role === "ADMIN" ? "AJMS" : "Worker"}
              <span className={role === "ADMIN" ? "text-indigo-600" : "text-emerald-600"}>.</span>
            </h1>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md text-zinc-500 hover:bg-zinc-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 px-4">Menu Utama</div>
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== (role === "ADMIN" ? '/admin' : '/worker'))
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "group flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? (role === "ADMIN" ? "bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100" : "bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100")
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                    isActive ? (role === "ADMIN" ? "text-indigo-600" : "text-emerald-600") : "text-zinc-400 group-hover:text-zinc-600"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-6 border-t border-zinc-100 bg-zinc-50">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="group flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-red-600 bg-white hover:bg-red-50 transition-all border border-red-100 shadow-sm"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Keluar Sistem
          </button>
        </div>
      </div>
    </div>
  )
}
