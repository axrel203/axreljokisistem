import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">AJMS</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Axrel Joki Management System</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
