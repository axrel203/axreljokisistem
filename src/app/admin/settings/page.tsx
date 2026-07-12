import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DatabaseBackup, Upload } from "lucide-react"

export default async function AdminSettingsPage() {
  const defaultCommission = await prisma.setting.findUnique({ where: { key: "DEFAULT_COMMISSION" } })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage application default values.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="commission">Default Worker Commission (%)</Label>
                <Input id="commission" name="commission" type="number" defaultValue={defaultCommission?.value || "70"} />
              </div>
              <Button>Save Settings</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Management</CardTitle>
            <CardDescription>Backup or restore your system database.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <a href="/api/db/backup" target="_blank" rel="noreferrer">
                <Button variant="outline" className="w-full justify-start text-blue-600">
                  <DatabaseBackup className="mr-2 h-4 w-4" />
                  Download Database Backup (SQLite)
                </Button>
              </a>

              <form action="/api/db/restore" method="POST" encType="multipart/form-data" className="flex items-center gap-2">
                <Input type="file" name="db_file" accept=".db,application/x-sqlite3" required />
                <Button type="submit" variant="destructive">
                  <Upload className="mr-2 h-4 w-4" />
                  Restore
                </Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Warning: Restoring a database will overwrite all current data. Ensure nobody is using the system.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
