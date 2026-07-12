import { prisma } from "@/lib/prisma"
import { Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export async function NotificationBell({ userId }: { userId: string }) {
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="relative"><Bell className="h-5 w-5" />{unreadCount > 0 && (<span className="absolute top-1 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">{unreadCount}</span>)}</Button>} />
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-4 py-2 font-semibold border-b">
          Notifications
        </div>
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">No notifications.</div>
        ) : (
          <div className="max-h-[300px] overflow-y-auto">
            {notifications.map((n) => (
              <DropdownMenuItem key={n.id} className={`flex flex-col items-start p-4 ${!n.isRead ? 'bg-zinc-50 dark:bg-zinc-900' : ''}`}>
                <div className="flex justify-between w-full">
                  <span className="font-semibold text-sm">{n.title}</span>
                  <span className="text-[10px] text-muted-foreground">{new Date(n.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 whitespace-normal text-left">{n.message}</p>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
