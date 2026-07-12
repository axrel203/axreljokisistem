import { AdminSidebar } from "@/components/admin-sidebar"
import { auth } from "@/lib/auth"
import { NotificationBell } from "@/components/notification-bell"
import { MobileNav } from "@/components/mobile-nav"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <div className="flex h-screen bg-zinc-50 text-zinc-900 selection:bg-indigo-100">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden relative">
        <header className="flex h-16 md:h-20 shrink-0 items-center justify-between border-b border-zinc-200 bg-white/80 backdrop-blur-md px-4 md:px-10 z-20">
          <div className="flex items-center">
            <MobileNav role="ADMIN" />
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            {session?.user?.id && <NotificationBell userId={session.user.id} />}
            <div className="h-8 w-px bg-zinc-200"></div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-zinc-900">{session?.user?.name || "Administrator"}</span>
                <span className="text-xs font-medium text-zinc-500">Super Admin</span>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-200 border border-indigo-100">
                <span className="text-sm font-bold text-white">
                  {(session?.user?.name || "A").charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-10 bg-zinc-50 relative z-10">
          {/* subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-indigo-50 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
