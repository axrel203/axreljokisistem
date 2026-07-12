import Link from "next/link";
import { ShieldCheck, Users, ArrowRight, BarChart3, Activity, Briefcase, Zap } from "lucide-react";

export default function VisitorLandingPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 flex flex-col justify-center overflow-hidden font-sans text-slate-900">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-300/40 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-300/40 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 w-full grid lg:grid-cols-2 gap-16 lg:gap-8 items-center py-20">
        
        {/* Left Column: Content */}
        <div className="flex flex-col gap-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-sm font-semibold w-fit">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Sistem Manajemen Cerdas</span>
          </div>
          
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
              Axrel Joki <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Management System
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed font-medium">
              Kelola seluruh operasional bisnis Axrel Joki dari satu dashboard modern. 
              Sistem terpadu untuk efisiensi, akurasi, dan skalabilitas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link 
              href="/login/admin" 
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg transition-all hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)]"
            >
              <ShieldCheck className="w-6 h-6 text-indigo-200" />
              <span>Login Admin</span>
              <ArrowRight className="w-5 h-5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-white" />
            </Link>

            <Link 
              href="/login/worker" 
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-lg transition-all hover:bg-slate-50 hover:border-slate-300 hover:scale-[1.02] active:scale-95 shadow-sm"
            >
              <Users className="w-6 h-6 text-purple-600" />
              <span>Login Worker</span>
              <ArrowRight className="w-5 h-5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-slate-600" />
            </Link>
          </div>
        </div>

        {/* Right Column: Dashboard Illustration */}
        <div className="relative w-full max-w-2xl mx-auto lg:ml-auto z-10">
          <div className="absolute -inset-0.5 bg-gradient-to-tr from-indigo-300 to-purple-300 rounded-[2rem] blur-2xl opacity-40 animate-pulse"></div>
          
          <div className="relative rounded-[2rem] border border-white/60 bg-white/60 backdrop-blur-xl shadow-2xl overflow-hidden p-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 shadow-inner h-[500px] flex overflow-hidden">
              
              {/* Sidebar Mockup */}
              <div className="w-20 md:w-64 border-r border-slate-200 bg-white p-4 flex flex-col gap-6">
                <div className="flex items-center gap-3 px-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 flex items-center justify-center shadow-md shadow-indigo-200">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden md:block h-5 w-24 bg-slate-200 rounded-md"></div>
                </div>
                
                <div className="flex flex-col gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${i === 0 ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-slate-50'}`}>
                      <div className={`w-5 h-5 rounded-md ${i === 0 ? 'bg-indigo-500' : 'bg-slate-200'}`}></div>
                      <div className={`hidden md:block h-4 rounded-md ${i === 0 ? 'w-20 bg-indigo-200' : 'w-24 bg-slate-200'}`}></div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Main Content Mockup */}
              <div className="flex-1 p-6 md:p-8 flex flex-col gap-6 overflow-hidden relative">
                
                {/* Header */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <div className="h-6 w-32 md:w-48 bg-slate-300 rounded-md"></div>
                    <div className="h-4 w-24 md:w-32 bg-slate-200 rounded-md"></div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm"></div>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm flex flex-col gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="h-8 w-3/4 bg-slate-800 rounded-md"></div>
                    <div className="h-3 w-1/2 bg-emerald-500 rounded-sm"></div>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm flex flex-col gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="h-8 w-2/3 bg-slate-800 rounded-md"></div>
                    <div className="h-3 w-1/2 bg-indigo-500 rounded-sm"></div>
                  </div>
                  <div className="hidden lg:flex p-4 rounded-xl border border-slate-100 bg-white shadow-sm flex-col gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Users className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="h-8 w-4/5 bg-slate-800 rounded-md"></div>
                    <div className="h-3 w-1/2 bg-emerald-500 rounded-sm"></div>
                  </div>
                </div>
                
                {/* Main Chart Area */}
                <div className="flex-1 mt-2 rounded-xl border border-slate-200 bg-white p-5 flex flex-col gap-4 relative overflow-hidden shadow-sm">
                  <div className="h-5 w-40 bg-slate-200 rounded-md mb-2"></div>
                  <div className="flex-1 flex items-end justify-between gap-2 md:gap-4 px-2">
                    {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
                      <div key={i} className="w-full relative group h-full flex items-end">
                        <div 
                          className="w-full bg-gradient-to-t from-indigo-500 to-purple-400 rounded-t-md transition-all duration-1000 ease-in-out hover:brightness-110"
                          style={{ height: `${height}%` }}
                        >
                           <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-md"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Decorative faint grid lines */}
                  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-5 opacity-10">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-full h-px bg-slate-400"></div>)}
                  </div>
                </div>

              </div>
            </div>
          </div>
          
          {/* Floating Elements for 3D effect */}
          <div className="absolute -right-4 md:-right-10 top-16 md:top-24 w-20 md:w-24 h-20 md:h-24 rounded-2xl bg-white/90 border border-slate-100 backdrop-blur-xl p-3 md:p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col gap-2 items-center justify-center animate-[bounce_4s_ease-in-out_infinite]">
             <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-emerald-100 flex items-center justify-center mb-1">
               <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-emerald-600" />
             </div>
             <div className="h-1.5 md:h-2 w-10 md:w-12 bg-slate-300 rounded-full"></div>
             <div className="h-1.5 md:h-2 w-6 md:w-8 bg-slate-200 rounded-full"></div>
          </div>

        </div>

      </div>
    </div>
  );
}
