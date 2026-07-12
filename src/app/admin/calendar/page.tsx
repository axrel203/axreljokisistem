import { prisma } from "@/lib/prisma"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

export default async function AdminCalendarPage() {
  const activeOrders = await prisma.order.findMany({
    where: {
      status: { notIn: ["COMPLETED", "CANCELLED"] }
    },
    include: { worker: true },
    orderBy: { deadline: "asc" }
  })

  // To highlight days on the calendar, we could pass selected dates
  // but react-day-picker works best via client component if we want interactivity.
  // We'll keep it simple: display a list categorized by deadline, and a static calendar view.

  const today = new Date()
  const todayStr = format(today, "yyyy-MM-dd")

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Deadline Calendar</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              {/* Note: This is server-rendered, so it's read-only unless we make a client wrapper */}
              <Calendar
                mode="multiple"
                selected={activeOrders.map(o => o.deadline)}
                className="rounded-md border shadow"
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Upcoming Deadlines</h2>
          {activeOrders.length === 0 ? (
            <p className="text-muted-foreground">No active orders with deadlines.</p>
          ) : (
            activeOrders.map((order) => {
              const deadlineStr = format(order.deadline, "yyyy-MM-dd")
              const isToday = deadlineStr === todayStr
              const isLate = order.deadline < new Date(new Date().setHours(0,0,0,0))
              
              return (
                <Card key={order.id} className={isLate ? "border-red-500 bg-red-50 dark:bg-red-950/20" : isToday ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20" : ""}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold">{order.orderNumber} - {order.customerName}</h4>
                      <p className="text-sm text-muted-foreground">
                        Worker: {order.worker?.name || "Unassigned"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${isLate ? "text-red-600 dark:text-red-400" : isToday ? "text-yellow-600 dark:text-yellow-400" : ""}`}>
                        {format(order.deadline, "dd MMM yyyy")}
                      </p>
                      <p className="text-xs font-medium uppercase">{isLate ? "Overdue" : isToday ? "Due Today" : "Upcoming"}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
