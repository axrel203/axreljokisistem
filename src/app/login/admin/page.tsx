import { LoginForm } from "@/components/login-form"
import { ShieldCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Pane - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-zinc-950 p-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-zinc-950 to-purple-900/20 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        <div className="absolute -left-40 -top-40 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full z-0"></div>
        <div className="absolute -right-40 -bottom-40 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full z-0"></div>

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Link>
        </div>

        <div className="relative z-10 flex flex-col justify-center flex-grow">
          <div className="flex items-center mb-8">
            <div className="p-4 bg-indigo-500/10 rounded-2xl mr-5 border border-indigo-500/20 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] backdrop-blur-sm">
              <ShieldCheck className="w-12 h-12 text-indigo-400" />
            </div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight">Admin Portal</h1>
          </div>
          <div className="space-y-4 max-w-lg">
            <p className="text-xl text-zinc-300 font-medium leading-relaxed">
              Kendalikan seluruh operasi Axrel Joki.
            </p>
            <p className="text-base text-zinc-400 leading-relaxed">
              Selamat datang kembali di Pusat Kontrol. Kelola pesanan, pantau performa worker, dan atur sistem dengan kendali penuh.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-zinc-500 text-sm font-medium">
          <span>&copy; {new Date().getFullYear()} Axrel Joki System.</span>
          <span>v1.0.0</span>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white dark:bg-zinc-950 p-6 sm:p-12 relative">
        <div className="absolute top-6 left-6 lg:hidden">
           <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Beranda
          </Link>
        </div>
        
        <div className="w-full max-w-md space-y-8 relative">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="text-center lg:text-left relative z-10">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl mb-6 lg:hidden">
               <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Masuk sebagai Admin</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-3 text-base">
              Masukkan kredensial Anda untuk mengakses dashboard administrator.
            </p>
          </div>
          
          <div className="relative z-10">
            <LoginForm redirectTo="/admin" />
          </div>
        </div>
      </div>
    </div>
  )
}
